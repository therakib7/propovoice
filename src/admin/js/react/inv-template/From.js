import React, { Component } from 'react'

class From extends Component {

    render = () => {

        const data = this.props.data
        return (
            <>
                {data &&
                    <address>
                        Address: <span>{data.address}</span>
                        <br />
                        Email: {data.email}
                        <br />
                        What'sApp: <span>+8801760706361</span>
                        <br />
                    </address>
                }
            </>
        )
    }
}

export default From
