import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState,
  CustomTreeData,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';

import {
  generateRows,
  defaultColumnValues,
} from './demo-data/generator';

const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      tableColumnExtensions: [
        { columnName: 'name', width: 300 },
      ],
      defaultExpandedRowIds: [0, 1],
      data: generateRows({
        columnValues: {
          id: ({ index }) => index,
          parentId: ({ index, random }) => (index > 0 ? Math.trunc((random() * index) / 2) : null),
          ...defaultColumnValues,
        },
        length: 20,
      }),
    };
  }

  render() {
    const {
      data, columns, tableColumnExtensions, defaultExpandedRowIds,
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={data}
          columns={columns}
        >
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
          <TableTreeColumn
            for="name"
          />
        </Grid>
      </Paper>
    );
  }
}
