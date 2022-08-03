import axios from 'axios';

const apiUrl = `${ncpi.apiUrl}ncpi/v1/businesses`;

const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ncpi.nonce
	}
};

const getAll = (args = '') => {
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

const findByArg = title => {
	return axios.get(`${apiUrl}?title=${title}`);
};

export default {
	getAll,
	get,
	create,
	update,
	remove,
	findByArg
};