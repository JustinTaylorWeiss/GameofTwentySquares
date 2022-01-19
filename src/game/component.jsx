import React from 'react';
import styled from "styled-components";
import * as Actions from './gameContext/actions';
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
    @media only screen and (max-width: 700px) {
        grid-template-rows: 1fr 9fr 1fr;
        grid-template-columns: 1fr 4fr 1fr;
        grid-template-areas: 
        "lMenuHead mainHead rMenuHead"
        "board board board"
        "dice dice dice";
        ${props => props.state.gameState.hideTitle && `
            grid-template-areas: 
            "lMenuHead dice rMenuHead"
            "board board board"
            ". . .";
        `}
    }
`;

export const Game = ({}) => {

    const innerContext = React.useReducer(reducer, defaultGameState);
    const [gameContextState, dispatch] = innerContext;

    React.useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 700) {
                dispatch(Actions.setHideTitle(false));
            }
        }
        onResize();
    
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
      }, []);

    React.useEffect(() => {
        if(isAITurn(gameContextState)){
            aiTurn(gameContextState, dispatch);
        }
    }, [gameContextState]);

    return <>
        <GameContext.Provider value={innerContext}>
            <UIGrid state={gameContextState}>
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
