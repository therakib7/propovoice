import { useState, useEffect } from "react";
import Preloader from "block/preloader/table";
// import { toast } from "react-toastify";
import Table from "./Table";

import api from "api";
export default (props) => {

	const [preloader, setPreloader] = useState(false);
	const [lists, setList] = useState([{id: 5}]);

    useEffect(() => {
        // props.getLists();
    }, []);

     
    const i18n = ndpv.i18n;
    return (
        <div className="ndpv-cpnt">           
			<div className="pv-list-single-head">
				<div className="row">
					<div className="col-md-6">
						<div className="pv-list-content">
							{/* <img src={img} alt="logo" className="logo" /> */}
							<div className="pv-lead-address">
								<h3 className="">
									{/* {data.person ? data.person.first_name : data.org.name} */} Customer Name
								</h3>

								<address>
									{/* {data.person ? data.person.email : data.org.email} */} Email: email@gmail.com
									<br />
									Subscription ID: 
									{/* {data.person && data.org && (
										<>
											{i18n.org}: {data.org.name}
											<br />
										</>
									)}
									{i18n.budget}:{" "}
									{data.budget && currency(data.budget, data.currency)} */}
								</address>
							</div>
						</div>
					</div>

					<div className="col-md-6">
						{false && <div className="pv-list-single-button-content">
							<div className="pv-select">
								<label>
									{i18n.lead} {i18n.level}:
								</label> 
							</div>
							<div className="pv-buttons pv-text-right">
								<button
									className="pv-btn pv-btn-medium pv-bg-blue pv-bg-hover-blue pv-color-white pv-bg-shadow"
									// onClick={() =>
									// 	this.setState({
									// 		dealModal: true,
									// 		dealModalType: "move",
									// 	})
									// }
								> 
									Cancel Subscription
								</button>

								{/* <Action
									id={data.id}
									module="lead"
									edit={() => this.setState({ leadModal: true })}
									del={this.deleteEntry}
								/> */}
							</div>
						</div>}
					</div>
				</div>
			</div>

			{false && <div className="pv-tag-content">
				<ul>
					<li>
						<label htmlFor="">{i18n.tag}: </label> 
					</li>

					<li>
						<label htmlFor="">{i18n.source}: </label> 
					</li>
				</ul>
			</div>}

			<div className="row pv-mt-25">
					<div className="col-lg-9">
						<div className="pv-horizontal-tab" style={{ border: "1px solid rgba(221, 221, 221, 0.6588235294)" }}> 
							<div className="pv-tab-content">
								{preloader ? (
									<Preloader />
								) : (
									<Table
										tableData={lists} 
									/>
								)}
							</div>
						</div>
					</div>

					<div className="col-lg-3 pv-lead-right-content">
						<div className="pv-widget pv-info-box">
							<h3 className="pv-widget-title">
								{i18n.addi} {i18n.info}
							</h3>
							<address>
								{false && (
									<>
										<span>{i18n.mob}:</span>
										{/* {data.person ? data.person.mobile : data.org.mobile} */}
									</>
								)} 
							</address>
						</div>
					</div>
				</div>
        </div>
    )
}
