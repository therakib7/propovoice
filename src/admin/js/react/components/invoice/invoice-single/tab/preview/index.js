import React, { Component } from 'react'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Template from 'inv-template';

import Send from './Send'; 

export default class Preview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formModal: false,
        };
    }

    closeForm = () => {
        this.setState({ formModal: false });
    };

    exportPdf = () => {

        html2canvas(document.querySelector(".pi-inv")).then(canvas => {
           //document.body.appendChild(canvas);  // if you want see your screenshot in body.
           const imgData = canvas.toDataURL('image/png');
           const pdf = new jsPDF();
           pdf.addImage(imgData, 'PNG', 0, 0);
           pdf.save("download.pdf"); 
       });
   
    }

    printPdf = () => {

        html2canvas(document.querySelector("#ncpi-invoice-download")).then(canvas => { 
            const imgData = canvas.toDataURL('image/png'); 
            let pri = document.getElementById("ncpi-invoice-print").contentWindow; 
            pri.document.open();
            pri.document.write('sdfds');
            // pri.document.write('<img src="'+imgData+'" />');
            pri.document.close();
            pri.focus();
 
            pri.print();
       });
   
    }

    render() {
        const { id } = this.props.data.invoice.template;
        return (
            <div id="pi-share" className="city">
                <iframe id="ncpi-invoice-print" ></iframe>
                {/* <iframe id="ncpi-invoice-print" style={{height: 0, width: 0, position: 'absolute'}}></iframe> */}
                <div className='row justify-content-md-center'> 
                    <div className='col-md-8' style={{margin: '50px 0 30px 0'}}> 
                     
                        <div className='row'>
                            
                            <div className='col-6'>
                                <button 
                                className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white" 
                                style={{color: '#000'}}
                                >
                                    <svg
                                    width={12}
                                    height={12}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"  
                                    >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
                                        fill="#18181B"
                                    />
                                    </svg>
                                    Edit Invoice
                                </button>	
                            </div>

                            <div className='col-6' style={{textAlign: 'right'}}>
                                <button 
                                className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white" 
                                style={{color: '#000'}}
                                onClick={() => this.exportPdf() }
                                >
                                    <svg
                                    width={12}
                                    height={12}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"  
                                    >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
                                        fill="#18181B"
                                    />
                                    </svg>
                                    Download
                                </button> 

                                <button 
                                className="pi-btn pi-bg-air-white pi-bg-hover-blue pi-hover-color-white" 
                                style={{color: '#000'}}
                                onClick={() => this.printPdf() }
                                >
                                    <svg
                                    width={12}
                                    height={12}
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"  
                                    >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
                                        fill="#18181B"
                                    />
                                    </svg>
                                    Print
                                </button>
                            </div>
                        </div>

                        

                        {/* <button
                            onClick={() => this.setState({ formModal: true })} >
                            Send Mail
                        </button> */}

                        {this.state.formModal &&
                            <Send
                                show={this.state.formModal}
                                data={this.props.data}
                                close={this.closeForm}
                            />}
                    </div>  
                    
                    <div className='col-md-8'> 
                        <Template {...this.props} />
                    </div> 
                </div>  
            </div>
        );
    }
} 