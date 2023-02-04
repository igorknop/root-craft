import Action from "./Action";
import Token from "./Token";



export default interface Card {
  id: string;
  name: string;
  description: string;
  actions: Action[];
  tokens: Token[];
  unlocks: string[];
}