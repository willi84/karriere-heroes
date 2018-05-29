import { TestBed,  inject } from '@angular/core/testing';

import { FeedService } from './feed.service';
import { HttpClient, HttpHandler  } from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('FeedService', () => {
  let service: FeedService;
  let httpClient: HttpClient ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedService, HttpClient, HttpHandler]
    });
    service = TestBed.get(FeedService);
    httpClient = TestBed.get(HttpClient);
  });
  it('should be injectable', inject([FeedService], (injectableService: FeedService) => {
    expect(injectableService).toBeTruthy();
  }));

  describe('Function: getFeedContent', () => {
    it('should exist', () => {
      expect(service.getFeedContent).toEqual(jasmine.any(Function));
    });

    it('should call httpClient.post with a given list of ids', () => {
      spyOn(httpClient, 'get').and.returnValue(Observable.of('foobar'));
      let data = '';
      service.getFeedContent('foobar')
        .subscribe(
          (response) => data = response
        );

        expect(data).toEqual('foobar');
    });
  });
});
