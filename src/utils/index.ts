export const getProvince = (lokasi: string) =>
  lokasi?.substring(0, 5) + '00000';

export const formatValue = (value: number, format: string) =>
  value > 0 ? `${value} ${format}` : value;

export function capitalize(word: string): string {
  return word?.charAt(0)?.toUpperCase() + word?.slice(1) ?? '';
}

export function getFirstCharacter(profileName: string | boolean) {
  return typeof profileName === 'string' ? profileName.charAt(0) : '';
}
