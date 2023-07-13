import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Section extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

  }

  componentDidMount() {
    this.props.getAll('dashboard', `section=${this.props.type}&year=${this.props.year}`).then(resp => {
      if (resp.data.success) {
        this.setState({ data: resp.data.data });
      }
    });
  }

  render() {
    const i18n = ndpv.i18n;
    return (
      <div className='pv-widget pv-summery pv-bg-white pv-border-gray'>
        <h3
          className="pv-title-medium pv-mb-20"
          style={{ fontWeight: "bold", color: "#718096" }}
        >
          {this.props.type == 'estimate' ? i18n.est : i18n.inv}
        </h3>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={this.state.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            // barSize={8}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
              <Bar dataKey="sent" name={i18n.sent} fill="#f7936f" />
              <Bar dataKey="viewed" name={i18n.viewed} fill="#4c6fff" />
              {this.props.type == 'estimate' && <>
                <Bar dataKey="accepted" name={i18n.acptd} fill="#16B21D" />
                <Bar dataKey="declined" name={i18n.dec} fill="#FF6771" />
              </>}
              {this.props.type == 'invoice' && <>
                <Bar dataKey="paid" name={i18n.paid} fill="#16B21D" />
                <Bar dataKey="overdue" name={i18n.ovd} fill="#FF6771" />
              </>}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
