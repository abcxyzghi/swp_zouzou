import React from 'react';

function AboutUs() {
  const containerStyle = {
    backgroundImage: 'url("AboutUsBackground.jpg")',
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
    fontSize: '20px',
    padding: '20px', // Thêm padding cho phần nội dung
    border: '1px solid #ccc', // Thêm đường viền xung quanh
    borderRadius: '8px', // Bo góc
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', // Thêm đổ bóng
    backgroundColor: '#fff'
  };

  const imageStyle = {
    maxWidth: '30%',
    borderRadius: '8px',
    marginBottom: '20px',
  };

 

  return (
    <div style={containerStyle}>
      <img src='AboutUs.png' alt="K.L.G.Zoo" style={imageStyle} />
      
      <div style={contentStyle}>
        K.L.G.Zoo là một công viên sở thú tuyệt vời nằm ẩn mình giữa vùng thiên nhiên xanh mướt, tạo nên một thiên đàng hoang dã độc đáo. Với hơn 30 loài động vật từ khắp nơi trên thế giới, K.L.G.Zoo đã trở thành điểm đến lý tưởng cho những người yêu thú cưng và đam mê về động vật hoang dã.

        <br />

        Sở thú này không chỉ là nơi để bạn tham quan, mà còn là một cơ hội học hỏi về sự đa dạng và hệ sinh thái của các loài động vật. Bạn có thể tiếp xúc gần gũi với những chú Red panda cực kỳ đáng yêu, nhìn thấy sự uy nghiệm của những loài hổ trên thế giới, hay đắm chìm trong sự đa dạng của các loài chim.

        <br />

        Ngoài việc khám phá thế giới động vật, K.L.G.Zoo còn tổ chức các hoạt động giáo dục và bảo tồn quan trọng, nhấn mạnh vai trò quan trọng của chúng ta trong việc bảo vệ tự nhiên. Đây thực sự là một nơi thú vị và ý nghĩa cho cả gia đình để cùng nhau hòa mình vào thế giới kỳ diệu của động vật và thiên nhiên.
      </div>
    </div>
  );
}

export default AboutUs;
