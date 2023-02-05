import Game from "../types/Game";

export default function payTime(game: Game, amount: number) {
  const sourceSlot = game.timeTrack.findIndex((slot) => slot.tokens.length > 0);

  if (sourceSlot + amount >= game.timeTrack.length) {
    game.players[0].days += 1;
    if (game.players[0].damage > 0) {
      game.players[0].damage -= 1;
      game.players[0].hungry += 2;
      console.log("healing in ", game.players[0].damage);
    } else {
      game.players[0].hungry += 1;
    }
  }

  //Enemy damage
  game.players[0].damage += game.enemies.length;
  console.log("damage in ", game.players[0].damage);

  //Enemy despawn
  if (sourceSlot < 4 && game.enemies.length > 0) {
    const despEnemy = game.enemies.splice(
      Math.floor(Math.random() * game.enemies.length),
      1
    )[0];
    game.lockedEnemies.push(despEnemy);
    console.log("despawn ", despEnemy.name);
  }

  //Enemy spawn
  if (game.timeTrack.length - sourceSlot <= 2) {
    if (game.lockedEnemies.length > 0) {
      const newEnemy = game.lockedEnemies.splice(
        Math.floor(Math.random() * game.lockedEnemies.length),
        1
      );
      game.enemies.push(newEnemy[0]);
    }
  }
  const targetSlot = (sourceSlot + amount) % game.timeTrack.length;

  const newTimeTrack = structuredClone(game.timeTrack);
  newTimeTrack[targetSlot].tokens = newTimeTrack[sourceSlot].tokens;
  newTimeTrack[sourceSlot].tokens = [];
  game.timeTrack = newTimeTrack;
  return game;
}
