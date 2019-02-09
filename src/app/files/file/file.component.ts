import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileService } from '../shared/file.service';
import { File } from '../shared/file';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Types } from '../shared/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  @ViewChild('fileTags') fileTags: ElementRef;
  fileForm: FormGroup;
  file: File;
  fileTypes: string[];
  sizeTypes: string[];
  teams: [];
  tags: string[] = [];
  addNew = true;

  constructor(private fileService: FileService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.file = this.fileService.getFileToView();
    this.fileTypes = Types.fileTypes();
    this.sizeTypes = Types.sizeTypes();

    this.fileService.newFileLoaded.subscribe(result => {
      if (result) {
        this.file = this.fileService.getFileToView();
      }
    });

    this.fileForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      version: [
        { value: 1, disabled: true }, [
          Validators.required
        ]
      ],
      title: ['', [
        Validators.required
      ]],
      description: [''],
      fileType:  ['', [
        Validators.required
      ]],
      size: [0, [
        Validators.required,
        Validators.min(0)
      ]],
      sizeType: ['', [
        Validators.required
      ]],
      isPublic: ['', [
        Validators.required
      ]],
    });
  }

  public addTag(tag) {
    this.fileTags.nativeElement.value = '';
    this.tags.push(tag);

  }

  public removeTag (tag) {
    this.tags.splice(tag, 1);
    this.fileTags.nativeElement.value = '';
  }


  get version() {
    return this.fileForm.get('version');
  }
  get title() {
    return this.fileForm.get('title');
  }
  get fileType() {
    return this.fileForm.get('fileType');
  }
  get size() {
    return this.fileForm.get('size');
  }
  get sizeType() {
    return this.fileForm.get('sizeType');
  }
  get isPublic () {
    return this.fileForm.get('isPublic');
  }
}
