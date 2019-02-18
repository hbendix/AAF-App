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
  fileTitle: string;
  fileCreatedDate: number;

  constructor(private fileService: FileService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    if (typeof this.fileService.fileHistoryId !== 'undefined') {
      this.fileService.getFileHistory().subscribe(
        (res) => {
          console.log(res);
          this.files = res;
          this.fileTitle = this.files[0].title;
          this.fileCreatedDate = this.files[0].createdBy.when;
          console.log(this.fileCreatedDate);
          this.loading = false;
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting file history ${ err.statusText }`, false, 3000);
        }
      );
    }
  }

}
