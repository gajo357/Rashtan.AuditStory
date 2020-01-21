import React, { useEffect, useState } from "react";
import { Redirect, Prompt } from "react-router";
import {
  Spin,
  Button,
  Tooltip,
  PageHeader,
  Row,
  Col,
  List,
  Select,
  Icon
} from "antd";
import IApiService from "../../services/IApiService";
import { CompanyStory, ChecklistItem } from "../../models/Company";
import { showError } from "../../models/Errors";
import StoryProfile from "./StoryProfile";
import StoryRevenue from "./StoryRevenue";
import StoryManagement from "./StoryManagement";
import StoryMoat from "./StoryMoat";
import StoryCompetition from "./StoryCompetition";
import StoryCustomPart from "./StoryCustomPart";
import StoryChecklist from "./StoryChecklist";
import {
  addElement,
  replaceElement,
  removeElement
} from "../../models/ArrayUpdate";
import Category from "../../models/Category";

interface Props {
  apiService: IApiService;
  id: string;
  goHome: () => void;
}

const Story: React.FC<Props> = ({ apiService, id, goHome }) => {
  const [company, setCompany] = useState<CompanyStory>();
  const [extraItems, setExtraItems] = useState<ChecklistItem[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);

  useEffect(() => {
    if (!id) return;

    apiService
      .getCompanyStory(id)
      .then(setCompany)
      .then(() => setUnsavedChanges(false))
      .catch(showError);
  }, [apiService, id]);

  useEffect(() => {
    apiService
      .getChecklistItems()
      .then(setExtraItems)
      .catch(showError);

    apiService
      .getCategories()
      .then(setCategories)
      .catch(showError);
  }, [apiService]);

  if (!id) return <Redirect to="/" />;

  const updateCompany = (c: CompanyStory) => {
    setCompany(c);
    setUnsavedChanges(true);
  };

  return (
    <>
      <Prompt
        message="You have unsaved changes, are you sure you want to leave?"
        when={unsavedChanges}
      />

      <Spin spinning={!company} tip="Loading" size="large">
        {company && (
          <div style={{ position: "relative", minHeight: "100%" }}>
            <PageHeader
              title={company.profile.name}
              onBack={goHome}
              style={{ paddingBottom: 50 }}
            >
              <List>
                <List.Item
                  key="Heading"
                  extra={<Icon type="more"></Icon>}
                  actions={[
                    <Icon
                      type="star"
                      theme="twoTone"
                      twoToneColor={company.star ? "#FFEB3B" : "#555555"}
                      onClick={() =>
                        updateCompany({ ...company, star: !company.star })
                      }
                    />,
                    company.flags.length > 0 && (
                      <span>
                        <Icon type="flag" theme="twoTone" twoToneColor="red" />
                        {company.flags.length}
                      </span>
                    )
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Select
                        loading={categories.length === 0}
                        placeholder="Select category"
                        defaultValue={company.category}
                        onChange={(v: string) =>
                          updateCompany({ ...company, category: v })
                        }
                      >
                        {categories.map(c => (
                          <Select.Option value={c.name}>
                            <span>
                              <Icon
                                type="book"
                                theme="twoTone"
                                twoToneColor={c.color}
                              />
                              {c.name}
                            </span>
                          </Select.Option>
                        ))}
                      </Select>
                    }
                    description={
                      <span>
                        <Icon type="tags" />
                        Tags:
                        <Select
                          mode="tags"
                          onChange={(v: string[]) =>
                            updateCompany({ ...company, tags: v })
                          }
                          defaultValue={company.tags}
                        />
                      </span>
                    }
                  ></List.Item.Meta>
                </List.Item>

                <StoryProfile
                  title="Profile"
                  key="Profile"
                  data={company.profile}
                  dataChanged={p => updateCompany({ ...company, profile: p })}
                />

                <StoryRevenue
                  title="Revenue Streams"
                  key="Revenue Streams"
                  data={company.revenue}
                  dataChanged={p => updateCompany({ ...company, revenue: p })}
                />

                <StoryCompetition
                  title="Competition"
                  key="Competition"
                  data={company.competition}
                  dataChanged={p =>
                    updateCompany({ ...company, competition: p })
                  }
                />

                <StoryMoat
                  title="Moat"
                  key="Moat"
                  data={company.moat}
                  dataChanged={p => updateCompany({ ...company, moat: p })}
                />

                <StoryManagement
                  title="Management"
                  key="Management"
                  data={company.management}
                  dataChanged={p =>
                    updateCompany({ ...company, management: p })
                  }
                />

                {company.parts.map((part, i) => {
                  return (
                    <StoryCustomPart
                      key={i + 5}
                      data={part}
                      remove={() => {
                        const c = removeElement(company.parts, part);
                        updateCompany({ ...company, parts: c });
                      }}
                      dataChanged={p => {
                        const c = replaceElement(company.parts, part, p);
                        updateCompany({ ...company, parts: c });
                      }}
                    />
                  );
                })}

                <StoryChecklist
                  key={100}
                  title="Checklist"
                  data={company.checklist}
                  dataChanged={p => updateCompany({ ...company, checklist: p })}
                  extraData={extraItems}
                />
              </List>
            </PageHeader>
            <div
              style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                backgroundColor: "white"
              }}
            >
              <Row>
                <Col span={12}>
                  <Button
                    onClick={() => {
                      const parts = addElement(company.parts, {
                        title: "custom",
                        content: ""
                      });
                      updateCompany({ ...company, parts: parts });
                    }}
                    icon="plus-circle"
                  >
                    Add custom part
                  </Button>
                </Col>

                <Col span={12} push={8}>
                  <Tooltip placement="topLeft" title="Save story">
                    <Button
                      type="primary"
                      icon="save"
                      style={{ marginLeft: 10 }}
                      loading={saving}
                      onClick={() => {
                        console.log(company);
                        setSaving(true);
                        apiService
                          .saveCompanyStory(company)
                          .then(() => setUnsavedChanges(false))
                          .catch(showError)
                          .finally(() => setSaving(false));
                      }}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Story;
