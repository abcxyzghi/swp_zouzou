import React, { useEffect, useState } from "react";
import axios from "axios";
import logApi from "../api/logApi";

const HealthLog = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Gửi yêu cầu GET đến API sử dụng Axios
    logApi
      .getLogExpert()
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
      <h1>Health Log</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Species</th>
            <th>Description</th>
            <th>Date time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {/* <td>{item.id}</td>
              <td>{item.name}</td>

              <td>{item.cageStatus}</td>
              <td>{item.cageType}</td>
              <td>{item.areaName}</td>

              <td>
                <button onClick={() => handleViewDetail(item)}>
                  Xem chi tiết
                </button>
              </td> */}
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

export default HealthLog;
