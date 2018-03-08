//@flow
import * as React from 'react';
import { Component } from 'react';
import NewItemForm from './NewItemForm';
import ToDoListTable from './ToDoListTable';
import ToDoItem from 'model/ToDoItem';
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
    values: ToDoItem[]
};

class ToDoListApp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const values = [
            new ToDoItem(outputId(), "test01", new Date()),
            new ToDoItem(outputId(), "test02", new Date())
        ]

        values.sort((a: ToDoItem, b: ToDoItem): number => {
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

        const item = new ToDoItem(outputId(), val, new Date());

        // ToDoListTableがPureComponentのため、その中で利用するvaluesが別のオブジェクトになるように工夫している
        const newItems = [item, ...this.state.values]
        this.setState({
            textFieldValue: "",
            values: newItems
        })
        // this.setState((prevState: State) => ({
        //     textFieldValue: "",
        //     values: [...prevState.values, item],
        // }))

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