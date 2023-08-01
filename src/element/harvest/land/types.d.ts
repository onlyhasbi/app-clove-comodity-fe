import { TSchemaDeleteHasil, TSchemaUpdateHasil } from '../results/schema';
import { TSchemaLahan } from './schema';

type TActionTable = {
  update: TSchemaUpdateHasil;
  delete: TSchemaDeleteHasil;
};

export type TTableLahan = TSchemaLahan & {
  hasil_panen: string;
  action: TActionTable;
};
