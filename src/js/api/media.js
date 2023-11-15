import axios from 'axios';
import { apiUrl, token } from './helper'

const url = apiUrl + 'media';

const headers = {
	...token,
	'Content-Type': 'multipart/form-data',
};

const getAll = (args = '') => {
	return axios.get(`${url}/?${args}`, token);
};

const getAttachment = (type) => {
	return axios.get(`${url}/attachment/${type}`, token);
};
const getDefaultAttachment = (type) => {
	return axios.get(`${url}/attachment/${type}/default/get`, token);
};

const setDefaultAttachment = (type, id) => {
	return axios.get(`${url}/attachment/${type}/default/set/${id}`, token);
};
const get = id => {
	return axios.get(`${url}/${id}`, token);
};

const create = data => {
	return axios.post(url, data, { headers });
};

const update = (id, data) => {
	return axios.put(`${url}/${id}`, data, { headers });
};

const remove = id => {
	return axios.delete(`${url}/${id}`, token);
};

const findByArg = title => {
	return axios.get(`${url}?title=${title}`, token);
};

export default {
	getAll,
	getAttachment,
	getDefaultAttachment,
	setDefaultAttachment,
	get,
	create,
	update,
	remove,
	findByArg
};
