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
export default function Email(props) {
  
  return (
    <div>
      <Header />
      <SentEmailsList />
    </div>
  );
}
