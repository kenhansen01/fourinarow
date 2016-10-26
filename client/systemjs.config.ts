﻿SystemJS.config({
  paths: {
    'npm': 'node_modules'
  },
  map: {
    // our app is within the app folder
    app: 'app',
    // angular bundles
    '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
    '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
    '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
    '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
    // other libraries
    'rxjs': 'node_modules/rxjs',
    'socket.io-client': 'node_modules/socket.io-client/socket.io.js',
    'angular-in-memory-web-api': 'node_modules/angular-in-memory-web-api',
  },
  packages: {
    app: {
      main: './main.js',
      defaultExtension: 'js'
    },
    rxjs: {
      defaultExtension: 'js'
    },
    'angular-in-memory-web-api': {
      main: './index.js',
      defaultExtension: 'js'
    }
  }
})
//const paths: {} = {
//  'npm': 'node_modules'
//};

//const map: {} = {
//  // our app is within the app folder
//  'app': 'app',
//  // angular bundles
//  '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
//  '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
//  '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
//  '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
//  '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
//  '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
//  '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
//  '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
//  // other libraries
//  'rxjs': 'npm:rxjs',
//  'socket.io-client': 'npm:socket.io-client/socket.io.js',
//  'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
//};
//const packages: {} = {
//  app: {
//    main: './main.js',
//    defaultExtension: 'js'
//  },
//  rxjs: {
//    defaultExtension: 'js'
//  },
//  'angular-in-memory-web-api': {
//    main: './index.js',
//    defaultExtension: 'js'
//  }
//};

//SystemJS.config({ paths, map, packages });

/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
//(function (global) {
//  System.config({
//    paths: {
//      // paths serve as alias
//      'npm:': '../../node_modules/'
//    },
//    // map tells the System loader where to look for things
//    map: {
//      // our app is within the app folder
//      app: 'app',
//      // angular bundles
//      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
//      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
//      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
//      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
//      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
//      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
//      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
//      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
//      // other libraries
//      'rxjs': 'npm:rxjs',
//      'socket.io-client': 'npm:socket.io-client/socket.io.js',
//      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
//    },
//    // packages tells the System loader how to load when no filename and/or no extension
//    packages: {
//      app: {
//        main: './main.js',
//        defaultExtension: 'js'
//      },
//      rxjs: {
//        defaultExtension: 'js'
//      },
//      'angular-in-memory-web-api': {
//        main: './index.js',
//        defaultExtension: 'js'
//      }
//    }
//  });
//})(this);