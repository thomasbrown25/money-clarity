/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// plaid
import PlaidLink from './components/plaid-link/plaid-link.component';

import Moment from 'react-moment';

// @mui material components
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDBadgeDot from 'components/MDBadgeDot';
import MDButton from 'components/MDButton';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DefaultStatisticsCard from 'examples/Cards/StatisticsCards/DefaultStatisticsCard';
import DefaultLineChart from 'examples/Charts/LineCharts/DefaultLineChart';
import HorizontalBarChart from 'examples/Charts/BarCharts/HorizontalBarChart';
import SalesTable from 'examples/Tables/SalesTable';
import DataTable from 'examples/Tables/DataTable';

// Sales dashboard components
import ChannelsChart from 'layouts/dashboards/sales/components/ChannelsChart';

// Data
import defaultLineChartData from 'layouts/dashboards/sales/data/defaultLineChartData';
import horizontalBarChartData from 'layouts/dashboards/sales/data/horizontalBarChartData';
import salesTableData from 'layouts/dashboards/sales/data/salesTableData';
import recentTransactionData from 'layouts/dashboards/transactions/data/recent-transactions-data';
import CategoriesChart from 'layout-components/CategoriesChart';
import DefaultDoughnutChart from 'examples/Charts/DoughnutCharts/DefaultDoughnutChart';
import TransactionTable from 'examples/Tables/TransactionTable';
import ProductCell from 'layouts/dashboards/transactions/components/ProductCell';
import DefaultCell from 'layouts/dashboards/transactions/components/DefaultCell';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import {
  getRecurringTransactions,
  getTransactions,
  getRecentTransactions
} from 'store/transactions/transactions.action';

import { recentTransColumns } from 'layouts/dashboards/transactions/data/recent-transactions-data';
import { recurringTransColumns } from 'layouts/dashboards/transactions/data/recent-transactions-data';
import Currency from 'components/Currency/currency.component';
import moment from 'moment';
import AddAccount from './components/add-account/add-account.component';
import BudgetTable from 'examples/Tables/BudgetTable';
import budgetTableData from './data/budgetTableData';

const Dashboard = ({
  user: { currentUser, isLinkValid, loading },
  transactions: {
    accounts,
    transactions,
    recurringTransactions,
    categories,
    categoryLabels,
    categoryAmounts
  },
  getTransactions,
  getRecurringTransactions,
  getRecentTransactions,
  createLinkToken
}) => {
  useEffect(() => {
    if (
      (!currentUser?.accessToken && !loading) ||
      (!currentUser?.isLinkValid && !loading)
    ) {
      createLinkToken();
    }
  }, [
    currentUser?.accessToken,
    createLinkToken,
    currentUser?.isLinkValid,
    loading
  ]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getTransactions();
    }
  }, [currentUser?.accessToken, getTransactions]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecurringTransactions();
    }
  }, [currentUser?.accessToken, getRecurringTransactions]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecentTransactions();
    }
  }, [currentUser?.accessToken, getRecentTransactions]);

  const [recurData, setRecurData] = useState([]);
  // build recent transactions table (separate later)
  const recurTransData = () => {
    let data = [];
    recurringTransactions?.outflowStream?.slice(0, 7).map((outflow) => {
      let dt = {
        name: (
          <ProductCell
            name={outflow.description?.substring(0, 30)}
            frequency={outflow.frequency}
          />
        ),
        due: (
          <DefaultCell>
            {
              <Moment
                date={moment(outflow.lastDate).add(1, 'M')}
                format={'M/D'}
              />
            }
          </DefaultCell>
        ),
        amount: (
          <DefaultCell>
            <Currency value={outflow.lastAmount.amount} />{' '}
          </DefaultCell>
        )
      };
      data.push(dt);
    });
    setRecurData(data);
  };

  useEffect(() => {
    if (currentUser?.accessToken) {
      recurTransData();
    }
  }, [recurringTransactions?.outflowStream, currentUser?.accessToken]);

  const [transData, setTransData] = useState([]);
  // build recent transactions table (separate later)
  const recentTransData = () => {
    let data = [];
    transactions?.slice(0, 10).map((transaction) => {
      let dt = {
        date: (
          <DefaultCell>
            {<Moment date={transaction.date} format={'M/D'} />}
          </DefaultCell>
        ),
        name: (
          <ProductCell
            name={
              transaction.merchantName
                ? transaction.merchantName
                : transaction.name?.substring(0, 30)
            }
          />
        ),
        category: (
          <DefaultCell>
            {transaction.categories[1]
              ? transaction.categories[1]
              : transaction.categories[0]}
          </DefaultCell>
        ),
        amount: <DefaultCell>{transaction.amount}</DefaultCell>
      };
      data.push(dt);
    });
    setTransData(data);
  };

  useEffect(() => {
    if (currentUser?.accessToken) {
      recentTransData();
    }
  }, [transactions, currentUser?.accessTokenv]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      {!currentUser?.accessToken || !isLinkValid ? (
        <PlaidLink
          linkToken={currentUser?.linkToken}
          isLinkValid={isLinkValid}
        />
      ) : (
        <MDBox py={3}>
          <MDBox mb={3}>
            <AddAccount />
          </MDBox>

          <MDBox mb={3}>
            <Grid container spacing={3}>
              {accounts?.map((account, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <DefaultStatisticsCard
                    title={account.name}
                    count={Math.floor(account.balance.available)}
                    currency={true}
                    percentage={{
                      color: 'success',
                      value: '+15%',
                      label: 'since last month'
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </MDBox>

          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} lg={6}>
                <DefaultDoughnutChart
                  title="Categories"
                  labels={categoryLabels}
                  chart={{
                    labels: categoryLabels,
                    datasets: {
                      label: 'Projects',
                      backgroundColors: [
                        'info',
                        'dark',
                        'error',
                        'secondary',
                        'primary'
                      ],
                      hoverOffset: 10,
                      data: categoryAmounts
                    }
                  }}
                  transactions={transactions}
                />
              </Grid>

              <Grid item xs={12} sm={6} lg={6}>
                <BudgetTable title="Budgets" rows={budgetTableData} />
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item lg={12} xl={12}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Upcoming
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    <TransactionTable
                      data={recurData}
                      columns={recurringTransColumns}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      isSorted={false}
                      noEndBorder
                    />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item lg={12} xl={12}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Recent Transactions
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    <TransactionTable
                      data={transData}
                      columns={recentTransColumns}
                      transactions={transactions}
                      entriesPerPage={false}
                      showTotalEntries={false}
                      isSorted={false}
                      noEndBorder
                    />
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      )}
      <Footer />
    </DashboardLayout>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  transactions: PropTypes.object.isRequired,
  createLinkToken: PropTypes.func.isRequired,
  updateLinkToken: PropTypes.func.isRequired,
  getRecurringTransactions: PropTypes.func.isRequired,
  getRecentTransactions: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  transactions: state.transactions
});

export default connect(mapStateToProps, {
  createLinkToken,
  updateLinkToken,
  getRecurringTransactions,
  getRecentTransactions,
  getTransactions
})(Dashboard);
