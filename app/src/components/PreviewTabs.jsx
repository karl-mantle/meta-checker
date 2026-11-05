import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Data from "./views/Data.jsx";
import Facebook from "./views/Facebook.jsx";
import LinkedIn from "./views/LinkedIn.jsx";
import Teams from "./views/Teams.jsx";
import WhatsApp from "./views/WhatsApp.jsx";

export default function PreviewTabs({ meta, url }) {
  return (
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
  );
}
