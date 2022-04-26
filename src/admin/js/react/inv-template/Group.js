import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Group extends Component {

    constructor(props) {
        super(props);
    }

    render = () => {

        const groups = this.props.data;

        return (
            <div className="pi-terms">
                {groups.map((group_single, group_index) => {
                    return (
                        <div key={group_index}>
                            <h4 className='pi-group-label'>{group_single.label}:</h4>
                            <div className='pi-group-content'>{group_single.content}</div>
                        </div>
                    );
                })}
            </div>
        )
    }
}

Group.propTypes = {
    title: PropTypes.string,
}

export default Group
