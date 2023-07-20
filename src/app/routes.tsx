import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { NotFound } from '@app/pages/NotFound/NotFound';
import Rulesets from '@app/pages/Rulesets/Rulesets';
import Log from '@app/pages/Log/Log';
import NewRuleset from '@app/pages/NewRuleset/NewRuleset';
import { ErrorBoundaryFallback } from '@app/components/ErrorBoundaryFallBack/ErrorBoundaryFallback';
import EventLog from '@app/pages/EventLog/EventLog';
import ActionLog from '@app/pages/ActionLog/ActionLog';
import Inventory from '@app/pages/Inventory/Inventory';

let routeFocusTimer: number;
export interface IAppRoute {
  label?: string; // Excluding the label will exclude the route from the nav sidebar in AppLayout
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  routes?: undefined;
  excludeFromSideNav?: boolean;
}

export interface IAppRouteGroup {
  label: string;
  routes: IAppRoute[];
  excludeFromSideNav?: boolean;
}

export type AppRouteConfig = IAppRoute | IAppRouteGroup;

const routes: AppRouteConfig[] = [
  {
    component: Rulesets,
    exact: true,
    label: 'Reactions',
    path: '/reactions',
    title: 'Reactions | EDA',
  },
  {
    component: NewRuleset,
    exact: true,
    label: 'Create reaction',
    path: '/reactions/create-reaction',
    title: 'Create reaction | EDA',
    excludeFromSideNav: true,
  },
  {
    component: Inventory,
    exact: true,
    label: 'Inventory',
    path: '/inventory',
    title: 'Inventory | EDA',
  },
  {
    component: EventLog,
    exact: true,
    label: 'Event Log',
    path: '/event-log',
    title: 'Event Log | EDA',
  },
  {
    component: ActionLog,
    exact: true,
    label: 'Action Log',
    path: '/action-log',
    title: 'Action Log | EDA',
  },
  {
    component: Log,
    exact: true,
    label: 'Log',
    path: '/log',
    title: 'Log | EDA',
  },
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
// may not be necessary if https://github.com/ReactTraining/react-router/issues/5210 is resolved
const useA11yRouteChange = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    routeFocusTimer = window.setTimeout(() => {
      const mainContainer = document.getElementById('primary-app-container');
      if (mainContainer) {
        mainContainer.focus();
      }
    }, 50);
    return () => {
      window.clearTimeout(routeFocusTimer);
    };
  }, [pathname]);
};

const RouteWithTitleUpdates = ({ component: Component, title, ...rest }: IAppRoute) => {
  useA11yRouteChange();
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return <Component {...rest} {...routeProps} />;
  }

  return <Route render={routeWithTitle} {...rest} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
};

const flattenedRoutes: IAppRoute[] = routes.reduce(
  (flattened, route) => [...flattened, ...(route.routes ? route.routes : [route])],
  [] as IAppRoute[]
);

const AppRoutes = (): React.ReactElement => (
  <ErrorBoundaryFallback>
    <Switch>
      <Route path={'/'} exact>
        <Redirect to="/reactions" />
      </Route>
      {flattenedRoutes.map(({ path, exact, component, title }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </ErrorBoundaryFallback>
);

export { AppRoutes, routes };
