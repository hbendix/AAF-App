import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileComponent } from './files/file-form/file.component';
import { AuthGuard } from './shared/directives/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { SearchComponent } from './files/search/search.component';
import { MyFilesComponent } from './files/my-files/my-files.component';
import { FileHistoryComponent } from './files/file-history/file-history.component';

const routes: Routes = [

  { path: 'Login', component: LoginComponent },
  { path: '', component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      { path: 'MyFiles', component: MyFilesComponent,  canActivate: [AuthGuard]},
      { path: 'File', component: FileComponent,  canActivate: [AuthGuard] },
      { path: 'History', component: FileHistoryComponent,  canActivate: [AuthGuard] },
      { path: 'MyTeams', component: TeamListComponent,  canActivate: [AuthGuard] },
      { path: 'AllFiles', component: SearchComponent,  canActivate: [AuthGuard] },
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
