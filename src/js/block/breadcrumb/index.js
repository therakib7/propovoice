export default (props) => {
  return (
    <nav className="pv-breadcrumb">
      <ul className="">
        <li>
          <a href="#" className="">
            {ndpv.i18n.home}
          </a>
        </li>
        <li>
          <svg width={5} height={10} viewBox="0 0 5 10" fill="none">
            <path
              d="M0.5 1.25L4.25 5L0.5 8.75"
              stroke="#718096"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </li>
        <li className="pv-active">
          {props.title == "Lead"
            ? ndpv.i18n.lead
            : props.title == "Deal Pipeline"
            ? ndpv.i18n.deal_pipeline
            : props.title == "Estimate"
            ? ndpv.i18n.est
            : props.title == "Invoice"
            ? ndpv.i18n.inv
            : props.title == "Client"
            ? ndpv.i18n.client
            : props.title == "Project"
            ? ndpv.i18n.project
            : props.title == "Task & Activity"
            ? ndpv.i18n.taska
            : props.title == "Contact Book"
            ? ndpv.i18n.ct_book
            : props.title == "Settings"
            ? ndpv.i18n.settings
            : props.title}
        </li>
      </ul>
    </nav>
  );
};
