import { UserDetails } from '../../users/shared/user-details';
import { Team } from 'src/app/teams/shared/team';

export class File {

    version: number;
    title: string;
    description: string;
    fileType: string;
    size: number;
    sizeType: string;
    createdBy: UserDetails;
    updateBy: UserDetails;
    tags: string[];
    dormant: boolean;
    isPublic: boolean;
    checkedOut?: {
        true: boolean,
        by: UserDetails,
    };
    teams?: Team[];
    canEdit?: UserDetails[];
    perviousVersion?: number[];
    id?: number;

    constructor(
        version: number,
        title: string,
        description: string,
        fileType: string,
        size: number,
        sizeType: string,
        createdBy: UserDetails,
        updateBy: UserDetails,
        tags: string[],
        dormant: boolean,
        isPublic: boolean,
        checkedOut?: {
            true: boolean,
            by: UserDetails,
        },
        teams?: Team[],
        canEdit?: UserDetails[],
        perviousVersion?: number[],
        id?: number) {
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
            this.teams = teams;
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
