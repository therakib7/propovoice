import React, { useState } from "react";
import { Text, Address } from "block/form/input";
import { FormWrapper, FormContent } from "block/form";
import api from "api";
import Editor from "block/editor";
import { toast } from "react-toastify";

const ccContainerStyle = {
  display: "flex",
  justifyContent: "end",
  gap: "20px",
};

const buttonStyle = {
  cursor: "pointer",
};

export default function SendForm({ setVisibility, module_id, data, parent }) {
  const [formData, setFormData] = useState({
    to: data.person.email,
    subject: "",
    message: "",
    postId:module_id
  });

  const [showCC, setShowCC] = useState(false);
  const [showBcc, setShowBcc] = useState(false);



  const sendEmail = () => {

    api
      .add("send-email", formData)
      .then((response) => {
        if (response.data.success) {
          toast.success("Email sent !");
          setVisibility(false)
          window.dispatchEvent(new Event('emailSent'));
        } else {
          toast.error("Enable to send email");
        }
        
      })
      .catch((err) => {
        toast.error("Someting went wrong");
    
      });
  };

  const handleSectionContent = (index, value = null) => {
    setFormData({ ...formData, message: value });
  };

  return (
    <div>
      <FormWrapper
        submitPreloader={false}
        submitHandler={sendEmail}
        submitLabel="Send"
        close={false}
      >
        <FormContent formStyleClass="pv-form-style-one">
          <div className="row">
            <Text
              label={"To"}
              disabled={true}
              id="field-to"
              type="email"
              name="email-to"
              wrapperClassName="col-md"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              validation={{ required: { value: true } }}
            />
          </div>
          <div style={ccContainerStyle}>
            <div onClick={() => setShowCC(true)} style={buttonStyle}>
              Add CC
            </div>
            <div onClick={() => setShowBcc(true)} style={buttonStyle}>
              Add Bcc
            </div>
          </div>

          {/* CC input field */}
          {showCC && (
            <div className="row">
              <Text
                label={"CC"}
                id="field-cc"
                type="text"
                name="email-cc"
                wrapperClassName="col-md"
                value={formData.cc ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, cc: e.target.value })
                }
                validation={{ required: { value: true } }}
              />
            </div>
          )}

          {/* CC input field */}
          {showBcc && (
            <div className="row">
              <Text
                label={"Bcc"}
                id="field-bcc"
                type="text"
                name="email-bcc"
                wrapperClassName="col-md"
                value={formData.bcc ?? ""}
                onChange={(e) =>
                  setFormData({ ...formData, bcc: e.target.value })
                }
                validation={{ required: { value: true } }}
              />
            </div>
          )}

          <div className="row">
            <Text
              label={"Subject"}
              id="field-subject"
              type="text"
              name="email-subject"
              wrapperClassName="col-md"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              validation={{ required: { value: true } }}
            />
          </div>

          <div className="row">
            <div className="col-md">
              <label htmlFor="field-message">Write Message </label>
              <Editor
                key={10}
                value={formData.message}
                index={10}
                changeHandler={handleSectionContent}
              />
            </div>
          </div>
        </FormContent>
      </FormWrapper>
    </div>
  );
}
