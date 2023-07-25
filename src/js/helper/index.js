
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

const checkRoute = () => {
	let currentHash = window.location.hash;
	let navUl = document.querySelectorAll('#toplevel_page_ndpv ul > li');

	for (let y = 0, l = navUl.length; y < l; y++) {
		const anchor = navUl[y].querySelector('a');
		// currentHash = currentHash.replace(/[0-9]/g, '').replace(/\/+$/, '');
		currentHash = currentHash.replace(/[0-9]|\/+$/g, '');
	
		if ( currentHash && anchor && anchor.getAttribute('href').includes(currentHash)) {
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

export {
	currency,
	checkRoute
};
