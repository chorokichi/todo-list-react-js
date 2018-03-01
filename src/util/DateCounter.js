import React from 'react'
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DataUtil from 'util/DateUtil';

export default class DateCounter extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date()
        }
    }

    componentDidMount() {
        console.log("DateCounter componentDidMount")
        this.timerID = setInterval(
            () => {
                this.setState((prevState, props) => ({
                    date: new Date()
                }))
            },
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    getYYYYMMDD() {
        const today = this.state.date;
        return today.getFullYear() + "/"
            + (today.getMonth() + 1)
            + "/" + today.getDate()
            + " " + today.getHours()
            + ":" + today.getMinutes()
            + " " + today.getSeconds();
    }

    render() {
        const date = this.state.date;
        return (
            <MuiThemeProvider>
                <FlatButton>{DataUtil.getLongDate(date)}</FlatButton>
            </MuiThemeProvider>
        )
    }
}