// @flow

class ToDoItem {
    id: string;
    value: string;
    createdOn: Date;
    constructor(id: string, value: string, createdOn: Date) {
        this.id = id;
        this.value = value;
        this.createdOn = createdOn;
    }
}

export default ToDoItem;