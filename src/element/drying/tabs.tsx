import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import BahanPengeringan from './materials';
import HasilPengeringan from './results';

const TabsPengeringan = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Tim</Tab>
        <Tab>Bahan</Tab>
        <Tab>Hasil</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <>Tim</>
        </TabPanel>
        <TabPanel>
          <BahanPengeringan />
        </TabPanel>
        <TabPanel>
          <HasilPengeringan />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsPengeringan;
