import React from 'react';

// презентанционный компонент
// создаёт внешний вид контейнера тасков
export const ToDoListTaskPresentation = (props) => {


    const createNewTaskEnter = (event) => {
        if (event.key === 'Enter' && event.currentTarget.value !== "") {
            props.createTask(event.currentTarget.value);
        };
    };

    const createNewTaskOnBlur = (event) => {
        if (event.currentTarget.value !== "") {
            props.createTask(event.currentTarget.value);
        };
    };

    const onChangeInput = (event) => {
        props.updateTitleValue(event.currentTarget.value);
    }

    return (

        <div className="todolist-task-creator">
            <input className="todolist-task-creator-input"
                placeholder="Enter new task"
                maxLength="19"
                onBlur={createNewTaskOnBlur} onKeyPress={createNewTaskEnter}
                value={props.title} disabled={props.isLoading} onChange={(event) => onChangeInput(event)} />
            <img className={(props.isLoading) ? "todolist-task-creator-loader" : "todolist-task-creator-loader none"} src="https://zippy.gfycat.com/SkinnySeveralAsianlion.gif" alt="" />
        </div>
    );
};