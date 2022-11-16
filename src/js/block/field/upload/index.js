import React, { Component } from "react";
import { toast } from "react-toastify";

import AppContext from "context/app-context";
import Api from "api/media";
import Media from "cpnt/media";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: false,
      edit: false,
    };

    this.inputRef = React.createRef();
  }

  static contextType = AppContext;

  componentDidUpdate() {
    /* if ( ! this.state.edit && this.props.data ) {
			this.setState({ edit: true });
		} */
  }

  handleDelete = (id) => {
    if (confirm(ndpv.i18n.aConf)) {
      this.props.changeHandler(null);

      Api.remove(id).then((resp) => {
        if (resp.data.success) {
          // toast.success(ndpv.i18n.aDel);
        } else {
          resp.data.data.forEach(function (value, index, array) {
            toast.error(value);
          });
        }
      });
    }
  };

  handlePros = (data) => {
    this.props.changeHandler(data);
  };

  handleUploadFile = (e) => {
    e.preventDefault();

    if (this.props.library) {
      this.setState({ media: true });
    } else {
      this.inputRef.current.click();
    }
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    this.maybeSetSelectedFile(event);
    this.onFileUpload(event.target.files[0]);
  };

  maybeSetSelectedFile(event) {
    if (this.props.isSelectedFile) {
      this.props.selectedFile(event.target.files[0]);
    }
  }

  onFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    if (this.props.attach_type) {
      formData.append("attach_type", this.props.attach_type);
    } else {
      formData.append("attach_type", "ndpv");
    }

    let permission = this.props.permission !== undefined ? true : false;
    formData.append("permission", permission);

    Api.create(formData).then((resp) => {
      if (resp.data.success) {
        this.props.changeHandler(resp.data.data);
      } else {
        resp.data.data.forEach(function (value, index, array) {
          toast.error(value);
        });
      }
    });
  };

  render = () => {
    const logo = this.props.data;
    let label = this.props.label;
    label = label ? label : "Upload";

    let btnClass = this.props.btnClass;
    btnClass = btnClass ? btnClass : "";

    let imgClass = this.props.imgClass;
    imgClass = imgClass ? imgClass : "";

    let remove = this.props.remove !== undefined ? false : true;
    return (
      <div className={"pv-field-logo-wrap " + imgClass}>
        {this.props.library && this.state.media && (
          <Media
            insertHandler={this.handlePros}
            show={this.state.media}
            close={() => this.setState({ media: false })}
          />
        )}

        {!logo && (
          <>
            <input
              type="file"
              ref={this.inputRef}
              onChange={this.onFileChange}
              className="d-none"
            />

            <button
              className={"pv-btn pv-bg-stroke pv-bg-hover-stroke " + btnClass}
              onClick={(e) => this.handleUploadFile(e)}
              style={{
                padding: this.props.padding ? this.props.padding : "10px 20px",
                border: "1px solid #E2E8F0",
              }}
            >
              <svg width={25} height={25} viewBox="0 0 14 14" fill="none">
                <path
                  d="M3.66824 10.0907C3.01193 10.0915 2.37842 9.85536 1.88909 9.42768C1.39976 9 1.08901 8.41081 1.01638 7.773C0.943746 7.13518 1.11434 6.49358 1.49547 5.97112C1.87661 5.44866 2.44148 5.08208 3.08188 4.94161C2.89659 4.09662 3.06217 3.21426 3.5422 2.48865C4.02223 1.76304 4.77738 1.25361 5.64153 1.07243C6.50568 0.891248 7.40804 1.05316 8.1501 1.52254C8.89217 1.99193 9.41315 2.73034 9.59844 3.57533H9.66507C10.4913 3.57451 11.2883 3.87392 11.9014 4.41541C12.5146 4.9569 12.9001 5.70185 12.9831 6.50564C13.0662 7.30943 12.8408 8.11472 12.3508 8.76517C11.8608 9.41562 11.1411 9.86483 10.3314 10.0256M8.99875 8.13612L6.99981 6.1815M6.99981 6.1815L5.00087 8.13612M6.99981 6.1815V13"
                  stroke="#4C6FFF"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{label}</span>
            </button>
          </>
        )}

        {logo && (
          <>
            <div className="pv-field-logo">
              <img src={logo.src} width={this.props.small ? "40" : "100"} />
              {remove && (
                <span
                  className="pv-field-logo-close"
                  onClick={() => this.handleDelete(logo.id)}
                >
                  ×
                </span>
              )}
            </div>
          </>
        )}
      </div>
    );
  };
}

export default Upload;
