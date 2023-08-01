import { TSchemaDeleteHasil, TSchemaUpdateHasil, schemaHasil } from './schema';

type TActionTable = {
  update: TSchemaUpdateHasil;
  delete: TSchemaDeleteHasil;
};

export type TTableHasil = schemaHasil & { action: TActionTable };
