import { Injectable } from '@angular/core';
import { FileList } from './file-list';
import { File } from './file';
import { UserDetails } from 'src/app/users/shared/user-details';
import { Subject, Observable } from 'rxjs';
import { Http, Headers } from '@angular/http';
import { environment } from '../../../environments/environment';
import { UserService } from 'src/app/users/shared/user.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  file: File;
  newFileLoaded = new Subject();
  user = new UserDetails(1, 'Harry', Date.now(), 'harry.jpeg');

  constructor(private http: Http,
    private userService: UserService) { }

  public getFileList() {
    return this.http.get(`${ environment.server.url }api/file/all/${ this.userService.getUserDetails().userId }`)
      .map(res => <FileList[]>res.json());
  }

  public loadFile (fileId): boolean {
    return true;
  }

  public addFile (file: File) {
    return this.http.post(`${ environment.server.url }api/file/${ this.userService.getUserDetails().userId }`, file);
  }

  public updateFile (): void {

  }

  public deleteFile (): void {

  }

  public setFileToView(file: File): boolean {
    this.file = file;
    return true;
  }

  public getFileToView (): File {
    return this.file;
  }

}
