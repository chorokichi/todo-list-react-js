import React, { Component } from 'react';
import logo from './logo.svg';
import './AppHeader.css';
import AppBar from 'material-ui/AppBar';
class AppHeader extends Component {
    render() {
        return (
            // <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <h1 className="App-title">To Do List</h1>
            // </header>
            // <MuiThemeProvider>
            <AppBar
                title="Title"
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                onTitleClick={(event) => {
                    console.log("onTitleClick")
                }}
            />
            // </MuiThemeProvider>
        );
    }
}

export default AppHeader;