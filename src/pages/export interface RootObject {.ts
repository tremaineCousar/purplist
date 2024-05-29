export interface RootObject {
 content:       RootObjectContent;
 custom_fields: any[];
 external_urls: null;
 id:            string;
 images:        any[];
 name:          null;
 rendering:     string;
 tag_line:      null;
 type:          RootObjectType;
 
}

export interface RootObjectContent {
 items:    PurpleItem[];
 limit:    number;
 next:     null;
 offset:   number;
 previous: null;
 total:    number;
}

export interface PurpleItem {
 content:       ItemContent;
 custom_fields: any[];
 external_urls: null;
 id:            string;
 images:        any[];
 name:          string;
 rendering:     Rendering;
 tag_line:      null;
 type:          RootObjectType;
}

export interface ItemContent {
 items:    FluffyItem[];
 limit:    number;
 next:     boolean | null;
 offset:   number;
 previous: null;
 total:    number;
}

export interface FluffyItem {
 album_type?:             AlbumType;
 artists?:                Owner[];
 collaborative?:          boolean;
 description?:            string;
 external_urls:           ExternalUrls;
 id:                      string;
 images:                  Image[];
 is_playable?:            boolean;
 name:                    string;
 owner?:                  Owner;
 primary_color?:          null;
 public?:                 null;
 release_date?:           Date;
 release_date_precision?: ReleaseDatePrecision;
 snapshot_id?:            string;
 total_tracks?:           number;
 tracks?:                 Tracks;
 type:                    PurpleType;
 uri:                     string;

}

export enum AlbumType {
 Album = "album",
 Single = "single",
}

export interface Owner {
 display_name?: DisplayName;
 external_urls: ExternalUrls;
 id:            string;
 name?:         string;
 type:          OwnerType;
 uri:           string;
}

export enum DisplayName {
 Spotify = "Spotify",
}

export interface ExternalUrls {
 spotify: string;
}

export enum OwnerType {
 Artist = "artist",
 User = "user",
}

export interface Image {
 height: number | null;
 url:    string;
 width:  number | null;
}

export enum ReleaseDatePrecision {
 Day = "day",
}

export interface Tracks {
 total: number;
}

export enum PurpleType {
 Album = "album",
 Playlist = "playlist",
}

export enum Rendering {
 Header = "HEADER",
 List = "LIST",
}

export enum RootObjectType {
 View = "view",
}
