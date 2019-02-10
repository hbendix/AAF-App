import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';
import { FileList } from '../shared/file-list';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatYearView, MatBottomSheet } from '@angular/material';
import { FileSheetComponent } from '../file-sheet/file-sheet.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  myFiles: FileList[] = [];
  sharedFile: FileList[] = [];
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  constructor(private fileService: FileService,
    private router: Router,
    private notificationService: NotificationService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.getFileList();
  }

  public getFileList  () {
    this.fileService.getFileList().subscribe((res) => {
      this.myFiles = res;
    }, (err) => {
      this.notificationService.triggerNotification(`Error pulling files: ${ err.statusText }`, false, 3000);
      console.log(err);
    });
  }

  public showFile (fileId: string) {
    const bottomSheetRef = this.bottomSheet.open(FileSheetComponent, {
      data: { fileId: fileId }
    });
  }

}
