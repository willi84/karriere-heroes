// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

/**
 * Environment Variable zu Development-Zwecken
 */

export const environment = {
  production: false,
  rss: {
    'company_a': 'assets/company_a.xml',
    'company_b': 'assets/company_b.xml',
    'invalid': 'assets/invalid.xml'
  },
  departments: {
    'Kundenservice'                       : 'Kundenservice',
    'Vertrieb'                            : 'Vertrieb',
    'Backend Development'                 : 'IT Entwicklung',
    'Sonstiger Aufgabenbereich'           : 'Sonstige',
    'Technik'                             : 'IT Administration',
    'Ausbildung'                          : 'Ausbildung',
  },
  images: {
    'Vertrieb'                    : './assets/vertrieb.jpg',
    'Kundenservice'               : './assets/kundenservice.jpg',
    'IT Entwicklung'              : './assets/entwicklung.jpg',
    'IT Administration'           : './assets/technik.jpg',
    'Ausbildung'                  : './assets/test.jpg',
    'Sonstige'                    : './assets/test.jpg',
    'blank'                       : './assets/test.jpg'
  }
};
