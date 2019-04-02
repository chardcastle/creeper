import React from 'react';

class OptionItem extends React.Component {
	render() {
		return (
			<option key={this.props.value} value={this.props.value}>{this.props.text}</option>
		);
	}
}

OptionItem.propTypes = {
	value: React.PropTypes.string,
	text: React.PropTypes.string
};

export default OptionItem;