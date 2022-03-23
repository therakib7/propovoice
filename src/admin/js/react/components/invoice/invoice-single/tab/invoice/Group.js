import React, { Component } from 'react' 
import PropTypes from 'prop-types' 

import Editable from './Editable';

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
        const { value } = e.target;
		let items = this.state.groups[index];         
        items['list_type'] = value;         
        let groups = this.state.groups;
        this.setState({ groups: groups });
        this.handlePros();
	}

    handleGroupLabel = (index, value = null) => { 
		let items = this.state.groups[index];  
        items['label'] = value;  
        
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
    
    testRakib = (index) => {
        console.log(index)
    }; 

    render = () => { 

        const { groups } = this.state; 

        return (
            <>  
                {groups.map( (group_single, group_index) => { 
                    let list_style = 'decimal';
                    if ( group_single.list_type == 'letter' ) {
                        list_style = 'decimal';
                    } else if ( group_single.list_type == 'text' ) {
                        list_style = 'lower-alpha';
                    } else if ( group_single.list_type == 'dot' ) {
                        list_style = 'disc';
                    }

                    return (
                        <div className="pi-add-term" key={group_index}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Editable 
                                        key={group_index}
                                        value={group_single.label}
                                        index={group_index}
                                        changeHandler={ this.handleGroupLabel }  
                                    /> 
                                </div>
                                <div className="col-md-6">
                                    <div className="pi-radio-group">
                                        <span>Term List Serial</span>     
                                        <input 
                                            id={'list-letter-'+group_index} 
                                            onChange={ this.handleGroupInfo(group_index) }  
                                            name={'list_type_'+group_index} 
                                            value="letter" 
                                            type="radio" 
                                            checked={group_single.list_type == 'letter' ? 'checked' : ''} 
                                        />
                                        <label htmlFor={'list-letter-'+group_index}>1. Letter</label>

                                        <input 
                                            id={'list-text-'+group_index} 
                                            onChange={ this.handleGroupInfo(group_index) } 
                                            name={'list_type_'+group_index} 
                                            value="text" 
                                            type="radio" 
                                            checked={group_single.list_type == 'text' ? 'checked' : ''} 
                                        />
                                        <label htmlFor={'list-text-'+group_index}>a. Text</label>

                                        <input 
                                            id={'list-dot-'+group_index} 
                                            onChange={ this.handleGroupInfo(group_index) }  
                                            name={'list_type_'+group_index} 
                                            value="dot" 
                                            type="radio" 
                                            checked={group_single.list_type == 'dot' ? 'checked' : ''} 
                                        />
                                        <label htmlFor={'list-dot-'+group_index}>●. Dot</label>
                                    </div>
                                </div>
                            </div>

                            <div className="pi-group-item pi-bg-air-white">
                                <ul style={ { listStyleType: list_style } }> 
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


