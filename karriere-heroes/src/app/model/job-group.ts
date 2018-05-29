/**
 * Ein Interface für einen Typ JobGroup.
 */
export interface JobGroup {
  /**
   * Überschrift der Gruppe.
   */
  headline: string,

  /**
   * interne ID der Gruppe.
   */
  id: string,

  /**
   * Pfad zum Aufmacher-Bild der Gruppe.
   */
  image: string,

  /**
   * Elemente der Gruppe.
   */
  items: Array<any>
}