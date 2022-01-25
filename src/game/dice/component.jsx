import React from 'react';
import styled from "styled-components";
import * as g from '../../global/components';
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';


const DiceRow = styled.div`
    grid-area: dice;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-self: center;
    padding: 0 10%;
    max-width: 50vw;
    @media only screen and (max-aspect-ratio: 1/1) {
        flex-direction: column-reverse;
        grid-area: rMenu;
        height: 50%;
        @media only screen and (max-width: 700px) {
            flex-direction: row;
            grid-area: dice;
            width: 75%;
            align-self: center;
            justify-self: center;
        }
    }
`;

const Die = styled(g.Triangle)`
    fill: ${props => props.color === "W"
      ? "#FFFFFF"
      : "#000000"
    };
`;

const DieWrap = styled.div`
    aspect-ratio: 1;
    width: 12%;
    margin: 5% 2%;
    @media only screen and (max-aspect-ratio: 1/1) {
        width: auto;
        flex-grow: 2;
    }
`;

const RollWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    aspect-ratio: 1;
    width: 8%;
    margin-left: 2%;
    @media only screen and (max-aspect-ratio: 1/1) {
        width: auto;
        flex-grow: 1;
    }
`;

const RollButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    color: white;
    font-size: 1.2rem;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    background-color: #7851A9;
    :hover {
        cursor: pointer;
    }
    @media only screen and (max-aspect-ratio: 1/1) {
        margin: 5% 2%;
    }
    @media only screen and (max-width: 1300px) {
        font-size: 0.75rem;
    }
`;

export const Dice = ({}) => {

    const [gameContextState, dispatch] = React.useContext(GameContext);
    
    return (
        <DiceRow>
            {
                Array(4).fill(0).map((e, i) =>
                    <DieWrap key={`Wrap${i}`}>
                        <Die
                            key={`Die${i}`}
                            color={gameContextState.gameState.rollResult[i] ? "B" : "W"}
                        />
                    </DieWrap>
                )
            }
            {
                !gameContextState.gameState.rolled && <RollWrap>
                        <RollButton onClick={() => dispatch(Actions.rollDice())}>
                            Roll
                        </RollButton>
                </RollWrap>
            }
        </DiceRow>
    );
}
