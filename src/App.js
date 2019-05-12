import React from 'react';
import './App.css';
import comments from './comments';

import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

const App = () => (
  <Grid
    rows={ comments }
    columns={[
      { name: 'name', title: 'Name' },
      { name: 'email', title: 'Email' },
      { name: 'body', title: 'Body' },
    ]}>
    <Table />
    <TableHeaderRow />
  </Grid>
);

export default App;
