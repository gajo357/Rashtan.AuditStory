import React, { useState, useEffect, CSSProperties } from "react";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Form, Steps, Spin, Button } from "antd";
import { UserForm } from "./AccountEdit";
import PaymentPlans from "./PaymentPlans";
import { UserInfoDto } from "../models/UserInfo";
import { Country } from "../models/Country";
import { showError } from "../models/Errors";
import withLogin from "./withLogin";
import { useApiService } from "../context/ApiProvider";

const stepsContent = {
  marginTop: "16px",
  border: "1px dashed #e9e9e9",
  borderRadius: "2px",
  backgroundColor: "#fafafa",
  minHeight: "200px",
  textAlign: "center",
  paddingTop: "80px"
} as CSSProperties;

const stepsAction = {
  marginTop: "24px"
};

interface Props {
  goBack: () => void;
}

const CreateUser: React.FC<Props> = ({}) => {
  const [submitting, setSubmitting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [userProfile, setUserProfile] = useState<UserInfoDto | undefined>();
  const [countries, setCountries] = useState<Country[]>([]);
  const { getUserProfile, getCountries, saveUserProfile } = useApiService();

  useEffect(() => {
    getUserProfile().then(setUserProfile).catch(showError);
    getCountries().then(setCountries).catch(showError);
  }, []);

  const next = () => setCurrent(current + 1);

  const handleSaveUser = () => {
    if (submitting || !userProfile) return;
    form.validateFields().then(values => {
      setSubmitting(true);
      saveUserProfile(values as UserInfoDto)
        .then(next)
        .catch(showError)
        .finally(() => setSubmitting(false));
    });
  };

  const [form] = Form.useForm();
  const steps = [
    {
      title: "Create user",
      icon: <UserOutlined />,
      content: (
        <Spin spinning={!userProfile}>
          {userProfile && (
            <UserForm
              form={form}
              userProfile={userProfile}
              countries={countries}
              showAcceptance={true}
            />
          )}
        </Spin>
      ),
      actions: (
        <Button type="primary" onClick={handleSaveUser} loading={submitting}>
          Create account
        </Button>
      )
    },
    {
      title: "Choose a plan",
      icon: <ShoppingCartOutlined />,
      content: <PaymentPlans />,
      actions: <> </>
    }
  ];

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <Steps current={current}>
        {steps.map(s => (
          <Steps.Step title={s.title} icon={s.icon} key={s.title} />
        ))}
      </Steps>
      <div style={stepsContent}>{steps[current].content}</div>
      <div style={stepsAction}>{steps[current].actions}</div>
    </div>
  );
};

export default withLogin(CreateUser);
