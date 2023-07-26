import { schemaHasilPengeringan } from './schema';

export type TUpdate = schemaHasilPengeringan & { id: string };
export type TDelete = { id: string; tim: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableHasilPengeringan = schemaHasilPengeringan & { action: TActionTable };
