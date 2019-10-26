import React, { useEffect, useState } from "react";
import { History } from "history";
import { Button, Form, Spin, Input } from "antd";
import IApiService from "../services/IApiService";
import { CompanyStoryCreate } from "../models/Company";
import { FormComponentProps } from "antd/lib/form";
import { UserStatus } from "../models/UserStatus";
import { showError } from "../models/Errors";

const { Item } = Form;

interface Props extends FormComponentProps<CompanyStoryCreate> {
  apiService: IApiService;
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
    apiService
      .getUserStatus()
      .then(c => {
        if (c === UserStatus.Paying || c === UserStatus.Trial) {
          setLoaded(true);
        } else {
          history.push("/");
        }
      })
      .catch(showError);
  }, [apiService, history]);

  useEffect(() => {
    validateFields();
  }, [validateFields]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateFields((err, values: CompanyStoryCreate) => {
      if (!err) {
        console.log("Received values of form: ", values);
        setSubmitting(true);
        apiService
          .createNewStory(values)
          .then(c => {
            setSubmitting(false);
            history.push(`/story/${c}`);
          })
          .catch(e => {
            setSubmitting(false);
            showError(e);
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
