import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Helper from './helper';
import Table from './Table';
import Form from './Form';

class App extends Component {
    state = {
        // clients: []
        formModal: false,
        formModalType: 'new',
        msg: {
            create: 'Successfully Added',
            update: 'Successfully Updated',
            delete: 'Successfully Deleted',
            confirm: 'Are you sure to delete it?',
        },
        client: { id: null },
        clients: [],
        currentClient: null,
        setCurrentClient: null,
        currentIndex: -1,
        searchTitle: ''
    };

    componentDidMount() {
        this.getLists();
    }

    getLists = () => {
        Helper.getAll()
            .then(resp => {
                this.setState({ clients: resp.data.data });
            })
    };

    openForm = (type = 'new', client = null) => {
        this.setState({ formModal: true });

        if (type == 'new') {
            this.setState({ formModalType: 'new' });
        } else {
            this.setState({ formModalType: 'edit' });
            this.setState({ client: client });
        }
    };

    closeForm = () => {
        this.setState({ formModal: false });
    };

    deleteEntry = (type, index) => {
        if (confirm(this.state.msg.confirm)) {
            this.setState({
                clients: this.state.clients.filter((client, i) => {
                    return client.id !== index;
                })
            });
            toast.success(this.state.msg.delete);

            Helper.remove(index)
                .then(resp => {
                    if (resp.data.success) {

                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    }

    handleSubmit = client => {
        if (this.state.formModalType == 'new') {
            Helper.create(client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        toast.success(this.state.msg.create);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        } else {
            Helper.update(client.id, client)
                .then(resp => {
                    if (resp.data.success) {
                        this.setState({ formModal: false })
                        // this.setState({ formModalType: 'new' });
                        toast.success(this.state.msg.update);
                        this.getLists();
                    } else {
                        resp.data.data.forEach(function (value, index, array) {
                            toast.error(value);
                        });
                    }
                })
        }
    } 

    render() {
        return (
            <div className="ncpi-components">
                <ToastContainer />

                <div className='mb-5 font-bold text-2xl'>
                    Client
                </div>

                <button
                    className="bg-blue-700 hover:bg-blue-800 text-white font-medium text-base py-2 px-4 rounded mb-3"
                    onClick={() => this.openForm('new')} >
                    Create New Client
                </button>

                <Form
                    handleSubmit={this.handleSubmit}
                    show={this.state.formModal}
                    modalType={this.state.formModalType}
                    data={this.state.client}
                    close={this.closeForm}
                />

                <Table
                    tableData={this.state.clients}
                    editEntry={this.openForm}
                    deleteEntry={this.deleteEntry}
                />

            </div>
        );
    }
}

export default App;