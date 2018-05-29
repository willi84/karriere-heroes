import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JobLinkComponent } from './job-link/job-link.component';
import { JobListManagerComponent } from './job-list-manager/job-list-manager.component';
import { JobGroupComponent } from './job-group/job-group.component';
import { FeedService } from './services/feed/feed.service';
import { SanitizeService } from './services/sanitize/sanitize.service';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    JobLinkComponent,
    JobListManagerComponent,
    JobGroupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ FeedService, SanitizeService ],
  entryComponents: [ AppComponent ]
})

/**
 * Ein Modul zur Erzeugung einer Jobliste.
 * @module karriere
 */
export class AppModule {
  ngDoBootstrap(app) {
    const nodes: NodeListOf<any> = document.querySelectorAll('job-list');
    const lenNodes: number = nodes.length;

    // IE11 not support forEach on nodeList
    for (let i = 0; i < lenNodes; i++) {
      app.bootstrap(AppComponent, nodes[ i ]);
    }
  }
}
