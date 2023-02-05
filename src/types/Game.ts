import Card from "./Card";
import Player from "./Player";
import { TimeTrackSlot } from "./TimeTrack";
import Token from "./Token";

export default interface Game {
  players: Player[];
  state: string;
  timeTrack: TimeTrackSlot[];
  unusedTokens: Token[];
  places: Card[];
  lockedPlaces: Card[];
  items: Card[];
  lockedItems: Card[];
  enemies: Card[];
  lockedEnemies: Card[];
}