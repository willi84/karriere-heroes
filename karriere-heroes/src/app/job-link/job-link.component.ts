import { Component, OnInit, Input } from '@angular/core';
import { JobLink } from '../model/job-link';

/**
 * Komponente zur Erzeugung eines Job-Links.
 */
@Component({
  selector: 'job-link',
  templateUrl: './job-link.component.html',
  styles: []
})
export class JobLinkComponent implements OnInit {

  /**
   * Datensatz des einzelnen JobLink-Item
   */
  @Input() public linkItem: JobLink;

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
