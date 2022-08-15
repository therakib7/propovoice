export default (props) => {
    const data = props.data  
    return (
        <>
            {data &&
                <>
                    <h5>From</h5> 
                    {data.name && <h6>{data.name}</h6>}
                    <p>
                        {data.address &&
                            <>{data.address}.<br /></>
                        }
                        { data.email ? data.email + ', ' : ''}

                        {data.mobile &&
                            <><br />{data.mobile}</>
                        }
                    </p>
                </>
            }
        </>
    )
} 