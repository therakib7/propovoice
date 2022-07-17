import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Editable from 'block/editable';

class Checklist extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            checklists: [
                {
                    label: 'Terms',
                    list_type: 'letter',
                    items: [{ text: '' }]
                }
            ],
        };
    }

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, checklists: this.props.data });
        }
    }

    handleChecklistLabel = (index, value = null) => {
        let items = this.state.checklists[index];
        items['label'] = value;

        let checklists = this.state.checklists;
        this.setState({ checklists: checklists });
        this.handlePros();
    }

    handleChange = (checklist_index, list_index) => (e) => {
        const { name, value } = e.target;
        let items = this.state.checklists[checklist_index].items.map((item, i) => {
            if (list_index !== i) return item;
            return { ...item, [name]: value }
        });

        this.state.checklists[checklist_index].items = items;
        let checklists = this.state.checklists;
        this.setState({ checklists: checklists });
        this.handlePros();
    }

    addChecklist = (e) => {
        e.preventDefault();
        let checklists = this.state.checklists;
        checklists.push({
            label: 'Terms',
            list_type: 'letter',
            items: [{ text: '' }]
        });
        this.setState({ checklists: checklists });
    };

    addList = (e, index) => {
        e.preventDefault();
        let items = this.state.checklists[index].items;
        items.push({ text: '' });
        let checklists = this.state.checklists;
        this.setState({ checklists: checklists });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.checklists);
    };

    deleteHandler = (checklist_index, list_index = null) => {
        let array = [...this.state.checklists];

        if (list_index === null) {
            array.splice(checklist_index, 1);
        } else {
            let items = array[checklist_index].items;
            items.splice(list_index, 1);
        }

        this.setState({ checklists: array }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { checklists } = this.state;

        return (
            <>
                {checklists.map((single, index) => {

                    return (
                        <div className="col">
                            <div class="pi-checklist-head">
                                <label>
                                    Checklist
                                    <span class="pi-mt-3 pi-ml-5">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5.79375 13.4999H3C2.86739 13.4999 2.74022 13.4473 2.64645 13.3535C2.55268 13.2597 2.5 13.1326 2.5 12.9999V10.2062C2.49978 10.1413 2.51236 10.0769 2.53702 10.0169C2.56169 9.95682 2.59796 9.90222 2.64375 9.85619L10.1438 2.3562C10.1903 2.30895 10.2457 2.27144 10.3069 2.24583C10.3681 2.22022 10.4337 2.20703 10.5 2.20703C10.5663 2.20703 10.632 2.22022 10.6931 2.24583C10.7543 2.27144 10.8097 2.30895 10.8563 2.3562L13.6438 5.1437C13.691 5.19022 13.7285 5.24568 13.7541 5.30684C13.7797 5.368 13.7929 5.43364 13.7929 5.49995C13.7929 5.56625 13.7797 5.63189 13.7541 5.69305C13.7285 5.75421 13.691 5.80967 13.6438 5.85619L6.14375 13.3562C6.09773 13.402 6.04313 13.4383 5.98307 13.4629C5.92301 13.4876 5.85868 13.5002 5.79375 13.4999V13.4999Z" stroke="#CBD5E0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            <path d="M8.5 4L12 7.5" stroke="#CBD5E0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                        </svg>
                                    </span>
                                </label>
                                <span>45 Done</span>
                            </div>
                            <div className="pi-checklist-content">
                                <ul>
                                    <li><input type="checkbox" /> <label>Checkbox</label></li>
                                </ul>

                                <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow pi-bg-shadow">
                                    <svg
                                        width={12}
                                        height={12}
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1.875 6H10.125"
                                            stroke="#2D3748"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M6 1.875V10.125"
                                            stroke="#2D3748"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    Add an Item
                                </button>
                            </div>
                        </div>
                    );
                })}
            </>
        )
    }
}

Checklist.propTypes = {
    title: PropTypes.string,
}

export default Checklist