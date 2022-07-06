import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jan',
    Won: 4000,
    Lost: 2400
  },
  {
    name: 'Feb',
    Won: 3000,
    Lost: 1398
  },
  {
    name: 'Mar',
    Won: 2000,
    Lost: 9800
  },
  {
    name: 'Apr',
    Won: 2780,
    Lost: 3908
  },
  {
    name: 'May',
    Won: 1890,
    Lost: 4800
  },
  {
    name: 'Jun',
    Won: 2390,
    Lost: 3800
  }
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/simple-line-chart-kec3v';

  render() {
    return (
      <div className='pi-widget pi-summery pi-bg-white pi-border-gray'>
        <h3
          className="pi-title-medium pi-mb-20"
          style={{ fontWeight: "bold", color: "#718096" }}
        >
          Deal Tracking
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
              <Line type="monotone" dataKey="Won" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Lost" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}
