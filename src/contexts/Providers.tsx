import React from 'react';
import { AddToFavProvider } from './AddToFavContext';
import { ScrollToSectProvider } from './ScrollToSectContext';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <ScrollToSectProvider>
      <AddToFavProvider>{children}</AddToFavProvider>
    </ScrollToSectProvider>
  );
};
