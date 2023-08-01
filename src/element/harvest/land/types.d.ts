import { TSchemaDeleteLahan, TSchemaLahan, TSchemaUpdateLahan } from './schema';

type TActionTable = {
  update: TSchemaUpdateLahan;
  delete: TSchemaDeleteLahan;
};

export type TTableLahan = TSchemaLahan & {
  hasil_panen: string;
  action: TActionTable;
};
