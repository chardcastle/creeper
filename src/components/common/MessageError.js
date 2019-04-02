import React, {PropTypes, Component} from 'react';
import ErrorList from './ErrorList';

export default class MessageError extends Component {

	constructor(props)
	{
		super(props);
		this.state = {
			"isVisible": true,
		};
	}

	closeMessage(){
		this.setState({"isVisible": false});
	}

	render () {
		const errorStyle = {
            "backgroundColor": "#A70C04",
			"color": "#FFF",
			"marginLeft": "-15px",
			"marginRight": "-15px",
        };
		const fontStyle = {
			"fontFamily": "Open Sans",
		};

		return (
			<div className={"alert fixed " + (this.state.isVisible ? '' : 'hidden')} role="alert" style={errorStyle} onClick={() => this.closeMessage()}>
				<p style={fontStyle}>
					<span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true" />
					<span className="sr-only">{this.props.title}</span>&nbsp;<strong>{this.props.title}:</strong>&nbsp;{this.props.message}
				</p>
				<ErrorList errors={this.props.errors} />
			</div>
		);
	}
}

MessageError.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	errors: PropTypes.array,
};
