import React from 'react';

function News() {
  const containerStyle = {
    backgroundImage: 'url("HallowenEvent.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const contentStyle = {
    maxWidth: '800px',
    textAlign: 'center',
    border: '1px solid #ccc', // Thêm đường viền xung quanh
    borderRadius: '8px', // Bo góc
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Thêm đổ bóng
    backgroundColor: '#fff',
    marginBottom: '20px'
  };

  const imageStyle = {
    maxWidth: '30%',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const headerStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#000', // Màu chữ đậm
  };

  const paragraphStyle = {
    fontSize: '15px',
    color: '#000', // Màu chữ trung bình
    marginBottom: '15px',
  };

  return (
    <div style={containerStyle}>
      <img src='HallowenEvent.png' alt="K.L.G.Zoo Events" style={imageStyle} />
      <div style={contentStyle}>
        <div>
          <p style={headerStyle}>Ngày Hội Vui Chơi Cuối Tuần</p>
          <p style={paragraphStyle}>
            Hãy tham gia vào sự kiện này vào ngày 5 tháng 11 để tìm hiểu về các loài động vật quý hiếm và cách bảo vệ chúng khỏi tuyệt chủng.
          </p>
        </div>
        <div>
          <p style={headerStyle}>Lễ Hội Ngày Tết của Động Vật</p>
          <p style={paragraphStyle}>
            Hãy đến K.L.G.Zoo vào dịp Tết để tham gia vào lễ hội với các hoạt động truyền thống, tiết mục biểu diễn, và tiệc ăn ngon dành cho cả gia đình cùng các loài động vật.
          </p>
        </div>
        <div>
          <p style={headerStyle}>Chương Trình Học Hè cho Trẻ Em</p>
          <p style={paragraphStyle}>
            Trong tháng 7 và 8, chúng tôi tổ chức các lớp học hè cho trẻ em, giúp họ hiểu hơn về thế giới động vật, bảo tồn môi trường và tham gia vào các hoạt động thú vị.
          </p>
        </div>
        <div>
          <p style={headerStyle}>Ngày Thứ Bảy Vui Vẻ</p>
          <p style={paragraphStyle}>
            Mỗi ngày thứ Bảy, sở thú tổ chức các hoạt động gia đình như trò chơi và cuộc thi vui nhộn, và tất cả các khách hàng nhỏ tuổi sẽ được giảm giá vé vào cửa.
          </p>
        </div>
        <p style={paragraphStyle}>
          Với những thông báo thường ngày và sự kiện đặc biệt này, chúng tôi hy vọng sở thú K.L.G.Zoo sẽ trở thành điểm đến thú vị và bổ ích cho tất cả các khách tham quan.
        </p>
      </div>
    </div>
  );
}

export default News;
