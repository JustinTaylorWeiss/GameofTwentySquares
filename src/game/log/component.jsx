import React from 'react';
import styled from "styled-components";
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';
import { HelpIcon } from './assets/helpIcon';
import { SettingsIcon } from './assets/settingsIcon';

import { useMediaQuery } from 'react-responsive'

const TurnMoveTracker = styled.div`
    grid-area: lMenuHead;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-size: 2rem;
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

export const Line = styled.div`
    width: 80%;
    margin: 20px auto;
    text-align: center;
    border-bottom: solid 2px #7851A9;
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

export const Log = ({}) => {

  const [gameContextState, dispatch] = React.useContext(GameContext);

  const past1x1 = !useMediaQuery({query: '(max-aspect-ratio: 1/1)'});

  return <>
      <TurnMoveTracker color={gameContextState.gameState.activePlayer === "W" ? "#FFFFFF" : "#000000"}>
          { past1x1 && <IconWrap>
              <HelpIcon onClick={() => dispatch(Actions.setWindowState("Info"))}/>
            </IconWrap>
          }   
              Turn {gameContextState.gameState.turnNumber}
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
  </>
};
