import React, { useState, useEffect } from "react";
import { Text } from "block/form/input";
import { FormWrapper, FormContent } from "block/form";
import api from "api";
import pro from "block/pro-alert";
import Editor from "block/editor";
import { toast } from "react-toastify";
import DropdownIcon from './dropdown-icon';

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
    postId: module_id
  });

  const [items, setItems] = useState([]);

  const [showCC, setShowCC] = useState(false);
  const [showBcc, setShowBcc] = useState(false);

  const [dropdown, showDropdown] = useState(false);

  useEffect(() => {
    api.add("custom-email-templates").then((response) => {
      console.log(response.data)
      setItems(response.data);
    });
  }, []);

  const sendEmail = () => {

    if (wage.length > 0) {
      pro();
      return;
    }
    
    api
      .add("send-email", formData)
      .then((response) => {
        if (response.data.success) {
          toast.success("Email sent");
          setVisibility(false)
          window.dispatchEvent(new Event('emailSent'));
        } else {
          toast.error("Unable to send email");
        }

      })
      .catch((err) => {
        toast.error("Someting went wrong");

      });
  };

  const handleSectionContent = (index, value = null) => {
    setFormData({ ...formData, message: value });
  };

  const setSavedTemplate = (e, i) => {

    e.preventDefault();
    setFormData({
      to: data.person.email,
      subject: i.subject,
      message: i.message,
      postId: module_id
    })
    // setFormData({ ...formData, subject: i.subject });

    // setFormData({ ...formData, message: item.message });
    // console.log(i.subject);
    console.log(i.message);  
   
  }

  return (
    <div>
      <FormWrapper
        submitPreloader={false}
        submitHandler={sendEmail}
        submitLabel="Send"
        isPro={true}
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div><label htmlFor="field-message">Write Message </label></div>
                <div onClick={() => showDropdown(!dropdown)} style={{display:'flex', position: 'relative',cursor: 'pointer' }}>
                  <div >Select Email Template</div>
                  <DropdownIcon />
                  {dropdown &&

                    <div style={{ right: '0px' }} className="pv-dropdown-content pv-show">

                      {items.map((item, i) => {
                        return <a onClick={(e) => { setSavedTemplate(e, item) }} key={i} href="#">
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontWeight: '500', fontSize: '12px' }}>{item.name}</div>

                            </div>
                          </div>
                        </a>
                      })}
                    </div>
                  }
                </div>
              </div>

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
