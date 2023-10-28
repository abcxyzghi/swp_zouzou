import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewLog = () => {
  const [data, setData] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [animalData, setAnimalData] = useState([]);
  

  useEffect(() => {
    const apiUrl = "https://zouzoumanagement.xyz/api/v3/cage/dc@gmail.com";

    axios.get(apiUrl)
      .then((response) => {
        const apiData = response.data;
        setData(apiData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API", error);
      });
  }, []);

  const handleViewDetail = (cage) => {
    setSelectedCage(cage);
    setAnimalData([]);
  };

  const handleViewAnimalsInCage = (cageId) => {
    const apiAnimalsUrl = `https://zouzoumanagement.xyz/api/v4/animal/${cageId}`;

    axios.get(apiAnimalsUrl)
      .then((response) => {
        const animalData = response.data;
        setAnimalData(animalData);
      })
      .catch((error) => {
        console.error("Lỗi khi gửi yêu cầu GET đến API Animal", error);
      });
  };

  return (
    <div>
      <h1>View Cage</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>{cage.name}</td>
              <td>
                <button onClick={() => handleViewDetail(cage)}>Xem chi tiết</button>
                <button onClick={() => handleViewAnimalsInCage(cage.id)}>View Animal in cage</button>
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

      {animalData.length > 0 && (
        <div>
          <h2>Animal Details</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>DOB</th>
                <th>DEZ</th>
                <th>Gender</th>
                <th>Specie</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {animalData.map((animal) => (
                <tr key={animal.id}>
                  <td>{animal.id}</td>
                  <td>{animal.name}</td>
                  <td>{animal.dob}</td>
                  <td>{animal.dez}</td>
                  <td>{animal.gender}</td>
                  <td>{animal.specie}</td>
                  <td>{animal.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewLog;
