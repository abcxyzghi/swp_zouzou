import * as React from "react";

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

import styles from "./Header.module.css";
// Charka-io React
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Spacer,
} from "@chakra-ui/react";
function Header() {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#000000",
    color: "white",
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
  };

  const logoImageStyle = {
    maxWidth: "100px",
    maxHeight: "50px",
    borderRadius: "10px",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#ffffff",
    color: "black",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const LinkToTicket = {
    color: "black",
  };

  useEffect(() => {
    // Initialize dropdown
    const elems = document.querySelectorAll(".dropdown-trigger");
    window.M.Dropdown.init(elems, { constrainWidth: false });
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Flex
        minWidth="max-content"
        justifyContent="space-around"
        alignItems="center"
        backgroundColor="blackAlpha.900"
      >
        <Box p="1">
          <Link to="/App1">
            <img src="name.png" style={logoImageStyle} alt="Logo" />
          </Link>
        </Box>
        <Spacer />
        <ButtonGroup marginRight="4" gap="2">
          <Button
            textColor="black"
            backgroundColor="white"
            colorScheme="teal"
            variant="outline"
          >
            <Link to="/ticket">Buy Ticket</Link>
          </Button>
          {localStorage.getItem("email") ? (
            <Menu>
              <MenuButton
                textColor="black"
                backgroundColor="white"
                as={Button}
                colorScheme="green"
              >
                Profile
              </MenuButton>
              <MenuList>
                <MenuGroup title="Profile">
                  <MenuItem>Hi, {localStorage.getItem("email")}</MenuItem>
                  <MenuItem>Setting </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/login");
                      dispatch(logout());
                    }}
                    color="red"
                  >
                    LOGOUT
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Help">
                  <MenuItem>Docs</MenuItem>
                  <MenuItem>FAQ</MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          ) : (
            <Button
              textColor="black"
              backgroundColor="white"
              colorScheme="teal"
            >
              <Link style={LinkToTicket} to="/login">
                Sign In
              </Link>
            </Button>
          )}
        </ButtonGroup>
      </Flex>
      {/* <header style={headerStyle}>
        <div style={logoStyle}>
          <Link to="/App1">
            <img src="name.png" style={logoImageStyle} alt="Logo" />
          </Link>
        </div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle}>
            <Link style={LinkToTicket} to="/ticket">
              Buy Ticket
            </Link>
          </button>
          <a
            className="dropdown-trigger"
            href="#!"
            data-target="dropdown1"
            style={buttonStyle}
          >
            Option<i className="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="dropdown1" className="dropdown-content">
            {localStorage.getItem("email") && (
              <li>
                <p>{localStorage.getItem("email")}</p>
              </li>
            )}
            {localStorage.getItem("user_access_token") ? (
              <button
                style={buttonStyle}
                onClick={() => {
                  navigate("/login");
                  dispatch(logout());
                }}
              >
                Logout
              </button>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </div>
      </header> */}
    </React.Fragment>
  );
}

export default Header;
