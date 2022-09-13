import axios from 'axios';
import { apiUrl, token } from './helper'

const url = apiUrl + 'wc-order';

const get = (args = '') => {
	return axios.get(`${url}/?${args}`);
};


export default {
	get
};
