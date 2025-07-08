import { useRequest } from '@umijs/max';
import { useState } from 'react';

interface UseTableRequestOptions<P = any> {
  query: (params?: P) => Promise<any>;
  add?: (params: any) => Promise<any>;
  update?: (params: any) => Promise<any>;
  remove?: (params: any) => Promise<any>;
  defaultParams?: P;
}

export function useTableRequest<P = any>({
  query,
  add,
  update,
  remove,
  defaultParams,
}: UseTableRequestOptions<P>) {
  const [params, setParams] = useState<P | undefined>(defaultParams);
  const { data, loading, mutate, refresh } = useRequest(() => query(params), {
    refreshDeps: [params],
  });

  const handleAdd = async (values: any) => {
    if (!add) return;
    const result = await add(values);
    refresh();
    return result;
  };

  const handleUpdate = async (values: any) => {
    if (!update) return;
    const result = await update(values);
    refresh();
    return result;
  };

  const handleRemove = async (id: string) => {
    if (!remove) return;
    const result = await remove({ id });
    refresh();
    return result;
  };

  return {
    data,
    loading,
    refresh,
    setParams,
    handleAdd,
    handleUpdate,
    handleRemove,
  };
}
