import React, { Component } from 'react'

class From extends Component {

    render = () => {

        const data = this.props.data
        return (
            <>
                {data &&
                    <address>
                        <span>
                            {data.address &&
                                <>{data.address}.<br /></>
                            }      

                            {data.email},

                            {data.mobile &&
                                <><br />{data.mobile}</>
                            }
                        </span>
                    </address>
                }
            </>
        )
    }
}

export default From 