import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';

import Preloader from 'block/preloader/table';

import Api from 'api/proposal';

import Style from './editor.scoped.scss'

import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";
import { EDITOR_VALUE } from "./default-all";
import { EDITOR_EMPTY_VALUE } from "./empty-default";

const ReactEditorJS = createReactEditorJS();

export default class Editor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Editor',
            empty: false,
            preloader: true,
            proposals: {
                id: null,
                title: '',
                pages: [
                    /* {
                        default: EDITOR_VALUE,
                        value: 'sdf'
                    }, */
                    {
                        default: EDITOR_EMPTY_VALUE,
                        value: null
                    }
                ],
                date: false
            },
        };

        this.instanceRef = React.createRef(null);
    }

    static contextType = AppContext;

    componentDidMount() {
    }

    openForm = (type = 'new', business = null) => {
        if (type == 'new') {
            this.setState({ formModal: true, formModalType: 'new' });
        } else {
            this.setState({ formModal: true, formModalType: 'edit', business: business });
        }
    };

    addNewPage = (index) => {
        let newItem = {
            default: EDITOR_EMPTY_VALUE,
            value: null
        }

        let pages = [
            ...this.state.proposals.pages.slice(0, index),
            newItem,
            ...this.state.proposals.pages.slice(index)
        ];

        let proposals = { ...this.state.proposals };
        proposals.pages = pages;
        console.log(index)
        this.setState({ proposals });

    };

    handleChange = (instance) => {
        console.log(instance)
        this.instanceRef.current = instance
        // const { name, value } = e.target;
        // this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleChange = (instance) => {
        console.log(instance)
        this.instanceRef.current = instance
        // const { name, value } = e.target;
        // this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleChange = (instance) => {
        console.log(instance)
        this.instanceRef.current = instance
        // const { name, value } = e.target;
        // this.setState({ form: { ...this.state.form, [name]: value } });
    }

    async onSave() {
        // const savedData = await this.instanceRef.current.save()
        const savedData = await this.instanceRef.current.save();
        console.log(savedData)
    }

    render() {
        const { proposals } = this.state;
        return (
            <div className="pi-proposal-pages">
                {proposals.pages && proposals.pages.map((single, index) => (
                    <div key={index}>
                        <div className="pi-proposal-page">
                            <ReactEditorJS
                                holder={`ncpi-editor-${index}`}
                                maxHeight={1120}
                                onInitialize={this.handleChange}
                                tools={EDITOR_JS_TOOLS}
                                // onChange={this.onSave.bind(this)}
                                defaultValue={{
                                    time: new Date().getTime(),
                                    blocks: single.default
                                }}
                            />
                            <span className='pi-proposal-page-number'>Page {index + 1}</span>
                        </div>

                        <div className="pi-add-proposal-page">
                            {/* <button onClick={() => { this.onSave(); }}>
                                render
                            </button> */}

                            <button onClick={() => { this.addNewPage(index); }}>
                                <i className="dashicons dashicons-plus-alt"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
} 