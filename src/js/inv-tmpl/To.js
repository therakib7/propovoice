export default (props) => {
    const data = props.data;
    return (
        <>
            {data ?
                <>
                    <h5>{ndpv.i18n.bill} {ndpv.i18n.to}</h5>
                    <h6>{(data.type == 'person') ? data.first_name : data.org_name}</h6>
                    <p>
                        {data.address &&
                            <>{data.address}.<br /></>
                        }
                        {data.email},

                        {data.mobile &&
                            <><br />{data.mobile}</>
                        }
                    </p>
                </> : ''
            }
        </>
    )
}