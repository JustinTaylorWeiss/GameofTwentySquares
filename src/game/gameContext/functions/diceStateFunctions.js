import { whiteStoneIDs, blackStoneIDs, calculateMoveDistance } from './gameConstants';
import { addToMoveLog } from './logStateFunctions';
import { validateMove } from './boardStateFunctions';
import { advanceTurn } from './gameStateFunctions';

export const rollDice = (state) => {
    const rollResult = Array(4).fill(0).map(() => Math.random() >= 0.5);
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
    const moveDistance = calculateMoveDistance(testState);
    const activePlayerText = state.gameState.activePlayer === "W" ? "White" : "Black";
    const noValidMoveLoggedState = addToMoveLog(state, [
        `${activePlayerText} rolled ${moveDistance}`, 
        `${activePlayerText} had no valid moves`
    ]);
    const rollZeroLoggedState = addToMoveLog(state, [
        `${activePlayerText} rolled ${moveDistance}`
    ]);
    return moveDistance > 0
        ? validMoves.length > 0
            ? addToMoveLog(testState, [`${activePlayerText} rolled ${moveDistance}`])
            : {
                ...noValidMoveLoggedState,
                gameState: {
                    ...advanceTurn(noValidMoveLoggedState, "None").gameState
                },
            }
        : {
            ...rollZeroLoggedState,
            gameState: {
                ...advanceTurn(rollZeroLoggedState, "None").gameState,
            },
        }
};

export const resetRollResult = (state) => ({
    ...state,
    gameState: {
        ...state.gameState,
        rollResult: [false, false, false, false],
        rolled: false,
    },
});