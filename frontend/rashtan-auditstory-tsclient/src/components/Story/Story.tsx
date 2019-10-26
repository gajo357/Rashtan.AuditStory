import React, { useEffect, useState } from "react";
import { Redirect, Prompt } from "react-router";
import { Spin, List, Row, Col, Icon } from "antd";
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
          <List>
            <List.Item key="profile">
              <List.Item.Meta title={company.profile.name} />
              <StoryProfile
                profile={company.profile}
                onChange={p => updateCompany({ ...company, profile: p })}
              />
            </List.Item>

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

            {company.parts.map(part => {
              return (
                <StoryCustomPart
                  title={part.title}
                  id={part.title}
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
        )}
      </Spin>
      {company && (
        <Row type="flex" justify="end">
          <Col span={4}>
            <Icon
              type="plus-circle"
              onClick={() => {
                const parts = addElement(company.parts, {
                  title: "custom",
                  content: "",
                  comment: ""
                });
                updateCompany({ ...company, parts: parts });
              }}
            ></Icon>
            <Icon
              type="save"
              onClick={_ =>
                apiService
                  .saveCompanyStory(company)
                  .then()
                  .catch(showError)
              }
            ></Icon>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Story;
