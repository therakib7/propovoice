import React, { Component } from 'react'

import MultiSelect from 'block/field/multi-select';
class Options extends Component {

    constructor(props) {
        super(props);

        this.state = {
            edit: false,
            itemEdit: false,
            options: [],
            value: '',
            newItem: ''
        };
    }

    componentDidMount() {
        //added this multi place, because not working in invoice single
        this.editData();
    }

    componentDidUpdate() {
        this.editData();
    }

    editData = () => {
        //condition added to stop multi rendering
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, options: this.props.data, value: this.props.value });
        }
    }

    handleChange = (i) => (e) => {
        const { name, value } = e.target;
        let options = this.state.options;
        options[i] = value;

        let optionsDef = this.state.options;
        this.setState({ options: optionsDef }, () => {
            this.handlePros();
        });
    }

    handleNewItem = (e) => {
        this.setState({ newItem: e.target.value });
    }

    handleValue = (e) => {
        this.setState({ value: e.target.value }, () => {
            this.props.changeValueHandler(this.state.value);
        });
    }

    handleMultiSelect = (value) => {
        this.setState({ value }, () => {
            this.props.changeValueHandler(this.state.value);
        });
    }

    addItem = (e) => {
        e.preventDefault();
        let options = this.state.options;
        let value = this.state.newItem
        if (!value) return;
        options.push(value);

        //remove value after add
        let newitems = this.state;
        newitems['newItem'] = '';

        let update = this.state.options;
        // this.setState({ options: update });
        this.setState({ options: update }, () => {
            this.handlePros();
        });
    };

    handlePros = () => {
        this.props.changeHandler(this.state.options);
    };

    deleteHandler = (i) => {
        let options = [...this.state.options];
        options.splice(i, 1);
        this.setState({ options }, () => {
            this.handlePros();
        });
    }

    render = () => {
        const { options, value } = this.state;
        const { i18n } = ndpv;
        const { label, typeLabel } = this.props;
        return (
            <>
                <div className="col-md">
                    <label htmlFor="">{i18n.optList}</label>
                    {options.map((item, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginBottom: '10px'
                                }}
                            >

                                <div style={{ whiteSpace: 'nowrap' }}>
                                    {i18n.opt + ': ' + (i + 1)}
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        name="text"
                                        value={item}
                                        onChange={this.handleChange(i)}
                                    />
                                </div>
                                <div>
                                    <a onClick={() => this.deleteHandler(i)}>
                                        <svg
                                            width={20}
                                            height={20}
                                            viewBox="0 0 16 16"
                                            fill="none"
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
                                    </a>
                                </div>

                            </div>
                        );
                    })}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder={i18n.add + " " + typeLabel + " " + i18n.opt}
                            value={this.state.newItem}
                            onChange={this.handleNewItem}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    this.addItem(e)
                                }
                            }}
                        />
                        <button onClick={this.addItem} className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-hover-shadow">{i18n.add}</button>
                    </div>
                </div>

                {options.length > 0 && <div className="col-md">
                    <label htmlFor="field-default">{i18n.optDef}</label>
                    {(this.props.type == 'select') && <select
                        id="field-default"
                        value={value}
                        onChange={this.handleValue}
                    >
                        <option value=''>{i18n.select}</option>
                        {options.map((item, i) => {
                            return (
                                <option key={i} value={item}>{item}</option>
                            );
                        })}
                    </select>}
                    {(this.props.type == 'multi-select') && <div className="pi-field-multi">
                        <MultiSelect
                            setting
                            onChange={this.handleMultiSelect}
                            options={options}
                            value={value}
                            title={label}
                        />
                    </div>}
                </div>}
            </>
        )
    }
}

export default Options