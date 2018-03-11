//@flow
import * as React from 'react';
import { Component } from 'react';
import NewItemForm from './NewItemForm';
import ToDoListTable from './ToDoListTable';
import TaskItem from 'model/TaskItem';
import SimpleDialog from 'util/SimpleDialog';

import './ToDoListApp.css';

let count = 1;
const outputId = (): string => {
    return String(('0000' + count++).slice(-4));
}

type Props = {
};

type State = {
    resultDialog: { open: bool, title: string, message: string },
    textFieldValue: string,
    values: TaskItem[]
};

class ToDoListApp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const values = [
            new TaskItem(outputId(), "test01", new Date()),
            new TaskItem(outputId(), "test02", new Date())
        ]

        values.sort((a: TaskItem, b: TaskItem): number => {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        })

        this.state = {
            resultDialog: {
                open: false,
                title: "",
                message: ""
            },
            textFieldValue: "",
            values: values
        };
        (this: any).onUpdateTextBox = this.onUpdateTextBox.bind(this);
        (this: any).onSubmit = this.onSubmit.bind(this);
        (this: any).updateSelectedStatus = this.updateSelectedStatus.bind(this);
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

        const item = new TaskItem(outputId(), val, new Date());

        // ToDoListTableがPureComponentのため、その中で利用するvaluesが別のオブジェクトになるように工夫している
        const newItems = [item, ...this.state.values]
        this.setState({
            textFieldValue: "",
            values: newItems
        })

        return true;
    }

    updateSelectedStatus(selectedRows: number[]) {
        let newItems: TaskItem[] = [];

        if (selectedRows === "all") {
            this.state.values.forEach((element: TaskItem, index: number) => {
                element.closed = true
                newItems.push(element)
            })
        } else {
            for (var i = 0; i < this.state.values.length; i++) {
                console.log("i: " + i)
                let item = this.state.values[i];
                if (selectedRows.includes(i)) {
<<<<<<< HEAD
                    item.selected = true
                    newItems.push(item);
                } else {
                    item.selected = false
=======
                    if (item.selected) {
                        // すでに完了済みのため無視
                    } else {
                        item.closed = true;
                        item.updatedOn = new Date();
                    }

                    newItems.push(item);
                } else {
                    if (item.selected) {
                        item.closed = false;
                        item.updatedOn = new Date();
                    } else {
                        // もともと未完了のため
                    }

>>>>>>> 1ba4e7a0f29f583854f795181d56b56417d514cc
                    newItems.push(item);
                }
            }
        }

        console.log("newItems")
        console.log(newItems)
        // ここでstateを変えるとテーブル全体の再描画が開始してチェックが強制的にはずれる...
        this.setState({
            values: newItems
        })
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
                    updateSelectedStatus={this.updateSelectedStatus}
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