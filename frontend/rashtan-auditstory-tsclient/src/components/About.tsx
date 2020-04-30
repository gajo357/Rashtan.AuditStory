import React from "react";
import Page from "./Page";
import { ArrowLeftOutlined } from "@ant-design/icons";

interface Props {
  goBack: () => void;
}

const Abount: React.FC<Props> = ({ goBack }) => (
  <Page
    loading={false}
    title="About"
    backIcon={<ArrowLeftOutlined onClick={goBack} />}
  >
    <div style={{ textAlign: "left" }}>
      <h2>Hello</h2>
      <br />
      AuditStory.com was started on the simple idea to help investors think for
      themselves.
      <br />
      While analysing a company, reading financial statements, etc., it is
      important to keep track of useful information and to take notes. Paper
      notes or applications like Evernote (really great app) were not exactly
      what I wanted or needed. So I sat down and created AuditStory.com, a note
      taking app aimed directly at investors who want to make their own
      decisions.
      <br />
      There is an abundance of data, valuations, charts, recommendations,
      screeners and alike. While all of these tools are immensely useful (I am
      subscribed to GuruFocus.com), all of them are just the starting point.
      Nothing can replace thinking for yourself, making up your own mind and
      avoiding crowd.
      <br />
      <br />
      <em>“People calculate too much and think too little.”</em> Charlie Munger
      <br />
      <br />
      Take the time to make sense of the auditing numbers and create a story
      around them. Then come back months after and review your thinking.
      <br />
      <br />
      <em>
        “I insist on a lot of time being available almost every day to just sit
        and think. That is very uncommon in American business. We read and
        think.”
      </em>{" "}
      Charlie Munger
      <br />
      <br />
      <br />
      I hope you will find AuditStory helpful
      <br />
      <em>Gavrilo Mumovic</em>
    </div>
  </Page>
);

export default Abount;
