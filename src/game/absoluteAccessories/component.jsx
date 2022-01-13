import * as uiComponents from '../../global/components/uiComponents';
import * as uiStyles from '../../global/styles';
import styled from "styled-components";
import { GameContext } from '../gameContext';
import React from 'react';

const TitleText = styled.div`
    position : absolute;
    transform: translate(-50%, -50%);
    top: 8vh;
    left: 50vw;
    font-size: 4rem;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #7851A9;
`;

const MoveLogWrap = styled.div` 
    position : absolute;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 12.5vw;
    width: calc(25vw - 50px);
    height: calc(100vh - 50px);
    background-color: #aaaaaa; 
`;

const TitleTextC = ({}) => (
    <TitleText>
        Game of Twenty Squares
    </TitleText>
);

const MoveLog = ({}) => {

    const [gameContextState, gameDispatch] = React.useContext(GameContext);

    return <MoveLogWrap>

    </MoveLogWrap>
};

export const AbsoluteAccesories = ({}) => <>
    <TitleTextC/>
    <MoveLog/>
</>;
