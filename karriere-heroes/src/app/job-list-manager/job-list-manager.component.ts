import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../services/feed/feed.service';
import { environment } from '../../environments/environment';
import { parseString } from 'xml2js';

/**
 * Komponente zur Verarbeitung der JobListe
 */
@Component({
  selector: 'job-list-manager',
  templateUrl: './job-list-manager.component.html',
  styles: []
})
export class JobListManagerComponent implements OnInit {

  /**
   * Daten der Job-Liste
   */
  public jobData: any[] = [];

  /**
   * ID des benötigten RSS-Feeds
   */
  @Input() public company: string;

  /**
   * Konstruktor
   *
   * @param feedService Feed-Service-Objekt
   */
  constructor(private feedService: FeedService) {
  }

  /**
   * Transformiert die Daten für die View.
   * @todo Auslagern in Service
   *
   * @param data JSON-Daten aus dem RSS-Feed
   * @return für die View aufbereitete Daten
   */
  public transformData(data): any {
    let newData: any[];
    const keys: any = [];

    newData = [];  // gleich initialisieren
    data.forEach(element => {
      let department: string    = '';
      let key: number           = 0;
      let dataTaskRange: string = '';

      dataTaskRange = (element['heroes:aufgabenbereich']) ?  element['heroes:aufgabenbereich'][0].trim() : '';
      department = (dataTaskRange !== '') ? (environment.departments[dataTaskRange]  || 'Sonstige') : 'Sonstige' ;

      if ( keys.indexOf(department) === -1) {
        keys.push(department);
        key = keys.indexOf(department);
        newData[key]   = {
          'headline': department,
          'id': department,

          // image Referenzen in env Variable
          'image': environment.images[department] || environment.images['blank'],
          'items': []
        };
      } else {
        key = keys.indexOf(department);
      }
      newData[key].items.push({
        'title': element['title'][0],
        'link': element['link'][0]
      });
    });

    return newData;
  }

  /**
   * Implementierung der OnOnit-Methode
   *
   * Verarbeitet den RSS-Feed und wandelt ihn in JSON um.
   */
  ngOnInit() {

    this.feedService.getFeedContent(environment.rss[this.company])
     .subscribe(

        // success
        xml => (parseString(xml.toString(),  (err, result: any) => {
          this.jobData = this.transformData(result.rss.channel[0].item);
        })),

        // error
        error => []
      );
  }
}
