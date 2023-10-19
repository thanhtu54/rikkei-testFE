import { Button, Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import useUser from "../../api/useUser";

const Register = ({ isModalOpen, handleOk, handleCancel }) => {
  const formRef = useRef(null);
  const { createUser } = useUser();

  const onFinish = (values) => {
    createUser({
      username: values.username,
      password: values.password,
    }).then(() => {
      message.success("Signup Success!", 3);
      onCancel();
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onCancel = () => {
    formRef.current.resetFields();
    handleCancel();
  };

  return (
    <div className="wrapper-register">
      <Modal
        title="Sign Up"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onCancel}
        centered
        footer={null}
      >
        <Form
          name="signUp"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          ref={formRef}
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
            <Input placeholder="Username" />
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

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>

          <Form.Item className="button">
            <Button type="primary" htmlType="submit" className="button-create">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Register;
