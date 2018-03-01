import React, { Component } from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import DateUtil from 'util/DateUtil';


/** selected */
class ToDoListTable extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        console.log("ToDoListTable is rendering...")
        const items = this.props.items;
        console.log(items);
        const TableExampleSimple = () => (
            <Table
                height="400"        // テーブルの高さ
                multiSelectable     // 複数選択を許容
                fixedHeader         // ヘッダーを固定
                fixedFooter         // フッターを固定
            >
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{ textAlign: 'left' }}>
                            Super Header
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Created</TableHeaderColumn>
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
                <TableExampleSimple />
            </div>
        );
    }
}

export default ToDoListTable;