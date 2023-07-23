import { Grid } from '@chakra-ui/react';
import TabelBuruh from './labor/table';
import TabelPenawaran from './offer/table';

function TableInfo() {
  return (
    <Grid gridTemplateColumns={{ lg: '380px 1fr' }} gap={7}>
      <TabelBuruh />
      <TabelPenawaran />
    </Grid>
  );
}

export default TableInfo;
