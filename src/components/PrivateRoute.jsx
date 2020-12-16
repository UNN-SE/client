import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStores from '@/hooks/useStores';

const PrivateRoute = observer(({ children, ...rest }) => {
  const { userStore } = useStores();

  return (
    <Route
      {/* eslint-disable-line react/jsx-props-no-spreading */
        ...rest
      }
      render={
        ({ location }) => (userStore.isSignedIn
          ? (
            children
          )
          : (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: { from: location },
              }}
            />
          ))
      }
    />
  );
});

export default PrivateRoute;
