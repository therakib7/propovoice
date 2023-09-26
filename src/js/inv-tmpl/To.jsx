import { CountryRegionData } from 'react-country-region-selector';

export default (props) => {

    const data = props.data;

    const countryByCode = (country = '') => {
        if (country) {
            let obj = CountryRegionData.find((o, i) => {
                if (o[1] === country) {
                    return true; // stop searching
                }
            });

            if (obj) {
                return obj[0];
            }
        }
    }

    return (
        <>
            {data ?
                <>
                    <h5>{ndpv.i18n.billTo}</h5>
                    <h6>{data?.first_name ?? data?.org_name}</h6>
                    <p>
                        {!data?.first_name ? data?.org_name + "<br />" : ""}
                        {data.address &&
                            <>{data.address}.<br /></>
                        }
                        {data.email}
                        {data.mobile &&
                            <>,<br />{data.mobile}</>
                        }

                        {(data.region || data.country) &&
                            <>
                                <br />{(data.region && data.country) ? data.region + ', ' : ''} {countryByCode(data.country)}
                            </>
                        }
                    </p>
                </> : ''
            }
        </>
    )
}
