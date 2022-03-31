import React, { Component } from 'react';
import { toast } from 'react-toastify';
 
import Api from 'api/dashboard'; 

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            preloader: true, 
            summary: {
                total_client: 0,
                total_estimate: 0,
                accepted_estimate: 0, 
                total_invoice: 0,
                paid_invoice: 0 
            }, 
        };
    } 

    componentDidMount() {
        this.getLists();
    }

    getLists = (searchArgs = null) => {

        let args = {
            page: 1,
            per_page: 10
        }

        if (searchArgs) {
            //Filter all falsy values ( "", 0, false, null, undefined )
            searchArgs = Object.entries(searchArgs).reduce((a, [k, v]) => (v ? (a[k] = v, a) : a), {})
            args = { ...args, ...searchArgs }
        }

        let params = new URLSearchParams(args).toString();

        Api.getAll(params)
            .then(resp => { 
                this.setState({ summary: resp.data.data.summary });
                this.setState({ preloader: false }); 
            })
    }; 

    render() { 
        const { total_client, total_estimate, accepted_estimate, total_invoice, paid_invoice } = this.state.summary;
        return (
            <div className="ncpi-components"> 

                <h1 className="">Dashboard</h1> 
                 
                <div className="pi-cards">
                    <div className="row">
                        <div className="col">
                            <div className="pi-bg-air-white">
                            <span className="">Total Client</span>
                            <h4 className="pi-color-blue">{total_client}</h4>
                            </div>
                        </div>

                        <div className="col">
                            <div className="pi-bg-air-white">
                            <span className="">Total Estimate</span>
                            <h4 className="pi-color-blue">{total_estimate}</h4>
                            </div>
                        </div>

                        <div className="col">
                            <div className="pi-bg-air-white">
                            <span className="">Accepted Estimate</span>
                            <h4 className="pi-color-blue">{accepted_estimate}</h4>
                            </div>
                        </div>

                        <div className="col">
                            <div className="pi-bg-air-white">
                            <span className="">Total Invoice</span>
                            <h4 className="pi-color-blue">{total_invoice}</h4>
                            </div>
                        </div>

                        <div className="col">
                            <div className="pi-bg-air-white">
                            <span className="">Paid Invoice</span>
                            <h4 className="pi-color-blue">{paid_invoice}</h4>
                            </div>
                        </div>
                    </div>
                </div>  

            </div>
        );
    }
} 