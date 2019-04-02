import React from 'react';

class ListItem extends React.Component {
	render() {
		return (
			<li>{this.props.text}</li>
		);
	}
}

ListItem.propTypes = {
	text: React.PropTypes.string
};

export default ListItem;