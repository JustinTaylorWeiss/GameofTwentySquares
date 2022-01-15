import React from 'react';
import * as g from '../../global/components';
import * as Actions from '../gameContext/actions'
import { GameContext } from '../gameContext';


export const PreGameMenu = ({}) => {

    const [_, dispatch] = React.useContext(GameContext);
    const first = Math.random() >= 0.5 ? "Player 1" : "Player 2" 

    return <>
        <g.Blur/> 
        <g.Window>
            <g.SubTitleTextButton key="pvpButton" onClick={() => {
                dispatch(Actions.setGameType("lpvp"))
                dispatch(Actions.setWhoFirst(first))
            }}>
                Local Player vs Player 
            </g.SubTitleTextButton>
            <g.SubTitleTextButton key="pvmButton" onClick={() => {
                dispatch(Actions.setGameType("pvm"))
                dispatch(Actions.setWhoFirst(first))
            }}>
                Player vs A.I.
            </g.SubTitleTextButton>
        </g.Window>
    </>
};
