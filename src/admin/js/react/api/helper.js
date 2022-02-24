export const apiUrl = `${ncpi_local.apiUrl}ncpi/v1/`;
export const apiServerUrl = `${ncpi_local.apiServerUrl}ncpis/v1/`;

export const token = {
	headers: {
		'content-type': 'application/json',
		'X-WP-NONCE': ncpi_local.nonce
	}
};