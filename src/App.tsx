import styles from "./App.module.css";
import Card from "./types/Card";
import CardElement from "./components/CardElement";
import TokenElement from "./components/TokenElement";
import { atom, useAtom } from "jotai";
import { InitialGameState } from "./InitialGameState";
import TimeTrackElement from "./components/TimeTrackElement";
import { focusAtom } from "jotai-optics";

export const gameAtom  = atom(InitialGameState);
export const timeTrackAtom = focusAtom(gameAtom, (optic) => optic.prop('timeTrack'));
export const unusedTokensAtom = focusAtom(gameAtom, (optic) => optic.prop('unusedTokens'));
export const placesAtom = focusAtom(gameAtom, (optic) => optic.prop('places'));
export const itemsAtom = focusAtom(gameAtom, (optic) => optic.prop('items'));




function App() {
  const [game] = useAtom(gameAtom);
  return (
    <div className={styles.App}>
      <h1>Root Craft</h1>
      <h2>{game.days>1?`${game.days} days.`:'Your first day!'}</h2>
      <section>
        <h2>Time Track</h2>
        <TimeTrackElement />
      </section>
      <section>
        <h2>Unused Tokens</h2>
        <div className={styles.tokenList}>
          {game.unusedTokens.map((token) => (
            <TokenElement token={token} key={token.id} onClick={()=>{

            }}/>
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
