import { Component, OnInit, Inject } from '@angular/core';
import { File } from '../shared/file';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { FileService } from '../shared/file.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/users/shared/user.service';

@Component({
  selector: 'app-file-sheet',
  templateUrl: './file-sheet.component.html',
  styleUrls: ['./file-sheet.component.scss']
})
export class FileSheetComponent implements OnInit {

  viewFile: File;
  createdDate: Date;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public file,
  private fileService: FileService,
  private notificationService: NotificationService,
  private userService: UserService,
  public dialogRef: MatBottomSheetRef<FileSheetComponent>) {
    console.log(this.file);
  }
  ngOnInit() {
    this.getFile();
  }
  public getFile () {
    this.fileService.getFile(this.file.fileId).subscribe(
      (res) => {
        this.viewFile = res;
        console.log(this.viewFile);
      }, (err) => {
        this.notificationService.triggerNotification(`Error loading file: ${ err.statusText }`, false, 3000);
      }
    );
  }

  public canEdit () {
    if (this.viewFile !== null) {
      const id = this.userService.getUserDetails().userId;
      if (this.viewFile.canEdit !== null) {
        if (this.viewFile.canEdit.some(e => e.userId === id)) {
          return true;
        }
      }

      if ((this.viewFile.createdBy.userId === id) || (this.viewFile.updateBy.userId)) {
        return true;
      }

      return false;
    }

  }

  public close () {
    this.dialogRef.dismiss();
  }

}
