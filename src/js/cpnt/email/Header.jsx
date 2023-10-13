import React, { lazy, useState } from "react";
const Modal = lazy(() => import('./Modal'))

const titleStyle = {
  color: " #2D3748",
  fontFamily: "Inter",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: "14px",
};

const headerStyle = {
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid #E2E8F0",
  paddingBottom: "31px",
};
/**
 * This function, Header, that renders the header section.
 *
 * @param {object} props - The properties passed to the component.
 * @returns {JSX.Element} A JSX element representing a basic structure with comments.
 */

export default function Header(props) {
  const [modalVisiblity, setModalVisiblity] = useState(false)
  return (
    <div style={headerStyle}>

      <Modal title="Awesome title" setVisibility={setModalVisiblity} visibility={modalVisiblity}>
        hello world
      </Modal>

      <div style={titleStyle}>Sent Mail</div>
      <div>
        <button onClick={() => setModalVisiblity(true)} className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow">
          New Mail
        </button>
      </div>
    </div>
  );
}
