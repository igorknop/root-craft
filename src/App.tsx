import { useState } from "react";
import styles from "./App.module.css";
import ItemCardElement from "./components/ItemCardElement";
import PlaceCardElement from "./components/PlaceCardElement";
import TimeTrack from "./components/TimeTrack";
import TokenElement from "./components/TokenElement";

const unusedTokens = [
  { id: "HR", name: "Right Hand", player: 1 },
  { id: "HL", name: "Left Hand", player: 1 },
  { id: "P", name: "Player 1 Position", player: 1 },
  { id: "T", name: "Player 1 Time", player: 1 },
  { id: "B1", name: "Bag Slot 1", player: 1 },
  { id: "B2", name: "Bag Slot 2", player: 1 },
  { id: "B3", name: "Bag Slot 3", player: 1 },
  { id: "B4", name: "Bag Slot 4", player: 1 },
  { id: "S1", name: "Sack 1", player: 1 },
  { id: "S2", name: "Sack 2", player: 1 },
  { id: "S3", name: "Sack 3", player: 1 },
  { id: "S4", name: "Sack 4", player: 1 },
  { id: "S5", name: "Sack 5", player: 1 },
  { id: "C1", name: "Chest 1", player: 1 },
  { id: "C2", name: "Chest 2", player: 1 },
  { id: "C3", name: "Chest 3", player: 1 },
];



function App() {
  return (
    <div className={styles.App}>
        <h1>Root Craft</h1>
      <section>
         <h2>Time Track</h2>
        <TimeTrack time={2} />
      </section>
      <section>
        <h2>Unused Tokens</h2>
        <div className={styles.tokenList}>
        {unusedTokens.map((token) => (
          <TokenElement token={token} key={token.id} />
        ))}
        </div>
      </section>
      <section>
        <h2>Places</h2>
        <PlaceCardElement
          place={{
            name: "The Forest",
            description: "A dark and foreboding forest.",
            tokens: [
              {
                id: "P",
                name: "Player 1 Position",
                player: 1,
              },
            ],
          }}
        />
      </section>
      <section>
        <h2>Items</h2>
        <ItemCardElement
          item={{
            name: "Wood",
            description: "A piece of wood.",
            tokens: [
              {
                id: "HL",
                name: "Left Hand",
                player: 1,
              },
            ],
          }}
        />
      </section>
    </div>
  );
}

export default App;
