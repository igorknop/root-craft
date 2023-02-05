import styles from "./App.module.css";
import Card from "./types/Card";
import CardElement from "./components/CardElement";
import TokenElement from "./components/TokenElement";
import { atom, useAtom } from "jotai";
import { InitialGameState } from "./InitialGameState";
import TimeTrackElement from "./components/TimeTrackElement";
import { focusAtom } from "jotai-optics";
import IconBar from "./components/IconBar";
import {TbHeart, TbMeat} from "react-icons/tb";

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
      <section className={styles.playerList}>
        <h2>Players</h2>
        <ul>
          {game.players.map((player) => (
            <li key={player.id}>
              <h1>{player.name}</h1>
              <h2>{player.days>1?`${player.days} days.`:'Your first day!'}</h2>
              <div><IconBar max={10} value={player.damage} icon={(<TbHeart />)}/> </div>
              <div><IconBar max={10} value={player.hunger} icon={(<TbMeat />)}/> </div>
            </li>
          ))}
        </ul>
      </section>
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
      <section className={styles.cardList}>
        <h2>Enemies</h2>
        {game.enemies.map((enemyCard) => (
          <CardElement card={enemyCard as Card} key={enemyCard.id}/>
        ))}
      </section>
      <section className={styles.cardList}>
        <h2>Places</h2>
        {game.places.map((placeCard) => (
          <CardElement card={placeCard as Card} key={placeCard.id}/>
        ))}
      </section>
      <section className={styles.cardList}>
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
