import Modal from "./Modal"

export default function MediaSelector({ title, modalButtons }) {
  return (
    <>
      <Modal
        title={title}
        buttons={modalButtons}
      >
        Children
      </Modal >
    </>

  )
}
