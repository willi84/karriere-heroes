
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

/**
 * Service zur Abfrage eines RSS-Feeds.
 */
@Injectable()
export class FeedService {

    /**
     * Konstruktur erzeugt neuen HttpClient
     * @param http Ein Http-client-objekt
     */

    constructor(private http: HttpClient) {
    }

    /**
     * Diese Funktion ruft den Feed ab und gibt einen Observable zurück.
     * @returns Ein Observable
     */
    getFeedContent(url: string): Observable<string> {
        return this.http.
            get(url, {
                headers: new HttpHeaders({ 'Accept': 'application/xml' }),
                responseType: 'text'
            });
    }
}
