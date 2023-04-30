import { sprintf } from "sprintf-js";

export default (props) => {
  const { title, clickHandler, searchVal, logo = "" } = props;
  const { i18n, caps } = ndpv;
  const mod = props.mod ? props.mod : "";
  return (
    <div className="pv-empty-content pv-text-center">
      <svg width="77" height="76" viewBox="0 0 77 76" fill="none">
        <path
          d="M61.8594 1.30469V14.8447H75.3985L61.8594 1.30469Z"
          fill="#4C6FFF"
          fillOpacity="0.5"
        />
        <path
          d="M59.6328 19.2969C58.4032 19.2969 57.4062 18.3 57.4062 17.0703V0H25.4922C21.809 0 18.8125 2.99651 18.8125 6.67969V31.571C19.5461 31.5045 20.2884 31.4688 21.0391 31.4688C28.6284 31.4688 35.4222 34.9386 39.9182 40.375H64.0859C65.3156 40.375 66.3125 41.3719 66.3125 42.6016C66.3125 43.8312 65.3156 44.8281 64.0859 44.8281H42.8517C44.2434 47.5439 45.1409 50.5526 45.429 53.7344H64.0859C65.3156 53.7344 66.3125 54.7313 66.3125 55.9609C66.3125 57.1906 65.3156 58.1875 64.0859 58.1875H45.429C44.7631 65.5409 40.8342 71.9664 35.1047 76H70.0234C73.7066 76 76.7031 73.0035 76.7031 69.3203V19.2969H59.6328ZM64.0859 31.4688H31.4297C30.2 31.4688 29.2031 30.4718 29.2031 29.2422C29.2031 28.0125 30.2 27.0156 31.4297 27.0156H64.0859C65.3156 27.0156 66.3125 28.0125 66.3125 29.2422C66.3125 30.4718 65.3156 31.4688 64.0859 31.4688Z"
          fill="#4C6FFF"
        />
        <circle cx="20" cy="56" r="20" fill="#A5B7FF" />
        <path
          d="M17.9091 67.6136V45.1136H21.7273V67.6136H17.9091ZM8.56818 58.2727V54.4545H31.0682V58.2727H8.56818Z"
          fill="white"
        />
      </svg>

      {!searchVal.length && (
        <h2 className="pv-empty-title">
          {sprintf(
            i18n.notAdd,
            mod == "lead" ||
              mod == "client" ||
              mod == "person" ||
              mod == "org" ||
              mod == "team"
              ? i18n.added
              : i18n.created,
            title
          )}
        </h2>
      )}
      {searchVal.length > 0 && (
        <h2 className="pv-empty-title">{sprintf(i18n.noRes, title)}</h2>
      )}

      {!caps.includes("ndpv_client_role") && <button
        className="pv-btn pv-bg-blue pv-bg-hover-blue"
        onClick={() => clickHandler("new")}
      >
        <svg width={14} height={12} viewBox="0 0 12 15" fill="none">
          <path
            d="M2.5 8H13.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 2.5V13.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {
          mod == "lead" || mod == "client" || mod == "person" || mod == "org" || mod == "team"
            ? i18n.let_start_adding
            : i18n.let_start_creating
        }
      </button >}
    </div >
  );
};
