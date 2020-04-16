import React, { useEffect, useState } from "react";
import { Redirect, Prompt } from "react-router";
import { Spin, PageHeader, Tabs } from "antd";
import IApiService from "../../services/IApiService";
import {
  CompanyStory,
  ChecklistItem,
  CurrencyUnit,
} from "../../models/Company";
import { showError } from "../../models/Errors";
import StoryProfile from "./StoryProfile";
import StoryRevenue from "./StoryRevenue";
import StoryManagement from "./StoryManagement";
import StoryMoat from "./StoryMoat";
import StoryCompetition from "./StoryCompetition";
import StoryCustomPart from "./StoryCustomPart";
import StoryChecklist from "./StoryChecklist";
import StoryVerdict from "./StoryVerdict";
import StoryMenu from "./StoryMenu";
import {
  addElement,
  replaceElement,
  removeElement,
} from "../../models/ArrayUpdate";
import Category from "../../models/Category";
import styles from "./Story-styles";
import { Currency } from "../../models/Country";

interface Props {
  apiService: IApiService;
  id: string;
  goHome: () => void;
}

const Story: React.FC<Props> = ({ apiService, id, goHome }) => {
  const [company, setCompany] = useState<CompanyStory>();
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [currencies, setCurrencies] = React.useState<Currency[]>([]);
  const [currency, setCurrency] = React.useState<CurrencyUnit>();

  useEffect(() => {
    if (!id) return;

    apiService
      .getCompanyStory(id)
      .then((c) => {
        setCompany(c);
        setCurrency(c.profile.unit);
      })
      .then(() => setUnsavedChanges(false))
      .catch(showError);

    apiService.getChecklistItems().then(setChecklistItems).catch(showError);
    apiService.getCategories().then(setCategories).catch(showError);
    apiService.getCurrencies().then(setCurrencies).catch(showError);
  }, [apiService, id]);

  useEffect(() => {
    if (currencies.length === 0 || !company) return;

    const curr = currencies.find(
      (c) => c.code === company.profile.unit.currency
    );
    if (curr) setCurrency({ ...company.profile.unit, currency: curr.symbol });
  }, [currencies, company]);

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
              subTitle={"Last edited: " + company.dateEdited.toLocaleString()}
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
              <Tabs tabPosition="right" style={styles.tabs} size="small">
                <Tabs.TabPane tab="Profile" key="1">
                  <StoryProfile
                    value={{ ...company.profile }}
                    onChange={(p) => updateCompany({ ...company, profile: p })}
                    extraData={currencies}
                    currency={currency}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Revenue" key="2">
                  <StoryRevenue
                    value={company.revenue}
                    onChange={(p) => updateCompany({ ...company, revenue: p })}
                    currency={currency}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Competition" key="3">
                  <StoryCompetition
                    value={company.competition}
                    onChange={(p) =>
                      updateCompany({ ...company, competition: p })
                    }
                    currency={currency}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="MOAT" key="4">
                  <StoryMoat
                    value={company.moat}
                    onChange={(p) => updateCompany({ ...company, moat: p })}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Management" key="5">
                  <StoryManagement
                    value={company.management}
                    onChange={(p) =>
                      updateCompany({ ...company, management: p })
                    }
                  />
                </Tabs.TabPane>

                {company.parts.map((part, i) => (
                  <Tabs.TabPane tab={part.title} key={(100 + i).toString()}>
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
                  </Tabs.TabPane>
                ))}

                <Tabs.TabPane tab="Checklist" key="6">
                  <StoryChecklist
                    value={company.checklist}
                    onChange={(p) =>
                      updateCompany({ ...company, checklist: p })
                    }
                    extraData={checklistItems}
                  />
                </Tabs.TabPane>

                <Tabs.TabPane tab="Verdict" key="7">
                  <StoryVerdict
                    value={company.verdict}
                    onChange={(p) => updateCompany({ ...company, verdict: p })}
                    extraData={categories}
                  />
                </Tabs.TabPane>
              </Tabs>
            </PageHeader>
          </div>
        )}
      </Spin>
    </>
  );
};

export default Story;
