import Breadcrumb from 'block/breadcrumb';
import Pagination from 'block/pagination';
import Preloader from 'block/preloader/table';

import Form from './Form';
import Table from './Table';
import Search from './Search';
import Empty from 'block/empty';

import Crud from 'hoc/Crud';

const Contact = (props) => {
  const { title, lists, checkedBoxes, searchVal } = props.state;
  const i18n = ndpi.i18n;
  return (
    <div className="ncpi-cpnt">
      <Breadcrumb title={i18n.contact + ' ' + i18n.book} />

      <div className="row">
        <div className="col-6">
          <h2 className="">{i18n.contact} {i18n.book}</h2>
        </div>
        <div className="col-6 pi-text-right">
          <button
            className="pi-btn pi-btn-medium pi-bg-blue pi-bg-hover-blue pi-bg-shadow"
            onClick={() => props.openForm('new')}
          >
            <svg
              width={14}
              height={12}
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 8H13.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M8 2.5V13.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            {i18n.add} {title}
          </button>
          <span className="pi-action-btn">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14C6.10457 14 7 13.1046 7 12Z"
                fill="#718096"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12Z"
                fill="#718096"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14C20.1046 14 21 13.1046 21 12Z"
                fill="#718096"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="pi-buttons-group pi-mb-20">
        <button className="pi-btn pi-btn-icon pi-bg-hover-shadow pi-mr-5">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.5 5H16.875"
              stroke="#4A5568"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 10H16.875"
              stroke="#4A5568"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.5 15H16.875"
              stroke="#4A5568"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.125 5H4.375"
              stroke="#4A5568"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.125 10H4.375"
              stroke="#4A5568"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.125 15H4.375"
              stroke="#4A5568"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="pi-btn pi-btn-icon pi-bg-hover-shadow">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 4.375H2.5C2.15482 4.375 1.875 4.65482 1.875 5V6.875C1.875 7.22018 2.15482 7.5 2.5 7.5H17.5C17.8452 7.5 18.125 7.22018 18.125 6.875V5C18.125 4.65482 17.8452 4.375 17.5 4.375Z"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.875 7.5V15C16.875 15.1658 16.8092 15.3247 16.6919 15.4419C16.5747 15.5592 16.4158 15.625 16.25 15.625H3.75C3.58424 15.625 3.42527 15.5592 3.30806 15.4419C3.19085 15.3247 3.125 15.1658 3.125 15V7.5"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.125 10.625H11.875"
              stroke="#A0AEC0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <Search
        title={title}
        showing={lists.length}
        total={props.state.total}
        handleSubmit={props.getLists}
      />

      <div className="pi-small-button-group pi-mb-30">
        <button className="pi-btn pi-active pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
        {i18n.person}
        </button>
        <button className="pi-btn pi-btn-small pi-bg-stroke pi-bg-hover-shadow">
        {i18n.org}
        </button>
      </div>

      {props.state.formModal && <Form
        handleSubmit={props.handleSubmit}
        modalType={props.state.formModalType}
        data={props.state.list}
        close={props.closeForm}
      />}

      {props.state.preloader ? <Preloader /> : <Table tableData={lists} searchVal={searchVal} editEntry={props.openForm} checkedBoxes={{ data: checkedBoxes, handle: props.handleCheckbox }} deleteEntry={props.deleteEntry} />}

      {props.state.totalPage > 1 && <Pagination forcePage={props.state.currentPage - 1} pageCount={props.state.totalPage} onPageChange={props.handlePageClick} />}

    </div>
  );
}

export default Crud(Contact, 'person', ndpi.i18n.person);