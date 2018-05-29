import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { JobGroupComponent } from './job-group.component';
import { JobLinkComponent } from '../job-link/job-link.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { JobGroup } from '../model/job-group';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('JobGroupComponent', () => {
  let component: JobGroupComponent;
  let fixture: ComponentFixture<JobGroupComponent>;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ JobGroupComponent],
        providers: [HttpClient, HttpHandler],
        schemas:      [ NO_ERRORS_SCHEMA ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      httpClient = TestBed.get(HttpClient);
      spyOn(httpClient, 'get').and.returnValue('Observable.of(null)');
      fixture = TestBed.createComponent(JobGroupComponent);
      component = fixture.componentInstance;
      component.feedData = {
        headline: 'Vertrieb',
        id: 'business',
        image: '/assets/test.jpg',
        items: [
          {
            link: 'http://job123.stage.heroes.eu/link1',
            title: 'Senior Account Manager (m/w) Business Solutions'
          },
          {
            link: 'http://job123.stage.heroes.eu/link2',
            title: 'Azubi (m/w) Business Solutions'
          }
        ]
      };
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it(`should get Data from Input`, async(() => {
    const categoryItem = fixture.debugElement.componentInstance;
    expect(categoryItem).toBeTruthy();
    expect(categoryItem.feedData.headline).toEqual('Vertrieb');
    expect(categoryItem.feedData.image).toEqual('/assets/test.jpg');
    expect(categoryItem.feedData.id).toEqual('business');
    expect(categoryItem.feedData.items.length).toEqual(2);
    expect(categoryItem.feedData.items[0].link).toEqual('http://job123.stage.heroes.eu/link1');
    expect(categoryItem.feedData.items[0].title).toEqual('Senior Account Manager (m/w) Business Solutions');
    expect(categoryItem.feedData.items[1].link).toEqual('http://job123.stage.heroes.eu/link2');
    expect(categoryItem.feedData.items[1].title).toEqual('Azubi (m/w) Business Solutions');
  }));

  it('should have some needed html elements', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    // check image
    expect(compiled.querySelector('img').getAttribute('src')).toContain('/assets/test.jpg');
    expect(compiled.querySelector('img').getAttribute('alt')).toContain('Vertrieb');

    // check headline
    expect(compiled.querySelector('h3').textContent).toContain('Vertrieb');
    expect(compiled.querySelector('job-link').textContent).toEqual('');


  }));
});
