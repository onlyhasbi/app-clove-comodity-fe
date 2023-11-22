export const tableAdapter = (payloads: GetTim[]) => {
  return payloads?.map((payload: GetTim) => {
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
