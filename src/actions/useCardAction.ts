import { itemsAtom } from "../App";
import Action from "../types/Action";
import Card from "../types/Card";
import Game from "../types/Game";
import Token from "../types/Token";
import payTime from "./payTime";
import payTokens from "./payTokens";

function addOrIncrement(histogram: Map<string, number>, key: string) {
  if (histogram.has(key)) {
    histogram.set(key, (histogram.get(key) || 0) + 1);
  } else {
    histogram.set(key, 1);
  }
}

function computeHistograms(game: Game, action: Action) {
  const consumeHistogram = new Map();
  const needsHistogram = new Map();
  const produceHistogram = new Map();
  action.consume.forEach((item) => {
    addOrIncrement(consumeHistogram, item);
  });
  action.needs.forEach((item) => {
    addOrIncrement(needsHistogram, item);
  });
  action.produce.forEach((item) => {
    addOrIncrement(produceHistogram, item);
  });

  const inBagHistogram = new Map();
  const inHandHistogram = new Map();
  const inBaseHistogram = new Map();
  const inBothHistogram = new Map();

  game.items.forEach((card) => {
    card.tokens.forEach((token) => {

      addOrIncrement(inBothHistogram, card.id);
      if 
      (token.type === "hand") {
        addOrIncrement(inHandHistogram, card.id);
      } else if 
      (token.type === "bag") {
        addOrIncrement(inBagHistogram, card.id);
      } else if (token.type === "chest") {
        addOrIncrement(inBaseHistogram, card.id);
      }
    
  });
  });

  return {
    needs: needsHistogram,
    consume: consumeHistogram,
    produce: produceHistogram,
    inBag: inBagHistogram,
    inHand: inHandHistogram,
    inBase: inBaseHistogram,
    inBoth: inBothHistogram,
  };
}

export default function useAction(game: Game, action: Action) {
  const newGame = structuredClone(game);

  //compute histograms
  const histograms = computeHistograms(game, action);
  console.log(histograms);
  


  //have what is needed?
  let haveWhatIsNeeded = true;
  histograms.needs.forEach((value, key) => {
    // in possession
    if (
      value >
      (histograms.inBag.get(key) || 0) + (histograms.inHand.get(key) || 0)
    ) {
      console.log('need:', key, value, 'has:', histograms.inBag.get(key)||0+ histograms.inHand.get(key)||0);
      
      haveWhatIsNeeded = false;
    }
  });
  if (!haveWhatIsNeeded) {
    console.log("dont have what is needed");
    return game;
  }

  //have what is consumed?
  let haveWhatIsConsumed = true;
  histograms.consume.forEach((value, key) => {
    if(key === "T") return;
    // in possession
    if (
      value >
      (histograms.inBag.get(key) || 0) + (histograms.inHand.get(key) || 0)
    ) {
      console.log('consume:', key, value, 'has:', histograms.inBag.get(key)||0+ histograms.inHand.get(key)||0);
      haveWhatIsConsumed = false;
    }
  });
  if (!haveWhatIsConsumed) {
    console.log("dont have what to consume");
    
    return game;
  }
  console.log("have what is needed and consumed");
  

  const { newCards, unusedTokens } = payTokens(
    newGame.items,
    histograms.consume
  );
  newGame.items = newCards;
  newGame.unusedTokens = unusedTokens;

  newGame.timeTrack = payTime(game.timeTrack, histograms.consume.get("T"));

  return newGame;
}
