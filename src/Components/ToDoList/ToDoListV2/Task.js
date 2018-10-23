import React, { Component } from 'react';
import { deleteTaskFullCycle, updateTaskFullCycle } from './Redux/Actions';
import { connect } from 'react-redux';


class Task extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
                return taskInList.get("id") === this.props.task.get("id");
            })).get("title"),
            isInEditMode: false,
        }
    }

    // переключение состояния таски и отправка  на сервак
    toogleTaskStatus() {

        const newData = this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
            return taskInList.get("id") === this.props.task.get("id");
        })).set("isDone", !this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
            return taskInList.get("id") === this.props.task.get("id");
        })).get("isDone"));

        this.props.updateTaskFullCycle(newData);
    }

    // удаление таски и отправка на сервак
    deleteTask() {

        this.props.deleteTaskFullCycle(this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
            return taskInList.get("id") === this.props.task.get("id");
        })));
    }


    // переход в режим редактирования таски
    goToEditMode() {

        this.setState({
            isInEditMode: true,
        });
    }

    // // выход из режима редактирования и отправка результата на серв
    exitEditMode() {
        if (this.state.title !== "") {
            const newData = this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
                return taskInList.get("id") === this.props.task.get("id");
            })).set("title", this.state.title);

            this.setState({
                isInEditMode: false,
            });

            this.props.updateTaskFullCycle(newData);
        }
    }

    // // выход из режима редактирования при нажатии етнера и отправка результата на серв
    exitEditModeOnEnter(event) {
        if (event.key === 'Enter' && this.state.title !== "") {
            const newData = this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
                return taskInList.get("id") === this.props.task.get("id");
            })).set("title", this.state.title);

            this.setState({
                isInEditMode: false,
            });

            this.props.updateTaskFullCycle(newData);
        }
    }

    // изменение названия таски
    changeTitle(event) {

        this.setState({
            title: event.currentTarget.value,
        });
    }

    render() {

        let displayElement = "";

        const [, isDone, , isWaiting] = this.props.tasks.get((this.props.tasks).findIndex(taskInList => {
            return taskInList.get("id") === this.props.task.get("id");
        })).values();

        const { title, isInEditMode } = this.state;


        // отображение таски в зависимости от режимa (редактирование или нет)
        if (isInEditMode) {
            displayElement =
                <input className="todolist-task-input"
                    type="text" maxLength="19" value={title} autoFocus
                    onChange={this.changeTitle.bind(this)}
                    onBlur={this.exitEditMode.bind(this)}
                    onKeyPress={this.exitEditModeOnEnter.bind(this)}
                    disabled={isWaiting}>
                </input>

        } else {
            displayElement = <span className={isDone ? "todolist-task-span task done" : "todolist-task-span task"}
                onClick={(isWaiting) ? null : this.goToEditMode.bind(this)}
            >{title}</span>
        }

        return (
            <div className="todolist-task">
                <input className={(isDone) ? "todolist-task-checkbox checked" : "todolist-task-checkbox"}
                    type="checkbox" checked={isDone}
                    onChange={this.toogleTaskStatus.bind(this)} disabled={isWaiting || isInEditMode}>
                </input>
                {displayElement}
                <button className="todolist-task-delete"
                    onClick={this.deleteTask.bind(this)} disabled={isWaiting}>X</button>
            </div >
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
    deleteTaskFullCycle: newData => dispatch(deleteTaskFullCycle(newData)),
    updateTaskFullCycle: (newData, oldData) => dispatch(updateTaskFullCycle(newData, oldData)),
})

export default connect(getDataFromStore, setDataToStore)(Task);