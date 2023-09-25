import { useEffect, useState } from "react";
import { Button } from "block/form/input";
import MediaSelector from "./MediaSelector";
import Api from "api/media";

export default function Signature({ data, changeHandler, handleRemoveSign }) {
  const [showModal, setShowModal] = useState(false)
  const [sign, setSign] = useState(data)
  useEffect(() => {
    if (!data?.id) {
      getDefaultSignature();
    }
  }, [])

  const getDefaultSignature = () => {
    Api.getDefaultAttachment("signature").then((resp) => {
      if (resp.data) {
        const respData = resp.data
        const defaultSign = { id: respData?.ID, src: respData?.guid, type: respData?.post_mime_type }
        setSign(defaultSign);
        changeHandler(defaultSign)
      }
    })
  }

  const handleSignButton = () => {
    setShowModal(true);
  }


  const viewSignatureButton = () => {
    const i18n = ndpv.i18n;
    return (
      <>
        <Button
          label={i18n.authSign}
          iconName="upload"
          handleClick={handleSignButton}
          buttonStyle="white"
          size="medium"

        />
      </>
    )

  }
  const viewSignThumb = (
    <>
      <div className="pv-field-logo " style={{ position: "relative", border: "1px solid #dfdfdf", padding: "2px", display: 'inline-block' }}>
        <img src={sign?.src} width="300" height="80" />
        {(
          <div
            className="pv-field-logo-close"
            style={{ position: "absolute", top: "-5px", right: "-5px", cursor: "pointer", zIndex: "10", textAlign: "center", border: "1px solid #dfdfdf", borderRadius: "50%", backgroundColor: "white", width: "22px", height: "22px" }}
            onClick={() => {
              setSign(null)
              changeHandler(null)
              handleRemoveSign
            }
            }
          >
            ×
          </div>
        )}
      </div>
    </>
  )


  const i18n = ndpv.i18n;

  return (
    <>
      {!sign && viewSignatureButton()}
      {sign && viewSignThumb}

      {showModal &&
        (
          <MediaSelector
            title={i18n.authSign}
            attachType="signature"
            showModal={showModal}
            setShowModal={setShowModal}
            changeHandler={changeHandler}
            setMedia={setSign}
          />
        )
      }
    </>);
}
