export const environment = {
  production: false,
  apiBase: '/api',
  authBase: '/auth',
  // Direct API for Transactions service (backend on :8083)
  transactionsBase: 'http://localhost:8083/transactions',
  // Direct API for Accounts service (backend on :8082)
  accountsBase: 'http://localhost:8082/accounts'
};
