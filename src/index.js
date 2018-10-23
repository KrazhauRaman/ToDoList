import React from 'react';
import ReactDOM from 'react-dom';
import ToDoListRouter from './Components/ToDoList/ToDoListV2/Router';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { todoListReduser } from './Components/ToDoList/ToDoListV2/Redux/Redusers';

import './Components/ToDoList/ToDoListV2/ToDoList.css';

//создание стора с редюсером
const store = createStore(
    todoListReduser,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <ToDoListRouter />
    </Provider>, document.getElementById('root'));

registerServiceWorker();
