import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import MessageError from '../common/MessageError.js';
import MessageSuccess from '../common/MessageSuccess.js';
import { registerUser } from '../../actions/auth';

class Register extends Component {

  constructor(props) {
    super(props);
  }

  registerSubmit(event) {
    event.preventDefault();
    const { register } = this.props;

    let details = {
        'email': this.refs.email.value,
        'password': this.refs.password.value,
        'password_confirmation': this.refs.password_confirmation.value
    };

    register(details);
  }

  render () {

      const { auth } = this.props;

      let errors;
      let success;

      if (auth.isFetching) {
          errors = (<img src="/images/loading.gif" alt=""/>);
      } else if (auth.isInvalid) {
          errors = (
            <MessageError title="User error"
                errors={auth.errors}
                isVisible={true} />
          );
      } else if (auth.isSuccess) {
          success = (
            <MessageSuccess title="Thanks for registering"
                message="Look out for an email from us"
                isVisible={true} />
          );
      } else if (auth.isFailed) {
          errors = (
            <MessageError title="System error"
                message={auth.serverError}
                isVisible={true} />
          );
      }

    return (
      <div className="container">
        <form className="sign-up-on-home-page"
              onSubmit={(event) => this.registerSubmit(event)} method="post">
          <h1 id="title" className="form-signin-heading text-center">Register</h1>
          <div className="register-form">

            {errors}

            {success}

            <p><label htmlFor="inputEmail" className="sr-only">Email address</label></p>
            <p><input type="text" ref="email"
                  id="inputEmail" name="email"
                  className="form-control" placeholder="Email address" /></p>

            <p><label htmlFor="inputPassword" className="sr-only">Password</label></p>
            <p><input type="password" ref="password"
                  id="inputPassword" name="password"
                  className="form-control" placeholder="Password" /></p>

            <p><label htmlFor="confirmationPassword" className="sr-only">Password</label></p>
            <p><input type="password" ref="password_confirmation"
                  id="confirmationPassword" name="password_confirmation"
                  className="form-control" placeholder="Password confirmation" /></p>
            <br/>

            <p className="text-center">
                <button className="btn btn-lg btn-primary" type="submit">Create an account</button>
            </p>
            <br/>
            <p className="text-center">Create an account or <a href="/">login with an existing account</a></p>
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        register:(details) => {
            dispatch(registerUser(details));
        }
    };
}

Register.propTypes = {
    auth: PropTypes.object,
    register: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);

