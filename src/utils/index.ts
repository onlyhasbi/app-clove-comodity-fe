export const getProvince = (lokasi: string) => lokasi.substring(0, 5) + '00000';

export const formatValue = (value: number, format: string) =>
  value > 0 ? `${value} ${format}` : value;
