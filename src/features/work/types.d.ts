import {
  TDeletePekerjaan,
  TUpdatePekerjaan,
  schemaPekerjaan,
} from './schema';

type TActionTable = {
  update: TUpdatePekerjaan;
  delete: TDeletePekerjaan;
};

export type TTablePekerjaan = schemaPekerjaan & { action: TActionTable };
