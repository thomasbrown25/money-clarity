import { TRANSACTIONS_ACTION_TYPES } from './transactions.types';

const initialState = {
  transactions: null,
  recentTransactions: null,
  categories: null,
  categoryLabels: null,
  categoryAmounts: null,
  recurringTransactions: null,
  accounts: null,
  currentMonthSpend: 0,
  error: null,
  isLoading: false
};

const transactionsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TRANSACTIONS_ACTION_TYPES.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: payload.transactions,
        accounts: payload.accounts
      };
    case TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        recentTransactions: payload.transactions,
        categories: payload.categories,
        categoryLabels: payload.categoryLabels,
        categoryAmounts: payload.categoryAmounts
      };

    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        recurringTransactions: payload
      };

    case TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_SUCCESS:
      return {
        ...state,
        currentMonthSpend: payload
      };

    case TRANSACTIONS_ACTION_TYPES.GET_TRANSACTIONS_SUCCESS:
    case TRANSACTIONS_ACTION_TYPES.GET_RECENT_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_RECURRING_TRANSACTIONS_FAILED:
    case TRANSACTIONS_ACTION_TYPES.GET_CURRENT_SPEND_MONTH_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  }
};

export default transactionsReducer;
