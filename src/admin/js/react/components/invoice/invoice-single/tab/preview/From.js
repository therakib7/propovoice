import React, { Component } from 'react' 

class From extends Component {  

    render = () => { 

        const data = this.props.data  
        return (
            <> 
                {data && 
                    <>
                        <span className='font-bold'>{data.name}</span>
                        <p className=''>
                            Email: {data.email}<br />
                            Address: {data.address}<br />
                        </p>
                    </>
                }
            </>
        )
    }
} 

export default From


