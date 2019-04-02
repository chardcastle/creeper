import { browserHistory } from 'react-router';
import React from 'react';
import { Card, CardText, CardActions, CardMedia, CardTitle } from 'material-ui/Card';
import { config } from '../../config';
import FlatButton from 'material-ui/FlatButton';
import ListItem from '../common/ListItem';

class UserItem extends React.Component {

	render()
	{
		const { user } = this.props;

		if ('undefined' === typeof user.data) {
			return null;
		}

		return (
			<Card>
				{user.data.first_name &&
					<CardMedia overlay={<CardTitle
						title={user.data.first_name}
						subtitle={user.data.home_location} />}>
						<img src={config.baseUrl + `/user/${user.data.reference}/picture`} />
					</CardMedia>
                }
				<CardText>
				{user.data.vocation &&
					<p>
						<strong>Company:</strong> {user.data.vocation.company}
					</p>
				}
				<div style={{display: (user.data.skills.length) ? 'block' : 'none'}}>
					<p><strong>Skills:</strong></p>
					{user.data.skills &&
						user.data.skills.map(function(skill, i) {
							return (skill.skill && <ListItem key={i} text={skill.skill.title} />);
						})
					}
					</div>
				</CardText>
				<CardActions>
					<CardActions>
						<FlatButton label="View smith" onClick={() => {
							browserHistory.push("/user/" + user.data.reference);
						}} />
					</CardActions>
				</CardActions>
			</Card>
		);
	}
}

UserItem.propTypes = {
	user: React.PropTypes.object
};

export default UserItem;
