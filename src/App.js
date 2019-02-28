import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import HomePage from './app/modules/home-page/HomePage';

import './scss/style.css';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <div id="wrapper">
                <div id="app">
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                    </Switch>
                </div>
            </div>
      </div>
    );
  }
}

export default App;
