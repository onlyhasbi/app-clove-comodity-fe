import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';

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
    <Grid w="full" templateColumns={{ lg: 'repeat(4, 1fr)' }} gap={6}>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
              Lahan
            </Text>
          </CardHeader>

          <CardBody position="relative">
            <Text
              as="h2"
              fontSize="5xl"
              fontWeight={600}
              letterSpacing="-0.05rem"
              align="right"
            >
              {jumlahLahan}
            </Text>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
              Pengeringan
            </Text>
          </CardHeader>

          <CardBody>
            <Text
              as="h2"
              fontSize="5xl"
              fontWeight={600}
              letterSpacing="-0.05rem"
              align="right"
            >
              {jumlahPengeringan}
            </Text>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
              Komoditas
            </Text>
          </CardHeader>

          <CardBody>
            <Text
              as="h2"
              fontSize="5xl"
              fontWeight={600}
              letterSpacing="-0.05rem"
              align="right"
            >
              {jumlahKomoditas}
            </Text>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
              Transaksi
            </Text>
          </CardHeader>

          <CardBody>
            <Text
              as="h2"
              fontSize="5xl"
              fontWeight={600}
              letterSpacing="-0.05rem"
              align="right"
            >
              {jumlahTransaksi}
            </Text>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default CardSummary;
