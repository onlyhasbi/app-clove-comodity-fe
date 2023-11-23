export type Profile = {
  nama: string;
  jenis_pengguna: string;
  alamat: string;
  nomor_telpon: string;
};

export type PayloadRegisterProfile = {
  nomor_telpon: string;
  jenis_pengguna: string;
  nama: string;
  sandi: string;
  alamat: string;
};

export type ResponseProfile = {
  user : Profile;
}


export type PayloadUpdateProfile = PayloadRegisterProfile & {
  id: string;
};

// sosmed
export type InitialSosmedProps = {
  id: string;
  jenis_kontak: string;
  kontak: string;
};

export type PayloadAddSosmed = {
  jenis_kontak: string;
  kontak: string;
};

export type PayloadUpdateSosmed = {
  id: string;
  jenis_kontak: string;
  kontak: string;
};
