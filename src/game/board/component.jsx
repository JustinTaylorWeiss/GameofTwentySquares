import React from 'react';
import styled, { css } from "styled-components";
import * as g from '../../global/components';
import * as Actions from '../gameContext/actions'
import { GameContext, getTileStonesWithCoords, getTileModifierWithCoords, validateMove, rowLetterMap } from '../gameContext';


const GameBoardGrid = styled.div`
  grid-area: board;
  display: grid;
  align-self: center;
  margin: 0 1vw;
  aspect-ratio: 25/10;
  grid-template-rows: 3fr 3fr 3fr 1fr;
  grid-template-columns: 1fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr;
  grid-template-areas: 
    "RL2 A3 B3 C3 D3 E3 F3 G3 H3"
    "RL1 A2 B2 C2 D2 E2 F2 G2 H2"
    "RL0 A1 B1 C1 D1 E1 F1 G1 H1"
    ". CL0 CL1 CL2 CL3 CL4 CL5 CL6 CL7";
  gap: 8px;
  @media only screen and (max-aspect-ratio: 1/1) {
    margin: 1vh 0;
    aspect-ratio: 10/25;
    grid-template-columns: 1fr 3fr 3fr 3fr;
    grid-template-rows: 1fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr 3fr;
    grid-template-areas: 
      ". RL0 RL1 RL2"
      "CL0 A1 A2 A3"
      "CL1 B1 B2 B3"
      "CL2 C1 C2 C3"
      "CL3 D1 D2 D3"
      "CL4 E1 E2 E3"
      "CL5 F1 F2 F3"
      "CL6 G1 G2 G3"
      "CL7 H1 H2 H3"
  }
`;

const GameBoardLabel = styled.div`
  color: white;
  text-align: center;
  place-self: center;
  font-size: 1.5rem;
  grid-area: ${props => props.gridarea};
`;

const GameTile = styled.div`
  position: static;
  width: 100%;
  height: 100%;
  text-align: center;
  color: white;
  font-size: 2.5rem;
  background-color: #cccccc;
  grid-area: ${props => props.gridarea};
  background-color: ${props => props.modifier === "Rosette"
    ? "#7851A9" 
    : props.modifier === "Empty" 
      ? "transparent" 
      : "#aaaaaa"
  };
`;

const StoneTextWrap = styled.div`
  display: flex;
  align-items: center;
  margin: 15%;
  :hover {
      margin: 10%;
      cursor: pointer;
    }
`;

const GameTileText = styled.div`
    width: 100%;
    margin-left: -100%;
    color: #7851A9;
    font-size: 2.5rem;
    pointer-events: none;
    user-select: none;
    grid-area: center;
    z-index: 3;
    line-height: 1em;
`;

const GameStone = styled(g.Circle)`
    width: 100%;
    color: #7851A9;
    grid-area: center;
    pointer-events: none;
    user-select: none;
    z-index: 2;
    fill: ${props => props.color === "W"
      ? "#FFFFFF"
      : "#000000"
    };
`;



export const Board = ({}) => {

    const [gameContextState, dispatch] = React.useContext(GameContext);

    return <GameBoardGrid>
      {[
          ...Array(3).fill(0).map((_, rowIndex) => <GameBoardLabel key={`RL${rowIndex}`} gridarea={`RL${rowIndex}`}> {`${rowIndex+1}`} </GameBoardLabel>),
          ...Array(8).fill(0).map((_, columnIndex) => <GameBoardLabel key={`CL${columnIndex}`} gridarea={`CL${columnIndex}`}> {`${rowLetterMap[columnIndex]}`} </GameBoardLabel>),
      ]}
      {
        Array(3).fill(0).map((_, rowIndex) => (
          Array(8).fill(0).map((_, columnIndex) => {
            const modifier = getTileModifierWithCoords(gameContextState, rowIndex, columnIndex) ?? "";
            const stones = getTileStonesWithCoords(gameContextState, rowIndex, columnIndex) ?? [];
            return (
              <GameTile 
                key={`${rowIndex}${columnIndex}`} 
                gridarea={`${rowLetterMap[columnIndex]}${rowIndex+1}`} 
                modifier={modifier}
                onClick={() => {
                  if(stones[0] && validateMove(gameContextState, stones[0])) {
                      dispatch(Actions.moveStone(stones[0]));
                      dispatch(Actions.resetRolled());
                  }
                }}
              > 
              { 
                stones.length > 0 && <StoneTextWrap>
                    <GameStone key={`Stone${rowIndex}${columnIndex}`} color={stones[0].charAt(0)}/>
                    <GameTileText key={`StoneText${rowIndex}${columnIndex}`}> {stones.length} </GameTileText>
                </StoneTextWrap>
              }
              </GameTile>
            );
          })
        ))
      }
    </GameBoardGrid>
};


/*
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
*/


/*
Array(4).fill(0).map((_, rowIndex) => <>
            
              Array(9).fill(0).map((_, columnIndex) => {
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
            <GameBoardColumnLabel key={`${rowIndex}CLabel`}>{ rowLetterMap?.[rowIndex] ?? ""}</GameBoardColumnLabel>
          </GameBoardColumn>
        </>)
      }
    </GameBoardGrid>
*/