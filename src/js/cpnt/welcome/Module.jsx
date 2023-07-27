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
				resp.data.data.forEach(function (value) {
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
		<div id="pv-module">
			<form onSubmit={handleSubmit} className="">
				{/* <h4 className="pv-title-medium pv-mb-15">Module Select</h4>
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
				</div> */}

				<div className="pv-welcome-title-content">
					<h3 className="pv-tab-title">Module Select</h3>
					<p className="pv-tab-disc">
						the best crm and billing plugins to manage your service business
					</p>
				</div>
				<div className="module-content" style={{ paddingBottom: 25 }}>
					<div className="row">
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Dashboard</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Lead Management</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>
									Deal Pipeline{" "}
									<span className="pv-pro-label">
										<svg
											width={13}
											height={10}
											viewBox="0 0 13 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1.71013 8.87452C1.72412 8.93204 1.7495 8.98616 1.78477 9.0337C1.82003 9.08124 1.86447 9.12123 1.91545 9.15131C1.96643 9.18139 2.02292 9.20094 2.08158 9.20882C2.14025 9.2167 2.19989 9.21274 2.257 9.19718C4.86395 8.47534 7.61803 8.47534 10.225 9.19718C10.2821 9.21274 10.3417 9.2167 10.4004 9.20882C10.4591 9.20094 10.5156 9.18139 10.5665 9.15131C10.6175 9.12123 10.6619 9.08124 10.6972 9.0337C10.7325 8.98616 10.7579 8.93204 10.7718 8.87452L12.1664 2.95187C12.1855 2.87259 12.1821 2.78954 12.1566 2.71209C12.131 2.63464 12.0843 2.56588 12.0218 2.51356C11.9592 2.46123 11.8833 2.42744 11.8025 2.41599C11.7218 2.40454 11.6395 2.41588 11.5648 2.44874L8.79763 3.67921C8.69737 3.72336 8.5843 3.72879 8.48027 3.69445C8.37624 3.6601 8.28863 3.58843 8.23435 3.49327L6.62653 0.594837C6.5887 0.526455 6.53324 0.469456 6.46592 0.429765C6.3986 0.390074 6.32187 0.369141 6.24372 0.369141C6.16557 0.369141 6.08885 0.390074 6.02153 0.429765C5.95421 0.469456 5.89874 0.526455 5.86091 0.594837L4.2531 3.49327C4.19882 3.58843 4.1112 3.6601 4.00717 3.69445C3.90314 3.72879 3.79008 3.72336 3.68982 3.67921L0.922629 2.44874C0.847988 2.41588 0.765648 2.40454 0.684901 2.41599C0.604154 2.42744 0.528216 2.46123 0.465658 2.51356C0.403099 2.56588 0.35641 2.63464 0.330861 2.71209C0.305312 2.78954 0.301919 2.87259 0.321067 2.95187L1.71013 8.87452Z"
												fill="#fff"
											/>
										</svg>
										Pro
									</span>
								</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Client</h3>
								<p>
									Get updates. We will send marketing tips and advanced usage of
									Propovoice
								</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Project</h3>
								<p>
									Allow FluentCRM to collect non-sensitive diagnostic data and usage
									information. what we collect
								</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Estimate</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Dashboard</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Lead Management</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>
									Deal Pipeline{" "}
									<span className="pv-pro-label">
										<svg
											width={13}
											height={10}
											viewBox="0 0 13 10"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1.71013 8.87452C1.72412 8.93204 1.7495 8.98616 1.78477 9.0337C1.82003 9.08124 1.86447 9.12123 1.91545 9.15131C1.96643 9.18139 2.02292 9.20094 2.08158 9.20882C2.14025 9.2167 2.19989 9.21274 2.257 9.19718C4.86395 8.47534 7.61803 8.47534 10.225 9.19718C10.2821 9.21274 10.3417 9.2167 10.4004 9.20882C10.4591 9.20094 10.5156 9.18139 10.5665 9.15131C10.6175 9.12123 10.6619 9.08124 10.6972 9.0337C10.7325 8.98616 10.7579 8.93204 10.7718 8.87452L12.1664 2.95187C12.1855 2.87259 12.1821 2.78954 12.1566 2.71209C12.131 2.63464 12.0843 2.56588 12.0218 2.51356C11.9592 2.46123 11.8833 2.42744 11.8025 2.41599C11.7218 2.40454 11.6395 2.41588 11.5648 2.44874L8.79763 3.67921C8.69737 3.72336 8.5843 3.72879 8.48027 3.69445C8.37624 3.6601 8.28863 3.58843 8.23435 3.49327L6.62653 0.594837C6.5887 0.526455 6.53324 0.469456 6.46592 0.429765C6.3986 0.390074 6.32187 0.369141 6.24372 0.369141C6.16557 0.369141 6.08885 0.390074 6.02153 0.429765C5.95421 0.469456 5.89874 0.526455 5.86091 0.594837L4.2531 3.49327C4.19882 3.58843 4.1112 3.6601 4.00717 3.69445C3.90314 3.72879 3.79008 3.72336 3.68982 3.67921L0.922629 2.44874C0.847988 2.41588 0.765648 2.40454 0.684901 2.41599C0.604154 2.42744 0.528216 2.46123 0.465658 2.51356C0.403099 2.56588 0.35641 2.63464 0.330861 2.71209C0.305312 2.78954 0.301919 2.87259 0.321067 2.95187L1.71013 8.87452Z"
												fill="#fff"
											/>
										</svg>
										Pro
									</span>
								</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Client</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Project</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
						<div className="col-sm-6 col-lg-4">
							<div className="pv-module">
								<h3>Estimate</h3>
								<p>OnProject, Task Management &amp; Team Collaboration Software</p>
								<span className="pv-field-switch-content">
									<label className="pv-field-switch pv-field-switch">
										<input type="checkbox" defaultChecked="" />
										<span className="pv-switch-slider pv-round" />
									</label>
								</span>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
}