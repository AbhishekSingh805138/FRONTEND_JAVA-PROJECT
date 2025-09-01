import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { AccountDetailComponent } from './pages/accounts/account-detail.component';
// import { TransferNewComponent } from './pages/transfers/transfer-new.component';
import { UserNewComponent } from './pages/users/user-new.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'accounts', component: AccountsComponent, canActivate:[AuthGuard] },
  { path: 'accounts/:id', component: AccountDetailComponent, canActivate:[AuthGuard] },
  // { path: 'transfers/new', component: TransferNewComponent, canActivate:[AuthGuard] },
  { path: 'users/new', component: UserNewComponent, canActivate:[AuthGuard] },
  { path: 'transactions', component: TransactionsComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
