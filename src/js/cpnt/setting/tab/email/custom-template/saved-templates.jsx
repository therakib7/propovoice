import React, { lazy, useEffect, useState } from "react";
import api from "api";
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
  paddingBottom: "12px",
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

export default function SavedTemplates() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getEmailTemplates();
  }, []);

  useEffect(() => {
    // Add an event listener when the component mounts
    const mailSentEvent = (event) => {
      getEmailTemplates();
    };

    window.addEventListener("emailSaved", mailSentEvent);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("emailSaved", mailSentEvent);
    };
  }, []);

  const getEmailTemplates = () => {
    api.get("custom-email-templates").then((response) => {
      setItems(response.data);
    });
  };

  const deleteLog = (id) => {
    api.add("delete-email-logs", { id: id }).then((res) => {
        getEmailTemplates();
    });
  };

  return (
    <div>
      {/* items */}
      {items.map((item, index) => {
        return (
          <div key={index} style={itemStyle}>
            {/* content */}
            <div>
              <div style={subjectStyle}>Subject: {item.subject}</div>
              <div
                style={contentStyle}
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
            {/* actions */}
            <div style={actionStyle}>
              <button
                onClick={() => deleteLog(item.id)}
                style={deleteButtonStyle}
              >
                <DeleteIcon />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
