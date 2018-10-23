import React, { Component } from 'react';
import { createNewTaskFullCycle } from './Redux/Actions';
import { connect } from 'react-redux';
import { ToDoListTaskPresentation } from './CreateTaskPresentation';


//это контейнерная компонента, в которой происходит работа со стором, а в презентационную передаются только данные и коллбэки
class ToDoListFormContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
        }
    }

    //после then идёт стрелочная функция. тут она нужна, чтобы выполение было отложено, а не вызывалось моментально из-за круглых скобок
    createTask(title) {
        this.props.createNewTaskFullCycle(title)
            .then(() => {
                this.setState({
                    title: "",
                })
            });
    };


    updateTitleValue(value) {
        this.setState({
            title: value,
        });
    }

    render() {
        let { title } = this.state;
        return (
            <ToDoListTaskPresentation createTask={this.createTask.bind(this)}
                title={title} isLoading={this.props.isLoading} updateTitleValue={this.updateTitleValue.bind(this)} />
        );
    }
};

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({
    isLoading: store.get("isLoading"),
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({
    createNewTaskFullCycle: title => dispatch(createNewTaskFullCycle(title)),
})

export default connect(getDataFromStore, setDataToStore)(ToDoListFormContainer);
