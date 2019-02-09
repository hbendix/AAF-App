import { Injectable } from '@angular/core';
import { FileList } from './file-list';
import { File } from './file';
import { UserDetails } from 'src/app/users/shared/user-details';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  file: File;
  newFileLoaded = new Subject();
  user = new UserDetails(1, 'Harry', Date.now(), 'harry.jpeg');

  constructor() { }

  public getFileList(): FileList[] {
    const toReturn = [];
    const i = new FileList(1, 1, 'Auditing Method', 'MP4', 100, 'KB', this.user);
    const ii = new FileList(1, 1, 'New business proposal', 'docx', 10, 'KB', this.user);

    toReturn.push(i);
    toReturn.push(ii);

    return toReturn;
  }

  public loadFile (fileId): boolean {
    const userDetails: UserDetails[] = [];
    userDetails.push(this.user);
    const i = new File(
      1,
      1,
      'Auditing Method',
      'New auditing method proposed by management',
      'MP4',
      100,
      'KB',
      this.user,
      this.user,
      null,
      ['Video', 'MP4'],
      false,
      false,
      null,
      userDetails, null);

      return this.setFileToView(i);
  }

  public addFile (): void {

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
