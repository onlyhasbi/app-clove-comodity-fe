import { HStack, Box, Divider, Flex, Show, Text } from '@chakra-ui/react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import Header from '../header';
import { Wallet2, Wheat, SunMedium, LayoutPanelLeft } from 'lucide-react';

const sidebarMenu = [
  { label: 'Ikhtisar', path: '/', Icon: LayoutPanelLeft },
  { label: 'Panen', path: '/harvest', Icon: Wheat },
  { label: 'Pengeringan', path: '/dry', Icon: SunMedium },
  { label: 'Transaksi', path: '/transaction', Icon: Wallet2 },
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
          const { Icon } = item;
          return (
            <div key={item.path}>
              <HStack paddingX={5} paddingY={3} gap={3}>
                <Icon
                  width={16}
                  height={16}
                  color={isSelected ? '#2F855A' : '#334155'}
                />
                <Link to={item.path}>
                  <Text color={isSelected ? '#64748B' : '#334155'}>
                    {item.label}
                  </Text>
                </Link>
              </HStack>
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
