import { useAllUserAcc } from '../../hooks/useUser.hook';

export default function LabelUser({ id }: { id: string }) {
  const allUserAcc = useAllUserAcc();
  const users = allUserAcc?.data?.data?.data?.user;

  return users?.find((item: GetUser) => item.id === id).nama || id;
}
