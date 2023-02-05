import Game from "../types/Game";

export default function payTime(game: Game, amount: number) {
  const sourceSlot = game.timeTrack.findIndex((slot) => slot.tokens.length > 0);
  if (sourceSlot + amount >= game.timeTrack.length) {
    game.players[0].days += 1;
    if(game.players[0].damage > 0){
      game.players[0].damage -= 1;
      game.players[0].hungry += 2;
    } else {
      game.players[0].hungry += 1;
    }
  }
  const targetSlot = (sourceSlot + amount) % game.timeTrack.length;

  const newTimeTrack = structuredClone(game.timeTrack);
  newTimeTrack[targetSlot].tokens = newTimeTrack[sourceSlot].tokens;
  newTimeTrack[sourceSlot].tokens = [];
  game.timeTrack = newTimeTrack;
  return game;
}
