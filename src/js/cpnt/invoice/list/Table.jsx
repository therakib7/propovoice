import React, { useRef, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProLabel from "block/pro-alert/label";
import { currency } from "helper";
import Moment from "react-moment";
import Feedback from "./feedback";
import Action from "block/action/row/invoice";

//payment
import Bank from "./payment/Bank";
import Paypal from "./payment/Paypal";
import Stripe from "./payment/Stripe";

const { i18n, caps } = ndpv;
const isClient = caps.includes("ndpv_client_role");

const TableHeader = (props) => {
  return (
    <thead>
      <tr>
        <th>
          {!isClient && (
            <input
              type="checkbox"
              checked={
                props.checkedBoxes.data.length === props.checkedBoxes.totalRow
              }
              onChange={(e) => props.checkedBoxes.handle(e, "all")}
            />
          )}
        </th>
        <th>{props.path == "invoice" ? ndpv.i18n.inv : ndpv.i18n.est} ID</th>
        {/* <th>
                    Project
                </th> */}
        {!isClient && <th>{i18n.ct}</th>}
        <th>{i18n.total}</th>

        {/* {(props.path == 'invoice') &&
                    <>
                        <th>Paid</th>
                        <th>Due</th>
                    </>
                }  */}
        <th>{i18n.status}</th>
        {props.path == "invoice" && (
          <th>
            {i18n.payment} {i18n.method}
          </th>
        )}
        <th>{i18n.due_date}</th>
        <th>{i18n.action}</th>
      </tr>
    </thead>
  );
};

const TableBody = (props) => {
  let navigate = useNavigate();
  function handleClick(row, viewPath = "", client_portal, client_url) {
    if (client_portal) {
      const newWindow = window.open(
        client_url,
        "_blank",
        "noopener,noreferrer",
      );
      if (newWindow) newWindow.opener = null;
      return;
    }
    let path = props.path;
    let view = "";
    if (viewPath) {
      view = viewPath;
    }
    /*
        Condition off from v1.6.6
        switch (row.status) {
            case 'accept':
            case 'decline':
            case 'paid':
                view = viewPath;
                break;
        } */

    navigate(`/${path}/${row.id}${view}`);
  }
  const i18n = ndpv.i18n;

  let rows = props.tableData.map((row, index) => {
    let data = props.checkedBoxes.data;
    const checkedCheckbox = data.indexOf(row.id) !== -1 ? true : false;
    let status;
    switch (row.status) {
      case "draft":
        status = (
          <span
            className="pv-badge pv-bg-pink"
            // style={{color: '#fff'}}
          >
            {ndpv.i18n.dft}
          </span>
        );
        break;

      case "sent":
        status = (
          <span
            className="pv-badge"
            style={{ backgroundColor: "#F4F2FE", color: "#8775EC" }}
          >
            {ndpv.i18n.sent}
          </span>
        );
        break;

      case "viewed":
        status = (
          <span
            className="pv-badge"
            style={{ backgroundColor: "#E0F0EC", color: "#4BB99E" }}
          >
            {ndpv.i18n.viewed}
          </span>
        );
        break;

      case "accept":
        status = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ backgroundColor: "#DDFFDE", color: "#0BA24B" }}
            onClick={() => props.infoModal(row, "feedback")}
          >
            {ndpv.i18n.acptd}
          </span>
        );
        break;

      case "decline":
        status = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ backgroundColor: "#FFF0F1", color: "#FF6771" }}
            onClick={() => props.infoModal(row, "feedback")}
          >
            {ndpv.i18n.dec}
          </span>
        );
        break;

      case "paid_req":
        status = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ backgroundColor: "#ECF9FC", color: "#33C3E2" }}
          >
            {ndpv.i18n.paid} {ndpv.i18n.req}
          </span>
        );
        break;

      case "paid":
        let recurring = row.invoice.recurring;
        status = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ backgroundColor: "#DDFFDE", color: "#0BA24B" }}
          >
            {recurring.status &&
            recurring.hasOwnProperty("subscription") &&
            recurring.subscription
              ? ndpv.i18n.subsed
              : ndpv.i18n.paid}
          </span>
        );
        break;
    }

    let payment_method;
    switch (row.payment_method) {
      case "bank":
        payment_method = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ color: "#fff", backgroundColor: "#4A5568" }}
            onClick={() => props.infoModal(row, "bank")}
          >
            {ndpv.i18n.bank}
          </span>
        );
        break;

      case "paypal":
        payment_method = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ color: "#fff", backgroundColor: "#009cde" }}
            onClick={() => props.infoModal(row, "paypal")}
          >
            {ndpv.i18n.paypal}
          </span>
        );
        break;

      case "stripe":
        payment_method = (
          <span
            className="pv-badge pv-cursor-pointer"
            style={{ color: "#fff", backgroundColor: "#5433FF" }}
            onClick={() => props.infoModal(row, "stripe")}
          >
            {ndpv.i18n.stripe}
          </span>
        );
        break;
    }

    let invoice_id = row.id;
    let invoice_token = row.token;
    let url =
      row.path == "invoice" ? ndpv.invoice_page_url : ndpv.estimate_page_url;

    //replace text with id and token
    let result = url.replace("invoice_id", invoice_id);
    let client_url = result.replace("invoice_token", invoice_token);

    const nNum = row.num ? row.num : props.prefix + row.id;

    const i18n = ndpv.i18n;
    return (
      <tr key={index}>
        <td>
          {!isClient && (
            <input
              type="checkbox"
              value={row.id}
              checked={checkedCheckbox}
              onChange={(e) => props.checkedBoxes.handle(e, "single", row.id)}
            />
          )}
        </td>
        <td
          onClick={() => {
            handleClick(row, "/tab/preview", isClient, client_url);
          }}
          className="pv-cursor-pointer"
        >
          <span className="pv-list-title">{nNum}</span>
        </td>
        {/*<td>{row.project.name}</td>*/}
        {!isClient && !props.client_id && (
          <td
            onClick={() => {
              handleClick(row, "/tab/preview", isClient, client_url);
            }}
            className="pv-cursor-pointer"
          >
            {row.to.first_name ?? row.to.org_name}
          </td>
        )}
        <td
          onClick={() => {
            handleClick(row, "/tab/preview", isClient, client_url);
          }}
          className="pv-cursor-pointer"
        >
          {currency(row.total, row.invoice.currency, row.invoice.lang)}
        </td>
        {/* {(props.path == 'invoice') &&
                    <>
                        <td>{row.paid}</td>
                        <td>{row.due}</td>
                    </>
                }  */}
        <td>{status}</td>
        {props.path == "invoice" && <td>{payment_method}</td>}
        <td
          onClick={() => {
            handleClick(row, "/tab/preview", isClient, client_url);
          }}
          className="pv-cursor-pointer"
        >
          {row.due_date && (
            <Moment format={ndpv.date_format}>{row.due_date}</Moment>
          )}
        </td>
        <td className="pv-action">
          <Action
            row={row}
            client_url={client_url}
            single={handleClick}
            action={props.action}
            deleteEntry={props.deleteEntry}
          />
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = (props) => {
  const [infoModal, setInfoModal] = useState(false);
  const [infoData, setInfoData] = useState(null);
  const handleInfoModal = (data) => {
    setInfoData(data);
    setInfoModal(true);
  };

  const {
    prefix,
    tableData,
    editEntry,
    checkedBoxes,
    deleteEntry,
    client_id,
    path,
    action,
  } = props;

  return (
    <>
      {tableData.length > 0 && (
        <div className="pv-table-wrap">
          {infoModal && (
            <>
              {(infoData.status == "accept" ||
                infoData.status == "decline") && (
                <Feedback
                  data={infoData}
                  show={infoModal}
                  reload={props.reload}
                  close={() => setInfoModal(false)}
                />
              )}

              {infoData.payment_method == "bank" && (
                <Bank
                  data={infoData}
                  show={infoModal}
                  reload={props.reload}
                  close={() => setInfoModal(false)}
                />
              )}

              {infoData.payment_method == "paypal" && (
                <Paypal
                  data={infoData}
                  show={infoModal}
                  reload={props.reload}
                  close={() => setInfoModal(false)}
                />
              )}

              {infoData.payment_method == "stripe" && (
                <Stripe
                  data={infoData}
                  show={infoModal}
                  reload={props.reload}
                  close={() => setInfoModal(false)}
                />
              )}
            </>
          )}

          <table className="pv-table pv-table-four">
            <TableHeader
              checkedBoxes={checkedBoxes}
              client_id={client_id}
              path={path}
            />
            <TableBody
              infoModal={handleInfoModal}
              prefix={prefix}
              tableData={tableData}
              editEntry={editEntry}
              checkedBoxes={checkedBoxes}
              deleteEntry={deleteEntry}
              client_id={client_id}
              path={path}
              action={action}
            />
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
