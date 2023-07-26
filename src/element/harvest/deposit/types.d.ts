import { schemaSetoran } from './schema';

export type TUpdate = schemaSetoran & { id: string };
export type TDelete = { id: string; lahan: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableSetoran = schemaSetoran & { action: TActionTable };
