import React from 'react';

const app = {
	light: {
		foreground: '#000000',
		background: '#eeeeee',
	},
	dark: {
		foreground: '#ffffff',
		background: '#222222',
	},
	msg: {
		create: 'Successfully Added',
		update: 'Successfully Updated',
		delete: 'Successfully Deleted',
		confirm: 'Are you sure to delete it?',
	}
};

export const AppContext = React.createContext(app);