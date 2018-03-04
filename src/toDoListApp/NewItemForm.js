// @flow

import * as React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import './NewItemForm.css';


type Props = {
    value: string,
    onTextChange: (string) => void,
    onSubmit: () => bool
};

type State = {
    disabled: bool
};

/** 
 * 新規のItemを追加するUIコンポーネント
 * ## 状態を持たないコンポーネント(propsで受け取ったデータを活用している)
*/
class NewItemForm extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        (this: any).handleClick = this.handleClick.bind(this);
        (this: any).handleChange = this.handleChange.bind(this);
        (this: any).handleKeyPress = this.handleKeyPress.bind(this);

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

    handleChange(event: SyntheticEvent<HTMLInputElement>) {
        let value = (event.currentTarget: HTMLInputElement).value;
        console.log("onChange - " + value)

        const val = value.trim();

        // 空でなければサブミットボタンを有効にする
        {
            const disabled = (val === "")
            console.log("disabled: " + String(disabled));
            this.setState({
                disabled: disabled
            })
        }

        this.props.onTextChange(value);
    }

    handleKeyPress(event: SyntheticKeyboardEvent<HTMLInputElement>) {
        const ENTER = 13 // Enter Key Code
        const keyNum = event.which;
        console.log("event: " + keyNum);
        if (ENTER === keyNum) {
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

// NewItemForm.propTypes = {
//     value: PropTypes.string.isRequired,
//     onTextChange: PropTypes.func.isRequired,
//     onSubmit: PropTypes.func.isRequired
// };

export default NewItemForm;