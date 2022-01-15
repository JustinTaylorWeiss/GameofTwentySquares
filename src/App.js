import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import './global/styles/App.css';

import { Game }   from './game';

function App() {

    return <Switch>
        <Route path="/GameofTwentySquares">
            <Game/>
        </Route>
    </Switch>
}

/* 

<Route path="/" exact={true}>
    <Redirect to="/game"/>
</Route>
<Route path="/game">
    <Game/>
</Route>

*/

export default App;
