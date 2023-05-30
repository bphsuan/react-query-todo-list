import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Waterfall from './Waterfall';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Waterfall />
  </QueryClientProvider>
);

export default App;