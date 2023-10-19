import { Button } from "block/form/input";
import { Svg } from "block/icon";
export default function Modal({
  title,
  children,
  buttons = [],
  showModal,
  setShowModal = () => {},
  isFileSelected,
}) {
  const viewModalHeader = (
    <div className="pv-modal-header">
      <h2 className="pv-modal-title pv-text-center">{title}</h2>
      <span className="pv-close" onClick={() => setShowModal(false)}>
        <Svg name="x" style="blue" />
      </span>
    </div>
  );

  const viewModalFooter = (
    <div style={{ padding: "0 50px 30px" }}>
      {buttons
        .filter((button) => {
          if (isFileSelected) {
            return true;
          } else {
            return button.slug !== "insert" && button.slug !== "remove";
          }
        })
        .map((button, index) => {
          return <Button key={index} {...button} />;
        })}
    </div>
  );

  return (
    <>
      {showModal && (
        <div className="pv-overlay pv-show">
          <div className="pv-modal-content">
            {viewModalHeader}
            <div
              className="pv-content"
              style={{ paddingBottom: "30px", textAlign: "left" }}
            >
              <div>{children}</div>
            </div>
            {viewModalFooter}
          </div>
        </div>
      )}
    </>
  );
}
