import { whiteStonePath, blackStonePath, rowLetterMap, compareCoords, calculateLandingCoords, calculateMoveDistance } from './gameConstants';
import { addToMoveLog } from './logStateFunctions';
import { advanceTurn } from './gameStateFunctions';

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
            || (compareCoords(landingCoords, [0,5])
                || compareCoords(landingCoords, [2,5])))
        && !(compareCoords(landingCoords, [1,4])
            && (state.boardState[tx][ty]?.stones?.length ?? 0) > 0)
    }
    return false;
  }

export const getTileWithID = (state, stoneID) => (
    state.boardState.flat().find((tile) => tile.stones.includes(stoneID))
  );
  
  export const getTileModifierWithCoords = (state, x, y) => (
    state.boardState[x][y].modifier
  );
  
  export const getTileStonesWithCoords = (state, x, y) => (
    state.boardState[x][y].stones
  );
  
  export const moveStone = (prevState, stoneID, newLocation) => {
      const activePlayerText = prevState.gameState.activePlayer === "W" ? "White" : "Black";
      const loggedPrevState = (
        getTileModifierWithCoords(prevState, newLocation[0], newLocation[1]) !== "Empty"
            ? addToMoveLog(prevState, [`${activePlayerText} moved to ${
                rowLetterMap[newLocation[1]] + (3 - newLocation[0])
            }`])
            : prevState
      )
      return {
          ...loggedPrevState,
          boardState:
              stoneID === "Error"
              ? loggedPrevState.boardState
              : addInStone(
                  loggedPrevState.boardState.map((row, x) => (
                      row.map((tile, y) => ({
                          ...tile,
                          stones: tile.stones?.filter((id) => id !== stoneID) ?? [],
                      }))
                  )),
              stoneID, newLocation),
      };
  };
  
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
  
  
  export const addInStone = (prevBoardState, stoneID, newLocation) => (
    prevBoardState.map((row, x) => (
        row.map((tile, y) => ({
            ...tile,
            stones: compareCoords([x,y], newLocation) ? [...tile.stones, stoneID] : tile.stones,
        }))
    ))
  )

  const moveStoneToLandingCoords = (state, stoneID) => {
    const landingCoords = calculateLandingCoords(state, stoneID)
    const [x, y] = landingCoords
    const firstCharOfFirstStoneAtTarget = state.boardState[x][y]?.stones?.[0]?.charAt(0) ?? stoneID.charAt(0)
    if(firstCharOfFirstStoneAtTarget !== stoneID.charAt(0))
        return bumpStone(state, stoneID, landingCoords)
    return moveStone(state, stoneID, landingCoords)
};

export const moveStoneWrap = (state, stoneID) => (
    advanceTurn(moveStoneToLandingCoords(state, stoneID), stoneID)    
);
  