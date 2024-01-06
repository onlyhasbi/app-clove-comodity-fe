import { Team } from "../../../types/Team";

export const tableAdapter = (payloads: Team[]) => {
  return payloads?.map((payload: Team) => {
    const { id, nama_tim, ketua_tim } = payload;

    return {
      nama_tim,
      ketua_tim,
      action: {
        update: {
          id,
          nama_tim,
          ketua_tim,
        },
        delete: {
          id,
        },
      },
    };
  });
};
