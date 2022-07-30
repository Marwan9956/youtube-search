export interface IResults{
    id           : string;
    title        : string;
    description  : string;
    thumbnailUrl : string;
    videoUrl     : string;
}

export interface Item{
    etag : string;
    id   : Iid;
    kind : string;
    snippet : ISnippet;
}

export interface IVideo{
    etag : string;
    items: object[];
    kind : string;
    nextPageToken : string;
    pageInfo : object;
    regionCode : string;
}

export interface Iid{
    kind : string;
    videoId : string;
}

export interface ISnippet{
    channelId : string;
    channelTitle : string;
    description  : string;
    liveBroadcastContent : string;
    publishTime : string;
    publishedAt : string;
    thumbnails  : IThumbnails;
    title       : string;
}

export interface IThumbnails{
    default : IThumbnail;
    hight   : IThumbnail;
    medium  : IThumbnail;
}

export interface IThumbnail{
    url : string;
    width : number;
    height : number;
}