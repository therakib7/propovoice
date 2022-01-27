import React, { useState, useEffect } from 'react';

const Proposal = () => {
    
    return(
        <> 
            <div className='mb-5 font-bold text-2xl'>
                Proposal
            </div>

            <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mb-3">
                Create New Proposal
            </button>

            <div className="shadow overflow-hidden rounded border-b border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/3 text-left py-3 px-4 font-bold text-sm">
                                Proposal
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 font-semibold text-sm">
                                Client
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">
                                Date
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">
                                Status
                            </th>
                            <th className="text-left py-3 px-4 font-semibold text-sm">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-gray-700">
                        <tr>
                            <td className="w-1/3 text-left py-3 px-4">Title of proposal</td>
                            <td className="w-1/3 text-left py-3 px-4">Smith</td>
                            <td className="text-left py-3 px-4">
                                10 Nov 2020
                            </td>
                            <td className="text-left py-3 px-4">
                                Paid
                            </td>
                            <td className="text-left py-3 px-4">
                                View | Edit | Delete
                            </td>
                        </tr> 
                    </tbody>
                </table>
            </div> 
        </>
    )
}

export default Proposal;