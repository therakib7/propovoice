import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Hot', value: 400 },
    { name: 'Cold', value: 300 },
    { name: 'Warm', value: 300 }
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='pi-widget pi-lead pi-bg-white pi-border-gray'>
                <h3
                    className="pi-title-medium pi-mb-10"
                    style={{ fontWeight: "bold", color: "#718096" }}
                >
                    {this.props.type == 'lead_level' ? 'Lead' : 'Source'}
                </h3>

                <div className="row">
                    <div className="col-6">
                        <PieChart width={130} height={140} onMouseEnter={this.onPieEnter}>
                            <Pie
                                data={data}
                                //cx={120}
                                //cy={2000}
                                width={130} height={120}
                                innerRadius={42}
                                outerRadius={65}
                                fill="#8884d8"
                                // paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>

                    <div className="col-6">
                        <div className="pi-field-color-ficker">
                            <ul>
                                <li>
                                    <span style={{ background: "#4C6FFF" }} /> Hot <b>65%</b>
                                </li>
                                <li>
                                    <span style={{ background: "#B9C7FF" }} /> Cold <b>65%</b>
                                </li>
                                <li>
                                    <span style={{ background: "#DDE3FF" }} /> Warn <b>65%</b>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
