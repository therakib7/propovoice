import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import api from 'api';
export default (props) => {
	const [form, setForm] = useState({
		deactivate: []
	});

	useEffect(() => {
		api.get('settings', 'tab=subscription').then(resp => {
			if (resp.data.success) {
				setForm(resp.data.data);
			}
		});
	}, []);

	const handleChange = (e) => {
		const target = e.target;
		const value = target.value;

		let arr = form.deactivate;
		if (target.checked) {
			arr.splice(arr.indexOf(value), 1);
		} else {
			arr.push(value);
		}

		setForm({ ...form, ['deactivate']: arr });
	}

	const handleSubmit = (e) => {
		e.preventDefault();

		form.tab = 'subscription';

		api.add('settings', form).then(resp => {
			if (resp.data.success) {
				toast.success(ndpv.i18n.aUpd);
			} else {
				resp.data.data.forEach(function (value, index, array) {
					toast.error(value);
				});
			}
		});
		props.handleSkip('finish')
	}

	const handleLogoChange = (data) => {
		setForm({ ...form, ['logo']: data });
	}
	const i18n = ndpv.i18n;
	return (
		<form onSubmit={handleSubmit} className="pv-form-style-one">
			<h4 className="pv-title-medium pv-mb-15">Tutorial</h4>
			<div className="row">
				<div className="col">
					<label id="module-get_update">Get Updates</label>
					<div className="pv-field-switch pv-ml-10">
						<label className='pv-switch'>
							<input type='checkbox'
								id="module-get_update"
								name='activate'
								value='get_update'
								checked={form.deactivate.includes('get_update') ? '' : 'checked'}
								onChange={handleChange}
							/>
							<span className='pv-switch-slider pv-round'></span>
						</label>
					</div>
				</div>

				<div className="col">
					<label id="module-share_info">Share Essentials</label>
					<div className="pv-field-switch pv-ml-10">
						<label className='pv-switch'>
							<input type='checkbox'
								id="module-share_info"
								name='activate'
								value='share_info'
								checked={form.deactivate.includes('share_info') ? '' : 'checked'}
								onChange={handleChange}
							/>
							<span className='pv-switch-slider pv-round'></span>
						</label>
					</div>
				</div>
			</div>

			<div className="pv-buttons pv-text-center">
				<button className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big">{i18n.save} {i18n.nd} {i18n.cont}</button>
				<a className="pv-text-hover-blue" onClick={() => props.handleSkip('tutorial')}>{i18n.skip}</a>
			</div>
		</form>
	);
}