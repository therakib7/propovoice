import { useState } from "react";
import { SvgIcon, Button } from "../html-elements";
import MediaSelector from "./MediaSelector";

export default function Signature({}) {
  const [signature, setSignature] = useState()

  const uploadIcon = (<svg width={25} height={25} viewBox="0 0 14 14" fill="none">
    <path
      d="M3.66824 10.0907C3.01193 10.0915 2.37842 9.85536 1.88909 9.42768C1.39976 9 1.08901 8.41081 1.01638 7.773C0.943746 7.13518 1.11434 6.49358 1.49547 5.97112C1.87661 5.44866 2.44148 5.08208 3.08188 4.94161C2.89659 4.09662 3.06217 3.21426 3.5422 2.48865C4.02223 1.76304 4.77738 1.25361 5.64153 1.07243C6.50568 0.891248 7.40804 1.05316 8.1501 1.52254C8.89217 1.99193 9.41315 2.73034 9.59844 3.57533H9.66507C10.4913 3.57451 11.2883 3.87392 11.9014 4.41541C12.5146 4.9569 12.9001 5.70185 12.9831 6.50564C13.0662 7.30943 12.8408 8.11472 12.3508 8.76517C11.8608 9.41562 11.1411 9.86483 10.3314 10.0256M8.99875 8.13612L6.99981 6.1815M6.99981 6.1815L5.00087 8.13612M6.99981 6.1815V13"
      stroke="#4C6FFF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>)

  const viewSignatureButton = () => {
    return (
      <>
        <Button
          label="Authorized signature"
          iconName="upload"
        />
        <button
          className={"pv-btn pv-bg-stroke pv-bg-hover-stroke "}
          onClick={(e) => {}}
          style={{
            padding: "10px 20px",
            border: "1px solid #E2E8F0",
          }}
        >
          {uploadIcon}
          <span>Authorized signature</span>
        </button>
      </>
    )

  }


  const i18n = ndpv.i18n;

  return (
    <>
      {!signature && viewSignatureButton()}
      {true &&
        (
          <MediaSelector
            title={i18n.aSign}
            attachType="signature"
          />
        )
      }
    </>);
}
