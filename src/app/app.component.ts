import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube-search';
  changes = false;

  onChange(event:string):void{
    console.log(event);
    this.changes = true;
    //this.changes = false;
  }

  resetValue(event:any):void{
    this.changes = false;
    console.log("it is reset");
  }
}
