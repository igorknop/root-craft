import Action from "../types/Action";
import styles from "./ActionElement.module.css";
import {ImArrowRight} from "react-icons/im";

export default function ActionElement({ action }: { action: Action }) {
  return (
    <div className={styles.ActionElement}>
      <div className={styles.ActionElementConsume}>
        {action.consume.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <ImArrowRight />
      <div className={styles.ActionElementProduce}>
        {action.produce.map((item) => (
          <div>{item}</div>
        ))}
      </div>
      <div className={styles.ActionElementNeeds}>
        {action.needs.map((item) => (
          <div>{item}</div>
        ))}
      </div>
    </div>
  );
}
