import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WithApi from "hoc/Api";
import ProLabel from "block/pro-alert/label";

const Main = (props) => {
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


    </>
  );
};
export default WithApi(Main);
