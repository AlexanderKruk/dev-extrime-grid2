import React from 'react';
import './App.css';
import data from './data';

import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-material-ui';

const App = () => (
  <Grid
    rows={ data }
    columns={[
      { name: 'ticker', title: 'Coin' },
      { name: 'period', title: 'Period' },
      { name: '1d_volume', title: 'Volume' },
      { name: '1d_volume_%', title: 'Volume %' },
      { name: '1d_price', title: 'Price' },
    ]}>
    <Table />
    <TableHeaderRow />
  </Grid>
);

export default App;
