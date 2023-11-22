import { schemaPenjualan } from './schema';

export type TUpdate = schemaPenjualan & { id: string };
export type TDelete = { id: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTablePenjualan = schemaPenjualan & { action: TActionTable };
