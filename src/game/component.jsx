import React from 'react';
import styled from "styled-components";
import { GameContext, gameReducer } from './gameContext';
import * as uiStyles from '../global/styles';
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

const ContainerText = styled.div`
`;

export const Game = ({}) => {

    const innerContext = React.useReducer(gameReducer, defaultGameState);
    const [gameContextState, _] = innerContext;

    return <>
        <AbsoluteAccesories/>
        <GameContext.Provider value={innerContext}>
            <TopRightTextWrapper>
                <ContainerText>
                    {
                        gameContextState.gameState.activePlayer === 'W'
                        ? 'White to Move'
                        : 'Black to Move'
                    }
                </ContainerText>
                <ContainerText>
                    Turn {gameContextState.gameState.turnNumber}
                </ContainerText>
                <ContainerText>
                    {
                        gameContextState.gameState.moveMessage !== ""
                            ? " " + gameContextState.gameState.moveMessage + " For " + (gameContextState.gameState.activePlayer !== "W"
                                ? "White."
                                : "Black.")
                            : ""
                    }
                </ContainerText>
            </TopRightTextWrapper>
            <Dice/>
            <Board/>
        </GameContext.Provider>
    </>
}
