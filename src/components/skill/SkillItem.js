import React from 'react';
//import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
//import { config } from '../../config';

class SkillItem extends React.Component {

    constructor (props) {
        super(props);
        this.handleTouchTap = this.handleTouchTap.bind(this);
    }

    handleTouchTap() {
        // @link to user
		// console.log('You clicked a skills chip!');
	}

	render() {
        return (this.props.skill.data &&
            <Chip
                className="pull-left"
                onClick={this.handleTouchTap}
                onTouchTap={this.handleTouchTap}
                style={{'margin': '4px 4px 4px 0'}}
            >
                {this.props.skill.data[0].title}
            </Chip>
        );
	}
}

SkillItem.propTypes = {
	skill: React.PropTypes.object
};

export default SkillItem;
