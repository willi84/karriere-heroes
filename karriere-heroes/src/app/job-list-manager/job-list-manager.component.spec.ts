import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { JobListManagerComponent } from './job-list-manager.component';
import { FeedService } from '../services/feed/feed.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JobListManagerComponent', () => {
  let component: JobListManagerComponent;
  let fixture: ComponentFixture<JobListManagerComponent>;
  let httpClient: HttpClient;
  let service: FeedService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:   [ JobListManagerComponent ],
      providers:      [FeedService, HttpClient, HttpHandler],
      schemas:        [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(FeedService);
    httpClient = TestBed.get(HttpClient);

    spyOn(service, 'getFeedContent').and.callFake(function(arg){
      if (!arg) {
        return Observable.throw({status: 404});  // throw error
      } else if (arg.indexOf('invalid') >= 0) {
        return Observable.of(`
          <rss>
          <channel>
          <item>
          <link>http://job123.stage.heroes.eu/link1</link>
          <title>Senior Account Manager (m/w) Business Solutions</title>
          <heroes:aufgabenx>Vertrieb</heroes:aufgabenx>
          </item>
          <item>
          <link>http://job123.stage.heroes.eu/link2</link>
          <title>Azubi Business Solutions</title>
          <heroes:aufgabenbereich>Vertrieb</heroes:aufgabenbereich>
          </item>
          <item>
          <link>http://job123.stage.heroes.eu/link3</link>
          <title>Pixelschubser (m/w)</title>
          <heroes:aufgabenbereich>Marketing &#x26; Kommunikation</heroes:aufgabenbereich>
          </item>
          <item>
          <link>http://job123.stage.heroes.eu/link4</link>
          <title>Assistenz (m/w)</title>
          <heroes:aufgabenbereich>Vorstand</heroes:aufgabenbereich>
          </item>
          </channel>
          </rss>`
        );
      } else if (arg.indexOf('empty') >= 0) {
        console.log('empty');
        return Observable.of(`
          <rss>
          <channel>
          <blubb>
          </blubb>
          </channel>
          </rss>`
        );
      } else {
        return Observable.of(`
          <?xml version="1.0" encoding="utf-8"?>
          <?xml-stylesheet type="text/css" href="/skins/default/css/integration-pages.css" ?>
          <?xml-stylesheet type="text/css" href="/skins/job123/css/integration-pages.css" ?>

          <rss  version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/"
                xmlns:atom="http://www.w3.org/2005/Atom" xmlns:heroes="http://www.heroes.eu/rss/elements">
          <channel>
          <item>
          <link>http://job123.stage.heroes.eu/link1</link>
          <title>Senior Account Manager (m/w) Business Solutions</title>
          <heroes:aufgabenbereich>Vertrieb</heroes:aufgabenbereich>
          </item>
          <item>
          <link>http://job123.stage.heroes.eu/link2</link>
          <title>Azubi Business Solutions</title>
          <heroes:aufgabenbereich>Vertrieb</heroes:aufgabenbereich>
          </item>
          <item>
          <link>http://job123.stage.heroes.eu/link3</link>
          <title>Pixelschubser (m/w)</title>
          <heroes:aufgabenbereich>Marketing &#x26; Kommunikation</heroes:aufgabenbereich>
          </item>
          <item>
          <link>http://job123.stage.heroes.eu/link4</link>
          <title>Assistenz (m/w)</title>
          <heroes:aufgabenbereich>Vorstand</heroes:aufgabenbereich>
          </item>
          </channel>
          </rss>`
        );
      }
    });
    fixture = TestBed.createComponent(JobListManagerComponent);
    component = fixture.componentInstance;
  });
  describe('missing rss-feed', () => {
    beforeEach(() => {
      component.company = 'foobar';
      fixture.detectChanges();
    });
    it('should create empty jobData item', () => {
      expect(component.jobData.length).toEqual(0);
    });
  });
  describe('empty rss-feed', () => {
    beforeEach(() => {
      component.company = 'empty';
      fixture.detectChanges();
    });
    it('should create empty jobData item', () => {
      expect(component.jobData.length).toEqual(0);
    });
  });
  describe('invalid rss-feed', () => {
    beforeEach(() => {
      component.company = 'invalid';
      fixture.detectChanges();
    });
    it('should create empty jobData item', () => {
      expect(component.jobData.length).toEqual(3);

      // Bereich 'Vertrieb' Stelle 1
      expect(component.jobData[0].headline).toEqual('Sonstige');
      expect(component.jobData[0].id).toEqual('Sonstige');
      expect(component.jobData[0].image).toEqual('./assets/test.jpg');
      expect(component.jobData[0].items.length).toEqual(2);  // 2 Jobs in 1 Bereich
      expect(component.jobData[0].items[0].link).toEqual('http://job123.stage.heroes.eu/link1');
      expect(component.jobData[0].items[0].title).toEqual('Senior Account Manager (m/w) Business Solutions');

      expect(component.jobData[0].items[1].link).toEqual('http://job123.stage.heroes.eu/link4');
      expect(component.jobData[0].items[1].title).toEqual('Assistenz (m/w)');

      // Bereich 'Marketing' Stelle 1
      expect(component.jobData[1].headline).toEqual('Vertrieb');
      expect(component.jobData[1].id).toEqual('Vertrieb');
      expect(component.jobData[1].image).toEqual('./assets/test.jpg');
      expect(component.jobData[1].items.length).toEqual(1);
      expect(component.jobData[1].items[0].link).toEqual('http://job123.stage.heroes.eu/link2');
      expect(component.jobData[1].items[0].title).toEqual('Azubi Business Solutions');

      // Bereich 'Vorstand' Stelle 1
      expect(component.jobData[2].headline).toEqual('Marketing / PR');
      expect(component.jobData[2].id).toEqual('Marketing / PR');
      expect(component.jobData[2].image).toEqual('./assets/test.jpg');
      expect(component.jobData[2].items.length).toEqual(1);
      expect(component.jobData[2].items[0].link).toEqual('http://job123.stage.heroes.eu/link3');
      expect(component.jobData[2].items[0].title).toEqual('Pixelschubser (m/w)');
    });
  });
  describe('valid rss-feed', () => {
    beforeEach(() => {
      component.company = 'strato';
      fixture.detectChanges();
    });
    it('should create jobData item', () => {

      expect(component).toBeTruthy();
      expect(component.jobData.length).toEqual(3);

      // Bereich 'Vertrieb' Stelle 1
      expect(component.jobData[0].headline).toEqual('Vertrieb');
      expect(component.jobData[0].id).toEqual('Vertrieb');
      expect(component.jobData[0].image).toEqual('./assets/test.jpg');
      expect(component.jobData[0].items.length).toEqual(2);  // 2 Jobs in 1 Bereich
      expect(component.jobData[0].items[0].link).toEqual('http://job123.stage.heroes.eu/link1');
      expect(component.jobData[0].items[0].title).toEqual('Senior Account Manager (m/w) Business Solutions');

      // Bereich 'Vertrieb' Stelle 2
      expect(component.jobData[0].headline).toEqual('Vertrieb');
      expect(component.jobData[0].id).toEqual('Vertrieb');
      expect(component.jobData[0].image).toEqual('./assets/test.jpg');
      expect(component.jobData[0].items.length).toEqual(2);  // 2 Jobs in 1 Bereich
      expect(component.jobData[0].items[1].link).toEqual('http://job123.stage.heroes.eu/link2');
      expect(component.jobData[0].items[1].title).toEqual('Azubi Business Solutions');

      // Bereich 'Marketing' Stelle 1
      expect(component.jobData[1].headline).toEqual('Marketing / PR');
      expect(component.jobData[1].id).toEqual('Marketing / PR');
      expect(component.jobData[1].image).toEqual('./assets/test.jpg');
      expect(component.jobData[1].items.length).toEqual(1);
      expect(component.jobData[1].items[0].link).toEqual('http://job123.stage.heroes.eu/link3');
      expect(component.jobData[1].items[0].title).toEqual('Pixelschubser (m/w)');

      // Bereich 'Vorstand' Stelle 1
      expect(component.jobData[2].headline).toEqual('Sonstige');
      expect(component.jobData[2].id).toEqual('Sonstige');
      expect(component.jobData[2].image).toEqual('./assets/test.jpg');
      expect(component.jobData[2].items.length).toEqual(1);
      expect(component.jobData[2].items[0].link).toEqual('http://job123.stage.heroes.eu/link4');
      expect(component.jobData[2].items[0].title).toEqual('Assistenz (m/w)');

  });
});

});
