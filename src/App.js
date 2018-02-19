import React, { Component } from 'react';
import AppHeader from './header/AppHeader';
import ToDoListApp from './toDoListApp/ToDoListApp';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {

  render() {
    return (
      // material-uiを使うときはトップにテーマ(MuiThemeProvider)を設定する
      <MuiThemeProvider>
        <div className="App">
          <AppHeader />
          <ToDoListApp />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
