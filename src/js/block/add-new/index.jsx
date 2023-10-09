import React, { useCallback, useRef, useState, useEffect } from "react";
import useClickOutside from "block/outside-click";
import { Edit } from "block/icon";
import ImportModal from "./ImportModal";
import ExportModal from "./ExportModal";

export default (props) => {
  const dropdownRef = useRef();
  const [dropdown, setDropdown] = useState(false);
  const [imp, setImp] = useState(false);
  const [exp, setExp] = useState(false);
  const close = useCallback(() => setDropdown(false), []);
  useClickOutside(dropdownRef, close);

  useEffect(() => {}, []);

  const showDropdown = () => {
    if (dropdown) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const ImportExport = (e, type) => {
    e.preventDefault();
    // Show pro alert if pro version not active
    if (!isPro()) {
      return;
    }

    setDropdown(false);
    setExp(true);
  };
  const ImportImport = (e, type) => {
    e.preventDefault();

    // Show pro alert if pro version not active
    if (!isPro()) {
      return;
    }

    setDropdown(false);
    setImp(true);
  };

  const isPro = () => {
    if (wage.length > 0) {
      document.getElementById("pv-pro-alert").style.display = "block";
      return false;
    }
    return true;
  };

  const i18n = ndpv.i18n;
  return (
    <div className="pv-list-single-button-content">
      <button
        className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-bg-shadow pv-color-white"
        onClick={() => props.openForm("new")}
      >
        <svg width={14} height={12} viewBox="0 0 12 15" fill="none">
          <path
            d="M2.5 8H13.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M8 2.5V13.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        {/* {ndpv.i18n["add" + "_" + props.title]} */}
        {ndpv.i18n.add + " " + props.title}
      </button>

      {imp && (
        <ImportModal
          close={() => setImp(false)}
          modal={props.fields}
          title={props.title}
          reload={() => props.reload()}
        />
      )}
      {exp && (
        <ExportModal
          close={() => setExp(false)}
          fields={props.fields}
          title={props.title}
        />
      )}
      {(props.title === "Lead" || props.title === "Client") && (
        <div className="pv-action-content pv-action-btn" ref={dropdownRef}>
          <button
            className="pv-bg-stroke pv-bg-shadow"
            onClick={() => showDropdown()}
          >
            <Edit />
          </button>

          {dropdown && (
            <div className="pv-dropdown-content pv-show">
              <a onClick={(e) => ImportImport(e, "import")}>{i18n.imp}</a>
              <a onClick={(e) => ImportExport(e, "export")}>{i18n.exp}</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
