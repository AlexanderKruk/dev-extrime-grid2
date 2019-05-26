import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  TreeDataState, CustomTreeData,
  FilteringState, IntegratedFiltering,
  DataTypeProvider, DataTypeProviderProps,
  SortingState, IntegratedSorting,
} from '@devexpress/dx-react-grid';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  TableFilterRow,
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
  'greaterThan', 
  'lessThan', 'equal'
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
        { name: 'price', title: 'Price (BTC)' },
        { name: 'volumeAmount', title: 'Volume (BTC)' },
        { name: 'volumePerc', title: 'Volume %' }
      ],
      tableColumnExtensions: [
        { columnName: 'coin', width: 200 },
        { columnName: 'period', width: 330 },
        { columnName: 'volumeAmount', width: 130, align: 'right' },
        { columnName: 'volumePerc', width: 100, align: 'right' },
        { columnName: 'price', width: 150},
      ],
      defaultExpandedRowIds: [],
      data: data2,
      filteringStateColumnExtensions: [
        { columnName: 'period', filteringEnabled: false },
      ],
    };
  }

  render() {
    const {
      data, 
      columns, 
      tableColumnExtensions, 
      defaultExpandedRowIds,
      filteringStateColumnExtensions
    } = this.state;

    return (
      <Paper>
        <Grid
          rows={data}
          columns={columns}
        >
          <SortingState
            defaultSorting={[{ columnName: 'volumePerc', direction: 'desc' }]}
          />
          <IntegratedSorting />
          <FilteringState 
            defaultFilters={[]}
            columnExtensions={filteringStateColumnExtensions} />
          <IntegratedFiltering />
          <CurrencyTypeProvider for="volumePerc" />
          <DataTypeProvider
            for="volumeAmount"
            availableFilterOperations={availableFilterOperations}
          />
          <DataTypeProvider
            for="price"
            availableFilterOperations={availableFilterOperations}
          />
          <TreeDataState
            defaultExpandedRowIds={defaultExpandedRowIds}
          />
          <CustomTreeData
            getChildRows={getChildRows}
          />
          <Table
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow showSortingControls />
          <TableFilterRow showFilterSelector={true}/>
          <TableTreeColumn
            for="period"
          />
        </Grid>
      </Paper>
    );
  }
}
