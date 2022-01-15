import React from 'react';
import styled, { css } from "styled-components";
import * as g from '../../global/components';
import * as Actions from '../gameContext/actions'
import { GameContext, getTileStonesWithCoords, getTileModifierWithCoords, validateMove, rowLetterMap } from '../gameContext';


const GameBoardWrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1vw 1vw 0 0;
`;

const GameBoardCornerDot = styled.div`
  width: 2vw;
  height: 2vw;
  margin: 10px;
`

const GameBoardColumnLabel = styled.div`
  width: 6vw;
  height: 2vw;
  font-size: 1.6vw;
  margin: 10px;
  color: white;
  text-align: center;
`

const GameBoardRowLabel = styled.div`
  width: 2vw;
  height: 6vw;
  font-size: 1.6vw;
  margin: 10px;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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


/*
<div className='scalable'>
    <img className='drop-shadow' id={ planet.name } src={ planet.image } alt={ planet.name } />
</div>
*/


const GameTileText = styled.div`
    color: #7851A9;
    font-size: 2.5rem;
    pointer-events: none;
    user-select: none;
    line-height: 0em;
    z-index: 3;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: absolute;
    top: calc(50% - 2px);
`;

const GameStone = styled(g.Circle)`
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

    const [gameContextState, dispatch] = React.useContext(GameContext);

    return <>
        <GameBoardWrapper>
          <GameBoardRow>
            <GameBoardColumn key={`Labelcolumn`}>
              <GameBoardRowLabel key="Label3">3</GameBoardRowLabel>
              <GameBoardRowLabel key="Label2">2</GameBoardRowLabel>
              <GameBoardRowLabel key="Label1">1</GameBoardRowLabel>
              <GameBoardCornerDot/>
            </GameBoardColumn>
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
                                  dispatch(Actions.moveStone(stones[0]))
                                  dispatch(Actions.resetRolled())
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
                  <GameBoardColumnLabel key={`${rowIndex}CLabel`}>{ rowLetterMap?.[rowIndex] ?? ""}</GameBoardColumnLabel>
                </GameBoardColumn>
              )
            }
          </GameBoardRow>
        </GameBoardWrapper>
    </>
};
