import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Land from './land';
import Deposit from './deposit';
import HarvestResult from './results';

const HarvestTab = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Lahan</Tab>
        <Tab>Hasil Panen</Tab>
        <Tab>Setoran</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Land />
        </TabPanel>
        <TabPanel>
          <HarvestResult />
        </TabPanel>
        <TabPanel>
          <Deposit />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default HarvestTab;
