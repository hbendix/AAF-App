import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
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
export class FileComponent implements OnInit, OnDestroy {

  @ViewChild('fileTags') fileTags: ElementRef;
  fileForm: FormGroup = null;
  file: File;
  fileTypes: string[];
  sizeTypes: string[];
  teams: Team[] = [];
  users: User[] = [];
  tags: string[] = [];
  addNew = true;
  currentUser: UserDetails;
  fileVersion = 1;
  pendingEdit = false;
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  constructor(private fileService: FileService,
    private fb: FormBuilder,
    private teamService: TeamService,
    private userService: UserService,
    private notificationService: NotificationService,
    private router: Router) {

      // UserDetails is required when creating a new file.
      this.currentUser = new UserDetails(
        this.userService.getUserDetails().userId,
        this.userService.getUserDetails().username,
        Date.now(),
        this.userService.getUserDetails().avatar);
    }

  ngOnInit() {
    this.pendingEdit = this.fileService.filePendingEdit;

    // const file extensions and size type, KB MB GB etc..
    this.fileTypes = Types.fileTypes();
    this.sizeTypes = Types.sizeTypes();

    this.getTeams();
  }

  private getTeams(): any {
    // get all teams associated with logged in user
    this.teamService.getTeams()
      .subscribe(
        (res) => {
          this.teams = res;
          this.getUsers();
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
          console.log(err);
        }
    );
  }

  private getUsers(): any {
    // get all users on the system, as you can share files with users.
    this.userService.getAll()
      .subscribe(
        (res) => {
          res.splice(res.findIndex(item => item.name ===  this.userService.getUserDetails().username), 1);
          this.users = res;
          console.log(this.users);
          this.setupForm();
        }, (err) => {
          this.notificationService.triggerNotification(`Error getting teams '${ err.statusText }'`, false, 3000);
          console.log(err);
        }
      );
  }

  private setupForm(): any {
    if (this.pendingEdit) {
      this.file = this.fileService.getFileToEdit();
      console.log(this.teams, this.file.teams);
      this.setupEditForm();
    } else {
      this.setupNewForm();
    }
  }

  private setupNewForm(): any {
    // set up the form group with all required validation for adding to the DB
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
      fileTeams: [],
      canEdit: [],
    });
  }
  private setupEditForm(): any {
    // set up the form group with all required validation for adding to the DB
    this.fileForm = this.fb.group({
      hideRequired: false,
      floatLabel: 'auto',
      version: [ this.file.version,
        { disabled: true }, [
          Validators.required
        ]
      ],
      title: [this.file.title, [
        Validators.required
      ]],
      description: [this.file.description],
      fileType:  [this.file.fileType, [
        Validators.required
      ]],
      size: [this.file.size, [
        Validators.required,
        Validators.min(0)
      ]],
      sizeType: [this.file.sizeType, [
        Validators.required
      ]],
      isPublic: [this.file.isPublic, Validators.required],
      fileTeams: [this.file.teams !== null ? this.file.teams.map(team => team.teamId) : ''],
      canEdit: [this.file.canEdit !== null ? this.file.canEdit.map(user => user.userId) : ''],
    });

    this.tags = this.file.tags;
  }

  /**
   *
   * @param tag add tag to array to be saved alongside file
   */
  public addTag(tag: string) {
    this.fileTags.nativeElement.value = '';
    this.tags.push(tag);

  }

  /**
   *
   * @param tag remove tag from array
   */
  public removeTag (tag) {
    this.tags.splice(tag, 1);
    this.fileTags.nativeElement.value = '';
  }

  public isTeam(team: Team) {
    if (this.pendingEdit) {
      if (this.file.teams.some(e => e._id === team._id)) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Add file to the database.
   */
  public addFile() {
    const file = this.fileForm.value;
    if (this.tags.length > 0) {
      file.tags = [];
      file.tags = this.tags;
    }

    // to get the mat-select multiple to pre select teams on edit,
    // had to change the value from the team object to the team id.
    let _teams = [];
    let _canEdit = [];

    _teams = this.teams.filter((f: Team) => file.fileTeams.includes(f._id));
    _canEdit = this.users.filter((u: User) => file.canEdit.includes(u._id));

    console.log(_teams);

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
      _teams,
      _canEdit,
      null,
      this.pendingEdit ? this.file._id : null
    );

    if (this.pendingEdit) {
      this.putFile(toAdd);
    } else {
      this.postFile(toAdd);
    }
  }
  private putFile(toAdd: File): any {
    this.fileService.updateFile(toAdd).subscribe(
      (res) => {
        this.notificationService.triggerNotification(`Saved '${ toAdd.title }'`, true, 3000);
        this.fileService.filePendingEdit = false;
        this.router.navigate(['/MyFiles']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error saving file '${ err.statusText }'`, false, 3000);
      }
    );
  }

  private postFile(toAdd: File): any {
    this.fileService.addFile(toAdd).subscribe(
      (res) => {
        this.notificationService.triggerNotification(`Saved '${ toAdd.title }'`, true, 3000);
        this.router.navigate(['/MyFiles']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error adding file '${ err.statusText }'`, false, 3000);
      }
    );
  }

  /**
   * delete
   */
  public delete(fileId: string) {
    this.fileService.deleteFile(fileId).subscribe(
      (res) => {
        this.notificationService.triggerNotification('Deleted file', true, 3000);
        this.router.navigate(['/MyFiles']);
      }, (err) => {
        this.notificationService.triggerNotification(`Error adding file '${ err.statusText }'`, false, 3000);
      }
    );
  }

  // getters are used for Reactive forms to get error message for any input
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

  ngOnDestroy(): void {
    this.fileService.filePendingEdit = false;
    this.pendingEdit = false;
  }
}
