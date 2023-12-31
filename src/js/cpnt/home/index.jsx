import React, { Suspense, lazy, useRef, useCallback, useState } from "react";
import useClickOutside from "block/outside-click";
import Dropdown from "block/dropdown";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter, Routes, Route } from "react-router-dom";

import Nav from "./Nav";

import Spinner from "block/preloader/spinner";
const Dashboard = lazy(() => import("cpnt/dashboard"));
const Client = lazy(() => import("cpnt/client"));

const Lead = lazy(() => import("cpnt/lead"));
const Deal = lazy(() => import("cpnt/deal"));
const Task = lazy(() => import("cpnt/task"));
const Message = lazy(() => import("cpnt/message"));
const ListSingle = lazy(() => import("cpnt/list-single"));

const Project = lazy(() => import("cpnt/project"));
//const Proposal = lazy(() => import('cpnt/proposal'));
//const Editor = lazy(() => import('cpnt/editor'));

const Invoice = lazy(() => import("cpnt/invoice/list"));
const InvoiceSingle = lazy(() => import("cpnt/invoice/single"));
const InvoiceSubscription = lazy(() =>
  import("cpnt/invoice/single/subscription"),
);

const ContactPerson = lazy(() => import("cpnt/contact/person"));
// const ContactOrg = lazy(() => import('cpnt/contact/org'));
// const ContactSummary = lazy(() => import('cpnt/contact/summary'));

const Setting = lazy(() => import("cpnt/setting"));

const ProModal = lazy(() => import("block/pro-alert/modal"));

export default () => {
  const contentRef = useRef();
  const dropdownRef = useRef();
  const notificationDropdownRef = useRef();
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownClose = useCallback(() => setDropdown(false), []);
  const notificationDropdownClose = useCallback(
    () => setNotificationDropdown(false),
    [],
  );
  useClickOutside(dropdownRef, dropdownClose);
  useClickOutside(notificationDropdownRef, notificationDropdownClose);

  const sidebarRef = useRef();
  const [sidebar, setSidebar] = useState(false);
  const sidebarClose = useCallback(() => setSidebar(false), []);
  useClickOutside(sidebarRef, sidebarClose);

  const boardView = (load = true) => {
    const span = contentRef.current; // corresponding DOM node
    if (load) {
      span.className = "pv-right-content-data pv-board-area";
    } else {
      span.className = "pv-right-content-data";
    }
  };

  const [modules, setModules] = useState(["estimate", "quotation", "invoice"]);
  const { i18n, caps } = ndpv;

  const profileDropdownList = [
    {
      label: i18n.logout,
      url: ndpv.profile.logout,
    },
  ];

  const navBarStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px",
    gap: "16px",
  };

  const notificationIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
    >
      <path fill="none" d="M0 0h24v24H0V0z" />
      <path
        fill="#4C6FFF"
        d="M18 16v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.68-1.5-1.51-1.5S10.5 3.17 10.5 4v.68C7.63 5.36 6 7.92 6 11v5l-1.3 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16zm-6.01 6c1.1 0 2-.9 2-2h-4a2 2 0 002 2zM6.77 4.73c.42-.38.43-1.03.03-1.43a1 1 0 00-1.39-.02 10.424 10.424 0 00-3.27 6.06c-.09.61.38 1.16 1 1.16.48 0 .9-.35.98-.83a8.44 8.44 0 012.65-4.94zM18.6 3.28c-.4-.37-1.02-.36-1.4.02-.4.4-.38 1.04.03 1.42 1.38 1.27 2.35 3 2.65 4.94.07.48.49.83.98.83.61 0 1.09-.55.99-1.16-.38-2.37-1.55-4.48-3.25-6.05z"
      />
    </svg>
  );
  return (
    <HashRouter>
      <ToastContainer hideProgressBar />
      <Suspense fallback={""}>
        <ProModal />
      </Suspense>

      <div className="pv-grid-container pv-main-content">
        <div
          ref={sidebarRef}
          className={"pv-left-sidebar " + (sidebar ? "pv-menu-open" : "")}
        >
          <div className="">
            <div className="pv-logo-content pv-site-logo">
              {ndpv.logo ? (
                <img src={ndpv.logo.src} alt="logo" />
              ) : (
                <>
                  <img src={ndpv.assetImgUri + "site-logo.png"} alt="logo" />
                  <strong>Propovoice</strong>
                </>
              )}
            </div>
            <div className="pv-sidebar-menu dpv-collapse-menu">
              <Nav />

              {!caps.includes("ndpv_client_role") && (
                <div className="pv-menu-buttons">
                  {false && (
                    <a
                      href="https://propovoice.com/affilite"
                      target="_blank"
                      className="pv-btn pv-btn-big pv-bg-blue pv-bg-hover-blue pv-bg-shadow"
                    >
                      Refer &amp; Earn
                    </a>
                  )}
                  <a
                    href={ndpv.dashboard}
                    className="pv-btn pv-btn-big pv-bg-stroke pv-bg-hover-stroke pv-bg-shadow"
                  >
                    {i18n.back_t_db}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pv-right-content pv-bg-pearl">
          <div className="pv-top-menu-content">
            <div className="pv-width-content">
              <div
                ref={sidebarRef}
                className="pv-menubar-icon"
                onClick={() => setSidebar((val) => !val)}
              >
                <svg viewBox="0 0 100 80" width={20} height={25}>
                  <rect width={100} height={12} />
                  <rect y={29} width={100} height={12} />
                  <rect y={57} width={100} height={12} />
                </svg>
              </div>
              <div className="pv-search-box" style={{ visibility: "hidden" }}>
                <svg width={24} height={24}>
                  <path
                    d="M10.77 18.3C9.2807 18.3 7.82485 17.8584 6.58655 17.031C5.34825 16.2036 4.38311 15.0275 3.81318 13.6516C3.24325 12.2757 3.09413 10.7616 3.38468 9.30096C3.67523 7.84029 4.39239 6.49857 5.44548 5.44548C6.49857 4.39239 7.84029 3.67523 9.30096 3.38468C10.7616 3.09413 12.2757 3.24325 13.6516 3.81318C15.0275 4.38311 16.2036 5.34825 17.031 6.58655C17.8584 7.82485 18.3 9.2807 18.3 10.77C18.3 11.7588 18.1052 12.738 17.7268 13.6516C17.3484 14.5652 16.7937 15.3953 16.0945 16.0945C15.3953 16.7937 14.5652 17.3484 13.6516 17.7268C12.738 18.1052 11.7588 18.3 10.77 18.3V18.3ZM10.77 4.74999C9.58331 4.74999 8.42327 5.10189 7.43657 5.76118C6.44988 6.42046 5.68084 7.35754 5.22672 8.45389C4.77259 9.55025 4.65377 10.7566 4.88528 11.9205C5.11679 13.0844 5.68824 14.1535 6.52735 14.9926C7.36647 15.8317 8.43556 16.4032 9.59945 16.6347C10.7633 16.8662 11.9697 16.7474 13.0661 16.2933C14.1625 15.8391 15.0995 15.0701 15.7588 14.0834C16.4181 13.0967 16.77 11.9367 16.77 10.75C16.77 9.15869 16.1379 7.63257 15.0126 6.50735C13.8874 5.38213 12.3613 4.74999 10.77 4.74999Z"
                    fill="#718096"
                  />
                  <path
                    d="M20 20.75C19.9014 20.7505 19.8038 20.7312 19.7128 20.6935C19.6218 20.6557 19.5392 20.6001 19.47 20.53L15.34 16.4C15.2075 16.2578 15.1354 16.0698 15.1388 15.8755C15.1422 15.6812 15.2209 15.4958 15.3583 15.3584C15.4958 15.221 15.6811 15.1422 15.8754 15.1388C16.0697 15.1354 16.2578 15.2075 16.4 15.34L20.53 19.47C20.6704 19.6106 20.7493 19.8012 20.7493 20C20.7493 20.1987 20.6704 20.3894 20.53 20.53C20.4607 20.6001 20.3782 20.6557 20.2872 20.6935C20.1961 20.7312 20.0985 20.7505 20 20.75Z"
                    fill="#718096"
                  />
                </svg>
                <input
                  type="text"
                  className="pv-search-input"
                  placeholder="Search Contact, Invoice, Proposal "
                />
              </div>
              <div className="pv-avater" style={navBarStyle}>
                {true && (
                  <Dropdown
                    isSvgIcon={true}
                    icon={notificationIcon}
                    list={[]}
                    purpose="notification"
                  />
                )}
                <Dropdown
                  isSvgIcon={false}
                  icon={ndpv.profile.img}
                  label={ndpv.profile.name}
                  list={profileDropdownList}
                />
              </div>
            </div>
          </div>

          <div className="pv-right-content-data" ref={contentRef}>
            {wagex.exp && (
              <p className="ndpv-license-expired">
                Your license key has expired! Please activate with new license.
              </p>
            )}
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/proposal" element={<Proposal />} /> */}
                {/* <Route path="/proposal" element={<Editor />} /> */}

                <Route path="/client" exact element={<Client />} />
                <Route path="/client/:id" exact element={<ListSingle />} />

                <Route path="/lead" exact element={<Lead />} />
                <Route path="/lead/:id" exact element={<ListSingle />} />

                <Route
                  path="/deal"
                  exact
                  element={<Deal onLoad={boardView} />}
                />
                <Route path="/deal/:id" exact element={<ListSingle />} />

                <Route path="/task" exact element={<Task />} />
                <Route path="/task/:id" exact element={<ListSingle />} />

                <Route path="/message" exact element={<Message />} />

                <Route
                  path="/project"
                  exact
                  element={<Project onLoad={boardView} />}
                />
                <Route path="/project/:id" exact element={<ListSingle />} />

                {modules.map((mod) => (
                  <React.Fragment key={mod.toString()}>
                    <Route path={`/${mod}`} element={<Invoice />} />
                    <Route path={`/${mod}/new`} element={<InvoiceSingle />} />
                    <Route path={`/${mod}/:id`} element={<InvoiceSingle />} />
                    <Route
                      path={`/${mod}/:id/tab/:tab`}
                      element={<InvoiceSingle />}
                    />
                  </React.Fragment>
                ))}
                <Route
                  path={"/invoice/:id/subscription"}
                  element={<InvoiceSubscription />}
                />

                <Route path="/contact" exact element={<ContactPerson />} />
                {/* <Route path="/contact/organization" exact element={<ContactOrg />} /> */}
                <Route path="/contact/:id" exact element={<ListSingle />} />

                <Route path="/setting" element={<Setting />} />
                <Route path="/setting/:tab" element={<Setting />} />
                <Route path="/setting/:tab/:subtab" element={<Setting />} />
                <Route
                  path="/setting/:tab/:subtab/:insubtab"
                  element={<Setting />}
                />
                {/* <Route path="/help" element={<Help />} /> */}
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </HashRouter>
  );
};
