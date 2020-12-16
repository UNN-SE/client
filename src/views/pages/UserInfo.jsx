import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Col, Row } from 'react-bootstrap';
import Simple from '@/views/pages/Simple';
import useStores from '@/hooks/useStores';
import LoaderPlaceholder from '@/components/LoaderPlaceholder';
import api from '@/api';

const UserInfo = observer(() => {
  const { userStore } = useStores();

  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      api.get('/orders').then(({ data }) => {
        setOrders(data.orders);
        setIsOrdersLoading(false);
      });
    }, 2000);
  }, []);

  return (
    <Simple>
      <Row>
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title>
                Вы:
                { ' ' }
                {userStore.user.email}
              </Card.Title>
              <ul>
                <li>
                  <b>id:</b>
                  { ' ' }
                  {userStore.user.id}
                </li>
                <li>
                  <b>Телефон:</b>
                  { ' ' }
                  {userStore.user.phone}
                </li>
                <li>
                  <b>Роль:</b>
                  { ' ' }
                  {userStore.user.role}
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title>
                Ваши заказы:
              </Card.Title>
              <LoaderPlaceholder isLoading={isOrdersLoading}>
                <ol>
                  {
                    orders.map((order) => (
                      <li key={order.id}>
                        Данные:
                        <ul>
                          <li>
                            <b>id:</b>
                            { ' ' }
                            {order.id}
                          </li>
                          <li>
                            <b>Файл:</b>
                            { ' ' }
                            {order.source}
                          </li>
                          <li>
                            <b>Статус:</b>
                            { ' ' }
                            {order.status}
                          </li>
                          <li>
                            <b>id салона:</b>
                            { ' ' }
                            {order.photo_salon_id}
                          </li>
                        </ul>
                      </li>
                    ))
                  }
                </ol>
              </LoaderPlaceholder>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Simple>
  );
});

export default UserInfo;
