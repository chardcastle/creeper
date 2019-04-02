/* eslint-disable no-unused-vars */
import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import SiteNavigation from "../components/common/SiteNavigation";

/**
 * Global container for pages
 */
class App extends Component {

	render() {
		const { dispatch, isAuthenticated, errorMessage } = this.props;
		return (
			<div>
				<SiteNavigation
					isAuthenticated={isAuthenticated}
					errorMessage={errorMessage}
					dispatch={dispatch}
				/>
				<div className="container content-container">
					{/*
						Displays all the components
					*/}
					{this.props.children}
				</div>
			</div>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func.isRequired,
	children: PropTypes.object,
	isAuthenticated: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string
};

function mapStateToProps(state) {

	const { auth } = state;
	const { isAuthenticated, errorMessage } = auth;

	return {
		isAuthenticated,
		errorMessage
	};
}

export default connect(mapStateToProps)(App);
