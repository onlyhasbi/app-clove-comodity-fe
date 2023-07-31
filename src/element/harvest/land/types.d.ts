import { TSchemaLahan } from './schema';

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableLahan = TSchemaLahan & {
  hasil_panen: string;
  action: TActionTable;
};
