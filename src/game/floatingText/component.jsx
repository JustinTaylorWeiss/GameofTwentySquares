import React from 'react';
import styled from "styled-components";
import { GameContext } from '../gameContext';

const TitleTextWrap = styled.div`
    position : absolute;
    transform: translate(-50%, 0);
    top: 3vh;
    left: 50vw;
    margin: 0;
    text-align: center;
    color: #7851A9;
`;

const H1 = styled.h1`
    margin: 0;
    font-size: 4rem;
    padding-bottom: 20px;
    letter-spacing: 0.1em;
    font-weight: 700;
`;

const H2 = styled.h2`
    margin: 0;
    font-size: 3rem;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #FFFFFF;
`;

export const FloatingText = ({}) => {

    const [gameContextState, _] = React.useContext(GameContext);

    return <TitleTextWrap>
        <H1>Game of Twenty Squares</H1>
        { gameContextState.gameState.gameType === "lpvp" && <H2>Player vs Player</H2> }
        { gameContextState.gameState.gameType === "pvm" && <H2>Player vs AI</H2> }
    </TitleTextWrap>
};
