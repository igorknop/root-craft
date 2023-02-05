import Card from "../types/Card";
import Game from "../types/Game";
import unlockItems from "./unlockItems";

export default function earnTokens(game: Game, amount: Map<string, number>) {
  const newItems = structuredClone(game.items);
  const unusedTokens = structuredClone(game.unusedTokens);

  newItems.forEach((card: Card) => {
    if (amount.has(card.id) && (amount.get(card.id) || 0) > 0) {
      for (let t = unusedTokens.length - 1; t >= 0; t--) {
        const token = unusedTokens[t];
        if ((token.type === "bag" && amount.get(card.id)) || 0 > 0) {
          card.tokens.push(token);
          card.tokens = card.tokens.sort();
          unusedTokens.splice(t, 1);
          amount.set(card.id, (amount.get(card.id) || 0) - 1);
        }
        if ((token.type === "hand" && amount.get(card.id)) || 0 > 0) {
          card.tokens.push(token);
          card.tokens = card.tokens.sort();
          unusedTokens.splice(t, 1);
          amount.set(card.id, (amount.get(card.id) || 0) - 1);
        }
      }
    }
  });

  game.items = newItems;
  game.unusedTokens = unusedTokens;
  
  return game;
}
