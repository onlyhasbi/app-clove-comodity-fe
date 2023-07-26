import { schemaHasil } from './schema';

export type TUpdate = schemaHasil & { id: string };
export type TDelete = { id: string; lahan: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableHasil = schemaHasil & { action: TActionTable };
