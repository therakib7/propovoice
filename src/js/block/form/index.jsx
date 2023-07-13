import React, { useCallback, useRef, useState, useEffect } from "react";

const Text = (props) => {
    const data = props.data;
    return (
        <>
            <label htmlFor={'form' + data.id}>{data.label}</label>
            <input
                id={'form' + data.id}
                type='text'
                name={data.id}
            />
        </>
    );
}

export default (props) => {

    // const data = props.data;
    const data = [
        {
            id: 'name',
            type: 'text',
            label: 'Name',
            placeholder: '',
            desc: '',
        },
        {
            id: 'email',
            type: 'email',
            label: 'Email',
            placeholder: '',
            desc: '',
        },
    ];
    return (
        <form className="pv-form-style-one">

            {data && data.map((item, i) => {
                let field = '';
                switch (item.type) {
                    case 'text':
                        field = <Text data={item} />
                        break;

                    case 'number':

                        break;

                    default:
                        break;
                }
                return field;
            })}
        </form>
    );
}