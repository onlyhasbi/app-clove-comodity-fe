import { schemaBahanPengeringan } from './schema';

export type TUpdate = schemaBahanPengeringan & { id: string };
export type TDelete = { id: string; berat_kg: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableBahanPengeringan = schemaBahanPengeringan & {
  action: TActionTable;
};
