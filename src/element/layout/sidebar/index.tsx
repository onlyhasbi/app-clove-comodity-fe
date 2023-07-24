import { Box, Divider, Flex, Show, Text } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import Header from '../header';

const sidebarMenu = [
  { label: 'Ikhtisar', path: '/' },
  { label: 'Panen', path: '/harvest' },
  { label: 'Pengeringan', path: '/dry' },
  { label: 'Jual/beli', path: '/transaction' },
];

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Flex
      direction="column"
      minH="full"
      gap={10}
      paddingTop={10}
      borderRight="1px"
      borderColor="gray.100"
    >
      <Box width={{ lg: '130px', base: '15rem' }} marginX="auto">
        <img src={logo} alt="clove-comodity-logo" />
      </Box>
      <Show below="lg">
        <Header />
      </Show>
      <Box
        width={{ base: 'full', lg: '80%' }}
        paddingX={{ base: 6, lg: 0 }}
        marginX="auto"
      >
        {sidebarMenu.map((item, index) => {
          const isSelected = item.path === currentPath;
          return (
            <div key={item.path}>
              <Box paddingX={5} paddingY={3}>
                <Link to={item.path}>
                  <Text color={isSelected ? 'brand.100' : 'current'}>
                    {item.label}
                  </Text>
                </Link>
              </Box>
              {index + 1 < sidebarMenu.length && (
                <Divider borderBottomColor="gray.300" />
              )}
            </div>
          );
        })}
      </Box>
    </Flex>
  );
};

export default Sidebar;
