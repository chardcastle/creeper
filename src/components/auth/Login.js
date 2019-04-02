/* eslint-disable no-unused-vars, no-console */
import { browserHistory } from 'react-router';
import React, { Component, PropTypes } from "react";
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { loginUser, resetAuth } from '../../actions/auth';
import MessageError from '../common/MessageError';
import RaisedButton from 'material-ui/RaisedButton';

class Login extends Component {

    /**
    * Log user out to clear states
    * from previous login etc...
    *
    * Removes access token
    *
    * @param props
    */
    constructor(props)
    {
        super(props);
        // const reset = this.props.reset;
        // reset();
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    /**
    * Log use in
    * @param event
    */
    handleClick(event)
    {
        event.preventDefault();
        const { login } = this.props;
        const creds = {
            email: this.refs.email.value.trim(),
            password: this.refs.password.value.trim()
        };
        login(creds);
    }

    render()
    {
        const {auth} = this.props;

        let response;
        if (auth.isFetching) {
            response = (<img src="/images/loading.gif" alt="" />);
        } else if (auth.isInvalid) {
            response = (
                <MessageError title="Error"
                    message={auth.serverError}
                    errors={auth.errors}
                    isVisible={true} />
            );
        } else if (auth.isFailed) {
            response = (
                <MessageError title="Unknown login"
                  errors={auth.errors}
                  isVisible={true} />
            );
        } else if (auth.isSuccess) {
            let userReference = localStorage.getItem('user_id');
            if (null !== userReference) {
                browserHistory.push('/user/' + userReference);
            }
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    {response}
                </div>
                <div className="row">
                    <div className="col-sm-12"><h3>Login</h3></div>
                </div>
                <form onSubmit={(event) => this.handleClick(event)} method="post">
                    <div className="row">
                        <div className="col-sm-12">

                            <input type="text" ref="email" className="form-control"
                            style={{ marginRight: "5px" }} placeholder="Email"/>
                            <input type="password" ref="password" className="form-control"
                            style={{ marginRight: "5px" }} placeholder="Password"/>

                        </div>
                    </div>
                    <div className="row" style={{padding: '30px 0'}}>
                        <div className="col-sm-12">
                            <RaisedButton type="submit" label="Login" primary={true} />
                            <FlatButton href="/register" label="Register" primary={true} />
                            <FlatButton href="/forgotten" label="I've forgotten my password" secondary={true} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

Login.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};
Login.propTypes = {
    login : React.PropTypes.func,
    auth: React.PropTypes.object,
    errorMessage: PropTypes.string,
    errorList: PropTypes.array,
    errorsVisible: PropTypes.bool,
    successVisible: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
  return {
      login:(creds) => {
          dispatch(loginUser(creds));
      },
      reset:() => {
          dispatch(resetAuth());
      }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
