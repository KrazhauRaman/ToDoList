import { c } from './Actions';
import { Map, List, fromJS } from 'immutable';

export function todoListReduser(oldState, action) {

    switch (action.type) {

        case c.CHANGE_FILTER: {

            const updatedState = oldState.set("filter", action.value);
            return updatedState;
        }

        case c.PUT_NEW_TASK: {

            const tempList = oldState.get("tasks").insert(0, Map(action.task));
            const updatedState = oldState.set("tasks", tempList);

            return updatedState;
        }

        case c.PUT_TASKS: {

            const tempList = new List(action.tasks.reverse().map(task => Map(task)));
            const updatedState = oldState.set("tasks", tempList);

            return updatedState;
        }

        case c.DELETE_TASK: {

            const indexOfTaskToDelete = oldState.get("tasks").findIndex(taskInList => {
                return taskInList.get("id") === action.deletedTask.get("id");
            });

            const updatedState = oldState.deleteIn(["tasks", indexOfTaskToDelete]);

            return updatedState;
        }

        case c.UPDATE_TASK: {

            const indexOfTaskToUpdate = oldState.get("tasks").findIndex(taskInList => {
                return taskInList.get("id") === action.id;
            });

            const updatedState =
                oldState
                    .setIn(["tasks", indexOfTaskToUpdate, "title"], action.title)
                    .setIn(["tasks", indexOfTaskToUpdate, "isDone"], action.isDone)
                    .setIn(["tasks", indexOfTaskToUpdate, "id"], action.id)
                    .setIn(["tasks", indexOfTaskToUpdate, "isInEditMode"], action.isInEditMode);

            return updatedState;
        }

        case c.SET_CURRENT_PAGE: {

            const updatedState = oldState.set("currentPage", action.page);
            return updatedState;
        }

        case c.SET_LOGIN_TRUE: {

            const updatedState = oldState.set("isLogged", action.isLogged);

            return updatedState;
        }

        case c.SET_IS_LOADING_VALUE: {

            const updatedState = oldState.set("isLoading", action.isLoading);

            return updatedState;
        }

        case c.SET_IS_TASK_WAITING_VALUE: {

            const indexOfTaskToUpdate = oldState.get("tasks").findIndex(taskInList => {
                return taskInList.get("id") === action.id;
            });

            const updatedState = oldState.setIn(["tasks", indexOfTaskToUpdate, "isWaiting"], action.isWaiting);

            return updatedState;
        }

        case c.SET_OPERATIONS_COUNTER: {

            const updatedState = oldState.set("operationsCounter", (+oldState.get("operationsCounter") + action.value));
            return updatedState;
        }


        default:

            if (!!oldState) {
                return oldState;
            }

            return fromJS({
                tasks: [],
                filter: "all",
                isLoading: false,
                quantity: 10,
                currentPage: 1,
                isLogged: true, /*поменять на false*/
                widgetId: 5,
                operationsCounter: 0
            });
    }
};