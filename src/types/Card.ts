import Action from "./Action";
import Token from "./Token";



export default interface Card {
  id: string;
  name: string;
  type: 'place' | 'item' | 'enemy';
  description: string;
  actions: Action[];
  tokens: Token[];
  unlocks: string[];
}