//@flow


import * as React from 'react';
import { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { Card, CardHeader } from 'material-ui/Card' // テーブルがボードの上に載っているように表示するために利用
import DateUtil from 'util/DateUtil';
import ToDoItem from 'model/ToDoItem';


type Props = {
    items: ToDoItem[]
};

type State = {
    selectedNum: number,
};

/** selected */
class ToDoListTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedNum: 0
        };
        (this: any).onRowSelection = this.onRowSelection.bind(this);
        (this: any).handleClickBuldDeleteButton = this.handleClickBuldDeleteButton.bind(this);
    }

    onRowSelection(selectedRows: number[]) {
        console.log("Click - onRowSelection:");
        console.log(selectedRows);
        console.log(selectedRows.length);
        // ここでstateを変えるとテーブル全体の再描画が開始してチェックが強制的にはずれる...
        this.setState({
            selectedNum: selectedRows.length
        });
    }
    handleClickBuldDeleteButton() {
        console.log("Click - BuldDeleteButton:" + this.state.selectedNum)
    }

    render() {
        console.log("ToDoListTable is rendering...")
        const items = this.props.items;
        console.log(items);
        const WholeTable = () => (
            <Table
                fixedHeader={false}
                style={{ tableLayout: 'auto' }}
                height="400"        // テーブルの高さ
                multiSelectable     // 複数選択を許容
                fixedFooter         // フッターを固定
                onRowSelection={this.onRowSelection}
            >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'right' }}>
                            <FlatButton
                                label="一括削除"
                                disabled={this.state.selectedNum === 0}
                                onClick={this.handleClickBuldDeleteButton}
                            />
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn style={{ width: "10%" }}>ID</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: "50%" }}> Name</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: "40%" }}> Created</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) =>
                        <TableRow
                            key={item.id}>
                            <TableRowColumn>{item.id}</TableRowColumn>
                            <TableRowColumn>{item.value}</TableRowColumn>
                            <TableRowColumn>{DateUtil.getLongDate(item.createdOn)}</TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
            </Table >
        );

        return (
            <div>
                <Card>
                    <CardHeader title="登録済みのタスクリスト" />
                    <WholeTable />
                </Card>
            </div>
        );
    }
}

export default ToDoListTable;