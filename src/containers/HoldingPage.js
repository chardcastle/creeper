/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { Panel } from 'react-bootstrap';

const style = {
    center: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		width: '300px',
		height: '100px',
		textAlign: 'center',
		boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)'
	}
};
/**
 * Global container for pages
 */
export default class HoldingPage extends Component {

	render()
	{
        const title = (
			'Creeper'
        );

		return (
			<div>
				<Panel header={title} style={style.center}>
					Coming soon in 2017
				</Panel>
			</div>
		);
	}
}
