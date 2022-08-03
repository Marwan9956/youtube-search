import { Component, EventEmitter, Input, OnInit, Output, SimpleChange , ChangeDetectorRef  } from '@angular/core';
import { VideoService } from '../services/video.service';
import { IResults , Item} from '../serachResult.model';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  data : IResults[];
  @Input() query : boolean = false;
  @Output() resetValue = new EventEmitter;
  start : boolean ;
  isLoading : boolean;
  done : boolean;

  checkDataTimer : number;
  loadingTimer   : number;

 
  constructor(private vid : VideoService , private changeDetection:ChangeDetectorRef) { 
    this.data = [];
    this.start = true;
    this.isLoading = false;
    this.done = false;
    this.checkDataTimer = 3;
    this.loadingTimer   = 2;
  }

  ngOnInit(): void {
    this.setLoadingTime(this.loadingTimer);
  }

  ngOnChanges(changes : any){
    
    // changes.query.currentValue
    /**
     * Reset value call for parent
     */
    this.resetValue.emit("reset");

    //Change on data 
    this.changeDetection.detectChanges();
    this.data = [];
    
    if(!this.start && this.query){
      this.setLoadingTime(this.loadingTimer);
    }

    this.start=false;
    
  }

  /**
   * 
   * Search video  get video from video services  based on query added on search component 
   * @returns boolean
   */
  searchVideo():boolean{
    this.done = false;
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
            videoUrl    : "https://www.youtube.com/watch?v="
          };
          
          this.data.push(res);
        });
      },
      (error) => {

      },
      () =>{ 
        this.done = true;
        this.isLoading = false;
      }
    );
    return false;
  }

  /**
   * adding Loading functionality 
   */
  loadingVid():void{
    let timer = 0;
    
    this.searchVideo();
    let waitingForData = setInterval(checkData , 1000);
    let vidComp : any = this;
    
    function checkData(){
      timer+=1;
     
      if(timer >= vidComp.checkDataTimer || vidComp.done == true){
        clearInterval(waitingForData);
      }
    }
    
  }

  /**
   * setLoadingTime:
   * take number on seconds to set the loading 
   * @param seconds number
   */
  setLoadingTime(seconds : number):void{
    this.isLoading = true;
    seconds = seconds * 1000;
    let vidComp = this;
    setTimeout(function(){
      vidComp.loadingVid();
    }, seconds)
  }

  

  

}
