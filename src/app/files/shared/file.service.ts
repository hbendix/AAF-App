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
  public filePendingEdit = false;

  // observable to update file-list of data changes
  updateTable = new Subject();

  // variable used to populate file-list
  currentList: FileList[] = [];

  constructor(private http: Http,
    private userService: UserService) { }

    // getter called by file-list to populate the table
  public getFileList() {
    return this.currentList;
  }

  public getFileToEdit () {
    return this.file;
  }

  // gets called once server has returned a list of files
  public setFileList(data: FileList[]): any {
    this.currentList = data;
    return true;
  }

  public setFileToBeEdited (file: File) {
    this.file = file;
    this.filePendingEdit = true;
  }

  // pull files for user from the server
  public pullFiles () {
    return this.http.get(`${ environment.server.url }api/file/all/${ this.userService.getUserDetails().userId }`)
      .map(res => <FileList[]>res.json());
  }

  // pull all publicly listed files from the server
  public pullPublicFiles () {
    return this.http.get(`${ environment.server.url }api/file/public`)
      .map(res => <FileList[]>res.json());
  }

  /**
   * Return files that adhere to search params
   * @param q search parameters
   */
  public search(q: any) {
    q.size = this.sizeConversion(q.size, q.sizeType);
    return this.http.post(`${ environment.server.url }api/file/search`, q)
      .map(res => <FileList[]>res.json());
  }

  /**
   * Get specific file off fileId
   */
  public getFile(fileId: string) {
    return this.http.get(`${ environment.server.url }api/file/${ fileId }`)
      .map(res => <File>res.json());
  }

  /**
   * @param file Add new file
   */
  public addFile (file: File) {
    file.size = this.sizeConversion(file.size, file.sizeType);
    return this.http.post(`${ environment.server.url }api/file/${ this.userService.getUserDetails().userId }`, file);
  }

  public checkoutFile(fileId: string): any {
    return this.http.put(`${ environment.server.url }api/file/checkout/${ this.userService.getUserDetails().userId }/${ fileId }`, {});
  }

  public checkInFile(fileId: string): any {
    return this.http.put(`${ environment.server.url }api/file/checkIn/${ this.userService.getUserDetails().userId }/${ fileId }`, {});
  }

  public updateFile (file: File) {
    file.size = this.sizeConversion(file.size, file.sizeType);
    return this.http.put(`${ environment.server.url }api/file/${ this.userService.getUserDetails().userId }/${ file._id }`, file);
  }

  public deleteFile (fileId) {
    return this.http.delete(`${ environment.server.url }api/file/${ this.userService.getUserDetails().userId }/${ fileId }`);
  }

  /**
   * All file sizes are stored in KB for searching purposes
   * @param size - size of file in KB
   * @param type - sizeType (KB, MB, GB, TB)
   * @returns server friendly size
   */
  private sizeConversion (size: number, type: string) {
    switch (type) {
      case 'KB':
        return size;
      case 'MB':
        return (size * 1000);
      case 'GB':
        return (size * 1000000);
      case 'TB':
        return (size * 1000000000);
    }
  }

}
