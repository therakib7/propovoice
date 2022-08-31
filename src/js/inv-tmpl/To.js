export default (props) => {
    const data = props.data
    return (
        <>
            {data ?
                <>
                    <h5>{ndpv.i18n.invBill}</h5>
                    <h6>{data.first_name} {data.last_name}</h6>
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