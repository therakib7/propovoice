// const { React, useState, useEffect } = wp.element;
import React, { useState, useEffect } from 'react';

import axios from 'axios';

const SettingCopy = () => {

    const [ firstname, setFirstName ] = useState( '' );
    const [ lastname, setLastName ]   = useState( '' );
    const [ email, setEmail ]         = useState( '' );
    const [ loader, setLoader ] = useState( 'Save Settings' );

    const url = `${ncpi.apiUrl}ncpi/v1/settings`;

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader( 'Saving...' );
        axios.post( url, {
            firstname: firstname,
            lastname: lastname,
            email: email
        }, {
            headers: {
                'content-type': 'application/json',
                'X-WP-NONCE': ncpi.nonce
            }
        } )
        .then( ( res ) => {
            setLoader( 'Save Settings' );
        } )
    }

    useEffect( () => {
        axios.get( url )
        .then( ( res ) => {
            setFirstName( res.data.firstname );
            setLastName( res.data.lastname );
            setEmail( res.data.email );
        } )
    }, [] )

    return(
        <>
            <h2>Propovoice Settings</h2>
            <form id="ncpi-settings-form" onSubmit={ (e) => handleSubmit(e) }>
                <table className="form-table" role="presentation">
                    <tbody>
                        <tr>
                            <th scope="row">
                                <label htmlFor="firstname">Firstname</label>
                            </th>
                            <td>
                                <input type="text" id="firstname" name="firstname" value={ firstname } onChange={ (e) => { setFirstName( e.target.value ) } } className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="lastname">Lastname</label>
                            </th>
                            <td>
                                <input type="text" id="lastname" name="lastname" value={ lastname } onChange={ (e) => { setLastName( e.target.value ) } } className="regular-text" />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">
                                <label htmlFor="email">Email</label>
                            </th>
                            <td>
                                <input type="email" id="email" name="email" value={ email } onChange={ (e) => { setEmail( e.target.value ) } } className="regular-text" />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p className="submit">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{ loader }</button>
                </p>
            </form>
        </>
    )
}

export default SettingCopy;