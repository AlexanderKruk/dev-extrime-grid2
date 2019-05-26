import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState,
  CustomTreeData,
  FilteringState,
  IntegratedFiltering,
  PagingState,
  IntegratedPaging,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  TableFilterRow,
  PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

// import {
//   generateRows,
//   defaultColumnValues,
// } from './demo-data/generator';

import data2 from './demo-data/data';

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};


export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'coin', title: 'Coin' },
        { name: 'period', title: 'Period' },
        { name: 'volume', title: 'Volume' },
        { name: 'volume_%', title: 'Volume %' },
        { name: 'price', title: 'price' }
      ],
      tableColumnExtensions: [
        { columnName: 'coin', width: 300 },
      ],
      defaultExpandedRowIds: [],
      data: data2,
      pageSizes: [50, 100, 150, 0]
    };
  }

  render() {
    const {
      data, columns, tableColumnExtensions, defaultExpandedRowIds, pageSizes
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={data}
          columns={columns}
        >
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <PagingState
            defaultCurrentPage={0}
            defaultPageSize={50}
          />
          <IntegratedPaging />
          <TreeDataState
            defaultExpandedRowIds={defaultExpandedRowIds}
          />
          <CustomTreeData
            getChildRows={getChildRows}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow />
          <PagingPanel
            pageSizes={pageSizes}
          />
          <TableFilterRow />
          <TableTreeColumn
            for="period"
          />
        </Grid>
      </Paper>
    );
  }
}
