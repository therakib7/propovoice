const PaymentInfo = (props) => {
    const bank_info = props.data;
    const i18n = ndpv.i18n;
    return (
        <>
            {bank_info ?
                <>
                    <h4 className='pv-title-small'>{i18n.paymentInfo}:</h4>
                    <address className='pv-mb-15' dangerouslySetInnerHTML={{ __html: bank_info.name + '<br />' + bank_info.details.replaceAll('\n', '<br />') }}></address>
                </> : ''
            }
        </>
    )
}

export default PaymentInfo;