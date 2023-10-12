import React, { lazy } from "react";
const DeleteIcon = lazy(() =>
  import("cpnt/setting/tab/estinv/common/sub/icons/DeleteIcon")
);

const deleteButtonStyle = {
  border: "none",
  cursor: "pointer",
  marginLeft: "10px",
  background: "none",
};

const itemStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  paddingTop: "17px",
  paddingBottom: "19px",
  borderBottom: "1px solid #E2E8F0",
};

const actionStyle = {
  width: "30%",
  textAlign: "right",
};

const subjectStyle = {
  color: "#000",
  fontFamily: "Inter",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "14px",
  paddingBottom:"12px",
};

const contentStyle = {
  color: "#718096",
  fontFamily: "Inter",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "16px",
};
/**
 * This function, SentEmails, that renders the list of
 * sent emails list from perticular module.
 *
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A JSX element representing a basic structure with comments.
 */

export default function SentEmails(props) {
  return (
    <div>
      {/* items */}
      <div style={itemStyle}>
        {/* content */}
        <div>
          <div style={subjectStyle}>Subject: Welcome to propovoice</div>
          <div style={contentStyle}>
            Welcome to [Your Company Name]! We are thrilled to have you as our
            newest client, and we're excited to start our partnership journey.
            Here's what you can expect in the next few days....
          </div>
        </div>
        {/* actions */}
        <div style={actionStyle}>
          <button style={deleteButtonStyle}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
