import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';

const sidebarMenu = [
  { label: 'Overview', path: '/' },
  { label: 'Panen', path: '/panen' },
  { label: 'Pengeringan', path: '/pengeringan' },
  { label: 'Jual/beli', path: '/transaksi' },
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
      <Box width="130px" marginX="auto">
        <img src={logo} alt="clove-comodity-logo" />
      </Box>
      <Box width="80%" marginX="auto">
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
