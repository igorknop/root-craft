import styles from "./TokenElement.module.css";
import Token from "../types/Token";

export default function TokenElement({ token }: {token: Token}) {
  return (
    <div className={styles.TokenElement} data-player={token.player}>
      {token.id}
    </div>
  );
}