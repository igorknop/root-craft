import { useState } from "react";
import "./App.css";
import PlaceCard from "./components/PlaceCard";
import TimeTrack from "./components/TimeTrack";

function App() {
  return (
    <div className="App">
      <h1>Root Craft</h1>
      <TimeTrack time={2} />
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
    </div>
  );
}

export default App;
