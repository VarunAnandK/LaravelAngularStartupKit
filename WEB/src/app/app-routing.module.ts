import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from 'src/Helper/AuthGuard';

const routes: Routes = [
  { path: "", redirectTo: "/Login", pathMatch: "full" },
  { path: "Login", loadChildren: () => import('./login/login.component').then(o => o.LoginModule) },
  // Admin
  { path: "Admin/Dashboard", canActivate: [AuthGuard], component: LayoutComponent, loadChildren: () => import('./Admin/dashboard/dashboard.component').then(o => o.DashboardModule) },
  { path: "Admin/UserList", component: LayoutComponent, canActivate: [AuthGuard], loadChildren: () => import('./Admin/User/user_list/user_list.component').then(o => o.UserListModule) },
  { path: "Admin/UserRoleList", component: LayoutComponent, canActivate: [AuthGuard], loadChildren: () => import('./Admin/UserRole/user-role-list/user-role-list.component').then(o => o.UserRoleListModule) },
  { path: "ForgotPassword", loadChildren: () => import('./ForgotPassword/forgot-password.component').then(o => o.ForgotPasswordModule) },
  // Admin
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
