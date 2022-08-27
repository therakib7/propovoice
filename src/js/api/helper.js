export const apiUrl = `${ndpv.apiUrl}ndpv/v1/`;
export const apiProUrl = `${ndpv.apiUrl}ndpvp/v1/`;
export const apiServerUrl = `${ndpv.apiServerUrl}ncpis/v1/`;

export const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ndpv.nonce
	}
};