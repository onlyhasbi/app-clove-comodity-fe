import { Tim } from '../../types/Team';
import { useGetTim } from '../../hooks/useTeam.hook';
import { SkeletonText } from '@chakra-ui/react';

type Props = { id: string };

const Team = ({ id }: Props) => {
  const { data, isSuccess, isLoading } = useGetTim();
  const teams = isSuccess ? data?.data?.tim : [];

  if (isLoading) return <SkeletonText noOfLines={1} height={2} width="2rem" />;
  return teams?.find((team: Tim) => team.id === id)?.nama_tim;
};

export default Team;
