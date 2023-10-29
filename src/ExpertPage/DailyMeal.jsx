import React, { useEffect, useState } from "react";
import axios from "axios";
import cageApi from "../api/cageApi";
import { useNavigate } from "react-router-dom";

const DailyMeal = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Gửi yêu cầu GET đến API sử dụng Axios

    cageApi
      .getCageExpert()
      .then((response) => {
        // Lấy dữ liệu từ phản hồi API
        const apiData = response;

        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);

  const handleViewDetail = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <h1>Daily Meal</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>

            <th>Cage Status</th>
            <th>Cage Type</th>
            <th>Area Name</th>

            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>

              <td>{item.cageStatus}</td>
              <td>{item.cageType}</td>
              <td>{item.areaName}</td>

              <td>
                <button onClick={() => handleViewDetail(item)}>
                  View Detail
                </button>
                <button
                  onClick={() => {
                    navigate(`/expert/daily-meal/${item.id}/food`);
                  }}
                  style={{ marginLeft: "12px" }}
                >
                  Create Meal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedItem && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedItem.id}</p>
          <p>Name: {selectedItem.name}</p>
          <p>Quantity: {selectedItem.quantity}</p>
          <p>Cage Status: {selectedItem.cageStatus}</p>
          <p>Cage Type: {selectedItem.cageType}</p>
          <p>Area Name: {selectedItem.areaName}</p>
          <p>Staff Email: {selectedItem.staffEmail}</p>
          <button onClick={handleCloseDetail}>Đóng</button>
        </div>
      )}
    </div>
  );
};

export default DailyMeal;
