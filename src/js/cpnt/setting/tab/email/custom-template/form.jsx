import React, { useState } from "react";
import { Text } from "block/form/input";
import { FormWrapper, FormContent } from "block/form";
import api from "api";
import Editor from "block/editor";
import { toast } from "react-toastify";


export default function Form({setVisibility}) {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });


  const saveTemplate = () => {

    api
      .add("save-custom-email", formData)
      .then((response) => {
        if (response.data.success) {
          toast.success("Template Saved");
          setVisibility(false)
          window.dispatchEvent(new Event('emailSaved'));
        } else {
          toast.error("Enable to save template");
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
        submitHandler={saveTemplate}
        submitLabel="Save"
        close={false}
      >
        <FormContent formStyleClass="pv-form-style-one">
          <div className="row">
            <Text
              label={"Name"}
              id="field-to"
              type="text"
              name="name"
              wrapperClassName="col-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              validation={{ required: { value: true } }}
            />
          </div>
         
          <div className="row">
            <Text
              label={"Subject"}
              id="field-subject"
              type="text"
              name="subject"
              wrapperClassName="col-md"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
          
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
