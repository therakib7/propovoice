export const apiUrl = `${ncpi.apiUrl}ncpi/v1/`;
export const apiServerUrl = `${ncpi.apiServerUrl}ncpis/v1/`;

export const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ncpi.nonce
	}
};