import { Route, Switch, Redirect } from 'react-router-dom';
import React from 'react';
import styled from "styled-components";
import './global/styles/App.css';

import { Game }   from './game';

const AppWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  overflow: hidden;
`;

function App() {

    return <Switch>
        <Route path="/" exact={true}>
            <Redirect to="/game"/>
        </Route>
        <Route path="/game">
            <Game/>
        </Route>
    </Switch>
}

export default App;
