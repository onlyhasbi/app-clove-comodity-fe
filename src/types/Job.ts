import { z } from 'zod';
import { jobSchema } from '../features/job/schema';

export type PayloadJob = {
  jenis_pekerjaan: string;
  upah_rp: number;
  indikator_ukur: string;
  catatan: string;
};

export type PayloadUpdateJob = PayloadJob & {
  id: string;
};

export type Job = {
  id: string;
  jenis_pekerjaan: string;
  upah_rp: number;
  indikator_ukur: string;
  catatan: string;
  status_lowongan: boolean;
  status_referensi: boolean;
};

export type ResponseJob = {
  lowongan: Job[];
};

export type AddJob = z.infer<typeof jobSchema>;
export type UpdateJob = AddJob & { id: string };
export type DeleteJob = { id: string };

type JobActionTable = {
  update: UpdateJob;
  delete: DeleteJob;
};

export type JobTable = AddJob & {
  status: {
    id: string;
    value: boolean;
  };
} & { action: JobActionTable };
