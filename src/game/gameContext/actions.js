
// BOARD STATE ACTIONS //

export const moveStone = (stoneID) => ({
    type: "moveStone",
    parameters: {
        stoneID: stoneID,
    },
})

// DICE STATE ACTIONS //

export const rollDice = () => ({
    type: "rollDice",
    parameters: {},
})

export const resetRolled = () => ({
    type: "resetRolled",
    parameters: {},
})

// GAME STATE ACTIONS //

export const resetState = () => ({
    type: "resetState",
    parameters: {},
})

export const setGameType = (gameType) => ({
    type: "setGameType",
    parameters: {
        gameType: gameType,
    },
})

export const setWindowState = (windowState) => ({
    type: "setWindowState",
    parameters: {
        windowState: windowState,
    },
})

export const setWhoFirst = (whoFirst) => ({
    type: "setWhoFirst",
    parameters: {
        whoFirst: whoFirst,
    },
})

export const setHideTitle = (title) => ({
    type: "setHideTitle",
    parameters: {
        setTitle: title
    },
})

// LOG STATE ACTIONS //

export const logMove = (moveToLog) => ({
    type: "logMove",
    parameters: {
        moveToLog: moveToLog,
    },
})