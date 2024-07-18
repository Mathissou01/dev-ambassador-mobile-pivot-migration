import { Base, type BaseType } from "./Base";
import { User, type UserType } from "./User";

export interface ArchivePostType extends BaseType {
  user: UserType | null;
  image_url: string;
}

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = `${BASE_URL}api/`;

export class ArchivePost extends Base {
  // PROPERTIES
  user: User | null = null;
  image: string;

  constructor(params?: ArchivePostType) {
    super(params);
    const { user, image_url } = params ?? {};
    this.user = user != null ? new User(user) : this.user;
    this.image = API_URL + this.table + image_url;
  }
}
