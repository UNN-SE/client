import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStores from '@/hooks/useStores';
import Notifications from '@/components/Notifications';

const InnerPage = observer(({ children }) => {
  const { userStore } = useStores();

  return (
    <>
      <Navbar bg="light" expand="sm">
        <Container fluid="xl" className="px-sm-0 px-xl-3">
          <Navbar.Brand as={Link} to="/">PhotoSalon</Navbar.Brand>
          {
            userStore.isSignedIn
              ? (
                <>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                      <Nav.Link as={Link} to="/sign-out">Выйти</Nav.Link>
                    </Nav>
                  </Navbar.Collapse>
                </>
              )
              : (
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/sign-in">Войти</Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              )
          }
        </Container>
      </Navbar>
      <div className="mt-4">
        <Container fluid="xl">
          <div>
            {children}
          </div>
        </Container>
      </div>
      <Notifications />
    </>
  );
});

InnerPage.propTypes = {
  children: PropTypes.node,
};

InnerPage.defaultProps = {
  children: undefined,
};

export default InnerPage;
