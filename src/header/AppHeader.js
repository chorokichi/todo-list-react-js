// @flow
import * as React from 'react';
import { Component } from 'react';
import logo from './logo.svg';
import './AppHeader.css';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import DateCounter from 'util/DateCounter';


type Props = {
};

type State = {
    open: bool,
};


class AppHeader extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        console.log("AppHeader componentDidMount")
    }

    componentWillUnmount() {
        console.log("AppHeader componentWillUnmount")
    }

    chnageDrawerOpenStatus() {
        this.setState({ open: !this.state.open })
    }



    render() {
        console.log("AppHeader is rendering...")
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
                    iconElementRight={<DateCounter />}
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
                            {<DateCounter />}
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
        );
    }
}

export default AppHeader;