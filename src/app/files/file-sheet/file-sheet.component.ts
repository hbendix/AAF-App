import { Component, OnInit, Inject } from '@angular/core';
import { File } from '../shared/file';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { FileService } from '../shared/file.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/users/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-sheet',
  templateUrl: './file-sheet.component.html',
  styleUrls: ['./file-sheet.component.scss']
})
export class FileSheetComponent implements OnInit {

  viewFile: File;
  createdDate: Date;
  checkedOut = false;
  userCanEdit = false;
  thisUserCheckedOut = false;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public file,
  private fileService: FileService,
  private notificationService: NotificationService,
  private userService: UserService,
  public dialogRef: MatBottomSheetRef<FileSheetComponent>,
  private router: Router) { }

  ngOnInit() {
    this.getFile();
  }


  /**
   * Get the file by the fileID that gets passing into the component from a parent component
   */
  public getFile () {
    this.fileService.getFile(this.file.fileId).subscribe(
      (res) => {
        this.viewFile = res;
        console.log(this.viewFile);
        this.canEdit();
        this.isCheckedOut();
      }, (err) => {
        this.notificationService.triggerNotification(`Error loading file: ${ err.statusText }`, false, 3000);
      }
    );
  }

  /**
   * checkout file
   */
  public checkout(file: File) {
    console.log(file);
    console.log(file._id);
    this.fileService.checkoutFile(file._id).subscribe(
      (res) => {
        this.notificationService.triggerNotification('File checked out.', true, 3000);
        this.fileService.setFileToBeEdited(file);
        this.dialogRef.dismiss();
        this.router.navigate(['/File']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error checking file out: ${ err.statusText }`, false, 3000);
      }
    );
  }

  /**
   * checkIn file
   */
  public checkIn(file: File) {
    this.fileService.checkInFile(file._id).subscribe(
      (res) => {
        this.notificationService.triggerNotification('File checked in.', true, 3000);
        this.dialogRef.dismiss();
      }, (err) => {
        this.notificationService.triggerNotification(`Error checking file out: ${ err.statusText }`, false, 3000);
      }
    );
  }

  public edit (file: File) {
    this.fileService.setFileToBeEdited(file);
    this.dialogRef.dismiss();
    this.router.navigate(['/File']);
  }

  /**
   * Close bottom sheet.
   */
  public close () {
    this.dialogRef.dismiss();
  }

  public history (fileId: string) {
    console.log(fileId);
    this.fileService.setFileHistory(fileId);
    this.router.navigate(['/History']);
  }

  private isCheckedOut(): any {
    if (this.viewFile !== null) {
      if (!this.viewFile.checkedOut.true) {
        return this.checkedOut = false;
      } else if ((this.viewFile.checkedOut.true) && (this.viewFile.checkedOut.by.userId === this.userService.getUserDetails().userId)) {
        this.thisUserCheckedOut = true;
        return this.checkedOut = false;
      }

      return this.checkedOut = true;
    }
  }

  /**
   * Used to set state on button in the HTML (disabled, not-disabled)
   * Checks to see if current user can Check out and Edit file.
   */
  private canEdit () {
    if (this.viewFile !== null) {

      const id = this.userService.getUserDetails().userId;
      if (this.viewFile.canEdit !== null) {
        if (this.viewFile.canEdit.some(e => e.userId === id)) {
          return this.userCanEdit = true;
        }
      }

      if ((this.viewFile.createdBy.userId === id) || (this.viewFile.updateBy.userId === id)) {
        return this.userCanEdit = true;
      }

      return this.userCanEdit = false;
    }

  }

}
