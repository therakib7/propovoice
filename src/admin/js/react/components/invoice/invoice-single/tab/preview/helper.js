import axios from 'axios';

const apiUrl = `${ncpi_local.apiServerUrl}ncpis/v1/invoices`;

const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ncpi_local.nonce
	}
};

const getAll = ( args = '') => {
	return axios.get(`${apiUrl}/?${args}`);
};

const get = id => {
	return axios.get(`${apiUrl}/${id}`);
};

const create = data => {
	return axios.post(apiUrl, data, token);
};

const update = (id, data) => {
	return axios.put(`${apiUrl}/${id}`, data, token);
};

const remove = id => {
	return axios.delete(`${apiUrl}/${id}`, token);
}; 

export default {
	getAll,
	get,
	create,
	update,
	remove 
};