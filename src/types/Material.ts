export type PayloadMaterial = {
  berat_kg: number;
  volume_liter: number;
  dikeringkan_pada_hari: string;
  catatan: string;
};

export type PayloadUpdateMaterial = PayloadMaterial & {
  id: string;
};

export type Material = {
  id: string;
  berat_kg: string;
  volume_liter: string;
  dikeringkan_pada_hari: string;
  catatan: string;
};

export type ResponseMaterial = {
  bahan: Material[];
};
