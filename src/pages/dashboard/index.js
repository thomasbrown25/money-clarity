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
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import Footer from 'examples/Footer';
import DefaultStatisticsCard from 'examples/Cards/StatisticsCards/DefaultStatisticsCard';

// Data
import DefaultDoughnutChart from 'examples/Charts/DoughnutCharts/DefaultDoughnutChart';

// actions
import { createLinkToken, updateLinkToken } from 'store/user/user.action';
import {
  getRecurringTransactions,
  getTransactions,
  getRecentTransactions,
  getCurrentSpendForMonth
} from 'store/transactions/transactions.action';

import Currency from 'components/Currency/currency.component';
import moment from 'moment';
import AddAccount from './components/add-account/add-account.component';
import budgetTableData from './data/budgetTableData';
import RecurringTransactions from './components/recurring-transactions/recurring-transactions.component';
import BudgetTable from './components/BudgetTable';
import RecentTransactions from './components/recent-transactions/recent-transactions.component';
import Accounts from './components/accounts/accounts.component';
import Income from './components/income/income.component';

const Dashboard = ({
  user: { currentUser, isLinkValid, loading },
  transactions: {
    accounts,
    transactions,
    expenseTransactions,
    incomeTransactions,
    recurringTransactions,
    categories: { list, labels, amounts },
    currentMonthExpense,
    currentMonthIncome
  },
  getTransactions,
  getRecurringTransactions,
  getRecentTransactions,
  getCurrentSpendForMonth,
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
  }, [currentUser?.accessToken, getTransactions, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecurringTransactions();
    }
  }, [currentUser?.accessToken, getRecurringTransactions, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getRecentTransactions();
    }
  }, [currentUser?.accessToken, getRecentTransactions, loading]);

  useEffect(() => {
    if (currentUser?.accessToken) {
      getCurrentSpendForMonth();
    }
  }, [currentUser?.accessToken, getCurrentSpendForMonth, loading]);

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
              <Grid item xl={4} md={6} sm={12} xs={12}>
                <DefaultStatisticsCard
                  title={'Income / Expense'}
                  income={currentMonthIncome}
                  expense={currentMonthExpense}
                  description={'Totals for current month'}
                />
              </Grid>
              <Grid item md={0} xl={8} /> {/* Spacing */}
              <Grid item xs={12} md={12} xl={4}>
                <Accounts accounts={accounts} />
              </Grid>
              <Grid item xs={12} md={12} xl={4}>
                <BudgetTable title="Budgets" rows={budgetTableData} />
              </Grid>
              <Grid item xs={12} md={12} xl={4}>
                <DefaultDoughnutChart
                  title="Categories"
                  labels={labels}
                  chart={{
                    labels: labels,
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
                      data: amounts
                    }
                  }}
                  transactions={transactions}
                />
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12} xl={6}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Income
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    {incomeTransactions && (
                      <Income transactions={incomeTransactions} />
                    )}
                  </MDBox>
                </Card>
              </Grid>

              <Grid item xs={12} lg={12} xl={6}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Expenses
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    {expenseTransactions && (
                      <Income transactions={expenseTransactions} />
                    )}
                  </MDBox>
                </Card>
              </Grid>

              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Upcoming
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    {recurringTransactions && (
                      <RecurringTransactions
                        transactions={recurringTransactions}
                      />
                    )}
                  </MDBox>
                </Card>
              </Grid>
            </Grid>
          </MDBox>

          <MDBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12} xl={12}>
                <Card>
                  <MDBox pt={3} px={3}>
                    <MDTypography variant="h6" fontWeight="medium">
                      Recent Transactions
                    </MDTypography>
                  </MDBox>
                  <MDBox py={1}>
                    {transactions && (
                      <RecentTransactions transactions={transactions} />
                    )}
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
  getTransactions: PropTypes.func.isRequired,
  getCurrentSpendForMonth: PropTypes.func.isRequired
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
  getCurrentSpendForMonth,
  getTransactions
})(Dashboard);
