import React, { useEffect, useState } from "react";
import { Redirect, Prompt } from "react-router";
import { List, Spin, Icon, Button } from "antd";
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
            <List>
              <StoryProfile
                title={company.profile.name}
                id="profile"
                data={company.profile}
                dataChanged={p => updateCompany({ ...company, profile: p })}
              />

              <StoryRevenue
                title="Revenue Streams"
                id="revenue"
                data={company.revenue}
                dataChanged={p => updateCompany({ ...company, revenue: p })}
              />

              <StoryCompetition
                title="Competition"
                id="competition"
                data={company.competition}
                dataChanged={p => updateCompany({ ...company, competition: p })}
              />

              <StoryMoat
                title="Moat"
                id="moat"
                data={company.moat}
                dataChanged={p => updateCompany({ ...company, moat: p })}
              />

              <StoryManagement
                title="Management"
                id="management"
                data={company.management}
                dataChanged={p => updateCompany({ ...company, management: p })}
              />

              {company.parts.map((part, i) => {
                return (
                  <StoryCustomPart
                    title={part.title}
                    id={i.toString()}
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
            <Button
              size="large"
              shape="circle"
              onClick={_ => {
                const parts = addElement(company.parts, {
                  title: "custom",
                  content: "",
                  comment: ""
                });
                updateCompany({ ...company, parts: parts });
              }}
            >
              <Icon type="plus-circle" />
            </Button>

            <Button
              type="primary"
              size="large"
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
            >
              <Icon type="save" />
            </Button>
          </>
        )}
      </Spin>
    </>
  );
};

export default Story;
