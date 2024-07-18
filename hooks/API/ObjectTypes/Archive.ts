import { Base, type BaseType } from "./Base";
import { Event as Evenement, type EventType } from "./Event";
import { ArchivePost, type ArchivePostType } from "./ArchivePost";
import { User, type UserType } from "./User";

export interface ArchiveType extends BaseType {
  evenement: EventType | null;
  posts: string[];
  nb_posts: number;
  archive_posts: ArchivePostType[];
  forms: number;
  users: UserType[] | null;
}

export interface ArchiveViewer {
  userName: string;
  uri: string;
  userAvatar: string;
  imageTimestampDate: string;
  imageTimestampTime: string;
}

export class Archive extends Base {
  // PROPERTIES
  evenement: Evenement | null = null;
  posts: string[] = [];
  archive_posts: ArchivePost[] = [];
  nb_posts: number = 0;
  forms: number = 0;
  users: User[] | null = null;

  constructor(params: ArchiveType) {
    super(params);
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { evenement, posts, nb_posts, archive_posts, forms, users } = params ?? {};
    this.evenement = evenement != null ? new Evenement(evenement) : this.evenement;
    this.posts = posts ?? this.posts;
    this.nb_posts = nb_posts ?? this.nb_posts;
    this.archive_posts =
      archive_posts != null ? archive_posts.map((ap) => new ArchivePost(ap)) : this.archive_posts;
    this.forms = forms ?? this.forms;
    this.users = users != null ? users.map((user) => new User(user)) : this.users;
  }

  get transformer(): ArchiveViewer[] {
    return this.archive_posts.map((p) => {
      return {
        userName: p.user?.lastname + " " + p.user?.firstname,
        uri: p.image!,
        userAvatar: require("../../../assets/images-temp/Avatar_Mathis.png"),
        imageTimestampDate: (p.createdAt ?? new Date()).toLocaleDateString(),
        imageTimestampTime: (p.createdAt ?? new Date()).toLocaleTimeString(),
      };
    });
  }
}
