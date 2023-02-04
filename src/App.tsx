import { useState } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard";
import PlaceCard from "./components/PlaceCard";
import TimeTrack from "./components/TimeTrack";

function App() {
  return (
    <div className="App">
      <section>
        <h1>Root Craft</h1>
        <TimeTrack time={2} />
      </section>
      <section>
        <h2>Places</h2>
        <PlaceCard
          place={{
            name: "The Forest",
            description: "A dark and foreboding forest.",
            tokens: [
              {
                id: "P1",
              },
            ],
          }}
        />
      </section>
      <section>
      <h2>Items</h2>
      <ItemCard
        item={{
          name: "Wood",
          description: "A piece of wood.",
          tokens: [
            {
              id: "HL",
            },
          ],
        }}
        />

      </section>
    </div>
  );
}

export default App;
