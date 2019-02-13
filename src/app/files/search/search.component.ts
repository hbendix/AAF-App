import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/teams/shared/team.service';
import { Team } from 'src/app/teams/shared/team';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { UserService } from 'src/app/users/shared/user.service';
import { User } from 'src/app/users/shared/user';
import { Types } from '../shared/types';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { bypassSanitizationTrustResourceUrl } from '@angular/core/src/sanitization/bypass';
import { FileService } from '../shared/file.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = false;
  loaded = false;
  fileTypes: string[] = [];
  sizeTypes: string[] = [];
  searchForm: FormGroup;
  color = 'accent';
  mode = 'indeterminate';
  value = 50;


  constructor(private fb: FormBuilder,
    private fileService: FileService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.fileTypes = Types.fileTypes();
    this.sizeTypes = Types.sizeTypes();
    this.pullPublicFiles();
  }

  /**
   * Get all public files from the server
   * On completion update the variable in the service
   * Alert observables of change and to update 'file-list'
   */
  public pullPublicFiles () {
    this.fileService.pullPublicFiles().subscribe(
      (res) => {
        this.fileService.setFileList(res);
        this.loaded = true;
        this.fileService.updateTable.next(true);
      }, (err) => {
        this.notificationService.triggerNotification(`Error getting files '${ err.statusText }'`, false, 3000);
      }
    );
  }

  /**
   * Shows search section
   */
  public showSearchArea () {
    this.searchForm = this.fb.group({
      title: [],
      fileType:  [],
      size: [null, Validators.min(0) ],
      greaterThan: [],
      sizeType: [],
    });

    this.search = true;
  }

  /**
   * Get all form values (search params)
   * Check that size has both a type and if the user wants to see great/lesser than the value.
   * Pull files from the server and on completion hide search area and alert observables to update file list
   */
  public searchFiles () {
    const params = this.searchForm.value;
    const q = {};

    if (params.size !== null) {
      if ((params.greaterThan === null) || (params.sizeType === null)) {
        return this.notificationService.triggerNotification('Please select a radio button and/or a size type.', false, 3000);
      }
    }

    // tslint:disable-next-line:forin
    for (const key in params) {
        // tslint:disable-next-line:no-unused-expression
        params[key] !== null ? q[key] = params[key] : null;
    }

    if (Object.entries(q).length === 0 && q.constructor === Object) {
      return this.notificationService.triggerNotification('Please fill out at least one input.', false, 3000);
    }


    this.fileService.search(q).subscribe(
      async (res) => {
        this.search = false;
        await this.fileService.setFileList(res);
        this.fileService.updateTable.next(true);
      }, (err) => {
        this.notificationService.triggerNotification(`Error searching files: '${ err.statusText }'`, false, 3000);
      }
    );
  }
}
