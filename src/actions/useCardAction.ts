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

  //is in shelter?
  const locationIdx = game.places.findIndex((card) =>
    card.tokens.some((token) => token.type === "position")
  );
  const locationId = game.places[locationIdx].id;
  const shelterIdx = game.places.findIndex((card) =>
    card.tokens.some((token) => token.type === "shelter")
  );
  const shelterId = game.places[shelterIdx].id;

  const isInShelter = locationIdx === shelterIdx;

  console.log("locationIdx", locationIdx, "shelterIdx", shelterIdx);

  const inHandHistogram = new Map();
  const inBagHistogram = new Map();
  const inShelterHistogram = new Map();
  const inLocationHistogram = new Map();
  const inAvailableHistogram = new Map();

  inLocationHistogram.set(locationId, 1);
  inAvailableHistogram.set(locationId, 1);

  game.items.forEach((card) => {
    card.tokens.forEach((token) => {
      if (token.type === "hand") {
        addOrIncrement(inHandHistogram, card.id);
        addOrIncrement(inAvailableHistogram, card.id);
      } else if (token.type === "bag") {
        addOrIncrement(inBagHistogram, card.id);
        addOrIncrement(inAvailableHistogram, card.id);
      } else if (token.type === "sack" && locationId === card.id) {
        addOrIncrement(inLocationHistogram, card.id);
        addOrIncrement(inAvailableHistogram, card.id);
      } else if (token.type === "chest") {
        addOrIncrement(inShelterHistogram, card.id);
        if (isInShelter) {
          addOrIncrement(inAvailableHistogram, card.id);
        }
      }
    });
  });

  return {
    needs: needsHistogram,
    consume: consumeHistogram,
    produce: produceHistogram,
    inBag: inBagHistogram,
    inHand: inHandHistogram,
    inShelter: inShelterHistogram,
    inLocation: inLocationHistogram,
    inAvailable: inAvailableHistogram,
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
    if (value > (histograms.inAvailable.get(key) || 0)) {
      haveWhatIsNeeded = false;
    }
  });
  if (!haveWhatIsNeeded) {
    return game;
  }

  //have what is consumed?
  let haveWhatIsConsumed = true;
  histograms.consume.forEach((value, key) => {
    if (key === "T") return;
    // in possession
    if (value > (histograms.inAvailable.get(key) || 0)) {
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

  let distance = 0;
  //Moviment
  if (histograms.produce.get("M") || 0 > 0) {
    const idxLocation = newGame2.places.findIndex((card: Card) =>
      card.tokens.some((token) => token.type === "position")
    );
    const idxDestination = newGame2.places.findIndex(
      (destiny: Card) => card.id == destiny.id
    );
    if (idxLocation >= 0 || idxDestination >= 0) {
      if (distance === 0) {
        return game;
      }
      distance = Math.abs(idxDestination - idxLocation);
      const idxToken = newGame2.places[idxLocation].tokens.findIndex(
        (token) => token.type === "position"
      );
      const tokens = newGame2.places[idxLocation].tokens.splice(idxToken, 1);
      newGame2.places[idxDestination].tokens = [
        ...newGame2.places[idxDestination].tokens,
        ...tokens,
      ];
    }
  }
  const newGame3 = payTime(newGame2, histograms.consume.get("T") + distance);

  //Exploration
  if (
    histograms.produce.get("X") ||
    (0 > 0 && newGame3.lockedPlaces.length > 0)
  ) {
    const newLocation = newGame3.lockedPlaces.splice(
      Math.floor(Math.random() * newGame3.lockedPlaces.length),
      1
    )[0];
    newGame3.places.push(newLocation);
  }

  return newGame3;
}
