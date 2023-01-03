import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import api from 'api';
export default (props) => {
	const [form, setForm] = useState({
		deactivate: []
	});

	useEffect(() => {
		api.get('settings', 'tab=general_module').then(resp => {
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

		form.tab = 'general_module';

		api.add('settings', form).then(resp => {
			if (resp.data.success) {
				toast.success(ndpv.i18n.aUpd);
			} else {
				resp.data.data.forEach(function (value, index, array) {
					toast.error(value);
				});
			}
		});
		props.handleSkip('tutorial')
	}

	const handleLogoChange = (data) => {
		setForm({ ...form, ['logo']: data });
	}
	const i18n = ndpv.i18n;
	return (
		<form onSubmit={handleSubmit} className="pv-form-style-one">
			<h4 className="pv-title-medium pv-mb-15">Module Select</h4>
			<div className="row">
				<div className="col">
					<label id="module-lead">Lead</label>
					<div className="pv-field-switch pv-ml-10">
						<label className='pv-switch'>
							<input type='checkbox'
								id="module-lead"
								name='deactivate'
								value='lead'
								checked={form.deactivate.includes('lead') ? '' : 'checked'}
								onChange={handleChange}
							/>
							<span className='pv-switch-slider pv-round'></span>
						</label>
					</div>
				</div>

				<div className="col">
					<label id="module-deal">Deal</label>
					<div className="pv-field-switch pv-ml-10">
						<label className='pv-switch'>
							<input type='checkbox'
								id="module-deal"
								name='deactivate'
								value='deal'
								checked={form.deactivate.includes('deal') ? '' : 'checked'}
								onChange={handleChange}
							/>
							<span className='pv-switch-slider pv-round'></span>
						</label>
					</div>
				</div>
			</div>

			<div className="pv-buttons pv-text-center">
				<button className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big">{i18n.save} {i18n.nd} {i18n.cont}</button>
				<a className="pv-text-hover-blue" onClick={() => props.handleSkip('module')}>{i18n.skip}</a>
			</div>
		</form>
	);
}