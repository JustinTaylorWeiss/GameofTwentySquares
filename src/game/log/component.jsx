import React from 'react';
import styled from "styled-components";
import { GameContext } from '../gameContext';
import { HelpIcon } from './assets/helpIcon';
import { SettingsIcon } from './assets/settingsIcon';


const LogWrap = styled.div` 
    position : absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transform: translate(-50%, -50%);
    top: 50vh;
    left: 11.5vw;
    width: calc(23vw - 50px);
    height: calc(100vh - 50px);
    background-color: #aaaaaa; 
`;

const TurnMoveTracker = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    width: 100%;
    text-align: left;
    font-size: 2rem;
    color: ${props => props.color};
    background-color: #7851A9;
    border-bottom: 2px solid #000000;
`;

const MovesWrap = styled.div` 
    display: flex;
    flex-direction: column-reverse;
    height: calc(90vh - 50px);
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
`;

const IconWrap = styled.div`
    height: 6vh;
    width: 6vh;
    padding: 0 20px;
`;

const LogEntry = styled.div`
    width: 100%;
    font-size: 1.75rem;
    letter-spacing: 0.05em;
    margin-left: 1vw;
    color: ${props => props.color};
`;

const SwapDirectionWrap = styled.div`
    padding: 10px 0;
    flex-grow: 1;
`;

export const Line = styled.div`
    width: 80%;
    margin: 20px auto;
    text-align: center;
    border-bottom: solid 2px #7851A9;
`;

export const Log = ({}) => {

  const [gameContextState, gameDispatch] = React.useContext(GameContext);

  return <LogWrap>
      <TurnMoveTracker color={gameContextState.gameState.activePlayer === "W" ? "#FFFFFF" : "#000000"}>
          <IconWrap>
              <HelpIcon/>
          </IconWrap>
              Turn {gameContextState.gameState.turnNumber}
          <IconWrap>
              <SettingsIcon/>
          </IconWrap>
      </TurnMoveTracker>
          <MovesWrap>
              <SwapDirectionWrap>
              {
                  (gameContextState?.gameState?.moveLog ?? []).map((message, i) => (
                      message !== "-" 
                      ? <LogEntry color={
                          message.substring(0, 5) === "White"
                          ? "#FFFFFF"
                          : message.substring(0, 5) === "Black"
                          ? "#000000"
                          : "#7851A9"
                      } key={`log-${i}`}>
                          {message}
                      </LogEntry>
                      : <Line/>
                  ))
              }
              </SwapDirectionWrap>
          </MovesWrap>
  </LogWrap>
};
