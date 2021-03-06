import React from 'react';
import styled from "styled-components";
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';
import { useMediaQuery } from 'react-responsive'; 

const TitleTextWrap = styled.div`
    grid-area: mainHead;
    margin: 0;
    padding: 0;
    text-align: center;
    color: #7851A9;
`;

const H1 = styled.h1`
    margin: 0;
    font-size: 3.5rem;
    font-size: 42px;
    padding: 2vh 0;
    letter-spacing: 0.1em;
    font-weight: 700;
    @media only screen and (max-aspect-ratio: 1/1) {
        font-size: 2rem;
        @media only screen and (max-width: 700px) {
            font-size: 1.5rem;
            padding: 10px 0 5px 0;
        }
    }
    @media only screen and (max-height: 550px) {
        font-size: 1rem;
    }
`;

const H2 = styled.h2`
    margin: 0;
    font-size: 2rem;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #FFFFFF;
    @media only screen and (max-aspect-ratio: 1/1) {
        font-size: 1rem;
        @media only screen and (max-width: 700px) {
            font-size: 0.75rem;
        }
    }
    @media only screen and (max-height: 550px) {
        font-size: 0.5rem;
    }
`;

export const TitleHead = ({}) => {

    const [gameContextState, dispatch] = React.useContext(GameContext);

    return <>
        {
            !gameContextState.gameState.hideTitle && <TitleTextWrap>
                <H1>Game of Twenty Squares Beta</H1>
                { gameContextState.gameState.gameType === "lpvp" && <H2>Player vs Player</H2> }
                { gameContextState.gameState.gameType === "pvm" && <H2>Player vs AI</H2> }
            </TitleTextWrap>
        }
    </>
};
