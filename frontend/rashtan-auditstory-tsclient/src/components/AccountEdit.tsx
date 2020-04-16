import React, { useState, useEffect, CSSProperties } from "react";
import { UserOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Form, Input, Skeleton, PageHeader, Button } from "antd";
import { UserInfo } from "../models/UserInfo";
import IApiService from "../services/IApiService";
import { showError } from "../models/Errors";

const navigationButtonStyle: CSSProperties = {
  fontSize: 20,
  color: "black",
};

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

interface Props {
  apiService: IApiService;
  goBack: () => void;
}

const AccountEdit: React.FC<Props> = ({ apiService, goBack }) => {
  const [submitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<UserInfo | undefined>();

  useEffect(() => {
    apiService.getUserProfile().then(setUserProfile).catch(showError);
    return () => setSubmitting(false);
  }, [apiService]);

  const handleSubmit = (values: any) => {
    setSubmitting(true);
    apiService
      .saveUserProfile(values)
      .then(goBack)
      .catch((e) => {
        showError(e);
        setSubmitting(false);
      });
  };

  const [form] = Form.useForm();

  return (
    <PageHeader
      title="My account"
      backIcon={<CloseOutlined style={navigationButtonStyle} />}
      onBack={goBack}
      extra={
        <Button
          loading={submitting || !userProfile}
          type="link"
          style={navigationButtonStyle}
          onClick={() => {
            form.validateFields().then((values) => {
              form.resetFields();
              handleSubmit(values as UserInfo);
            });
          }}
          icon={<CheckOutlined />}
        />
      }
    >
      <Skeleton loading={!userProfile} active>
        <Form
          {...formItemLayout}
          form={form}
          initialValues={userProfile}
          layout="horizontal"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              autoComplete="fname"
              prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item label="City" name="city">
            <Input autoComplete="billing address-level2" placeholder="City" />
          </Form.Item>
          <Form.Item label="State/Province/Region" name="state">
            <Input placeholder="State/Province/Region" />
          </Form.Item>
          <Form.Item label="Country" name="country">
            <Input autoComplete="billing country" placeholder="Country" />
          </Form.Item>
        </Form>
      </Skeleton>
    </PageHeader>
  );
};

export default AccountEdit;
