
import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import  { passwordReset } from '../../actions/auth';
import MessageError from '../common/MessageError';
import MessageSuccess from '../common/MessageSuccess';
import Button from '../common/Button';

/**
 * Password reset
 */
class ResetPassword extends Component {

    constructor(props) {
        super(props);
    }

    handleSubmit(event)    {
        event.preventDefault();
        const { reset } = this.props;
        let payload = {
            'token': this.refs.token.value,
            'email': this.refs.email.value,
            'password': this.refs.password.value,
            'password_confirmation': this.refs.password_confirmation.value
        };

        reset(payload);
    }

  render ()
  {
    // Get the query string from the URL such as ?foo=bar
    // Query will now be set to { foo: 'bar' }
    // const query = querystring.parse(this.props.location.search);

      const { auth } = this.props;
      let response;

      if (auth.isFetching) {
          response = (<img src="/images/loading.gif" alt="" />);
      } else if ('undefined' !== typeof auth.serverError) {
          response = (
              <MessageError title="System error"
                            message={auth.serverError}
                            isVisible={true} />
          );
      } else if (auth.isSuccess) {
          response = (
              <MessageSuccess title="Password change"
                              message="We have been able to change your password, please try to login again."
                              isVisible={true} />
          );
      }

    return (
      <div className="container">
        <form onSubmit={(event) => this.handleSubmit(event)} method="post" className="sign-up-on-home-page">
          <input type="hidden" ref="token" id="token" value={this.props.params.hash} />
          <h1 id="title" className="form-signin-heading text-center">Reset password</h1>

          <div className="register-form">

            {response}

            <p><label htmlFor="inputEmail" className="sr-only">Email address</label></p>
            <p><input type="text" id="inputEmail" ref="email" className="form-control" value={this.props.location.query.email} /></p>

            <p><label htmlFor="inputPassword" className="sr-only">Password</label></p>
            <p><input type="password" id="inputPassword" ref="password" className="form-control" placeholder="Password" /></p>

            <p><label htmlFor="confirmationPassword" className="sr-only">Password</label></p>
            <p><input type="password" id="confirmationPassword" ref="password_confirmation"
                    className="form-control" placeholder="Password confirmation" /></p>

            <br/>
            <p className="text-center">
                <Button title="Reset password" />
            </p>
            <br/>

          </div>
        </form>
      </div>
    );
  }
}

ResetPassword.propTypes = {
    reset: PropTypes.func,
    auth: PropTypes.object,
    params: PropTypes.object,
    location: PropTypes.object,
    token: PropTypes.string,
    email: PropTypes.string
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reset:(creds) => {
            dispatch(passwordReset(creds));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
