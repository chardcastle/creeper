/* eslint-disable no-console */
import React, { Component } from 'react';
import SkillItem from './SkillItem';

class SkillList extends Component
{
    render ()
    {
        const { skills } = this.props;

        let data = Object.keys(skills).map(function (key) {
            return skills[key];
        });

        // Create array from object
        let listItems = data.map(function(skill, i) {
            if ('undefined' !== typeof skill) {
                if (skill.isFetching) {
                    return (<img src="/images/loading.gif" key={i} alt="" />);
                } else {
                    return (skill.data && <SkillItem skill={skill} key={i}/>);
                }
            } else {
                return null;
            }
        });

        return (<div className="col-xs-12" style={{'padding': 0}}>{listItems}</div>);
    }
}

SkillList.propTypes = {
    skills: React.PropTypes.object
};

export default SkillList;
