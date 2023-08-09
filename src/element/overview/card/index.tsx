import {
  useGetPengeringan,
  useGetLahan,
  useGetKomoditas,
  useGetTransaksi,
} from '../../../hooks/useOverview.hook';
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Grid,
  GridItem,
  Spinner,
} from '@chakra-ui/react';

function CardSummary() {
  const getTransaksi = useGetTransaksi();
  const getPengeringan = useGetPengeringan();
  const getKomoditas = useGetKomoditas();
  const getLahan = useGetLahan();

  const jumlahPengeringan = getPengeringan.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getPengeringan?.data?.data?.data?.jumlah_data
  );
  const jumlahKomoditas = getKomoditas.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getKomoditas?.data?.data?.data?.jumlah_data
  );
  const jumlahTransaksi = getTransaksi.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getTransaksi?.data?.data?.data?.jumlah_data
  );
  const jumlahLahan = getLahan.isLoading ? (
    <Spinner size="sm" />
  ) : (
    getLahan?.data?.data?.data?.jumlah_data
  );

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
