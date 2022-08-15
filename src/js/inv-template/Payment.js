export default (props) => {
    const { bankData } = props.data;
    return (
        <div>
            {bankData ? <>
                <div className="pi-inv-bank">
                    <h4>Payment Info:</h4>
                    <div className="pi-bank-info" dangerouslySetInnerHTML={{ __html: bankData.name + '<br />' + bankData.details.replaceAll('\n', '<br />') }}></div>
                </div>
            </> : ''}
        </div>
    )
} 