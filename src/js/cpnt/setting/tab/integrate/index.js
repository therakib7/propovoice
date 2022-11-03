import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WithApi from "hoc/Api";
import ProLabel from "block/pro-alert/label";

import Form from "./form";
import Smtp from "./smtp";
import GOAuth2 from "./google-api/services/goauth2"
// import Test from "./google-api/services/Test"
import Test from "./google-api/services/Test"
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
      id: "smtp",
      text: "SMTP",
    },
    {
      id: "test",
      text: "Test",
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

      {currentTab == "smtp" && (
        <Smtp
          key={reload}
          {...props}
          onChange={addCurrentTab}
          tab={currentSubtab}
        />
      )}
      {currentTab == "test" && (
        <Test
          // key={reload}
          // {...props}
          // onChange={addCurrentTab}
          // tab={currentSubtab}
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
