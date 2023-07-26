import { schemaPekerjaan } from './schema';

export type TUpdate = schemaPekerjaan & { id: string };
export type TDelete = { id: string; nama: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTablePekerjaan = schemaPekerjaan & { action: TActionTable };
