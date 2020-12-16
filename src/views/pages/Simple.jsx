import React from 'react';
import { observer } from 'mobx-react-lite';

const Simple = observer(({ children }) => (
  <div>
    {children}
  </div>
));

export default Simple;
