import { useEffect, useState } from 'react';
import DataTable from 'examples/Tables/DataTable';
import Currency from 'components/Currency/currency.component';
import Moment from 'react-moment';
import moment from 'moment';
import DefaultCell from 'components/DefaultCell';
import ProductCell from 'components/ProductCell';

const RecentTransactions = ({ transactions }) => {
  const [rows, setRows] = useState([]);

  const fillRows = () => {
    let rowsArray = [];

    for (let i = 0; i < transactions?.length; i++) {
      let transaction = {
        date: (
          <DefaultCell>
            {<Moment date={transactions[i].date} format={'M/D'} />}
          </DefaultCell>
        ),
        name: (
          <ProductCell
            name={
              transactions[i].merchantName
                ? transactions[i].merchantName
                : transactions[i].name?.substring(0, 30)
            }
          />
        ),
        category: (
          <DefaultCell>
            {transactions[i].categories[1]
              ? transactions[i].categories[1]
              : transactions[i].categories[0]}
          </DefaultCell>
        ),
        amount: (
          <DefaultCell>
            <Currency value={transactions[i].amount} />
          </DefaultCell>
        )
      };
      rowsArray.push(transaction);
    }
    setRows(rowsArray);
    rowsArray = [];
  };

  useEffect(() => {
    fillRows();
  }, [transactions]);

  return (
    <DataTable
      table={{
        columns: [
          { Header: 'date', accessor: 'date', width: '5%', align: 'left' },
          { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
          { Header: 'category', accessor: 'category' },
          { Header: 'amount', accessor: 'amount', align: 'right' }
        ],
        rows: rows ? rows : []
      }}
    />
  );
};

export default RecentTransactions;
