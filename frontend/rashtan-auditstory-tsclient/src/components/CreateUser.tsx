import React, { useState, useEffect } from "react";
import { History } from "history";
import { Button, Typography, Form, Input, Icon, Spin } from "antd";
import { UserInfo } from "../models/UserInfo";
import { UserStatus } from "../models/IUserProfile";
import ApiService from "../services/ApiService";
import { FormComponentProps } from "antd/lib/form";

const { Item } = Form;

interface Props extends FormComponentProps<UserInfo> {
  apiService: ApiService;
  history: History;
}

const CreateUser: React.FC<Props> = ({
  apiService,
  history,
  form: {
    validateFields,
    getFieldDecorator,
    getFieldError,
    getFieldsError,
    isFieldTouched
  }
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiService.getUserStatus().then(c => {
      if (c === UserStatus.New) {
        setLoaded(true);
      } else {
        history.push("/");
      }
    });
  }, [apiService, history]);

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err, values: UserInfo) => {
      if (!err) {
        console.log("Received values of form: ", values);
      } else {
        setSubmitting(true);
        apiService.startFreeTrial(values).then(_ => {
          history.push("/");
        });
      }
    });
  };

  const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  };

  // Only show error after a field is touched.
  const usernameError = isFieldTouched("username") && getFieldError("username");

  return (
    <Spin spinning={!loaded} tip="Loading" size="large">
      <Form {...formItemLayout} layout="horizontal" onSubmit={handleSubmit}>
        <Item>
          <Typography.Title>User info</Typography.Title>
        </Item>

        <Item
          {...formItemLayout}
          validateStatus={usernameError ? "error" : ""}
          help={usernameError || ""}
          label="Username"
        >
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              autoComplete="fname"
              name="username"
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Item>
        <Item label="City">
          <Input
            autoComplete="billing address-level2"
            name="city"
            placeholder="City"
          />
        </Item>
        <Item label="State/Province/Region">
          <Input name="state" placeholder="State/Province/Region" />
        </Item>
        <Item label="Country">
          <Input
            autoComplete="billing country"
            name="country"
            placeholder="Country"
          />
        </Item>
        <Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
            loading={isSubmitting}
          >
            Start free trial
          </Button>
        </Item>
      </Form>
    </Spin>
  );
};

export default Form.create<Props>({ name: "horizontal_login" })(CreateUser);
