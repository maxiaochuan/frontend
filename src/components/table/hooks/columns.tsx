import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IObjectType {
  [x: string]: any;
}

export const totalColumnsGenerator = <T extends {}>(data: T[] = []): string[] => {
  if (data.length) {
    const item = data[0];
    if (!Array.isArray(item) && typeof item === 'object') {
      return Object.keys(item).filter(i => i !== 'children' && i !== 'pid');
    }
  }
  return [];
};

export const useTotalColumns = <T extends IObjectType>(data: T[] = []) => {
  const [columns, setColumns] = useState([] as string[]);
  useEffect(() => setColumns(totalColumnsGenerator(data)), [data]);
  return columns;
};

export const useColumns = (
  defaultColumns: string[] | undefined,
  totalColumns: string[],
): [string[], Dispatch<SetStateAction<string[]>>] => {
  const [columns, setColumns] = useState([] as string[]);
  useEffect(() => setColumns(defaultColumns || totalColumns), [defaultColumns || totalColumns]);
  return [columns, setColumns];
};
