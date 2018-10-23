import React, { Component } from 'react';
import Task from './Task';
import { connect } from 'react-redux';


class ToDoListTasksList extends Component {

    render() {

        // проверка фильтра тасков 

        const { tasks, filter, quantity, currentPage } = this.props;
        let filteredTasks;

        if (filter === "all") { filteredTasks = tasks }
        else if (filter === "active") { filteredTasks = tasks.filter(t => !t.get("isDone")) }
        else { filteredTasks = tasks.filter(t => t.get("isDone")) };

        //высчитывается количество элементов на странице и из массива тасок вырезается нужный кусок

        let startPoint = ((currentPage - 1) * quantity);

        filteredTasks = filteredTasks.slice(startPoint, startPoint + quantity);

        return (
            <div className="todolist-tasklist">
                {filteredTasks.map((task) => {
                    return <Task task={task}                        
                        key={task.get("id")} />
                })}
            </div>
        );
    }
}

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({

    tasks: store.get("tasks"),
    filter: store.get("filter"),
    quantity: store.get("quantity"),
    currentPage: store.get("currentPage"),
})

export default connect(getDataFromStore)(ToDoListTasksList);
