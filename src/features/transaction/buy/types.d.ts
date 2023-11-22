import { schemaPembelian } from './schema';

export type TUpdate = schemaPembelian & { id: string };
export type TDelete = { id: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTablePembelian = schemaPembelian & { action: TActionTable };
