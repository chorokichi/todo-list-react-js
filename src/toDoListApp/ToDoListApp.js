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
    values: TaskItem[],
    tableSelectable: bool,
};

class ToDoListApp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const now = new Date();
        const values = [
            new TaskItem(outputId(), "test01", now, now),
            new TaskItem(outputId(), "test02", now, now)
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
            values: values,
            tableSelectable: false
        };
        (this: any).onUpdateTextBox = this.onUpdateTextBox.bind(this);
        (this: any).onSubmit = this.onSubmit.bind(this);
        (this: any).updateSelectedStatus = this.updateSelectedStatus.bind(this);
        (this: any).deleteSectedItems = this.deleteSectedItems.bind(this);
        (this: any).deleteItem = this.deleteItem.bind(this);
        (this: any).updateBulkOperationMode = this.updateBulkOperationMode.bind(this);
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

        const createdOn = new Date();
        const item = new TaskItem(outputId(), val, createdOn, createdOn);

        // ToDoListTableがPureComponentのため、その中で利用するvaluesが別のオブジェクトになるように工夫している
        const newItems = [item, ...this.state.values]
        this.setState({
            textFieldValue: "",
            values: newItems
        })

        return true;
    }

    updateSelectedStatus(selectedRows: number[] | 'all') {
        const newItems: TaskItem[] = [];
        if (selectedRows === "all") {
            this.state.values.forEach((element: TaskItem, index: number) => {
                element.selected = true
                newItems.push(element)
            })
        } else {
            for (var i = 0; i < this.state.values.length; i++) {
                let item = this.state.values[i];
                if (selectedRows.includes(i)) {
                    item.selected = true;
                    newItems.push(item);
                } else {
                    item.selected = false;
                    newItems.push(item);
                }
            }
        }

        console.log("newItems => ")
        console.log(newItems)
        // ここでstateを変えるとテーブル全体の再描画が開始してチェックが強制的にはずれる...
        this.setState({
            values: newItems
        })
    }

    deleteSectedItems() {
        console.log("deleteSectedItems");
        this.setState((preState: State, preProps: Props) => {
            let items = preState.values;
            items = items.filter(function (item) {
                return !item.selected;
            });

            return ({
                values: items,
                tableSelectable: false
            })
        })
    }

    deleteItem(num: number) {
        console.log(`deleteItem(${num}): ${String(this.state.values[num])}`);
        console.info("Before: ")
        const newItems: TaskItem[] = [];
        this.state.values.forEach((value: TaskItem, index: number, array: TaskItem[]) => {
            console.table(value);
            if (index !== num) {
                newItems.push(value);
            }
        });
        console.info("After: ")
        console.log(newItems)

        this.setState({
            values: newItems
        })
    }

    updateBulkOperationMode() {
        console.log(`enableBulkOperationMode: ${String(this.state.tableSelectable)} -> ${String(this.state.tableSelectable)}`);
        this.setState((prevState: State, prevProps: Props) => {
            return ({
                tableSelectable: !prevState.tableSelectable
            });
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
                    deleteSectedItems={this.deleteSectedItems}
                    updateBulkOperationMode={this.updateBulkOperationMode}
                    deleteItem={this.deleteItem}
                    selectable={this.state.tableSelectable}
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