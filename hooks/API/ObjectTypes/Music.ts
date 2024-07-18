import { BaseType } from "./Base";

export interface MusicType extends BaseType {
  name: string;
  tag: string;
  artistes: string[];
  theme: string;
  source: string;
}

export class Music {
  // PROPERTIES
  name?: string;
  tag?: string;
  artistes: string[];
  theme?: string;
  source?: string;

  constructor(params?: MusicType) {
    const { name, tag, artistes, theme, source } = params ?? {};
    this.name = name;
    this.tag = tag;
    this.artistes = artistes ?? [];
    this.theme = theme;
    this.source = source;
  }
}
