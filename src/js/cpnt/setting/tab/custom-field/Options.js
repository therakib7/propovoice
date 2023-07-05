import React, { Component } from 'react'

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

    componentDidUpdate() {
        if (!this.state.edit && this.props.data) {
            this.setState({ edit: true, options: this.props.data });
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
        const { options } = this.state;
        const { i18n } = ndpv;
        return (
            <>
                <div className="col-md">
                    <label htmlFor="field-label">{i18n.optList}</label>
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
                    <input
                        type="text"
                        placeholder={i18n.add + " " + this.props.label + " " + i18n.opt}
                        value={this.state.newItem}
                        onChange={this.handleNewItem}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                this.addItem(e)
                            }
                        }}
                    />
                </div>

                {options.length > 0 && <div className="col-md">
                    <label htmlFor="field-default">{i18n.optDef}</label>
                    <select
                        multiple={(this.props.type == 'multi-select')}
                        value={this.state.value}
                        onChange={this.handleValue}
                        ref={(n) => {
                            if (n && (this.props.type == 'multi-select')) {
                                n.style.setProperty("background-image", 'none', "important");
                            } else if (n && (this.props.type == 'select')) {
                                n.style.setProperty("background-image", 'auto', "important");
                            }
                        }}
                    >
                        {(this.props.type == 'select') && <option value=''>{i18n.select}</option>}
                        {options.map((item, i) => {
                            return (
                                <option key={i} value={item}>{item}</option>
                            );
                        })}
                    </select>
                </div>}
            </>
        )
    }
}

export default Options