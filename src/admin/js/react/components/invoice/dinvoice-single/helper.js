import axios from 'axios';

const apiUrl = `${ncpi_local.apiUrl}ncpi/v1/clients`;

const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ncpi_local.nonce
	}
};

const getAll = () => {
	return axios.get(apiUrl);
};

const get = id => {
	return axios.get(`${apiUrl}/${id}`, token);
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