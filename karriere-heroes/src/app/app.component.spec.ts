import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {} from 'jasmine';

import { FeedService } from './services/feed/feed.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SanitizeService } from './services/sanitize/sanitize.service';
describe('AppComponent', () => {

  let httpClient: HttpClient;
  let service: FeedService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [FeedService, SanitizeService, HttpClient, HttpHandler],
      schemas:      [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));
  beforeEach(() => {
    service = TestBed.get(FeedService);
    httpClient = TestBed.get(HttpClient);

    spyOn(service, 'getFeedContent').and.returnValue(Observable.of(`<rss>
    <channel>
        <item>
            <link>http://job123.stage.heroes.eu/r/Z012X4RXWREIL6W/Senior+Account+Manager+mw+Business+Solutions/10587/Berlin</link>
            <title>Senior Account Manager (m/w) Business Solutions</title>
            <heroes:aufgabenbereich>Vertrieb</heroes:aufgabenbereich>
        </item></channel></rss>`));

  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
