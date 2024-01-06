import { Team as TTeam } from '../../types/Team';
import { useGetTeam } from '../../hooks/useTeam.hook';
import { SkeletonText } from '@chakra-ui/react';

type Props = { id: string };

const Team = ({ id }: Props) => {
  const { data, isSuccess, isLoading } = useGetTeam();
  const teams = isSuccess ? data?.data?.tim : [];

  if (isLoading) return <SkeletonText noOfLines={1} height={2} width="2rem" />;
  return teams?.find((team: TTeam) => team.id === id)?.nama_tim;
};

export default Team;
