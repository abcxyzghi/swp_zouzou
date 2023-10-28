import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CageTable = () => {
  const [cageData, setCageData] = useState([]);
  const [mealData, setMealData] = useState(null);
  const [selectedCage, setSelectedCage] = useState(null);
  const [animalData, setAnimalData] = useState([]);

  useEffect(() => {
    const apiUrl = "https://zouzoumanagement.xyz/api/v3/cage/dc@gmail.com";

    axios.get(apiUrl)
      .then((response) => {
        const cageData = response.data;
        setCageData(cageData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);
  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setAnimalData([]);
  };

  const handleViewMeal = (cageId) => {
    const mealApiUrl = `https://zouzoumanagement.xyz/api/v1/food/daily-meal/${cageId}`;

    axios.get(mealApiUrl)
      .then((response) => {
        const mealData = response.data;
        setMealData(mealData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API Meal", error);
      });
  };

  return (
    <div>
      <h1>Thông Tin Khu Chuồng</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cageData.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>{cage.name}</td>

              <td>
                <button onClick={() => handleViewDetail(cage)}>Xem chi tiết</button>
                <button onClick={() => handleViewMeal(cage.id)}>View Meal</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCage && (
        <div>
          <h2>Chi tiết</h2>
          <p>ID: {selectedCage.id}</p>
          <p>Name: {selectedCage.name}</p>
          <p>Quantity: {selectedCage.quantity}</p>
          <p>Cage Status: {selectedCage.cageStatus}</p>
          <p>Cage Type: {selectedCage.cageType}</p>
          <p>Area Name: {selectedCage.areaName}</p>
          <p>Staff Email: {selectedCage.staffEmail}</p>
        </div>
      )}

      {mealData && (
        <div>
          <h2>Thông Tin Bữa Ăn</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>CageID</th>
                <th>Food and Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{mealData.id}</td>
                <td>{mealData.name}</td>
                <td>{mealData.cageId}</td>
                <td>
                  <ul>
                    {mealData.haveFood.map((food) => (
                      <li key={food.id}>
                        {food.id} . 
                        {food.name}, 
                        {food.weight}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CageTable;
