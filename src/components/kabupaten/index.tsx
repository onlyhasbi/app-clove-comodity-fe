import { SkeletonText } from '@chakra-ui/react';
import { useKabupaten } from '../../hooks/useLocation.hook';
import { getProvince } from '../../utils/getProvince';

type Props = { value: string };

const Kabupaten = ({ value }: Props) => {
  const provinsiValue = getProvince(value);
  const getKabupaten = useKabupaten(provinsiValue);

  if (getKabupaten.isLoading)
    return <SkeletonText width="full" noOfLines={1} skeletonHeight="2" />;

  if (getKabupaten.isSuccess)
    return getKabupaten.data?.data?.lokasi?.sub_lokasi?.find(
      (provinsi) => provinsi.id_lokasi === value
    )?.nama_lokasi;

  return undefined;
};

export default Kabupaten;
