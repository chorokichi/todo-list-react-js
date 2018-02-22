import React, { Component } from 'react';
// import {
//     Table,
//     TableBody,
//     TableHeader,
//     TableHeaderColumn,
//     TableRow,
//     TableRowColumn,
// } from 'material-ui/Table';

class ToDoListTable extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const items = this.props.items;
        console.log(items);
        const listItems = items.map((item) =>
            <li key={item.value}>
                {item.value + "(" + item.createdOn + ")"}
            </li>
        );
        return (
            <div>
                <ul>{listItems}</ul>
            </div>
        );
    }
}

export default ToDoListTable;