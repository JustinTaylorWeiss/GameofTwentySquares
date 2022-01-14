export const rowLetterMap = ["A", "B", "C", "D", "E", "F", "G"];

export const whiteStoneIDs = [
    "W1", "W2", "W3",
    "W4", "W5", "W6",
];
  
export const blackStoneIDs = [
  "B1", "B2", "B3",
  "B4", "B5", "B6",
];

export const whiteStonePath = [
  [0,3], [0,2], 
  [0,1], [0,0], 
  [1,0], [1,1], 
  [1,2], [1,3], 
  [1,4], [1,5], 
  [1,6], [0,6], 
  [0,5], [0,4],
];

export const blackStonePath = [
  [2,3], [2,2], 
  [2,1], [2,0], 
  [1,0], [1,1], 
  [1,2], [1,3], 
  [1,4], [1,5], 
  [1,6], [2,6], 
  [2,5], [2,4],
];

export const defaultGameState = {
  gameState: {
      whoGoesFirst: 0,
      turnNumber: 1,
      activePlayer: 'W',
      moveMessage: '',
      rollResult: [false, false, false, false],
      rolled: false,
      moveLog: ["Welcome to", "Game of Twenty Squares", "-"],
  },
  boardState: [
    [
      { // [0,0]
        modifier: "Rosette",
        coordinates: [0,0],
        stones: [],
      },
      { // [0,1]
        modifier: "None",
        coordinates: [0,1],
        stones: [],
      },
      { // [0,2]
        modifier: "None",
        coordinates: [0,2],
        stones: [],
      },
      { // [0,3]
        modifier: "Empty",
        coordinates: [0,3],
        stones: ["W1","W2","W3","W4","W5","W6"],
      },
      { // [0,4]
        modifier: "Empty",
        coordinates: [0,4],
        stones: [],
      },
      { // [0,5]
        modifier: "Rosette",
        coordinates: [0,5],
        stones: [],
      },
      { // [0,6]
        modifier: "None",
        coordinates: [0,6],
        stones: [],
      },
    ],
    [
      { // [1,0]
        modifier: "None",
        coordinates: [1,0],
        stones: [],
      },
      { // [1,1]
        modifier: "None",
        coordinates: [1,1],
        stones: [],
      },
      { // [1,2]
        modifier: "None",
        coordinates: [1,2],
        stones: [],
      },
      { // [1,3]
        modifier: "Rosette",
        coordinates: [1,3],
        stones: [],
      },
      { // [1,4]
        modifier: "None",
        coordinates: [1,4],
        stones: [],
      },
      { // [1,5]
        modifier: "None",
        coordinates: [1,5],
        stones: [],
      },
      { // [1,6]
        modifier: "None",
        coordinates: [1,6],
        stones: [],
      },
    ],
    [
      { // [2,0]
        modifier: "Rosette",
        coordinates: [2,0],
        stones: [],
      },
      { // [2,1]
        modifier: "None",
        coordinates: [2,1],
        stones: [],
      },
      { // [2,2]
        modifier: "None",
        coordinates: [2,2],
        stones: [],
      },
      { // [2,3]
        modifier: "Empty",
        coordinates: [2,3],
        stones: ["B1","B2","B3","B4","B5","B6"],
      },
      { // [2,4]
        modifier: "Empty",
        coordinates: [2,4],
        stones: [],
      },
      { // [2,5]
        modifier: "Rosette",
        coordinates: [2,5],
        stones: [],
      },
      { // [2,6]
        modifier: "None",
        coordinates: [2,6],
        stones: [],
      },
    ],
  ],
};
