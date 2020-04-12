import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form, Button, Typography, Input, Spin } from "antd";
import { UserInfo } from "../models/UserInfo";
import IApiService from "../services/IApiService";
import { showError } from "../models/Errors";

const { Item } = Form;

interface Props {
  apiService: IApiService;
}

const EditUser: React.FC<Props> = ({ apiService }) => {
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<UserInfo | undefined>(
    undefined
  );

  useEffect(() => {
    apiService
      .getUserProfile()
      .then((c) => {
        setUserProfile(c);
        setLoaded(true);
      })
      .catch(showError);
  }, [apiService]);

  const handleSubmit = (values: any) => {
    setSubmitting(true);
    apiService
      .saveUserProfile(values)
      .then((_) => setSubmitting(false))
      .catch((e) => {
        showError(e);
        setSubmitting(false);
      });
  };

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  return (
    <Spin spinning={!loaded} tip="Loading" size="large">
      <Form
        {...formItemLayout}
        initialValues={userProfile}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Item>
          <Typography.Title>User info</Typography.Title>
        </Item>

        <Item
          {...formItemLayout}
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            autoComplete="fname"
            name="username"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Username"
          />
        </Item>
        <Item label="City" name="city">
          <Input autoComplete="billing address-level2" placeholder="City" />
        </Item>
        <Item label="State/Province/Region" name="state">
          <Input placeholder="State/Province/Region" />
        </Item>
        <Item label="Country" name="country">
          <Input autoComplete="billing country" placeholder="Country" />
        </Item>
        <Item>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Save
          </Button>
        </Item>
      </Form>
    </Spin>
  );
};

export default EditUser;
