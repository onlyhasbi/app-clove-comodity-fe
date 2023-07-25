import { TSchemaLahan } from './schema';

export type TUpdate = TSchemaLahan & { id: string };

type TActionTable = {
  update: TUpdate;
  delete: { id: string };
};

export type TTableLahan = TSchemaLahan & { action: TActionTable };
