import { UserDetails } from 'src/app/users/shared/user-details';

/**
 * team model
 */
export class Team {
    id: number;
    name: string;
    users: UserDetails[];
    createdBy: UserDetails;

    constructor (id: number,
        name: string,
        users: UserDetails[],
        createdBy: UserDetails) {
        this.id = id;
        this.name = name;
        this.users = users;
        this.createdBy = createdBy;
    }
}
