import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './NewItemForm.css';

/** 
 * 新規のItemを追加するUIコンポーネント
 * ## 状態を持たないコンポーネント(propsで受け取ったデータを活用している)
*/
class NewItemForm extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            disabled: true
        }
    }

    submit() {
        // 保存する処理は上
        if (this.props.onSubmit()) {
            this.setState({
                disabled: true
            })
        };
    }

    handleClick() {
        console.log("Click")
        this.submit();
    }

    handleChange(event) {
        let value = event.target.value;
        console.log("onChange - " + value)

        const val = value.trim();

        // 空でなければサブミットボタンを有効にする
        {
            const disabled = (val === "")
            console.log("disabled: " + disabled);
            this.setState({
                disabled: disabled
            })
        }

        this.props.onTextChange(value);
    }

    handleKeyPress(event) {
        const ENTER = 13 // Enter Key Code
        console.log("event: " + event.which);
        if (ENTER === event.which) {
            this.submit();
        }
    }

    render() {
        console.log("NewItemForm is rendering...")
        return (
            <div className="NewItemForm">
                <TextField
                    style={{ width: "80%" }}
                    floatingLabelText="タスク"
                    floatingLabelFixed
                    className="TextComp"
                    // fullWidth
                    value={this.props.value}
                    hintText="新しいタスクの登録..."
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}

                />

                <FlatButton
                    style={{ width: "50" }}
                    className="ButtonComp"
                    label="追加"
                    disabled={this.state.disabled}
                    onClick={this.handleClick} />



            </div>
        );
    }
}


export default NewItemForm;