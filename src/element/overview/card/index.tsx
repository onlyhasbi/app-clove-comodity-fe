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
            <Text as="h3" fontSize="xl">
              Panen
            </Text>
          </CardHeader>

          <CardBody>
            <Text as="h2" fontSize="6xl" align="right">
              83
            </Text>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="xl">
              Pengeringan
            </Text>
          </CardHeader>

          <CardBody>
            <Text as="h2" fontSize="6xl" align="right">
              220
            </Text>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem>
        <Card>
          <CardHeader>
            <Text as="h3" fontSize="xl">
              Transaksi
            </Text>
          </CardHeader>

          <CardBody>
            <Text as="h2" fontSize="6xl" align="right">
              44
            </Text>
          </CardBody>
        </Card>
      </GridItem>
    </Grid>
  );
}

export default CardSummary;
