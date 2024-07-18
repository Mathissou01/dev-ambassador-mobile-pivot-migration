import {Base, type BaseType} from "./Base";

export interface ArchivePostsType extends BaseType {
    table: string;
}

export class ArchivePosts extends Base {
    constructor(params?: ArchivePostsType) {
        super({table: "archive_posts", ...params});
    }
}
