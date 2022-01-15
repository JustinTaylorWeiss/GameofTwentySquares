
export const addToMoveLog = (state, moveToLogArr) => ({
    ...state,
    gameState: {
        ...state.gameState,
        moveLog: [...state.gameState.moveLog, ...moveToLogArr],
    }
});