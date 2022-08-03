import { Component, OnInit , Output , EventEmitter} from '@angular/core';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery : string;
  @Output() searchTrigger  = new EventEmitter<string>();

  constructor(private vid : VideoService) { 
    this.searchQuery = "";
  }

  ngOnInit(): void {
  }

  /**
   * when user click search it emit and event for parent component to handle 
   * @returns boolean
   */
  onClickSearch() : boolean{
    this.vid.setQuery(this.searchQuery);
    /**
     * Emit an Event when user click search 
     */
    this.searchTrigger.emit("user clicked search");
    return false;
  }

}
