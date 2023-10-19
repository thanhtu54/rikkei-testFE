import {
  AlipayOutlined,
  ContactsOutlined,
  FundProjectionScreenOutlined,
  HomeOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [
    getItem("Homepage", "1", <HomeOutlined />),
    getItem("Products", "2", <FundProjectionScreenOutlined />),
    getItem("Orders", "3", <AlipayOutlined />),
    getItem("Setting", "4", <SettingOutlined />),
    getItem("Contact", "5", <ContactsOutlined />),
  ];

  const onClick = (e) => {
    e?.key === "1" && navigate("/");
    e?.key === "2" && navigate("/products");
    e?.key === "3" && navigate("/orders");
    e?.key === "4" && navigate("/setting");
    e?.key === "5" && navigate("/contact");
  };

  return (
    <nav className="wrapper-navbar">
      <Menu
        mode="inline"
        onClick={onClick}
        defaultSelectedKeys={["1"]}
        style={{ width: 250 }}
        items={items}
      />
    </nav>
  );
};

export default Navbar;
