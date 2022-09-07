export default (props) => {
    const { paymentBankData: bankData } = props.data;
    return (
        <div>
            {bankData ? <>
                <div className="pv-inv-bank">
                    <h4>{ndpv.i18n.payment} {ndpv.i18n.info}:</h4>
                    <div className="pv-bank-info" dangerouslySetInnerHTML={{ __html: bankData.name + '<br />' + bankData.details.replaceAll('\n', '<br />') }}></div>
                </div>
            </> : ''}
        </div>
    )
} 