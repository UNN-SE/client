import React from 'react';
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import '@/assets/css/font-face.css';
import { createGlobalStyle } from 'styled-components';
import { Spinner } from 'react-bootstrap';
import PrivateRoute from '@/components/PrivateRoute';
import InnerPage from '@/views/layouts/InnerPage';
import SignIn from '@/views/pages/SignIn';
import SignOut from '@/views/pages/SignOut';
import { observer } from 'mobx-react-lite';
import usePersistAuthState from '@/hooks/usePersistAuthState';
import UserInfo from '@/views/pages/UserInfo';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  
  ::-webkit-scrollbar {
    min-width: 1px;
    min-height: 1px;
  }

  html, body {
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

const App = observer(() => {
  const isSigningIn = usePersistAuthState();

  return (
    <Router>
      <GlobalStyle />
      {
        isSigningIn
          ? (
            <div
              style={{
                minHeight: '100vh',
              }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
              <h4 className="mt-4">Loading...</h4>
            </div>
          )
          : (
            <InnerPage>
              <Switch>
                <PrivateRoute exact path="/">
                  <UserInfo />
                </PrivateRoute>

                <Route path="/sign-in">
                  <SignIn />
                </Route>
                <Route path="/sign-out">
                  <SignOut />
                </Route>
                <Route path="*">
                  <h1>404</h1>
                  <h4>Здесь ничего ¯\_(ツ)_/¯</h4>
                </Route>
              </Switch>
            </InnerPage>
          )
      }
    </Router>
  );
});

export default App;
