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

// Sales dashboard components
import ProductCell from 'layouts/dashboards/transactions/components/ProductCell';
import RefundsCell from 'layouts/dashboards/transactions/components/RefundsCell';
import DefaultCell from 'layouts/dashboards/transactions/components/DefaultCell';

// Images
import nikeV22 from 'assets/images/ecommerce/blue-shoe.jpeg';
import businessKit from 'assets/images/ecommerce/black-mug.jpeg';
import blackChair from 'assets/images/ecommerce/black-chair.jpeg';
import wirelessCharger from 'assets/images/ecommerce/bang-sound.jpeg';
import tripKit from 'assets/images/ecommerce/photo-tools.jpeg';
import { useEffect } from 'react';

export const recentTransColumns = [
  { Header: 'date', accessor: 'date', width: '5%', align: 'left' },
  { Header: 'name', accessor: 'name', width: '30%', align: 'left' },
  { Header: 'category', accessor: 'category' },
  { Header: 'amount', accessor: 'amount', align: 'right' }
];

export const recurringTransColumns = [
  { Header: 'name/frequency', accessor: 'name', width: '30%', align: 'left' },
  { Header: 'due', accessor: 'due' },
  { Header: 'amount', accessor: 'amount', align: 'right' }
];

const recentTransactionData = {
  columns: [
    { Header: 'date', accessor: 'date', width: '5%', align: 'left' },
    { Header: 'name', accessor: 'name', width: '55%', align: 'left' },
    { Header: 'category', accessor: 'category' },
    { Header: 'amount', accessor: 'amount', align: 'center' }
  ],

  rows: [
    {
      date: <DefaultCell>11/4</DefaultCell>,
      name: (
        <ProductCell image={nikeV22} name="Nike v22 Running" orders={8.232} />
      ),
      category: <DefaultCell>$130.992</DefaultCell>,
      amount: (
        <RefundsCell
          value={13}
          icon={{ color: 'success', name: 'keyboard_arrow_up' }}
        />
      )
    },
    {
      date: <DefaultCell>11/4</DefaultCell>,
      name: (
        <ProductCell
          image={businessKit}
          name="Business Kit (Mug + Notebook)"
          orders={12.821}
        />
      ),
      category: <DefaultCell>$80.250</DefaultCell>,
      amount: (
        <RefundsCell
          value={40}
          icon={{ color: 'error', name: 'keyboard_arrow_down' }}
        />
      )
    },
    {
      date: <DefaultCell>11/4</DefaultCell>,
      name: (
        <ProductCell image={blackChair} name="Black Chair" orders={2.421} />
      ),
      category: <DefaultCell>$40.600</DefaultCell>,
      amount: (
        <RefundsCell
          value={54}
          icon={{ color: 'success', name: 'keyboard_arrow_up' }}
        />
      )
    },
    {
      date: <DefaultCell>11/4</DefaultCell>,
      name: (
        <ProductCell
          image={wirelessCharger}
          name="Wireless Charger"
          orders={5.921}
        />
      ),
      category: <DefaultCell>$91.300</DefaultCell>,
      amount: (
        <RefundsCell
          value={5}
          icon={{ color: 'error', name: 'keyboard_arrow_down' }}
        />
      )
    },
    {
      date: <DefaultCell>11/4</DefaultCell>,
      name: (
        <ProductCell
          image={tripKit}
          name="Mountain Trip Kit (Camera + Backpack)"
          orders={921}
        />
      ),
      category: <DefaultCell>$140.925</DefaultCell>,
      amount: (
        <RefundsCell
          value={121}
          icon={{ color: 'success', name: 'keyboard_arrow_up' }}
        />
      )
    }
  ]
};

export default recentTransactionData;
