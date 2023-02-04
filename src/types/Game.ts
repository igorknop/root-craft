import Card from "./Card";
import { TimeTrackSlot } from "./TimeTrack";
import Token from "./Token";

export default interface Game {
  days: number;
  state: string;
  timeTrack: TimeTrackSlot[];
  unusedTokens: Token[];
  places: Card[];
  items: Card[];
  lockedItems: Card[];
}