import Action from "../types/Action";
import styles from "./ActionElement.module.css";
import {ImArrowRight} from "react-icons/im";

export default function ActionElement({ action, cardKey, onClick }: { action: Action, cardKey: string, onClick: () => void }) {
  return (
    <div className={styles.ActionElement} onClick={onClick}>
      <div className={styles.ActionElementConsume}>
        {action.consume.map((item,i) => (
          <div key={`${cardKey}_con_${i}`}>{item}</div>
        ))}
      </div>
      <ImArrowRight />
      <div className={styles.ActionElementProduce}>
        {action.produce.map((item,i) => (
          <div key={`${cardKey}_pro_${i}`}>{item}</div>
        ))}
      </div>
      <div className={styles.ActionElementNeeds}>
        {action.needs.map((item,i) => (
          <div key={`${cardKey}_nee_${i}`}>{item}</div>
        ))}
      </div>
    </div>
  );
}
