import React, { useState, useEffect } from "react";

const Summary = (props) => {
    const [funnel, setFunnel] = useState({
        common: [],
        won: null,
        lost: null,
    });

    useEffect(() => {
        props.getAll('dashboard', 'section=deal_funnel').then(resp => {
            if (resp.data.success) {
                setFunnel(resp.data.data);
            }
        });
    }, []);

    return (
        <div className="pi-punnel pi-border-gray">
            <h3
                className="pi-title-medium pi-mb-20"
                style={{ fontWeight: "bold", color: "#718096" }}
            >
                Deal Funnel
            </h3>
            <ul>
                <li style={{ background: "#d6defa" }}>
                    Interested<span>12</span>
                </li>
                <li style={{ background: "#acbef4", width: "80%" }}>
                    In Conversastion<span>12</span>
                </li>
                <li style={{ background: "#829dee", width: "60%" }}>
                    Qualified<span>12</span>
                </li>
                <li style={{ background: "#5b7cea", width: "40%" }}>
                    Offer Sent<span>12</span>
                </li>
                <li style={{ background: "#345bde" }}>
                    <span>12</span> Deal Won
                </li>
            </ul>
            <p className="pi-text-center">Deal Lost 8</p>
            {/* <ul> 
                {funnel.common.map((item, i) => (
                    <li key={i} style={{ color: item.color, backgroundColor: item.bg_color, width: item.width }}>
                        {item.name}<span>{item.items}</span>
                    </li>
                ))} 

                {funnel.won && <li style={{ color: funnel.won.color, backgroundColor: funnel.won.bg_color }}>
                    <span>{funnel.won.items}</span> Deal Won
                </li>}
            </ul> 
            {funnel.lost && <p className="pi-text-center">Deal Lost {funnel.lost.items}</p>} */}

        </div>
    );
}
export default Summary;