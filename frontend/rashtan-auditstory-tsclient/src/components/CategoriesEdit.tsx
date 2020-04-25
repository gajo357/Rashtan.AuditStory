import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import EditColor from "./SimpleEditors/EditColor";
import Page from "./Page";
import IApiService from "../services/IApiService";
import Category from "../models/Category";
import { showError } from "../models/Errors";

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
      loading={!categories}
      backIcon={<CloseOutlined onClick={goBack} />}
      extra={
        categories && (
          <CheckOutlined
            onClick={() => {
              form.validateFields().then((values) => {
                const c = values as Categories;
                apiService
                  .saveCategories(c.categories)
                  .then(goBack)
                  .catch(showError);
              });
            }}
          />
        )
      }
    >
      {categories && (
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
      )}
    </Page>
  );
};

export default CompaniesEdit;
