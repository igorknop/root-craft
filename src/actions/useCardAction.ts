import Action from "../types/Action";
import Card from "../types/Card";
import Game from "../types/Game";
import earnTokens from "./earnTokens";
import payTime from "./payTime";
import payTokens from "./payTokens";
import unlockItems from "./unlockItems";

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

export default function useAction(game: Game, action: Action, card: Card) {
  const newGame = structuredClone(game);

  //compute histograms
  const histograms = computeHistograms(game, action);

  //have what is needed?
  let haveWhatIsNeeded = true;
  histograms.needs.forEach((value, key) => {
    // in possession
    if (
      value >
      (histograms.inBag.get(key) || 0) + (histograms.inHand.get(key) || 0)
    ) {
      haveWhatIsNeeded = false;
    }
  });
  if (!haveWhatIsNeeded) {
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
      haveWhatIsConsumed = false;
    }
  });
  if (!haveWhatIsConsumed) {
    
    return game;
  }
  
  const newGame2 = unlockItems(newGame, card);


  const { newCards, unusedTokens } = payTokens(
    newGame2.items,
    histograms.consume
  );
  newGame2.items = newCards;
  newGame2.unusedTokens = [...newGame2.unusedTokens, ...unusedTokens].sort();

  const ret = earnTokens(newGame2, histograms.produce);
  newGame2.items = ret.newItems;
  
  newGame2.unusedTokens = ret.unusedTokens.sort();


  newGame2.timeTrack = payTime(game.timeTrack, histograms.consume.get("T"));

  return newGame2;
}
