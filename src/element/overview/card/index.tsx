import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Grid,
  GridItem,
} from '@chakra-ui/react';

function CardSummary() {
  return (
    <Grid w="full" templateColumns="repeat(3, 1fr)" gap={6}>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="lg" letterSpacing="0.05rem">
              Panen
            </Text>
          </CardHeader>

          <CardBody>
            <Text as="h2" fontSize="5xl" fontWeight={600} letterSpacing="-0.05rem" align="right">
              83
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
            <Text as="h2" fontSize="5xl" fontWeight={600} letterSpacing="-0.05rem" align="right">
              220
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
            <Text as="h2" fontSize="5xl" fontWeight={600} letterSpacing="-0.05rem" align="right">
              44
            </Text>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default CardSummary;
