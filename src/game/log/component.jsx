import React from 'react';
import styled from "styled-components";
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';
import { HelpIcon } from './assets/helpIcon';
import { SettingsIcon } from './assets/settingsIcon';
import { MenuIcon } from './assets/menuIcon';
import { Arrow } from './assets/arrow';

import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';

const TurnMoveTracker = styled.div`
    grid-area: lMenuHead;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 1.5rem;
    color: ${props => props.color};
    background-color: #7851A9;
    border-bottom: 2px solid #000000;
    
`;

const MovesWrap = styled.div` 
    grid-area: lMenu;
    display: flex;
    flex-direction: column-reverse;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #aaaaaa;
`;

const IconWrap = styled.div`
    height: 3.5rem;
    width: 3.5rem;
    :hover {
        cursor: pointer;
    }
`;

const LogEntry = styled.div`
    width: 100%;
    font-size: 1.5rem;
    letter-spacing: 0.05em;
    margin-left: 1vw;
    color: ${props => props.color};
    @media only screen and (max-aspect-ratio: 1/1) {
        font-size: 1rem;
    }
    @media only screen and (max-width: 700px) {
        font-size: 1.5rem;
        margin-left: 5vw;
    }
`;

const MiniMenuWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    grid-area: rMenuHead;
`;

const SwapDirectionWrap = styled.div`
    padding: 20px 0;
    flex-grow: 1;
`;

const StyledMenuIcon = styled(MenuIcon)`
    grid-area: lMenuHead;
    width: 80%;
    place-self: center;
`;

export const Line = styled.div`
    width: 80%;
    margin: 20px auto;
    text-align: center;
    border-bottom: solid 2px #7851A9;
`;

const ArrowWrap = styled.div`
    grid-area: back;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: #7851A9;
    fill: #FFFFFF;
    color: #FFFFFF;
    font-size: 1.5rem;
`

const StyledArrow = styled(Arrow)`
    transform: rotate(270deg);
    height: 4rem;
    margin: 0 20px;
`;

const LogButtonsMiniGroup = ({}) => {

    const [_, dispatch] = React.useContext(GameContext);

    return <MiniMenuWrap>
        <IconWrap>
            <HelpIcon onClick={() => dispatch(Actions.setWindowState("Info"))}/>
        </IconWrap>
        <IconWrap>
            <SettingsIcon onClick={() => dispatch(Actions.setWindowState("Settings"))}/>
        </IconWrap>
    </MiniMenuWrap>
}

const HamburgerGrid = styled.div`
    position: absolute;
    display: grid;
    width: 100vw;
    height: 100vh;
    z-index: 4;
    grid-template-rows: 1fr 1fr 12fr;
    grid-template-columns: 2fr 6fr 2fr;
    grid-template-areas: 
        "back back back"
        "lMenuHead lMenuHead lMenuHead"
        "lMenu lMenu lMenu"
        "lMenu lMenu lMenu"
        "lMenu lMenu lMenu";
`;

const numberToPostFix = (n) => {

    const postFixMap = ["th ", "st ", "nd ", "rd ", "th ", "th ", "th ", "th ", "th ", "th "];

    return n < 10 
        ? n + postFixMap[n]
        : n < 20
            ? n + postFixMap[0]
            : n + postFixMap[n % 10]
}

const HamburgerLog = ({updateHamburgerState}) => {

    const [gameContextState, dispatch] = React.useContext(GameContext);

    return <HamburgerGrid>
        <ArrowWrap>
            <StyledArrow onClick={() => updateHamburgerState(false)}/>
        </ArrowWrap>
        <TurnMoveTracker color={gameContextState.gameState.activePlayer === "W" ? "#FFFFFF" : "#000000"}>
            <IconWrap>
                <HelpIcon onClick={() => dispatch(Actions.setWindowState("Info"))}/>
            </IconWrap>  
                {gameContextState.gameState.activePlayer === "W" ? "White's " : "Black's "}
                {numberToPostFix(gameContextState.gameState.turnNumber)} 
                Turn
            <IconWrap>
                <SettingsIcon onClick={() => dispatch(Actions.setWindowState("Settings"))}/>
            </IconWrap>
        </TurnMoveTracker>
            <MovesWrap>
                <SwapDirectionWrap>
                {
                    (gameContextState?.gameState?.moveLog ?? []).map((message, i) => (
                        message !== "-" 
                        ? <LogEntry key={`Message-${i}`} color={
                            message.substring(0, 5) === "White"
                            ? "#FFFFFF"
                            : message.substring(0, 5) === "Black"
                            ? "#000000"
                            : "#7851A9"
                        }>
                            {message}
                        </LogEntry>
                        : <Line key={`Line-${i}`}/>
                    ))
                }
                </SwapDirectionWrap>
            </MovesWrap>
    </HamburgerGrid>
}

export const Log = ({}) => {

  const [gameContextState, dispatch] = React.useContext(GameContext);
  const [hamburgerState, updateHamburgerState] = React.useState(false);

  const past1x1 = !useMediaQuery({query: '(max-aspect-ratio: 1/1)'});

  return <>
    {
        hamburgerState 
        ? <HamburgerLog updateHamburgerState={updateHamburgerState}/>
        : <MediaQuery minWidth={701}>
            <TurnMoveTracker color={gameContextState.gameState.activePlayer === "W" ? "#FFFFFF" : "#000000"}>
                { past1x1 && <IconWrap>
                    <HelpIcon onClick={() => dispatch(Actions.setWindowState("Info"))}/>
                    </IconWrap>
                }   
                    {gameContextState.gameState.activePlayer ? "White's " : "Black's "}
                    {numberToPostFix(gameContextState.gameState.turnNumber)} 
                    Turn
                { past1x1 && <IconWrap>
                    <SettingsIcon onClick={() => dispatch(Actions.setWindowState("Settings"))}/>
                    </IconWrap>
                }
            </TurnMoveTracker>
                <MovesWrap>
                    <SwapDirectionWrap>
                    {
                        (gameContextState?.gameState?.moveLog ?? []).map((message, i) => (
                            message !== "-" 
                            ? <LogEntry key={`Message-${i}`} color={
                                message.substring(0, 5) === "White"
                                ? "#FFFFFF"
                                : message.substring(0, 5) === "Black"
                                ? "#000000"
                                : "#7851A9"
                            }>
                                {message}
                            </LogEntry>
                            : <Line key={`Line-${i}`}/>
                        ))
                    }
                    </SwapDirectionWrap>
                </MovesWrap>
                { !past1x1 && <LogButtonsMiniGroup/> }
        </MediaQuery>
    }
    <MediaQuery maxWidth={700}>
        <StyledMenuIcon onClick={() => updateHamburgerState(true)}/>
    </MediaQuery>
  </>
};
