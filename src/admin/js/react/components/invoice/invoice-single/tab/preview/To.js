import React, { Component } from 'react' 

class To extends Component {  

    render = () => {  
        const data = this.props.data 
        return (
            <> 
                {data ? 
                    <>
                        <span className='font-bold'>{data.first_name} {data.last_name}</span>
                        <p className=''>
                            Email: {data.email}<br />
                            Address: {data.address}<br />
                        </p>
                    </> : ''
                }
            </>
        )
    }
} 

export default To


