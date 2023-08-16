import { Icon, Button } from "../html-elements";
export default function Modal(props) {
  const viewModalHeader = (
    < div className="pv-modal-header" >
      <h2 className="pv-modal-title pv-text-center">Media modal</h2>
      <span className="pv-close" onClick={() => props.close()}>
        <Icon name="x" />
      </span>
    </div >
  )

  const viewModalFooter = (
    <div style={{ padding: "0 50px 30px" }}>
      <Button />

      <button
        className={'pv-btn pv-bg-air-white pv-bg-hover-blue pv-hover-color-white pv-bg-blue pv-color-white'}
        onClick={(e) => { e.preventDefault(); }}
      >
        <svg
          width={12}
          height={12}
          viewBox="0 0 12 12"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.976 1.903a1.5 1.5 0 112.121 2.12l-2.25 2.25a1.5 1.5 0 01-2.12 0 .75.75 0 00-1.061 1.061 3 3 0 004.242 0l2.25-2.25A3 3 0 006.916.842L5.79 1.967a.75.75 0 101.06 1.06l1.125-1.124zm-3.75 3.75a1.5 1.5 0 012.121 0 .75.75 0 101.06-1.06 3 3 0 00-4.241 0l-2.25 2.25a3 3 0 104.242 4.241L6.283 9.96a.75.75 0 10-1.06-1.06l-1.126 1.125a1.5 1.5 0 11-2.12-2.121l2.25-2.25z"
            fill="#18181B"
          />
        </svg>
        Gallery
      </button>
    </div>)

  return (
    <>

      <div className="pv-overlay pv-show">
        <div className="pv-modal-content">
          {viewModalHeader}
          <div className="pv-content" style={{ paddingBottom: "30px", textAlign: "left" }}>
            <div>Content body</div>

          </div>
          {viewModalFooter}
        </div>
      </div>
    </>
  )

}
