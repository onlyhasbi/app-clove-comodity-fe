import { schemaTim } from './schema';

export type TUpdate = schemaTim & { id: string };
export type TDelete = { id: string; nama: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTableTim = schemaTim & { action: TActionTable };
