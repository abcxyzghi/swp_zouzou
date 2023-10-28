import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

function TicketInfor() {
  const ticketData = [
    {
      time1: '8:00 AM',
      time2: '17:30 PM',
      price: 'Vé trẻ em (dưới 10 tuổi): 30.000 VND<br />Vé người lớn: 50.000 VND<br />Vé dịp lễ - trẻ em: 40.000 VND<br />Vé dịp lễ - người lớn: 70.000 VND ',
      address: 'Khu Công Nghệ Cao tp.Thủ Đức, tp. Hồ Chí Minh',
    },
  ];

  useEffect(() => {
    // Initialize Materialize CSS components
    M.AutoInit();
  }, []);

  return (
    <div>
      <table className="highlight">
        <thead>
          <tr>
            <th>Thời Gian Mở Cửa</th>
            <th>Giá Vé</th>
            <th>Địa Chỉ</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((ticket, index) => (
            <tr key={index}>
              <td>
                <div>
                  {ticket.time1} - {ticket.time2}
                </div>
              </td>
              <td>
                <p dangerouslySetInnerHTML={{ __html: ticket.price }} />
              </td>
              <td>
                <p>{ticket.address}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketInfor;
