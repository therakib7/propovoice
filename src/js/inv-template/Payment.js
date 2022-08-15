export default (props) => {
    const { bankData } = props.data;
    const i18n = ndpi.i18n;
    return (
<<<<<<< HEAD
        <>
            <div>
                {bankData ? <>
                    <div className="pi-inv-bank">
                        <h4>{i18n.payment} {i18n.info}:</h4>
                        <div className="pi-bank-info" dangerouslySetInnerHTML={{ __html: bankData.name + '<br />' + bankData.details.replaceAll('\n', '<br />') }}></div>
                    </div>
                </> : ''}
            </div>
        </>
=======
        <div>
            {bankData ? <>
                <div className="pi-inv-bank">
                    <h4>Payment Info:</h4>
                    <div className="pi-bank-info" dangerouslySetInnerHTML={{ __html: bankData.name + '<br />' + bankData.details.replaceAll('\n', '<br />') }}></div>
                </div>
            </> : ''}
        </div>
>>>>>>> c2fe5b6d1fa709a1de957f8985ecb76512407a75
    )
} 