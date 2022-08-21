import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Section extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
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
    const i18n = ndpi.i18n;
    return (
      <div className='pi-widget pi-summery pi-bg-white pi-border-gray'>
        <h3
          className="pi-title-medium pi-mb-20"
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
              <Bar dataKey="Sent" fill="#f7936f" />
              <Bar dataKey="Viewed" fill="#4c6fff" />
              {this.props.type == 'estimate' && <>
                <Bar dataKey="Accepted" fill="#16B21D" />
                <Bar dataKey="Declined" fill="#FF6771" />
              </>}
              {this.props.type == 'invoice' && <>
                <Bar dataKey="Paid" fill="#16B21D" />
                <Bar dataKey="OverDue" fill="#FF6771" />
              </>}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
