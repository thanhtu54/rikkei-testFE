import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../api/useUser";
import Register from "../register/index";

const Login = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loginUser } = useUser();
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const onFinish = (values) => {
    loginUser(values).then((res) => {
      localStorage.setItem("token", res.data.access_token);
      message.success("Login Success!", 3);
      navigate("/");
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="wrapper-login">
        <img
          className="wrapper-login__logo"
          src={require("../../assets/images/logo.png")}
          alt="logo"
        />
        <div className="form">
          <Form
            name="login"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input className="input" placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="button-confirm"
              >
                Login
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            onClick={handleClick}
            className="button-create"
          >
            Create new account
          </Button>
        </div>
      </div>
      <Register isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </>
  );
};

export default Login;
