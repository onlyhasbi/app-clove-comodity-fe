type Sublocation = {
  kategori_lokasi: string;
  nama_lokasi: string;
  id_kategori: string;
  id_lokasi: string;
};

export type LocationProps = {
  id_kategori: string;
  id_lokasi: string;
  kategori_lokasi: string;
  nama_lokasi: string;
};

type Location = {
  lokasi: {
    id_lokasi: string;
    id_kategori: string;
    kategori_lokasi: string;
    nama_lokasi: string;
    jumlah_sub_lokasi: number;
    sub_lokasi: Sublocation[];
  };
};

export default Location;
