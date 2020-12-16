import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import useStores from '@/hooks/useStores';

const SignOut = observer(() => {
  const { notificationsStore } = useStores();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        window.location.href = '/';
      } catch (error) {
        notificationsStore.add({
          title: 'Ошибка',
          content: error.message,
        });
        history.goBack();
      }
    })();
  });

  return (<div />);
});

export default SignOut;
