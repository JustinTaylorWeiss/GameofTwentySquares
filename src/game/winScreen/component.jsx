import React from 'react';
import * as g from '../../global/components';
import * as Actions from '../gameContext/actions';
import { GameContext } from '../gameContext';

export const WinScreen = ({}) => {
    
    const [gameContextState, dispatch] = React.useContext(GameContext);

    return <>
        <g.Blur/> 
        <g.Window>
            <g.SubTitleText>
                { gameContextState.boardState[0][5].length >= 6 && "White Wins!" }
                { gameContextState.boardState[2][5].length >= 6 && "Black Wins!" }
            </g.SubTitleText>
            <g.SubTitleTextButton onClick={() => dispatch(Actions.resetState())}>
                Play Again
            </g.SubTitleTextButton>
        </g.Window>
    </>
}
