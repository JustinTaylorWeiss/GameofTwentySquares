import React from 'react';
import styled from 'styled-components';
import * as g from '../../global/components';
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';
import { ArrowBoard } from './assets/arrowBoard';

const InstructionWrap = styled.div`
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const ListWrap = styled.div`
    font-size: 1rem;
    line-height: 2em;
    text-align: left;
    font-weight: 400;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 700px) {
        font-size: 0.75rem;
    }
`;

const StyledArrowBoard = styled(ArrowBoard)`
    position: relative;
    transform: translate(-50%, 0);
    left: 50%;
    width: 50vw;
    margin: 5vh 0;
`;

const InfoWindow = ({}) => {

    const [_, dispatch] = React.useContext(GameContext);

    return <>
        <g.Blur onClick={() => dispatch(Actions.setWindowState(""))}/> 
        <g.Window>
            <InstructionWrap>
                <g.MenuH2>
                    How to play
                </g.MenuH2>
                <ListWrap>
                    • The goal of the game is to get all of your stones from the start (E3 for white and E1 for black) to the end. (F3 for white and F1 for black)<br/>
                    • The current turn number is displayed in the top left, the color of the text indicates which player is up.<br/>
                    • During each player's turn they roll the dice at the bottom of the screen.<br/>
                    • The number of black triangles you roll determines how many spaces you can move one of your stones.<br/>
                    • You can move any of your stones by clicking on them, they will move using the path drawn below.<br/>
                    • You can only have one stone on each tile except the start and end. (E3 and F3 for white E1 and F1 for black)<br/>
                    • If you land on a purple tile you go again.<br/>
                    • If you land on an opponent's stone you send their stone back to the beginning.<br/>
                    • You cannot land on an opponent's stone if they are on a purple tile.<br/>
                    • You must land on the end (F3 for white and F1 for black) exactly to move there.
                </ListWrap>
                <StyledArrowBoard/>
            </InstructionWrap>
        </g.Window>
    </>
};

const SettingsWindow = ({}) => {

    const [_, dispatch] = React.useContext(GameContext);

    return  <>
        <g.Blur onClick={() => dispatch(Actions.setWindowState(""))}/> 
        <g.Window>
            <g.MenuH2>
                Settings
            </g.MenuH2>
            <g.SubTitleTextButton onClick={() => { 
                dispatch(Actions.resetState());
                dispatch(Actions.setWindowState(""));
            }}>
                Reset Game
            </g.SubTitleTextButton>
        </g.Window>
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
