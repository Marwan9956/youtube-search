import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { VideoComponent } from './video/video.component';

import { HttpClientModule } from '@angular/common/http';

import { VideoService } from './services/video.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    VideoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
