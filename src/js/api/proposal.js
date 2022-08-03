import axios from 'axios';
import { apiUrl, apiServerUrl, token } from './helper'

const url = apiUrl + 'proposals';
const urlServer = apiServerUrl + 'invoices';

const getAll = (args = '') => {
	return axios.get(`${url}/?${args}`);
};

const getAllTemplate = (args = '') => {
	return axios.get(`${urlServer}/?${args}`);
};

const get = id => {
	return axios.get(`${url}/${id}`);
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
	return axios.get(`${url}?title=${title}`);
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