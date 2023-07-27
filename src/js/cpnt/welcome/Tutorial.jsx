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
				resp.data.data.forEach(function (value) {
					toast.error(value);
				});
			}
		});
		props.handleSkip('tutorial')
	}

	const i18n = ndpv.i18n;
	return (
		<div id="pv-tutorial">
			<form onSubmit={handleSubmit} className="">
				{/* <h4 className="pv-title-medium pv-mb-15">Tutorial</h4>
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
				</div> */}
				<div className="pv-welcome-title-content">
					<h3 className="pv-tab-title">Tutorial</h3>
					<p className="pv-tab-disc">The best crm and billing plugins to manage your service business</p>
				</div>
				<div className="row no-gutters pv-mb-30 pv-bg-pearl">
					<div className="col-lg-6">
						<a target="_blank" href="https://propovoice.com/docs/" className="pv-tutorial">
							<svg
								width={14}
								height={15}
								className="pv-mr-5"
								viewBox="0 0 14 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12.6177 13.037H2.62064C2.29697 13.037 1.97474 12.7785 1.97474 12.3911C1.97474 12.0296 2.2651 11.7393 2.62064 11.7393H12.6177C12.9521 11.7393 13.2103 11.4594 13.2103 11.1467C13.2103 11.0744 13.2044 1.54179 13.2044 1.46962C13.2044 0.657769 12.5466 0 11.7347 0C9.32299 0 4.87645 0 2.62064 0C1.6398 0 0.789551 0.802809 0.789551 1.83113V12.3911C0.789551 13.4335 1.63968 14.2222 2.62064 14.2222H12.6177C12.9436 14.2222 13.2103 13.9555 13.2103 13.6296C13.2103 13.3037 12.9436 13.037 12.6177 13.037ZM1.97474 1.83113C1.97474 1.48148 2.27103 1.18519 2.62064 1.18519H3.16585V10.5541C2.79317 10.5774 2.47972 10.4908 1.97474 10.6726V1.83113ZM6.24734 4.78223C6.24734 4.46814 6.41918 4.17777 6.69179 4.02962C6.96436 3.87554 7.30214 3.88741 7.56881 4.05924L9.26362 5.14963C9.5125 5.30371 9.66064 5.57628 9.66064 5.87258C9.66064 6.16298 9.5125 6.43555 9.26362 6.58963L7.56881 7.68001C7.31815 7.8471 6.97686 7.86514 6.69179 7.70964C6.41918 7.56149 6.24734 7.27112 6.24734 6.95703V4.78223Z"
									fill="#4C6FFF"
								/>
							</svg>
							Tutorial
						</a>
						<p>
							Watch how to use our top<br /> widgets. Save 1 hour of your<br /> learning time.
						</p>
						<div className="buttons">
							<button className="pv-btn pv-bg-blue pv-bg-hover-blue">
								<svg
									width={13}
									height={16}
									viewBox="0 0 13 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M2.62788 0.840517C2.40095 0.69744 2.1398 0.617841 1.87164 0.610014C1.60349 0.602187 1.33814 0.666419 1.10325 0.796017C0.86836 0.925615 0.672525 1.11584 0.536151 1.34686C0.399777 1.57788 0.327855 1.84125 0.327881 2.10952V13.8895C0.327855 14.1578 0.399777 14.4212 0.536151 14.6522C0.672525 14.8832 0.86836 15.0734 1.10325 15.203C1.33814 15.3326 1.60349 15.3968 1.87164 15.389C2.1398 15.3812 2.40095 15.3016 2.62788 15.1585L11.9719 9.26852C12.1863 9.13338 12.363 8.94611 12.4854 8.7242C12.6079 8.50229 12.6721 8.25297 12.6721 7.99952C12.6721 7.74606 12.6079 7.49674 12.4854 7.27483C12.363 7.05292 12.1863 6.86565 11.9719 6.73052L2.62788 0.839517V0.840517Z"
										fill="#EDF2F7"
									/>
								</svg>
								See Playlist
							</button>
							<a target="_blank" href="https://propovoice.com/docs" className="pv-p-8 pv-color-black">
								<svg
									className="pv-mr-5"
									width={14}
									height={12}
									viewBox="0 0 14 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M7.65625 11.6088C8.7495 10.8847 10.0468 10.4979 11.375 10.5C11.9963 10.5 12.5965 10.5823 13.1652 10.7369C13.2629 10.7634 13.3655 10.7678 13.4652 10.7498C13.5649 10.7317 13.6589 10.6918 13.7398 10.633C13.8207 10.5742 13.8863 10.4983 13.9314 10.4111C13.9766 10.3239 14 10.2278 14 10.1304V0.890407C13.9999 0.753301 13.9531 0.61998 13.8669 0.510678C13.7807 0.401376 13.6597 0.32206 13.5223 0.284767C12.8236 0.0953453 12.101 -0.000481107 11.375 7.2277e-06C10.0774 -0.00171864 8.79965 0.305665 7.65625 0.894607V11.6088ZM6.34375 0.894607C5.20035 0.305665 3.92259 -0.00171864 2.625 7.2277e-06C1.88125 7.2277e-06 1.16113 0.0991272 0.47775 0.284767C0.340315 0.32206 0.219305 0.401376 0.133084 0.510678C0.0468626 0.61998 0.000137685 0.753301 0 0.890407V10.1304C9.76941e-05 10.2277 0.0236752 10.3237 0.0688838 10.4108C0.114092 10.4979 0.179703 10.5737 0.260571 10.6324C0.341438 10.6911 0.435364 10.731 0.534983 10.749C0.634603 10.7669 0.737207 10.7625 0.83475 10.736C1.41732 10.5786 2.01977 10.4991 2.625 10.5C4.00663 10.5 5.28675 10.9091 6.34375 11.6088V0.894607Z"
										fill="#2D3748"
									/>
								</svg>
								Read Documentation
							</a>
						</div>
					</div>
					<div className="col-lg-6">
						<a target="_blank" href="https://www.youtube.com/watch?v=HC2YnGS8x8I" className="pv-tutorial-image">
							<img src="https://img001.prntscr.com/file/img001/8Y67katwR4-AHQK98gLdDg.png" alt="tutorial-image" />
							<svg
								width={198}
								height={198}
								viewBox="0 0 198 198"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g filter="url(#filter0_d_7413_105214)">
									<circle cx="98.6841" cy="98.9311" r="30.1401" fill="white" />
								</g>
								<path
									d="M93.9072 90.2199C93.6491 90.0572 93.3521 89.9667 93.0471 89.9578C92.7421 89.9489 92.4403 90.0219 92.1731 90.1693C91.906 90.3167 91.6832 90.5331 91.5281 90.7958C91.373 91.0586 91.2912 91.3581 91.2913 91.6632V105.061C91.2912 105.366 91.373 105.666 91.5281 105.929C91.6832 106.192 91.906 106.408 92.1731 106.555C92.4403 106.703 92.7421 106.776 93.0471 106.767C93.3521 106.758 93.6491 106.667 93.9072 106.505L104.535 99.8056C104.779 99.6519 104.98 99.4389 105.119 99.1865C105.258 98.9341 105.331 98.6506 105.331 98.3623C105.331 98.074 105.258 97.7905 105.119 97.5381C104.98 97.2857 104.779 97.0727 104.535 96.919L93.9072 90.2188V90.2199Z"
									fill="#4C6FFF"
								/>
								<defs>
									<filter
										id="filter0_d_7413_105214"
										x="0.302185"
										y="0.549255"
										width="196.764"
										height="196.764"
										filterUnits="userSpaceOnUse"
										colorInterpolationFilters="sRGB"
									>
										<feFlood floodOpacity={0} result="BackgroundImageFix" />
										<feColorMatrix
											in="SourceAlpha"
											type="matrix"
											values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
											result="hardAlpha"
										/>
										<feOffset />
										<feGaussianBlur stdDeviation="34.1209" />
										<feComposite in2="hardAlpha" operator="out" />
										<feColorMatrix
											type="matrix"
											values="0 0 0 0 0.120352 0 0 0 0 0.14638 0 0 0 0 0.771044 0 0 0 0.66 0"
										/>
										<feBlend
											mode="normal"
											in2="BackgroundImageFix"
											result="effect1_dropShadow_7413_105214"
										/>
										<feBlend
											mode="normal"
											in="SourceGraphic"
											in2="effect1_dropShadow_7413_105214"
											result="shape"
										/>
									</filter>
								</defs>
							</svg>
						</a>
					</div>
				</div>

				<div className="pv-module">
					<div className="pv-module-text">
						<h3>Get Updates</h3>
						<p>Get updates. We will send marketing tips and advanced usage of Propovoice</p>
					</div>
					<span className="pv-field-switch-content">
						<label className="pv-field-switch pv-field-switch-big">
							<input type='checkbox'
								id="module-get_update"
								name='activate'
								value='get_update'
								checked={form.deactivate.includes('get_update') ? '' : 'checked'}
								onChange={handleChange}
							/>
							<span className="pv-switch-slider pv-round" />
						</label>
					</span>
				</div>

				<div className="pv-module">
					<div className="pv-module-text">
						<h3>Share Essentials</h3>
						<p>Allow Propovoice to collect non-sensitive diagnostic data and usage information.</p>
					</div>
					<span className="pv-field-switch-content">
						<label className="pv-field-switch pv-field-switch-big">
							<input type='checkbox'
								id="module-share_info"
								name='activate'
								value='share_info'
								checked={form.deactivate.includes('share_info') ? '' : 'checked'}
								onChange={handleChange}
							/>
							<span className="pv-switch-slider pv-round" />
						</label>
					</span>
				</div>

				<div className="pv-button pv-text-right">
					<a className="pv-text-hover-blue" onClick={() => props.handleSkip('tutorial')}>{i18n.skip}</a>
					<button type="submit" className="pv-btn pv-bg-blue pv-bg-hover-blue">{i18n.cont}</button>
				</div>
			</form>
		</div>
	);
}