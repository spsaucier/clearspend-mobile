import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react-native';

export const renderComponentWithQueryClient = (client: QueryClient, ui: React.ReactElement) => {
  const { rerender, ...result } = render(
    <QueryClientProvider client={client}>{ui}</QueryClientProvider>,
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(<QueryClientProvider client={client}>{rerenderUi}</QueryClientProvider>),
  };
};
