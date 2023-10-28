import React from 'react';
import BarChart from './BarChart';
//import BarChartByMonth from './BarChartByMonth';
const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the Dashboard page.</p>
      <BarChart />
      {/* <BarChartByMonth /> */}
    </div>
  );
};

export default Dashboard;
