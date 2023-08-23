import { useEffect, useRef, useState } from "react"
import Modal from "./Modal"
import Api from "api/media";
import { toast } from "react-toastify";

export default function MediaSelector({ title, attachType, showModal, setShowModal }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState();

  const fileInputRef = useRef(null);

  useEffect(() => {
    getAttachment(attachType);
  }, [selectedFile])

  const handleSelect = () => {
    alert("Select button clicked")
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const getAttachment = (attachType) => {
    Api.getAttachment(`attach_type=${attachType}`).then((resp) => {
      setFiles(resp.data);
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
        setSelectedFile(resp.data.data.id)
        // getAttachment(attachType);
      } else {
        resp.data.data.forEach(function (value) {
          toast.error(value);
        });
      }
    });
  }


  const handleRemove = () => {
    Api.remove(selectedFile).then((resp) => {
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
            const wrapperStyle = file.ID === selectedFile ? { border: "2px solid green", padding: "2px" } : {};
            return (< MediaThumb key={file.ID} imgID={file.ID} imgUrl={file.guid} setSelectedFile={setSelectedFile} wrapperStyle={wrapperStyle} />)
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

function MediaThumb({ imgID, imgUrl, setSelectedFile, wrapperStyle }) {
  const handleImgClick = () => {
    setSelectedFile(imgID)
  }
  return (<div style={{ display: "inline-block", margin: "5px", ...wrapperStyle }}>
    <img src={imgUrl} width="120" height="80" onClick={handleImgClick} />
  </div>)
}
