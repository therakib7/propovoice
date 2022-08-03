const To = (props) => {
    const data = props.data
    return (
        <>
            {data ?
                <>
                    <p>Bill to</p>
                    <h6>{data.first_name} {data.last_name}</h6>
                    <address>
                        <p>
                            {data.address &&
                                <>{data.address}.<br /></>
                            }
                            {data.email},

                            {data.mobile &&
                                <><br />{data.mobile}</>
                            }
                        </p>
                    </address>
                </> : ''
            }
        </>
    )
}

export default To


