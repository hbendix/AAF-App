import { UserDetails } from 'src/app/users/shared/user-details';
import { FileList } from '../../files/shared/file-list';
/**
 * team model
 */
export class Team {
    _id: number;
    name: string;
    users: UserDetails[];
    createdBy: UserDetails;
    files: FileList[];
    teamId?: string;

    constructor (_id: number,
        name: string,
        users: UserDetails[],
        createdBy: UserDetails,
        files: FileList[],
        teamId?: string) {
        this._id = _id;
        this.name = name;
        this.users = users;
        this.createdBy = createdBy;
        this.files = files;
        this.teamId = teamId;
    }
}
