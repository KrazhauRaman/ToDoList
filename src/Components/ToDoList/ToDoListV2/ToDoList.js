import React, { Component } from 'react';
import { getAllTasksFullCycle } from './Redux/Actions';
import ToDoListFooter from './Footer';
import ToDoListFormContainer from './CreateTaskFormContainer';
import ToDoListTasksList from './TasksList';
import ToDoListPaginator from './Paginator';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


class ToDoListV2 extends Component {

    //добавление всех тасков в стор когда компонент замаунтился
    componentDidMount() {
        this.props.getAllTasksFullCycle();
    }

    render() {
        return (
            (!this.props.isLogged) ?
                (
                    <Redirect to='/todolist' />
                ) : (
                    <div className="flex-wrapper">
                        <ToDoListFormContainer key={1} />
                        <ToDoListTasksList store={this.store} key={2} />
                        <ToDoListPaginator store={this.store} key={3} />
                        <ToDoListFooter key={4} />
                    </div>
                )
        );
    }
}

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({
    isLogged: store.get("isLogged"),
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({
    getAllTasksFullCycle: () => dispatch(getAllTasksFullCycle()),
})

export default connect(getDataFromStore, setDataToStore)(ToDoListV2);