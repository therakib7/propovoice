import React, { useState, useEffect } from 'react';
import { Add } from 'block/icon';
import { sprintf } from 'sprintf-js';
import { toast } from 'react-toastify';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Upload from 'block/field/upload';
import Currency from 'block/field/currency';
import Taxonomy from 'block/field/taxonomy';
import Contact from 'block/field/contact';
import CustomField from 'block/field/custom-field';
import api from 'api';
import { TextInput } from 'block/form/input';
import { FormWrapper, FormContent } from 'block/form';

const Form = (props) => {
    const initialState = {
        id: null,
        first_name: '',
        org_name: '',
        person_id: null,
        org_id: null,
        email: '',
        mobile: '',
        web: '',
        source_id: '', //tax
        level_id: '', //tax
        tags: [], //tax
        budget: '',
        currency: 'USD',
        desc: '',
        note: '',
        country: '',
        region: '',
        address: '',
        img: '',
        date: false,
    };

    const [form, setForm] = useState(initialState);
    const [custom_field, setCustomField] = useState(false);
    const [levels, setLevels] = useState([]);
    const [tags, setTags] = useState([]);
    const [personList, setPersonList] = useState([]);
    const [orgList, setOrgList] = useState([]);

    useEffect(() => {
        // custom fields
        if (props.custom_field) {
            let obj = {};
            props.custom_field.forEach((item) => {
                obj[item.slug] = '';
            });
            const merge_obj = { ...form, ...obj };
            setForm(merge_obj);
            setCustomField(true);
        }

        // find person and organization lists
        let args = {
            page: 1,
            per_page: 10,
        };
        let params = new URLSearchParams(args).toString();

        api.get('persons', params).then((resp) => {
            if (resp.data.success) {
                let personList = resp.data.data.result;
                setPersonList(personList);
            }
        });

        api.get('organizations', params).then((resp) => {
            if (resp.data.success) {
                let orgList = resp.data.data.result;
                setOrgList(orgList);
            }
        });

        // added multi place, because not working in invoice single
        editData();
    }, []);

    useEffect(() => {
        editData();
    }, [props.modalType, form.id]);

    const handleChange = (e, type) => {
        const { name, value } = e.target;
        if (type === 'contact') {
            let contact = { ...form.contact, [name]: value };
            let updatedForm = { ...form, contact };
            setForm(updatedForm);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleCFChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const editData = () => {
        // condition added to stop multi rendering
        if (props.modalType === 'edit') {
            if (form.id !== props.data.id) {
                let updatedForm = { ...props.data };
                updatedForm.first_name = updatedForm.person ? updatedForm.person.first_name : '';
                if (updatedForm.person) {
                    updatedForm.person_id = updatedForm.person ? updatedForm.person.id : null;
                    updatedForm.email = updatedForm.person ? updatedForm.person.email : '';
                    updatedForm.mobile = updatedForm.person ? updatedForm.person.mobile : '';
                    updatedForm.web = updatedForm.person ? updatedForm.person.web : '';
                    updatedForm.country = updatedForm.person ? updatedForm.person.country : '';
                    updatedForm.region = updatedForm.person ? updatedForm.person.region : '';
                    updatedForm.address = updatedForm.person ? updatedForm.person.address : '';
                    updatedForm.img = updatedForm.person ? updatedForm.person.img : '';
                } else {
                    updatedForm.email = updatedForm.org ? updatedForm.org.email : '';
                    updatedForm.mobile = updatedForm.org ? updatedForm.org.mobile : '';
                    updatedForm.web = updatedForm.org ? updatedForm.org.web : '';
                    updatedForm.country = updatedForm.org ? updatedForm.org.country : '';
                    updatedForm.region = updatedForm.org ? updatedForm.org.region : '';
                    updatedForm.address = updatedForm.org ? updatedForm.org.address : '';
                    updatedForm.img = updatedForm.org ? updatedForm.org.img : '';
                }
                updatedForm.org_name = updatedForm.org ? updatedForm.org.name : '';

                if (updatedForm.org) {
                    updatedForm.org_id = updatedForm.org ? updatedForm.org.id : null;
                }
                setForm(updatedForm);
            }
        } else {
            if (form.id !== null) {
                setForm(initialState);
            }
        }
    };

    const currencyChange = (val) => {
        setForm({ ...form, currency: val });
    };

    const handleLevelChange = (val) => {
        setForm({ ...form, level_id: val });
    };

    const handleTagChange = (val) => {
        setForm({ ...form, tags: val });
    };

    const selectCountry = (val) => {
        setForm({ ...form, country: val });
    };

    const selectRegion = (val) => {
        setForm({ ...form, region: val });
    };

    const onSubmit = (e) => {
        let updatedForm = { ...form };
        if (updatedForm.level_id) {
            updatedForm.level_id = updatedForm.level_id.id;
        }

        if (updatedForm.img) {
            updatedForm.img = updatedForm.img.id;
        }

        if (updatedForm.tags.length) {
            let finalArray = updatedForm.tags.map(function (obj) {
                return obj.id;
            });
            updatedForm.tags = finalArray;
        }

        delete updatedForm.person;
        delete updatedForm.org;

        if (props.reload) {
            api.edit('leads', updatedForm.id, updatedForm);
            props.close();
            toast.success(ndpv.i18n.aUpd);
            props.reload();
        } else {
            props.handleSubmit(updatedForm);
        }
    };

    const handleContactChange = (val, type) => {
        let updatedForm = { ...form };
        if (type === 'person') {
            updatedForm.first_name = val;
        } else {
            updatedForm.org_name = val;
        }
        setForm(updatedForm);
    };

    const handleContactSelect = (val, type) => {
        let updatedForm = { ...form };
        if (!val) {
            if (type === 'person') {
                updatedForm.person_id = null;
            } else {
                updatedForm.org_id = null;
            }
            setForm(updatedForm);
            return;
        }

        if (type === 'person') {
            updatedForm.first_name = val.first_name;
            updatedForm.person_id = val ? val.id : null;
            updatedForm.email = val ? val.email : '';
            updatedForm.mobile = val ? val.mobile : '';
            updatedForm.web = val ? val.web : '';
            updatedForm.country = val ? val.country : '';
            updatedForm.region = val ? val.region : '';
            updatedForm.address = val ? val.address : '';
            updatedForm.img = val ? val.img : '';
        } else {
            updatedForm.org_name = val.name;
            updatedForm.org_id = val ? val.id : null;
            if (!updatedForm.first_name) {
                updatedForm.email = val ? val.email : '';
                updatedForm.mobile = val ? val.mobile : '';
                updatedForm.web = val ? val.web : '';
                updatedForm.country = val ? val.country : '';
                updatedForm.region = val ? val.region : '';
                updatedForm.address = val ? val.address : '';
                updatedForm.img = val ? val.img : '';
            }
        }

        setForm(updatedForm);
    };

    const handleImgChange = (data, type = null) => {
        let updatedForm = { ...form };
        updatedForm.img = data;
        setForm(updatedForm);
    };

    const i18n = ndpv.i18n;

    const emailInput = {
        label: ndpv.i18n.email,
        type: 'email',
        id: 'form-email',
        name: 'email',
        value: form.email,
        wrapperClassName: 'col-lg',
        onChange: handleChange,
        validation: {
            required: {
                value: true,
                message: "Email Required"
            },
        },
    };

    const modalType = props.modalType === 'new' ? i18n.add + ' ' + i18n.new : i18n.edit;

    return (
        <div className="pv-overlay pv-show">
            <div className="pv-modal-content">

                <div className="pv-modal-header pv-gradient">
                    <span className="pv-close" onClick={() => props.close()}>
                        <Add />
                    </span>
                    <h2 className="pv-modal-title">{modalType} {i18n.lead}</h2>
                    <p>{sprintf(i18n.formDesc, modalType, i18n.lead)}</p>
                </div>

                <FormWrapper submitHandler={onSubmit} close={props.close}>
                    <FormContent formStyleClass="pv-form-style-one">

                        <Contact
                            first_name={form.first_name}
                            org_name={form.org_name}
                            onChange={handleContactChange}
                            onSelect={handleContactSelect}
                        />

                        <div className="row">
                            <TextInput  {...emailInput} />

                            <div className="col-lg">
                                <label htmlFor="form-mobile">
                                    {i18n.mob}
                                </label>

                                <input
                                    id="form-mobile"
                                    type="text"
                                    name="mobile"
                                    value={form.mobile}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor="form-country">
                                    {i18n.country}
                                </label>

                                <CountryDropdown
                                    value={form.country}
                                    valueType='short'
                                    onChange={(val) => selectCountry(val)}
                                />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="form-region">
                                    {i18n.region}
                                </label>

                                <RegionDropdown
                                    country={form.country}
                                    countryValueType='short'
                                    value={form.region}
                                    onChange={(val) => selectRegion(val)}
                                />
                            </div>

                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="form-address">
                                    {i18n.addr}
                                </label>

                                <input
                                    id="form-address"
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-budget">
                                    {i18n.budget}
                                </label>

                                <input
                                    id="field-budget"
                                    type="number"
                                    name="budget"
                                    value={form.budget}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-md">
                                <label htmlFor="field-currency">
                                    {i18n.cur}
                                </label>
                                <Currency key={form.currency} onChange={currencyChange} value={form.currency} form />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md">
                                <label htmlFor="field-level_id">
                                    {i18n.level}
                                </label>
                                <Taxonomy
                                    data={form.level_id}
                                    // list={levelList}
                                    taxonomy='lead_level'
                                    title={i18n.level}
                                    onChange={handleLevelChange}
                                    color
                                />
                            </div>

                            <div className="col-md">
                                <label htmlFor="field-tags">
                                    {i18n.tag}
                                </label>

                                <div className="pi-field-multi">
                                    <Taxonomy
                                        onChange={handleTagChange}
                                        data={form.tags}
                                        taxonomy='tag'
                                        title={i18n.tag}
                                        multi
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="form-desc">
                                    {i18n.desc}
                                </label>

                                <textarea
                                    id="form-desc"
                                    type="text"
                                    name="desc"
                                    value={form.desc}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="form-note">
                                    {i18n.note}
                                </label>

                                <textarea
                                    id="form-note"
                                    type="text"
                                    name="note"
                                    value={form.note}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="field-img">
                                    {i18n.img}
                                </label>
                                <Upload data={form.img} changeHandler={handleImgChange} />
                            </div>
                        </div>

                        {custom_field && <CustomField mod='lead' type={props.modalType} form={form} onChange={handleCFChange} />}
                    </FormContent>
                </FormWrapper>
            </div>
        </div>
    );
}
export default Form;
