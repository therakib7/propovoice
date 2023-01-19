import axios from 'axios';
import { apiUrl, apiServerUrl, token } from './helper'

const url = apiUrl + 'invoices';
const urlServer = apiServerUrl + 'invoices';

const getAll = (args = '') => {
	return axios.get(`${url}/?${args}`, token);
};

const getAllTemplate = (args = '') => {
	return axios.get(`${urlServer}/?${args}`, token);
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
	getAllTemplate,
	get,
	create,
	update,
	remove,
	findByArg
};