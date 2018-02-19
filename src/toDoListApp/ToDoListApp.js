import React, { Component } from 'react';
import NewItemForm from './NewItemForm';
import ToDoListTable from './ToDoListTable';
import ToDoItem from 'model/ToDoItem';

import './ToDoListApp.css';

class ToDoListApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textFieldValue: "",
            values: [] // [ToDoItem]
        };
        this.onUpdateTextBox = this.onUpdateTextBox.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    onUpdateTextBox(value) {
        console.log("test - " + value)
        this.setState({
            textFieldValue: value
        });
    }

    onSubmit() {
        const val = this.state.textFieldValue.trim();
        if (val === "") {
            alert("未入力です。");
            return;
        }

        {
            const msg = "「" + val + "」を保存しました";
            console.log(msg)
            alert(msg);
        }

        const item = new ToDoItem(val, Date());

        let items = this.state.values;
        {
            console.log("追加前：");
            console.log(items);
            items.unshift(item);
            console.log("追加後：");
            console.log(items)
        }
        this.setState({
            textFieldValue: "",
            values: items
        })
    }

    onEnter() {
        this.onSubmit();
    }

    render() {
        return (
            <div className="ToDoListApp">
                <NewItemForm
                    value={this.state.textFieldValue}
                    onTextChange={this.onUpdateTextBox}
                    onSubmit={this.onSubmit}
                    onEnter={this.onEnter}
                />
                <ToDoListTable
                    items={this.state.values}
                />
            </div>
        );
    }

}


export default ToDoListApp;