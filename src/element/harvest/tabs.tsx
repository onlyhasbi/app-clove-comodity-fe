import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Lahan from './land';
import Setoran from './deposit';
import Hasil from './results';

const TabsPanen = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Lahan</Tab>
        <Tab>Setoran</Tab>
        <Tab>Hasil Panen</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Lahan />
        </TabPanel>
        <TabPanel>
          <Setoran />
        </TabPanel>
        <TabPanel>
          <Hasil />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsPanen;
