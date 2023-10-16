import React, { useState } from "react";
import { Text, Address } from 'block/form/input';
import { FormWrapper, FormContent } from "block/form";


export default function SendForm({ setVisibility }) {

    const [formData, setFormData] = useState({
        to: '',
        subject: '',
        message: '',    
    })



    const sendEmail = () => {
        console.log(formData)
    }


    return <div>

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
                        id="field-to"
                        type="email"
                        name="email-to"
                        wrapperClassName="col-md"
                        value={formData.to}
                        onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                        validation={{ required: { value: true } }}
                    />
                </div>

                <div className="row">
                    <Text
                        label={"Subject"}
                        id="field-subject"
                        type="text"
                        name="email-subject"
                        wrapperClassName="col-md"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value })}
                        validation={{ required: { value: true } }}
                    />
                </div>

                <div className="row">
                    <div className="col-md">
                        <label htmlFor="field-message">Write Message </label>

                        <textarea id="field-message" name="email-message" onChange={(e) => setFormData({ ...formData, message: e.target.value })} value={formData.message} />
                    </div>
                </div>

            </FormContent>
        </FormWrapper>

    </div>
}