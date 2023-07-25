import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Penjualan from './sell';
import Pembelian from './buy';

const TabsTransaksi = () => {
  return (
    <Tabs colorScheme="green">
      <TabList>
        <Tab>Jual</Tab>
        <Tab>Beli</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Penjualan />
        </TabPanel>
        <TabPanel>
          <Pembelian />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default TabsTransaksi;
