import { useState, useEffect } from "react";
import {by639_1} from 'iso-language-codes' 
import Select from 'block/field/select';

export default (props) => {

	const [lists, setList] = useState([]);
	const [single, setListById] = useState(null);

	useEffect(() => {
		const l = by639_1;
		let list = [];
		Object.keys(l).map((item) => {
			list.push({ 
                id: item, 
                label: l[item].name + ' (' + l[item].nativeName + ')' 
            });
		});
		setList(list);

		if ( props.value ) {
			setListById({
				id: props.value,
				label: l[props.value].name + ' (' + l[props.value].nativeName + ')',
			});
		}

	}, []);

	const onChange = (val) => {
		setListById(val);
		props.onChange(val.id)
	}
	return (
		<>
			{lists.length > 0 && <Select 
				search
				className={'pv-field-select'}
				value={single}
				onChange={onChange}
				options={lists}
			/>}
		</>
	);
} 