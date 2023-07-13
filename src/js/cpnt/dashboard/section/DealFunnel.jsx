import React, { useState, useEffect } from "react";

export default (props) => {
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
    ];

    const i18n = ndpv.i18n;
    return (
        <div className="pv-punnel pv-border-gray" style={{ minHeight: '435px', marginBottom: '30px' }}>
            <h3
                className="pv-title-medium pv-mb-20"
                style={{ fontWeight: "bold", color: "#718096" }}
            >
                {i18n.deal} {i18n.funnel}
            </h3> 
            <ul> 
                {funnel.common.map((item, i) => ( 
                    <li key={i} style={{ color: ( i < 2 ) ? '#4A5568' : '', backgroundColor: ( i < 4 ) ? funnelColor[i] : '#345bde', width: item.percent }}>
                        {item.name}<span>{item.items}</span>
                    </li>
                ))} 

                {funnel.won && <li style={{ backgroundColor: "#345bde" }}>
                    <span>{funnel.won.items}</span> {i18n.deal} {i18n.won}
                </li>}
            </ul> 
            {funnel.lost && <p className="pv-text-center">{i18n.deal} {i18n.lost} {funnel.lost.items}</p>} 
        </div>
    );
} 