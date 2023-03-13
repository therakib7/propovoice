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

  const getPwdList = () => {
    const api = `users/${ndpv.profile.id}/application-passwords`;
    axios.get(`${url(api)}`, token)
      .then((res) => {
        setPwdList(res.data);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    getPwdList();
  }, []);

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
