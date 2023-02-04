export const InitialGameState = {
  state: 'playing',
  timeTrack: [
    { time: 1, label: "Dawn" , tokens:[]},
    { time: 2, label: "Morning" , tokens:[]},
    { time: 3, label: "Noon" , tokens:[
      { id: "P", name: "Player 1 Position", player: 1 },
    ]},
    { time: 4, label: "Afternoon" , tokens:[]},
    { time: 5, label: "Dusk" , tokens:[]},
    { time: 6, label: "Evening" , tokens:[]},
    { time: 7, label: "Midnight" , tokens:[]},
    { time: 8, label: "Night" , tokens:[]}

  ],
  unusedTokens: [
    { id: "HR", name: "Right Hand", player: 1 },
    { id: "HL", name: "Left Hand", player: 1 },
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
        name: "Player 1 Position",
        player: 1,
      },
    ],
    actions: [{ consume: ["P"], produce: ["M1"], needs: ['I1'] }],
    unlocks: ["M1"],
  }],
  items: [

  
  
  {
    id: "I1",
    type: "item",
    name: "Wooden Hammer",
    description: "A clumsy wooden hammer.",
    tokens: [
      {
        id: "HR",
        name: "Right Hand",
        player: 1,
      },
    ],
    actions: [{ consume: ["T"], produce: ["D1"], needs: [] }],
    unlocks: ["I2", "I3"],
  }
]

};