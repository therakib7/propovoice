import { useEffect } from "react";
import Breadcrumb from 'block/breadcrumb';
import Preloader from 'block/preloader/table';

import Pipeline from './Pipeline';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Deal = (props) => {
    const { title, lists } = props.state; 
    
    useEffect(() => {
        props.dealLoad(true); 
        return () => props.dealLoad(false);
    }, []);

    return (
        <div className="ncpi-components">
            <Breadcrumb title={title + ' Pipeline'} /> 

            {/* {props.state.empty && <Empty title={title} searchVal={searchVal} clickHandler={() => props.openForm('new')} />}  */}

            {props.state.formModal && <Form
                handleSubmit={props.handleSubmit}
                modalType={props.state.formModalType}
                data={props.state.list}
                close={props.closeForm}
            />}

            <div className="row">
                <div className="col-lg-6">
                    <h2 className="pi-page-title pi-mb-15">{title + ' Pipeline'}</h2> 
                </div>
                
                <div className="col-lg-6 pi-text-right">
                    <div className="pi-list-single-button-content">
                        <button className="pi-btn pi-btn-medium pi-bg-stroke pi-bg-hover-shadow">
                            <svg
                                width={14}
                                height={12}
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 8H13.5"
                                    stroke="#4A5568"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 2.5V13.5"
                                    stroke="#4A5568"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add Stage
                        </button>
                        <button 
                        className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow pi-color-white"
                        onClick={() => props.openForm('new')}                        
                        >
                            <svg
                                width={14}
                                height={12}
                                viewBox="0 0 12 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.5 8H13.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8 2.5V13.5"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Add {title}
                        </button>
                    </div>
                </div>
            </div>


            {props.state.preloader ? <Preloader /> :
                <Pipeline
                    new={props.openForm}
                    data={lists}
                />}
        </div>
    );
}

export default Crud(Deal, 'deal');