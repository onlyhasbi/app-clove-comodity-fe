import { TDeleteLahan, TAddLahan, TUpdateLahan } from './schema';

type TActionTable = {
  update: TUpdateLahan;
  delete: TDeleteLahan;
};

export type TTableLahan = TAddLahan & {
  hasil_panen: string;
  action: TActionTable;
};
