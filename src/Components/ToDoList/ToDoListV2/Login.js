import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { connect } from 'react-redux';
import { setLoginTrue } from './Redux/Actions';


class ToDoListLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isCaptchaSolved: false,
      isCaptchaLoaded: false,
    }
  }

  //нужно, чтобы капча успела загрузиться
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isCaptchaLoaded: true });
    }, 1000);
  }


  verifyCallback() {
    this.setState({ isCaptchaSolved: true });
  }

  //чтобы остальное приложение через стор знало, что логин успешен
  setLoginTrue() {
    if (this.state.isCaptchaSolved)
      this.props.setLoginTrue();
  }


  render() {

    return (
      <div className="flex-wrapper">
        <div className="todolist-login">
          <h1 className="todolist-login-header">ToDo List</h1>
          <div className="todolist-login-captcha">
            {this.state.isCaptchaLoaded && (
              <ReCAPTCHA
                sitekey="6LeeBmYUAAAAAD5CPOVnUxm5kpzytKoC4i0TCgmf"
                onChange={this.verifyCallback.bind(this)}
                theme="dark" />)}
          </div>
          {this.state.isCaptchaLoaded && (
            <Link className="todolist-login-enter" to={`/todolist/list`}>
              <button
                type="button"
                disabled={!this.state.isCaptchaSolved}
                className={(this.state.isCaptchaSolved) ? "button-success" : "button-fail"}
                onClick={this.setLoginTrue.bind(this)}>Enter</button>
            </Link>)}
        </div>
      </div>
    );
  }
}


//получение из стора нужных в данном компоненте элементов. они придут через пропсы в этот компонент
const getDataFromStore = () => ({
})

//создание экшенов, которые нужны в этом компоненте. они придут сюда через пропсы.
const setDataToStore = dispatch => ({
  setLoginTrue: () => dispatch(setLoginTrue()),
})

export default connect(getDataFromStore, setDataToStore)(ToDoListLogin);