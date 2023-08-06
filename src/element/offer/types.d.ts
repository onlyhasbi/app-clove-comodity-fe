import {
  schemaPenawaran,
  TUpdatePenawaran,
  TDeletePenawaran,
} from './schema';

type TActionTable = {
  update: TUpdatePenawaran;
  delete: TDeletePenawaran;
};

export type TTablePenawaran = schemaPenawaran & { action: TActionTable };
