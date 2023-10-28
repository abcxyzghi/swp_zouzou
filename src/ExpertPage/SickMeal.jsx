import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SickMeal = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // URL của API bạn muốn gửi yêu cầu GET
    const apiUrl = "https://zouzoumanagement.xyz/api/v3/cage/dc@gmail.com";

    // Gửi yêu cầu GET đến API sử dụng Axios
    axios.get(apiUrl)
      .then((response) => {
        // Lấy dữ liệu từ phản hồi API
        const apiData = response.data;

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
      <h1>Cage</h1>
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
                <button onClick={() => handleViewDetail(item)}>Xem chi tiết</button>
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

export default SickMeal;
  