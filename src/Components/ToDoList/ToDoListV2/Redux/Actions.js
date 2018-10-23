import { createTask, getTasks, updateTask, deleteTask } from '../Servises';


export const c = {
    CHANGE_FILTER: "CHANGE_FILTER", 
    PUT_TASKS: "PUT_TASKS", 
    PUT_NEW_TASK: "PUT_NEW_TASK", 
    UPDATE_TASK: "UPDATE_TASK", 
    DELETE_TASK: "DELETE_TASK", 
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE", 
    SET_LOGIN_TRUE: "SET_LOGIN_TRUE", 
    SET_IS_LOADING_VALUE: "SET_IS_LOADING_VALUE", 
    SET_IS_TASK_WAITING_VALUE: "SET_IS_TASK_WAITING_VALUE", 
    SET_OPERATIONS_COUNTER: "SET_OPERATIONS_COUNTER", 
}

//            ############################### simple actions ###############################

const putTask = (newTask) => {  
    return {
        type: c.PUT_NEW_TASK,
        task: newTask,
    };
};

const setIsLoadingValue = (isLoadingValue) => {  
    return {
        type: c.SET_IS_LOADING_VALUE,
        isLoading: isLoadingValue,
    };
};


const setOperationCounter = (value) => {
    return {
        type: c.SET_OPERATIONS_COUNTER,
        value: +value,
    };
};

const putAllTasks = (tasks) => { 
    return {
        type: c.PUT_TASKS,
        tasks: tasks,
    };
};

const setIsWaitingValueInTask = (changedTask, isWaiting) => { 
    return {
        type: c.SET_IS_TASK_WAITING_VALUE,
        id: changedTask.get("id"),
        isWaiting: isWaiting,
    };
};

const updateTaskInStore = (changedTask) => { 
    return {
        type: c.UPDATE_TASK,
        title: changedTask.get("title"),
        isDone: changedTask.get("isDone"),
        id: changedTask.get("id"),
        isInEditMode: changedTask.get("isInEditMode"),
    };
};

const deleteTaskInStore = (deletedTask) => {  
    return {
        type: c.DELETE_TASK,
        deletedTask: deletedTask,
    }
};


export const changeFilter = (filterValue) => { 
    return {
        type: c.CHANGE_FILTER,
        value: filterValue,
    }
};

export const setCurrentPage = (page) => { 
    return {
        type: c.SET_CURRENT_PAGE,
        page: page,
    }
};

export const setLoginTrue = () => {
    return {
        type: c.SET_LOGIN_TRUE,
        isLogged: true,
    }
};

//            ############################### complex actions (thunk) ###############################

// сразу включается блок отправки на время закгрузки, потом идёт отправка на сервак через функцию из сервисов
// в случае успеха - добавляется таска в стор, блок снимается. в случае неуспеха - в консоль ошибка, блок снимается

export const createNewTaskFullCycle = (newTaskTitle) => {  //++
    return function (dispatch, getState) {

        dispatch(setIsLoadingValue(true));
        dispatch(setOperationCounter(1));

        return createTask(newTaskTitle, getState().get("widgetId"))
            .then(
                data => {
                    const newTask = {
                        title: data.task.title,
                        isDone: data.task.done,
                        id: data.task.id,
                        isWaiting: false,
                        isInEditMode: false,
                    };
                    dispatch(putTask(newTask));
                    dispatch(setOperationCounter(-1));

                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                },
                error => {
                    (console.log("Error on sending new task"));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                }
            );
    };
};



// сразу включается блок отправки на время закгрузки, потом идёт запрос всех тасков  сервака
// в случае успеха - все таски добавляются в стор, блок снимается. в случае неуспеха - в консоль ошибка, блок снимается

export const getAllTasksFullCycle = () => {  //++
    return function (dispatch, getState) {

        dispatch(setIsLoadingValue(true));
        dispatch(setOperationCounter(1));

        getTasks(getState().get("widgetId"))
            .then(
                tasksFromServer => {
                    let tasks = tasksFromServer.map(itemFromServer => {
                        return {
                            title: itemFromServer.title,
                            isDone: itemFromServer.done,
                            id: itemFromServer.id,
                            isWaiting: false,
                            isInEditMode: false,
                        };
                    });
                    dispatch(putAllTasks(tasks));
                    dispatch(setOperationCounter(-1));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                },
                error => {
                    (console.log("Error on getting tasks"));
                    dispatch(setOperationCounter(-1));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                }
            );
    };
};

// сразу включается блок отправки на время закгрузки, так же таска с новыми данными идёт в стор
// в сторе новая таска нужна для отслеживания загрузки через стор (режим ожидания и т.д.). в случае успеха блок снимается
// в случае неуспеха - в консоль ошибка, блок снимается

export const updateTaskFullCycle = (changedTask) => {  //++
    return function (dispatch, getState) {

        dispatch(setIsWaitingValueInTask(changedTask, true));
        dispatch(updateTaskInStore(changedTask));
        dispatch(setIsLoadingValue(true));
        dispatch(setOperationCounter(1));

        const [title, isDone, id] = changedTask.values();

        updateTask(title, id, getState().get("widgetId"), isDone)
            .then(
                () => {
                    dispatch(setIsWaitingValueInTask(changedTask, false));
                    dispatch(setOperationCounter(-1));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                },
                error => {
                    (console.log("Error on updating task"));
                    dispatch(setIsWaitingValueInTask(changedTask, false));
                    dispatch(setOperationCounter(-1));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                }
            );
    };
};



// сразу включается блок отправки на время закгрузки, а так же блок удаляемого таска. потом идёт запрос наудаление таска с сервера
// в случае успеха - таск удаляется из стора, блоки отменяются

export const deleteTaskFullCycle = (deletedTask) => { //++
    return function (dispatch, getState) {

        dispatch(setIsWaitingValueInTask(deletedTask, true));
        dispatch(setIsLoadingValue(true));
        dispatch(setOperationCounter(1));

        const [, , id] = deletedTask.values();

        deleteTask(id, getState().get("widgetId"))
            .then(
                () => {
                    dispatch(setIsWaitingValueInTask(deletedTask, false));
                    dispatch(deleteTaskInStore(deletedTask));
                    dispatch(setOperationCounter(-1));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                    dispatch(setCurrentPage(1));
                },
                error => {
                    (console.log("Error on deleting task"));
                    dispatch(setIsWaitingValueInTask(deletedTask, false));
                    dispatch(setOperationCounter(-1));
                    if (getState().get("operationsCounter") === 0) {
                        dispatch(setIsLoadingValue(false));
                    }
                }
            );
    };
};

