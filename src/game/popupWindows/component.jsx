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
    font-size: 1.75rem;
    line-height: 2em;
    text-align: left;
    font-weight: 400;
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledArrowBoard = styled(ArrowBoard)`
    position: relative;
    transform: translate(-50%, 0);
    left: 50%;
    width: 50vw;
    margin-top: 5vh;
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
                    <ui>
                        <li>The goal of the game is to get all of your stones from the start (D3 for white and D1 for black) to the end. (E3 for white and E1 for black)</li>
                        <li>The current turn number is displayed in the top left, the color of the text indicates which player is up.</li>
                        <li>During each player's turn they roll the dice at the bottom of the screen.</li>
                        <li>The number of black triangles you roll determines how many spaces you can move one of your stones.</li>
                        <li>You can move any of your stones by clicking on them, they will move using the path drawn below.</li>
                        <li>You can only have one stone on each tile except the start and end. (D3 and E3 for white D1 and E1 for black)</li>
                        <li>If you land on a purple tile you go again.</li>
                        <li>If you land on an opponent's stone you send their stone back to the beginning.</li>
                        <li>You cannot land on an opponent's stone if they are on a purple tile.</li>
                        <li>You must land on the end (E3 for white and E1 for black) exactly to move there.</li>
                    </ui>
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
