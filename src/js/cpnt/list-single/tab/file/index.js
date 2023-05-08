import { useRef, useCallback, useState, useEffect } from "react";
import useClickOutside from 'block/outside-click';
import { getOAuth2Data } from "api/gapi/goauth2";
import Preloader from "block/preloader/table";

import FormDrive from "./FormDrive";
import FormFile from "./FormFile";
import FormLink from "./FormLink";
import Table from "./Table";
// import Search from './Search';
// import Empty from 'block/empty';

import Crud from "hoc/Crud";

const File = (props) => {
  useEffect(() => {
    props.getLists();
  }, []);

  const [fileModal, setFileModal] = useState(false);
  const [driveModal, setDriveModal] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef();
  const close = useCallback(() => setOpenDropdown(false), []);
  useClickOutside(dropdownRef, close);

  const { lists, checkedBoxes, searchVal } = props.state;
  const i18n = ndpv.i18n;
  return (
    <>
      <div className="pv-small-button-group pv-small-button-group-two">
        <div className="row">
          <div className="col-sm-5">
            <h3 className="pv-title-small">
              {i18n.my} {i18n.file}
            </h3>
            <button
              className={
                "pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow " +
                (activeTab == "all" ? "pv-active" : "")
              }
              onClick={() => {
                setActiveTab("all");
                props.getLists();
              }}
            >
              All
            </button>
            <button
              className={
                "pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow " +
                (activeTab == "file" ? "pv-active" : "")
              }
              onClick={() => {
                setActiveTab("file");
                props.getLists({ type: "file" });
              }}
            >
              {i18n.file}
            </button>
            <button
              className={
                "pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow " +
                (activeTab == "link" ? "pv-active" : "")
              }
              onClick={() => {
                setActiveTab("link");
                props.getLists({ type: "link" });
              }}
            >
              {i18n.link}
            </button>

            {!wage.length &&

              <button
                className={
                  "pv-btn pv-btn-small pv-bg-stroke pv-bg-hover-shadow " +
                  (activeTab == "drive" ? "pv-active" : "")
                }
                onClick={() => {
                  setActiveTab("drive");
                  props.getLists({ type: "google-drive" });
                }}
              >
                {i18n.drive}
              </button>
            }
          </div>

          <div className="col-sm-7">
            <div className="pv-buttons-right pv-text-right">
              {true && (
                <button
                  className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow"
                  onClick={() => {
                    setOpenDropdown(!openDropdown);
                  }}
                >
                  <svg width={17} height={14} viewBox="0 0 17 16" fill="none">
                    <path
                      d="M5.875 5.125L8.5 2.5L11.125 5.125"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 9.5V2.5"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 9.5V13C14 13.1326 13.9473 13.2598 13.8536 13.3536C13.7598 13.4473 13.6326 13.5 13.5 13.5H3.5C3.36739 13.5 3.24021 13.4473 3.14645 13.3536C3.05268 13.2598 3 13.1326 3 13V9.5"
                      stroke="#718096"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {i18n.upload}
                </button>
              )}
              {openDropdown && <div className="pv-dropdown-content pv-show" ref={dropdownRef} >
                {!wage.length &&

                  <a onClick={async () => {
                    setOpenDropdown(false);
                    await getOAuth2Data();
                    setDriveModal(true);
                  }} >
                    <svg width={17} height={14} xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" id="social-media"><path d="M21.7319336,15.1376953c-0.0018921-0.0333252-0.0109253-0.0648193-0.0196533-0.0977173c-0.0087891-0.0328369-0.0167847-0.0644531-0.0317383-0.0942383c-0.0046387-0.0092773-0.0043945-0.0195923-0.0096436-0.0287476L15.5126953,4.25C15.4235229,4.0953369,15.258606,4.000061,15.0800781,4H8.9208984C8.833252,4.000061,8.7471924,4.0231934,8.6712646,4.0670166C8.5995483,4.1083984,8.5473633,4.1674805,8.5056152,4.2327271C8.5006104,4.239502,8.492981,4.2429199,8.4882812,4.25L2.3291016,14.9169922c-0.0898438,0.154541-0.0898438,0.345459,0,0.5L5.4091797,20.75c0.0072021,0.0125122,0.0214233,0.0179443,0.0296021,0.0296631c0.0339355,0.0488281,0.0745239,0.0894775,0.1233521,0.1234741c0.0183716,0.0127563,0.0338135,0.026062,0.0537109,0.0362549C5.6845093,20.9749756,5.7591553,20.999939,5.8417969,21h12.3173828c0.1785278-0.000061,0.3434448-0.0953369,0.4326172-0.25l3.0791016-5.3330078c0.0070801-0.0122681,0.0048828-0.0276489,0.0108643-0.0404663c0.0253296-0.053894,0.0402832-0.109314,0.0452881-0.1686401c0.0012207-0.0140991,0.0108643-0.0262451,0.0108643-0.0404663C21.737915,15.1568604,21.7325439,15.1480713,21.7319336,15.1376953z M14.7910156,5l5.5810547,9.6669922h-5.0029297L9.7871094,5H14.7910156z M14.2144165,14.6669922H9.7861938l2.2139282-3.8348389L14.2144165,14.6669922z M3.3388672,15.1669922L8.9208984,5.5l2.5019531,4.3330078L5.8417969,19.5L3.3388672,15.1669922z M17.8701172,20H6.7080078l2.5020142-4.3330078h11.1621094L17.8701172,20z" fill="#718096" stroke-width="1.5"></path></svg>
                    Google Drive</a>
                }

                <a onClick={() => {
                  setOpenDropdown(false);
                  setFileModal(true);
                }} >
                  <svg width={17} height={14} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <title></title>
                      <g id="Complete">
                        <g id="F-File">
                          <g id="Add">
                            <path d="M18,22H6a2,2,0,0,1-2-2V4A2,2,0,0,1,6,2h7.1a2,2,0,0,1,1.5.6l4.9,5.2A2,2,0,0,1,20,9.2V20A2,2,0,0,1,18,22Z" fill="none" id="File" stroke="#718096" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
                            <line fill="none" stroke="#718096" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="12" x2="12" y1="17" y2="11"></line>
                            <line fill="none" stroke="#718096" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" x1="9" x2="15" y1="14" y2="14"></line>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  {i18n.file}
                </a>
              </div>}



              <button
                className="pv-btn pv-btn-medium pv-bg-stroke pv-bg-shadow pv-bg-hover-shadow"
                onClick={() => props.openForm("new")}
              >
                <svg width={12} height={12} viewBox="0 0 12 12">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.97636 1.90264C8.11473 1.75937 8.28025 1.6451 8.46326 1.56648C8.64626 1.48787 8.84309 1.44649 9.04226 1.44476C9.24143 1.44303 9.43895 1.48098 9.62329 1.5564C9.80764 1.63182 9.97512 1.7432 10.116 1.88404C10.2568 2.02488 10.3682 2.19236 10.4436 2.3767C10.519 2.56105 10.557 2.75857 10.5552 2.95774C10.5535 3.15691 10.5121 3.35374 10.4335 3.53674C10.3549 3.71975 10.2406 3.88527 10.0974 4.02364L7.84736 6.27364C7.56607 6.55484 7.18461 6.71282 6.78686 6.71282C6.38912 6.71282 6.00766 6.55484 5.72636 6.27364C5.58491 6.13702 5.39546 6.06142 5.19881 6.06313C5.00217 6.06484 4.81406 6.14372 4.675 6.28277C4.53594 6.42183 4.45707 6.60994 4.45536 6.80658C4.45365 7.00323 4.52925 7.19268 4.66586 7.33414C5.22845 7.89655 5.99137 8.21249 6.78686 8.21249C7.58236 8.21249 8.34528 7.89655 8.90786 7.33414L11.1579 5.08414C11.7043 4.51833 12.0067 3.76052 11.9999 2.97393C11.9931 2.18734 11.6775 1.4349 11.1213 0.87868C10.5651 0.322456 9.81266 0.00694867 9.02607 0.000113408C8.23948 -0.00672185 7.48167 0.295661 6.91586 0.842135L5.79086 1.96714C5.71923 2.03632 5.6621 2.11908 5.62279 2.21058C5.58348 2.30209 5.56279 2.4005 5.56193 2.50008C5.56106 2.59967 5.58004 2.69843 5.61775 2.7906C5.65546 2.88277 5.71115 2.96651 5.78157 3.03693C5.85199 3.10735 5.93573 3.16304 6.0279 3.20075C6.12007 3.23846 6.21883 3.25744 6.31841 3.25657C6.418 3.25571 6.51641 3.23502 6.60792 3.19571C6.69942 3.15641 6.78218 3.09927 6.85136 3.02764L7.97636 1.90264ZM4.22636 5.65264C4.50766 5.37143 4.88912 5.21346 5.28686 5.21346C5.68461 5.21346 6.06607 5.37143 6.34736 5.65264C6.41655 5.72427 6.49931 5.7814 6.59081 5.82071C6.68231 5.86002 6.78073 5.88071 6.88031 5.88157C6.9799 5.88244 7.07866 5.86346 7.17083 5.82575C7.263 5.78804 7.34674 5.73235 7.41716 5.66193C7.48758 5.59151 7.54327 5.50777 7.58098 5.4156C7.61869 5.32343 7.63767 5.22467 7.6368 5.12508C7.63594 5.0255 7.61525 4.92709 7.57594 4.83558C7.53663 4.74408 7.4795 4.66132 7.40786 4.59214C6.84528 4.02972 6.08236 3.71378 5.28686 3.71378C4.49137 3.71378 3.72845 4.02972 3.16586 4.59214L0.915865 6.84214C0.629334 7.11888 0.400787 7.44991 0.24356 7.81592C0.0863335 8.18193 0.00357472 8.57559 0.00011327 8.97393C-0.00334818 9.37227 0.0725569 9.76731 0.2234 10.136C0.374242 10.5047 0.597002 10.8396 0.87868 11.1213C1.16036 11.403 1.49531 11.6258 1.864 11.7766C2.23269 11.9274 2.62773 12.0033 3.02607 11.9999C3.42441 11.9964 3.81807 11.9137 4.18408 11.7564C4.55009 11.5992 4.88112 11.3707 5.15786 11.0841L6.28286 9.95914C6.3545 9.88995 6.41163 9.80719 6.45094 9.71569C6.49025 9.62419 6.51094 9.52577 6.5118 9.42619C6.51267 9.3266 6.49369 9.22784 6.45598 9.13567C6.41827 9.0435 6.36258 8.95976 6.29216 8.88934C6.22174 8.81892 6.138 8.76323 6.04583 8.72552C5.95366 8.68781 5.8549 8.66883 5.75531 8.6697C5.65573 8.67056 5.55731 8.69125 5.46581 8.73056C5.37431 8.76987 5.29155 8.827 5.22236 8.89864L4.09736 10.0236C3.95899 10.1669 3.79348 10.2812 3.61047 10.3598C3.42747 10.4384 3.23064 10.4798 3.03147 10.4815C2.8323 10.4832 2.63478 10.4453 2.45043 10.3699C2.26609 10.2944 2.09861 10.1831 1.95777 10.0422C1.81693 9.90139 1.70555 9.73391 1.63013 9.54957C1.55471 9.36522 1.51676 9.1677 1.51849 8.96853C1.52022 8.76936 1.5616 8.57254 1.64021 8.38953C1.71883 8.20652 1.8331 8.04101 1.97636 7.90264L4.22636 5.65264Z"
                    fill="#718096"
                  />
                </svg>
                {ndpv.i18n.add} {i18n.link}
              </button>
              <br />
              {false && (
                <div className="pv-buttons-group pv-mb-20">
                  <button className="pv-btn pv-btn-icon pv-bg-hover-shadow pv-mr-5">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                      <path
                        d="M12.9999 9H2.99988C2.72374 9 2.49988 9.22386 2.49988 9.5V12C2.49988 12.2761 2.72374 12.5 2.99988 12.5H12.9999C13.276 12.5 13.4999 12.2761 13.4999 12V9.5C13.4999 9.22386 13.276 9 12.9999 9Z"
                        stroke="#718096"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.9999 3.5H2.99988C2.72374 3.5 2.49988 3.72386 2.49988 4V6.5C2.49988 6.77614 2.72374 7 2.99988 7H12.9999C13.276 7 13.4999 6.77614 13.4999 6.5V4C13.4999 3.72386 13.276 3.5 12.9999 3.5Z"
                        stroke="#718096"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="pv-btn pv-btn-icon pv-bg-hover-shadow">
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                      <path
                        d="M7 3H3V7H7V3Z"
                        stroke="#718096"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 3H9V7H13V3Z"
                        stroke="#718096"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 9H3V13H7V9Z"
                        stroke="#718096"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 9H9V13H13V9Z"
                        stroke="#718096"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {driveModal && (
        <FormDrive
          tab_id={props.tab_id}
          handleSubmit={props.handleSubmit}
          modalType={"new"}
          data={props.state.list}
          close={() => setDriveModal(false)}
        />
      )}

      {fileModal && (
        <FormFile
          tab_id={props.tab_id}
          handleSubmit={props.handleSubmit}
          modalType={"new"}
          data={props.state.list}
          close={() => setFileModal(false)}
        />
      )}

      {props.state.formModal && (
        <FormLink
          tab_id={props.tab_id}
          handleSubmit={props.handleSubmit}
          modalType={props.state.formModalType}
          data={props.state.list}
          close={props.closeForm}
        />
      )}

      {props.state.preloader ? (
        <Preloader />
      ) : (
        <Table
          tableData={lists}
          searchVal={searchVal}
          editEntry={props.openForm}
          checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }}
          deleteEntry={props.deleteEntry}
        />
      )}
    </>
  );
};
export default Crud(File, "file");
