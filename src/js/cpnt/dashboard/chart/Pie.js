import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export default class Section extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        this.props.getAll('dashboard', 'section=' + this.props.type).then(resp => {
            if (resp.data.success) {
                this.setState({ data: resp.data.data });
            }
        });
    }

    render() {
        const data = this.state.data;
        const i18n = ndpv.i18n;
        return (
            <div className='pv-widget pv-lead pv-bg-white pv-border-gray'>
                <h3
                    className="pv-title-medium pv-mb-10"
                    style={{ fontWeight: "bold", color: "#718096" }}
                >
                    {this.props.type == 'lead_level' ? i18n.lead : i18n.source}
                </h3>

                <div className="row" style={{minHeight: '100px'}}>
                    <div className="col-6">
                        {data.length > 0 && <PieChart width={130} height={140} onMouseEnter={this.onPieEnter}>
                            <Pie
                                data={data}
                                //cx={120}
                                //cy={2000}
                                width={130} height={120}
                                innerRadius={42}
                                outerRadius={65}
                                fill="#8884d8"
                                //paddingAngle={5}
                                dataKey="percent"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={data[index].bg_color} />
                                ))}
                            </Pie>
                        </PieChart>}
                    </div>

                    <div className="col-6" style={{ alignSelf: 'center' }}>
                        <div className="pv-field-color-ficker">
                            <ul>
                                {data.map((item, i) => (
                                    <li key={i} >
                                        <span style={{ backgroundColor: item.bg_color }} /> {item.name} <b>{item.percent}%</b>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
