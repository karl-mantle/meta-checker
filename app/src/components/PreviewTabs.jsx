import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Data from "./components/views/Data.jsx";
import Facebook from "./components/views/Facebook.jsx";
import LinkedIn from "./components/views/LinkedIn.jsx";
import Teams from "./components/views/Teams.jsx";
import WhatsApp from "./components/views/WhatsApp.jsx";
import styles from "./PreviewTabs.module.css";

export default function PreviewTabs({ meta, url }) {
  return (
    <section className={styles.previewTabsWrapper}>
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
  );
}
