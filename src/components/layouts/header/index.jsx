import { Avatar, Dropdown, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../../api/useUser";

const Header = () => {
  const { getUser } = useUser();
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res?.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          message.warning("Your session has expired. Please log in again!", 3);
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = () => {
    localStorage.removeItem("token");
    message.success("Logout success!", 3);
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
            size={64}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
