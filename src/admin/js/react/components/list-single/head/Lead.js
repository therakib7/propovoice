import React, { Component } from 'react';
import { toast } from 'react-toastify';

import AppContext from 'context/app-context';
import ReactPaginate from 'react-paginate';

import Preloader from 'block/preloader/table';

import Api from 'api/task';
import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

export default class Lead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Lead', 
        };
        this.timeout = 0;
    }

    static contextType = AppContext;

    componentDidMount() { 
    } 
    render() {
        const { title, tasks, checkedBoxes, searchVal } = this.state;
        return (
            <>  
                 
            </>
        );
    }
} 