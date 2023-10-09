import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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

export default function PublicApi() {
  const [appPwdName, setAppPwdName] = useState("");
  const [appPwd, setAppPwd] = useState("");
  const [newAppPwdName, setNewAppPwdName] = useState("");
  const [newAppPwd, setNewAppPwd] = useState("");
  const [pwdList, setPwdList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const getPwdList = () => {
    const api = `users/${ndpv.profile.id}/application-passwords`;
    axios.get(`${url(api)}`, token).then((res) => {
      setPwdList(res.data);
    });
  };

  const createPwd = async (name) => {
    const api = `users/${ndpv.profile.id}/application-passwords`;
    axios.post(`${url(api)}`, { name: name }, token).then((res) => {
      setNewAppPwdName(res.data.name);
      setNewAppPwd(res.data.password);
    });
  };

  const deletePwd = async (uuid) => {
    var confirmation = confirm("Are you sure you want to delete this item?");
    if (!confirmation) {
      return;
    }
    const api = `users/${ndpv.profile.id}/application-passwords/${uuid}`;
    axios.delete(`${url(api)}`, token).then(() => {
      setIsDeleted(true);
      setNewAppPwdName("");
      setNewAppPwd("");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ndpv.isDemo) {
      toast.error(ndpv.demoMsg);
      return;
    }
    await createPwd(appPwdName);
    setIsSubmitted(true);
    setAppPwdName("");
    // setAppPwd("");
  };

  useEffect(() => {
    getPwdList();
    setIsSubmitted(false);
    setIsDeleted(false);
  }, [isSubmitted, isDeleted]);

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className="pv-form-style-one">
        <div className="row">
          <div className="col">
            <label htmlFor="app-pwd-name">New Application Password Name</label>
            <input
              id="app-pwd-name"
              type="text"
              required
              name="app-pwd-name"
              value={appPwdName}
              onChange={(e) => setAppPwdName(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button className="pv-btn  pv-bg-blue pv-bg-hover-blue">
              Create new Application Password
            </button>
          </div>
        </div>
      </form>

      {newAppPwd && (
        <div
          className="notice notice-success is-dismissible new-application-password-notice"
          role="alert"
          tabIndex="-1"
        >
          <p className="application-password-display">
            <label htmlFor="new-application-password-value">
              Your new password for{" "}
              <code>
                <b>{newAppPwdName}</b>
              </code>{" "}
              is:{" "}
            </label>
            <input
              id="new-application-password-value"
              type="text"
              className="code"
              readOnly="readonly"
              value={newAppPwd}
            />
          </p>
          <p>
            Be sure to save this in a safe location. You will not be able to
            retrieve it.
          </p>
          {/* <button type="button" className="notice-dismiss"> */}
          {/*   <span className="screen-reader-text">Dismiss this notice.</span> */}
          {/* </button> */}
        </div>
      )}
      {pwdList.length > 0 && (
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
            {pwdList.map((pwd) => (
              <tr key={pwd.uuid}>
                <td style={{ width: "auto" }}>{pwd.name}</td>
                <td>{pwd.created}</td>
                <td>{pwd.last_used}</td>
                <td>{pwd.last_ip}</td>
                <td>
                  <button
                    onClick={() => deletePwd(pwd.uuid)}
                    className="pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow"
                    type="button"
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
