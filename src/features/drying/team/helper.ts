import { Tim } from "../../../types/Team";

export const tableAdapter = (payloads: Tim[]) => {
  return payloads?.map((payload: Tim) => {
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
