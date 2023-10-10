import React, { Component } from "react";
import { toast } from "react-toastify";
import api from "api";
import WithRouter from "hoc/Router";
import Upload from "block/field/upload";
import { Add } from "block/icon";
import Currency from "block/field/currency";
import Taxonomy from "block/field/taxonomy";
import Contact from "block/field/contact";
import CustomField from "block/field/custom-field";
import { sprintf } from "sprintf-js";
import { checkRoute, mergeObjects } from "helper";
import { Text, Address } from 'block/form/input';
import { FormWrapper, FormContent } from "block/form";

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            title: "",
            first_name: "",
            org_name: "",
            person_id: null,
            org_id: null,
            email: "",
            mobile: "",
            lead_id: "",
            stage_id: "",
            budget: "",
            currency: "USD",
            probability: 50,
            tags: [],
            desc: "",
            country: '',
            region: '',
            address: '',
            city: '',
            zip: '',
            img: "",
            date: false,
        };

        if (this.props.parentData) {
            this.fromClient = true;
            const { person, org } = this.props.parentData;
            const contactInfo = mergeObjects(person, org);

            if (Object.keys(contactInfo).length > 0) {
                this.initialState.first_name = contactInfo.first_name;
                this.initialState.email = contactInfo.email;
                this.initialState.mobile = contactInfo.mobile;
                this.initialState.org_name = contactInfo.name;
            }
        }

        this.state = {
            submitPreloader: false,
            form: this.initialState,
            custom_field: false,
            stages: [],
            tags: [],
        };

        this.selectCountry = this.selectCountry.bind(this);
    }

    componentDidMount() {
        //custom fields
        if (this.props.custom_field) {
            let obj = {};
            this.props.custom_field.map((item, i) => {
                obj[item.id] = "";
            });
            const merge_obj = { ...this.state.form, ...obj };
            this.setState({ form: merge_obj, custom_field: true });
        }

        //added this multi place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multi rendering
        if (this.props.modalType == "edit" || this.props.modalType == "move") {
            if (this.state.form.id != this.props.data.id) {
                let form = { ...this.props.data };
                if (this.props.modalType == "move") {
                    form.lead_id = form.id;
                    form.probability = 50;
                }

                form.first_name = form.person ? form.person.first_name : "";
                if (form.person) {
                    form.person_id = form.person ? form.person.id : null;
                    form.email = form.person ? form.person.email : "";
                    form.mobile = form.person ? form.person.mobile : "";
                    form.web = form.person ? form.person.web : "";
                    form.country = form.person ? form.person.country : "";
                    form.region = form.person ? form.person.region : "";
                    form.address = form.person ? form.person.address : "";
                    form.img = form.person ? form.person.img : "";
                } else {
                    form.email = form.org ? form.org.email : "";
                    form.mobile = form.org ? form.org.mobile : "";
                    form.web = form.org ? form.org.web : "";
                    form.country = form.org ? form.org.country : "";
                    form.region = form.org ? form.org.region : "";
                    form.address = form.org ? form.org.address : "";
                    form.img = form.org ? form.org.img : "";
                }
                form.org_name = form.org ? form.org.name : "";

                if (form.org) {
                    form.org_id = form.org ? form.org.id : null;
                }

                this.setState({ form });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }
        }
    };

    handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };

    handleCFChange = (e) => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };

    currencyChange = (val) => {
        this.setState({ form: { ...this.state.form, ["currency"]: val } });
    };

    handleStageChange = (val) => {
        this.setState({ form: { ...this.state.form, ["stage_id"]: val } });
    };

    handleTagChange = (val) => {
        this.setState({ form: { ...this.state.form, ["tags"]: val } });
    };

    selectCountry(val) {
        this.setState({ form: { ...this.state.form, ["country"]: val } });
    }

    selectRegion(val) {
        this.setState({ form: { ...this.state.form, ["region"]: val } });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let form = { ...this.state.form };

        if (form.stage_id) {
            form.stage_id = form.stage_id.id;
        }

        if (!form.stage_id) {
            toast.error(ndpv.i18n.stage + " " + ndpv.i18n.isReq);
            return;
        }

        if (form.img) {
            form.img = form.img.id;
        }

        if (form.tags.length) {
            let finalArray = form.tags.map(function (obj) {
                return obj.id;
            });
            form.tags = finalArray;
        }

        if (this.props.reload) {
            this.setState({ submitPreloader: true });
            if (this.props.modalType == "move") {
                api.add("deals", form).then((resp) => {
                    this.setState({ submitPreloader: false });
                    if (resp.data.success) {
                        toast.success(ndpv.i18n.aDelM);
                        let id = resp.data.data;
                        this.props.close();
                        this.props.navigate(`/deal/${id}`);
                        checkRoute();
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value) {
                            toast.error(value);
                        });
                    }
                });
            } else {
                api.edit("deals", form.id, form).then((resp) => {
                    this.setState({ submitPreloader: false });
                    if (resp.data.success) {
                        this.props.close();
                        toast.success(ndpv.i18n.aUpd);
                        this.props.reload();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                });
            }
        } else {
            let args = null;
            if (!this.props.boardView) {
                args = { table_view: true };
            }
            this.props.handleSubmit(form, null, args);
        }
        // this.setState({ form: this.initialState });
    };

    handleContactChange = (val, type) => {
        let form = { ...this.state.form };
        if (type == "person") {
            form.first_name = val;
        } else {
            form.org_name = val;
        }
        this.setState({ form });
    };

    handleContactSelect = (val, type) => {
        let form = { ...this.state.form };
        if (!val) {
            if (type == "person") {
                form.person_id = null;
            } else {
                form.org_id = null;
            }
            this.setState({ form });
            return;
        }

        if (type == "person") {
            form.first_name = val.first_name;
            form.person_id = val ? val.id : null;
            form.email = val ? val.email : "";
            form.mobile = val ? val.mobile : "";
            form.web = val ? val.web : "";
            form.country = val ? val.country : "";
            form.region = val ? val.region : "";
            form.address = val ? val.address : "";
            form.img = val ? val.img : "";
        } else {
            form.org_name = val.name;
            form.org_id = val ? val.id : null;
        }

        this.setState({ form });
    };

    handleImgChange = (data, type = null) => {
        let form = { ...this.state.form };
        form.img = data;
        this.setState({ form });
    };

    render() {
        const i18n = ndpv.i18n;
        const form = this.state.form;
        const probabilityPercent = (form.probability / 100) * 100;

        let title = "";
        const modalType = this.props.modalType;
        if (modalType == "new") {
            title = i18n.new;
        } else if (modalType == "edit") {
            title = i18n.edit;
        } else if (modalType == "move") {
            title = i18n.moveto;
        }

        const submitPreloader = this.props.reload
            ? this.state.submitPreloader
            : this.props.submitPreloader;

        return (
            <div className="pv-overlay pv-show">
                <div className="pv-modal-content">
                    <div className="pv-modal-header pv-gradient">
                        <span className="pv-close" onClick={() => this.props.close()}>
                            <Add />
                        </span>
                        <h2 className="pv-modal-title">
                            {title} {i18n.deal}
                        </h2>
                        <p>{sprintf(i18n.formDesc, title, i18n.deal)}</p>
                    </div>

                    <FormWrapper
                        submitPreloader={submitPreloader}
                        submitHandler={this.handleSubmit}
                        close={this.props.close}
                    >
                        <FormContent formStyleClass="pv-form-style-one">
                            <div className="row">
                                <Text
                                    label={i18n.title}
                                    id="field-title"
                                    type="text"
                                    name="title"
                                    wrapperClassName="col-md"
                                    value={form.title}
                                    onChange={this.handleChange}
                                    validation={{ required: { value: true } }}
                                />
                            </div>

                            {/* {!this.props.reload && <>  */}
                            <Contact
                                first_name={form.first_name}
                                nameLabel={i18n.ct_name}
                                org_name={form.org_name}
                                fromClient={this.fromClient}
                                onChange={this.handleContactChange}
                                onSelect={this.handleContactSelect}
                            />

                            <div className="row">
                                <Text
                                    label={i18n.email}
                                    id="form-email"
                                    type="email"
                                    name="email"
                                    wrapperClassName="col-lg"
                                    disabled={this.fromClient}
                                    value={form.email}
                                    onChange={this.handleChange}
                                    validation={{
                                        required: { value: true },
                                        email: { value: true },
                                    }}
                                />

                                <div className="col-lg">
                                    <label htmlFor="form-mobile">{i18n.mob}</label>

                                    <input
                                        id="form-mobile"
                                        type="text"
                                        name="mobile"
                                        value={form.mobile}
                                        disabled={this.fromClient}
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
                                    <label htmlFor="field-stage_id">{i18n.stage}</label>
                                    <Taxonomy
                                        selectedFirst
                                        modalType={modalType}
                                        data={form.stage_id}
                                        taxonomy="deal_stage"
                                        title={i18n.stage}
                                        onChange={this.handleStageChange}
                                        formTag={false}
                                        color
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-budget">{i18n.budget}</label>

                                    <input
                                        id="field-budget"
                                        type="number"
                                        name="budget"
                                        value={form.budget}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-md">
                                    <label htmlFor="field-currency">{i18n.cur}</label>
                                    <Currency
                                        key={form.currency}
                                        onChange={this.currencyChange}
                                        value={form.currency}
                                        form
                                    />
                                </div>
                            </div>

                            {!wage.length && (
                                <div className="row">
                                    <div className="col-md">
                                        <label htmlFor="field-probability">
                                            {i18n.proba}{" "}
                                            <span style={{ position: "absolute", right: "15px" }}>
                                                ({form.probability}%)
                                            </span>
                                        </label>

                                        <input
                                            id="field-probability"
                                            type="range"
                                            min="1"
                                            max="100"
                                            name="probability"
                                            value={form.probability}
                                            style={{
                                                background: `linear-gradient(to right, #3264fe ${probabilityPercent}%, #ccd6ff ${probabilityPercent}%)`,
                                            }}
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-tags">{i18n.tag}</label>

                                    <div className="pi-field-multi">
                                        <Taxonomy
                                            onChange={this.handleTagChange}
                                            data={form.tags}
                                            taxonomy="tag"
                                            title={i18n.tag}
                                            formTag={false}
                                            multi
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="field-desc">{i18n.desc}</label>
                                    <textarea
                                        id="form-desc"
                                        rows={2}
                                        name="desc"
                                        value={form.desc}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="field-img">{i18n.ct_img}</label>
                                    <Upload
                                        data={form.img}
                                        changeHandler={this.handleImgChange}
                                    />
                                </div>
                            </div>

                            {this.state.custom_field && (
                                <CustomField
                                    mod="deal"
                                    type={this.props.modalType}
                                    form={form}
                                    onChange={this.handleCFChange}
                                />
                            )}
                        </FormContent>
                    </FormWrapper>
                </div>
            </div>
        );
    }
}

export default WithRouter(Form);
