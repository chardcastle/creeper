import React, { Component, PropTypes } from "react";
import { FormGroup, FormControl, Row, Col, Form } from 'react-bootstrap';
import { apply } from './../../actions/auth';
import { connect } from 'react-redux';
import MessageError from './../../components/common/MessageError.js';
import MessageSuccess from './../../components/common/MessageSuccess.js';
import SubmitButton from './../../components/common/Button.js';

class ApplicationPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: '',
                password: '',
                password_confirmation: '',
                occupation: '',
                knowledgable: '',
                learn_about: '',
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
    * Application use
    * @param event
    */
    handleSubmit(event) {
        event.preventDefault();
        const { apply } = this.props;
        let form = this.state.form;
        apply(form);
    }

    handleChange(event){
        const form = this.state.form;
        form[event.target.name] = event.target.value;
        this.setState({ form: form });
    }

    render(){
        const { auth } = this.props;
        let errors;
        let success;

        if (auth.isFetching) {
            errors = (<img src="/images/loading.gif" alt=""/>);
        } else if (auth.isInvalid) {
            errors = (
              <MessageError title="Validation error"
                  errors={auth.errors} />
            );
        } else if (auth.isSuccess) {
            success = (
              <MessageSuccess title="Thanks for application!"
                  message="Look out for an email from us" />
            );
        } else if (auth.isFailed) {
            errors = (
              <MessageError title="System error"
                  message={auth.serverError} />
            );
        }

        return (
            <div className="container">
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} lgOffset={3} mdOffset={3}>
                        <Row>
                            <Col><h3>Application Form</h3></Col>
                        </Row>
                        {errors}
                        {success}
                    </Col>
                </Row>

                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} lgOffset={3} mdOffset={3}>
                        <Form horizontal onSubmit={(event) => this.handleSubmit(event)} method="post">
                            <FormGroup>
                                <FormControl type="text" name="email" placeholder="Email" onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="password" ref="password" name="password" placeholder="Password"  onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="password" ref="password_confirmation" name="password_confirmation" placeholder="Password Confirmation"  onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="text" ref="occupation" name="occupation" placeholder="Job Title/Occupation"  onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="textarea" ref="knowledgable" name="knowledgable" placeholder="I am most knowledgable about"  onChange={this.handleChange}/>
                            </FormGroup>
                            <FormGroup>
                                <FormControl type="textarea" ref="learn_about" name="learn_about" placeholder="I'd like to learn about"  onChange={this.handleChange}/>
                            </FormGroup>
                            <Row>
                                <Col>
                                    <SubmitButton title="Apply now!" />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
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
        apply:(details) => {
            dispatch(apply(details));
        }
     };
}

ApplicationPage.propTypes = {
    auth: PropTypes.object,
    apply: PropTypes.func
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApplicationPage);
