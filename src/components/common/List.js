import React from 'react';
import ListItem from './ListItem.js';

class List extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        let listItems = this.props.items.map(function(item){
            return <ListItem key={item.id} text={item.text} />;
        });
        return (<ul>{listItems}</ul>);
    }
}

List.propTypes = {
    items: React.PropTypes.array
};

export default List;