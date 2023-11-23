import { SkeletonText } from '@chakra-ui/react';
import { useAllUserAcc, useAllUserBuruh } from '../../hooks/useUser.hook';
import { UserBuruh } from '../../types/User';

export function LabelUser({ id }: { id: string }) {
  const { data, isSuccess, isLoading } = useAllUserAcc();
  const users = isSuccess ? data?.data?.user : [];

  if (isLoading) return <SkeletonText noOfLines={1} height={2} width="2rem" />;
  return users?.find((item: UserBuruh) => item.id === id)?.nama;
}

export function LabelBuruh({ id }: { id: string }) {
  const { data, isSuccess, isLoading } = useAllUserBuruh();
  const users = isSuccess ? data?.data?.user : [];

  if (isLoading) return <SkeletonText noOfLines={1} height={2} width="2rem" />;
  return users?.find((item: UserBuruh) => item.id === id)?.nama;
}
