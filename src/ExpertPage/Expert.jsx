import React, { useState } from 'react';
import DailyMeal from './DailyMeal'
import SickMeal from'./SickMeal'
import { Link } from 'react-router-dom'; 

function Expert() {
  const [currentPage, setCurrentPage] = useState("home");

  const renderPage = () => {
    switch (currentPage) {
      case "dailymeal":
        return <DailyMeal />;
      case "sickmeal":
        return <SickMeal />;
    

      default:
        return <div>Home Page</div>;
    } 
  }

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Zoo Management System</h2>
        <ul>
          <li><button onClick={() => setCurrentPage("dailymeal")}>Daily Meal</button></li>
          <li><button onClick={() => setCurrentPage("sickmeal")}>Sick Meal</button></li>
          <lu><Link to="/App1">Back</Link></lu>
        </ul>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default Expert;
