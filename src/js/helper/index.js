import { CountryRegionData } from 'react-country-region-selector';

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

const countryByCode = (country = '') => {
	if (country) {
		let obj = CountryRegionData.find((o, i) => {
			if (o[1] === country) {
				return true; // stop searching
			}
		});

		if (obj) {
			return obj[0];
		}
	}
}

const checkRoute = () => {
	let currentHash = window.location.hash;
	let navUl = document.querySelectorAll('#toplevel_page_ndpv ul > li');

	for (let y = 0, l = navUl.length; y < l; y++) {
		const anchor = navUl[y].querySelector('a');
		// currentHash = currentHash.replace(/[0-9]/g, '').replace(/\/+$/, '');
		currentHash = currentHash.replace(/[0-9]|\/+$/g, '');

		if (currentHash && anchor && anchor.getAttribute('href').includes(currentHash)) {
			navUl[y].classList.add('current');
		} else {
			navUl[y].classList.remove('current');
			//only for dashboard menu
			if (!currentHash && anchor && anchor.getAttribute('href') === 'admin.php?page=ndpv#') {
				navUl[y].classList.add('current');
			}
		}
	}
};

const mergeObjects = (...sources) => {
	const result = {};

	sources.forEach((source) => {
		for (const key in source) {
			if (source.hasOwnProperty(key)) {
				if (key !== "first_name" && source[key] !== undefined && source[key] !== null && source[key] !== '') {
					result[key] = source[key];
				} else if (!result.hasOwnProperty(key)) {
					result[key] = source[key];
				}
			}
		}
	});

	return result;
}

export {
	currency,
	countryByCode,
	checkRoute,
	mergeObjects
};
