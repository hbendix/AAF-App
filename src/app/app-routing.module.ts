import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './files/file-list/file-list.component';
import { FileComponent } from './files/file/file.component';
import { AuthGuard } from './shared/directives/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

const routes: Routes = [

  { path: 'Login', component: LoginComponent },
  { path: '', component: NavbarComponent,   canActivate: [AuthGuard],
    children: [
      { path: 'MyFiles', component: FileListComponent,  canActivate: [AuthGuard]},
      { path: 'File', component: FileComponent,  canActivate: [AuthGuard] },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
