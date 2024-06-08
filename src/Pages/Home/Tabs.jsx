import { Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Tabs = () => {
  return (
    <div>
      <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  );
};

export default Tabs;
