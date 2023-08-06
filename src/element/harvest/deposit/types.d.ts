import { TDeleteSetoran, TUpdateSetoran, schemaSetoran } from './schema';

type TActionTable = {
  update: TUpdateSetoran;
  delete: TDeleteSetoran;
};

export type TTableSetoran = schemaSetoran & { action: TActionTable };
