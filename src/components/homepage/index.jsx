import { Breadcrumb, Typography } from "antd";
import React from "react";

const Homepage = () => {
  const { Title } = Typography;
  return (
    <div className="wrapper-hompage">
      <Breadcrumb items={[{ title: "Homepage" }]}></Breadcrumb>
      <Title level={2}>Homepage</Title>
    </div>
  );
};

export default Homepage;
