import React, { Component } from 'react';
import logo from './logo.svg';
import './AppHeader.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class AppHeader extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            now: new Date()
        };
    }

    componentDidMount() {
        // this.timerID = setInterval(
        //     () => this.tick(),
        //     1000
        // );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    chnageDrawerOpenStatus() {
        this.setState({ open: !this.state.open })
    }

    tick() {
        this.setState({
            now: new Date()
        });
    }

    getYYYYMMDD() {
        const today = this.state.now;
        return today.getFullYear() + "/"
            + (today.getMonth() + 1)
            + "/" + today.getDate()
            + " " + today.getHours()
            + ":" + today.getMinutes()
            + " " + today.getSeconds();
    }

    render() {
        return (
            <div>
                <AppBar
                    title="Reactive To Doリスト"
                    onTitleClick={(event) => {
                        console.log("onTitleClick")
                    }}
                    onLeftIconButtonClick={(event) => {
                        console.log("onLeftIconButtonClick")
                        this.chnageDrawerOpenStatus();
                    }}
                    iconElementRight={<FlatButton label={this.getYYYYMMDD()} />}
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
                            {this.getYYYYMMDD()}
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
            </div >

            // </MuiThemeProvider>
        );
    }
}

export default AppHeader;