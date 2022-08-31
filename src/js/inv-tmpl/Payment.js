export default (props) => {
    const { bankData } = props.data;
    return (
        <div>
            {bankData ? <>
                <div className="pv-inv-bank">
                    <h4>{ndpv.i18n.invPayinfo}:</h4>
                    <div className="pv-bank-info" dangerouslySetInnerHTML={{ __html: bankData.name + '<br />' + bankData.details.replaceAll('\n', '<br />') }}></div>
                </div>
            </> : ''}
        </div>
    )
} 