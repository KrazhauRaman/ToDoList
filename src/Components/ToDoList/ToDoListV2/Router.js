import React, { Component } from 'react';
import ToDoListV2 from './ToDoList';
import ToDoListLogin from './Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


const RouterSwitch = () => (
    <div>
        <Switch>
            <Route path='/todolist' component={ToDoList} />
            <Route path='/' component={Login} />
        </Switch>
    </div>
);


const ToDoList = () => (
    <ToDoListV2 />
);


const Login = () => (
    <ToDoListLogin />
);


class ToDoListRouter extends Component {

    render() {
        return (
            <BrowserRouter>
                <RouterSwitch />
            </BrowserRouter>
        );
    }
};

export default ToDoListRouter;