import React, { useState, useEffect } from "react";
import { UserOutlined, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import { Form, Input, Select, Avatar, Checkbox, Button, Modal } from "antd";
import { FormInstance } from "antd/lib/form";
import Page from "./Page";
import { TermsAndConditions } from "./Terms";
import { UserInfoDto } from "../models/UserInfo";
import { Country } from "../models/Country";
import { showError } from "../models/Errors";
import { stringMatch } from "../models/Helpers";
import withLogin from "./withLogin";
import { useApiService } from "../hooks/ApiProvider";
import useNavigation from "../hooks/useNavigation";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
};

interface UserFormProps {
  countries: Country[];
  userProfile: UserInfoDto;
  form: FormInstance;
  showAcceptance: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  countries,
  userProfile,
  form,
  showAcceptance
}) => (
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
        prefix={<UserOutlined />}
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
        style={{ textAlign: "left" }}
        showSearch
        loading={countries.length === 0}
        filterOption={(inputValue, option) => {
          const search = stringMatch(inputValue);
          return (
            search(option?.title as string) || search(option?.value as string)
          );
        }}
      >
        {countries.map(c => (
          <Select.Option value={c.alpha3Code} key={c.alpha3Code} title={c.name}>
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
    {showAcceptance && (
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Should accept agreement")
          }
        ]}
      >
        <Checkbox>
          I have read and accept the{" "}
          <Button
            type="link"
            onClick={() => {
              Modal.info({
                title: "Terms and Conditions",
                content: <TermsAndConditions />
              });
            }}
          >
            Terms and Conditions
          </Button>
        </Checkbox>
      </Form.Item>
    )}
  </Form>
);

interface Props {}

const AccountEdit: React.FC<Props> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState<UserInfoDto | undefined>();
  const [countries, setCountries] = useState<Country[]>([]);
  const { goHome } = useNavigation();

  const { getUserProfile, getCountries, saveUserProfile } = useApiService();

  useEffect(() => {
    getUserProfile().then(setUserProfile).catch(showError);
    getCountries().then(setCountries).catch(showError);
  }, []);

  const handleSubmit = (values: any) => {
    setSubmitting(true);
    saveUserProfile(values)
      .then(goHome)
      .catch(e => {
        showError(e);
        setSubmitting(false);
      });
  };

  const [form] = Form.useForm();

  return (
    <Page
      title="My account"
      loading={!userProfile}
      backIcon={<CloseOutlined onClick={goHome} />}
      extra={
        <CheckOutlined
          onClick={() => {
            if (submitting || !userProfile) return;
            form.validateFields().then(values => {
              handleSubmit(values as UserInfoDto);
            });
          }}
          spin={submitting || !userProfile}
        />
      }
    >
      {userProfile && (
        <UserForm
          countries={countries}
          userProfile={userProfile}
          form={form}
          showAcceptance={false}
        />
      )}
    </Page>
  );
};

export default withLogin(AccountEdit);
export { UserForm };
