import { schemaPenawaran } from './schema';

export type TUpdate = schemaPenawaran & { id: string };
export type TDelete = { id: string };

type TActionTable = {
  update: TUpdate;
  delete: TDelete;
};

export type TTablePenawaran = schemaPenawaran & { action: TActionTable };
