import React, { Component } from 'react';
import AppHeader from './header/AppHeader';
import ToDoListApp from './toDoListApp/ToDoListApp';
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div className="App">
        <AppHeader />
        <ToDoListApp />
      </div>
    );
  }
}

export default App;
