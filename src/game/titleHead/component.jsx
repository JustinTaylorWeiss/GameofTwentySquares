import React from 'react';
import styled from "styled-components";
import { GameContext } from '../gameContext';

const TitleTextWrap = styled.div`
    grid-area: mainHead;
    margin: 0;
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
    }
`;

export const TitleHead = ({}) => {

    const [gameContextState, _] = React.useContext(GameContext);

    return <TitleTextWrap>
        <H1>Game of Twenty Squares Beta</H1>
        { gameContextState.gameState.gameType === "lpvp" && <H2>Player vs Player</H2> }
        { gameContextState.gameState.gameType === "pvm" && <H2>Player vs AI</H2> }
    </TitleTextWrap>
};
