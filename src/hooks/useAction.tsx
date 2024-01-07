import { useCallback, useState } from 'react';

function useAction<T, V>() {
  const [action, setAction] = useState<{
    add?: boolean;
    update?: T;
    delete?: V;
  } | null>(null);

  const handleOpenModalAdd = useCallback(
    () => setAction((prev) => ({ ...prev, add: true })),
    []
  );

  const handleOpenModalUpdate = useCallback(
    (data: T) => setAction((prev) => ({ ...prev, update: data })),
    []
  );

  const handleOpenModalDelete = useCallback(
    (data: V) => setAction((prev) => ({ ...prev, delete: data })),
    []
  );

  const handleReset = useCallback(() => setAction(null), []);

  return {
    action,
    handleOpenModalAdd,
    handleOpenModalUpdate,
    handleOpenModalDelete,
    handleReset,
  };
}

export default useAction;
