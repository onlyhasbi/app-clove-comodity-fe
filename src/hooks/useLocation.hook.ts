import http from '../api';
import { url } from '../utils/config/url';
import { useQuery } from '@tanstack/react-query';
import { keys } from './helper';

type ResponseLokasi = {
  status: string;
  message: string;
  data: {
    lokasi: {
      id_lokasi: string;
      id_kategori: string;
      kategori_lokasi: string;
      nama_lokasi: string;
      jumlah_sub_lokasi: number;
      sub_lokasi: [
        {
          kategori_lokasi: string;
          nama_lokasi: string;
          id_kategori: string;
          id_lokasi: string;
        }
      ];
    };
  };
};

export const useProvinsi = () =>
  useQuery({
    queryKey: keys(url.provinsi.key),
    queryFn: () =>
      http.get<ResponseLokasi>(url.provinsi.dev).then((data) => data),
  });

export const useKabupaten = (id_provinsi: string) =>
  useQuery({
    queryKey: keys(url.kabupaten.key, id_provinsi),
    queryFn: () =>
      http
        .get<ResponseLokasi>(`${url.kabupaten.dev}/${id_provinsi}`)
        .then((data) => data),
    enabled: Boolean(id_provinsi),
  });
