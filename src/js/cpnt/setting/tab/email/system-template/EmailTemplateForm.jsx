import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProLabel from "block/pro-alert/label";
import api from "api";

function EmailTemplateForm({
  module = "settings",
  tab,
  title,
  subVars,
  msgVars,
  isPro,
}) {
  const tabPrefix = "email_";
  const [form, setForm] = useState({
    subject: "",
    msg: "",
    tab: tabPrefix + tab,
  });

  useEffect(() => {
    api.get(module, `tab=${tabPrefix + tab}`).then((resp) => {
      if (resp.data.success) {
        setForm({ ...form, ...resp.data.data });
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (ndpv.isDemo) {
      toast.error(ndpv.demoMsg);
      return;
    }

    api.add(module, form).then((resp) => {
      if (resp.data.success) {
        toast.success(ndpv.i18n.aUpd);
      } else {
        resp.data.data.forEach(function (value) {
          toast.error(value);
        });
      }
    });
  };
  const { i18n } = ndpv;

  return (
    <form onSubmit={handleSubmit} className="pv-form-style-one">
      <h4
        className="pv-title-medium pv-mb-15"
        style={{ textTransform: "capitalize" }}
      >
        {title}
      </h4>
      <div className="row">
        <div className="col">
          <label htmlFor="form-subject">{i18n.sub}</label>
          <input
            id="form-subject"
            type="text"
            required
            name="subject"
            value={form.subject}
            onChange={handleChange}
          />
          <p className="pv-field-desc">
            <b>{i18n.var}: </b>
            {subVars}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <label htmlFor="form-msg">{i18n.msg}</label>
          <textarea
            id="form-msg"
            required
            rows={9}
            name="msg"
            value={form.msg}
            onChange={handleChange}
          />
          <p className="pv-field-desc">
            <b>{i18n.var}: </b>
            {msgVars}
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <button className="pv-btn pv-bg-blue pv-bg-hover-blue">
            {i18n.save} {isPro && <ProLabel blueBtn />}
          </button>
        </div>
      </div>
    </form>
  );
}
export default EmailTemplateForm;
