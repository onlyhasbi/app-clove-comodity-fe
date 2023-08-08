import { useGetMaterial } from '../../hooks/useMaterial.hook';
import { Select } from '@chakra-ui/react';

type Props = { onSetBahan: (value: string) => void };

const SelectBahanPengeringan = ({ onSetBahan }: Props) => {
  const getBahanPengeringan = useGetMaterial();
  const bahanPengeringan = getBahanPengeringan?.data?.data?.data.bahan;

  return (
    <Select
      variant="unstyled"
      placeholder="Pilih bahan"
      onChange={(e) => onSetBahan(e.target.value)}
    >
      {bahanPengeringan?.map(({ id }: GetBahan) => (
        <option key={id} value={id}>
          {id}
        </option>
      ))}
    </Select>
  );
};

export default SelectBahanPengeringan;
