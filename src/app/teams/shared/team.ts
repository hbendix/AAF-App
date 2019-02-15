import { UserDetails } from 'src/app/users/shared/user-details';

/**
 * team model
 */
export class Team {
    _id: number;
    name: string;
    users: UserDetails[];
    createdBy: UserDetails;
    teamId?: string;

    constructor (_id: number,
        name: string,
        users: UserDetails[],
        createdBy: UserDetails,
        teamId?: string) {
        this._id = _id;
        this.name = name;
        this.users = users;
        this.createdBy = createdBy;
        this.teamId = teamId;
    }
}
