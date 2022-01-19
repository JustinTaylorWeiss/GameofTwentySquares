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
    @media only screen and (max-aspect-ratio: 1/1) {
        flex-direction: column-reverse;
        grid-area: rMenu;
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
    aspect-ratio: 1;
    margin: 10px;
    max-height: 12vh;
    fill: ${props => props.color === "W"
      ? "#FFFFFF"
      : "#000000"
    };
    @media only screen and (max-width: 700px) {
        margin: 5px;
    }
`;

const RollButton = styled.div`
    position: relative;
    margin-left: 30px;
    max-height: 12vh;
    border-radius: 2px;
    padding: 50px;
    background-color: #7851A9;
    :hover {
        cursor: pointer;
    }
    @media only screen and (max-aspect-ratio: 1/1) {
        margin: 0 0 30px 0;
    }
    @media only screen and (max-width: 700px) {
        margin: 0 0 0 10px;
        padding: 30px;
    }
`;

const RollText = styled.div`
    color: white;
    font-size: 1.5rem;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    position: absolute;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    @media only screen and (max-width: 700px) {
        font-size: 0.75rem;
    }
`;

export const Dice = ({}) => {

    const [gameContextState, dispatch] = React.useContext(GameContext);
    
    return (
        <DiceRow>
            {
                Array(4).fill(0).map((e, i) =>
                    <Die
                        key={i}
                        color={gameContextState.gameState.rollResult[i] ? "B" : "W"}
                    />
                )
            }
            {
                !gameContextState.gameState.rolled &&
                <RollButton onClick={() => dispatch(Actions.rollDice())}>
                    <RollText>
                        Roll
                    </RollText>
                </RollButton>
            }
        </DiceRow>
    );
}
