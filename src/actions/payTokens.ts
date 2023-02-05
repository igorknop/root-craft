import Card from "../types/Card";
import Game from "../types/Game";
import Token from "../types/Token";

export default function payTokens(game:Game,amount: Map<string, number>) {
  const newCards = game.items;
  const unusedTokens: Token[] = [];
  newCards.forEach((card: Card) => {
    if (amount.has(card.id) && (amount.get(card.id) || 0) > 0) {
      for (let t = card.tokens.length - 1; t >= 0; t--) {
        const token = card.tokens[t];
        //TODO: Consume chest only if is in the shelter
        if (token.type === "chest") continue;
        if (amount.get(card.id) || 0 > 0) {
          unusedTokens.push(token);
          amount.set(card.id, (amount.get(card.id) || 0) - 1);
          console.log(card.id,card.tokens);          
          card.tokens.splice(t, 1);
          console.log(card.id,card.tokens);

        }
      }
    }
  });
  console.log("unusedTokens", game.unusedTokens);
  
  game.unusedTokens = [...game.unusedTokens, ...unusedTokens].sort();
  game.items = newCards;
  console.log("unusedTokens", game.unusedTokens);

  return game;
}
