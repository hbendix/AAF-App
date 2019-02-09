import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';
import { FileList } from '../shared/file-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent implements OnInit {

  myFiles: FileList[];
  sharedFile: FileList[];

  constructor(private fileService: FileService,
    private router: Router) { }

  ngOnInit() {
    this.getFileList();
  }

  public async getFileList  () {
    this.myFiles = await this.fileService.getFileList();
  }

  public async showFile (fileId) {
    const file = await this.fileService.loadFile(fileId);
    if ((file) && (this.router.url !== '/File')) {
      this.router.navigate(['/File']);
    } else if ((file) && (this.router.url === '/File')) {
      this.fileService.newFileLoaded.next(true);
    }
  }

}
