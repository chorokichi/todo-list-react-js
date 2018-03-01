import React, { Component } from 'react';
import NewItemForm from './NewItemForm';
import ToDoListTable from './ToDoListTable';
import ToDoItem from 'model/ToDoItem';
import SimpleDialog from 'util/SimpleDialog';

import './ToDoListApp.css';

let count = 0;

class ToDoListApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultDialog: {
                open: false,
                title: "",
                message: ""
            },
            textFieldValue: "",
            values: [
                new ToDoItem(count++, "test01", new Date()),
                new ToDoItem(count++, "test02", new Date())] // [ToDoItem]
        };
        this.onUpdateTextBox = this.onUpdateTextBox.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
    onUpdateTextBox(value) {
        console.log("test - " + value)
        this.setState({
            textFieldValue: value
        });
    }

    openDialog(title, msg) {
        this.setState({
            resultDialog: {
                open: true,
                title: title,
                message: msg
            }
        })
    }

    closeDialog() {
        this.setState({
            resultDialog: {
                open: false
            }
        })
    }

    onSubmit() {
        const val = this.state.textFieldValue.trim();
        if (val === "") {
            alert("未入力です。");
            return false;
        }

        {
            const msg = "「" + val + "」を保存しました";
            console.log(msg)
            this.openDialog("結果", msg)
        }

        const item = new ToDoItem(count++, val, new Date());

        let items = this.state.values;
        (() => {
            console.log("追加前：");
            console.log(items);
            items.unshift(item);
            console.log("追加後：");
            console.log(items)
        })();
        this.setState({
            textFieldValue: "",
            values: items
        })

        return true;
    }

    render() {
        console.log("ToDoListApp is rendering...")
        return (
            <div className="ToDoListApp">
                <NewItemForm
                    value={this.state.textFieldValue}
                    onTextChange={this.onUpdateTextBox}
                    onSubmit={this.onSubmit}
                />

                <ToDoListTable
                    items={this.state.values}
                />

                <SimpleDialog
                    title={this.state.resultDialog.title}
                    message={this.state.resultDialog.message}
                    open={this.state.resultDialog.open}
                    onClickOK={() => {
                        console.log("OK!")
                        this.closeDialog();
                    }}
                    onClickCancel={() => {
                        console.log("Cancel!");
                        this.closeDialog();
                    }}
                />
            </div >
        );
    }

}


export default ToDoListApp;