import React, { FunctionComponent, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useHistory } from 'react-router-dom';
import GenericError from '@app/components/GenericError/GenericError';

export const ErrorBoundaryFallback: FunctionComponent = ({
  children,
}: {
  children?: ReactNode;
}) => {
  const history = useHistory();

  return (
    <ErrorBoundary
      fallbackRender={({ resetErrorBoundary }: { resetErrorBoundary: () => void }): JSX.Element => {
        const unListen = history.listen(() => {
          resetErrorBoundary();
          unListen();
        });

        return <GenericError />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
