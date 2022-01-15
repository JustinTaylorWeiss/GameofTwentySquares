import React from 'react';
import { GameContext, reducer, defaultGameState, isAITurn, aiTurn } from './gameContext';

import { Board } from './board';
import { Log } from './log';
import { Dice } from './dice';
import { WinScreen } from './winScreen';
import { PopupWindows } from './popupWindows';
import { PreGameMenu } from './preGameMenu';
import { FloatingText } from './floatingText';

const didSomeoneWin = (state) => (
    state.boardState[0][4].stones.length >= 6 
    || state.boardState[2][4].stones.length >= 6
)

export const Game = ({}) => {

    const innerContext = React.useReducer(reducer, defaultGameState);
    const [gameContextState, dispatch] = innerContext;

    React.useEffect(() => {
        if(isAITurn(gameContextState)){
            aiTurn(gameContextState, dispatch);
        }
    }, [gameContextState]);

    return <>
        {/*console.log(gameContextState)*/}
        <GameContext.Provider value={innerContext}>
            {
                gameContextState.gameState.gameType === ""
                ? <PreGameMenu/>
                : !didSomeoneWin(gameContextState) 
                    ? <>
                        <Log/>
                        <Dice/>
                        <Board/>
                    </>
                    : <WinScreen/>
            }
            <FloatingText/>
            <PopupWindows/>
        </GameContext.Provider>
    </>
}
