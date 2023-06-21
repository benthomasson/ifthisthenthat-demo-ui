import * as React from 'react';
import '@patternfly/react-core/dist/styles/base.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppLayout } from '@app/components/AppLayout/AppLayout';
import { AppRoutes } from '@app/routes';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '@app/app.css';

const queryClient = new QueryClient();

const App: React.FunctionComponent = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </Router>
    {/*<ReactQueryDevtools initialIsOpen={false} />*/}
  </QueryClientProvider>
);

export default App;
