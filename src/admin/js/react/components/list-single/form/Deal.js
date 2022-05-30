import React, { Component } from 'react';
import { toast } from 'react-toastify';
import {
    // useLocation,
    useNavigate
    // useParams,
} from "react-router-dom";

import Select from 'react-select';
import ApiTaxonomy from 'api/taxonomy';
import Api from 'api/deal';

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            id: null,
            lead_id: null,
            title: '',
            stage_id: '',
            contact_id: 770,
            contact_type: 'people', //org/people
            budget: '',
            currency: 'USD',
            provability: 50,
            tags: [],
            note: '',
            date: false
        };

        this.state = {
            form: this.initialState,
            stages: [],
            tags: [],
        };
    }

    handleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({ form: { ...this.state.form, [name]: value } });
    }

    handleStageChange = val => {
        this.setState({ form: { ...this.state.form, ['stage_id']: val } });
    }

    handleTagChange = val => {
        this.setState({ form: { ...this.state.form, ['tags']: val } });
    }

    componentDidMount() {
        // console.log();
        ApiTaxonomy.getAll('taxonomy=deal_stage_tag')
            .then(resp => {
                if (resp.data.success) {
                    if (this.state.form.stage_id) {
                        this.setState({
                            stages: resp.data.data.stages,
                            tags: resp.data.data.tags,
                        });
                    } else {
                        let form = { ...this.state.form }
                        form.stage_id = resp.data.data.stages[0];
                        this.setState({
                            form,
                            stages: resp.data.data.stages,
                            tags: resp.data.data.tags,
                        });
                    }
                }
            });

        //added this multiple place, because not working in invoice single
        let lead_id = this.props.data.id;
        this.setState({ form: { ...this.state.form, ['lead_id']: lead_id } });
        // this.editData();
    }

    componentDidUpdate() {
        // this.editData();
    }

    editData = () => {
        //condition added to stop multiple rendering 
        if (this.props.modalType == 'edit') {
            if (this.state.form.id != this.props.data.id) {
                this.setState({ form: this.props.data });
            }
        } else {
            if (this.state.form.id != null) {
                this.setState({ form: this.initialState });
            }

            /* else {
                if ( this.props.data && ! this.state.form.stage_id && this.props.data.hasOwnProperty('label') ) { // new deal from stage
                    let form = {...this.initialState}
                    form.stage_id = this.props.data;
                    this.setState({ form });
                }
            }  */
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.handleSubmit(this.state.form);
        //this.setState({ form: this.initialState });
    }

    handleSubmit = e => {
        e.preventDefault();
        let newDeal = { ...this.state.form }
        if (newDeal.stage_id) {
            newDeal.stage_id = newDeal.stage_id.id;
        }

        if (newDeal.tags.length) {
            let finalArray = newDeal.tags.map(function (obj) {
                return obj.id;
            });
            newDeal.tags = finalArray;
        }
 
        Api.create(newDeal)
            .then(resp => {
                if (resp.data.success) { 
                    toast.success('Sucessfully moved to deal');
                    let id = resp.data.data;
                    this.props.router.navigate(`/deal/single/${id}`, { replace: true }); 
                } else {
                    resp.data.data.forEach(function (value, index, array) {
                        toast.error(value);
                    });
                }
            }) 
    }

    render() {
        const stageList = this.state.stages;
        const tagList = this.state.tags;
        const form = this.state.form;
        const provabilityPercent = (form.provability / 100) * 100; 

        return (
            <div className="pi-overlay pi-show">
                <div className="pi-modal-content">

                    <div className="pi-modal-header pi-gradient">
                        <span className="pi-close" onClick={() => this.props.close()}>
                            <svg
                                width={25}
                                height={25}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.5 3.5L3.5 12.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.5 12.5L3.5 3.5"
                                    stroke="#718096"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </span>
                        <h2 className="pi-modal-title">Add to deal</h2>
                        <p>
                            Move this lead into deal
                        </p>
                    </div> 

                    <div className="pi-content">
                        <form onSubmit={this.handleSubmit} className="pi-form-style-one">
                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-title">
                                        Title
                                    </label>

                                    <input
                                        id="field-title"
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label
                                        htmlFor="field-stage_id">
                                        Stage
                                    </label>

                                    <Select
                                        value={form.stage_id}
                                        onChange={this.handleStageChange}
                                        getOptionValue={(stageList) => stageList.id}
                                        getOptionLabel={(stageList) => stageList.label}
                                        options={stageList}
                                    />
                                </div> 
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label
                                        htmlFor="field-budget">
                                        Budget
                                    </label>

                                    <input
                                        id="field-budget"
                                        type="text"
                                        name="budget"
                                        value={form.budget}
                                        onChange={this.handleChange}
                                    />
                                </div>

                                <div className="col-md">
                                    <label
                                        htmlFor="field-currency">
                                        Currency
                                    </label>

                                    <input
                                        id="field-currency"
                                        type="text"
                                        readOnly
                                        name="currency"
                                        value={form.currency}
                                        onChange={this.handleChange}
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label
                                        htmlFor="field-provability">
                                        Provability <span className='pi-float-right'>({form.provability}%)</span>
                                    </label>

                                    <input
                                        id="field-provability"
                                        type="range"
                                        min="1" max="100"
                                        name="provability"
                                        value={form.provability}
                                        style={{ background: `linear-gradient(to right, #3264fe ${provabilityPercent}%, #ccd6ff ${provabilityPercent}%)` }}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md">
                                    <label htmlFor="field-tags">
                                        Tags
                                    </label>
                                    <Select
                                        value={form.tags}
                                        onChange={this.handleTagChange}
                                        getOptionValue={(tagList) => tagList.id}
                                        getOptionLabel={(tagList) => tagList.label}
                                        options={tagList}
                                        isMulti
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="field-note">
                                        Note
                                    </label>

                                    <textarea
                                        id="form-note"
                                        rows={2}
                                        name="note"
                                        value={form.note}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <button className="pi-btn pi-bg-blue pi-bg-hover-blue pi-m-auto">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        // let location = useLocation();
        let navigate = useNavigate();
        // let params = useParams();
        return (
            <Component
                {...props}
                router={{ navigate }}
            />
        );
    } 
    return ComponentWithRouterProp;
}

export default withRouter(Form); 
// export default Payment; 

// export default Form;
