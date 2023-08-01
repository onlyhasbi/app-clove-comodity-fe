import { TSchemaDeleteSetoran, TSchemaUpdateSetoran, schemaSetoran } from './schema';

type TActionTable = {
  update: TSchemaUpdateSetoran;
  delete: TSchemaDeleteSetoran;
};

export type TTableSetoran = schemaSetoran & { action: TActionTable };
