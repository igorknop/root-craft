import Token from '../Token';
import styles from './PlaceCard.module.css';
import TokenElement from './TokenElement';


interface PlaceCardProps {
  place: {
    name: string;
    description: string;
    tokens: Token[];
  };
}


export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <div className={styles.PlaceCard}>
      <h2>{place.name}</h2>
      <p>{place.description}</p>
      <div className={styles.tokens}>
        {place.tokens.map((token) => (
          <TokenElement token={token} key={token.id}/>
        ))}
      </div>
    </div>
  );
}