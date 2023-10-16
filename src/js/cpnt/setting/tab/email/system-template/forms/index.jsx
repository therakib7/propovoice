import { lazy } from "react";
const EmailTeam = lazy(() => import("./team"));
const EmailClientPortal = lazy(() => import("./client-portal"));
const EmailLead = lazy(() => import("./lead"));
const EmailDeal = lazy(() => import("./deal"));
const EmailEstimate = lazy(() => import("./estimate"));
const EmailInvoice = lazy(() => import("./invoice"));

export {
  EmailClientPortal,
  EmailDeal,
  EmailEstimate,
  EmailInvoice,
  EmailLead,
  EmailTeam,
};
