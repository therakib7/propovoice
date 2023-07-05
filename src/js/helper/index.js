
const currency = (amount, currency = 'USD', lang = 'en') => {
	try {
		return (new Intl.NumberFormat(lang, {
			style: 'currency',
			currency: currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 2
		}).format(amount))
	} catch (error) {
		return amount;
	}
};

export {
	currency
};
