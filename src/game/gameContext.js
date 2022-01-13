import React from 'react';
import { defaultGameState, whiteStoneIDs, blackStoneIDs, whiteStonePath, blackStonePath } from './gameContextConstants';

export const GameContext = React.createContext([]);

///  Board State ///

export const getTileWithID = (state, stoneID) => (
  state.boardState.flat().find((tile) => tile.stones.includes(stoneID))
);

export const getTileModifierWithCoords = (state, x, y) => (
  state.boardState[x][y].modifier
);

export const getTileStonesWithCoords = (state, x, y) => (
  state.boardState[x][y].stones
);

export const moveStone = (prevState, stoneID, newLocation) => ({
  ...prevState,
  boardState:
      stoneID === "Error"
      ? prevState.boardState
      : addInStone(
          prevState.boardState.map((row, x) => (
              row.map((tile, y) => ({
                  ...tile,
                  stones: tile.stones?.filter((id) => id !== stoneID) ?? [],
              }))
          )),
      stoneID, newLocation),
})

export const bumpStone = (prevState, stoneID, newLocation) => {
  const [x, y] = newLocation
  const stoneToBump = prevState.boardState[x][y]?.stones?.[0] ?? false
  if(stoneToBump) {
      return moveStone(
          moveStone(prevState, stoneToBump,
              stoneToBump.charAt(0) === 'W'
              ? whiteStonePath[0]
              : blackStonePath[0]
          ),
      stoneID, newLocation)
  }
  else
      throw new Error("Stone being bumped doesnt exist");
}

const compareCoords = (x, y) => (
  x[0] === y[0] && x[1] === y[1]
)

export const addInStone = (prevBoardState, stoneID, newLocation) => (
  prevBoardState.map((row, x) => (
      row.map((tile, y) => ({
          ...tile,
          stones: compareCoords([x,y], newLocation) ? [...tile.stones, stoneID] : tile.stones,
      }))
  ))
)

///  Game State  ///

const calculateMoveDistance = (state) => (
    state.gameState.rollResult.filter((r) => r).length
);

const setRollResult = (state, rollResult) => {
    const testState = {
        ...state,
        gameState: {
            ...state.gameState,
            rollResult: rollResult,
            moveMessage: "",
            rolled: true,
        },
    }
    const activePlayer = state.gameState.activePlayer
    const validMoves = (activePlayer === "W"
        ? whiteStoneIDs
        : blackStoneIDs
    ).filter((id) => validateMove(testState, id))
    return calculateMoveDistance(testState) > 0
        ? validMoves.length > 0
            ? testState
            : {
                ...advanceTurn(state, "None"),
                gameState: {
                  ...state.gameState,
                  moveMessage: "No Valid Moves",
                },
            }
        : {
              ...advanceTurn(state, "None"),
              gameState: {
                ...state.gameState,
                moveMessage: "Skipped Turn"
            },
        }
}

const resetRollResult = (state) => ({
    ...state,
    gameState: {
        ...state.gameState,
        rollResult: [false, false, false, false],
        rolled: false,
    },
});

const incrementTurnNumber = (state) => ({
    ...state,
    gameState: {
        ...state.gameState,
        turnNumber: state.gameState.turnNumber + 1
    }
})

const calculateLandingCoords = (state, stoneID) => {
    const tileWithID = state.boardState.flat().find((tile) => {
      if (!tile.stones) {
        debugger
      }
      return tile?.stones?.includes(stoneID) ?? false
    })
    if(stoneID.charAt(0) === "W")
        return whiteStonePath[
            whiteStonePath.findIndex((c) =>
                compareCoords(c, tileWithID.coordinates)) + calculateMoveDistance(state)
        ]
    else if(stoneID.charAt(0) === "B")
        return blackStonePath[
            blackStonePath.findIndex((c) =>
                compareCoords(c, tileWithID.coordinates)) + calculateMoveDistance(state)
        ]
    else
        throw new Error("Invalid stone id (not W or B)");
}

export const validateMove = (state, stoneID) => {
  const landingCoords = calculateLandingCoords(state, stoneID) ?? false
  if(landingCoords && state.gameState.rolled){
      const [tx, ty] = landingCoords
      const firstStoneAtTargetLocation = state.boardState[tx][ty]?.stones?.[0] ?? ""
      return ((stoneID.charAt(0) === "W"
              && state.gameState.activePlayer === "W")
          || (stoneID.charAt(0) === "B"
              && state.gameState.activePlayer === "B"))
      && (calculateMoveDistance(state) === 0
          || firstStoneAtTargetLocation.charAt(0) !== state.gameState.activePlayer
          || (compareCoords(landingCoords, [0,4])
              || compareCoords(landingCoords, [2,4])))
      && !(compareCoords(landingCoords, [1,3])
          && (state.boardState[tx][ty]?.stones?.length ?? 0) > 0)
  }
  return false;
}


const advanceTurn = (state, stoneID) => {
    const nextActivePlayer = state.gameState.activePlayer === "W" ? "B" : "W"
    const stoneCoords = stoneID !== "None"
        ? getTileWithID(state, stoneID)?.coordinates ?? false
        : [1,1]
    if(stoneCoords) {
        const [x, y] = stoneCoords
        const modifier = getTileModifierWithCoords(state, x, y)
        if(modifier !== "Rosette") {
            return nextActivePlayer === "W"
                ? {
                    ...incrementTurnNumber(state),
                    gameState: {
                      ...state.gameState,
                      activePlayer: nextActivePlayer
                    },
                }
                : {
                    ...state,
                    gameState: {
                      ...state.gameState,
                      activePlayer: nextActivePlayer,
                    },
                }
        }
    }
    return state
}

const moveStoneToLandingCoords = (state, stoneID) => {
    const landingCoords = calculateLandingCoords(state, stoneID)
    const [x, y] = landingCoords
    const firstCharOfFirstStoneAtTarget = state.boardState[x][y]?.stones?.[0]?.charAt(0) ?? stoneID.charAt(0)
    if(firstCharOfFirstStoneAtTarget !== stoneID.charAt(0))
        return bumpStone(state, stoneID, landingCoords)
    return moveStone(state, stoneID, landingCoords)
}

const moveStoneWrap = (state, stoneID) => (
    advanceTurn(moveStoneToLandingCoords(state, stoneID), stoneID)    
);

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "rollDice":
        return setRollResult(state, Array(4).fill(0).map(() => Math.random() >= 0.5));
    case "resetRolled":
        return resetRollResult(state);
    case "moveStone":
        return moveStoneWrap(state, action.parameters.stoneID);
    case "resetState":
        return defaultGameState;
    default:
        throw new Error("Invalid Action Type");
  }
}
