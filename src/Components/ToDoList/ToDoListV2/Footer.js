import React, { Component } from 'react';
import { changeFilter, setCurrentPage, deleteTaskFullCycle } from './Redux/Actions';
import { connect } from 'react-redux';


class ToDoListFooter extends Component {

    // изменение настроек фильтра в сторе + сброс страницы, чтобы не было перегрузки
    handleFilterChanged(e) {

        const { changeFilter, setCurrentPage } = this.props;

        changeFilter(e.currentTarget.dataset.value);
        setCurrentPage(1);
    }

    // удаление завершенных тасок в сторе  и отправка на сервак
    clearCompleted() {

        const { tasks, deleteTaskFullCycle } = this.props;

        const filteredTasks = tasks.filter(task => task.get("isDone"));

        for (let task of filteredTasks) {
            deleteTaskFullCycle(task);
        };
    };

    render() {

        const { tasks, filter, isLoading } = this.props;

        return (
            <div className="todolist-footer">
                <span className="todolist-footer-remaining-items">{tasks.filter((t) => !t.get("isDone")).size} items left </span>
                <div className="todolist-footer-control-buttons">
                    <div className="todolist-footer-control-buttons-filter">
                        <button value="all" data-value="all"
                            onClick={this.handleFilterChanged.bind(this)}
                            className={(filter === "all") ? "active" : ""}>All</button>
                        <button value="active" data-value="active"
                            onClick={this.handleFilterChanged.bind(this)}
                            className={(filter === "active") ? "active" : ""}>Active</button>
                        <button value="completed" data-value="completed"
                            onClick={this.handleFilterChanged.bind(this)}
                            className={(filter === "completed") ? "active" : ""}>Completed</button>
                    </div>
                    <div className="todolist-footer-control-buttons-clear">
                        <button disabled={isLoading} onClick={this.clearCompleted.bind(this)}>Clear completed</button>
                    </div>
                </div>
            </div>
        );
    }
}


//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({

    tasks: store.get("tasks"),
    filter: store.get("filter"),
    isLoading: store.get("isLoading"),
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({

    changeFilter: newValue => dispatch(changeFilter(newValue)),
    setCurrentPage: newValue => dispatch(setCurrentPage(newValue)),
    deleteTaskFullCycle: task => dispatch(deleteTaskFullCycle(task)),
})


export default connect(getDataFromStore, setDataToStore)(ToDoListFooter);