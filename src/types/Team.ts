export type PayloadTim = {
  nama_tim: string;
  ketua_tim: string;
};

export type PayloadUpdateTim = PayloadTim & {
  id: string;
};

export type Tim = {
  id: string;
  nama_tim: string;
  ketua_tim: string;
};

export type ResponseTim = {
  tim: Tim[];
};
