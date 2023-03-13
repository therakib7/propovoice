import React, { useState, useEffect } from "react";
import axios from "axios";

const token = {
  headers: {
    "content-type": "application/json",
    "X-WP-NONCE": ndpv.nonce,
  },
};

const url = (api) => {
  const { apiUrl } = ndpv;
  return `${apiUrl}wp/v2/${api}`;
};


export default function PublicApi(props) {
  const [appPwdName, setAppPwdName] = useState();
  const [pwdList, setPwdList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getPwdList = () => {
    const api = `users/${ndpv.profile.id}/application-passwords`;
    axios.get(`${url(api)}`, token)
      .then((res) => {
        setPwdList(res.data);
      });
  }

  const createPwd = async (name) => {
    const api = `users/${ndpv.profile.id}/application-passwords`;
    await axios.post(`${url(api)}`, { name: name }, token)
      .then((res) => {
        console.log(res.data);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPwd(appPwdName);
    setIsSubmitted(true);
    setAppPwdName("");
    console.log(isSubmitted);
  }

  useEffect(() => {
    getPwdList();
    setIsSubmitted(false);
  }, [isSubmitted]);

  return (
    <>
      <form onSubmit={e => handleSubmit(e)} className="pv-form-style-one">
        <div className="row">

          <div className="col">
            <label htmlFor="app-pwd-name">New Application Password Name</label>
            <input
              id="app-pwd-name"
              type="text"
              required
              name="app-pwd-name"
              value={appPwdName}
              onChange={e => setAppPwdName(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="pv-btn pv-btn-big pv-bg-blue pv-bg-hover-blue">Create new Application Password</button>
          </div>
        </div>

      </form>

      <div className="notice notice-success is-dismissible new-application-password-notice" role="alert" tabIndex="-1">
        <p className="application-password-display">
          <label htmlFor="new-application-password-value">
            Your new password for <strong>asdfsad</strong> is: </label>
          <input id="new-application-password-value" type="text" className="code" readOnly="readonly" value="cDZJ soSM ZNjt QADf rMPI Lp2Z" />
        </p>
        <p>Be sure to save this in a safe location. You will not be able to retrieve it.</p>
        <button type="button" className="notice-dismiss">
          <span className="screen-reader-text">Dismiss this notice.</span>
        </button>
      </div>

      {pwdList &&
        <table className="pv-table">
          <thead>
            <tr>
              <th style={{ width: "auto" }}>Name</th>
              <th>Created</th>
              <th>Last Used</th>
              <th>Last IP</th>
              <th>Revoke</th>
            </tr>
          </thead>
          <tbody>
            {pwdList.map((pwd) =>
              <tr key={pwd.uuid}>
                <td style={{ width: "auto" }}>{pwd.name}</td>
                <td>{pwd.created}</td>
                <td>{pwd.last_used}</td>
                <td>{pwd.last_ip}</td>
                <td>
                  <button className="" type="button" >Revoke</button>
                </td>
              </tr>

            )}
          </tbody>
        </table>
      }
    </>
  );
}
