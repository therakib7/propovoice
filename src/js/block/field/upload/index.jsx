import React, { Component } from "react";
import { toast } from "react-toastify";

import AppContext from "context/app-context";
import Api from "api/media";
import Media from "cpnt/media";
import ModalImage from "react-modal-image";

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
      if (this.props.multiple) {
        this.props.changeHandler(id, true);
      } else {
        this.props.changeHandler(null);
      }

      Api.remove(id).then((resp) => {
        if (resp.data.success) {
          // toast.success(ndpv.i18n.aDel);
        } else {
          resp.data.data.forEach(function (value) {
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
        resp.data.data.forEach(function (value) {
          toast.error(value);
        });
      }
    });
  };

  render = () => {
    const data = this.props.data;
    const multiple = this.props.multiple;
    const clipOnly = this.props.clipOnly;

    let label = this.props.label;
    label = label ? label : ndpv.i18n.upload;

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

        {data && !multiple && (
          <>
            <div className="pv-field-logo">
              {data.type == 'application/pdf' ? <a href={data.src} target="_blank">{data.name}</a> : <div style={{ width: (this.props.small ? 40 : 100), display: 'inline-block' }}>
                <ModalImage
                  small={data.src}
                  large={data.src}
                />
              </div>}

              {remove && (
                <span
                  className="pv-field-logo-close"
                  onClick={() => this.handleDelete(data.id)}
                >
                  ×
                </span>
              )}
            </div>
          </>
        )}

        {multiple && data.length > 0 && (
          <>
            {data && data.map((item, i) => {
              return (
                <div className="pv-field-logo" key={i} style={{ marginRight: 10 }}>
                  {item.type == 'application/pdf' ? item.name : <img src={item.src} width={this.props.small ? "40" : "100"} />}
                  {remove && (
                    <span
                      className="pv-field-logo-close"
                      onClick={() => this.handleDelete(item.id)}
                    >
                      ×
                    </span>
                  )}
                </div>
              );
            })}
          </>
        )}

        {(!this.props.viewOnly) && (!data || multiple) && (
          <>
            <input
              type="file"
              ref={this.inputRef}
              onChange={this.onFileChange}
              style={{
                display: 'none'
              }}
            />

            {!clipOnly && <button
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
            </button>}

            {clipOnly && <span className="pv-paper-clip" onClick={(e) => this.handleUploadFile(e)}>
              <svg
                width={15}
                height={16}
                viewBox="0 0 15 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5001 4.24894L3.99228 10.8661C3.77683 11.1039 3.66107 11.4154 3.66897 11.7362C3.67687 12.057 3.80782 12.3624 4.03471 12.5893C4.2616 12.8162 4.56705 12.9472 4.88783 12.9551C5.2086 12.963 5.52013 12.8472 5.75791 12.6318L13.5157 4.76457C13.9466 4.28901 14.1781 3.66595 14.1623 3.0244C14.1465 2.38286 13.8846 1.77195 13.4309 1.31817C12.9771 0.864391 12.3662 0.602491 11.7246 0.586696C11.0831 0.5709 10.46 0.802418 9.98447 1.23332L2.22666 9.10051C1.52425 9.80292 1.12964 10.7556 1.12964 11.7489C1.12964 12.7423 1.52425 13.695 2.22666 14.3974C2.92907 15.0998 3.88174 15.4944 4.8751 15.4944C5.86845 15.4944 6.82112 15.0998 7.52353 14.3974L13.9376 7.99894"
                  stroke="#2D3748"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>}
          </>
        )}

      </div>
    );
  };
}

export default Upload;
