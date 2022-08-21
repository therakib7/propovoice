export const apiUrl = `${ndpi.apiUrl}ndpi/v1/`;
export const apiProUrl = `${ndpi.apiUrl}ndpip/v1/`;
export const apiServerUrl = `${ndpi.apiServerUrl}ncpis/v1/`;

export const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ndpi.nonce
	}
};