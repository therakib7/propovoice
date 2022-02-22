import React, { Component } from 'react' 

class FromTo extends Component {  

    render = () => { 

        const fromData = this.props.fromData 
        const toData = this.props.toData 
        return (
            <> 
                <div className="flex justify-between mb-5">
                    <div className=""> 
                        <div className="bg-slate-50 p-3 border rounded">
                            {fromData && 
                                <>
                                    <span className='font-bold'>{fromData.name}</span>
                                    <p className=''>
                                        Email: {fromData.email}<br />
                                        Address: {fromData.address}<br />
                                    </p>
                                </>
                            }
                        </div> 
                    </div>
                    <div className="">
                        
                    </div>
                    <div className=""> 
                        <div className="bg-slate-50 p-3 border rounded">
                                {toData.id ? 
                                <>
                                    <span className='font-bold'>{toData.first_name} {toData.last_name}</span>
                                    <p className=''>
                                        Email: {toData.email}<br />
                                        Address: {toData.address}<br />
                                    </p>
                                </> : 'Search & select'
                            }
                        </div> 
                    </div>
                </div>
            </>
        )
    }
} 

export default FromTo


