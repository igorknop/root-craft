import Action from "../types/Action";
import Card from "../types/Card";
import Game from "../types/Game";
import Token from "../types/Token";
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

export function computeHistograms(game: Game, action: Action) {
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
  let newGame = structuredClone(game);

  //compute histograms
  const histograms = computeHistograms(newGame, action);

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

  newGame = unlockItems(newGame, card);

  newGame = payTokens(newGame, newGame.items, histograms.consume);

  newGame = earnTokens(newGame, histograms.produce);

  let distance = 0;
  //Moviment
  if ((card.type === "place" && histograms.produce.get("M")) || 0 > 0) {
    const idxLocation = newGame.places.findIndex((card: Card) =>
      card.tokens.some((token) => token.type === "position")
    );
    const idxDestination = newGame.places.findIndex(
      (destiny: Card) => card.id === destiny.id
    );
    if (idxLocation >= 0 || idxDestination >= 0) {
      distance = Math.abs(idxDestination - idxLocation);
      if (distance === 0) {
        return game;
      }
      const idxToken = newGame.places[idxLocation].tokens.findIndex(
        (token: Token) => token.type === "position"
      );
      const tokens = newGame.places[idxLocation].tokens.splice(idxToken, 1);
      newGame.places[idxDestination].tokens = [
        ...newGame.places[idxDestination].tokens,
        ...tokens,
      ];
    }
  }

  newGame = payTime(newGame, histograms.consume.get("T") || 0 + distance);

  //Kill enemy
  if (histograms.produce.get("K") || (0 > 0 && newGame.enemies.length > 0)) {
    const idxEnemy = newGame.enemies.findIndex((e: Card) => card.id === e.id);
    if (idxEnemy >= 0) {
      newGame.lockedEnemies.push(newGame.enemies.splice(idxEnemy, 1)[0]);
    }
  }

  //Exploration
  if (
    histograms.produce.get("X") ||
    (0 > 0 && newGame.lockedPlaces.length > 0)
  ) {
    const newLocation = newGame.lockedPlaces.splice(
      Math.floor(Math.random() * newGame.lockedPlaces.length),
      1
    )[0];
    newGame.places.push(newLocation);
  }

  //Damage
  if (histograms.produce.get("D") || 0 > 0) {
    newGame.players[0].damage += histograms.produce.get("D") || 0;
  }
  if (histograms.produce.get("!D") || 0 > 0) {
    newGame.players[0].damage = Math.max(
      newGame.players[0].damage - histograms.produce.get("!D") || 0,
      0
    );
  }

  //Hunger
  if (histograms.produce.get("F") || 0 > 0) {
    newGame.players[0].hunger += histograms.produce.get("F") || 0;
  }
  if (histograms.produce.get("!F") || 0 > 0) {
    newGame.players[0].hunger = Math.max(
      newGame.players[0].hunger - histograms.produce.get("!F") || 0,
      0
    );
  }

  return newGame;
}
