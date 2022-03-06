import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Group extends Component { 

    constructor(props) {
        super(props); 

        this.state = {
            edit: false,
            groups: [
                {
                    label: 'Terms',
                    list_type: 'letter',
                    items: [ {  text: '' } ]
                }
            ], 
        };
    }

    componentDidUpdate() {   
        if ( ! this.state.edit && this.props.data ) { 
            this.setState({ edit: true, groups: this.props.data });
        }
	}

    handleGroupInfo = (index) => (e) => {
        const { name, value } = e.target;
		let items = this.state.groups[index]; 
        items[name] = value;  
        let groups = this.state.groups;
        this.setState({ groups: groups });
        this.handlePros();
	}

    handleChange = (group_index, list_index) => (e) => {
        const { name, value } = e.target;
		let items = this.state.groups[group_index].items.map((item, i) => { 
			if (list_index !== i) return item;
			return { ...item, [name]: value }
		}); 

        this.state.groups[group_index].items = items; 
        let groups = this.state.groups;
        this.setState({ groups: groups }); 
        this.handlePros();
	}

    addGroup = () => {
        let groups = this.state.groups;
        groups.push({
            label: 'Terms',
            list_type: 'letter',
            items: [ {  text: '' } ]
        });  
        this.setState({ groups: groups }); 
    }; 

    addList = (index) => {
        let items = this.state.groups[index].items; 
        items.push( {  text: '' } );  
        let groups = this.state.groups;
        this.setState({ groups: groups });
    };  

    handlePros = () => {
        this.props.changeHandler( this.state.groups );
    };  

    render = () => { 

        const { groups } = this.state; 

        return (
            <>  
                {groups.map( (group_single, group_index) => { 
                    let list_class = null;
                    if ( group_single.list_type == 'letter' ) {
                        list_class = 'list-decimal';
                    } else if ( group_single.list_type == 'text' ) {
                        list_class = 'list-letter';
                    } else if ( group_single.list_type == 'dot' ) {
                        list_class = 'list-disc';
                    }

                    return (
                        <div className="pi-add-term" key={group_index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="fname">
                                        Add Terms 
                                        <span>
                                        <svg
                                        width={23}
                                        height={12}
                                        viewBox="0 0 13 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg" 
                                        >
                                        <path
                                            d="M12.524.476a1.625 1.625 0 00-2.298 0L4.062 6.64v2.297H6.36l6.164-6.163a1.625 1.625 0 000-2.298z"
                                            fill="#A0AEC0"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M0 3.25a1.625 1.625 0 011.625-1.625h3.25a.813.813 0 110 1.625h-3.25v8.125H9.75v-3.25a.813.813 0 011.625 0v3.25A1.625 1.625 0 019.75 13H1.625A1.625 1.625 0 010 11.375V3.25z"
                                            fill="#A0AEC0"
                                        />
                                        </svg>
                                        </span>
                                    </label>
                                </div>
                                <div className="col-md-6">
                                    <div className="pi-radio-group">
                                        <span>Term List Serial</span> 
                                        <input id={group_index+'-list-letter'} onChange={ this.handleGroupInfo(group_index) } name="list_type" value="letter" type="radio" />
                                        <label htmlFor={group_index+'-list-letter'}>1. Letter</label>

                                        <input id={group_index+'-list-text'} onChange={ this.handleGroupInfo(group_index) } name="list_type" value="text" type="radio" />
                                        <label htmlFor={group_index+'-list-text'}>a. Text</label>

                                        <input id={group_index+'-list-dot'} onChange={ this.handleGroupInfo(group_index) }  name="list_type" value="dot" type="radio" />
                                        <label htmlFor={group_index+'-list-dot'}>●. Dot</label>
                                    </div>
                                </div>
                            </div>

                            <div className="pi-group-item pi-bg-air-white">
                                <ul> 
                                    {group_single.items.map( (item, list_index) => { 
                                        return (
                                            <li key={list_index}> 
                                                <input 
                                                type="text" 
                                                name="text" 
                                                value={item.text} 
                                                onChange={ this.handleChange(group_index, list_index) } />
                                            </li>
                                        );
                                    })}
                                </ul>
                                <button 
                                className="pi-group-btn"
                                onClick={() => this.addList(group_index)}
                                >
                                    <span>
                                        <svg
                                        width={10}
                                        height={10}
                                        viewBox="0 0 10 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg" 
                                        >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                                            fill="#2D3748"
                                        />
                                        </svg>
                                    </span>
                                    Add New Term
                                </button>
                            </div>
                        </div>
                    );
                })}
                
                <button 
                className="pi-group-btn pi-ml-10"
                onClick={() => this.addGroup()}
                >
                    <span>
                    <svg
                    width={10}
                    height={10}
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg" 
                    >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 0a1 1 0 011 1v3h3a1 1 0 010 2H6v3a1 1 0 01-2 0V6H1a1 1 0 010-2h3V1a1 1 0 011-1z"
                        fill="#2D3748"
                    />
                    </svg>
                    </span>
                    Add New Group
                </button>
            </>
        )
    }
}

Group.propTypes = { 
    title: PropTypes.string, 
}

export default Group


