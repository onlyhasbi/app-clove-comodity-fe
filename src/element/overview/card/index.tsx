import { useGetPengeringan } from '../../../hooks/useDryResult.hook';
import { useGetHasil } from '../../../hooks/useResult.hook';
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
  const hasilPanen = useGetHasil();
  const hasilPengeringan = useGetPengeringan();
  const hasilTransaksi = 0;

  const jumlahPanen = hasilPanen.isSuccess
    ? hasilPanen?.data?.data?.data?.jumlah_hasil_panen
    : 0;

  const jumlahPengeringan = hasilPengeringan.isSuccess
    ? hasilPengeringan?.data?.data?.data?.jumlah_hasil
    : 0;

  // console.log(hasilPengeringan?.data?.data?.data)

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
              {jumlahPanen}
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
              {jumlahPengeringan}
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
