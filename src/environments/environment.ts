// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/* export const environment = {
  production: false
};
 */

/* FIREBASE:
--------
firebase.google.com
neetaa.gudiemtla@gmail.com
Narresh12578 */

export const environment = {
  production: true,
  api: `https://master.tus.io/files/`,
  firebaseConfig: {
    apiKey: "AIzaSyCIpv6hmYDjBBw9fdmUHAHegg2mPEksHII",
    authDomain: "bbapp-a4a47.firebaseapp.com",
    databaseURL: "https://bbapp-a4a47.firebaseio.com",
    projectId: "bbapp-a4a47",
    storageBucket: "bbapp-a4a47.appspot.com",
    messagingSenderId: "915106264790",
    appId: "1:915106264790:web:dd4def8e157fc5af547b77",
    measurementId: "G-6J8P7CKLCF"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
