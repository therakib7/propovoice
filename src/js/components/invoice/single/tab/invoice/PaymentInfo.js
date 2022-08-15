
const PaymentInfo = props => { 
    const bank_info = props.data;
    return (
        <>
            {bank_info ?
                <>
                    <h4 className='pi-title-small'>Payment Info:</h4>
                    <address className='pi-mb-15' dangerouslySetInnerHTML={{ __html: bank_info.name + '<br />' + bank_info.details.replaceAll('\n', '<br />') }}></address>
                </> : ''
            }
        </>
    )
} 
export default PaymentInfo
