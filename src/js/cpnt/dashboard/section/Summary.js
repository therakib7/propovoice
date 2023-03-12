import React, { useState, useEffect } from "react";

export default (props) => {
  const [summary, setSummary] = useState({
    total_client: 0,
    total_estimate: 0,
    accepted_estimate: 0,
    total_invoice: 0,
    paid_invoice: 0,
    total_lead: 0,
    total_deal: 0,
    total_project: 0,
  });

  useEffect(() => {
    props.getAll("dashboard", "section=summary").then((resp) => {
      if (resp.data.success) {
        setSummary(resp.data.data);
      }
    });
  }, []);

  const { i18n, caps } = ndpv;

  return (
    <div className="pv-cards pv-mt-10 pv-cards-two">
      <div className="row">
        {caps.includes("ndpv_client") && <div className="col-md-6 col-lg">
          <div className="pv-cards-content">
            <span style={{ background: "rgba(76, 111, 255, 0.12)" }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path
                  d="M12.75 13.5C14.4069 13.5 15.75 12.1569 15.75 10.5C15.75 8.84315 14.4069 7.5 12.75 7.5C11.0931 7.5 9.75 8.84315 9.75 10.5C9.75 12.1569 11.0931 13.5 12.75 13.5Z"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 10.125H5.25"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 6.375H5.25"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 13.875H5.25"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3 17.625H5.25"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.25 15.75C8.77395 15.0514 9.45336 14.4844 10.2344 14.0938C11.0155 13.7033 11.8767 13.5 12.75 13.5C13.6233 13.5 14.4845 13.7033 15.2656 14.0938C16.0466 14.4844 16.726 15.0514 17.25 15.75"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.25 20.25V3.75C20.25 3.33579 19.9142 3 19.5 3L6 3C5.58579 3 5.25 3.33579 5.25 3.75L5.25 20.25C5.25 20.6642 5.58579 21 6 21H19.5C19.9142 21 20.25 20.6642 20.25 20.25Z"
                  stroke="#4C6FFF"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>
              {summary.total_client == 0 || summary.total_client == 1
                ? i18n.total_client
                : i18n.total_clients}
            </p>
            <h4>{summary.total_client}</h4>
          </div>
        </div>}
        {caps.includes("ndpv_lead") && <div className="col-md-6 col-lg">
          <div className="pv-cards-content">
            <span style={{ background: "#f1faf1" }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path
                  d="M7.5 13C6.60998 13 5.73995 12.7361 4.99993 12.2416C4.25991 11.7471 3.68314 11.0443 3.34254 10.2221C3.00195 9.39981 2.91283 8.49501 3.08647 7.6221C3.2601 6.74918 3.68868 5.94736 4.31802 5.31802C4.94736 4.68868 5.74918 4.2601 6.62209 4.08647C7.49501 3.91283 8.39981 4.00195 9.22208 4.34254C10.0443 4.68314 10.7471 5.25991 11.2416 5.99994C11.7361 6.73996 12 7.60999 12 8.5C11.9987 9.69307 11.5241 10.8369 10.6805 11.6805C9.83689 12.5241 8.69307 12.9987 7.5 13ZM7.5 6C7.00555 6 6.5222 6.14662 6.11107 6.42133C5.69995 6.69603 5.37952 7.08648 5.1903 7.54329C5.00108 8.00011 4.95157 8.50278 5.04804 8.98773C5.1445 9.47268 5.3826 9.91814 5.73223 10.2678C6.08186 10.6174 6.52732 10.8555 7.01227 10.952C7.49723 11.0484 7.99989 10.9989 8.45671 10.8097C8.91352 10.6205 9.30397 10.3 9.57867 9.88893C9.85338 9.4778 10 8.99445 10 8.5C10 7.83696 9.73661 7.20108 9.26777 6.73223C8.79893 6.26339 8.16304 6 7.5 6ZM15 23V22.5C15 20.5109 14.2098 18.6032 12.8033 17.1967C11.3968 15.7902 9.48912 15 7.5 15C5.51088 15 3.60322 15.7902 2.1967 17.1967C0.790176 18.6032 0 20.5109 0 22.5L0 23C0 23.2652 0.105357 23.5196 0.292893 23.7071C0.48043 23.8946 0.734784 24 1 24C1.26522 24 1.51957 23.8946 1.70711 23.7071C1.89464 23.5196 2 23.2652 2 23V22.5C2 21.0413 2.57946 19.6424 3.61091 18.6109C4.64236 17.5795 6.04131 17 7.5 17C8.95869 17 10.3576 17.5795 11.3891 18.6109C12.4205 19.6424 13 21.0413 13 22.5V23C13 23.2652 13.1054 23.5196 13.2929 23.7071C13.4804 23.8946 13.7348 24 14 24C14.2652 24 14.5196 23.8946 14.7071 23.7071C14.8946 23.5196 15 23.2652 15 23ZM24 18C24 16.6487 23.6088 15.3263 22.8737 14.1924C22.1386 13.0585 21.091 12.1616 19.8574 11.61C18.6238 11.0584 17.2569 10.8756 15.9218 11.0837C14.5866 11.2919 13.3402 11.8821 12.333 12.783C12.2338 12.8702 12.1528 12.9762 12.0948 13.0949C12.0367 13.2135 12.0028 13.3425 11.9949 13.4744C11.987 13.6063 12.0053 13.7384 12.0487 13.8631C12.0922 13.9879 12.1599 14.1028 12.2481 14.2012C12.3362 14.2996 12.4429 14.3796 12.5621 14.4366C12.6813 14.4935 12.8106 14.5262 12.9426 14.5329C13.0745 14.5396 13.2064 14.5201 13.3308 14.4754C13.4551 14.4308 13.5694 14.362 13.667 14.273C14.3865 13.6296 15.2767 13.2082 16.2304 13.0597C17.1841 12.9111 18.1604 13.0417 19.0414 13.4358C19.9225 13.8299 20.6706 14.4705 21.1956 15.2804C21.7206 16.0903 22 17.0348 22 18C22 18.2652 22.1054 18.5196 22.2929 18.7071C22.4804 18.8946 22.7348 19 23 19C23.2652 19 23.5196 18.8946 23.7071 18.7071C23.8946 18.5196 24 18.2652 24 18ZM17.5 9C16.61 9 15.74 8.73608 14.9999 8.24161C14.2599 7.74715 13.6831 7.04434 13.3425 6.22208C13.0019 5.39981 12.9128 4.49501 13.0865 3.6221C13.2601 2.74918 13.6887 1.94736 14.318 1.31802C14.9474 0.688685 15.7492 0.260102 16.6221 0.0864682C17.495 -0.0871652 18.3998 0.00194979 19.2221 0.342544C20.0443 0.683138 20.7471 1.25991 21.2416 1.99994C21.7361 2.73996 22 3.60999 22 4.5C21.9987 5.69307 21.5241 6.83689 20.6805 7.68052C19.8369 8.52415 18.6931 8.99868 17.5 9ZM17.5 2C17.0055 2 16.5222 2.14662 16.1111 2.42133C15.7 2.69603 15.3795 3.08648 15.1903 3.54329C15.0011 4.00011 14.9516 4.50277 15.048 4.98773C15.1445 5.47268 15.3826 5.91814 15.7322 6.26777C16.0819 6.6174 16.5273 6.8555 17.0123 6.95196C17.4972 7.04843 17.9999 6.99892 18.4567 6.8097C18.9135 6.62048 19.304 6.30005 19.5787 5.88893C19.8534 5.4778 20 4.99445 20 4.5C20 3.83696 19.7366 3.20108 19.2678 2.73223C18.7989 2.26339 18.163 2 17.5 2Z"
                  fill="#78C377"
                />
              </svg>
            </span>
            <p>
              {summary.total_lead == 0 || summary.total_lead == 1
                ? i18n.total_lead
                : i18n.total_leads}
            </p>
            <h4>{summary.total_lead}</h4>
          </div>
        </div>}
        {caps.includes("ndpv_deal") && <div className="col-md-6 col-lg">
          <div className="pv-cards-content">
            <span style={{ background: "rgba(69, 172, 157, 0.28)" }}>
              <svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                <path
                  d="M22.822 12.385l-2.316 1.153-3-5.737 2.344-1.172a.74.74 0 01.993.318l2.307 4.416a.75.75 0 01-.328 1.022v0zM4.006 13.444L1.69 12.28a.741.741 0 01-.328-1.012l2.306-4.416a.75.75 0 01.994-.328l2.344 1.172-3 5.747zM20.506 13.538l-1.5 1.763-3.45 3.45a.798.798 0 01-.713.197l-5.437-1.36a.751.751 0 01-.272-.14l-5.128-4.004"
                  stroke="#45AC9D"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19.006 15.3l-4.125-3-1.2.9a3.01 3.01 0 01-3.6 0l-.506-.385a.758.758 0 01-.085-1.134l3.675-3.666a.742.742 0 01.525-.215h3.816"
                  stroke="#45AC9D"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.063 7.697l4.809-1.406a.75.75 0 01.515.037L15.631 7.8M10.756 20.925l-2.822-.712a.694.694 0 01-.31-.16l-2.118-1.837"
                  stroke="#45AC9D"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>
              {summary.total_deal == 0 || summary.total_deal == 1
                ? i18n.total_deal
                : i18n.total_deals}
            </p>
            <h4>{summary.total_deal}</h4>
          </div>
        </div>}
        <div className="col-md-6 col-lg">
          <div className="pv-cards-content">
            <span style={{ background: "#F4F2FE" }}>
              <svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                <path
                  d="M8.027 10.707h9.75M8.027 13.707h9.75M3.902 20.457V6.207a.75.75 0 01.75-.75h16.5a.75.75 0 01.75.75v14.25l-3-1.5-3 1.5-3-1.5-3 1.5-3-1.5-3 1.5z"
                  stroke="#8775EC"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>
              {summary.total_invoice == 0 || summary.total_invoice == 1
                ? i18n.total_invoice
                : i18n.total_invoices}
            </p>
            <h4>{summary.total_invoice}</h4>
          </div>
        </div>
        <div className="col-md-6 col-lg">
          <div className="pv-cards-content">
            <span style={{ background: "rgba(182, 100, 144, .26)" }}>
              <svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 9h6M9 12h6M9 15h3M14.69 20.25H4.5a.75.75 0 01-.75-.75v-15a.75.75 0 01.75-.75h15a.75.75 0 01.75.75v10.19a.742.742 0 01-.216.526l-4.818 4.818a.74.74 0 01-.525.216v0z"
                  stroke="#B66490"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.184 15H15v5.184"
                  stroke="#B66490"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>
              {summary.total_estimate == 0 || summary.total_estimate == 1
                ? i18n.total_estimate
                : i18n.total_estimates}
            </p>
            <h4>{summary.total_estimate}</h4>
          </div>
        </div>
        <div className="col-md-6 col-lg">
          <div className="pv-cards-content">
            <span style={{ background: "#ECF9FC" }}>
              <svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                <path
                  d="M18.96 10.648v8.335a.666.666 0 01-.666.665H3.96a.75.75 0 01-.75-.75v-10.5a.75.75 0 01.75-.75h4.247a.76.76 0 01.45.15l2.606 1.95a.76.76 0 00.45.15h6.497a.75.75 0 01.75.75z"
                  stroke="#33C3E2"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.96 10.648v8.335a.666.666 0 01-.666.665H3.96a.75.75 0 01-.75-.75v-10.5a.75.75 0 01.75-.75h4.247a.76.76 0 01.45.15l2.606 1.95a.76.76 0 00.45.15h6.497a.75.75 0 01.75.75z"
                  stroke="#33C3E2"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.21 7.648v-2.25a.75.75 0 01.75-.75h4.247a.76.76 0 01.45.15l2.606 1.95a.76.76 0 00.45.15h6.497a.75.75 0 01.75.75v8.335a.666.666 0 01-.666.665H18.96"
                  stroke="#33C3E2"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <p>
              {summary.total_project == 0 || summary.total_project == 1
                ? i18n.total_project
                : i18n.total_projects}
            </p>
            <h4>{summary.total_project}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
