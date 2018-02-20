import React, { Component } from 'react';
import logo from './logo.svg';
import './AppHeader.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class AppHeader extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            now: new Date()
        };
    }

    chnageDrawerOpenStatus() {
        this.setState({ open: !this.state.open })
    }

    render() {
        return (
            // <header className="App-header">
            //     <img src={logo} className="App-logo" alt="logo" />
            //     <h1 className="App-title">To Do List</h1>
            // </header>
            // <MuiThemeProvider>
            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onTitleClick={(event) => {
                        console.log("onTitleClick")
                    }}
                    onLeftIconButtonClick={(event) => {
                        console.log("onLeftIconButtonClick")
                        this.chnageDrawerOpenStatus();
                    }}
                    iconElementLeft={<img src={logo} className="App-logo" alt="logo" />}
                >

                </AppBar>
                <Drawer open={this.state.open}>
                    <Menu onItemClick={(event, menuItem, index) => {
                        console.log("On Item Click!");
                        console.log(event);
                        console.log(menuItem);
                        console.log(index);
                        this.chnageDrawerOpenStatus();
                    }}>
                        <MenuItem>
                            {"" + Date.now()}
                        </MenuItem>
                        <MenuItem>
                            <a href="https://reactjs.org/docs/hello-world.html"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                React Doc
                            </a>
                        </MenuItem>

                        <MenuItem>
                            <a href="http://www.material-ui.com/#/"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                Material UI Doc
                            </a>
                        </MenuItem>
                    </Menu>
                </Drawer>
            </div>

            // </MuiThemeProvider>
        );
    }
}

export default AppHeader;