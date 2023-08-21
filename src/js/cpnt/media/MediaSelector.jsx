import { useRef, useState } from "react"
import Modal from "./Modal"
import Api from "api/media";
import { toast } from "react-toastify";

export default function MediaSelector({ title, attachType }) {

  const fileInputRef = useRef(null);
  const handleSelect = () => {
    alert("Select button clicked")
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const getAttachment = () => {
    Api.getAttachment("attach_type=signature").then((resp) => {
      console.log(resp);
    })

  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleUpload(selectedFile)
  }
  const handleUpload = (selectedFile) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("attach_type", attachType);
    formData.append("permission", true);

    Api.create(formData).then((resp) => {
      if (resp.data.success) {
        console.log("file uploaded")
        // this.props.changeHandler(resp.data.data);
      } else {
        resp.data.data.forEach(function (value) {
          toast.error(value);
        });
      }
    });
  }
  const handleRemove = () => {
    alert("Remove button clicked")
  }

  const modalButtons = [

    {
      label: "Remove",
      iconName: "x",
      size: "medium",
      handleClick: handleRemove,
    }, {
      label: "Upload",
      iconName: "upload",
      size: "medium",
      handleClick: handleButtonClick,
    },
    {
      label: "Select",
      iconName: "tick",
      size: "medium",
      handleClick: handleSelect,
    }
  ]

  return (
    <>
      <Modal
        title={title}
        buttons={modalButtons}
      >
        {getAttachment()}
        <MediaThumb imgUrl="https://placehold.co/600x400" />
        <MediaThumb imgUrl="https://placehold.co/600x400" />
        <MediaThumb imgUrl="https://placehold.co/600x400" />
        <MediaThumb imgUrl="https://placehold.co/600x400" />
        <MediaThumb imgUrl="https://placehold.co/600x400" />
        <MediaThumb imgUrl="https://placehold.co/600x400" />
        <MediaThumb imgUrl="https://placehold.co/600x400" />

      </Modal >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>

  )
}

function MediaThumb({ imgUrl }) {
  return (<div style={{ display: "inline-block", margin: "5px" }}>
    <img src={imgUrl} width="100" />
  </div>)
}
