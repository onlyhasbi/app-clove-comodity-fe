import {
  TSchemaDeletePekerjaan,
  TSchemaUpdatePekerjaan,
  schemaPekerjaan,
} from './schema';

type TActionTable = {
  update: TSchemaUpdatePekerjaan;
  delete: TSchemaDeletePekerjaan;
};

export type TTablePekerjaan = schemaPekerjaan & { action: TActionTable };
