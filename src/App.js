import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState, CustomTreeData,
  FilteringState, IntegratedFiltering,
  PagingState, IntegratedPaging,
  DataTypeProvider, DataTypeProviderProps,
} from '@devexpress/dx-react-grid';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
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

const styles = ({ typography }: Theme) => createStyles({
  currency: {
  },
  numericInput: {
  },
});


type CurrencyFormatterProps = DataTypeProvider.ValueFormatterProps & WithStyles<typeof styles>;

const availableFilterOperations: string[] = [
  'equal', 'notEqual',
  'greaterThan', 'greaterThanOrEqual',
  'lessThan', 'lessThanOrEqual',
];

const getColor = (amount: number) : string => {
  if (amount < 0) {
    return '#F44336';
  }
  if (amount > 0) {
    return '#229954';
  }
};


const getChildRows = (row, rootRows) => {
  const childRows = rootRows.filter(r => r.parentId === (row ? row.id : null));
  return childRows.length ? childRows : null;
};


const CurrencyFormatter = withStyles(styles)(
  ({ value, classes } : CurrencyFormatterProps) =>
    <i className={classes.currency} style={{ color: getColor(value) }}>{value}%</i>
);



const CurrencyTypeProvider: React.ComponentType<DataTypeProviderProps> =
  (props: DataTypeProviderProps) => (
    <DataTypeProvider
      formatterComponent={CurrencyFormatter}
      availableFilterOperations={availableFilterOperations}
      {...props}
    />
);


export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'coin', title: 'Coin' },
        { name: 'period', title: 'Period' },
        { name: 'volumeAmount', title: 'Volume' },
        { name: 'volumePerc', title: 'Volume %' },
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

          <CurrencyTypeProvider for="volumePerc" />
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
