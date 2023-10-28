import React from "react";
import { ROLE, TOKEN_INFO } from "../../constants";
import authApi from "../../api/authApi";
import jwtDecode from "jwt-decode";
import { setAuth } from "../../slices/authSlice";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Assets
import logo from "../../assets/logo/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";
function SignUpComponent() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Định dạng email không đúng")
        .required("Bắt buộc nhập"),
      password: Yup.string()
        .min(5, "Tối thiểu 5 kí tự")
        .required("Bắt buộc nhập"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
        .required("Bắt buộc nhập"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await authApi.signUp(values);
        console.log(response);
        if (response) {
          // 200 OK: Yêu cầu đã thành công.
          localStorage.setItem("email", values.email);
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
    },
  });
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.800");
  const titleColor = useColorModeValue("gray.700", "blue.500");
  const bgIcons = useColorModeValue("black");
  const bgIconsHover = useColorModeValue("gray.50", "whiteAlpha.100");
  return (
    <Flex position="relative" height={"100vh"}>
      <Flex
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="30px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb="60px"
          mt={{ base: "50px", md: "20px" }}
        >
          <Flex
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              ĐĂNG KÍ TÀI KHOẢN
            </Text>
            <HStack spacing="15px" justify="center" mb="22px">
              <Flex
                justify="center"
                align="center"
                w="75px"
                h="75px"
                borderRadius="8px"
                borderColor="gray.200"
                cursor="pointer"
                transition="all .25s ease"
                bg={bgIcons}
                _hover={{ bg: bgIconsHover }}
              >
                <Link href="#">
                  <img src={logo} alt="Logo" />
                </Link>
              </Flex>
            </HStack>

            <form onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="email"
                  placeholder="Nhập Email"
                  mb="20px"
                  size="lg"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                  <p style={{ color: "red" }}>{formik.errors.email}</p>
                )}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Mật khẩu
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Nhập mật khẩu của bạn"
                  mb="20px"
                  size="lg"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                  <p style={{ color: "red" }}>{formik.errors.password}</p>
                )}
                {/* Nhập lại mật khẩu */}
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Nhập lại mật khẩu
                </FormLabel>
                <Input
                  variant="auth"
                  fontSize="sm"
                  ms="4px"
                  type="password"
                  placeholder="Nhập lại mật khẩu của bạn"
                  mb="20px"
                  size="lg"
                  name="confirm_password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                />
                {formik.errors.confirm_password &&
                  formik.touched.confirm_password && (
                    <p style={{ color: "red" }}>
                      {formik.errors.confirm_password}
                    </p>
                  )}
                {/* Nhập lại mật khẩu */}
                <Button
                  type="submit"
                  fontSize="13px"
                  fontWeight="bold"
                  w="100%"
                  h="50"
                  mb="24px"
                >
                  ĐĂNG KÍ
                </Button>
              </FormControl>
            </form>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Bạn đã có tài khoản?{" "}
                <Link color={titleColor} fontWeight="bold" to="/login">
                  Đăng nhập ngay
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          overflowX="hidden"
          h="100%"
          w="100%"
          left="0px"
          position="absolute"
          bgSize={"contain"}
          bgImage={
            "https://images.pexels.com/photos/18743590/pexels-photo-18743590/free-photo-of-thien-nhien-n-c-r-ng-cay.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
        ></Box>
      </Flex>
    </Flex>
  );
}

export default SignUpComponent;
