import React, { lazy } from "react";

const Header = lazy(() => import("./Header"));
const SentEmailsList = lazy(() => import("./SentEmails"));


export default function Email({module_id,data,parent}) {
  
  return (
    <div>
      <Header module_id={module_id} data={data} parent={parent} />
      <SentEmailsList module_id={module_id} />
    </div>
  );
}
