import { Card, CardHeader, CardBody, Text, Stack, Box } from '@chakra-ui/react';
import { Wallet2, Wheat, SunMedium, Sprout } from 'lucide-react';

type Props = {
  cardProps: {
    jumlahPengeringan: JSX.Element | number;
    jumlahKomoditas: JSX.Element | number;
    jumlahTransaksi: JSX.Element | number;
    jumlahLahan: JSX.Element | number;
  };
};

function CardSummary({
  cardProps: {
    jumlahPengeringan,
    jumlahKomoditas,
    jumlahTransaksi,
    jumlahLahan,
  },
}: Props) {
  return (
    <Stack direction={{ lg: 'row', base: 'column' }} gap={8} flexFlow="wrap">
      <Card flex={1} minW="180px">
        <CardHeader>
          <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
            Lahan
          </Text>
        </CardHeader>

        <CardBody paddingRight={8} color="gray.600" position="relative">
          <Text
            as="h2"
            fontSize="5xl"
            fontWeight={600}
            letterSpacing="-0.05rem"
            align="right"
          >
            {jumlahLahan}
          </Text>
          <Box position="absolute" bottom="1.6rem" left="2rem" color="#F1F5F9">
            <Sprout width={70} height={70} />
          </Box>
        </CardBody>
      </Card>
      <Card flex={1} minW="180px">
        <CardHeader>
          <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
            Pengeringan
          </Text>
        </CardHeader>

        <CardBody paddingRight={8} color="gray.600">
          <Text
            as="h2"
            fontSize="5xl"
            fontWeight={600}
            letterSpacing="-0.05rem"
            align="right"
          >
            {jumlahPengeringan}
          </Text>
          <Box position="absolute" bottom="2rem" left="2rem" color="#F1F5F9">
            <SunMedium width={65} height={65} />
          </Box>
        </CardBody>
      </Card>
      <Card flex={1} minW="180px">
        <CardHeader>
          <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
            Komoditas
          </Text>
        </CardHeader>

        <CardBody paddingRight={8} color="gray.600">
          <Text
            as="h2"
            fontSize="5xl"
            fontWeight={600}
            letterSpacing="-0.05rem"
            align="right"
          >
            {jumlahKomoditas}
          </Text>
          <Box position="absolute" bottom="2rem" left="2rem" color="#F1F5F9">
            <Wheat width={57} height={57} />
          </Box>
        </CardBody>
      </Card>
      <Card flex={1} minW="180px">
        <CardHeader>
          <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
            Transaksi
          </Text>
        </CardHeader>

        <CardBody paddingRight={8} color="gray.600">
          <Text
            as="h2"
            fontSize="5xl"
            fontWeight={600}
            letterSpacing="-0.05rem"
            align="right"
          >
            {jumlahTransaksi}
          </Text>
          <Box position="absolute" bottom="2rem" left="2rem" color="#F1F5F9">
            <Wallet2 width={59} height={59} />
          </Box>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default CardSummary;
