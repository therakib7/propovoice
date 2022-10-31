import React, { useState } from 'react';
import WithRouter from 'hoc/Router';
import { toast } from 'react-toastify';
import { Add } from 'block/icon';
import { CSVLink } from "react-csv";
import csv from './csv';

const ImportModal = (props) => {
    const [file, setFile] = useState();
    const [array, setArray] = useState([]);
    const [array1, setArray1] = useState('');

    const fileReader = new FileReader();

    const handleOnChange = (e) => {
        setFile(e.target.files[0]);
    };
    const valueSate = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setArray1(value)

    }
    const csvFileToArray = string => {
        const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
        const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

        const array = csvRows.map(i => {
            const values = i.split(",");
            const obj = csvHeader?.reduce((object, header, index) => {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });

        setArray(array);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (file) {
            fileReader.onload = function (event) {
                const text = event.target.result;
                csvFileToArray(text);
            };

            fileReader.readAsText(file);
        } else {
            toast('Please upload file')
        }

    };
    const data = Object.values(Object.assign({}, ...array));
    const headerKeys = Object.keys(Object.assign({}, ...array));
    console.log(data)
    const ExportModal = Object.keys(props.ExportModal);
    const i18n = ndpv.i18n;
    return (
        <div className="pv-overlay pv-show">
            <div className="pv-modal-content">
                <div className="pv-modal-header pv-gradient">
                    <span className="pv-close" onClick={() => props.close()}>
                        <Add />
                    </span>
                    <h2 className="pv-modal-title"> {props.title} {i18n.imp}</h2>
                    <p>{sprintf(i18n.formDesc, props.title, i18n.imp)}</p>
                </div>
                <form  >
                    <div className="pv-content">
                        <div className="pv-form-style-one">
                            {!file && <div>
                                <div className="pv-upload-file">
                                    <input
                                        type={"file"}
                                        id={"files"}
                                        accept={".csv"}
                                        onChange={handleOnChange}
                                        className="d-none"
                                    />
                                    <label htmlFor="files" className=' pv-btn pv-bg-stroke pv-bg-hover-stroke  '>
                                        <svg
                                            width={25}
                                            height={25}
                                            viewBox="0 0 14 14"
                                            fill="none"

                                        >
                                            <path
                                                d="M3.66824 10.0907C3.01193 10.0915 2.37842 9.85536 1.88909 9.42768C1.39976 9 1.08901 8.41081 1.01638 7.773C0.943746 7.13518 1.11434 6.49358 1.49547 5.97112C1.87661 5.44866 2.44148 5.08208 3.08188 4.94161C2.89659 4.09662 3.06217 3.21426 3.5422 2.48865C4.02223 1.76304 4.77738 1.25361 5.64153 1.07243C6.50568 0.891248 7.40804 1.05316 8.1501 1.52254C8.89217 1.99193 9.41315 2.73034 9.59844 3.57533H9.66507C10.4913 3.57451 11.2883 3.87392 11.9014 4.41541C12.5146 4.9569 12.9001 5.70185 12.9831 6.50564C13.0662 7.30943 12.8408 8.11472 12.3508 8.76517C11.8608 9.41562 11.1411 9.86483 10.3314 10.0256M8.99875 8.13612L6.99981 6.1815M6.99981 6.1815L5.00087 8.13612M6.99981 6.1815V13"
                                                stroke="#4C6FFF"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        Click to upload File
                                    </label>
                                </div>
                            </div>}
                                {!file && <div>
                                    <CSVLink style={{ color: 'rgb(54 91 243)', fontWeight: '500' }} data={csv}>Download sample file</CSVLink>
                                    {!file && <p>Please make sure your csv file has unique headers.Otherwise, it may fail to import</p>}
                                </div>}
                                <div className="pv-import-map">
                                    <button
                                        className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white pv-mb-30"
                                        onClick={(e) => {
                                            handleOnSubmit(e);
                                        }}
                                    >
                                        Next [Map Columns]
                                    </button>
                                </div>
                            <br />
                            {file && <div className='pv-table-wrap pv-mb-20'>
                                <table className='pv-table'>
                                    <thead>
                                        <tr>
                                            <th>
                                            </th>
                                            <th >
                                                Form Field
                                            </th>
                                            <th>
                                                {props.title + ' ' + i18n.fields}
                                            </th>
                                            <th>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {headerKeys.map((sitem, si) => (
                                            <tr key={si}>
                                                <td>
                                                </td>
                                                <td>
                                                    {sitem}
                                                </td>
                                                <td>
                                                    <select
                                                        style={{ lineHeight: '106%' }}
                                                        // name="lead_field"
                                                        onChange={(e) => { valueSate(e) }}
                                                    >
                                                        {ExportModal.map((val, i) => <option key={i} value={val}>{val}</option>)}
                                                    </select>
                                                </td>
                                                <td>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>}
                        </div>
                    </div>
                    {file && <div className="pv-modal-footer">
                        <div className="row">
                            <div className="col">
                                <button type='reset' className="pv-btn pv-text-hover-blue">{i18n.clear}</button>
                            </div>
                            <div className="col">
                                <button type='submit' className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white">
                                    {i18n.save}
                                </button>
                            </div>
                        </div>
                    </div>}
                </form>
            </div>
        </div>
    );
};

export default WithRouter(ImportModal);