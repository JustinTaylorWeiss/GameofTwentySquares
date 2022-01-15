import React from 'react';
import styled from 'styled-components';
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';

const SubTitleText = styled.h2`
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
`;

const SubTitleTextButton = styled.h2`
    font-size: 3rem;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #FFFFFF;
    width: 50%;
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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #373737;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 50vw;
    border-radius: 10px;
    border: 10px solid #7851A9;
`;

const InfoWindow = ({}) => {

    const [_, dispatch] = React.useContext(GameContext);

    return <>
        <Blur onClick={() => dispatch(Actions.setWindowState(""))}/> 
        <Window>
            <SubTitleText>
                How to play
            </SubTitleText>
        </Window>
    </>
};

const SettingsWindow = ({}) => {

    const [_, dispatch] = React.useContext(GameContext);

    return  <>
        <Blur onClick={() => dispatch(Actions.setWindowState(""))}/> 
        <Window>
            <SubTitleText>
                Settings
            </SubTitleText>
            <SubTitleTextButton onClick={() => { 
                dispatch(Actions.resetState());
                dispatch(Actions.setWindowState(""));
            }}>
                Reset Game
            </SubTitleTextButton>
        </Window>
    </>
};

export const PopupWindows = ({}) => {

    const [gameContextState, _] = React.useContext(GameContext);

    return <>
        {
            gameContextState.gameState.windowState === "Info" && <InfoWindow/>
        }
        {
            gameContextState.gameState.windowState === "Settings" && <SettingsWindow/>
        }
    </>
};
