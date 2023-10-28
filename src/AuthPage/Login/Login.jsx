import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { IMAGE, ROLE, TOKEN_INFO } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import authApi from "../../api/authApi";
import { setAuth, resetIntialState } from "../../slices/authSlice";
import { useToast } from "@chakra-ui/react";
import store from "../../reduxStore/store";
import "./Login.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
const LoginComponent = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Chekc isExit === false;
  if (store.getState().auth?.isExit) {
    toast({
      status: "success",
      position: "top",
      duration: "5000",
      isClosable: true,
      title: "Đăng xuất tài khoản",
      description: "Đăng xuất thành công",
    });
    dispatch(resetIntialState());
  }
  console.log(store.getState().auth?.isExit);
  const handleSignIn = async () => {
    const params = {
      email: email,
      password: password,
    };
    try {
      const response = await authApi.login(params);
      console.log(response);
      if (response) {
        localStorage.setItem("email", params.email);
        localStorage.setItem(TOKEN_INFO.accessToken, response.accessToken);
        localStorage.setItem(TOKEN_INFO.refreshToken, response.refreshToken);
        var decoded = jwtDecode(response.accessToken);
        const role = decoded.authorities[0].authority;
        dispatch(setAuth({ isLogin: true }));
        switch (role) {
          case ROLE.ADMIN: {
            navigate("/admin");
            return;
          }
          case ROLE.STAFF: {
            navigate("/staff");
            return;
          }
          case ROLE.USER: {
            navigate("/App1");
            return;
          }
          case ROLE.EXPERT: {
            navigate("/expert");
            return;
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast({
        status: "error",
        position: "top",
        duration: "5000",
        isClosable: true,
        title: "Đăng nhập",
        description: "Đăng nhập không thành công",
      });
    }
  };
  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${IMAGE.news1})` }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card border rounded login-card">
              <div className="card-header bg-success text-light text-center fs-4 fw-bold">
                Đăng nhập
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Tên đăng nhập:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Nhập tên đăng nhập"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button
                    onClick={handleSignIn}
                    className="btn btn-success w-100"
                  >
                    Đăng nhập
                  </button>
                </div>
                <p className="text-center">
                  Bạn chưa có tài khoản?{" "}
                  <Link className="register-link" to="/register">
                    Đăng ký ngay
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <MDBContainer fluid className='login-container'>

    //     <MDBRow className='d-flex justify-content-center align-items-center h-100'>
    //       <MDBCol col='12'>

    //         <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
    //           <MDBCardBody className='p-5 w-100 d-flex flex-column'>

    //             <h2 className="fw-bold mb-2 text-center">Sign up</h2>
    //             <p className="text-white-50 mb-3">Please enter your email and password!</p>

    //             <MDBInput
    //             wrapperClass='mb-4 w-100'
    //             label='Email address'
    //             id='formControlLg'
    //             type='email'
    //             placeholder="Nhập email" required
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}size="lg"/>

    //             <MDBInput
    //             wrapperClass='mb-4 w-100'
    //             label='Password'
    //             id='formControlLg'
    //             type='password' required
    //             placeholder="Nhập mật khẩu"
    //             size="lg"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             />

    //             {/* <MDBCheckbox name='flexCheck' id='flexCheckDefault' className='mb-4' label='Remember password' /> */}

    //             <MDBBtn onClick={handleSignIn} size='lg'>Login</MDBBtn>

    //             <hr className="my-4" />

    //             {/* <MDBBtn className="mb-2 w-100" size="lg" style={{backgroundColor: '#dd4b39'}}>
    //               <MDBIcon fab icon="google" className="mx-2"/>
    //               Sign in with google
    //             </MDBBtn>

    //             <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#3b5998'}}>
    //               <MDBIcon fab icon="facebook-f" className="mx-2"/>
    //               Sign in with facebook
    //             </MDBBtn> */}

    //             <p className="text-center">
    //                Bạn chưa có tài khoản? {' '}
    //                <Link style={{ color: 'blue' }} to="/register">
    //                 Đăng ký ngay
    //               </Link>
    //               </p>

    //           </MDBCardBody>
    //         </MDBCard>

    //       </MDBCol>
    //     </MDBRow>

    //   </MDBContainer>
  );
};

export default LoginComponent;
