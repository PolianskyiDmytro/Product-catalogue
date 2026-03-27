import React, { useMemo } from 'react';
import { Product } from '../types/Product';
import { useState } from 'react';

interface LoadingType {
  loading: Product[];
  setLoading: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const LoadingContext = React.createContext<LoadingType>({
  loading: [],
  setLoading: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<Product[]>([]);

  const value = useMemo(
    () => ({
      loading,
      setLoading,
    }),
    [loading],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
