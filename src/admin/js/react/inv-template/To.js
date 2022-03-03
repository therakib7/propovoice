import React, { Component } from 'react' 

class To extends Component {  

    render = () => {  
        const data = this.props.data 
        return (
            <> 
                {data ?  
                    <>
                        <p>Bill to</p>
                        <p>{data.first_name} {data.last_name}</p>
                        <address>
                        Address: <p>{data.address}</p>
                        Email: 
                        <span>
                            <a href="#"> {data.email}</a>{" "}
                        </span>
                        <br />
                        What'sApp: <span>+8801760706361</span>
                        <br />
                        </address>                        
                    </> : ''
                }
            </>
        )
    }
} 

export default To


