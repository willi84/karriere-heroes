import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobLinkComponent } from './job-link.component';
import { FeedService } from '../services/feed/feed.service';

describe('JobLinkComponent', () => {
  let component: JobLinkComponent;
  let fixture: ComponentFixture<JobLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobLinkComponent);
     component = fixture.componentInstance;
     component.linkItem = {link: '/karriere/stellenangebote/STRATO-Experte-1st-Level.html', title: 'STRATO-Experte (m/w)'};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
  it(`should have an item with link and name`, async(() => {
    const linkItem = fixture.debugElement.componentInstance;
    expect(linkItem.linkItem).toBeTruthy();
    expect(linkItem.linkItem.link).toEqual('/karriere/stellenangebote/STRATO-Experte-1st-Level.html');
    expect(linkItem.linkItem.title).toEqual('STRATO-Experte (m/w)');
  }));

  it('should render the link of job description', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    const element = compiled.querySelector('li').children[0];
    expect(element.getAttribute('href')).toContain('/karriere/stellenangebote/STRATO-Experte-1st-Level.html');
    expect(element.getAttribute('target')).toContain('_blank');
    expect(element.getAttribute('rel')).toContain('noopener');
    expect(element.textContent).toContain('STRATO-Experte (m/w)');
  }));
});
