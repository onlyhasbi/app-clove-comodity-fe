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
  Box,
} from '@chakra-ui/react';
import { Wallet2, Wheat, SunMedium } from 'lucide-react';

function CardSummary() {
  const getTransaksi = useGetTransaksi();
  const getPengeringan = useGetPengeringan();
  const getKomoditas = useGetKomoditas();
  const getLahan = useGetLahan();

  const jumlahPengeringan = getPengeringan?.data?.data?.data?.jumlah_pembelian;
  const jumlahKomoditas = getKomoditas?.data?.data?.data?.jumlah_data;
  const jumlahTransaksi = getTransaksi?.data?.data?.data?.jumlah_data;
  const jumlahLahan = getLahan?.data?.data?.data;

  return (
    <Grid w="full" templateColumns={{ lg: 'repeat(3, 1fr)' }} gap={6}>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
              Panen
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
              {/* {jumlahPanen} */}
            </Text>
            <Box position="absolute" bottom={5} left="2rem" color="#F1F5F9">
              <Wheat width={80} height={80} />
            </Box>
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
              {/* {jumlahPengeringan} */}
            </Text>
            <Box position="absolute" bottom={5} left="2rem" color="#F1F5F9">
              <SunMedium width={80} height={80} />
            </Box>
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
              44
            </Text>
            <Box position="absolute" bottom={5} left="2rem" color="#F1F5F9">
              <Wallet2 width={80} height={80} />
            </Box>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default CardSummary;
