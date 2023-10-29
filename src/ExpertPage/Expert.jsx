import React, { useState } from "react";
import DailyMeal from "./DailyMeal";
import SickMeal from "./SickMeal";
import { Link, Outlet, useNavigate } from "react-router-dom";
import HealtLog from "./HealthLog";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

function Expert() {
  const [currentPage, setCurrentPage] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const renderPage = () => {
    switch (currentPage) {
      case "dailymeal":
        return <DailyMeal />;
      case "sickmeal":
        return <SickMeal />;
      case "healthLog":
        return <HealtLog />;

      default:
        return <div>Home Page</div>;
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <h2>Zoo Management System</h2>
        <ul>
          <lu>
            <Link
              style={{ display: "block", padding: "10px" }}
              to={"/expert/health-log"}
            >
              Health log
            </Link>
          </lu>
          <lu>
            <Link
              style={{ display: "block", padding: "10px" }}
              to={"/expert/daily-meal"}
            >
              Daily Meal
            </Link>
          </lu>
          <lu>
            <Link
              style={{ display: "block", padding: "10px" }}
              to={"/expert/sick-meal"}
            >
              Sick Meal
            </Link>
          </lu>
          <lu>
            <Link
              style={{ display: "block", padding: "10px" }}
              to={"/expert/food-storage"}
            >
              Food Storage
            </Link>
          </lu>
          <li>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </button>
          </li>
          <lu>
            <Link to="/App1">Back</Link>
          </lu>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Expert;
