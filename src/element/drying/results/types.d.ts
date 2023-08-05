import {
  TDeletePengeringan,
  TUpdatePengeringan,
  schemaHasilPengeringan,
} from './schema';

type TActionTable = {
  update: TUpdatePengeringan;
  delete: TDeletePengeringan;
};

export type TTableHasilPengeringan = schemaHasilPengeringan & {
  action: TActionTable;
};
