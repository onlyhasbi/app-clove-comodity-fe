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
      <Wrap spacing={3} mx="auto">
        <form>
          <Grid templateColumns={{ lg: 'repeat(2,1fr)', base: '1fr' }} gap={4}>
            <FormControl>
              <Input type="text" placeholder="Nama" />
            </FormControl>

            <FormControl>
              <Select placeholder="Jenis Pengguna">
                {['perorangan', 'UMKM/KLP.Tani', 'CV', 'PT'].map((item) => (
                  <option key={item} value={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </Select>
            </FormControl>

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

            <FormControl>
              <Select placeholder="Provinsi">
                {/* load from api provinsi */}
              </Select>
            </FormControl>

            <FormControl>
              <Select placeholder="Kabupaten / Kota">
                {/* load from api kabupaten */}
              </Select>
            </FormControl>
            <FormControl>
              <Input type="tel" placeholder="Nomor telepon" />
            </FormControl>

            <FormControl>
              <Input type="password" placeholder="Kata sandi" />
            </FormControl>

            <GridItem colSpan={2}>
              <FormControl>
                <Textarea placeholder="Alamat" rows={3} />
              </FormControl>
            </GridItem>
          </Grid>
          <Flex marginY={3} justifyContent="space-between">
            <Checkbox value="setuju" defaultChecked={true}>
              saya setuju dengan ketentuan yang berlaku
            </Checkbox>
            <Button
              type="submit"
              display="block"
              colorScheme="green"
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
