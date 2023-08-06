// import { useGetTim } from '../../hooks/useTeam.hook';
// import { SkeletonText } from '@chakra-ui/react';

// type Props = { value: string };

// const Team = ({ value }: Props) => {
//   const getTim = useGetTim();
//   const teams = getTim.data?.data?.data?.tim;

//   if (getTim.isLoading)
//     return <SkeletonText width="full" noOfLines={1} skeletonHeight="2" />;

//   if (getTim.isSuccess)
//     return teams.find((team: GetTim) => team.id === value)?.nama_tim;

//   return undefined;
// };

// export default Team;
