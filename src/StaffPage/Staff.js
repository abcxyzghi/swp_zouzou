import React, { useState } from 'react';
import ViewLog from './ViewCage';
import ViewMeal  from './ViewMeal';
import { Link } from 'react-router-dom'; 

function App3() {
  const [currentPage, setCurrentPage] = useState("viewlog");

  const renderPage = () => {
    switch (currentPage) {
      case "viewlog":
        return <ViewLog />;
      case "viewmeal":
        return <ViewMeal />;
    
    } 
  }

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Zoo Management System</h2>
        <ul>
          <li><button onClick={() => setCurrentPage("viewlog")}>ViewCage</button></li>
          <li><button onClick={() => setCurrentPage("viewmeal")}>ViewMeal</button></li>
          <lu><Link to="/App1">Back</Link></lu>
        </ul>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default App3;
