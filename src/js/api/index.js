import axios from "axios";

const token = {
	headers: {
		"content-type": "application/json",
		"X-WP-NONCE": ndpv.nonce,
	},
};

const url = (api, from) => {
	const { apiUrl, apiServerUrl } = ndpv;
	if ( from == 'free' ) {
		return `${apiUrl}ndpv/v1/${api}`;
	} else if ( from == 'pro' ) {
		return `${apiUrl}ndpvp/v1/${api}`;
	} else {
		return `${apiServerUrl}ncpis/v1/${api}`;
	}
};

const get = (api, args = '', from = 'free' ) => {
	return axios.get(`${url(api, from)}/?${args}`);
};

const getS = ( api, id, from = 'free') => {
	return axios.get(`${url(api, from)}/${id}`);
};

const add = ( api, data, from = 'free') => {
	return axios.post(url(api, from), data, token);
};

const edit = (api, id, data, from = 'free') => {
	return axios.put(`${url(api, from)}/${id}`, data, token);
};

const del = (api, id, from = 'free') => {
	return axios.delete(`${url(api, from)}/${id}`, token);
};

export default {
	get,
	getS,
	add,
	edit,
	del
};
