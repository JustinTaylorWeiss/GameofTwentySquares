
// GAME CONTEXT ACTIONS //

export const rollDice = () => ({
    type: "rollDice",
    parameters: {},
})

export const resetRolled = () => ({
    type: "resetRolled",
    parameters: {},
})

export const resetState = () => ({
    type: "resetState",
    parameters: {},
})

// BOARD CONTEXT ACTIONS //

export const moveStone = (stoneID) => ({
    type: "moveStone",
    parameters: {
        stoneID: stoneID,
    },
})
