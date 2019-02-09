import { Component, OnInit } from '@angular/core';
import { FileService } from '../shared/file.service';
import { File } from '../shared/file';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Types } from '../shared/types';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  file: File;
  fileTypes: string[];
  sizeTypes: string[];

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.file = this.fileService.getFileToView();
    this.fileTypes = Types.fileTypes();
    this.sizeTypes = Types.sizeTypes();

    this.fileService.newFileLoaded.subscribe(result => {
      if (result) {
        this.file = this.fileService.getFileToView();
      }
    });
  }

}
