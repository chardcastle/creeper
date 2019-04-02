import React, {PropTypes} from 'react';
import ListItem from './ListItem';

class ErrorList extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render() {

        const { errors } = this.props;
        if ('undefined' !== typeof errors)
        {
            let listItems = errors.map(function(item, i){
                return <ListItem key={i} text={item} />;
            });
            return (<ul>{listItems}</ul>);
        } else {
            return (<ul />);
        }
    }
}

ErrorList.propTypes = {
    errors: PropTypes.array
};

export default ErrorList;