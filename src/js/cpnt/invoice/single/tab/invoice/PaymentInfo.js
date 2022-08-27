
export default ( props ) => { 
    const bank_info = props.data;
    const i18n = ndpv.i18n;
    return (
        <>
            {bank_info ?
                <>
                    <h4 className='pi-title-small'>{i18n.payment} {i18n.info}:</h4>
                    <address className='pi-mb-15' dangerouslySetInnerHTML={{ __html: bank_info.name + '<br />' + bank_info.details.replaceAll('\n', '<br />') }}></address>
                </> : ''
            }
        </>
    )
} 