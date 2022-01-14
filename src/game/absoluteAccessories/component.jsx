import React from 'react';
import styled from 'styled-components';
import { Log } from '../log';
import { GameContext } from '../gameContext';
import * as Actions from '../actions'

const TitleText = styled.h1`
    position : absolute;
    transform: translate(-50%, -50%);
    top: 8vh;
    left: 50vw;
    font-size: 4rem;
    margin: 0;
    letter-spacing: 0.1em;
    text-align: center;
    font-weight: 700;
    color: #7851A9;
`;

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

const InfoWindow = ({updateWindowState}) => <>
    <Blur onClick={() => updateWindowState("")}/> 
    <Window>
        <SubTitleText>
            How to play
        </SubTitleText>
    </Window>
</>;

const SettingsWindow = ({updateWindowState}) => {

    const [gameContextState, dispatch] = React.useContext(GameContext);

    return  <>
        <Blur onClick={() => updateWindowState("")}/> 
        <Window>
            <SubTitleText>
                Settings
            </SubTitleText>
            <SubTitleTextButton onClick={() => { 
                dispatch(Actions.resetState());
                updateWindowState("");
            }}>
                Reset Game
            </SubTitleTextButton>
        </Window>
    </>
};

const TitleTextC = ({}) => (
    <TitleText>
        Game of Twenty Squares
    </TitleText>
);


export const AbsoluteAccesories = ({}) => {
    
    const [windowState, updateWindowState] = React.useState("");

    return <>
        <TitleTextC/>
        <Log updateWindowState={updateWindowState}/>
        {
            windowState === "Info" && <InfoWindow updateWindowState={updateWindowState} dispatch/>
        }
        {
            windowState === "Settings" && <SettingsWindow updateWindowState={updateWindowState}/>
        }
    </>
};
