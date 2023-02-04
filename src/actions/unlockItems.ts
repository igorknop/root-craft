import Card from "../types/Card";
import Game from "../types/Game";

export default function unlockItems(game: Game, card: Card) {
  
  console.log("Need to unlock " + game.lockedItems.length + " items");
  
  card.unlocks.forEach((key) => {

    console.log(game.lockedItems);
    const lckIdx = game.lockedItems.findIndex((item) => item.id === key);
    console.log("Found " + lckIdx + " items key: "+key);
    
    
    if (lckIdx >= 0) {
      console.log("Unlocking " + key);
      
      const newItem = game.lockedItems.splice(lckIdx, 1);
      game.items.push(newItem[0]);
    }
  });
  game.items = game.items.sort();
  game.lockedItems = game.lockedItems.sort();
  return game;
}
