import Card from "../types/Card";
import ActionElement from "./ActionElement";
import styles from "./CardElement.module.css";
import TokenElement from "./TokenElement";
import { FaUnlockAlt } from "react-icons/fa";

export default function CardElement({ card }: { card: Card }) {
  return (
    <div className={styles.Card} data-type={card.type}>
      <div className={styles.CardTitle}>
        <h1>{card.id}</h1>
        <h2>{card.name}</h2>
      </div>
      <div className={styles.actions}>
        {card.actions.map((action, k) => (
          <ActionElement action={action} key={`${card.id}_act_${k}`} />
        ))}
      </div>

      <div className={styles.CardUnlocks}>
        <FaUnlockAlt />
        {card.unlocks.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <p className={styles.CardFluffy}>{card.description}</p>
      <div className={styles.tokens}>
        {card.tokens.map((token) => (
          <TokenElement token={token} key={token.id} />
        ))}
      </div>
    </div>
  );
}
