/** eslint-disable no-console */
import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { passwordForgotten, resetAuth } from '../../actions/auth';
import MessageError from '../common/MessageError';
import MessageSuccess from '../common/MessageSuccess';
import Button from '../common/Button';

/**
 * Forgotten password starting page
 */
class Forgotten extends Component {

    constructor(props) {
        super(props);
        const reset = this.props.reset;
        reset();
    }

    forgottenSubmit(event) {
        event.preventDefault();

        let details = {
            email: this.refs.email.value.trim()
        };
        const { makePasswordForgotten } = this.props;
        makePasswordForgotten(details);
    }

    render()
    {
        const { auth } = this.props;
        let response;

        if (auth.isFetching) {
            response = (<img src="/images/loading.gif" alt="" />);
        } else if ('undefined' !== typeof auth.serverError) {
            response = (
                <MessageError title="System error:"
                  message={auth.serverError}
                  isVisible={true} />
            );
        } else if (auth.isSuccess) {
            response = (
                <MessageSuccess title="Password reset request"
                    message="If we can find an account that matches your provided email address: we'll send you a password reset email."
                    isVisible={true} />
            );
        }

        return (
            <div className="container">
                <form onSubmit={(event) => this.forgottenSubmit(event)} method="post">
                    <h1 id="title">Password forgotten</h1>

                    {response}

                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="text" ref="email" id="inputEmail"
                       className="form-control" placeholder="Email address" />
                    <input type="hidden" id="token" />
                    <br/>
                    <Button title="Get new password" />
                    <br />
                    <p className="text-center">
                        <a href="#">Sign in to</a> an existing account
                    </p>
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
        makePasswordForgotten:(details) => {
            dispatch(passwordForgotten(details));
        },
        reset:() => {
            dispatch(resetAuth());
        }
    };
}

Forgotten.propTypes = {
    reset: PropTypes.func,
    auth: PropTypes.object,
    dispatch : PropTypes.func,
    errorMessage: PropTypes.string,
    errorList: PropTypes.array,
    errorsVisible: PropTypes.bool,
    successVisible: PropTypes.bool,
    makePasswordForgotten: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forgotten);
