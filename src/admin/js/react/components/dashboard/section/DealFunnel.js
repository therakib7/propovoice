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
    
    const funnelColor = [
        "#d6defa",
        "#acbef4",
        "#829dee",
        "#5b7cea",
        "#d6defa",
        "#d6defa",
        "#d6defa",
        "#d6defa",
        "#d6defa",
    ];
    return (
        <div className="pi-punnel pi-border-gray" style={{ minHeight: '445px', marginBottom: '30px' }}>
            <h3
                className="pi-title-medium pi-mb-20"
                style={{ fontWeight: "bold", color: "#718096" }}
            >
                Deal Funnel
            </h3> 
            <ul> 
                {funnel.common.map((item, i) => ( 
                    <li key={i} style={{ color: ( i < 2 ) ? '#4A5568' : '', backgroundColor: funnelColor[i], width: item.width }}>
                        {item.name}<span>{item.items}</span>
                    </li>
                ))} 

                {funnel.won && <li style={{ backgroundColor: "#345bde" }}>
                    <span>{funnel.won.items}</span> Deal Won
                </li>}
            </ul> 
            {funnel.lost && <p className="pi-text-center">Deal Lost {funnel.lost.items}</p>}

        </div>
    );
}
export default Summary;