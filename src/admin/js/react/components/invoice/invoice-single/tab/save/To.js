import React, { Component } from 'react' 

class FromTo extends Component {  

    render = () => {  
        const data = this.props.data 
        return (
            <> 
                {data.id ? 
                    <>
                        <span className='font-bold'>{data.first_name} {data.last_name}</span>
                        <p className=''>
                            Email: {data.email}<br />
                            Address: {data.address}<br />
                        </p>
                    </> : 'Search & select'
                }
            </>
        )
    }
} 

export default FromTo


