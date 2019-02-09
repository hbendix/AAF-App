import { UserDetails } from '../../users/shared/user-details';
import { Team } from 'src/app/teams/shared/team';

export class File {

    id: number;
    version: number;
    title: string;
    description: string;
    fileType: string;
    size: number;
    sizeType: string;
    createdBy: UserDetails;
    updateBy: UserDetails;
    checkedOut?: UserDetails;
    tags: string[];
    dormant: boolean;
    team?: Team;
    isPublic: boolean;
    canEdit?: UserDetails[];
    perviousVersion?: number[];

    constructor(id: number,
        version: number,
        title: string,
        description: string,
        fileType: string,
        size: number,
        sizeType: string,
        createdBy: UserDetails,
        updateBy: UserDetails,
        checkedOut: UserDetails,
        tags: string[],
        dormant: boolean,
        isPublic: boolean,
        perviousVersion: number[],
        canEdit: UserDetails[],
        team?: Team) {
            this.id  = id;
            this.version = version;
            this.title = title;
            this.description = description;
            this.fileType = fileType;
            this.size = size;
            this.sizeType = sizeType;
            this.createdBy = createdBy;
            this.updateBy = updateBy;
            this.checkedOut = checkedOut;
            this.tags = tags;
            this.dormant = dormant;
            this.team = team;
            this.isPublic = isPublic;
            this.canEdit = canEdit;
            this.perviousVersion = perviousVersion;
    }

    /**
     * delete
     */
    public static delete(id: number) {

    }

    /**
     * get
     */
    public static get(id: number) {

    }
    /**
     * add
     */
    public add() {

    }

    /**
     * edit
     */
    public edit() {

    }

}
