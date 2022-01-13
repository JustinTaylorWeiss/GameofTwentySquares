import * as uiComponents from '../../global/components/uiComponents';
import * as uiStyles from '../../global/styles';
import styled, { css } from "styled-components";
import { GameContext } from '../gameContext';
import React from 'react';
import * as Actions from '../actions'


const DiceRow = styled.div`
    position: absolute;
    transform: translate(-50%, 0);
    bottom: 5vh;
    left: 50vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Die = styled(uiComponents.Triangle)`
    height: 100px;
    width: 100px;
    margin: 10px;
    & path {
        transition: all 0.2s;
        fill: ${props => props.dot ? "#000000" : "#FFFFFF"}
    }
`;

const RollButton = styled.div`
    position: relative;
    margin-left: 30px;
    width: 80px;
    height: 80px;
    border-radius: 2px;
    background-color: #7851A9;
`;

const RollText = styled.div`
    color: white;
    font-size: 1.5rem;
    ${uiStyles.absoluteCenter}

    -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
`;

export const Dice = ({}) => {

    const [gameContextState, gameDispatch] = React.useContext(GameContext);

    return (
        <DiceRow>
            {
                Array(4).fill(0).map((e, i) =>
                    <Die
                        key={i}
                        dot={gameContextState.gameState.rollResult[i]}
                    />
                )
            }
            {
                !gameContextState.gameState.rolled &&
                <RollButton onClick={() => gameDispatch(Actions.rollDice())}>
                    <RollText>
                        Roll
                    </RollText>
                </RollButton>
            }
        </DiceRow>
    );
}
