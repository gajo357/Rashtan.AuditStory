import React, { useState, useEffect } from "react";
import { UserOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Form, Input, Skeleton, Select, Avatar } from "antd";
import Page from "./Page";
import { UserInfo } from "../models/UserInfo";
import { Country } from "../models/Country";
import IApiService from "../services/IApiService";
import { showError } from "../models/Errors";
import stringMatch from "../models/stringMatch";

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
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    apiService.getUserProfile().then(setUserProfile).catch(showError);
    apiService.getCountries().then(setCountries).catch(showError);
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
    <Page
      title="My account"
      backIcon={<CloseOutlined onClick={goBack} />}
      extra={
        <CheckOutlined
          onClick={() => {
            if (submitting || !userProfile) return;
            form.validateFields().then((values) => {
              handleSubmit(values as UserInfo);
            });
          }}
          spin={submitting || !userProfile}
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
            <Select
              showSearch
              loading={countries.length === 0}
              filterOption={(inputValue, option) => {
                const search = stringMatch(inputValue);
                return (
                  search(option?.title as string) ||
                  search(option?.value as string)
                );
              }}
            >
              {countries.map((c) => (
                <Select.Option
                  value={c.alpha3Code}
                  key={c.alpha3Code}
                  title={c.name}
                >
                  <Avatar
                    src={c.flag}
                    size={20}
                    style={{ position: "relative", top: -2, marginRight: 10 }}
                  />
                  {c.name} ({c.alpha3Code})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Skeleton>
    </Page>
  );
};

export default AccountEdit;
