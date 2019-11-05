import React, { useEffect, useState } from "react";
import { History } from "history";
import { Button, Form, Input } from "antd";
import IApiService from "../services/IApiService";
import { CompanyStoryCreate } from "../models/Company";
import { FormComponentProps } from "antd/lib/form";
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
  const [isSubmitting, setSubmitting] = useState(false);

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
    <Form layout="horizontal" onSubmit={handleSubmit}>
      <Item
        label="Company name"
        validateStatus={validateStatus(nameProp)}
        help={help(nameProp)}
      >
        {getFieldDecorator(nameProp, {
          rules: [{ required: true, message: "Please input company's name!" }]
        })(<Input placeholder="Name" />)}
      </Item>
      <Item
        label="Website"
        validateStatus={validateStatus("website")}
        help={help("website")}
      >
        {getFieldDecorator("website", {
          rules: [
            { required: true, message: "Please input company's website!" }
          ]
        })(<Input placeholder="Website" />)}
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
  );
};

export default Form.create<Props>({ name: "horizontal_login" })(PortalNewStory);
