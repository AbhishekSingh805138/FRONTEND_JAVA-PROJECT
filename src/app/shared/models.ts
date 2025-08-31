export interface LoginReq { username: string; password: string; }
export interface LoginRes { accessToken: string; tokenType: string; expiresIn?: number; }

export interface User { userId: number; username: string; address?: string | null; }
export interface UserUpdate { name?: string; phone?: string; address?: string; }

export interface Account {
  id: number; userId: number; accountType: 'SAVINGS'|'CURRENT'|string;
  balance: number; currency: string; nickname?: string; status?: string;
}
export interface AccountCreate { userId: number; accountType: string; openingBalance: number; currency: string; }
export interface BalanceUpdate { operation: 'CREDIT'|'DEBIT'; amount: number; currency?: string; reason?: string; transactionId?: number; }

export interface Transaction {
  id: number;
  frmAccountId: number; toAccountId: number;
  transactionType: 'TRANSFER'|string; amount: number;
  userId: number; date_transaction: string;
}
export interface TransferReq { frmAccountId: number; toAccountId: number; amount: number; userId?: number; transactionType?: 'TRANSFER'; }

