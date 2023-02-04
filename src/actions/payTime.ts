import Game from "../types/Game";

export default function payTime(game: Game, amount: number) {
  const sourceSlot = game.timeTrack.findIndex((slot) => slot.tokens.length > 0);
  if(sourceSlot+amount >= game.timeTrack.length) {
    game.days += 1;
  }
  const targetSlot = (sourceSlot + amount) % game.timeTrack.length;

  const newTimeTrack = structuredClone(game.timeTrack);
  newTimeTrack[targetSlot].tokens = newTimeTrack[sourceSlot].tokens;
  newTimeTrack[sourceSlot].tokens = [];
  game.timeTrack = newTimeTrack;
  return game;
}
