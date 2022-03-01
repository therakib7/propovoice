import React, { useState, useEffect } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom"; 

const Dashboard = () => {
    
    return(
        <> 
            <div className='mb-5 font-bold text-2xl'>
                Dashboard
            </div>  

            <div className='my-5 font-bold text-xl'>
                Invoice
            </div> 

            <div className='pi-table-wrap'>
                <table className='pi-table'>
                    <thead>
                        <tr>
                            <th className="w-1/3 text-left py-3 px-4 font-bold text-sm">
                                Invoice
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 font-semibold text-sm">
                                Client
                            </th>
                            <th>
                                Date
                            </th>
                            <th>
                                Status
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td colSpan={3} className="p-3">No data found</td>
                             
                        </tr> 
                    </tbody>
                </table>
            </div>          
        </>
    )
}

export default Dashboard;