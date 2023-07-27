import React, { Component } from 'react';

import axios from 'axios';
import { apiUrl, token } from 'api/helper'

const Api = (Inner, mod = '') => {

    let url = apiUrl + mod;

    const apiWrap = class extends Component {
        constructor(props) {
            super(props);
        }

        getAll = (nUrl = null, args = '') => {
            if (nUrl) {
                url = apiUrl + nUrl;
            }
            return axios.get(`${url}/?${args}`, token);
        };

        get = (nUrl = null, id) => {
            if (nUrl) {
                url = apiUrl + nUrl;
            }
            return axios.get(`${url}/${id}`, token);
        };

        create = (nUrl = null, data) => {
            if (nUrl) {
                url = apiUrl + nUrl;
            }
            return axios.post(url, data, token);
        };

        update = (nUrl = null, id, data) => {
            if (nUrl) {
                url = apiUrl + nUrl;
            }
            return axios.put(`${url}/${id}`, data, token);
        };

        remove = (nUrl = null, id) => {
            if (nUrl) {
                url = apiUrl + nUrl;
            }
            return axios.delete(`${url}/${id}`, token);
        };

        findByArg = (nUrl = null, title = '') => {
            if (nUrl) {
                url = apiUrl + nUrl;
            }
            return axios.get(`${url}?title=${title}`, token);
        };

        render() {
            return (
                <Inner
                    {...this.props}
                    getAll={this.getAll}
                    get={this.get}
                    create={this.create}
                    update={this.update}
                    remove={this.remove}
                    findByArg={this.findByArg}
                />
            );
        }
    };
    return apiWrap;
};

export default Api;