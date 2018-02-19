import React, { Component } from 'react';
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
    }

    handleClick() {
        console.log("Click")

        // 保存する処理は上
        this.props.onSubmit();
    }

    handleChange(event) {
        let value = event.target.value;
        console.log("onChange - " + value)
        this.props.onTextChange(value);
    }

    handleKeyPress(event) {
        const ENTER = 13 // Enter Key Code
        console.log("event: " + event.which);
        if (ENTER === event.which) {
            this.props.onEnter();
        }
    }

    render() {
        return (
            <div className="NewItemForm">
                <input
                    className="TextComp" type="text"
                    value={this.props.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress} />
                <button
                    className="ButtonComp"
                    onClick={this.handleClick}>
                    追加
                    </button>
            </div>
        );
    }
}


export default NewItemForm;