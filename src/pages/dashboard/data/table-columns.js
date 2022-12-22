export const recentTransColumns = [
  { Header: 'date', accessor: 'date', width: '5%', align: 'left' },
  { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
  { Header: 'category', accessor: 'category' },
  { Header: 'amount', accessor: 'amount', align: 'right' }
];

export const recurringTransColumns = [
  { Header: 'name/frequency', accessor: 'name', width: '35%', align: 'left' },
  { Header: 'due', accessor: 'due' },
  { Header: 'amount', accessor: 'amount', align: 'right' }
];
