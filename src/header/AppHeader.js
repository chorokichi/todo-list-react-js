import React, { Component } from 'react';
import logo from './logo.svg';
import './AppHeader.css';

class AppHeader extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">To Do List</h1>
            </header>
        );
    }
}

export default AppHeader;