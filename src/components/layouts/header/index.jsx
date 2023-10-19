import { Avatar, Dropdown, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUser from "../../../api/useUser";

const Header = () => {
  const { getUser } = useUser();
  const [user, setUser] = useState([]);

  const handleClickAvatar = () => {
    getUser().then((res) => {
      setUser(res?.data);
    });
  };

  const handleClick = () => {
    localStorage.removeItem("token");
    message.success("Logout success!");
  };

  const items = [
    {
      label: `id: ${user?.id}`,
      key: "0",
    },
    {
      label: `name: ${user?.username}`,
      key: "1",
    },
    {
      label: (
        <Link onClick={handleClick} to="./login">
          Logout
        </Link>
      ),
      key: "2",
    },
  ];

  return (
    <header className="wrapper-header">
      <Link to="/" className="wrapper-header__logo">
        <img
          className="wrapper-header__logo"
          src={require("../../../assets/images/logo-homepage.webp")}
          alt="logo"
        />
      </Link>
      <div className="wrapper-header__avatar">
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          arrow
        >
          <Avatar
            onClick={handleClickAvatar}
            size={64}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
