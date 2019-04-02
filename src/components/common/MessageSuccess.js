import React, {PropTypes, Component} from 'react';

export default class MessageSuccess extends Component {
	constructor (props)
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
        const successStyle ={
            "color": "#FFF",
            "backgroundColor": "#979A57",
			"marginLeft": "-15px",
			"marginRight": "-15px",
        };

		const fontStyle = {
			"fontFamily": "Open Sans",
		};

		return (
			<div className={"alert fixed " + (this.state.isVisible ? '' : 'hidden')} role="alert" style={successStyle} onClick={() => this.closeMessage()}>
				<p style={fontStyle}>
					<span className="glyphicon glyphicon-info-sign" aria-hidden="true" />
					<span className="sr-only">{this.props.title}</span>&nbsp;<strong>{this.props.title}:</strong>&nbsp;{this.props.message}
				</p>
			</div>
		);
	}
}

MessageSuccess.propTypes = {
	title: PropTypes.string,
	message: PropTypes.string,
	errors: PropTypes.array,
};
