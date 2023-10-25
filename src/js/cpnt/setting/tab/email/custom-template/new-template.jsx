import React, { lazy, useState } from "react";
const Modal = lazy(() => import('cpnt/email/Modal'))
const Form = lazy(()=>import('./form'))

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


export default function NewTemplate() {
  const [modalVisiblity, setModalVisiblity] = useState(false)
  return (
    <div style={headerStyle}>

      <Modal title="New Email Tempalte" setVisibility={setModalVisiblity} visibility={modalVisiblity}>
        <div>
          <Form setVisibility={setModalVisiblity} />
        </div>
      </Modal>

      <div style={titleStyle}>Email Templates</div>
      <div>
        <button onClick={() => setModalVisiblity(true)} className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow">
          Add New
        </button>
      </div>
    </div>
  );
}
