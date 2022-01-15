import { getTileWithID, getTileModifierWithCoords } from './boardStateFunctions';

const incrementTurnNumber = (state) => ({
    ...state,
    gameState: {
        ...state.gameState,
        turnNumber: state.gameState.turnNumber + 1,
    }
})

export const advanceTurn = (state, stoneID) => {
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
                    ...state,
                    gameState: {
                        ...incrementTurnNumber(state).gameState,
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
    return state;
}

export const setTheGameType = (state, gameType) => ({
    ...state,
    gameState: {
        ...state.gameState,
        gameType: gameType,
    },
});

export const setTheWindowState = (state, windowState) => ({
    ...state,
    gameState: {
        ...state.gameState,
        windowState: windowState,
    },
});

export const setTheWhoFirst = (state, whoFirst) => ({
    ...state,
    gameState: {
        ...state.gameState,
        whoFirst: whoFirst,
    },
});


