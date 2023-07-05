import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProLabel from "block/pro-alert/label";

import List from './List';

export default (props) => {
  const { tab, subtab, insubtab } = useParams();
  let navigate = useNavigate();

  const i18n = ndpv.i18n;

  let tabDefault = subtab;
  if (subtab === undefined) {
    tabDefault = "lead";
  }

  const [tabs, setTabs] = useState([
    {
      id: "lead",
      text: i18n.lead,
    },
    {
      id: "deal",
      text: i18n.deal,
    },
    {
      id: "project",
      text: i18n.project,
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
    // routeChange(tab, subtab);
  };

  const title = (mod = null) => {
    let title = '';
    switch (mod) {
      case 'lead':
        title = i18n.lead;
        break;

      case 'deal':
        title = i18n.deal;
        break;

      case 'project':
        title = i18n.project;
        break;
    }
    return title;
  };

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
            <label htmlFor="custom-field-label">{title(currentTab) + ' ' + i18n.cus + ' ' + i18n.fields}</label>
            <List key={currentTab} mod={currentTab} title={i18n.field} />
          </div>
          <div className="col">
          </div>
        </div>

      </div>
    </>
  );
};
