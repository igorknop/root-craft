import Card from "../types/Card";
import Game from "../types/Game";

export default function unlockItems(game: Game, card: Card) {
  card.unlocks.forEach((key) => {
    const lckIdx = game.lockedItems.findIndex((item) => item.id === key);

    if (lckIdx >= 0) {
      const newItem = game.lockedItems.splice(lckIdx, 1);
      game.items.push(newItem[0]);
    }
  });
  game.items = game.items.sort();
  game.lockedItems = game.lockedItems.sort();
  return game;
}
