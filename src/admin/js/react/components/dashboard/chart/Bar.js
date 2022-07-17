import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default class Example extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

  }

  componentDidMount() {
    let data = [];
    if (this.props.type == 'estimate') {
      data = [
        {
          name: 'Jan',
          Sent: 4000,
          Viewed: 2400,
          Accepted: 2400,
          Rejected: 2400,
        },
        {
          name: 'Feb',
          Sent: 3000,
          Viewed: 1398,
          Accepted: 2210,
          Rejected: 1400,
        },
        {
          name: 'Mar',
          Sent: 2000,
          Viewed: 3800,
          Accepted: 2290,
          Rejected: 2600,
        },
        {
          name: 'Apr',
          Sent: 2780,
          Viewed: 3908,
          Accepted: 2000,
          Rejected: 1400,
        },
        {
          name: 'May',
          Sent: 1890,
          Viewed: 4800,
          Accepted: 2181,
          Rejected: 900,
        },
        {
          name: 'Jun',
          Sent: 2390,
          Viewed: 3800,
          Accepted: 2500,
          Rejected: 700,
        },
        {
          name: 'Jul',
          Sent: 4000,
          Viewed: 2400,
          Paid: 2400,
          OverDue: 2400,
        },
        {
          name: 'Aug',
          Sent: 3000,
          Viewed: 1398,
          Paid: 2210,
          OverDue: 1400,
        },
        {
          name: 'Sep',
          Sent: 2000,
          Viewed: 3800,
          Paid: 2290,
          OverDue: 2600,
        },
        {
          name: 'Oct',
          Sent: 2780,
          Viewed: 3908,
          Paid: 2000,
          OverDue: 1400,
        },
        {
          name: 'Nov',
          Sent: 1890,
          Viewed: 4800,
          Paid: 2181,
          OverDue: 900,
        },
        {
          name: 'Dec',
          Sent: 2390,
          Viewed: 3800,
          Paid: 2500,
          OverDue: 700,
        }, 
      ];
    } else {
      data = [
        {
          name: 'Jan',
          Sent: 4000,
          Viewed: 2400,
          Paid: 2400,
          OverDue: 2400,
        },
        {
          name: 'Feb',
          Sent: 3000,
          Viewed: 1398,
          Paid: 2210,
          OverDue: 1400,
        },
        {
          name: 'Mar',
          Sent: 2000,
          Viewed: 3800,
          Paid: 2290,
          OverDue: 2600,
        },
        {
          name: 'Apr',
          Sent: 2780,
          Viewed: 3908,
          Paid: 2000,
          OverDue: 1400,
        },
        {
          name: 'May',
          Sent: 1890,
          Viewed: 4800,
          Paid: 2181,
          OverDue: 900,
        },
        {
          name: 'Jun',
          Sent: 2390,
          Viewed: 3800,
          Paid: 2500,
          OverDue: 700,
        }, 
        {
          name: 'Jul',
          Sent: 4000,
          Viewed: 2400,
          Paid: 2400,
          OverDue: 2400,
        },
        {
          name: 'Aug',
          Sent: 3000,
          Viewed: 1398,
          Paid: 2210,
          OverDue: 1400,
        },
        {
          name: 'Sep',
          Sent: 2000,
          Viewed: 3800,
          Paid: 2290,
          OverDue: 2600,
        },
        {
          name: 'Oct',
          Sent: 2780,
          Viewed: 3908,
          Paid: 2000,
          OverDue: 1400,
        },
        {
          name: 'Nov',
          Sent: 1890,
          Viewed: 4800,
          Paid: 2181,
          OverDue: 900,
        },
        {
          name: 'Dec',
          Sent: 0,
          Viewed: 0,
          Paid: 0,
          OverDue: 0,
        }, 
      ];
    }
    this.setState({ data });
  }

  render() {
    return (
      <div className='pi-widget pi-summery pi-bg-white pi-border-gray'>
        <h3
          className="pi-title-medium pi-mb-20"
          style={{ fontWeight: "bold", color: "#718096" }}
        >
          {this.props.type == 'estimate' ? 'Estimate' : 'Invoice'}
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
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend />
              <Bar dataKey="Sent" fill="#f7936f" />
              <Bar dataKey="Viewed" fill="#4c6fff" />
              {this.props.type == 'estimate' && <>
                <Bar dataKey="Accepted" fill="#16B21D" />
                <Bar dataKey="Rejected" fill="#FF6771" />
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
