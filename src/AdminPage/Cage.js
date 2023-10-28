import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://zouzoumanagement.xyz/api/v1/cage';

const Cage = () => {
  const [cageData, setCageData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [newCage, setNewCage] = useState({
    id: '',
    name: '',
    quantity: '',
    cageStatus: '',
    cageType: '',
    areaName: '',
    staffEmail: '',
  });

  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        const cageDataWithDefaultRole = response.data.map((cage) => ({
          ...cage,
        }));
        setCageData(cageDataWithDefaultRole);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu chuồng:', error);
      });
  }, []);

  const handleEditClick = (id) => {
    setEditingId(id);
  };

  const handleDeleteClick = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        const updatedCageData = cageData.filter((cage) => cage.id !== id);
        setCageData(updatedCageData);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa chuồng:', error);
      });
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleAddClick = () => {
    setAdding(true);
  };

  const handleAddCage = () => {
    axios.post(API_URL, newCage)
      .then(() => {
        setNewCage({
          name: '',
          cageStatus: '',
          cageType: '', 
          areaName: '',
          staffEmail: '',
        });

        // Tải lại trang sau khi thêm thành công
        window.location.reload();
      })
      .catch((error) => {
        console.error('Lỗi khi thêm chuồng:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCage({
      ...newCage,
      [name]: value,
    });
  };

  const handleSaveClick = (id) => {
    const cageToUpdate = cageData.find((cage) => cage.id === id);

    // Lấy giá trị từ state thay vì trực tiếp từ DOM
    const updatedCageStatus = newCage.cageStatus;
    const updatedStaffEmail = newCage.staffEmail;
    const updatedName = newCage.cageName;

    axios.put(`${API_URL}/${id}`, {
      cageName: updatedName,
      cageStatus: updatedCageStatus,
      staffEmail: updatedStaffEmail,
    })
      .then(() => {
        const updatedCageData = cageData.map((cage) => {
          if (cage.id === id) {
            return {
              ...cage,
              cageName: updatedName,
              cageStatus: updatedCageStatus,
              staffEmail: updatedStaffEmail,
            };
          }
          return cage;
        });
        setCageData(updatedCageData);
        setEditingId(null);
      })
      .catch((error) => {
        console.error('Lỗi khi cập nhật chuồng:', error);
      });
  };

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Cage Status</th>
            <th>Cage Type</th>
            <th>Area Name</th>
            <th>Staff Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cageData.map((cage) => (
            <tr key={cage.id}>
              <td>{cage.id}</td>
              <td>{editingId === cage.id ? <input type="text" name="cageName" value={newCage.cageName} onChange={handleInputChange} /> : cage.name}</td>
              <td>{cage.quantity}</td>
              <td>{editingId === cage.id ? <input type="text" name="cageStatus" value={newCage.cageStatus} onChange={handleInputChange} /> : cage.cageStatus}</td>
              <td>{cage.cageType}</td>
              <td>{cage.areaName}</td>
              <td>{editingId === cage.id ? <input type="text" name="staffEmail" value={newCage.staffEmail} onChange={handleInputChange} /> : cage.staffEmail}</td>
              <td>
                {editingId === cage.id ? (
                  <>
                    <button onClick={() => handleSaveClick(cage.id)}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(cage.id)}>Edit</button>
                    <button onClick={() => handleDeleteClick(cage.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Cage</h1>
      {adding ? (
        <div>
          <button onClick={() => setAdding(false)}>Cancel</button>
          <button onClick={handleAddCage}>Add</button>
          <input type="text" placeholder="Name" name="cageName" value={newCage.cageName} onChange={handleInputChange} />
          <input type="text" placeholder="Cage Status" name="cageStatus" value={newCage.cageStatus} onChange={handleInputChange} />
          <input type="text" placeholder="Cage Type" name="cageType" value={newCage.cageType} onChange={handleInputChange} />
          <input type="text" placeholder="Area Name" name="areaName" value={newCage.areaName} onChange={handleInputChange} />
          <input type="text" placeholder="Staff Email" name="staffEmail" value={newCage.staffEmail} onChange={handleInputChange} />
        </div>
      ) : (
        <>
          <button className='add-button' onClick={handleAddClick}>Add</button>
          {renderTable()}
        </>
      )}
    </div>
  );
};

export default Cage;
