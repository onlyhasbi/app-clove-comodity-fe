import { Grid, GridItem, Show } from '@chakra-ui/react';
import Sidebar from './sidebar';
import Header from './header';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.hook';

const Layout = () => {
  const isAuthSuccess = useAuth();
  if (!isAuthSuccess) return null;

  return (
    <Grid
      gridTemplateAreas={{
        base: `"nav" "aside" "main"`,
        lg: `"aside nav" "aside main"`,
      }}
      gridTemplateColumns={{ base: '1fr', lg: '230px 1fr' }}
      minH="100vh"
    >
      <GridItem area="aside">
        <Sidebar />
      </GridItem>
      <Show above="lg">
        <GridItem area="nav">
          <Header />
        </GridItem>
      </Show>
      <GridItem
        area="main"
        overflow="hidden"
        minH="100vh"
        placeItems="self-start"
      >
        {<Outlet />}
      </GridItem>
    </Grid>
  );
};

export default Layout;
