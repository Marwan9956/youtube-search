import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IVideo } from '../serachResult.model';
import { filter, Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  /**
   * Url for Youtube Api and Api Key
   */
  private url : string;
  private apiKey : string;
  private query  : string ;

  constructor(private http : HttpClient) { 
    this.url = "https://www.googleapis.com/youtube/v3/search";
    this.apiKey = "AIzaSyA2iJNlC3c3DUG8tgBJ5scs9d7zX89OWME"; 
     
    this.query = "";
  }

  /**
   * 
   * @param query string what you want to search for here 
   */
  setQuery(query :string){
    this.query = query;
  }

  /**
   * method processing search functinality for youtube and return observable to subscribe 
   * @returns Observable  
   */
  searchVid() : Observable<IVideo>{
    console.log(this.query);
    this.query = encodeURIComponent(this.query);

    /**
     * Youtube Param construct 
     */
    const parameters : string = [
      `q=${this.query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=8`
    ].join("&");
    
    const queryURL = `${this.url}?${parameters}`;
    
    return this.http.get<IVideo>(queryURL);
  }
}
