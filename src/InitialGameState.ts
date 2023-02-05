import Game from "./types/Game";

export const InitialGameState: Game = {
  players: [
    {
      days: 1,
      id: 1,
      name: "Player 1",
      score: 0,
      hungry: 0,
      damage: 0,
    },
  ],
  state: "playing",
  timeTrack: [
    { time: 1, id: "T1", label: "Dawn", tokens: [] },
    { time: 2, id: "T2", label: "Morning", tokens: [] },
    {
      time: 3,
      id: "T3",
      label: "Noon",
      tokens: [{ id: "T", type: "time", name: "Player 1 Position", player: 1 }],
    },
    { time: 4, id: "T4", label: "Afternoon", tokens: [] },
    { time: 5, id: "T5", label: "Dusk", tokens: [] },
    { time: 6, id: "T6", label: "Evening", tokens: [] },
    { time: 7, id: "T7", label: "Midnight", tokens: [] },
    { time: 8, id: "T8", label: "Night", tokens: [] },
  ],
  unusedTokens: [
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
    { id: "HR", type: "hand", name: "Right Hand", player: 1 },
    { id: "B1", type: "bag", name: "Bag Slot 1", player: 1 },
    { id: "C1", type: "chest", name: "Chest 1", player: 1 },
    { id: "C2", type: "chest", name: "Chest 2", player: 1 },
    { id: "HL", type: "hand", name: "Left Hand", player: 1 },
  ],
  places: [
    {
      id: "P1",
      type: "place",
      name: "The river bank",
      description: "A calm river running along a stone beach.",
      tokens: [
        {
          id: "S",
          type: "shelter",
          name: "Player 1 Shelter",
          player: 1,
        },
        {
          id: "P",
          type: "position",
          name: "Player 1 Position",
          player: 1,
        },
      ],
      actions: [
        { consume: ["T"], produce: ["I2"], needs: ["P1"] },
        { consume: ["T", "T", "T"], produce: ["X"], needs: ["P1"] },
        { consume: ["T"], produce: ["M"], needs: [] },
      ],
      unlocks: ["I2"],
    },
  ],
  items: [],
  lockedPlaces: [
    {
      id: "L1",
      type: "place",
      name: "The Forest",
      description: "A dark and foreboding forest.",
      tokens: [],
      actions: [
        { consume: ["T", "T", "T"], produce: ["I1"], needs: ["L1"] },
        { consume: ["T", "T", "T"], produce: ["X"], needs: ["L1"] },
        { consume: ["T", "T"], produce: ["M"], needs: [] },
      ],
      unlocks: ["I1"],
    },
    {
      id: "L2",
      type: "place",
      name: "The Moutain",
      description: "A rocky step stone wall.",
      tokens: [],
      actions: [
        { consume: ["T", "T", "T", "T"], produce: ["I3"], needs: ["L2"] },
        { consume: ["T", "T"], produce: ["M"], needs: [] },
      ],
      unlocks: ["I4"],
    },
    {
      id: "L3",
      type: "place",
      name: "The Dark Forest",
      description: "No sunlight reaches this forest.",
      tokens: [],
      actions: [
        { consume: ["T", "T", "T"], produce: ["I1"], needs: ["L3"] },
        { consume: ["T", "T", "T"], produce: ["X"], needs: ["L3"] },
        { consume: ["T", "T"], produce: ["M"], needs: [] },
      ],
      unlocks: ["I1"],
    },
  ],
  lockedItems: [
    {
      id: "I1",
      type: "item",
      name: "Wooden Stick",
      description: "A wooden stick that can be very useful.",
      tokens: [],
      actions: [
        { consume: ["T", "T", "I1", "I1"], produce: ["I3"], needs: [] },
      ],
      unlocks: ["I3"],
    },
    {
      id: "I2",
      type: "item",
      name: "Pebble",
      description: "A small pebble.",
      tokens: [],
      actions: [{ consume: ["T"], produce: ["I2"], needs: [] }],
      unlocks: ["I3"],
    },

    {
      id: "I3",
      type: "item",
      name: "Wooden Hammer",
      description: "A clumsy wooden hammer.",
      tokens: [],
      actions: [
        { consume: ["T", "T", "I1", "I1"], produce: ["I4"], needs: [] },
      ],
      unlocks: ["I3"],
    },
    {
      id: "I4",
      type: "item",
      name: "Wooden Table",
      description: "A sturdy wooden table.",
      tokens: [],
      actions: [
        { consume: ["T", "I1", "I2"], produce: ["I5"], needs: ["I3", "I4"] },
        { consume: ["T", "I1", "I2"], produce: ["I5"], needs: ["I3", "I4"] },
      ],
      unlocks: ["I5"],
    },
    {
      id: "I5",
      type: "item",
      name: "Stone Axe",
      description: "A sturdy wooden table.",
      tokens: [],
      actions: [
        { consume: ["T"], produce: ["I1", "I1"], needs: ["L1", "I5"] },
        { consume: ["T", "T", "I1"], produce: ["I6"], needs: ["L1"] },
      ],
      unlocks: ["I6"],
    },
    {
      id: "I6",
      type: "item",
      name: "Wood Log",
      description: "A multiuse wood log.",
      tokens: [],
      actions: [],
      unlocks: ["I7"],
    },
    {
      id: "I7",
      type: "item",
      name: "Silk",
      description: "Silk that can be used to make clothes",
      tokens: [],
      actions: [],
      unlocks: ["I8"],
    },
  ],
  enemies: [],
  lockedEnemies: [
    {
      id: "M1",
      type: "enemy",
      name: "Giant Spider",
      description: "A giant spider.",
      tokens: [],
      actions: [
        { consume: ["D"], produce: [], needs: [] },
        { consume: ["F", "F", "F"], produce: ["D",'I7'], needs: ["M1"] },
      ],
      unlocks: ['I7'],
    },
    {
      id: "M2",
      type: "enemy",
      name: "Giant Crab",
      description: "A giant crab.",
      tokens: [],
      actions: [
        { consume: ["D"], produce: [], needs: [] },
        { consume: ["F", "F", "F"], produce: ["D",'I7'], needs: ["M1"] },
      ],
      unlocks: ['I7'],
    },
    {
      id: "M3",
      type: "enemy",
      name: "Giant Fly",
      description: "A giant Fly.",
      tokens: [],
      actions: [
        { consume: ["D"], produce: [], needs: [] },
        { consume: ["F", "F", "F"], produce: ["D",'I7'], needs: ["M1"] },
      ],
      unlocks: ['I7'],
    },
  ],
};
