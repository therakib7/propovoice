import React, { lazy } from "react";

/**
 * প্রয়োজনে অপটিমাইজেশনের জন্য "SentEmails" কম্পোনেন্টটি ইমপোর্ট হয়.
 */

const SentEmailsList = lazy(() => import("./SentEmails"));

/**
 * This function, Email, that renders the email
 * functionaly for individula moduel of the plugin.
 *
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A JSX element representing a basic structure with comments.
 */
export default function Email(props) {
  console.log(props);
  return (
    <div>
      Email is here
      <SentEmailsList />
    </div>
  );
}
