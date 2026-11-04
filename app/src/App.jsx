import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UrlForm from "./components/UrlForm.jsx";
import Data from "./components/views/Data.jsx";
import Facebook from "./components/views/Facebook.jsx";
import LinkedIn from "./components/views/LinkedIn.jsx";
import Teams from "./components/views/Teams.jsx";
import WhatsApp from "./components/views/WhatsApp.jsx";

const defaultPreview = {
  title: "",
  description: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  favicon: "",
};

export default function App() {
  /* states */
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [meta, setMeta] = useState(defaultPreview);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <>
      <UrlForm
        url={url}
        username={username}
        password={password}
        loading={loading}
        setUrl={setUrl}
        setUsername={setUsername}
        setPassword={setPassword}
        setMeta={setMeta}
        setError={setError}
        setLoading={setLoading}
        setPreview={setPreview}
      />

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {preview === true && (
        <section>
          <h2>Preview</h2>
          <Tabs>
            <TabList>
              <Tab>Data</Tab>
              <Tab>Facebook</Tab>
              <Tab>LinkedIn</Tab>
              <Tab>Teams</Tab>
              <Tab>WhatsApp</Tab>
            </TabList>

            <TabPanel>
              <Data meta={meta} url={url} />
            </TabPanel>
            <TabPanel>
              <Facebook meta={meta} url={url} />
            </TabPanel>
            <TabPanel>
              <LinkedIn meta={meta} url={url} />
            </TabPanel>
            <TabPanel>
              <Teams meta={meta} url={url} />
            </TabPanel>
            <TabPanel>
              <WhatsApp meta={meta} url={url} />
            </TabPanel>
          </Tabs>
        </section>
      )}
    </>
  );
}
