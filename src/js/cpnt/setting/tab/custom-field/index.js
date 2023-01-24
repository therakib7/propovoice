import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProLabel from "block/pro-alert/label";

import List from './List';

export default (props) => {
  const { tab, subtab, insubtab } = useParams();
  let navigate = useNavigate();

  let tabDefault = subtab;
  if (subtab === undefined) {
    tabDefault = "lead";
  }

  const [tabs, setTabs] = useState([
    {
      id: "lead",
      text: "Lead",
    },
    {
      id: "deal",
      text: "Deal",
    },
    {
      id: "project",
      text: "Project",
    },
  ]);
  const [reload, setReload] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabDefault);
  const [currentSubtab, setCurrentSubtab] = useState("");

  useEffect(() => { }, []);

  const routeChange = (tab, subtab = null) => {
    if (subtab) {
      navigate(`/setting/custom-fields/${tab}/${subtab}`);
    } else {
      navigate(`/setting/custom-fields/${tab}`);
    }
  };

  const addCurrentTab = (tab, subtab = null, reload = true) => {
    if (reload) {
      setReload((prev) => !prev);
    }
    setCurrentTab(tab);
    setCurrentSubtab(subtab);
    routeChange(tab, subtab);
  };

  const i18n = ndpv.i18n;
  return (
    <>
      <ul className="pv-horizontal-tab">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={"pv-tab " + (tab.id == currentTab ? "pv-active" : "")}
            onClick={() => addCurrentTab(tab.id)}
          >
            {tab.text}
          </li>
        ))}
      </ul>

      <div className="pv-form-style-one">
        <div className="row">
          <div className="col">
            <label htmlFor="custom-field-label">{i18n.lead + ' ' + i18n.cus + ' ' + i18n.fields}</label>
            <List taxonomy='lead_level' title={i18n.field} />
          </div>
          <div className="col">
          </div>
        </div>

      </div>
    </>
  );
};
