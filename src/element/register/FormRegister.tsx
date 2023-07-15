import {
  Box,
  Flex,
  FormControl,
  Input,
  Radio,
  Select,
  RadioGroup,
  Stack,
  Text,
  Wrap,
  Textarea,
  Grid,
  GridItem,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import { numberOfDate, months, numberOfYear } from '../../model/date.model';
import { useState } from 'react';

function SignUpForm() {
  const [checked, setChecked] = useState('');

  return (
    <Wrap width="2xl" color="gray.700">
      <Box width="full" padding={4} pt={2}>
        <Text fontSize="3xl" fontWeight="bold">
          Daftar
        </Text>
        <Text fontSize="sm" color="gray.600">
          Cepat dan mudah.
        </Text>
      </Box>
      <Wrap spacing={3} width="full" p={4} pt={2} mx="auto">
        <form>
          <Grid templateColumns="repeat(2,1fr)" gap={6}>
            <Grid gap={3}>
              <GridItem>
                <FormControl>
                  <Input type="text" placeholder="Nama" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Input type="tel" placeholder="Nomor telepon" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Input type="password" placeholder="Kata sandi" />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Text fontSize="sm" mb={2} color="gray.500">
                    Tanggal lahir
                  </Text>
                  <Flex gap={4} width="full">
                    <Select placeholder="Tanggal">
                      {numberOfDate.map((date, i) => (
                        <option key={i} value={date}>
                          {date}
                        </option>
                      ))}
                    </Select>
                    <Select placeholder="Bulan">
                      {months.map((month, i) => (
                        <option key={i} value={month.toLowerCase()}>
                          {month}
                        </option>
                      ))}
                    </Select>
                    <Select placeholder="Tahun">
                      {numberOfYear.map((year, i) => (
                        <option key={i} value={year}>
                          {year}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Text fontSize="sm" mb={2} color="gray.500">
                    Jenis kelamin
                  </Text>
                  <RadioGroup value={checked} onChange={setChecked}>
                    <Stack direction="row">
                      <Radio value="male">Male</Radio>
                      <Radio value="female">Female</Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </GridItem>
            </Grid>

            {/* grid right */}
            <Grid gap={3}>
              <GridItem>
                <FormControl>
                  <Textarea placeholder="Alamat" rows={4} />
                </FormControl>
              </GridItem>
              <GridItem>
                <FormControl>
                  <Select placeholder="Jenis Pengguna">
                    {['perorangan', 'UMKM/KLP.Tani', 'CV', 'PT'].map((item) => (
                      <option key={item} value={item}>
                        {item.toUpperCase()}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <Select placeholder="Provinsi">
                    {/* load from api provinsi */}
                  </Select>
                </FormControl>
              </GridItem>

              <GridItem>
                <FormControl>
                  <Select placeholder="Kabupaten / Kota">
                    {/* load from api kabupaten */}
                  </Select>
                </FormControl>
              </GridItem>
            </Grid>
          </Grid>
          <Flex marginY={6} justifyContent="space-between">
            <Checkbox value="setuju" defaultChecked={true}>
              saya setuju dengan ketentuan yang berlaku
            </Checkbox>
            <Button
              type="submit"
              display="block"
              bg="brand.100"
              color="white"
              width="10em"
            >
              Submit
            </Button>
          </Flex>
        </form>
      </Wrap>
    </Wrap>
  );
}

export default SignUpForm;
