import Game from "../types/Game";
import earnTokens from "./earnTokens";
import { computeHistograms } from "./useCardAction";

export default function payTime(game: Game, amount: number) {
  if (amount === 0) return game;

  const sourceSlot = game.timeTrack.findIndex((slot) => slot.tokens.length > 0);

  if (sourceSlot + amount >= game.timeTrack.length) {
    game.players[0].days += 1;
    if (game.players[0].damage > 0) {
      game.players[0].damage -= 1;
      game.players[0].hunger += 2;
    } else {
      game.players[0].hunger += 1;
    }
  }

  if (game.enemies.length > 0) {
    //Enemy damage
    game.enemies.forEach((enemy) => {
      enemy.actions.forEach((action) => {
        if (action.consume.length === 0) {
          action.produce.forEach((effect) => {
            if (effect === "D") {
              game.players[0].damage += 1;
            }
            if (effect === "F") {
              game.players[0].hunger += 1;
            }
          });
        }
      });
    });

    //Enemy despawn
    if (sourceSlot < 4) {
      const despEnemy = game.enemies.splice(
        Math.floor(Math.random() * game.enemies.length),
        1
      )[0];
      game.lockedEnemies.push(despEnemy);
    }
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

  game.timeTrack[targetSlot].tokens = game.timeTrack[sourceSlot].tokens;
  game.timeTrack[sourceSlot].tokens = [];
  return game;
}
