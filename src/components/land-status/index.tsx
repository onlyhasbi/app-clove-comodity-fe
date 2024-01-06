import { LAND_STATUS } from '../../model/land-status.model';

type Props = {
  value: string;
};

const LandStatus = ({ value }: Props) => {
  return LAND_STATUS.find((item) => item.value === value)?.label;
};

export default LandStatus;
