//@flow

// TODO: 
// Table(material-ui)+Reactで、どうやったらrowのcolumn=-1以外のところをクリックしたときに選択状態になるのを無効にできるか？


import * as React from 'react';
import { PureComponent } from 'react';
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
import TaskItem from 'model/TaskItem';
/// htmlファイルに次のものを追加してmaterial.ioのものを利用している
/// <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
///　https://material.io/icons/
import IconButton from 'material-ui/IconButton';

type Props = {
    items: TaskItem[],
    updateSelectedStatus: (selectedRows: number[] | 'all') => void,
    deleteSectedItems: () => void,
    deleteItem: (num: number) => void,
    updateBulkOperationMode: () => void,
    selectable: bool,
};

type State = {
    selectedNum: number,
};

/** selected */
class ToDoListTable extends PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedNum: 0
        };
        (this: any).onRowSelection = this.onRowSelection.bind(this);
        (this: any).handleClickBuldDeleteButton = this.handleClickBuldDeleteButton.bind(this);
        (this: any).handleClickUpdateBulkModeButton = this.handleClickUpdateBulkModeButton.bind(this);
        (this: any).onCellClick = this.onCellClick.bind(this);
    }

    onRowSelection(selectedRows: number[] | 'all') {
        console.log(`Click - onRowSelection: ${String(selectedRows)}[${selectedRows.length} items]`);

        this.props.updateSelectedStatus(selectedRows);
        this.setState({
            selectedNum: selectedRows.length
        });
    }

    onCellClick(row: number, column: number): void {
        console.log("Click - onCellClick[row/column:" + row + "/" + column + "]")
    }

    handleClickBuldDeleteButton() {
        console.log("Click - BuldDeleteButton:" + this.state.selectedNum)
        this.props.deleteSectedItems();
    }

    handleClickUpdateBulkModeButton() {
        console.log("Click - handleClickUpdateBulkModeButton")
        this.props.updateBulkOperationMode();
    }

    render() {
        console.log("ToDoListTable is rendering...")
        const items = this.props.items;
        console.log(items);

        const HeaderButtons = () => {
            if (this.props.selectable) {
                return (
                    <div>
                        <FlatButton
                            label="一括削除"
                            disabled={this.state.selectedNum === 0}
                            onClick={this.handleClickBuldDeleteButton}
                        />
                        <FlatButton
                            label="解除"
                            onClick={this.handleClickUpdateBulkModeButton}
                        />
                    </div>
                )
            } else {
                return (
                    <FlatButton
                        label="一括操作"
                        onClick={this.handleClickUpdateBulkModeButton}
                    />
                )
            }
        };


        const WholeTable = () => (
            <Table
                fixedHeader={false}
                style={{ tableLayout: 'auto' }}
                height="400"        // テーブルの高さ
                multiSelectable     // 複数選択を許容
                fixedFooter         // フッターを固定
                onRowSelection={this.onRowSelection}
                onCellClick={this.onCellClick}
                selectable={this.props.selectable}
            >
                <TableHeader displaySelectAll={true}>
                    <TableRow>
                        <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{ textAlign: 'right' }}>
                            <HeaderButtons />
                        </TableHeaderColumn>
                    </TableRow>
                    <TableRow>
                        {/* <TableHeaderColumn style={{ width: "10%" }}>ID</TableHeaderColumn> */}
                        <TableHeaderColumn style={{ width: "50%" }}> Name</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: "20%" }}> Created</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: "20%" }}> Updated</TableHeaderColumn>
                        <TableHeaderColumn style={{ width: "10%" }}></TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    deselectOnClickaway={false} // テーブル外をクリックしたら選択状態を全て解除するか？：default=true
                    showRowHover={true}         // カーソルをテーブルに移動するとその行がハイライトされるか？：default=false
                    stripedRows={false}         // １行ごとに背景色を変えて見やすくする機能をどうするか？：default=false
                >
                    {items.map((item, num) =>
                        <TableRow
                            key={item.id}
                            selected={item.selected}
                            striped={true}

                        >
                            {/* <TableRowColumn>{item.id}</TableRowColumn> */}
                            <TableRowColumn>{item.value}</TableRowColumn>
                            <TableRowColumn>{DateUtil.getLongDate(item.createdOn)}</TableRowColumn>
                            <TableRowColumn>{DateUtil.getLongDate(item.updatedOn)}</TableRowColumn>
                            <TableRowColumn>
                                <IconButton
                                    iconClassName="material-icons"
                                    onClick={(event: any) => {
                                        console.log(`IconButton's click!: [${num}]${item.value}(${item.id})`)
                                        this.props.deleteItem(num)
                                    }}
                                    disabled={this.props.selectable}>
                                    delete_forever
                                </IconButton>
                            </TableRowColumn>
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