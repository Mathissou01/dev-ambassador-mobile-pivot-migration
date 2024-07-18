import { Base, BaseType } from "./Base";
import { School } from "./School";
import { User, UserType } from "./User";

interface AvatarType extends BaseType {
  name: string;
  size?: number;
  user?: UserType | string | null;
  image: string;
}

export class Avatar extends Base {
  // PROPERTIES
  name: string | undefined;
  size?: number | undefined;
  user: User | string | null;
  image: string | undefined;

  constructor(params?: Partial<AvatarType>) {
    super({ _id: "", ...params });
    const { name, user, size, image } = params ?? {};
    this.name = name ?? "";
    this.size = size ?? 0;
    this.image = image ?? "";
    this.user = user ? typeof user === "string" ? user : new User(user) : null;
  }

  get sizeText() {
    return byteConverter(this.size ?? 0, 2);
  }

  get url() {
    return process.env.EXPO_PUBLIC_API_URL +  "api/avataviewer/" + this._id;
  }
}

function byteConverter(bytes: number, decimals: number, only?: string) {
  const K_UNIT = 1024;
  const SIZES = ["Octets", "Ko", "Mo", "Go", "To", "Po"];

  if (bytes == 0) return "0 Octet";

  if (only === "Mo")
    return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + " Mo";

  let i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
  return (
    parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i]
  );
}
