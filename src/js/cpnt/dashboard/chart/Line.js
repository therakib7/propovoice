import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
            <div className='pv-widget pv-summery pv-bg-white pv-border-gray'>
                <h3
                    className="pv-title-medium pv-mb-20"
                    style={{ fontWeight: "bold", color: "#718096" }}
                >
                    {ndpv.i18n.deal} {ndpv.i18n.tracking}
                </h3>
                <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Won" stroke="#16B21D" activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Lost" stroke="#FF6771" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}
