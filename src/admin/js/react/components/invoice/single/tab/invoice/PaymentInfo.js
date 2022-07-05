import React, { Component } from 'react'

class PaymentInfo extends Component {

    constructor(props) {
        super(props);
    }

    render = () => {
        const bank_info = this.props.data;
        return (
            <>
                {bank_info ?
                    <>
                        <h4 className='pi-title-small'>Payment Info:</h4>
                        <address dangerouslySetInnerHTML={{ __html: bank_info.name + '<br />' + bank_info.details.replaceAll('\n', '<br />') }}></address>
                    </> : ''
                }
            </>
        )
    }
}

export default PaymentInfo
