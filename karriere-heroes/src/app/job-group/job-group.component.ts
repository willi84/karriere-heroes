import { Component, OnInit, Input } from '@angular/core';
import { JobGroup } from '../model/job-group';

/**
 * Wrapper für den Geschäftsbereich
 */
@Component({
  selector: 'job-group',
  templateUrl: './job-group.component.html',
  styles: []
})
export class JobGroupComponent implements OnInit {

  /**
   * Daten aus dem Feed vom JobList-Manager
   */
  @Input() feedData: JobGroup;

  /**
   * Konstruktor
   */
  constructor() {
  }

  /**
   * Implementierung der OnOnit-Methode
   */
  ngOnInit() {
  }

}
