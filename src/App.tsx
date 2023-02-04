import styles from "./App.module.css";
import Card from "./types/Card";
import CardElement from "./components/CardElement";
import TimeTrack from "./components/TimeTrack";
import TokenElement from "./components/TokenElement";
import { atom, useAtom } from "jotai";
import { InitialGameState } from "./InitialGameState";

export const gameAtom  = atom(InitialGameState);


function App() {
  const [game] = useAtom(gameAtom);
  return (
    <div className={styles.App}>
      <h1>Root Craft</h1>
      <section>
        <h2>Time Track</h2>
        <TimeTrack />
      </section>
      <section>
        <h2>Unused Tokens</h2>
        <div className={styles.tokenList}>
          {game.unusedTokens.map((token) => (
            <TokenElement token={token} key={token.id} />
          ))}
        </div>
      </section>
      <section>
        <h2>Places</h2>
        {game.places.map((placeCard) => (
          <CardElement card={placeCard as Card} key={placeCard.id}/>
        ))}
      </section>
      <section>
        <h2>Items</h2>
        {game.items.map((itemCard) => (
          <CardElement
            card={itemCard as Card}
          key={itemCard.id}/>

        ))}
      </section>
    </div>
  );
}

export default App;
