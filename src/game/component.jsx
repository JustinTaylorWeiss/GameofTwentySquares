import React from 'react';
import styled from "styled-components";
import { GameContext, gameReducer } from './gameContext';
import * as Actions from './actions'

import { defaultGameState } from './gameContextConstants';
import { Board } from './board';
import { Dice } from './dice';
import { AbsoluteAccesories } from './absoluteAccessories';

const TopRightTextWrapper = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    transform: translate(-10px, 5px);
    color: #FFFFFF;
    font-size: 1.5rem;
    top: 5px;
    right: 5px;
`;

const SubTitleText = styled.h2`
    font-size: 5rem;
    margin: auto;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
`;

const SubTitleTextButton = styled.h2`
    font-size: 3rem;
    margin: auto;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
    background-color: #7851A9;
    padding: 20px 40px;
    border-radius: 10px;
`;

const Blur = styled.div`
    z-index: 2;
    position: absolute;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(5px);
`;

const Window = styled.div`
    z-index: 3;
    position: absolute;
    width: 75vw;
    height: 75vh;
    background-color: #373737;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 10px solid #7851A9;
`;

const ContainerText = styled.div`
`;

const WinScreen = ({gameContextState, dispatch}) => <>
    <Blur/> 
    <Window>
        <SubTitleText>
            {
                gameContextState.boardState[0][4].length >= 6
                ? "Black Wins!"
                : "White Wins!"
            }
        </SubTitleText>
        <SubTitleTextButton onClick={() => dispatch(Actions.resetState())}>
            Play Again
        </SubTitleTextButton>
    </Window>
</>

const didSomeoneWin = (state) => (
    state.boardState[0][4].stones.length >= 6 
    || state.boardState[2][4].stones.length >= 6
)

export const Game = ({}) => {

    const innerContext = React.useReducer(gameReducer, defaultGameState);
    const [gameContextState, dispatch] = innerContext;

    return <>
        {console.log(gameContextState)}
        <GameContext.Provider value={innerContext}>
            {
                !didSomeoneWin(gameContextState) 
                ? <>
                    <AbsoluteAccesories/>
                    <Dice/>
                    <Board/>
                </>
                : <WinScreen gameContextState={gameContextState} dispatch={dispatch}/>
            }
        </GameContext.Provider>
    </>
}
