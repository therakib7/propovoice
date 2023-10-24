import { countryByCode } from "helper";

export default (props) => {
  const data = props.data;
  return (
    <>
      {data ? (
        <>
          <h5>{ndpv.i18n.billTo}</h5>
          <h6>{data?.first_name ?? data?.org_name}</h6>
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
      ) : (
        ""
      )}
    </>
  );
};
