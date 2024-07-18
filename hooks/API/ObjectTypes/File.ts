import { Base, BaseType } from "./Base";
import { School } from "./School";

interface FileType extends BaseType {
  name: string;
  size: number;
  type: string;
  school: any;
  file: string;
  original_file_name: string;
}

export class File extends Base {
  // PROPERTIES
  name: string | undefined;
  size: number | undefined;
  type: string | undefined;
  school: School | string | null;
  file: string | undefined;
  original_file_name: string | undefined;

  constructor(params?: FileType) {
    super(params);
    const { name, file, size, type, original_file_name, school } = params ?? {};
    this.name = name ?? "";
    this.size = size ?? 0;
    this.type = type ?? "";
    if (typeof school === "string")
      if (school.match(/^[0-9a-fA-F]{24}$/))
        this.school = school
          ? new School({ _id: school, table: "schhol" })
          : null;
      else this.school = null;
    else this.school = school ? new School(school) : null;
    this.file = file;
    this.original_file_name = original_file_name ?? "";
  }

  get sizeText() {
    return byteConverter(this.size ?? 0, 2);
  }

  get url() {
    return process.env.EXPO_PUBLIC_API_URL +  "api/fileviewer/" + this._id;
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
