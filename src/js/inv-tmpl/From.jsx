import { countryByCode } from "helper";
export default (props) => {
    const data = props.data
    return (
        <>
            {data &&
                <>
                    <h5>{ndpv.i18n.from}</h5>
                    {data.name && <h6>{data.name}</h6>}
                    <p>
                        {data.address && <>{data.address},<br /></>}
                        {data.city && <>{data.city}, </>}
                        {data.region && <>{data.region}, </>}
                        {data.zip && <>{data.zip}, </>}
                        {data.country && <>{countryByCode(data.country)}, </>}
                        {data.email && <><br />{data.email}</>}
                        {data.mobile && <>, {data.mobile}</>}
                    </p>
                </>
            }
        </>
    )
} 