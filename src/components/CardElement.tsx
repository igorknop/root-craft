import Card from "../types/Card";
import ActionElement from "./ActionElement";
import styles from "./CardElement.module.css";
import TokenElement from "./TokenElement";
import { FaUnlockAlt } from "react-icons/fa";

export default function CardElement({ place }: { place: Card }) {
  return (
    <div className={styles.Card} data-type={place.type}>
      <div className={styles.CardTitle}>
        <h1>{place.id}</h1>
        <h2>{place.name}</h2>
      </div>
      <div className={styles.actions}>
        {place.actions.map((action, k) => (
          <ActionElement action={action} key={`${place.id}_act_${k}`} />
        ))}
      </div>

      <div className={styles.CardUnlocks}>
        <FaUnlockAlt />
        {place.unlocks.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <p className={styles.CardFluffy}>{place.description}</p>
      <div className={styles.tokens}>
        {place.tokens.map((token) => (
          <TokenElement token={token} key={token.id} />
        ))}
      </div>
    </div>
  );
}
