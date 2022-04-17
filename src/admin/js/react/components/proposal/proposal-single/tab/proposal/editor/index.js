import React, { useState, useEffect } from 'react';

import Style from './editor.scoped.scss'

import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tools";
import { EDITOR_VALUE } from "./default-all";
import { EDITOR_EMPTY_VALUE } from "./empty-default";

const ReactEditorJS = createReactEditorJS();

const Editor = () => {

    const initialProposalState = {
        id: null,
        title: '',
        content: [
            {
                default: EDITOR_VALUE,
                value: 'sdf'
            },
            {
                default: EDITOR_EMPTY_VALUE,
                value: null
            }
        ],
        date: false
    };

    const [proposals, setProposals] = useState(initialProposalState);

    useEffect(() => {

    }, []);

    function addAfter(array, index, newItem) {
        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index)
        ];
    }

    const addNewPage = (page_index) => {
        console.log(page_index);

        const new_proposals = { ...proposals };

        let data = addAfter(new_proposals.content, page_index + 1, {
            default: EDITOR_VALUE,
            value: 'sdf'
        });
        new_proposals.content = data;

        setProposals(new_proposals);
    };

    return (
        <div className="pi-proposal-pages">
            {proposals.content && proposals.content.map((proposal, index) => (
                <div key={index}>
                    <div className="pi-proposal-page">
                        <ReactEditorJS holder={`ncpi-editor-${index}`} tools={EDITOR_JS_TOOLS} defaultValue={{ time: new Date().getTime(), blocks: proposal.default }} />
                        <span className='pi-text-right'>Page {index + 1}</span>
                    </div>

                    <div className="pi-add-proposal-page">
                        <button onClick={() => { addNewPage(index); }}>
                            <i className="dashicons dashicons-plus-alt"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Editor;