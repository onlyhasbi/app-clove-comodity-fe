import { STATUS_LAHAN } from '../../model/status-lahan.model';

type Props = {
  value: string;
};

const LandStatus = ({ value }: Props) => {
  return STATUS_LAHAN.find((item) => item.value === value)?.label;
};

export default LandStatus;
