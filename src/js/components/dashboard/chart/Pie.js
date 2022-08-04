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
        return (
            <div className='pi-widget pi-lead pi-bg-white pi-border-gray'>
                <h3
                    className="pi-title-medium pi-mb-10"
                    style={{ fontWeight: "bold", color: "#718096" }}
                >
                    {this.props.type == 'lead_level' ? 'Lead' : 'Source'}
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
                        <div className="pi-field-color-ficker">
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
