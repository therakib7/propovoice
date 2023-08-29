import { useEffect, useRef, useState } from "react"
import Modal from "./Modal"
import Api from "api/media";
import { toast } from "react-toastify";

export default function MediaSelector({ title, attachType, showModal, setShowModal, changeHandler, setMedia }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(
    {
      id: "",
      src: "",
      type: ""
    }
  );

  const fileInputRef = useRef(null);

  useEffect(() => {
    getAttachment(attachType);
  }, [selectedFile])

  const handleSelect = () => {
    if (!selectedFile.id) {
      toast.error("Select a image first!!!");
      return;
    }
    setDefaultAttachment(attachType, selectedFile.id)
    changeHandler(selectedFile);
    setMedia(selectedFile)
    setShowModal(false)
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const getAttachment = (attachType) => {
    Api.getAttachment(attachType).then((resp) => {
      setFiles(resp.data);
    })

  }
  const setDefaultAttachment = (attachType, id) => {
    Api.setDefaultAttachment(attachType, id).then((resp) => {
      // console.log(resp.data)
    })

  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleUpload(file)
  }
  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("attach_type", attachType);
    formData.append("permission", true);

    Api.create(formData).then((resp) => {
      if (resp.data.success) {
        const file = resp.data.data
        setSelectedFile({ id: file.ID, src: file.guid, type: file.post_mime_type })
        // getAttachment(attachType);
      } else {
        resp.data.data.forEach(function (value) {
          toast.error(value);
        });
      }
    });
  }


  const handleRemove = () => {
    if (!selectedFile.id) {
      toast.error("Select a image first!!!");
      return;
    }
    const isConfirm = confirm("Are you sure to remove?");
    isConfirm && Api.remove(selectedFile.id).then((resp) => {
      getAttachment(attachType);
    })
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
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {
          files.map(file => {
            const wrapperStyle = file.ID === selectedFile?.id ? { border: "2px solid green", padding: "2px" } : { border: "1px solid #dfdfdf", padding: "3px" };
            return (< MediaThumb key={file.ID} imgData={{ id: file.ID, src: file.guid, type: file.post_mime_type }} setSelectedFile={setSelectedFile} wrapperStyle={wrapperStyle} />)
          })
        }
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

function MediaThumb({ imgData, setSelectedFile, wrapperStyle }) {
  const handleImgClick = () => {
    setSelectedFile(imgData)
  }
  return (<div style={{ display: "inline-block", margin: "5px", ...wrapperStyle }}>
    <img src={imgData.src} width="120" height="32" onClick={handleImgClick} />
  </div>)
}
