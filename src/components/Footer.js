import React from "react";
import { Menu } from "semantic-ui-react";

const Footer = () => {
  return (
    <Menu
      borderless
      fluid
      style={{
        backgroundColor: `#f5cf87`,
        margin: 0,

        borderRadius: "unset",
        position: "relative",
        bottom: 0,
        zIndex: 5,
      }}
    >
      <div style={{ display: "block", margin: "auto" }}>
        This app is developed by &nbsp;
        <a href="https://github.com/hakan-d">github.com/hakan-d</a>
      </div>
    </Menu>
  );
};

export default Footer;
