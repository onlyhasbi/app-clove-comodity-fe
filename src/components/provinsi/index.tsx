import { SkeletonText } from '@chakra-ui/react';
import { useProvinsi } from '../../hooks/useLocation.hook';
import { getProvince } from "../../utils/getProvince";

type Props = { value: string };

const Provinsi = ({ value }: Props) => {
  const provinsiValue = getProvince(value);
  const getProvinsi = useProvinsi();

  if (getProvinsi.isLoading)
    return <SkeletonText width="full" noOfLines={1} skeletonHeight="2" />;

  if (getProvinsi.isSuccess)
    return getProvinsi.data?.data?.lokasi?.sub_lokasi?.find(
      (provinsi) => provinsi.id_lokasi === provinsiValue
    )?.nama_lokasi;

  return undefined;
};

export default Provinsi;
