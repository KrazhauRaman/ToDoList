import React, { Component } from 'react';
import { setCurrentPage } from './Redux/Actions';
import { connect } from 'react-redux';


class ToDoListPaginator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            potentialPage: "",
        }
    }

    // меняет текущую выбранную страницу в сторе по нажатию на кнопку с цифрой
    setCurrentPage(event) {
        this.props.setCurrentPage(+event.currentTarget.innerHTML);
    };


    // в зависимости от нажатой кнопки перемещения по страницам меняет текущую выьранную страницу в сторе
    setCurrentPageWithControls(event) {

        switch (event.currentTarget.dataset.value) {
            case "previous": {
                this.props.setCurrentPage(+this.props.currentPage - 1);
                break;
            }
            case "first": {
                this.props.setCurrentPage(1);
                break;
            }
            case "next": {
                this.props.setCurrentPage(+this.props.currentPage + 1);
                break;
            }
            case "last": {
                this.props.setCurrentPage(+this.findQuantityOfPages());
                break;
            }
            default:
                break;
        }
    };

    // находит количество страниц вообще
    findQuantityOfPages() {
        const { tasks, filter, quantity } = this.props;
        let quantityOfPages, filteredTasksSize;

        switch (filter) {
            case "active":
                filteredTasksSize = tasks.filter(t => !t.get("isDone")).size;
                break;
            case "completed":
                filteredTasksSize = tasks.filter(t => t.get("isDone")).size;
                break;
            default:
                filteredTasksSize = tasks.size;
        };

        if (filteredTasksSize === 0) {
            return 1;
        };

        quantityOfPages = Math.ceil(filteredTasksSize / quantity);

        return quantityOfPages;
    };

    // сразу задаются варианты для кнопок, если страниц < 5. Потом, если 5 и больше, то задаются кнопки с центрированием, если возможно, на выбранной странице
    createNumericButtons() {

        let numericalButtons = "",
            quantityOfPages = this.findQuantityOfPages();
        const currentPage = this.props.currentPage;


        switch (this.findQuantityOfPages()) {
            case 1:
                numericalButtons =
                    <button className="active">1</button>
                    ;
                return numericalButtons;

            case 2:
                numericalButtons = [
                    <button key={1} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 1) ? "active" : ""}>1</button>,
                    <button key={2} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 2) ? "active" : ""}>2</button>
                ];
                return numericalButtons;

            case 3:
                numericalButtons = [
                    <button key={1} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 1) ? "active" : ""}>1</button>,
                    <button key={2} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 2) ? "active" : ""}>2</button>,
                    <button key={3} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 3) ? "active" : ""}>3</button>
                ];
                return numericalButtons;

            case 4:
                numericalButtons = [
                    <button key={1} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 1) ? "active" : ""}>1</button>,
                    <button key={2} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 2) ? "active" : ""}>2</button>,
                    <button key={3} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 3) ? "active" : ""}>3</button>,
                    <button key={4} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 4) ? "active" : ""}>4</button>
                ];
                return numericalButtons;

            default:
                switch (currentPage) {
                    case 1:
                    case 2:
                        numericalButtons = [
                            <button key={1} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 1) ? "active" : ""}>1</button>,
                            <button key={2} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 2) ? "active" : ""}>2</button>,
                            <button key={3} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 3) ? "active" : ""}>3</button>,
                            <button key={4} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 4) ? "active" : ""}>4</button>,
                            <button key={5} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === 5) ? "active" : ""}>5</button>
                        ];
                        return numericalButtons;

                    case quantityOfPages - 1:
                    case quantityOfPages:
                        numericalButtons = [
                            <button key={1} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === quantityOfPages - 4) ? "active" : ""}>{quantityOfPages - 4}</button>,
                            <button key={2} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === quantityOfPages - 3) ? "active" : ""}>{quantityOfPages - 3}</button>,
                            <button key={3} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === quantityOfPages - 2) ? "active" : ""}>{quantityOfPages - 2}</button>,
                            <button key={4} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === quantityOfPages - 1) ? "active" : ""}>{quantityOfPages - 1}</button>,
                            <button key={5} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === quantityOfPages) ? "active" : ""}>{quantityOfPages}</button>
                        ];
                        return numericalButtons;


                    default:
                        numericalButtons = [
                            <button key={1} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === currentPage - 2) ? "active" : ""}>{currentPage - 2}</button>,
                            <button key={2} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === currentPage - 1) ? "active" : ""}>{currentPage - 1}</button>,
                            <button key={3} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === currentPage) ? "active" : ""}>{currentPage}</button>,
                            <button key={4} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === currentPage + 1) ? "active" : ""}>{currentPage + 1}</button>,
                            <button key={5} onClick={this.setCurrentPage.bind(this)} className={(+currentPage === currentPage + 2) ? "active" : ""}>{currentPage + 2}</button>
                        ];
                        return numericalButtons;
                }
        }
    };

    // включение режима редактирования для задания страницы вручную
    goToEditMode() {
        this.setState({
            editMode: true,
        });
    };

    // оключение режима редактирования для задания страницы вручную + проверка введенных данных и отправка в стор при нормальных данных
    exitEditMode(event) {

        let newPage = event.currentTarget.value;

        if (Number.isInteger(+newPage) && newPage > 0 && newPage <= this.findQuantityOfPages()) {
            this.props.setCurrentPage(+newPage);
        }

        this.setState({
            editMode: false,
            potentialPage: "",
        });

    };

    exitEditModeEnter(event) {

        if (event.key === 'Enter') {

            let newPage = event.currentTarget.value;

            if (Number.isInteger(+newPage) && newPage > 0 && newPage <= this.findQuantityOfPages()) {
                this.props.setCurrentPage(+newPage);
            }

            this.setState({
                editMode: false,
                potentialPage: "",
            });
        };
    };

    // отработка ввода для задания страницы вручную
    changeTitle(event) {
        this.setState({
            potentialPage: event.currentTarget.value,
        });
    };

    render() {
        let currentPage = this.props.currentPage,
            quantity = this.findQuantityOfPages(),
            displayElement = "";

        if (this.state.editMode) {
            displayElement =
                <input className="todolist-paginator-newCurrentPageInput"
                    value={this.state.potentialPage} autoFocus
                    onChange={this.changeTitle.bind(this)}
                    onBlur={this.exitEditMode.bind(this)} onKeyPress={this.exitEditModeEnter.bind(this)}
                    placeholder="Enter page №"
                />;
        } else {
            displayElement = <span className="todolist-paginator-currentPage" onClick={this.goToEditMode.bind(this)}>Page {currentPage} of {quantity}</span>;
        }

        return (
            <div className="todolist-paginator">
                <div className="todolist-paginator-left-button-group">
                    <button className="todolist-paginator-button" onClick={this.setCurrentPageWithControls.bind(this)} disabled={+currentPage === 1} data-value="first">&#60;&#60;</button>
                    <button className="todolist-paginator-button" onClick={this.setCurrentPageWithControls.bind(this)} disabled={+currentPage === 1} data-value="previous">&#60;</button>
                </div>
                {displayElement}
                <div className="todolist-paginator-numericButtons">
                    {this.createNumericButtons()}
                </div>
                <div className="todolist-paginator-right-button-group">
                    <button className="todolist-paginator-button" onClick={this.setCurrentPageWithControls.bind(this)} disabled={+currentPage === quantity} data-value="next">&#62;</button>
                    <button className="todolist-paginator-button" onClick={this.setCurrentPageWithControls.bind(this)} disabled={+currentPage === quantity} data-value="last">&#62;&#62;</button>
                </div>
            </div>
        );
    };
};

//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = store => ({

    tasks: store.get("tasks"),
    filter: store.get("filter"),
    quantity: store.get("quantity"),
    currentPage: store.get("currentPage"),
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({

    setCurrentPage: newValue => dispatch(setCurrentPage(newValue)),
})

export default connect(getDataFromStore, setDataToStore)(ToDoListPaginator);