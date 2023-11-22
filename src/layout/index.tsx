import { Grid, GridItem, Show } from '@chakra-ui/react';
import Sidebar from './sidebar';
import Header from '../layout/header';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../hooks/useAuth.hook';
import { useEffect } from 'react';

const Layout = () => {
  const isAuthSuccess = isAuthenticated(import.meta.env.VITE_TOKEN_NAME);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthSuccess) navigate('/signin', { replace: true });
  }, [isAuthSuccess, navigate]);

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
      <GridItem area="main" overflowX="hidden" minH="100vh">
        {<Outlet />}
      </GridItem>
    </Grid>
  );
};

export default Layout;
