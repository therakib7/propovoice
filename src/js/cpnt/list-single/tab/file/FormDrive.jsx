import React, { useState, useEffect } from "react";
import { Add } from "block/icon";
import { sprintf } from "sprintf-js";
import Upload from "block/field/upload";
import { uploadToDrive } from "api/gapi/gdrive";

export default (props) => {
  const [form, setForm] = useState({
    id: null,
    tab_id: props.tab_id,
    type: "google-drive",
    title: "",
    file: "",
    url: "",
  });

  const [driveFileId, setDriveFileId] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const [is_submit, setIsSubmit] = useState(false);

  // useEffect(() => {
  //   if (form.file && is_submit) {
  //     // uploadToDrive(selectedFile, setDriveFileId);
  //     setIsSubmit(false);
  //   }
  // }, [form.file, is_submit, driveFileId]);
  //

  useEffect(() => {
    if (form.url && !is_submit) {
      props.handleSubmit(form);
      props.close();
      setIsSubmit(true);
    }
  }, [form.url]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    uploadToDrive(selectedFile, setForm);

    // props.handleSubmit(form);
    // props.close();

    // if (driveFileId) {
    //   console.log("FileId in Form: ", driveFileId);
    //   const driveUrl = `https://drive.google.com/uc?export=view&id=${driveFileId}`;
    //   setForm((prev) => ({ ...prev, url: driveUrl }));
    //   console.log(form);
    // }
    // setIsSubmit(true);
  };

  const handleUploadChange = (data, type = null) => {
    setForm((prev) => {
      return { ...prev, file: data };
    });
  };

  const i18n = ndpv.i18n;
  const modalType =
    props.modalType == "new" ? i18n.add + " " + i18n.new : i18n.edit;

  return (
    <div className="pv-overlay pv-show">
      <div className="pv-modal-content">
        <div className="pv-modal-header pv-gradient">
          <span className="pv-close" onClick={() => props.close()}>
            <Add />
          </span>
          <h2 className="pv-modal-title">
            {modalType} {i18n.file}
          </h2>
          <p>{sprintf(i18n.formDesc, modalType, i18n.file)}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pv-content">
            <div className="pv-form-style-one">
              <div className="row">
                <div className="col-lg">
                  <label htmlFor="title">{i18n.title}</label>

                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-lg">
                  <label htmlFor="file_id">{i18n.file}</label>
                  <Upload
                    data={form.file}
                    isSelectedFile={true}
                    selectedFile={setSelectedFile}
                    changeHandler={handleUploadChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pv-modal-footer">
            <div className="row">
              <div className="col">
                <button type="reset" className="pv-btn pv-text-hover-blue" onClick={() => props.close()}>{i18n.cancel}
                </button>
              </div>
              <div className="col">
                <button
                  type="submit"
                  className="pv-btn pv-bg-blue pv-bg-hover-blue pv-btn-big pv-float-right pv-color-white"
                >
                  {i18n.save}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
