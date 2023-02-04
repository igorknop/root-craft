import styles from "./TokenElement.module.css";
import Token from "../Token";

export default function TokenElement({ token }: {token: Token}) {
  return (
    <div className={styles.TokenElement}>
      {token.id}
    </div>
  );
}