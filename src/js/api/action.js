import axios from 'axios';
import { apiUrl, token } from './helper'

const url = apiUrl + 'actions';

const getAll = (args = '') => {
	return axios.get(`${url}/?${args}`, token);
};

const get = id => {
	return axios.get(`${url}/${id}`, token);
};

const create = data => {
	return axios.post(url, data, token);
};

const update = (id, data) => {
	return axios.put(`${url}/${id}`, data, token);
};

const remove = id => {
	return axios.delete(`${url}/${id}`, token);
};

const findByArg = title => {
	return axios.get(`${url}?title=${title}`, token);
};

export default {
	getAll,
	get,
	create,
	update,
	remove,
	findByArg
};