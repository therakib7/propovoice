import React, { Component, Suspense, lazy } from "react";
import Breadcrumb from "block/breadcrumb";
import Spinner from "block/preloader/spinner";
const Task = lazy(() => import("cpnt/list-single/tab/task"));

export default (props) => {
  const i18n = ndpv.i18n;
  return (
    <div className="ndpv-cpnt">
      <Breadcrumb title={ndpv.i18n.taska} />
      <div className="row">
        <div className="col-lg">
          <h2 className="pv-page-title">{i18n.taska}</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="pv-horizontal-tab">
            <ul className="pv-tabs">
              <li className={"pv-tab "}>{i18n.taska}</li>
            </ul>

            <div className="pv-tab-content">
              <Suspense fallback={<Spinner />}>
                <Task tab_id={null} source />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
