import * as Actions from '../actions';
import { validateMove, getTileModifierWithCoords, getTileStonesWithCoords } from './boardStateFunctions';
import { whiteStoneIDs, blackStoneIDs, whiteStonePath, blackStonePath, compareCoords, calculateLandingCoords } from './gameConstants';

export const isAITurn = (state) => (
    state.gameState.gameType === "pvm"
    && (
        state.gameState.whoFirst === "Player 2"
            ? state.gameState.activePlayer === "W"
            : state.gameState.activePlayer === "B"
    )
  );

export const aiTurn = (state, dispatch) => {

    if (!state.gameState.rolled) {
        dispatch(Actions.rollDice());
    }

    const aiStones = state.gameState.whoFirst === "Player 2" ? whiteStoneIDs : blackStoneIDs;
    const aiPath = state.gameState.whoFirst === "Player 2" ? whiteStonePath : blackStonePath;
    const validStonesToMove = aiStones.filter((stoneID) => validateMove(state, stoneID));

    if (validStonesToMove.length > 0) {
        const strengthOfMove = validStonesToMove.map((stoneID) => {
            const landingCoords = calculateLandingCoords(state, stoneID);
            const [x, y] = landingCoords;
            const strengthValue = (
                    (
                        (getTileStonesWithCoords(state, x, y)?.length ?? 0) > 0 
                        && (getTileModifierWithCoords(state, x, y) ?? "") !== "Empty" 
                            ? 40 
                            : 0 
                    )
                + 
                    (
                        (getTileModifierWithCoords(state, x, y) ?? "") === "Rosette" 
                            ? 20
                            : 0
                    )
                + 
                    (
                        aiPath.reduce((accumulator, pathCoords, index) => (
                            compareCoords(pathCoords, landingCoords)
                                ? index+1
                                : accumulator
                        ), 0)
                    )
            );
            return ({
                stoneID: stoneID,
                strength: strengthValue,
            });
        });


        const sortedStrengthOfMove = strengthOfMove.sort((firstMove, secondMove)=> secondMove.strength - firstMove.strength)
        console.log(sortedStrengthOfMove);
        const bestStoneToMove = sortedStrengthOfMove[0].stoneID;
        dispatch(Actions.moveStone(bestStoneToMove));
        dispatch(Actions.resetRolled());
    }
};