import { useState, useEffect } from "react"; 
import currencyToSymbolMap from 'currency-symbol-map/map' 
import Select from 'react-select';

export default (props) => { 

	const [currencies, setList] = useState([]);
	const [currency, setListById] = useState('USD'); 

	useEffect(() => {
		const c = currencyToSymbolMap; 
        let list = [];
        Object.keys(c).map((item) => {
            list.push({ id: item, symbol: c[item] });
        }); 
        setList(list);
		if ( props.val ) {
			setListById(props.val);
		}
	}, []);

	const onChange = ( val ) => {
		setListById(val);
	}
 
	const cur = currencies; 
	return (
		<Select
			className={'pv-field-select'}
			value={currency}
			onChange={onChange}
			getOptionValue={(cur) => cur.id}
			getOptionLabel={(cur) => cur.id + ' (' + cur.symbol + ')'}
			options={cur}
		/>
	);
} 