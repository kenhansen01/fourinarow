SystemJS.config({
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
});