export const apiUrl = `${ndpi.apiUrl}ncpi/v1/`;
export const apiServerUrl = `${ndpi.apiServerUrl}ncpis/v1/`;

export const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ndpi.nonce
	}
};