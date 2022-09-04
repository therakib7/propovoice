import { useState, useEffect } from "react";
import currencyToSymbolMap from 'currency-symbol-map/map'
// import Select from 'react-select';
import Select from 'block/field/select';

export default (props) => {

	const [currencies, setList] = useState([]);
	const [currency, setListById] = useState(null);

	useEffect(() => {
		const c = currencyToSymbolMap;
		let list = [];
		Object.keys(c).map((item) => {
			list.push({ id: item, label: item + ' (' + c[item] + ')' });
		});
		setList(list);

		if ( props.value ) {
			setListById({
				id: props.value,
				label: props.value + ' (' + c[props.value] + ')',
			});
		}

	}, []);

	const onChange = (val) => {
		setListById(val);
		props.onChange(val.id)
	}
	return (
		<>
			{currencies.length > 0 && <Select 
				search
				className={'pv-field-select'}
				value={currency}
				onChange={onChange}
				options={currencies}
			/>}
		</>
	);
} 