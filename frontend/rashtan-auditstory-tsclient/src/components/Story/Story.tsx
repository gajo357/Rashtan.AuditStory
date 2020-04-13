import React, { useEffect, useState } from "react";
import { Redirect, Prompt } from "react-router";
import { Spin, PageHeader, Carousel } from "antd";
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
import StoryMenu from "./StoryMenu";
import {
  addElement,
  replaceElement,
  removeElement,
} from "../../models/ArrayUpdate";
import Category from "../../models/Category";
import styles from "./Story-styles";

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
    apiService.getChecklistItems().then(setExtraItems).catch(showError);

    apiService.getCategories().then(setCategories).catch(showError);
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
          <div style={styles.root}>
            <PageHeader
              title={company.profile.name}
              onBack={goHome}
              style={styles.pageHeader}
              extra={
                <StoryMenu
                  company={company}
                  addCustomPart={(title) => {
                    const parts = addElement(company.parts, {
                      title,
                      content: "",
                    });
                    updateCompany({ ...company, parts: parts });
                  }}
                  remove={() =>
                    apiService
                      .deleteCompanyStory(company.id)
                      .catch(showError)
                      .then(goHome)
                  }
                  save={() => {
                    console.log(company);
                    setSaving(true);
                    apiService
                      .saveCompanyStory(company)
                      .then(() => setUnsavedChanges(false))
                      .catch(showError)
                      .finally(() => setSaving(false));
                  }}
                  saving={saving}
                />
              }
            >
              <Carousel dotPosition="top" style={styles.carousel}>
                <StoryProfile
                  data={{ ...company.profile, categories }}
                  dataChanged={(p) => updateCompany({ ...company, profile: p })}
                />

                <StoryRevenue
                  data={company.revenue}
                  dataChanged={(p) => updateCompany({ ...company, revenue: p })}
                />

                <StoryCompetition
                  data={company.competition}
                  dataChanged={(p) =>
                    updateCompany({ ...company, competition: p })
                  }
                />

                <StoryMoat
                  data={company.moat}
                  dataChanged={(p) => updateCompany({ ...company, moat: p })}
                />

                <StoryManagement
                  data={company.management}
                  dataChanged={(p) =>
                    updateCompany({ ...company, management: p })
                  }
                />

                {company.parts.map((part) => (
                  <StoryCustomPart
                    key={part.title}
                    data={part}
                    delete={() => {
                      const c = removeElement(company.parts, part);
                      updateCompany({ ...company, parts: c });
                    }}
                    dataChanged={(p) => {
                      const c = replaceElement(company.parts, part, p);
                      updateCompany({ ...company, parts: c });
                    }}
                  />
                ))}

                <StoryChecklist
                  data={company.checklist}
                  dataChanged={(p) =>
                    updateCompany({ ...company, checklist: p })
                  }
                  extraData={extraItems}
                />
              </Carousel>
            </PageHeader>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Story;
