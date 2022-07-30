import { Component, Input, OnInit } from '@angular/core';
import { VideoService } from '../services/video.service';
import { IResults , Item} from '../serachResult.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  data : IResults[];
  @Input() query : string = "";
  constructor(private vid : VideoService) { 
    this.data = [];
  }

  ngOnInit(): void {
    this.searchVideo();
  }

  searchVideo():boolean{
    this.vid.searchVid().subscribe(
      data => {
        console.log(data.items);
        data.items.map(item => {
          let elm   = <Item> item;
          let res : IResults = {
            id : elm.id.videoId,
            title : elm.snippet.title,
            description : elm.snippet.description,
            thumbnailUrl: elm.snippet.thumbnails.medium.url,
            videoUrl    : ""
          };
          
          this.data.push(res);
        });
      }
    );
    return false;
  }

}
