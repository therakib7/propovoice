import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WithApi from "hoc/Api";

import Form from "./form";
import GOAuth2 from "./google-api/services/goauth2";
import Automation from "./automation";

const Main = (props) => {
  const { tab, subtab, insubtab } = useParams();
  let navigate = useNavigate();

  let tabDefault = subtab;
  if (subtab === undefined) {
    tabDefault = "form";
  }

  const [tabs, setTabs] = useState([
    {
      id: "form",
      text: "Form",
    },
    {
      id: "google-apps",
      text: "Google Apps",
    },
    {
      id: "automation",
      text: "Automation",
    },
  ]);
  const [reload, setReload] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabDefault);
  const [currentSubtab, setCurrentSubtab] = useState("");

  useEffect(() => { }, []);

  const routeChange = (tab, subtab = null) => {
    if (subtab) {
      navigate(`/setting/integration/${tab}/${subtab}`);
    } else {
      navigate(`/setting/integration/${tab}`);
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

      {currentTab == "form" && (
        <Form
          key={reload}
          {...props}
          onChange={addCurrentTab}
          tab={currentSubtab}
        />
      )}

      {currentTab == "google-apps" && (
        <GOAuth2
          key={reload}
          {...props}
          onChange={addCurrentTab}
          tab={currentSubtab}
        />
      )}
      {/* {currentTab == "google-api" && (
        <GoogleAPI
          key={reload}
          {...props}
          onChange={addCurrentTab}
          tab={currentSubtab}
        />
      )} */}

      {currentTab == "automation" && (
        <Automation
          key={reload}
          {...props}
          onChange={addCurrentTab}
          tab={currentSubtab}
        />
      )}
    </>
  );
};
export default WithApi(Main);
