import { z } from 'zod';
import { teamSchema } from '../features/drying/team/schema';

export type PayloadTeam = {
  nama_tim: string;
  ketua_tim: string;
};

export type UpdatePayloadTeam = PayloadTeam & {
  id: string;
};

export type Team = {
  id: string;
} & PayloadTeam;

export type ResponseTeam = {
  tim: Team[];
};

export type AddTeam = z.infer<typeof teamSchema>;
export type UpdateTeam = AddTeam & { id: string };
export type DeleteTeam = { id: string };

export type TUpdate = PayloadTeam & { id: string };

type TeamActionTable = {
  update: TUpdate;
  delete: { id: string; nama: string };
};

export type TeamTable = PayloadTeam & { action: TeamActionTable };
