import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IMAGE, ROLE, TOKEN_INFO } from "../../constants";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authApi from "../../api/authApi";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setAuth } from "../../slices/authSlice";
import "./Register.css";
import { object, string, number, date, InferType } from "yup";
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
const RegisterComponent = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const password = watch("password", ""); // Lấy giá trị của trường password

  const onSubmit = async (data) => {
    if (data.email)
      if (data.password !== data.confirmPassword) {
        toast({
          status: "warning",
          position: "top",
          duration: "5000",
          isClosable: true,
          title: "Đăng ký",
          description: "Mật khẩu không khớp",
        });
        return;
      }
    const params = {
      email: data.email,
      password: data.password,
      role: ROLE.USER,
    };
    try {
      const response = await authApi.signUp(params);
      console.log(response);
      if (response) {
        // 200 OK: Yêu cầu đã thành công.
        toast({
          title: "Đăng ký.",
          description: "Đăng ký thàng công",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
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
            navigate("/");
            return;
          }
          case ROLE.EXPERT: {
            navigate("/expert");
            return;
          }
        }
      } else {
        toast({
          title: "Đăng ký.",
          description: "Tài khoản đã tồn tại, xin mời bạn thử lại",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      toast({
        title: "Đăng ký.",
        description: "Tài khoản đã tồn tại, xin mời bạn thử lại",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <div
      className="register-container"
      style={{ backgroundImage: `url(${IMAGE.news1})` }}
    >
      <div className="container h-100 w-100">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-header bg-success text-light text-center fs-4 fw-bold">
                  Đăng ký
                </div>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Nhập địa chỉ email"
                      {...register("email")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Nhập mật khẩu"
                      {...register("password")}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password-confirm">Mật khẩu xác nhận:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password-confirm"
                      placeholder="Nhập lại mật khẩu"
                      {...register("confirmPassword")}
                    />
                  </div>
                  <p>{errors.confirmPassword?.message}</p>
                  <div className="mt-4">
                    <button type="submit" className="btn btn-success w-100">
                      Đăng ký
                    </button>
                    <p className="mt-3">
                      Bạn đã có tài khoản?
                      <Link className="login-link" to="/login">
                        Đăng nhập ngay
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    //  <MDBContainer fluid className="register-container">
    // <MDBRow className='d-flex justify-content-center align-items-center h-100'>
    //   <MDBCol col='12'>
    //     <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
    //       <MDBCardBody className='p-5 w-100 d-flex flex-column'>
    //         <h2 className="fw-bold mb-2 text-center">Sign in</h2>
    //         <p className="text-white-50 mb-3">Please enter your email and password!</p>
    //       <MDBInput wrapperClass='mb-4 w-100'
    //       type="email"
    //       className="form-control"
    //       id="email"
    //       placeholder="Nhập địa chỉ email"
    //       {...register('email')}
    //       />

    //       <MDBInput wrapperClass='mb-4 w-100'
    //       type="password"
    //       className="form-control"
    //       id="password"
    //       placeholder="Nhập mật khẩu"
    //       {...register('password')}
    //       />

    //       <MDBInput wrapperClass='mb-4 w-100'
    //       type="password"
    //       className="form-control"
    //       id="password-confirm"
    //       placeholder="Nhập lại mật khẩu"
    //       {...register('confirmPassword')}
    //       />
    //       <p>{errors.confirmPassword?.message}</p>

    //       <MDBBtn onSubmit={handleSubmit(onSubmit)} size='lg'>Sign up</MDBBtn>

    //         <hr className="my-4" />
    //         <p className="text-center">
    //            Bạn đã có tài khoản? {' '}
    //            <Link style={{ color: 'blue' }} to="/login">
    //             Đăng nhập ngay
    //           </Link>
    //           </p>

    //       </MDBCardBody>
    //     </MDBCard>

    //   </MDBCol>
    // </MDBRow>

    // </MDBContainer>
  );
};

export default RegisterComponent;
