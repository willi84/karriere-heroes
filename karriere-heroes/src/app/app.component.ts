import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { SanitizeService } from './services/sanitize/sanitize.service';

/**
 * Die Root Komponente
 *
 * Stellt Wrapper für Karriere-Element dar.
 */
@Component({
  selector: 'job-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  /**
   * Name des RSS-Feeds
   */
  public corporate: string;

  /**
   * Konstruiert Root-Komponente und übergibt company Attribut
   * @param elementRef Referenz auf Root-DOM-Element
   * @param sanitize Instanz des Sanitize-Service
   */
  constructor(private elementRef: ElementRef, private sanitize: SanitizeService) {

    // sanitize to prevent XSS
    const myAttribute = this.elementRef.nativeElement.getAttribute('company');
    this.corporate =  sanitize.sanitize(myAttribute) ;
  }

}
