import { moveStoneWrap } from './functions/boardStateFunctions';
import { rollDice, resetRollResult } from './functions/diceStateFunctions';
import { defaultGameState } from './functions/gameConstants';
import { setTheGameType, setTheWindowState, setTheWhoFirst } from './functions/gameStateFunctions';
import { addToMoveLog } from './functions/logStateFunctions';


export const reducer = (state, action) => {
    switch (action.type) {
        case "rollDice":
            return rollDice(state);
        case "resetRolled":
            return resetRollResult(state);
        case "moveStone":
            return moveStoneWrap(state, action.parameters.stoneID);
        case "logMove":
            return addToMoveLog(state, action.parameters.moveToLog);
        case "setGameType":
            return setTheGameType(state, action.parameters.gameType);
        case "setWindowState":
            return setTheWindowState(state, action.parameters.windowState);
        case "setWhoFirst":
            return setTheWhoFirst(state, action.parameters.whoFirst);
        case "resetState":
            return defaultGameState;
        default:
            throw new Error("Invalid Action Type");
    }
};