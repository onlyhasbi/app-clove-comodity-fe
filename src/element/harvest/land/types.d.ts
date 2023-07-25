import { TSchemaLahan } from './schema';

export type TUpdate = TSchemaLahan & { id: string };
export type TDelete = { id: string; nama: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableLahan = TSchemaLahan & { action: TActionTable };
