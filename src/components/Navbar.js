import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";
import { AuthContext } from "../contexts/AuthContextProvider";
import "./components.css";
import { logoutFirebase } from "../helpers/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logoutFirebase(history);
  };
  return (
    <Menu
      className="fixed"
      borderless
      size="large"
      style={{ backgroundColor: `#f5cf87` }}
    >
      <Menu.Item position="left" as={Link} to="/">
        <img src="/fire.png" alt="logo" />
      </Menu.Item>
      <Menu.Item
        name="header"
        style={{ color: `#c75c5c`, fontSize: `1.5rem`, fontWeight: 600 }}
      >
        FireBlog App
      </Menu.Item>
      <Menu.Item name="user-action" position="right">
        {currentUser.displayName ? (
          <Dropdown
            text={currentUser.displayName}
            labeled
            simple
            item
            id="nav-user-in"
            direction="left"
          >
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/profile"
                icon="user circle"
                text="Profile"
              />
              <Dropdown.Item
                as={Link}
                to="/upload"
                icon="cloud upload"
                text="New Post"
              />{" "}
              <Dropdown.Item
                onClick={handleLogout}
                icon="sign-out"
                text="Logout"
              />{" "}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Dropdown text="User Menu" labeled simple item id="nav-user">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/login"
                icon="sign-in"
                text="Login"
              />
              <Dropdown.Item
                as={Link}
                to="/register"
                icon="add user"
                text="Register"
              />
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
