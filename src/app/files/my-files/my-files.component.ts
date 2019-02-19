import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.scss']
})
export class MyFilesComponent implements OnInit {

  loaded = false;
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  constructor(private fileService: FileService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.getFileList();
  }

  /**
   * Get list of Files that User can edit or has created themselves.
   * Update service variable for file-list component to show on table
   */
  public getFileList  () {
    this.fileService.pullFiles().subscribe(
      (res) => {
        this.fileService.setFileList(res, false);
        this.loaded = true;
      }, (err) => {
        this.notificationService.triggerNotification(`Error pulling files: ${ err.statusText }`, false, 3000);
        console.log(err);
      }
    );
  }

}
