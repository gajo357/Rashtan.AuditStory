import React, { useState, useEffect, CSSProperties } from "react";
import { Form, Row, Col, Input, Skeleton } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import EditColor from "./SimpleEditors/EditColor";
import Page from "./Page";
import IApiService from "../services/IApiService";
import Category from "../models/Category";
import { showError } from "../models/Errors";

const navigationButtonStyle: CSSProperties = {
  fontSize: 20,
  color: "black",
};

interface Props {
  apiService: IApiService;
  goBack: () => void;
}

interface Categories {
  categories: Category[];
}

const CompaniesEdit: React.FC<Props> = ({ apiService, goBack }) => {
  const [categories, setCategories] = useState<Categories | undefined>(
    undefined
  );
  useEffect(() => {
    apiService
      .getCategories()
      .then((categories) => setCategories({ categories }))
      .catch(showError);
  }, [apiService]);

  const [form] = Form.useForm();
  return (
    <Page
      title="Edit categories"
      backIcon={
        <CloseOutlined onClick={goBack} style={navigationButtonStyle} />
      }
      extra={
        <CheckOutlined
          style={navigationButtonStyle}
          onClick={() => {
            form.validateFields().then((values) => {
              form.resetFields();
              const c = values as Categories;
              apiService
                .saveCategories(c.categories)
                .then(goBack)
                .catch(showError);
            });
          }}
        />
      }
    >
      <Skeleton active loading={!categories}>
        <Form form={form} initialValues={categories}>
          <Form.List name="categories">
            {(fields, { remove }) => (
              <div>
                {fields.map((field) => (
                  <Row key={field.name} gutter={[2, 2]}>
                    <Col flex="30px">
                      <Form.Item
                        name={[field.name, "color"]}
                        rules={[{ required: true }]}
                      >
                        <EditColor />
                      </Form.Item>
                    </Col>
                    <Col flex="auto">
                      <Form.Item
                        name={[field.name, "name"]}
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col flex="30px">
                      <CloseOutlined onClick={() => remove(field.name)} />
                    </Col>
                  </Row>
                ))}
              </div>
            )}
          </Form.List>
        </Form>
      </Skeleton>
    </Page>
  );
};

export default CompaniesEdit;
