import React, { useEffect, useState } from "react";
import { History } from "history";
import { Button, Form, Spin, Input } from "antd";
import ApiService from "../services/ApiService";
import { CompanyProfile } from "../models/CompanyProfile";
import { FormComponentProps } from "antd/lib/form";
import { UserStatus } from "../models/IUserProfile";

const { Item } = Form;

interface Props extends FormComponentProps<CompanyProfile> {
  apiService: ApiService;
  history: History;
}

const PortalNewStory: React.FC<Props> = ({
  apiService,
  history,
  form: {
    validateFields,
    getFieldsError,
    getFieldDecorator,
    isFieldTouched,
    getFieldError
  }
}) => {
  const [loaded, setLoaded] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiService.getUserStatus().then(c => {
      if (c === UserStatus.Paying || c === UserStatus.Trial) {
        setLoaded(true);
      } else {
        history.push("/portal");
      }
    });
  }, [apiService, history]);

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err, values: CompanyProfile) => {
      if (!err) {
        console.log("Received values of form: ", values);
        setSubmitting(true);
        apiService
          .createNewStory(values)
          .then(c => {
            history.push(`/portal/story/${c}`);
          })
          .catch(e => {
            setSubmitting(false);
            alert(JSON.stringify(e, null, 2));
          });
      } else {
        console.log(err);
      }
    });
  };

  const hasErrors = (fieldsError: any) => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  // Only show error after a field is touched.
  const nameProp = "name";
  const seProp = "stockExchange";
  const tickerProp = "ticker";
  const noSharesProp = "numberOfShares";
  const marketCapProp = "marketCap";
  const hasError = (p: string) => isFieldTouched(p) && getFieldError(p);
  const validateStatus = (p: string) => (hasError(p) ? "error" : "");
  const help = (p: string) => hasError(p) || "";

  return (
    <Spin spinning={!loaded} tip="Loading" size="large">
      <Form layout="horizontal" onSubmit={handleSubmit}>
        <Item
          label="Company name"
          validateStatus={validateStatus(nameProp)}
          help={help(nameProp)}
        >
          {getFieldDecorator(nameProp, {
            rules: [{ required: true, message: "Please input company's name!" }]
          })(<Input />)}
        </Item>

        <Item
          label="Stock Exchange"
          validateStatus={validateStatus(seProp)}
          help={help(seProp)}
        >
          {getFieldDecorator(seProp, {
            rules: [
              {
                required: true,
                message:
                  "Please input the Stock Exchange where company is being traded!"
              }
            ]
          })(<Input />)}
        </Item>

        <Item
          label="Ticker"
          validateStatus={validateStatus(tickerProp)}
          help={help(tickerProp)}
        >
          {getFieldDecorator(tickerProp, {
            rules: [{ required: true, message: "Please input Ticker symbol!" }]
          })(<Input />)}
        </Item>

        <Item
          label="Number of shares outstanding"
          validateStatus={validateStatus(noSharesProp)}
          help={help(noSharesProp)}
        >
          {getFieldDecorator(noSharesProp, {
            rules: [
              {
                required: true,
                message: "Please input Number of Shares Outstanding!"
              }
            ]
          })(<Input type="number" />)}
        </Item>

        <Item
          label="Market cap"
          validateStatus={validateStatus(marketCapProp)}
          help={help(marketCapProp)}
        >
          {getFieldDecorator(marketCapProp, {
            rules: [
              { required: true, message: "Please input Market Capitalization!" }
            ]
          })(<Input type="number" />)}
        </Item>

        <Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isSubmitting && hasErrors(getFieldsError())}
            loading={isSubmitting}
          >
            Create
          </Button>
        </Item>
      </Form>
    </Spin>
  );
};

export default Form.create<Props>({ name: "horizontal_login" })(PortalNewStory);
