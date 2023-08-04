import {
  schemaPenawaran,
  TSchemaUpdatePenawaran,
  TSchemaDeletePenawaran,
} from './schema';

type TActionTable = {
  update: TSchemaUpdatePenawaran;
  delete: TSchemaDeletePenawaran;
};

export type TTablePenawaran = schemaPenawaran & { action: TActionTable };
