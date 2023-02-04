import Token from '../types/Token';
import styles from './ItemCardElement.module.css';
import TokenElement from './TokenElement';


interface ItemCardProps {
  item: {
    name: string;
    description: string;
    tokens: Token[];
  };
}


export default function ItemCard({ item }: ItemCardProps) {
  return (
    <div className={styles.ItemCard}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <div className={styles.tokens}>
        {item.tokens.map((token) => (
          <TokenElement token={token} key={token.id}/>
        ))}
      </div>
    </div>
  );
}