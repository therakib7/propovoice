import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Upload from 'block/field/upload';
import api from 'api';
import { Text, Address } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

export default class Business extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      id: null,
      name: '',
      email: '',
      web: '',
      mobile: '',
      country: '',
      region: '',
      address: '',
      city: '',
      zip: '',
      logo: null,
      default: true,
      date: false
    };

    this.state = {
      submitPreloader: false,
      form: this.initialState
    };

    this.selectCountry = this.selectCountry.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    this.props.getAll('businesses', 'default=1').then(resp => {
      let businessData = resp.data.data.result;
      if (businessData.length) {
        this.setState({ form: businessData[0] });
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (ndpv.isDemo) { toast.error(ndpv.demoMsg); return; }

    let form = { ...this.state.form }

    this.setState({ submitPreloader: true });

    if (!form.id) {
      api.add('businesses', form).then(resp => {
        this.setState({ submitPreloader: false });
        if (resp.data.success) {
          toast.success(ndpv.i18n.aAdd);
        } else {
          resp.data.data.forEach(function (value) {
            toast.error(value);
          });
        }
      })
    } else {
      api.edit('businesses', form.id, form).then(resp => {
        this.setState({ submitPreloader: false });
        if (resp.data.success) {
          toast.success(ndpv.i18n.aUpd);
        } else {
          resp.data.data.forEach(function (value) {
            toast.error(value);
          });
        }
      })
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ form: { ...this.state.form, [name]: value } });
  }

  selectCountry(val) {
    this.setState({ form: { ...this.state.form, ['country']: val } });
  }

  toggleChange = () => {
    let value = !this.state.form.default;
    this.setState({ form: { ...this.state.form, ['default']: value } });
  }

  handleLogoChange = (data, type = null) => {
    let form = { ...this.state.form }
    form.logo = data;
    this.setState({ form })
  }

  render() {
    const form = this.state.form;
    const i18n = ndpv.i18n;
    const submitPreloader = this.state.submitPreloader;
    return (
      <FormWrapper submitPreloader={submitPreloader} submitHandler={this.handleSubmit} close={this.props.close}>
        <FormContent formStyleClass="pv-form-style-one">
          <div className="row">

            <Text
              label={i18n.name}
              id="field-name"
              type="text"
              name="name"
              value={form.name}
              wrapperClassName='col-md'
              onChange={this.handleChange}
              validation={{ required: { value: true } }}
            />

          </div>

          <div className="row">
            <Text
              label={i18n.email}
              id="field-email"
              type="email"
              name="email"
              value={form.email}
              wrapperClassName='col-md'
              onChange={this.handleChange}
              validation={{ required: { value: true }, email: { value: true } }}
            />

            <div className="col-md">
              <label htmlFor="field-web">
                {i18n.web}
              </label>

              <input
                id="field-web"
                type="text"
                name="web"
                value={form.web}
                onChange={this.handleChange}
              />
            </div>

          </div>

          <div className="row">
            <div className="col-md">
              <label htmlFor="field-mobile">
                {i18n.mob}
              </label>

              <input
                id="field-mobile"
                type="text"
                name="mobile"
                value={form.mobile}
                onChange={this.handleChange}
              />
            </div>
          </div>

          <Address
            data={form}
            selectCountry={this.selectCountry}
            handleChange={this.handleChange}
          />

          <div className="row">
            <div className="col-md">
              <label htmlFor="field-logo">{i18n.upload} {i18n.logo}</label>
              <Upload label={i18n.logo} library={false} data={form.logo} changeHandler={this.handleLogoChange} />
            </div>
          </div>

        </FormContent>
      </FormWrapper>
    );
  }
}
