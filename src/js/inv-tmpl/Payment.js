export default (props) => {
    const { bankData } = props.data;
    const i18n = ndpv.i18n;
    return (
        <div>
            {bankData ? <>
                <div className="pv-inv-bank">
                    <h4>Payment Info:</h4>
                    <div className="pv-bank-info" dangerouslySetInnerHTML={{ __html: bankData.name + '<br />' + bankData.details.replaceAll('\n', '<br />') }}></div>
                </div>
            </> : ''}
        </div>
    )
} 