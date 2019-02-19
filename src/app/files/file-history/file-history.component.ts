import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { File } from '../shared/file';
@Component({
  selector: 'app-file-history',
  templateUrl: './file-history.component.html',
  styleUrls: ['./file-history.component.scss']
})
export class FileHistoryComponent implements OnInit {

  files: File[] = [];
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  loading = true;
  noFiles = false;
  fileTitle: string;
  fileCreatedDate: number;

  constructor(private fileService: FileService,
    private notificationService: NotificationService) { }

  // get service variable and load file history from server
  ngOnInit() {
    if (typeof this.fileService.fileHistoryId !== 'undefined') {
      this.fileService.getFileHistory().subscribe(
        (res) => {
          this.files = res;
          this.fileTitle = this.files[0].title;
          this.fileCreatedDate = this.files[0].createdBy.when;
          this.loading = false;
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting file history ${ err.statusText }`, false, 3000);
        }
      );
    } else {
      this.noFiles = true;
    }
  }

  /**
   * to check and see if file has changed, each attribute gets passed into and return CSS class name
   * here and will determine if the value has changed
   * however, only do it for the 2nd and below element (as obvs no previous version for first iteration of file!)
   * @param current file
   * @param previous file
   * @param attribute tile, size etc...
   * @param index index of loop
   */
  public changed (current, previous, attribute, index) {
    if (index > 0) {
      if (typeof current === 'undefined' || typeof previous === 'undefined') {
        return false;
      }

      if (current[attribute] !==  previous[attribute]) {
        return 'changed';
      } else if (current === previous) {
        return false;
      }
    } else {
      return false;
    }

    return false;
  }

}
