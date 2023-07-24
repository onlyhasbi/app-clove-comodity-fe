import { Grid } from '@chakra-ui/react';
import TabelBuruh from './labor';
import TabelPenawaran from './offer';

function TableInfo() {
  return (
    <Grid gridTemplateColumns={{ lg: '380px 1fr', base: '1fr' }} gap={7}>
      <TabelBuruh />
      <TabelPenawaran />
    </Grid>
  );
}

export default TableInfo;
