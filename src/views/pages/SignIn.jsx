import React, { useCallback, useState } from 'react';
import {
  Form, Button, Card, Col, Row, Spinner,
} from 'react-bootstrap';
import { useLocation, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import useStores from '@/hooks/useStores';
import api from '@/api';

const SignIn = observer(() => {
  const { userStore, notificationsStore } = useStores();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: '/' } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const logIn = useCallback((e) => {
    e.preventDefault();

    if (email.trim().length === 0) {
      notificationsStore.add({
        title: 'Ошибка',
        content: 'Email не может быть пустым',
      });
      return;
    }

    if (password.trim().length === 0) {
      notificationsStore.add({
        title: 'Ошибка',
        content: 'Пароль не может быть пустым',
      });
      return;
    }

    setIsLoading(true);

    api.get('/users/1')
      .then(({ data }) => {
        userStore.setUser(data);
      })
      .catch((res) => {
        notificationsStore.add({
          title: 'Ошибка',
          content: res.message,
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [email, password, notificationsStore, userStore]);

  return userStore.isSignedIn
    ? (
      <Redirect to={from} />
    )
    : (
      <Row className="justify-content-center">
        <Col xs md={5} lg={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={logIn}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Введите email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button disabled={isLoading} variant="primary" type="submit">
                  {isLoading ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : 'Войти'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
});

SignIn.propTypes = {
};

SignIn.defaultProps = {
};

export default SignIn;
