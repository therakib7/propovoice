import { lazy } from "react";
const EmailTeam = lazy(() => import("./team"));
const EmailClientPortal = lazy(() => import("./client-portal"));
const EmailLead = lazy(() => import("./lead"));
const EmailDeal = lazy(() => import("./deal"));
const EmailEstimate = lazy(() => import("./estimate"));
const EmailInvoice = lazy(() => import("./invoice"));
const EmailTask = lazy(() => import("./task"));
const EmailStaff = lazy(() => import("./staff"));
const EmailProject = lazy(() => import("./project"));
const EmailFile = lazy(() => import("./file"));

export {
  EmailClientPortal,
  EmailDeal,
  EmailEstimate,
  EmailInvoice,
  EmailLead,
  EmailTeam,
  EmailTask,
  EmailStaff,
  EmailFile,
  EmailProject,
};
