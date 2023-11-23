import { Material } from '../../types/Material';
import { useGetMaterial } from '../../hooks/useMaterial.hook';
import { Select } from '@chakra-ui/react';

type Props = { onSetBahan: (value: string) => void };

const SelectDryMaterial = ({ onSetBahan }: Props) => {
  const getBahanPengeringan = useGetMaterial();
  const bahanPengeringan = getBahanPengeringan?.data?.data?.bahan;

  return (
    <Select
      variant="unstyled"
      placeholder="Pilih bahan"
      onChange={(e) => onSetBahan(e.target.value)}
    >
      {bahanPengeringan?.map(({ id }: Material) => (
        <option key={id} value={id}>
          {id}
        </option>
      ))}
    </Select>
  );
};

export default SelectDryMaterial;
