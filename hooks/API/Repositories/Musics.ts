import { MusicType } from "../ObjectTypes/Music";
import { Base, BaseType } from "./Base";

export interface MusicsType extends BaseType {
  table: String;
}

export class Musics extends Base {
  constructor(params?: MusicsType) {
    super(params);
  }

  getMusicById(id: string): MusicType | null {
    const tmpMusic: Array<MusicType> = this.allMinData.filter((data: MusicType) => data._id === id);
    if (tmpMusic[0] !== undefined) return tmpMusic[0];
    return null;
  }
}
