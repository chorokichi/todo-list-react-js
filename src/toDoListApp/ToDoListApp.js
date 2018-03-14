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

class Type {
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}
const DialogType = (() => {
    return {
        Confirmation: new Type("Confirmation"),
        Add: new Type("Add"),
        Delete: new Type("Delete"),
        MultiDelete: new Type("MultiDelete")
    }
})()


type Props = {
};

type State = {
    resultDialog: { open: bool, title: string, message: string, type: Type },
    textFieldValue: string,
    values: TaskItem[],
    tableSelectable: bool
};

class ToDoListApp extends Component<Props, State> {

    selectedNum: number = -1;

    constructor(props: Props) {
        super(props);
        const now = new Date();
        const values = [
            new TaskItem(outputId(), "test01", now, now),
            new TaskItem(outputId(), "test02", now, now)
        ]

        for (var i = 0; i < 100; i++) {
            values.push(new TaskItem(outputId(), "auto" + i, now, now));
        }

        values.sort((a: TaskItem, b: TaskItem): number => {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        })

        this.state = {
            resultDialog: {
                open: false,
                title: "",
                message: "",
                type: DialogType.Confirmation
            },
            textFieldValue: "",
            values: values,
            tableSelectable: false
        };


        console.log("DialogType.Confirmation: " + String(DialogType.Confirmation.type));

        (this: any)._onUpdateTextBox = this._onUpdateTextBox.bind(this);
        (this: any)._onSubmit = this._onSubmit.bind(this);
        (this: any)._updateSelectedStatus = this._updateSelectedStatus.bind(this);
        (this: any)._deleteSectedItems = this._deleteSectedItems.bind(this);
        (this: any)._deleteItem = this._deleteItem.bind(this);
        (this: any)._updateBulkOperationMode = this._updateBulkOperationMode.bind(this);
        (this: any)._onTextChange = this._onTextChange.bind(this);
        (this: any)._closeDialog = this._closeDialog.bind(this);

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    _onUpdateTextBox(value: string) {
        console.log("test - " + value)
        this.setState({
            textFieldValue: value
        });
    }

    openDialog(title: string, msg: string, type: Type) {
        console.log(`Open Dialog: ${title}/${msg} [${String(type)}]`)
        this.setState({
            resultDialog: {
                open: true,
                title: title,
                message: msg,
                type: type
            }
        })
    }

    _closeDialog(isCancel: bool) {
        console.log("_closeDialog: " + String(isCancel));
        if (!isCancel) {
            if (this.state.resultDialog.type === DialogType.MultiDelete) {
                this.deleteSectedItems();
            }
            else if (this.state.resultDialog.type === DialogType.Delete) {
                this.deleteItem();
            }
        }
        this.setState({
            resultDialog: {
                open: false, title: "", message: "", type: DialogType.Confirmation
            }
        })
    }

    _onSubmit() {
        const val = this.state.textFieldValue.trim();
        if (val === "") {
            alert("未入力です。");
            return false;
        }

        {
            const msg = "「" + val + "」を保存しました";
            console.log(msg)
            this.openDialog("結果", msg, DialogType.Confirmation)
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

    _updateSelectedStatus(selectedRows: number[] | 'all') {
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

    _deleteSectedItems() {
        console.log("_deleteSectedItems");
        this.openDialog("結果", "選択したタスクを削除してもよろしいですか？", DialogType.MultiDelete);
    }

    deleteSectedItems() {
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

    _deleteItem(num: number) {
        console.log(`_deleteItem:${num}`);
        this.selectedNum = num;
        this.openDialog("確認", `このタスク「${this.state.values[num].value}」を削除してもよろしいですか？`, DialogType.Delete);
    }

    deleteItem() {
        const num = this.selectedNum;
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

    _updateBulkOperationMode() {
        console.log(`enableBulkOperationMode: ${String(this.state.tableSelectable)} -> ${String(this.state.tableSelectable)}`);
        this.setState((prevState: State, prevProps: Props) => {
            return ({
                tableSelectable: !prevState.tableSelectable
            });
        })
    }

    /**
     * 一文字ずつではなく確定したときに呼ばれるメソッド
     * @param {*} newValue 
     * @param {*} num 
     */
    _onTextChange(newValue: string, num: number) {
        const newItems: TaskItem[] = [];
        for (var i = 0; i < this.state.values.length; i++) {
            let item = this.state.values[i];
            if (i === num) {
                if (item.value === newValue) {
                    // 完全一致なら再描画の必要がないため無視する
                    console.log("編集なし")
                    return
                }
                item.value = newValue;
                item.updatedOn = new Date()
            }
            newItems.push(item);
        }
        this.setState({
            values: newItems
        });
    }

    render() {
        console.log("ToDoListApp is rendering...")
        return (
            <div className="ToDoListApp">
                <NewItemForm
                    value={this.state.textFieldValue}
                    onTextChange={this._onUpdateTextBox}
                    onSubmit={this._onSubmit}
                />

                <ToDoListTable
                    items={this.state.values}
                    updateSelectedStatus={this._updateSelectedStatus}
                    deleteSectedItems={this._deleteSectedItems}
                    updateBulkOperationMode={this._updateBulkOperationMode}
                    onTextChange={this._onTextChange}
                    deleteItem={this._deleteItem}
                    selectable={this.state.tableSelectable}
                />

                <SimpleDialog
                    title={this.state.resultDialog.title}
                    message={this.state.resultDialog.message}
                    open={this.state.resultDialog.open}
                    onClickOK={() => {
                        console.log("OK!")
                        this._closeDialog(false);
                    }}
                    onClickCancel={() => {
                        console.log("Cancel!");
                        this._closeDialog(true);
                    }}
                />
            </div >
        );
    }

}


export default ToDoListApp;