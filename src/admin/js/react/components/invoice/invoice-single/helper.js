import axios from 'axios';

const apiUrl = `${ncpi_local.apiUrl}ncpi/v1/invoices`;
const apiUrlBusiness = `${ncpi_local.apiUrl}ncpi/v1/businesses`;
const apiUrlClient = `${ncpi_local.apiUrl}ncpi/v1/clients`;
const apiUrlMedia = `${ncpi_local.apiUrl}ncpi/v1/media`;

const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ncpi_local.nonce
	}
};

const getAll = ( args = '') => {
	return axios.get(`${apiUrl}/?${args}`);
};

const getAllBusiness = ( args = '') => {
	return axios.get(`${apiUrlBusiness}/?${args}`);
};

const getAllClient = ( args = '') => {
	return axios.get(`${apiUrlClient}/?${args}`);
};

const createMedia = data => {
	return axios.post(apiUrlMedia, data, token);
};

const removeMedia = id => {
	return axios.delete(`${apiUrlMedia}/${id}`, token);
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
	getAllBusiness,
	getAllClient,
	createMedia,
	removeMedia,
	get,
	create,
	update,
	remove 
};