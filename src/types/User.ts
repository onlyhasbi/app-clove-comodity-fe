export type UserBuruh = {
  id: string;
  nama: string;
  jenis_kelamin: string;
  alamat: string;
};

export type ResponseUserBuruh = {
  user: UserBuruh[];
};
