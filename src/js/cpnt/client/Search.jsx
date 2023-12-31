import React, { Component } from 'react';
import { Search, Filter, Arrow, Cross} from 'block/icon';

export default class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                text: '',
                level: '',
                tag: '',
            },
            searchModal: false,
        };

        this.timeout = 0;
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ form: { ...this.state.form, [name]: value } }, () => {

            if (name == 'text') {
                //search when typing stop
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.props.handleSubmit(this.state.form);
                }, 300);
            } else {
                this.props.handleSubmit(this.state.form);
            }
        });
    }

    render() {
        const { title, showing, showItem, total } = this.props;
        const i18n = ndpv.i18n;
        return (
            <div className="pv-search-bar">
                <div className="pv-search-box pv-medium-search-bar">
                    <Search />
                    <input
                        type="text"
                        className="pv-search-input"
                        placeholder={i18n.search+' '+ title}
                        name="text"
                        value={this.state.form.text}
                        onChange={this.handleChange}
                    />
                </div>
                {false && <div className="pv-search-btn">
                    <button className={this.state.searchModal ? 'pv-active' : ''} onClick={() => this.setState(prevState => ({ searchModal: !prevState.searchModal }))}>
                        <Filter />
                    </button>

                    {this.state.searchModal && <div className="pv-search-form">
                        <ul>
                            <li>
                                <Arrow />
                                <select name="" id="">
                                    <option value="">{i18n.lead} {i18n.level}</option>
                                </select>
                            </li>
                            <li>
                                <span onClick={() => this.setState({ searchModal: false })}>
                                    <Cross size='small' />
                                </span>
                            </li>
                        </ul>
                    </div>}
                </div>}
                <div className="pv-total-list">
                    <p>
                        {i18n.show} <select onChange={showItem} >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="50">50</option>
                            <option value="99">99</option>
                        </select>
                        {title} {i18n.from} <span>{total}</span>
                    </p>
                </div>
            </div>
        );
    }
} 