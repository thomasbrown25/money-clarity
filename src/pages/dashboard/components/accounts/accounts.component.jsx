// Material Dashboard 2 PRO React Examples
import CategoriesList from 'examples/Lists/CategoriesList';

// Material Dashboard 2 PRO React Components
import MDTypography from 'components/MDTypography';
import { useState } from 'react';
import { useEffect } from 'react';
import Currency from 'components/Currency/currency.component';

const Accounts = ({ accounts }) => {
  const [accountList, setAccountList] = useState([]);

  const fillList = () => {
    let accountArray = [];

    for (let i = 0; i < accounts?.length; i++) {
      let account = {
        color: 'dark',
        icon: 'devices_other',
        name: `${accounts[i].name} \u2022 \u2022 \u2022 ${accounts[i].mask}`,
        description: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <Currency value={accounts[i].balance.available} />
          </MDTypography>
        ),
        route: '/'
      };
      accountArray.push(account);
    }

    setAccountList(accountArray);
    accountArray = [];
  };

  useEffect(() => {
    fillList();
  }, [accounts]);

  return (
    <CategoriesList
      title="accounts"
      categories={accountList}
      className="height-max"
    />
  );
};

export default Accounts;
