//@flow
import * as React from 'react';
import { Component } from 'react';
import NewItemForm from './NewItemForm';
import ToDoListTable from './ToDoListTable';
import ToDoItem from 'model/ToDoItem';
import SimpleDialog from 'util/SimpleDialog';

import './ToDoListApp.css';

let count = 0;


type Props = {
};

type State = {
    resultDialog: { open: bool, title: string, message: string },
    textFieldValue: string,
    values: ToDoItem[]
};

class ToDoListApp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            resultDialog: {
                open: false,
                title: "",
                message: ""
            },
            textFieldValue: "",
            values: [
                new ToDoItem(String(count++), "test01", new Date()),
                new ToDoItem(String(count++), "test02", new Date())] // [ToDoItem]
        };
        (this: any).onUpdateTextBox = this.onUpdateTextBox.bind(this);
        (this: any).onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onUpdateTextBox(value: string) {
        console.log("test - " + value)
        this.setState({
            textFieldValue: value
        });
    }

    openDialog(title: string, msg: string) {
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
                open: false, title: "", message: ""
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

        const item = new ToDoItem(String(count++), val, new Date());

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