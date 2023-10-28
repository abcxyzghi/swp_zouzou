import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App1 from "./Component/App1";
import Admin from "./AdminPage/Admin"; // Import trang Admin
import Staff from "./StaffPage/Staff";
import Expert from "./ExpertPage/Expert";
import MainCoverImage from "./CoverImage/MainCoverImage";
import { ROLE, TOKEN_INFO } from "./constants";
import "./App.css";
import Ticket from "./TicketPage/Ticket";
import GlobalPrivateRouter from "./privateRouter/GlobalPrivateRouter";
import CommonPrivateRouter from "./privateRouter/CommonPrivateRouter";
import Dashboard from "./AdminPage/Dashboard";
import Cage from "./AdminPage/Cage";
import ViewLog from "./StaffPage/ViewCage";
import ExpertManager from "./AdminPage/Expert";
import StaffManager from "./AdminPage/StaffManager";
import DailyMeal from "./ExpertPage/DailyMeal";
import SickMeal from "./ExpertPage/SickMeal";
import { useEffect } from "react";
// Import Compoent Auth
import SignUpComponent from "./AuthPage/Register/SignUp";
import SignInComponent from "./AuthPage/Login/Login";
function App() {
  // Bậc cao nhất, khi thoát trình duyệt ở bất kì route nào thì cũng sẽ removeItem ở localStorage
  // useEffect(() => {
  //   const handleExitBrower = () => {
  //     localStorage.removeItem("email");
  //     localStorage.removeItem(TOKEN_INFO.accessToken);
  //     localStorage.removeItem(TOKEN_INFO.refreshToken);
  //   };
  //   window.addEventListener("beforeunload", handleExitBrower);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleExitBrower);
  //   };
  // }, []);
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainCoverImage />} />
          <Route path="/App1" element={<App1 />} />
          <Route path="/login" element={<SignInComponent />} />
          <Route path="/register" element={<SignUpComponent />} />

          <Route element={<GlobalPrivateRouter />}>
            <Route path="/staff" element={<Staff />} />
            <Route path="/ticket" element={<Ticket />} />

            {/* private router with role ADMIN */}
            <Route element={<CommonPrivateRouter targetRole={ROLE.ADMIN} />}>
              <Route path="/admin">
                <Route path="" element={<Admin />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="staff-manager" element={<StaffManager />} />
                <Route path="cages" element={<Cage />} />
                <Route path="expert" element={<ExpertManager />} />
              </Route>
            </Route>
            {/* private router with role STAFF */}
            <Route element={<CommonPrivateRouter targetRole={ROLE.STAFF} />}>
              <Route path="/staff">
                <Route path="" element={<Staff />} />
                <Route path="viewlog" element={<ViewLog />} />
              </Route>
            </Route>
            {/* private router with role EXPERT */}
            <Route element={<CommonPrivateRouter targetRole={ROLE.EXPERT} />}>
              <Route path="/expert">
                <Route path="" element={<Expert />} />
                <Route path="daily-meal" element={<DailyMeal />} />
                <Route path="sick-meal" element={<SickMeal />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
