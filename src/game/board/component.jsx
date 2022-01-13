import React from 'react';
import * as uiComponents from '../../global/components/uiComponents';
import * as uiStyles from '../../global/styles';
import { Link } from 'react-router-dom';
import styled, { css } from "styled-components";
import { GameContext, getTileStonesWithCoords, getTileModifierWithCoords, validateMove } from '../gameContext';
import * as Actions from '../actions'


const GameBoardWrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;

const GameBoardRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const GameBoardColumn = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameTile = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 6vw;
  height: 6vw;
  margin: 10px;
  color: white;
  font-size: 2.5rem;
  background-color: #cccccc;
  ${props => props.modifier && css`
    background-color: ${
      props.modifier === "Rosette" ?
        "#7851A9" :
        props.modifier === "Empty" ?
          "transparent" :
          "#aaaaaa"
     }
  `}
`;


const GameTileText = styled.div`
    color: #7851A9;
    font-size: 2.5rem;
    pointer-events: none;
    user-select: none;
    line-height: 0em;
    z-index: 3;
    ${uiStyles.absoluteCenter}
    top: calc(50% - 2px);
`;

const GameStone = styled(uiComponents.Circle)`
    width: 75%;
    height: 75%;
    z-index: 2;
    & path {
        transition: all 0.2s;
        fill: ${props => props.color && css`
            ${props.color === "W"
                ? "#FFFFFF"
                : "#000000"
            }
        `};
    }
    &:hover {
        width: 80%;
        height: 80%;
    }
`;

export const Board = ({}) => {

    const [gameContextState, gameDispatch] = React.useContext(GameContext);

    return <>
        <GameBoardWrapper>
          <GameBoardRow>
            {
              Array(7).fill(0).map((_, rowIndex) =>
                <GameBoardColumn key={`column${rowIndex}`}>
                  {
                    Array(3).fill(0).map((_, columnIndex) => {
                      const modifier = getTileModifierWithCoords(gameContextState, columnIndex, rowIndex) ?? "";
                      const stones = getTileStonesWithCoords(gameContextState, columnIndex, rowIndex) ?? [];
                      return <GameTile
                        onClick={() => {
                            if(stones[0] && validateMove(gameContextState, stones[0])) {
                                gameDispatch(Actions.moveStone(stones[0]))
                                gameDispatch(Actions.resetRolled())
                            }
                        }}
                        key={`Tile[${columnIndex},${rowIndex}]`}
                        modifier={modifier}
                      >
                        {stones.length > 0 ? <GameStone color={stones[0].charAt(0)}/> : null}
                        <GameTileText>
                            {stones.length > 0 ? stones.length : ""}
                        </GameTileText>
                      </GameTile>
                    })
                  }
                </GameBoardColumn>
              )
            }
          </GameBoardRow>
        </GameBoardWrapper>
    </>
}
