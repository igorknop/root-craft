import Token from "./Token";

interface Action {
  consume: string[];
  produce: string[];
  needs: string[];
}

export default interface Card {
  id: string;
  name: string;
  description: string;
  actions: Action[];
  tokens: Token[];
  unlocks: string[];
}