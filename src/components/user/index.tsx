import { SkeletonText } from '@chakra-ui/react';
import { useAllUserAcc, useAllUserBuruh } from '../../hooks/useUser.hook';

export function LabelUser({ id }: { id: string }) {
  const allUserAcc = useAllUserAcc();
  const users = allUserAcc?.data?.data?.data?.user;

  return allUserAcc.isLoading ? (
    <SkeletonText noOfLines={1} height={2} width="2rem" />
  ) : (
    users?.find((item: GetUser) => item.id === id).nama
  );
}

export function LabelBuruh({ id }: { id: string }) {
  const allUserBuruh = useAllUserBuruh();
  const users = allUserBuruh?.data?.data?.data?.user;

  return allUserBuruh.isLoading ? (
    <SkeletonText noOfLines={1} height={2} width="2rem" />
  ) : (
    users?.find((item: GetBuruh) => item.id === id).nama
  );
}
