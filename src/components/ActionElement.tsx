import Action from "../types/Action";
import styles from "./ActionElement.module.css";
import {ImArrowRight} from "react-icons/im";
import Symbol from "../screens/Symbol";

export default function ActionElement({ action, cardKey, onClick }: { action: Action, cardKey: string, onClick: () => void }) {
  return (
    <div className={styles.ActionElement} onClick={onClick}>
      <div className={styles.ActionElementConsume}>
        {action.consume.map((item,i) => (
          <Symbol key={`${cardKey}_con_${i}`}>{item}</Symbol>
        ))}
      </div>
      <ImArrowRight />
      <div className={styles.ActionElementProduce}>
        {action.produce.map((item,i) => (
          <Symbol key={`${cardKey}_pro_${i}`}>{item}</Symbol>
        ))}
      </div>
      <div className={styles.ActionElementNeeds}>
        {action.needs.map((item,i) => (
          <Symbol key={`${cardKey}_nee_${i}`}>{item}</Symbol>
        ))}
      </div>
    </div>
  );
}
