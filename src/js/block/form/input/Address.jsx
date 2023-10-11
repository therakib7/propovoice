import { CountryDropdown } from 'react-country-region-selector';

const Address = (props) => {

    const i18n = ndpv.i18n;
    const { data, handleChange, selectCountry } = props;

    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="form-country">
                        {i18n.country}
                    </label>
                    <CountryDropdown
                        value={data.country}
                        valueType='short'
                        onChange={(val) => selectCountry(val)}
                    />
                </div>

                <div className="col-md-6">
                    <label htmlFor="form-region">
                        {i18n.state_region}
                    </label>
                    <input
                        id="form-region"
                        type="text"
                        name="region"
                        value={data.region}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <label htmlFor="form-address">
                        {i18n.addr}
                    </label>
                    <input
                        id="form-address"
                        type="text"
                        name="address"
                        value={data.address}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <label htmlFor="field-city">
                        {i18n.city}
                    </label>
                    <input
                        id="field-city"
                        type="text"
                        name="city"
                        value={data.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="col-md">
                    <label htmlFor="field-zip">
                        {i18n.zip}
                    </label>
                    <input
                        id="field-zip"
                        type="text"
                        name="zip"
                        value={data.zip}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}
export default Address;
