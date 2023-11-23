import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import DryMaterial from './materials';
import DryResult from './results';
import Team from './team';

const DryingTab = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Tim</Tab>
        <Tab>Bahan</Tab>
        <Tab>Hasil</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Team />
        </TabPanel>
        <TabPanel>
          <DryMaterial />
        </TabPanel>
        <TabPanel>
          <DryResult />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default DryingTab;
