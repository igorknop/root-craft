export default interface Action {
  consume: string[];
  produce: string[];
  needs: string[];
}