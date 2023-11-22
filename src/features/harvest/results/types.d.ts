import { TDeletePanen, TUpdatePanen, schemaHasil } from './schema';

type TActionTable = {
  update: TUpdatePanen;
  delete: TDeletePanen;
};

export type TTableHasil = schemaHasil & { action: TActionTable };
