import styles from "./TokenElement.module.css";
import Token from "../types/Token";
import Symbol from "./Symbol";

export default function TokenElement({ token, onClick=()=>{} }: {token: Token, onClick: () => void}) {
  return (
    <div className={styles.TokenElement} data-player={token.player} onClick={onClick}>
      <Symbol>{token.id}</Symbol>
    </div>
  );
}