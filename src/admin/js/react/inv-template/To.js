import React, { Component } from 'react' 

class To extends Component {  

    render = () => {  
        const data = this.props.data 
        return (
            <> 
                {data ?  
                    <>
                        <p>Bill to</p>
                        <h6>{data.first_name} {data.last_name}</h6>
                        <address>
                            Address: <p>{data.address}</p>
                            Email: 
                            <span>
                                <a href="#"> {data.email}</a>
                            </span>
                            <br />
                            Mobile: <span>{data.mobile}</span>
                            <br />
                        </address>           
                    </> : ''
                }
            </>
        )
    }
} 

export default To


