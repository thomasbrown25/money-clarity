import { useEffect, useState } from 'react';
import DataTable from 'examples/Tables/DataTable';
import Currency from 'components/Currency/currency.component';
import Moment from 'react-moment';
import moment from 'moment';
import ProductCell from 'components/ProductCell';
import DefaultCell from 'components/DefaultCell';

const Income = ({ transactions }) => {
  const [rows, setRows] = useState([]);

  const fillRows = () => {
    let rowsArray = [];

    for (let i = 0; i < transactions?.length; i++) {
      let transaction = {
        name: (
          <ProductCell
            name={
              transactions[i].merchantName
                ? transactions[i].merchantName
                : transactions[i].description?.substring(0, 30)
            }
          />
        ),
        due: (
          <DefaultCell>
            {
              <Moment
                date={
                  transactions[i].frequency?.toLowerCase() === 'biweekly'
                    ? moment(transactions[i].lastDate).add(15, 'days')
                    : moment(transactions[i].lastDate).add(1, 'M')
                }
                format={'M/D'}
              />
            }
          </DefaultCell>
        ),
        category: transactions[i].category,
        amount: (
          <DefaultCell>
            <Currency value={transactions[i].lastAmount} />{' '}
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
          { Header: 'name/frequency', accessor: 'name', width: '25%' },
          { Header: 'due', accessor: 'due', width: '30%' },
          { Header: 'category', accessor: 'category' },
          { Header: 'amount', accessor: 'amount', width: '12%' }
        ],
        rows: rows ? rows : []
      }}
    />
  );
};

export default Income;
