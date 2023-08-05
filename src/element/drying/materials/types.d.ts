import { TSchemaBahan, TSchemaUpdateBahan, TSchemaDeleteBahan } from './schema';

type TActionTable = {
  update: TSchemaUpdateBahan;
  delete: TSchemaDeleteBahan;
};

export type TTableBahan = {
  berat_kg: string;
  volume_liter: string;
  waktu_mulai: string;
  catatan: string;
} & {
  action: TActionTable;
};
