import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import BahanPengeringan from './materials';

const TabsPengeringan = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Bahan</Tab>
        <Tab>Hasil</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <BahanPengeringan />
        </TabPanel>
        <TabPanel>
          <>Hasil Pengeringan</>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsPengeringan;
