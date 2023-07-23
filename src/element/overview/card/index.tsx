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
              83
            </Text>
            <Box position="absolute" bottom={5} left="2rem" color="gray.100">
              <Wheat width={100} height={100} />
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
              220
            </Text>
            <Box position="absolute" bottom={5} left="2rem" color="gray.100">
              <SunMedium width={100} height={100} />
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
            <Box position="absolute" bottom={5} left="2rem" color="gray.100">
              <Wallet2 width={100} height={100} />
            </Box>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default CardSummary;
