import React, { useEffect, useState } from "react";
import { Redirect, Prompt } from "react-router";
import { List, Spin, Button, Tooltip } from "antd";
import IApiService from "../../services/IApiService";
import { CompanyStory } from "../../models/Company";
import { showError } from "../../models/Errors";
import StoryProfile from "./StoryProfile";
import StoryRevenue from "./StoryRevenue";
import StoryManagement from "./StoryManagement";
import StoryMoat from "./StoryMoat";
import StoryCompetition from "./StoryCompetition";
import StoryCustomPart from "./StoryCustomPart";
import {
  addElement,
  replaceElement,
  removeElement
} from "../../models/ArrayUpdate";

interface Props {
  apiService: IApiService;
  id: string;
}

const Story: React.FC<Props> = ({ apiService, id }) => {
  const [company, setCompany] = useState<CompanyStory>();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    apiService
      .getCompanyStory(id)
      .then(setCompany)
      .catch(showError);
  }, [apiService, id]);

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
          <>
            <List
              itemLayout="vertical"
              size="large"
              footer={
                <div>
                  <Button
                    size="large"
                    onClick={_ => {
                      const parts = addElement(company.parts, {
                        title: "custom",
                        content: "",
                        comment: ""
                      });
                      updateCompany({ ...company, parts: parts });
                    }}
                    icon="plus-circle"
                  >
                    Add custom part
                  </Button>
                  <Tooltip placement="topLeft" title="Save story">
                    <Button
                      type="primary"
                      size="large"
                      icon="save"
                      style={{ marginLeft: 10 }}
                      loading={saving}
                      onClick={_ => {
                        console.log(company);
                        setSaving(true);
                        apiService
                          .saveCompanyStory(company)
                          .then(_ => {
                            setSaving(false);
                            setUnsavedChanges(false);
                          })
                          .catch(e => {
                            showError(e);
                            setSaving(false);
                          });
                      }}
                    />
                  </Tooltip>
                </div>
              }
            >
              <StoryProfile
                title={company.profile.name}
                key={0}
                data={company.profile}
                dataChanged={p => updateCompany({ ...company, profile: p })}
              />

              <StoryRevenue
                title="Revenue Streams"
                key={1}
                data={company.revenue}
                dataChanged={p => updateCompany({ ...company, revenue: p })}
              />

              <StoryCompetition
                title="Competition"
                key={2}
                data={company.competition}
                dataChanged={p => updateCompany({ ...company, competition: p })}
              />

              <StoryMoat
                title="Moat"
                key={3}
                data={company.moat}
                dataChanged={p => updateCompany({ ...company, moat: p })}
              />

              <StoryManagement
                title="Management"
                key={4}
                data={company.management}
                dataChanged={p => updateCompany({ ...company, management: p })}
              />

              {company.parts.map((part, i) => {
                return (
                  <StoryCustomPart
                    title={part.title}
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
            </List>
          </>
        )}
      </Spin>
    </>
  );
};

export default Story;
