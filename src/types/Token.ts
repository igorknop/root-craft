export default interface Token {
  id: string;
  name: string;
  type: 'hand' | 'bag' | 'sack' | 'chest' | 'position'| 'time' | 'shelter';
  player: number;
}