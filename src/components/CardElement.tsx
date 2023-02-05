import Card from "../types/Card";
import ActionElement from "./ActionElement";
import styles from "./CardElement.module.css";
import TokenElement from "./TokenElement";
import { FaUnlockAlt } from "react-icons/fa";
import useCardAction from "../actions/useCardAction";
import { gameAtom } from "../screens/App";
import { useAtom } from "jotai";
import Symbol from "./Symbol";

export default function CardElement({ card }: { card: Card }) {
  const [game, setGame] = useAtom(gameAtom);
  return (
    <div className={styles.Card} data-type={card.type}>
      <div className={styles.CardTitle}>
        <h1><Symbol>{card.id}</Symbol></h1>
        <h2>{card.name}</h2>
      </div>
      <div className={styles.actions}>
        {card.actions.map((action, k) => (
          <ActionElement
            action={action}
            key={`${card.id}_act_${k}`}
            cardKey={card.id}
            onClick={() => {
              setGame((oldgame) => useCardAction(oldgame, action, card));
            }}
          />
        ))}
      </div>

      <div className={styles.CardUnlocks}>
        {card.unlocks.length>0?<FaUnlockAlt />:null}
        {card.unlocks.map((item) => (
          <div key={`${card.id}_ulck_${item}`}><Symbol>{item}</Symbol></div>
        ))}
      </div>
      <p className={styles.CardFluffy}>{card.description}</p>
      <div className={styles.tokens}>
        {card.tokens.map((token) => (
          <TokenElement token={token} key={token.id} onClick={() => {}} />
        ))}
      </div>
    </div>
  );
}
