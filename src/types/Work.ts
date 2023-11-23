export type PayloadWork = {
  jenis_pekerjaan: string;
  upah_rp: number;
  indikator_ukur: string;
  catatan: string;
};

export type PayloadUpdateWork = PayloadWork & {
  id: string;
};

export type Work = {
  id: string;
  jenis_pekerjaan: string;
  upah_rp: number;
  indikator_ukur: string;
  catatan: string;
  status_lowongan: boolean;
  status_referensi: boolean;
};

type ResponseWork = {
  lowongan: Work[];
};

export default ResponseWork;
