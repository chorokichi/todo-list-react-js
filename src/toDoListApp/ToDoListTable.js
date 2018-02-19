import React, { Component } from 'react';

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
            <ul>{listItems}</ul>
        );
    }
}

export default ToDoListTable;