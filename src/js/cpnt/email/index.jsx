import React, { lazy } from "react";

const Header = lazy(() => import("./Header"));
const SentEmailsList = lazy(() => import("./SentEmails"));

/**
 * This function, Email, that renders the email
 * functionaly for individula moduel of the plugin.
 *
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A JSX element representing a basic structure with comments.
 */
export default function Email({module_id,data,parent}) {
  console.log(module_id)
  console.log(data)
  console.log(parent)
  return (
    <div>
      <Header />
      <SentEmailsList />
    </div>
  );
}
