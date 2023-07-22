import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Lahan from './lahan';
import Setoran from './setoran';
import Hasil from './hasil';

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
