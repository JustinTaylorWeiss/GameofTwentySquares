import React from 'react';
import styled from "styled-components";
import { GameContext, reducer, defaultGameState, isAITurn, aiTurn } from './gameContext';

import { Board } from './board';
import { Log } from './log';
import { Dice } from './dice';
import { WinScreen } from './winScreen';
import { PopupWindows } from './popupWindows';
import { PreGameMenu } from './preGameMenu';
import { TitleHead } from './titleHead';

const didSomeoneWin = (state) => (
    state.boardState[0][5].stones.length >= 6 
    || state.boardState[2][5].stones.length >= 6
)

const UIGrid = styled.div`
    display: grid;
    width: 100vw;
    height: 100vh;
    grid-template-rows: 1fr 1fr 6fr 2fr;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-areas: 
        "lMenuHead mainHead rMenuHead"
        "lMenu mainHead rMenu"
        "lMenu board rMenu"
        "lMenu dice rMenu";
    @media only screen and (max-aspect-ratio: 1/1) {
        grid-template-areas: 
        "lMenuHead mainHead rMenuHead"
        "lMenu board rMenu"
        "lMenu board rMenu"
        "lMenu board rMenu";
    }
`;

export const Game = ({}) => {

    const innerContext = React.useReducer(reducer, defaultGameState);
    const [gameContextState, dispatch] = innerContext;

    React.useEffect(() => {
        if(isAITurn(gameContextState)){
            aiTurn(gameContextState, dispatch);
        }
    }, [gameContextState]);

    return <>
        {console.log(gameContextState)}
        <GameContext.Provider value={innerContext}>
            <UIGrid>
                <TitleHead/>
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
            </UIGrid>
            <PopupWindows/>
        </GameContext.Provider>
    </>
}
