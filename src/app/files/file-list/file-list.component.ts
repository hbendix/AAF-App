import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FileService } from '../shared/file.service';
import { FileList } from '../shared/file-list';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { MatYearView, MatBottomSheet, MatPaginator, MatTableDataSource, MatSortModule, MatSort } from '@angular/material';
import { FileSheetComponent } from '../file-sheet/file-sheet.component';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  myFiles: FileList[] = [];
  // columns to be displayed on the table
  displayedColumns: string[] = ['version', 'name', 'type', 'size'];
  isTeam = false;
  // values for the loading bar
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  // dataSource is used to populate the table
  dataSource: MatTableDataSource<FileList>;

  constructor(private fileService: FileService,
    private notificationService: NotificationService,
    private bottomSheet: MatBottomSheet) {
      this.isTeam = fileService.isTeam;
    }

  /**
   * As component is generic, subscribe to Observable to be alerted
   * when the data to be displayed gets changes.
   */
  ngOnInit() {
    this.getFileList();
    this.fileService.updateTable.subscribe(res => {
      if (res) {
        this.getFileList();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Get the FileList stored in the FileService
   * Setup Angular Material pagination. Set table DataSource to FileList
   */
  public getFileList  () {
    this.myFiles = this.fileService.getFileList();
    if (this.myFiles !== null) {
      this.dataSource = new MatTableDataSource<FileList>(this.myFiles);
      this.dataSource.paginator = this.paginator;
    } else {
      this.notificationService.triggerNotification('Error loading File List.', false, 3000);
    }
  }

  /**
   * Open bottom sheet with full file details.
   * @param row - row clicked by user from Table
   */
  public showFile (row: any) {
    const bottomSheetRef = this.bottomSheet.open(FileSheetComponent, {
      data: { fileId: row._id }
    });
  }

}
