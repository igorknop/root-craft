import Game from "./types/Game";

export const InitialGameState: Game = {
  state: "playing",
  timeTrack: [
    { time: 1, label: "Dawn", tokens: [] },
    { time: 2, label: "Morning", tokens: [] },
    {
      time: 3,
      label: "Noon",
      tokens: [
        { id: "P", type: "position", name: "Player 1 Position", player: 1 },
      ],
    },
    { time: 4, label: "Afternoon", tokens: [] },
    { time: 5, label: "Dusk", tokens: [] },
    { time: 6, label: "Evening", tokens: [] },
    { time: 7, label: "Midnight", tokens: [] },
    { time: 8, label: "Night", tokens: [] },
  ],
  unusedTokens: [
    { id: "HR", type: "hand", name: "Right Hand", player: 1 },
    { id: "HL", type: "hand", name: "Left Hand", player: 1 },
    { id: "T", type: "time", name: "Player 1 Time", player: 1 },
    { id: "B2", type: "bag", name: "Bag Slot 2", player: 1 },
    { id: "B3", type: "bag", name: "Bag Slot 3", player: 1 },
    { id: "B4", type: "bag", name: "Bag Slot 4", player: 1 },
    { id: "S1", type: "sack", name: "Sack 1", player: 1 },
    { id: "S2", type: "sack", name: "Sack 2", player: 1 },
    { id: "S3", type: "sack", name: "Sack 3", player: 1 },
    { id: "S4", type: "sack", name: "Sack 4", player: 1 },
    { id: "S5", type: "sack", name: "Sack 5", player: 1 },
    { id: "C3", type: "chest", name: "Chest 3", player: 1 },
  ],
  places: [
    {
      id: "F1",
      type: "place",
      name: "The Forest",
      description: "A dark and foreboding forest.",
      tokens: [
        {
          id: "P",
          type: "position",
          name: "Player 1 Position",
          player: 1,
        },
      ],
      actions: [
        { consume: ["T", "T", "T", "I1"], produce: ["M1"], needs: ["I1"] },
      ],
      unlocks: ["I1"],
    },
  ],
  items: [
    {
      id: "I1",
      type: "item",
      name: "Wooden Stick",
      description: "a wooden stick that can be very useful.",
      tokens: [
        { id: "B1", type: "bag", name: "Bag Slot 1", player: 1 },
        { id: "C1", type: "chest", name: "Chest 1", player: 1 },
        { id: "C2", type: "chest", name: "Chest 2", player: 1 },
      ],
      actions: [{ consume: ["T"], produce: ["I2"], needs: [] }],
      unlocks: ["I2", "I3"],
    },
    {
      id: "I2",
      type: "item",
      name: "Wooden Hammer",
      description: "A clumsy wooden hammer.",
      tokens: [
        {
          id: "HR",
          type: "hand",
          name: "Right Hand",
          player: 1,
        },
      ],
      actions: [{ consume: ["T"], produce: ["D1"], needs: [] }],
      unlocks: ["I2", "I3"],
    },
  ],
};
