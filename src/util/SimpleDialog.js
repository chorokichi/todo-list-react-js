import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/** props={title, message, open, onClickOK, onClickCancel */
class SimpleDialog extends Component {

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => {
                    this.props.onClickCancel();
                }}
            />,
            <FlatButton
                label="OK"
                primary={true}
                keyboardFocused={true}
                onClick={() => {
                    // キーボードでフォーカス時にエンターを押すと二回呼ばれるバグあり
                    // https://github.com/mui-org/material-ui/pull/9439
                    this.props.onClickOK();
                }}
            />,
        ];
        return (
            <Dialog
                title={this.props.title}
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={() => {
                    console.log("onRequestClose");
                    this.props.onClickCancel();
                }}
            >
                {this.props.message}
            </Dialog>
        );
    }
}


export default SimpleDialog;