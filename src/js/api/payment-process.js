import axios from 'axios';
import { apiUrl, token } from './helper'

const url = apiUrl + 'payment-process';

const getAll = (args = '') => {
	return axios.get(`${url}/?${args}`, token);
};

const create = data => {
	return axios.post(url, data, token);
};

export default {
	getAll,
	create
};