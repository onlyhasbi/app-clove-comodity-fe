import { useAllUserAcc, useAllUserBuruh } from '../../hooks/useUser.hook';

export function LabelUser({ id }: { id: string }) {
  const allUserAcc = useAllUserAcc();
  const users = allUserAcc?.data?.data?.data?.user;

  return users?.find((item: GetUser) => item.id === id).nama || id;
}

export function LabelBuruh({ id }: { id: string }) {
  const allUserBuruh = useAllUserBuruh();
  const users = allUserBuruh?.data?.data?.data?.user;

  return users?.find((item: GetBuruh) => item.id === id).nama || id;
}
