import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FileService } from '../shared/file.service';
import { File } from '../shared/file';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Types } from '../shared/types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from 'src/app/teams/shared/team.service';
import { Team } from 'src/app/teams/shared/team';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/users/shared/user.service';
import { User } from 'src/app/users/shared/user';
import { UserDetails } from 'src/app/users/shared/user-details';
import { Router } from '@angular/router';

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
  teams: Team[] = [];
  users: User[] = [];
  tags: string[] = [];
  addNew = true;
  currentUser: UserDetails;
  fileVersion = 1;

  constructor(private fileService: FileService,
    private fb: FormBuilder,
    private teamService: TeamService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router) {
      this.currentUser = new UserDetails(
        this.userService.getUserDetails().userId,
        this.userService.getUserDetails().username,
        Date.now(),
        this.userService.getUserDetails().avatar);
    }

  ngOnInit() {
    this.file = this.fileService.getFileToView();
    this.fileTypes = Types.fileTypes();
    this.sizeTypes = Types.sizeTypes();

    this.teamService.getTeams()
      .subscribe(
        (res) => {
          this.teams = res;
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
          console.log(err);
        }
    );

    this.userService.getAll()
      .subscribe(
        (res) => {
          res.splice(res.findIndex(item => item.name ===  this.userService.getUserDetails().username), 1);
          this.users = res;
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
          console.log(err);
        }
      );

    this.fileService.newFileLoaded.subscribe(result => {
      if (result) {
        this.file = this.fileService.getFileToView();
      }
    });

    this.fileForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      version: [
        { disabled: true }, [
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
      isPublic: [false, Validators.required],
      teams: [],
      canEdit: [],
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

  public addFile() {
    const file = this.fileForm.value;
    if (this.tags.length > 0) {
      file.tags = [];
      file.tags = this.tags;
    }

    const toAdd = new File(
      this.fileVersion,
      file.title,
      file.description,
      file.fileType,
      file.size,
      file.sizeType,
      this.currentUser,
      this.currentUser,
      file.tags,
      null,
      file.isPublic,
      null,
      file.teams,
      file.canEdit,
      null, null);


    this.fileService.addFile(toAdd).subscribe(
      (res) => {
        this.notificationService.triggerNotification(`Saved '${ file.title }'`, true, 3000);
        this.router.navigate(['/MyFiles']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
      }
    );
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
