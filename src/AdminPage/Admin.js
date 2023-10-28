import React, { useState } from 'react';
import StaffManager from './StaffManager';
import Cage from './Cage';
import DashBoard from './Dashboard';
import Expert from './Expert';
import { Link } from 'react-router-dom';
import userIcon from './User.png'; // Import your user icon image
import './App2.css';

function App2() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashBoard />;
      case "staff-manager":
        return <StaffManager />;
      case "cages":
        return <Cage />;
      case "expert":
        return <Expert />;
    }
  }

  return (
    <div className="App">
      <div className="sidebar">
        <div className="user-info">
          <img src={userIcon} alt="User Icon" className="user-icon" />
          <span className="user-name">Admin</span>
        </div>
        <ul>
          <li><button onClick={() => setCurrentPage("dashboard")}>DashBoard</button></li>
          <li><button onClick={() => setCurrentPage("staff-manager")}>Staff Manager</button></li>
          <li><button onClick={() => setCurrentPage("cages")}>Cages</button></li>
          <li><button onClick={() => setCurrentPage("expert")}>Expert</button></li>
          <li><Link to="/App1">Back</Link></li>
        </ul>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App2;
