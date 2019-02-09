import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileListComponent } from './files/file-list/file-list.component';
import { FileComponent } from './files/file/file.component';

const routes: Routes = [
  { path: 'MyFiles', component: FileListComponent },
  { path: 'File', component: FileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
