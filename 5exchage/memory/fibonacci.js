// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'fibonacci.data';
      var REMOTE_PACKAGE_BASE = 'fibonacci.data';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus'](`Downloading data... (${loaded}/${total})`);
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "test", true, true);
Module['FS_createPath']("/test", "assets", true, true);
Module['FS_createPath']("/test/assets", "internal", true, true);
Module['FS_createPath']("/test/assets/internal", "import", true, true);
Module['FS_createPath']("/test/assets/internal/import", "02", true, true);
Module['FS_createPath']("/test/assets", "main", true, true);
Module['FS_createPath']("/test/assets/main", "import", true, true);
Module['FS_createPath']("/test/assets/main/import", "03", true, true);
Module['FS_createPath']("/test/assets/main/import", "0e", true, true);
Module['FS_createPath']("/test/assets/main/import", "46", true, true);
Module['FS_createPath']("/test/assets/main/import", "55", true, true);
Module['FS_createPath']("/test/assets/main", "native", true, true);
Module['FS_createPath']("/test/assets/main/native", "07", true, true);
Module['FS_createPath']("/test/assets/main/native", "0e", true, true);
Module['FS_createPath']("/test/assets/main/native", "20", true, true);
Module['FS_createPath']("/test/assets/main/native", "47", true, true);
Module['FS_createPath']("/test/assets/main/native", "5a", true, true);
Module['FS_createPath']("/test/assets/main/native", "65", true, true);
Module['FS_createPath']("/test/assets/main/native", "6f", true, true);
Module['FS_createPath']("/test/assets/main/native", "92", true, true);
Module['FS_createPath']("/test/assets/main/native", "9c", true, true);
Module['FS_createPath']("/test/assets/main/native", "b4", true, true);
Module['FS_createPath']("/test/assets/main/native", "fc", true, true);
Module['FS_createPath']("/test/assets", "resources", true, true);
Module['FS_createPath']("/test/assets/resources", "import", true, true);
Module['FS_createPath']("/test/assets/resources/import", "00", true, true);
Module['FS_createPath']("/test/assets/resources/import", "01", true, true);
Module['FS_createPath']("/test/assets/resources/import", "02", true, true);
Module['FS_createPath']("/test/assets/resources/import", "03", true, true);
Module['FS_createPath']("/test/assets/resources/import", "04", true, true);
Module['FS_createPath']("/test/assets/resources/import", "05", true, true);
Module['FS_createPath']("/test/assets/resources/import", "06", true, true);
Module['FS_createPath']("/test/assets/resources/import", "07", true, true);
Module['FS_createPath']("/test/assets/resources/import", "08", true, true);
Module['FS_createPath']("/test/assets/resources/import", "09", true, true);
Module['FS_createPath']("/test/assets/resources/import", "0a", true, true);
Module['FS_createPath']("/test/assets/resources/import", "0b", true, true);
Module['FS_createPath']("/test/assets/resources/import", "0c", true, true);
Module['FS_createPath']("/test/assets/resources/import", "0d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "0e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "0f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "10", true, true);
Module['FS_createPath']("/test/assets/resources/import", "11", true, true);
Module['FS_createPath']("/test/assets/resources/import", "12", true, true);
Module['FS_createPath']("/test/assets/resources/import", "13", true, true);
Module['FS_createPath']("/test/assets/resources/import", "14", true, true);
Module['FS_createPath']("/test/assets/resources/import", "15", true, true);
Module['FS_createPath']("/test/assets/resources/import", "17", true, true);
Module['FS_createPath']("/test/assets/resources/import", "19", true, true);
Module['FS_createPath']("/test/assets/resources/import", "1c", true, true);
Module['FS_createPath']("/test/assets/resources/import", "1d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "1e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "1f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "20", true, true);
Module['FS_createPath']("/test/assets/resources/import", "21", true, true);
Module['FS_createPath']("/test/assets/resources/import", "23", true, true);
Module['FS_createPath']("/test/assets/resources/import", "25", true, true);
Module['FS_createPath']("/test/assets/resources/import", "26", true, true);
Module['FS_createPath']("/test/assets/resources/import", "28", true, true);
Module['FS_createPath']("/test/assets/resources/import", "29", true, true);
Module['FS_createPath']("/test/assets/resources/import", "2a", true, true);
Module['FS_createPath']("/test/assets/resources/import", "2c", true, true);
Module['FS_createPath']("/test/assets/resources/import", "2d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "2e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "2f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "30", true, true);
Module['FS_createPath']("/test/assets/resources/import", "31", true, true);
Module['FS_createPath']("/test/assets/resources/import", "32", true, true);
Module['FS_createPath']("/test/assets/resources/import", "33", true, true);
Module['FS_createPath']("/test/assets/resources/import", "35", true, true);
Module['FS_createPath']("/test/assets/resources/import", "37", true, true);
Module['FS_createPath']("/test/assets/resources/import", "39", true, true);
Module['FS_createPath']("/test/assets/resources/import", "3a", true, true);
Module['FS_createPath']("/test/assets/resources/import", "3d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "3e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "41", true, true);
Module['FS_createPath']("/test/assets/resources/import", "42", true, true);
Module['FS_createPath']("/test/assets/resources/import", "44", true, true);
Module['FS_createPath']("/test/assets/resources/import", "46", true, true);
Module['FS_createPath']("/test/assets/resources/import", "48", true, true);
Module['FS_createPath']("/test/assets/resources/import", "49", true, true);
Module['FS_createPath']("/test/assets/resources/import", "4c", true, true);
Module['FS_createPath']("/test/assets/resources/import", "4d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "4e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "4f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "50", true, true);
Module['FS_createPath']("/test/assets/resources/import", "51", true, true);
Module['FS_createPath']("/test/assets/resources/import", "56", true, true);
Module['FS_createPath']("/test/assets/resources/import", "58", true, true);
Module['FS_createPath']("/test/assets/resources/import", "59", true, true);
Module['FS_createPath']("/test/assets/resources/import", "5a", true, true);
Module['FS_createPath']("/test/assets/resources/import", "5c", true, true);
Module['FS_createPath']("/test/assets/resources/import", "5d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "61", true, true);
Module['FS_createPath']("/test/assets/resources/import", "65", true, true);
Module['FS_createPath']("/test/assets/resources/import", "66", true, true);
Module['FS_createPath']("/test/assets/resources/import", "68", true, true);
Module['FS_createPath']("/test/assets/resources/import", "69", true, true);
Module['FS_createPath']("/test/assets/resources/import", "6b", true, true);
Module['FS_createPath']("/test/assets/resources/import", "6d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "6e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "6f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "71", true, true);
Module['FS_createPath']("/test/assets/resources/import", "72", true, true);
Module['FS_createPath']("/test/assets/resources/import", "73", true, true);
Module['FS_createPath']("/test/assets/resources/import", "74", true, true);
Module['FS_createPath']("/test/assets/resources/import", "75", true, true);
Module['FS_createPath']("/test/assets/resources/import", "76", true, true);
Module['FS_createPath']("/test/assets/resources/import", "77", true, true);
Module['FS_createPath']("/test/assets/resources/import", "78", true, true);
Module['FS_createPath']("/test/assets/resources/import", "79", true, true);
Module['FS_createPath']("/test/assets/resources/import", "7b", true, true);
Module['FS_createPath']("/test/assets/resources/import", "7d", true, true);
Module['FS_createPath']("/test/assets/resources/import", "83", true, true);
Module['FS_createPath']("/test/assets/resources/import", "84", true, true);
Module['FS_createPath']("/test/assets/resources/import", "86", true, true);
Module['FS_createPath']("/test/assets/resources/import", "87", true, true);
Module['FS_createPath']("/test/assets/resources/import", "88", true, true);
Module['FS_createPath']("/test/assets/resources/import", "89", true, true);
Module['FS_createPath']("/test/assets/resources/import", "8b", true, true);
Module['FS_createPath']("/test/assets/resources/import", "8c", true, true);
Module['FS_createPath']("/test/assets/resources/import", "8e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "8f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "90", true, true);
Module['FS_createPath']("/test/assets/resources/import", "92", true, true);
Module['FS_createPath']("/test/assets/resources/import", "95", true, true);
Module['FS_createPath']("/test/assets/resources/import", "98", true, true);
Module['FS_createPath']("/test/assets/resources/import", "9a", true, true);
Module['FS_createPath']("/test/assets/resources/import", "9b", true, true);
Module['FS_createPath']("/test/assets/resources/import", "9e", true, true);
Module['FS_createPath']("/test/assets/resources/import", "9f", true, true);
Module['FS_createPath']("/test/assets/resources/import", "a2", true, true);
Module['FS_createPath']("/test/assets/resources/import", "a4", true, true);
Module['FS_createPath']("/test/assets/resources/import", "a6", true, true);
Module['FS_createPath']("/test/assets/resources/import", "aa", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ab", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ac", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ad", true, true);
Module['FS_createPath']("/test/assets/resources/import", "b2", true, true);
Module['FS_createPath']("/test/assets/resources/import", "b5", true, true);
Module['FS_createPath']("/test/assets/resources/import", "b7", true, true);
Module['FS_createPath']("/test/assets/resources/import", "b8", true, true);
Module['FS_createPath']("/test/assets/resources/import", "bb", true, true);
Module['FS_createPath']("/test/assets/resources/import", "bd", true, true);
Module['FS_createPath']("/test/assets/resources/import", "c2", true, true);
Module['FS_createPath']("/test/assets/resources/import", "c4", true, true);
Module['FS_createPath']("/test/assets/resources/import", "c6", true, true);
Module['FS_createPath']("/test/assets/resources/import", "c8", true, true);
Module['FS_createPath']("/test/assets/resources/import", "c9", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ca", true, true);
Module['FS_createPath']("/test/assets/resources/import", "cb", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ce", true, true);
Module['FS_createPath']("/test/assets/resources/import", "cf", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d0", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d3", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d4", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d5", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d7", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d8", true, true);
Module['FS_createPath']("/test/assets/resources/import", "d9", true, true);
Module['FS_createPath']("/test/assets/resources/import", "da", true, true);
Module['FS_createPath']("/test/assets/resources/import", "db", true, true);
Module['FS_createPath']("/test/assets/resources/import", "e0", true, true);
Module['FS_createPath']("/test/assets/resources/import", "e2", true, true);
Module['FS_createPath']("/test/assets/resources/import", "e8", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ea", true, true);
Module['FS_createPath']("/test/assets/resources/import", "eb", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ec", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ef", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f0", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f1", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f2", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f3", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f4", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f5", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f7", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f8", true, true);
Module['FS_createPath']("/test/assets/resources/import", "f9", true, true);
Module['FS_createPath']("/test/assets/resources/import", "fa", true, true);
Module['FS_createPath']("/test/assets/resources/import", "fb", true, true);
Module['FS_createPath']("/test/assets/resources/import", "ff", true, true);
Module['FS_createPath']("/test/assets/resources", "native", true, true);
Module['FS_createPath']("/test/assets/resources/native", "00", true, true);
Module['FS_createPath']("/test/assets/resources/native", "01", true, true);
Module['FS_createPath']("/test/assets/resources/native", "02", true, true);
Module['FS_createPath']("/test/assets/resources/native", "03", true, true);
Module['FS_createPath']("/test/assets/resources/native", "04", true, true);
Module['FS_createPath']("/test/assets/resources/native", "05", true, true);
Module['FS_createPath']("/test/assets/resources/native", "06", true, true);
Module['FS_createPath']("/test/assets/resources/native", "07", true, true);
Module['FS_createPath']("/test/assets/resources/native", "08", true, true);
Module['FS_createPath']("/test/assets/resources/native", "09", true, true);
Module['FS_createPath']("/test/assets/resources/native", "0b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "0c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "0d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "0e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "0f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "10", true, true);
Module['FS_createPath']("/test/assets/resources/native", "11", true, true);
Module['FS_createPath']("/test/assets/resources/native", "12", true, true);
Module['FS_createPath']("/test/assets/resources/native", "13", true, true);
Module['FS_createPath']("/test/assets/resources/native", "15", true, true);
Module['FS_createPath']("/test/assets/resources/native", "16", true, true);
Module['FS_createPath']("/test/assets/resources/native", "17", true, true);
Module['FS_createPath']("/test/assets/resources/native", "18", true, true);
Module['FS_createPath']("/test/assets/resources/native", "19", true, true);
Module['FS_createPath']("/test/assets/resources/native", "1a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "1b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "1c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "1d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "1e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "1f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "20", true, true);
Module['FS_createPath']("/test/assets/resources/native", "21", true, true);
Module['FS_createPath']("/test/assets/resources/native", "22", true, true);
Module['FS_createPath']("/test/assets/resources/native", "23", true, true);
Module['FS_createPath']("/test/assets/resources/native", "24", true, true);
Module['FS_createPath']("/test/assets/resources/native", "25", true, true);
Module['FS_createPath']("/test/assets/resources/native", "26", true, true);
Module['FS_createPath']("/test/assets/resources/native", "27", true, true);
Module['FS_createPath']("/test/assets/resources/native", "28", true, true);
Module['FS_createPath']("/test/assets/resources/native", "29", true, true);
Module['FS_createPath']("/test/assets/resources/native", "2a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "2b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "2c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "2d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "2e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "2f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "30", true, true);
Module['FS_createPath']("/test/assets/resources/native", "31", true, true);
Module['FS_createPath']("/test/assets/resources/native", "32", true, true);
Module['FS_createPath']("/test/assets/resources/native", "33", true, true);
Module['FS_createPath']("/test/assets/resources/native", "34", true, true);
Module['FS_createPath']("/test/assets/resources/native", "35", true, true);
Module['FS_createPath']("/test/assets/resources/native", "36", true, true);
Module['FS_createPath']("/test/assets/resources/native", "37", true, true);
Module['FS_createPath']("/test/assets/resources/native", "38", true, true);
Module['FS_createPath']("/test/assets/resources/native", "39", true, true);
Module['FS_createPath']("/test/assets/resources/native", "3a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "3b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "3c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "3d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "3e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "3f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "40", true, true);
Module['FS_createPath']("/test/assets/resources/native", "41", true, true);
Module['FS_createPath']("/test/assets/resources/native", "42", true, true);
Module['FS_createPath']("/test/assets/resources/native", "43", true, true);
Module['FS_createPath']("/test/assets/resources/native", "44", true, true);
Module['FS_createPath']("/test/assets/resources/native", "45", true, true);
Module['FS_createPath']("/test/assets/resources/native", "46", true, true);
Module['FS_createPath']("/test/assets/resources/native", "47", true, true);
Module['FS_createPath']("/test/assets/resources/native", "48", true, true);
Module['FS_createPath']("/test/assets/resources/native", "49", true, true);
Module['FS_createPath']("/test/assets/resources/native", "4a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "4b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "4c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "4e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "4f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "50", true, true);
Module['FS_createPath']("/test/assets/resources/native", "51", true, true);
Module['FS_createPath']("/test/assets/resources/native", "52", true, true);
Module['FS_createPath']("/test/assets/resources/native", "53", true, true);
Module['FS_createPath']("/test/assets/resources/native", "54", true, true);
Module['FS_createPath']("/test/assets/resources/native", "55", true, true);
Module['FS_createPath']("/test/assets/resources/native", "56", true, true);
Module['FS_createPath']("/test/assets/resources/native", "57", true, true);
Module['FS_createPath']("/test/assets/resources/native", "58", true, true);
Module['FS_createPath']("/test/assets/resources/native", "59", true, true);
Module['FS_createPath']("/test/assets/resources/native", "5a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "5b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "5c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "5d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "5e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "5f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "60", true, true);
Module['FS_createPath']("/test/assets/resources/native", "61", true, true);
Module['FS_createPath']("/test/assets/resources/native", "62", true, true);
Module['FS_createPath']("/test/assets/resources/native", "63", true, true);
Module['FS_createPath']("/test/assets/resources/native", "64", true, true);
Module['FS_createPath']("/test/assets/resources/native", "65", true, true);
Module['FS_createPath']("/test/assets/resources/native", "66", true, true);
Module['FS_createPath']("/test/assets/resources/native", "67", true, true);
Module['FS_createPath']("/test/assets/resources/native", "68", true, true);
Module['FS_createPath']("/test/assets/resources/native", "69", true, true);
Module['FS_createPath']("/test/assets/resources/native", "6a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "6b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "6c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "6d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "6e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "6f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "70", true, true);
Module['FS_createPath']("/test/assets/resources/native", "71", true, true);
Module['FS_createPath']("/test/assets/resources/native", "72", true, true);
Module['FS_createPath']("/test/assets/resources/native", "73", true, true);
Module['FS_createPath']("/test/assets/resources/native", "74", true, true);
Module['FS_createPath']("/test/assets/resources/native", "75", true, true);
Module['FS_createPath']("/test/assets/resources/native", "76", true, true);
Module['FS_createPath']("/test/assets/resources/native", "77", true, true);
Module['FS_createPath']("/test/assets/resources/native", "78", true, true);
Module['FS_createPath']("/test/assets/resources/native", "79", true, true);
Module['FS_createPath']("/test/assets/resources/native", "7a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "7b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "7c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "7d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "7e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "7f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "80", true, true);
Module['FS_createPath']("/test/assets/resources/native", "81", true, true);
Module['FS_createPath']("/test/assets/resources/native", "82", true, true);
Module['FS_createPath']("/test/assets/resources/native", "83", true, true);
Module['FS_createPath']("/test/assets/resources/native", "84", true, true);
Module['FS_createPath']("/test/assets/resources/native", "85", true, true);
Module['FS_createPath']("/test/assets/resources/native", "86", true, true);
Module['FS_createPath']("/test/assets/resources/native", "87", true, true);
Module['FS_createPath']("/test/assets/resources/native", "88", true, true);
Module['FS_createPath']("/test/assets/resources/native", "89", true, true);
Module['FS_createPath']("/test/assets/resources/native", "8a", true, true);
Module['FS_createPath']("/test/assets/resources/native", "8b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "8c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "8d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "8e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "8f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "90", true, true);
Module['FS_createPath']("/test/assets/resources/native", "91", true, true);
Module['FS_createPath']("/test/assets/resources/native", "92", true, true);
Module['FS_createPath']("/test/assets/resources/native", "93", true, true);
Module['FS_createPath']("/test/assets/resources/native", "94", true, true);
Module['FS_createPath']("/test/assets/resources/native", "95", true, true);
Module['FS_createPath']("/test/assets/resources/native", "96", true, true);
Module['FS_createPath']("/test/assets/resources/native", "97", true, true);
Module['FS_createPath']("/test/assets/resources/native", "98", true, true);
Module['FS_createPath']("/test/assets/resources/native", "99", true, true);
Module['FS_createPath']("/test/assets/resources/native", "9b", true, true);
Module['FS_createPath']("/test/assets/resources/native", "9c", true, true);
Module['FS_createPath']("/test/assets/resources/native", "9d", true, true);
Module['FS_createPath']("/test/assets/resources/native", "9e", true, true);
Module['FS_createPath']("/test/assets/resources/native", "9f", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a0", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a1", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a2", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a3", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a4", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a5", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a6", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a7", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a8", true, true);
Module['FS_createPath']("/test/assets/resources/native", "a9", true, true);
Module['FS_createPath']("/test/assets/resources/native", "aa", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ab", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ac", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ad", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ae", true, true);
Module['FS_createPath']("/test/assets/resources/native", "af", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b0", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b1", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b2", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b3", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b4", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b5", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b6", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b7", true, true);
Module['FS_createPath']("/test/assets/resources/native", "b9", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ba", true, true);
Module['FS_createPath']("/test/assets/resources/native", "bb", true, true);
Module['FS_createPath']("/test/assets/resources/native", "bc", true, true);
Module['FS_createPath']("/test/assets/resources/native", "bd", true, true);
Module['FS_createPath']("/test/assets/resources/native", "be", true, true);
Module['FS_createPath']("/test/assets/resources/native", "bf", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c0", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c1", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c3", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c4", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c5", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c6", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c7", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c8", true, true);
Module['FS_createPath']("/test/assets/resources/native", "c9", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ca", true, true);
Module['FS_createPath']("/test/assets/resources/native", "cb", true, true);
Module['FS_createPath']("/test/assets/resources/native", "cc", true, true);
Module['FS_createPath']("/test/assets/resources/native", "cd", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ce", true, true);
Module['FS_createPath']("/test/assets/resources/native", "cf", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d0", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d1", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d2", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d3", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d4", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d5", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d6", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d7", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d8", true, true);
Module['FS_createPath']("/test/assets/resources/native", "d9", true, true);
Module['FS_createPath']("/test/assets/resources/native", "da", true, true);
Module['FS_createPath']("/test/assets/resources/native", "db", true, true);
Module['FS_createPath']("/test/assets/resources/native", "dc", true, true);
Module['FS_createPath']("/test/assets/resources/native", "dd", true, true);
Module['FS_createPath']("/test/assets/resources/native", "de", true, true);
Module['FS_createPath']("/test/assets/resources/native", "df", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e0", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e1", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e2", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e3", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e4", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e5", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e6", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e7", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e8", true, true);
Module['FS_createPath']("/test/assets/resources/native", "e9", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ea", true, true);
Module['FS_createPath']("/test/assets/resources/native", "eb", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ec", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ed", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ee", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ef", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f0", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f1", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f2", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f3", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f4", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f5", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f6", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f7", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f8", true, true);
Module['FS_createPath']("/test/assets/resources/native", "f9", true, true);
Module['FS_createPath']("/test/assets/resources/native", "fa", true, true);
Module['FS_createPath']("/test/assets/resources/native", "fb", true, true);
Module['FS_createPath']("/test/assets/resources/native", "fc", true, true);
Module['FS_createPath']("/test/assets/resources/native", "fd", true, true);
Module['FS_createPath']("/test/assets/resources/native", "fe", true, true);
Module['FS_createPath']("/test/assets/resources/native", "ff", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_fibonacci.data');

      };
      Module['addRunDependency']('datafile_fibonacci.data');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/test/11.ts", "start": 0, "end": 67}, {"filename": "/test/assets/internal/config.c8377.json", "start": 67, "end": 9962}, {"filename": "/test/assets/internal/import/02/023a831a3.ce309.json", "start": 9962, "end": 2524580}, {"filename": "/test/assets/internal/index.c8377.js", "start": 2524580, "end": 2525218}, {"filename": "/test/assets/main/config.86ce3.json", "start": 2525218, "end": 2551472}, {"filename": "/test/assets/main/import/03/03e0a233-466a-43ca-bd79-b78493c43b7e.f9ad9.cconb", "start": 2551472, "end": 2556532}, {"filename": "/test/assets/main/import/0e/0e3df6d00.23191.json", "start": 2556532, "end": 16468750}, {"filename": "/test/assets/main/import/46/4606fea9-9612-48f9-afe5-fe44c2324bfb.6316a.cconb", "start": 16468750, "end": 16479398}, {"filename": "/test/assets/main/import/55/55fcfb0d-ff1b-4d2c-ae3c-a37e3380a4fe.4500b.cconb", "start": 16479398, "end": 16481082}, {"filename": "/test/assets/main/index.86ce3.js", "start": 16481082, "end": 18163995}, {"filename": "/test/assets/main/native/07/0770ff23-8aa1-4f55-aab1-542479a9308a.9901e.png", "start": 18163995, "end": 18164511}, {"filename": "/test/assets/main/native/0e/0ecbb076-075f-4a9c-9cbb-4d3ea0ffad38@528cc.ef7c0.bin", "start": 18164511, "end": 18311967}, {"filename": "/test/assets/main/native/20/2009bd9c-9d28-4c7b-9fc5-fb322e240b73.d1263.png", "start": 18311967, "end": 18430797}, {"filename": "/test/assets/main/native/47/4783f51a-7820-456e-8c69-d32c391e5560.feb88.png", "start": 18430797, "end": 18433861}, {"filename": "/test/assets/main/native/5a/5a8881e6-d299-4e31-9c94-8406d46d3309@b47c0@40c10.24722.png", "start": 18433861, "end": 18437074}, {"filename": "/test/assets/main/native/5a/5a8881e6-d299-4e31-9c94-8406d46d3309@b47c0@74afd.7f836.png", "start": 18437074, "end": 18439652}, {"filename": "/test/assets/main/native/5a/5a8881e6-d299-4e31-9c94-8406d46d3309@b47c0@7d38f.d475e.png", "start": 18439652, "end": 18443226}, {"filename": "/test/assets/main/native/5a/5a8881e6-d299-4e31-9c94-8406d46d3309@b47c0@8fd34.9d8ae.png", "start": 18443226, "end": 18446180}, {"filename": "/test/assets/main/native/5a/5a8881e6-d299-4e31-9c94-8406d46d3309@b47c0@bb97f.6780f.png", "start": 18446180, "end": 18448587}, {"filename": "/test/assets/main/native/5a/5a8881e6-d299-4e31-9c94-8406d46d3309@b47c0@e9a6d.878c0.png", "start": 18448587, "end": 18452072}, {"filename": "/test/assets/main/native/5a/5a933992-a501-4d78-80a8-64351c7dd14c.74f0f.png", "start": 18452072, "end": 18459175}, {"filename": "/test/assets/main/native/65/65ea279b-229f-465d-909f-afb49c5a9aa7.4591d.png", "start": 18459175, "end": 18459691}, {"filename": "/test/assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@40c10.6f2af.png", "start": 18459691, "end": 18513904}, {"filename": "/test/assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@74afd.459f6.png", "start": 18513904, "end": 18568284}, {"filename": "/test/assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@7d38f.6a9df.png", "start": 18568284, "end": 18574386}, {"filename": "/test/assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@8fd34.dabf1.png", "start": 18574386, "end": 18631978}, {"filename": "/test/assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@bb97f.e76a4.png", "start": 18631978, "end": 18692674}, {"filename": "/test/assets/main/native/6f/6f01cf7f-81bf-4a7e-bd5d-0afc19696480@b47c0@e9a6d.9e658.png", "start": 18692674, "end": 18740775}, {"filename": "/test/assets/main/native/92/92d36f7a-978f-4914-b6a8-f3c5b0d21079@f70bc.6dc14.bin", "start": 18740775, "end": 18741591}, {"filename": "/test/assets/main/native/92/92d36f7a-978f-4914-b6a8-f3c5b0d21079@fc2ce.77530.bin", "start": 18741591, "end": 18743055}, {"filename": "/test/assets/main/native/9c/9cf6f77b-d061-41b5-9a8b-263d371c5b65.0cec6.png", "start": 18743055, "end": 18845926}, {"filename": "/test/assets/main/native/b4/b43bd6f2-fb13-44ee-bf0a-f0b9eb9f491b@b47c0@40c10.bbfc8.png", "start": 18845926, "end": 18912466}, {"filename": "/test/assets/main/native/b4/b43bd6f2-fb13-44ee-bf0a-f0b9eb9f491b@b47c0@74afd.871e4.png", "start": 18912466, "end": 18988644}, {"filename": "/test/assets/main/native/b4/b43bd6f2-fb13-44ee-bf0a-f0b9eb9f491b@b47c0@7d38f.90e5d.png", "start": 18988644, "end": 18988999}, {"filename": "/test/assets/main/native/b4/b43bd6f2-fb13-44ee-bf0a-f0b9eb9f491b@b47c0@8fd34.ca365.png", "start": 18988999, "end": 19052080}, {"filename": "/test/assets/main/native/b4/b43bd6f2-fb13-44ee-bf0a-f0b9eb9f491b@b47c0@bb97f.c5fe0.png", "start": 19052080, "end": 19110689}, {"filename": "/test/assets/main/native/b4/b43bd6f2-fb13-44ee-bf0a-f0b9eb9f491b@b47c0@e9a6d.5db36.png", "start": 19110689, "end": 19175864}, {"filename": "/test/assets/main/native/fc/fc44ed2e-5ba5-47dc-8cbb-b8abac9d65cf@b47c0@40c10.28a54.png", "start": 19175864, "end": 19254238}, {"filename": "/test/assets/main/native/fc/fc44ed2e-5ba5-47dc-8cbb-b8abac9d65cf@b47c0@74afd.c9cba.png", "start": 19254238, "end": 19329827}, {"filename": "/test/assets/main/native/fc/fc44ed2e-5ba5-47dc-8cbb-b8abac9d65cf@b47c0@7d38f.ac458.png", "start": 19329827, "end": 19333009}, {"filename": "/test/assets/main/native/fc/fc44ed2e-5ba5-47dc-8cbb-b8abac9d65cf@b47c0@8fd34.e4ab9.png", "start": 19333009, "end": 19411613}, {"filename": "/test/assets/main/native/fc/fc44ed2e-5ba5-47dc-8cbb-b8abac9d65cf@b47c0@bb97f.ce0e8.png", "start": 19411613, "end": 19479698}, {"filename": "/test/assets/main/native/fc/fc44ed2e-5ba5-47dc-8cbb-b8abac9d65cf@b47c0@e9a6d.135b1.png", "start": 19479698, "end": 19560969}, {"filename": "/test/assets/resources/config.70ea8.json", "start": 19560969, "end": 20043617}, {"filename": "/test/assets/resources/import/00/00eed6ed-4468-4bd2-ba17-89bf880634a0@3a858.d682e.cconb", "start": 20043617, "end": 20257993}, {"filename": "/test/assets/resources/import/01/0112226d-8f82-4465-855a-75870985c875.46d48.json", "start": 20257993, "end": 20260373}, {"filename": "/test/assets/resources/import/01/01824629-4827-405c-9161-744f3d9cc4f9.8b72f.json", "start": 20260373, "end": 20262399}, {"filename": "/test/assets/resources/import/02/023532bb9.9d85e.json", "start": 20262399, "end": 20273835}, {"filename": "/test/assets/resources/import/03/0331db3a4.e5422.json", "start": 20273835, "end": 20280496}, {"filename": "/test/assets/resources/import/03/035954710.a7f5d.json", "start": 20280496, "end": 20287475}, {"filename": "/test/assets/resources/import/03/035b95c5-bafd-42a9-a0be-72b9957aec79@3fef2.447ab.cconb", "start": 20287475, "end": 20501627}, {"filename": "/test/assets/resources/import/03/03612957-b25d-473e-8db4-b468626d235d.48999.json", "start": 20501627, "end": 20502561}, {"filename": "/test/assets/resources/import/03/03a557505.0556f.json", "start": 20502561, "end": 20739924}, {"filename": "/test/assets/resources/import/03/03aa0e192.4e7d0.json", "start": 20739924, "end": 20771964}, {"filename": "/test/assets/resources/import/03/03b07ee0-fad8-4077-9ec8-b25d3a2f32c2.06109.json", "start": 20771964, "end": 20777458}, {"filename": "/test/assets/resources/import/03/03e8841e-13ed-4a73-80fd-c21671deb6dd.aa628.json", "start": 20777458, "end": 20784426}, {"filename": "/test/assets/resources/import/04/044cc458e.53fa5.json", "start": 20784426, "end": 20822713}, {"filename": "/test/assets/resources/import/04/047f9b787.23ebf.json", "start": 20822713, "end": 20887192}, {"filename": "/test/assets/resources/import/04/04b248fb6.c2771.json", "start": 20887192, "end": 20896047}, {"filename": "/test/assets/resources/import/04/04c8a6631.53817.json", "start": 20896047, "end": 20910124}, {"filename": "/test/assets/resources/import/05/0558275d7.6476c.json", "start": 20910124, "end": 20911852}, {"filename": "/test/assets/resources/import/05/05995016c.8efee.json", "start": 20911852, "end": 20961652}, {"filename": "/test/assets/resources/import/05/05f1ee0ea.83b1c.json", "start": 20961652, "end": 20967064}, {"filename": "/test/assets/resources/import/06/067b5a8ac.f6bc8.json", "start": 20967064, "end": 20972053}, {"filename": "/test/assets/resources/import/06/0690786e-c064-4cef-b157-c3ec60e764ac.20336.json", "start": 20972053, "end": 20972197}, {"filename": "/test/assets/resources/import/06/0693c95c0.aa03b.json", "start": 20972197, "end": 20977780}, {"filename": "/test/assets/resources/import/06/06a1135d3.3415e.json", "start": 20977780, "end": 20990450}, {"filename": "/test/assets/resources/import/06/06c2fcb54.ca395.json", "start": 20990450, "end": 20999404}, {"filename": "/test/assets/resources/import/06/06cf04bf0.4d518.json", "start": 20999404, "end": 21041511}, {"filename": "/test/assets/resources/import/07/0705a4e8-cf42-4ff3-9345-74be6cfc4124@f9941.47068.json", "start": 21041511, "end": 21042099}, {"filename": "/test/assets/resources/import/07/072ab2e17.c3bcd.json", "start": 21042099, "end": 21043234}, {"filename": "/test/assets/resources/import/07/074f436b-3fe7-45a0-b07c-295d7205115b.29665.json", "start": 21043234, "end": 21043618}, {"filename": "/test/assets/resources/import/07/07aac55e1.d2e85.json", "start": 21043618, "end": 21055306}, {"filename": "/test/assets/resources/import/07/07ade5589.d91e8.json", "start": 21055306, "end": 21058848}, {"filename": "/test/assets/resources/import/07/07b82f02-1df1-49d2-88df-20d019fd5d1f.22970.json", "start": 21058848, "end": 21058980}, {"filename": "/test/assets/resources/import/08/0846e6239.9cc39.json", "start": 21058980, "end": 21086152}, {"filename": "/test/assets/resources/import/08/0861b270c.38147.json", "start": 21086152, "end": 21092596}, {"filename": "/test/assets/resources/import/08/0869ff45c.2dfb3.json", "start": 21092596, "end": 21100539}, {"filename": "/test/assets/resources/import/08/08a61f6aa.79c99.json", "start": 21100539, "end": 21143947}, {"filename": "/test/assets/resources/import/08/08fc5bf8-12fe-4b23-873a-5e7e1c19f923.b31e8.json", "start": 21143947, "end": 21144081}, {"filename": "/test/assets/resources/import/09/09697f17d.faaea.json", "start": 21144081, "end": 21152223}, {"filename": "/test/assets/resources/import/0a/0a475ee03.45a15.json", "start": 21152223, "end": 21160343}, {"filename": "/test/assets/resources/import/0a/0a7030045.8298c.json", "start": 21160343, "end": 21175995}, {"filename": "/test/assets/resources/import/0a/0abba5534.8d12b.json", "start": 21175995, "end": 21205474}, {"filename": "/test/assets/resources/import/0a/0acfb064a.8eadc.json", "start": 21205474, "end": 22731982}, {"filename": "/test/assets/resources/import/0a/0ae21a5f2.49619.json", "start": 22731982, "end": 22747274}, {"filename": "/test/assets/resources/import/0b/0b5cc5c9e.f213d.json", "start": 22747274, "end": 22750493}, {"filename": "/test/assets/resources/import/0b/0bdb7fd99.916f2.json", "start": 22750493, "end": 22752800}, {"filename": "/test/assets/resources/import/0c/0c9a23c48.6ae61.json", "start": 22752800, "end": 22759058}, {"filename": "/test/assets/resources/import/0c/0c9b974ee.6c5f6.json", "start": 22759058, "end": 22772156}, {"filename": "/test/assets/resources/import/0c/0cd1571ba.fe553.json", "start": 22772156, "end": 22780591}, {"filename": "/test/assets/resources/import/0c/0cd3cdfb5.3f675.json", "start": 22780591, "end": 22783373}, {"filename": "/test/assets/resources/import/0c/0cf21d220.87fa8.json", "start": 22783373, "end": 22789752}, {"filename": "/test/assets/resources/import/0d/0d0bdc92d.c0e10.json", "start": 22789752, "end": 22793684}, {"filename": "/test/assets/resources/import/0d/0d76be6fa.b0fef.json", "start": 22793684, "end": 22803951}, {"filename": "/test/assets/resources/import/0d/0d955b423.a81e1.json", "start": 22803951, "end": 22820675}, {"filename": "/test/assets/resources/import/0d/0dda306aa.779d2.json", "start": 22820675, "end": 22824469}, {"filename": "/test/assets/resources/import/0d/0de68f6d-6fd0-4368-84e8-ff7e280f1118.af147.json", "start": 22824469, "end": 22824604}, {"filename": "/test/assets/resources/import/0e/0e12a3630.175e9.json", "start": 22824604, "end": 22828415}, {"filename": "/test/assets/resources/import/0e/0eabc7786.fb92a.json", "start": 22828415, "end": 22833797}, {"filename": "/test/assets/resources/import/0e/0ebf30da6.dc437.json", "start": 22833797, "end": 23034386}, {"filename": "/test/assets/resources/import/0e/0edeb9b57.d561e.json", "start": 23034386, "end": 23035200}, {"filename": "/test/assets/resources/import/0f/0f3f9168-c4e6-4537-bc7d-212ecf202f79@c363e.1b18c.cconb", "start": 23035200, "end": 23217932}, {"filename": "/test/assets/resources/import/0f/0f4f0ebd-ab43-499d-b163-9bace8332fce.8bead.json", "start": 23217932, "end": 23218496}, {"filename": "/test/assets/resources/import/0f/0f544c6ae.7714c.json", "start": 23218496, "end": 23247895}, {"filename": "/test/assets/resources/import/0f/0f58f7594.59b15.json", "start": 23247895, "end": 23257420}, {"filename": "/test/assets/resources/import/0f/0f73c4f3-6380-4071-9bbd-1e389d9d1dbd.78014.cconb", "start": 23257420, "end": 23259124}, {"filename": "/test/assets/resources/import/0f/0f8b5d14d.b877d.json", "start": 23259124, "end": 23379579}, {"filename": "/test/assets/resources/import/0f/0f93da7cd.1436e.json", "start": 23379579, "end": 23388335}, {"filename": "/test/assets/resources/import/0f/0fa6724ca.d8f97.json", "start": 23388335, "end": 23397323}, {"filename": "/test/assets/resources/import/0f/0fa6efa1a.bf5c9.json", "start": 23397323, "end": 23407876}, {"filename": "/test/assets/resources/import/0f/0fb1047c0.aaaaa.json", "start": 23407876, "end": 23414428}, {"filename": "/test/assets/resources/import/10/10215ec8-a27f-4920-a850-2ee34b982a63.a1eba.json", "start": 23414428, "end": 23414560}, {"filename": "/test/assets/resources/import/11/11142f22-dfeb-4b8b-9a49-9ac3d9481f19.8bc90.json", "start": 23414560, "end": 23414699}, {"filename": "/test/assets/resources/import/12/1214e044-cc37-46d2-a789-05eb117853a6.76bdf.json", "start": 23414699, "end": 23414845}, {"filename": "/test/assets/resources/import/12/12721e40-9abe-470a-b8fc-a2cb16415c1d@f9941.72d95.json", "start": 23414845, "end": 23415423}, {"filename": "/test/assets/resources/import/13/131ed0b8-d1d6-43be-9e46-797a43465480.f03dd.json", "start": 23415423, "end": 23415553}, {"filename": "/test/assets/resources/import/14/14539225-4222-497c-a9af-044b9bc55976.2324a.json", "start": 23415553, "end": 23416202}, {"filename": "/test/assets/resources/import/15/156b8211-bdcf-4ae8-9d9a-f98ee02a1027.16e6e.json", "start": 23416202, "end": 23417352}, {"filename": "/test/assets/resources/import/15/15ffd0de-8bcb-4679-be83-3cb692f985d7.1ffb6.json", "start": 23417352, "end": 23417476}, {"filename": "/test/assets/resources/import/17/17ac9a6a-f804-4b09-a850-498f7d38b513.1d0be.json", "start": 23417476, "end": 23417606}, {"filename": "/test/assets/resources/import/19/19002e9b-37e4-4554-85b5-8ce0d5e1aa0e.09c9d.json", "start": 23417606, "end": 23417742}, {"filename": "/test/assets/resources/import/1c/1c659ea9-4589-460c-ac58-ac2c6d2b8d52@f9941.bb1ec.json", "start": 23417742, "end": 23418330}, {"filename": "/test/assets/resources/import/1d/1de5260c-f2c3-4196-bf0e-f05ebe6b77ec.37f2f.json", "start": 23418330, "end": 23423568}, {"filename": "/test/assets/resources/import/1e/1e39650a-5224-42fd-8cc7-dcb78ab37719.90a58.json", "start": 23423568, "end": 23453951}, {"filename": "/test/assets/resources/import/1f/1f3258ab-29b1-478e-8688-c0ed5bc95973.121cc.json", "start": 23453951, "end": 23454083}, {"filename": "/test/assets/resources/import/1f/1f6571b3-2023-4d38-aaba-a80afbe16c53@f9941.2e3ae.json", "start": 23454083, "end": 23454661}, {"filename": "/test/assets/resources/import/20/208c15d3-13fc-4b01-bf5c-97a3f6a48cda@f9941.6f039.json", "start": 23454661, "end": 23455241}, {"filename": "/test/assets/resources/import/21/213bd386-ec38-4d1a-8f15-1363d8e7dab6.9b937.json", "start": 23455241, "end": 23455368}, {"filename": "/test/assets/resources/import/23/230475ad-a8bc-45bb-b6fa-a01ffe1cc88f.93a30.json", "start": 23455368, "end": 23455496}, {"filename": "/test/assets/resources/import/23/235d2516-cdeb-455a-8390-b786c91fcbd4@be3c8.1343b.cconb", "start": 23455496, "end": 23664168}, {"filename": "/test/assets/resources/import/25/2509615d-3c16-4c47-9818-636fb8572324.58380.json", "start": 23664168, "end": 23665044}, {"filename": "/test/assets/resources/import/25/25663455-2b8e-4aab-86e0-34e820e698ba@b23ec.5f320.cconb", "start": 23665044, "end": 23868432}, {"filename": "/test/assets/resources/import/26/26aa0559-86cc-4ded-90b6-205a73830489.2e1c2.json", "start": 23868432, "end": 23872050}, {"filename": "/test/assets/resources/import/26/26ca8887-ad9e-47b0-bb01-37305194b99b.7aafd.json", "start": 23872050, "end": 23881167}, {"filename": "/test/assets/resources/import/28/28325205-bbd6-47a5-aa54-bd0e934f3aed.caf13.json", "start": 23881167, "end": 23881297}, {"filename": "/test/assets/resources/import/28/28e4a828-94c1-412e-a246-430da1282982.1887e.json", "start": 23881297, "end": 23881431}, {"filename": "/test/assets/resources/import/29/294f17cf-1faf-4676-810f-7c0a5d55effe@f9941.d4582.json", "start": 23881431, "end": 23882021}, {"filename": "/test/assets/resources/import/2a/2a02ded8-d2f2-4f64-92e0-8472102d8f22.2a6a5.json", "start": 23882021, "end": 23882147}, {"filename": "/test/assets/resources/import/2a/2ab95d40-0e43-4c1e-b66b-7306723e4b0f.590ec.json", "start": 23882147, "end": 23890348}, {"filename": "/test/assets/resources/import/2c/2cfdf991-0068-4c94-923b-15101cfd3b9c@98135.42dc6.cconb", "start": 23890348, "end": 24075928}, {"filename": "/test/assets/resources/import/2d/2d1ece14-4c70-437b-951b-aeeb8a6fa843@f9941.489f3.json", "start": 24075928, "end": 24076508}, {"filename": "/test/assets/resources/import/2e/2e4b3c52-d383-4fb0-be40-ed745309ffef.405de.cconb", "start": 24076508, "end": 24078056}, {"filename": "/test/assets/resources/import/2e/2ee60fc4-bea5-4a2c-a8d2-5faeab4625a7.27624.json", "start": 24078056, "end": 24078847}, {"filename": "/test/assets/resources/import/2f/2f392832-610d-476b-aa66-776e06230f56.f6a3a.json", "start": 24078847, "end": 24089898}, {"filename": "/test/assets/resources/import/30/30274d2d-51c8-428a-bc6a-76bb0ff8a010@a4b84.ae79e.cconb", "start": 24089898, "end": 24383294}, {"filename": "/test/assets/resources/import/30/30406afe-5e1a-44a7-9a75-657ad26e7ceb@7bbf9.ca1ef.cconb", "start": 24383294, "end": 24810610}, {"filename": "/test/assets/resources/import/30/30d7f6e7-1ad9-40e8-9854-77abd1a4982a.456c1.json", "start": 24810610, "end": 24810738}, {"filename": "/test/assets/resources/import/31/312afeb0-1296-4842-8f3f-59149fbf68b9.e41ce.json", "start": 24810738, "end": 24812944}, {"filename": "/test/assets/resources/import/32/326aca67-0dae-4620-b972-9c4b57f1ffa8.c9626.json", "start": 24812944, "end": 24813077}, {"filename": "/test/assets/resources/import/33/33427893-cc99-4890-85c2-7831ad8f903d.b844e.json", "start": 24813077, "end": 24813425}, {"filename": "/test/assets/resources/import/33/33e68f2f-d8be-48c6-9ab9-510b019edd4f.8db58.json", "start": 24813425, "end": 24813553}, {"filename": "/test/assets/resources/import/35/35831798-d855-4b5d-b27b-34b8c856ecb3.445d6.cconb", "start": 24813553, "end": 24815429}, {"filename": "/test/assets/resources/import/37/3708d252-f37e-4c76-86e0-d2f0c51bf6a7@cbc49.88a5a.cconb", "start": 24815429, "end": 25081345}, {"filename": "/test/assets/resources/import/37/37256cae-e555-4811-b415-c818e29ae707.d39ac.json", "start": 25081345, "end": 25081474}, {"filename": "/test/assets/resources/import/39/3928c884-dbab-4b4b-b116-9083657383f7.4a09d.cconb", "start": 25081474, "end": 25083178}, {"filename": "/test/assets/resources/import/3a/3a6c74c9-baa2-41d3-9499-0adbff247839@f9941.14e13.json", "start": 25083178, "end": 25083780}, {"filename": "/test/assets/resources/import/3a/3a8ed455-6cab-4774-8d51-728da2bf2aee.32dab.json", "start": 25083780, "end": 25083916}, {"filename": "/test/assets/resources/import/3d/3d337a98-6d7a-49d8-a670-710fc315229c.60f8f.json", "start": 25083916, "end": 25085120}, {"filename": "/test/assets/resources/import/3e/3e692fe3-0529-41ae-adf2-045a6d9127fc.ae3ec.json", "start": 25085120, "end": 25085248}, {"filename": "/test/assets/resources/import/3e/3ed52af3-c6ec-4db0-979a-0c004495455b.80413.json", "start": 25085248, "end": 25085376}, {"filename": "/test/assets/resources/import/41/41613331-0871-4515-9bcd-c689b61c9c79.f76ac.json", "start": 25085376, "end": 25085500}, {"filename": "/test/assets/resources/import/41/417f46a8-5124-4159-a472-4dedf9aca8f3.76af6.json", "start": 25085500, "end": 25085635}, {"filename": "/test/assets/resources/import/41/41b546c0-4575-4f9d-8d8a-9c91e3a500da.24d77.cconb", "start": 25085635, "end": 25087423}, {"filename": "/test/assets/resources/import/42/429f229d-d53e-4c16-b53a-19c6ccb038e2@66b1f.2016a.cconb", "start": 25087423, "end": 25308183}, {"filename": "/test/assets/resources/import/44/44c21028-9ba7-496a-ab49-56c74c07cd23.cfbc3.json", "start": 25308183, "end": 25308315}, {"filename": "/test/assets/resources/import/46/46421fe1-e0e3-4285-8cf6-05d9983faed9.c0fb0.json", "start": 25308315, "end": 25308447}, {"filename": "/test/assets/resources/import/46/464cbd38-37aa-4e59-bb10-4a0a800a480c.a86a5.json", "start": 25308447, "end": 25308578}, {"filename": "/test/assets/resources/import/46/46e7f6d6-ab9d-4e9b-9a73-2a1e38633966.90c95.json", "start": 25308578, "end": 25310158}, {"filename": "/test/assets/resources/import/48/48494268-ef75-427c-a72c-3f6e225a509f.fbbcb.json", "start": 25310158, "end": 25311152}, {"filename": "/test/assets/resources/import/49/49c35f21-297a-4f6c-910e-0aa887935e9d@25b76.baf8a.cconb", "start": 25311152, "end": 25421356}, {"filename": "/test/assets/resources/import/4c/4ca0a151-0f2b-47c2-ac3e-1b084b26fbf9@78c74.bda1c.cconb", "start": 25421356, "end": 25633372}, {"filename": "/test/assets/resources/import/4d/4dca53b7-9ae0-48fd-b7f0-8b713f7ea937.bfff9.json", "start": 25633372, "end": 25633465}, {"filename": "/test/assets/resources/import/4e/4e08f6aa-2d3d-4ca5-8c84-470f0425ae02.ae724.json", "start": 25633465, "end": 25633599}, {"filename": "/test/assets/resources/import/4e/4eccb3cb-0b8b-4c57-b3d0-22238a99e34c@e5f7b.18130.cconb", "start": 25633599, "end": 25839891}, {"filename": "/test/assets/resources/import/4f/4f28d217-aca0-4b77-a45e-5d414803acff.a9d77.json", "start": 25839891, "end": 25840805}, {"filename": "/test/assets/resources/import/50/502d5f4a-ecfb-46a7-97b1-988c9ed9771a@5571d.f4448.cconb", "start": 25840805, "end": 25951405}, {"filename": "/test/assets/resources/import/50/50e2df3f-dce1-478e-a525-522725a0dbd9.3b3f5.json", "start": 25951405, "end": 25953787}, {"filename": "/test/assets/resources/import/51/51073387-551d-49cf-ad5f-518b395949c2.0ead2.json", "start": 25953787, "end": 25953919}, {"filename": "/test/assets/resources/import/51/51b0d5f2-17dc-412c-989e-245dd10597f8.08426.json", "start": 25953919, "end": 25954046}, {"filename": "/test/assets/resources/import/56/56dcb5f1-a1f4-4f2e-b109-57c9179b56c8@9dca8.54218.cconb", "start": 25954046, "end": 26438138}, {"filename": "/test/assets/resources/import/58/585aec53-d9b3-425c-ac4e-47ad0b6a6171.4fe3b.json", "start": 26438138, "end": 26438278}, {"filename": "/test/assets/resources/import/59/590ca7c5-78c7-4b15-b91f-3e365c01682a@f9941.86ed3.json", "start": 26438278, "end": 26438867}, {"filename": "/test/assets/resources/import/59/5921260b-35b1-4a35-a910-d40390e8ab7f.14aef.json", "start": 26438867, "end": 26440496}, {"filename": "/test/assets/resources/import/59/59321138-b5e3-417f-88d1-8f5a7d459cc7@d5a49.b5edb.cconb", "start": 26440496, "end": 26551704}, {"filename": "/test/assets/resources/import/5a/5ae1040f-51df-45c6-aa29-7b095465ad03.f1b9d.json", "start": 26551704, "end": 26559904}, {"filename": "/test/assets/resources/import/5c/5c0f6c46-96d7-4ce0-97ef-2424137ee2db.9500c.cconb", "start": 26559904, "end": 26562004}, {"filename": "/test/assets/resources/import/5c/5c49ade9-b5d3-4583-a524-6b46475d9f57.92cd4.json", "start": 26562004, "end": 26562256}, {"filename": "/test/assets/resources/import/5c/5ca39624-1b61-4a25-ac3f-cf698bf2061d.fe26d.json", "start": 26562256, "end": 26562392}, {"filename": "/test/assets/resources/import/5d/5d053dd2-13c9-4330-8af8-8280678fb0e6.140eb.json", "start": 26562392, "end": 26562523}, {"filename": "/test/assets/resources/import/61/61dc0355-92e7-4db2-b775-1db4da5688c0.65106.json", "start": 26562523, "end": 26564103}, {"filename": "/test/assets/resources/import/61/61f5169e-815a-4e5c-ad33-d07a43f4c2e6.00e2e.json", "start": 26564103, "end": 26564234}, {"filename": "/test/assets/resources/import/65/654fea2f-b6e5-4b50-961a-76586952f98e@49939.8db80.cconb", "start": 26564234, "end": 26683054}, {"filename": "/test/assets/resources/import/65/654fea2f-b6e5-4b50-961a-76586952f98e@76b06.19463.cconb", "start": 26683054, "end": 26824706}, {"filename": "/test/assets/resources/import/65/65c83f6d-307f-402c-b5ee-be5898dce6e4.0fa56.json", "start": 26824706, "end": 26830194}, {"filename": "/test/assets/resources/import/66/661864a7-2d71-4e40-aec5-9256a8acda90@f5041.6cd2e.cconb", "start": 26830194, "end": 26938930}, {"filename": "/test/assets/resources/import/68/6802c72d-4a8f-403b-bc6f-d873ed9ad11d.ec070.json", "start": 26938930, "end": 26939025}, {"filename": "/test/assets/resources/import/68/68c89063-90bf-4155-a4ce-1aa358bb64ea@51560.ee2fb.cconb", "start": 26939025, "end": 27146345}, {"filename": "/test/assets/resources/import/68/68e1d593-1d4b-4fe9-84d7-44d3cff0f12d.916f9.json", "start": 27146345, "end": 27146473}, {"filename": "/test/assets/resources/import/69/6988d16e-2d35-4989-a111-a82e602fbed5.36e29.json", "start": 27146473, "end": 27146605}, {"filename": "/test/assets/resources/import/6b/6b949999-c42d-41a9-8dde-9bab9fea88ac.9f5e0.json", "start": 27146605, "end": 27147205}, {"filename": "/test/assets/resources/import/6d/6d96b1a1-3764-40cd-b307-c60a1ad8772f.40532.json", "start": 27147205, "end": 27149580}, {"filename": "/test/assets/resources/import/6e/6e397034-7cf1-4c17-b6ec-448adb7eb9f0@f9941.b0d9d.json", "start": 27149580, "end": 27150168}, {"filename": "/test/assets/resources/import/6e/6e58f9c9-64e9-4b58-938f-5a3267106c56.43a5a.json", "start": 27150168, "end": 27150301}, {"filename": "/test/assets/resources/import/6f/6fd82bf7-a4b0-4725-872f-fbfd0ce57218@4932d.26450.cconb", "start": 27150301, "end": 27273269}, {"filename": "/test/assets/resources/import/6f/6fd82bf7-a4b0-4725-872f-fbfd0ce57218@8c805.88169.cconb", "start": 27273269, "end": 27379837}, {"filename": "/test/assets/resources/import/71/715de405-a6ed-4e20-9949-42b31230bc19.61537.json", "start": 27379837, "end": 27380748}, {"filename": "/test/assets/resources/import/72/721f3d17-017b-499e-a111-149f9c4ea787.6a10c.json", "start": 27380748, "end": 27380875}, {"filename": "/test/assets/resources/import/72/724a3cf7-81a0-4948-a679-2460946f7caf@f9941.61627.json", "start": 27380875, "end": 27381465}, {"filename": "/test/assets/resources/import/72/72b79277-a361-4594-b427-16b1b1f0239d.09ade.json", "start": 27381465, "end": 27382041}, {"filename": "/test/assets/resources/import/73/73c32b17-9b32-4300-92d1-fc078e935165@633d2.b8bc9.cconb", "start": 27382041, "end": 27552829}, {"filename": "/test/assets/resources/import/74/7486d902-8a2c-4aa4-8fc9-3d1cc683501c@e0b34.d75f4.cconb", "start": 27552829, "end": 27662929}, {"filename": "/test/assets/resources/import/74/749b1215-845e-4bf3-9bd6-8738b9c624a2.488ee.json", "start": 27662929, "end": 27663061}, {"filename": "/test/assets/resources/import/75/751d3620-de5e-4e45-bae3-d31eabe15b9f@08167.0827c.cconb", "start": 27663061, "end": 27861925}, {"filename": "/test/assets/resources/import/75/751d3620-de5e-4e45-bae3-d31eabe15b9f@ee036.17b6c.cconb", "start": 27861925, "end": 28142957}, {"filename": "/test/assets/resources/import/75/75afaf73-58ad-4665-aa98-156f03b5106c.846a8.json", "start": 28142957, "end": 28143085}, {"filename": "/test/assets/resources/import/76/76731c51-56d0-4a25-b798-f9057f6a1b89.ed1b0.json", "start": 28143085, "end": 28143621}, {"filename": "/test/assets/resources/import/77/7708c47b-5bc4-4104-ab03-6665a336c140.0f649.json", "start": 28143621, "end": 28143749}, {"filename": "/test/assets/resources/import/77/778cb71c-d290-48b8-aaa8-119278142dd4.45146.json", "start": 28143749, "end": 28152183}, {"filename": "/test/assets/resources/import/78/78d879ff-83d1-40c2-acf8-77707a5d9672.47004.json", "start": 28152183, "end": 28152312}, {"filename": "/test/assets/resources/import/79/798eebe1-fa5c-41d0-8b26-5a6a67c6c0a3@d925e.0db4d.cconb", "start": 28152312, "end": 28335640}, {"filename": "/test/assets/resources/import/79/79c1f3c9-a71f-4349-8261-9122207e1da4@f9941.46bf6.json", "start": 28335640, "end": 28336228}, {"filename": "/test/assets/resources/import/79/79ffebef-6142-4774-b833-d2a4a170a59b.f926c.json", "start": 28336228, "end": 28336360}, {"filename": "/test/assets/resources/import/7b/7b892955-f2cc-4d16-abea-e6aa95f8359f.f71af.json", "start": 28336360, "end": 28336490}, {"filename": "/test/assets/resources/import/7d/7d66fadb-5fd2-4916-961d-fbe78cbe1c16.b234d.json", "start": 28336490, "end": 28337005}, {"filename": "/test/assets/resources/import/83/83a13d44-5ee9-40e6-a151-33cd929ab332@64640.1313d.cconb", "start": 28337005, "end": 28545061}, {"filename": "/test/assets/resources/import/84/841cc2d8-4a77-4768-9d0c-497cb0d4af08.73641.json", "start": 28545061, "end": 28545189}, {"filename": "/test/assets/resources/import/84/84f61845-3a5c-4ab4-b329-f6365c648133@153a4.078da.cconb", "start": 28545189, "end": 28759937}, {"filename": "/test/assets/resources/import/86/861f7861-7a44-4689-a0bf-cec95306b19c.5da29.json", "start": 28759937, "end": 28760067}, {"filename": "/test/assets/resources/import/86/862f6e59-6232-444e-8bea-9e511f99a14e.55db9.json", "start": 28760067, "end": 28762507}, {"filename": "/test/assets/resources/import/86/8683247b-ad77-442e-8b4d-fac692d477ca.87146.json", "start": 28762507, "end": 28762639}, {"filename": "/test/assets/resources/import/87/879888fe-325d-4410-918d-ea9ddb0ca380.6fdd7.json", "start": 28762639, "end": 28768903}, {"filename": "/test/assets/resources/import/88/882a4d1c-b750-472e-83ac-cbed5f1e264f.5dd3e.json", "start": 28768903, "end": 28775059}, {"filename": "/test/assets/resources/import/89/8950c93d-9438-4fa4-a465-a484510144d7.38317.json", "start": 28775059, "end": 28775185}, {"filename": "/test/assets/resources/import/8b/8bc9fe2d-fb2b-48b4-a3a3-bebc3d9affc9.716e4.json", "start": 28775185, "end": 28775310}, {"filename": "/test/assets/resources/import/8b/8bd352d5-0081-4698-a975-24818c0244b1.fbb6c.json", "start": 28775310, "end": 28776677}, {"filename": "/test/assets/resources/import/8c/8c2fdd5a-3500-4e3c-8538-fc125d1c0380.943ee.json", "start": 28776677, "end": 28778275}, {"filename": "/test/assets/resources/import/8c/8cfdf462-c010-4ed5-afdd-9564198f5f15.c1ef1.json", "start": 28778275, "end": 28779352}, {"filename": "/test/assets/resources/import/8e/8ef4576e-8b93-4e16-85fc-393f80a167b5@ded70.31e5e.cconb", "start": 28779352, "end": 28962592}, {"filename": "/test/assets/resources/import/8f/8f077de9-6d18-4e47-b086-03d2657dda0d.5d554.json", "start": 28962592, "end": 28962727}, {"filename": "/test/assets/resources/import/90/90023fc1-608b-4844-86aa-fed1df5fc28b@89844.9ffd5.cconb", "start": 28962727, "end": 29459191}, {"filename": "/test/assets/resources/import/90/904d9a19-1b6e-4fad-a1bb-bcad4b212318@84928.58b40.cconb", "start": 29459191, "end": 29618103}, {"filename": "/test/assets/resources/import/92/921c3550-e6fa-42e7-9305-000fed26f378.97dd8.cconb", "start": 29618103, "end": 29622727}, {"filename": "/test/assets/resources/import/92/927a1d1d-83b8-4e3f-b959-ebd01b2f3a67@f9941.95c63.json", "start": 29622727, "end": 29623315}, {"filename": "/test/assets/resources/import/95/9529e9d4-8a1a-424d-86e2-dc916d101c29.63d6d.json", "start": 29623315, "end": 29626962}, {"filename": "/test/assets/resources/import/95/95b36fdd-bb56-46d0-8a36-e0cde854d6a6.97212.cconb", "start": 29626962, "end": 29628758}, {"filename": "/test/assets/resources/import/98/98e198ca-8fb3-4e88-88af-b6ce335b966d.eb61b.json", "start": 29628758, "end": 29629692}, {"filename": "/test/assets/resources/import/98/98f98359-d38b-4673-acee-3d2962705c49@532bd.93ab6.cconb", "start": 29629692, "end": 29822224}, {"filename": "/test/assets/resources/import/98/98f98359-d38b-4673-acee-3d2962705c49@f3199.6e5d2.cconb", "start": 29822224, "end": 30092504}, {"filename": "/test/assets/resources/import/9a/9aabcd47-f18f-409f-baf7-371e67b5636a.f87bb.json", "start": 30092504, "end": 30093368}, {"filename": "/test/assets/resources/import/9b/9b5fa969-24fb-42da-996a-a40bb37a1622.8e17c.json", "start": 30093368, "end": 30093904}, {"filename": "/test/assets/resources/import/9e/9e494b11-ac66-4aac-a5b9-ae4376144d0b@305f8.2a18c.cconb", "start": 30093904, "end": 30388548}, {"filename": "/test/assets/resources/import/9f/9f692514-f79e-4f9d-aa38-3136767ec25c.5717d.cconb", "start": 30388548, "end": 30390172}, {"filename": "/test/assets/resources/import/9f/9f7f8fd5-0987-4e9c-a0a3-02e03bc68cc8.ed88a.json", "start": 30390172, "end": 30393873}, {"filename": "/test/assets/resources/import/a2/a2ae8549-a259-4cd0-ab86-69554defd321.f823c.json", "start": 30393873, "end": 30394005}, {"filename": "/test/assets/resources/import/a4/a411228a-11d3-4788-b28d-e43b30ea5787.65162.json", "start": 30394005, "end": 30394130}, {"filename": "/test/assets/resources/import/a4/a496bc9e-d085-4e99-8ea2-45b2a455aee4.97a99.json", "start": 30394130, "end": 30395064}, {"filename": "/test/assets/resources/import/a4/a4ea8162-2bc5-47e5-aedb-2940448caee0@2b872.704c2.cconb", "start": 30395064, "end": 30500648}, {"filename": "/test/assets/resources/import/a6/a6a5b753-44a6-4f7b-a3e1-ffd4e8946f71.4768c.json", "start": 30500648, "end": 30500780}, {"filename": "/test/assets/resources/import/aa/aa4fcf29-a99b-48fe-be7c-51fd8d4bb1f7.8c2aa.json", "start": 30500780, "end": 30503467}, {"filename": "/test/assets/resources/import/ab/abb0afcd-2e67-407f-8e85-3cc8b11b1edd.a333d.json", "start": 30503467, "end": 30503598}, {"filename": "/test/assets/resources/import/ac/ac49e035-6475-49a1-8f36-a787836c9874.37c9f.json", "start": 30503598, "end": 30504302}, {"filename": "/test/assets/resources/import/ad/ad61582f-6ae1-4b8c-b99b-983606ca7bdc.81240.json", "start": 30504302, "end": 30505514}, {"filename": "/test/assets/resources/import/b2/b236f1d1-b14c-4a34-9299-46b58447ee94@3a40b.73b44.cconb", "start": 30505514, "end": 30797690}, {"filename": "/test/assets/resources/import/b2/b271e8b0-b919-41a7-9382-06e810ee34ec.a4280.json", "start": 30797690, "end": 30798224}, {"filename": "/test/assets/resources/import/b5/b52d1944-808c-47ea-ad76-c990ffd9b0e2.8cffb.json", "start": 30798224, "end": 30798356}, {"filename": "/test/assets/resources/import/b5/b597dc88-8c9a-4ae0-8f54-b6dafc9f1470.559d6.json", "start": 30798356, "end": 30803850}, {"filename": "/test/assets/resources/import/b5/b5ccbf39-f039-4431-b074-d14aaee3c968.d1687.json", "start": 30803850, "end": 30804583}, {"filename": "/test/assets/resources/import/b7/b7aa4a87-8b6f-4e4b-a96b-e9f01bb673dd.a0d41.json", "start": 30804583, "end": 30807270}, {"filename": "/test/assets/resources/import/b8/b894f620-b1b8-464a-a19a-31d3fa39030e.4743e.json", "start": 30807270, "end": 30812758}, {"filename": "/test/assets/resources/import/bb/bba5f2ea-5ba3-4cdf-9822-82a7798df353.5aa4f.json", "start": 30812758, "end": 30812884}, {"filename": "/test/assets/resources/import/bd/bd44b421-71d8-43df-ab97-c83c549cedaf.5876e.cconb", "start": 30812884, "end": 30819392}, {"filename": "/test/assets/resources/import/c2/c239e142-faf5-4d82-99aa-7469f6e087a9.1a747.json", "start": 30819392, "end": 30819601}, {"filename": "/test/assets/resources/import/c4/c4898149-1a4c-413e-b759-f19f8cb19e78.b4502.json", "start": 30819601, "end": 30819732}, {"filename": "/test/assets/resources/import/c6/c66ceca3-d683-4ed1-879c-1e34ea8e58f5.7f50a.json", "start": 30819732, "end": 30822220}, {"filename": "/test/assets/resources/import/c6/c6765760-ef8f-4032-8a96-970a74a42708.103b3.json", "start": 30822220, "end": 30826717}, {"filename": "/test/assets/resources/import/c8/c883b1b7-5e92-4412-92f8-e7775270dfeb.d54a9.json", "start": 30826717, "end": 30827566}, {"filename": "/test/assets/resources/import/c9/c9085d0d-b07b-41d4-aa6b-dfaa71e7ea98.079e7.json", "start": 30827566, "end": 30830004}, {"filename": "/test/assets/resources/import/c9/c92b4b08-1d74-4628-b8b5-3ca8f083b0d7@f9941.1b8cf.json", "start": 30830004, "end": 30830579}, {"filename": "/test/assets/resources/import/ca/ca68b194-cb47-4d23-be1c-fd8c26f584c7.bb80d.json", "start": 30830579, "end": 30830704}, {"filename": "/test/assets/resources/import/cb/cb388741-806a-4bf9-8664-10e055a96b2c.6943a.json", "start": 30830704, "end": 30832140}, {"filename": "/test/assets/resources/import/ce/ce2df14d-7e2d-4103-8ff5-f18d316191ac.5f7f7.json", "start": 30832140, "end": 30832267}, {"filename": "/test/assets/resources/import/ce/cebc185e-030e-4640-99f4-8b46d232d5c5@88ede.2a3d0.cconb", "start": 30832267, "end": 30933723}, {"filename": "/test/assets/resources/import/cf/cf303b5f-c0e1-4003-be42-63dc47d0ab00.ebcf8.json", "start": 30933723, "end": 30934956}, {"filename": "/test/assets/resources/import/cf/cf526c8e-a085-4f25-af54-a57f85968a6e.e0c5d.json", "start": 30934956, "end": 30939876}, {"filename": "/test/assets/resources/import/cf/cfffd39c-e40d-41b9-b636-399210f96f93.857c8.json", "start": 30939876, "end": 30940005}, {"filename": "/test/assets/resources/import/d0/d0e69024-174a-4fae-a9ce-ba6d884d812f@f9941.b800a.json", "start": 30940005, "end": 30940577}, {"filename": "/test/assets/resources/import/d3/d3394db6-c32b-41a8-bad2-31dca8f25c9e.a299a.json", "start": 30940577, "end": 30942954}, {"filename": "/test/assets/resources/import/d3/d3e122aa-1c36-48cb-8196-9698d6b85328.88677.json", "start": 30942954, "end": 30950867}, {"filename": "/test/assets/resources/import/d4/d4af5a0e-6d35-44d8-be4a-ebe5b20c245c.7afd7.json", "start": 30950867, "end": 30981250}, {"filename": "/test/assets/resources/import/d4/d4e48288-e065-477c-b507-c54086d814a3.8cb9f.json", "start": 30981250, "end": 30981381}, {"filename": "/test/assets/resources/import/d5/d5bf9af8-2a5b-41a6-aa44-4e77cbc3ba34.28081.json", "start": 30981381, "end": 30981506}, {"filename": "/test/assets/resources/import/d7/d7d70de2-c795-463e-bf87-8231a52a5820.1f295.json", "start": 30981506, "end": 30981629}, {"filename": "/test/assets/resources/import/d8/d82821b5-f52a-4261-8588-6c0ac75545af.ee282.json", "start": 30981629, "end": 30981817}, {"filename": "/test/assets/resources/import/d8/d8b86306-e265-4a43-81dc-dd09749a3cf5@5b228.7058c.cconb", "start": 30981817, "end": 31166197}, {"filename": "/test/assets/resources/import/d8/d8b86306-e265-4a43-81dc-dd09749a3cf5@b25e4.770a9.cconb", "start": 31166197, "end": 31441233}, {"filename": "/test/assets/resources/import/d9/d9e8f56e-bed9-4492-8675-00356fd3029e.6e012.json", "start": 31441233, "end": 31441363}, {"filename": "/test/assets/resources/import/da/da50cc8b-275c-4082-b7ca-50985febe1e4.a712c.json", "start": 31441363, "end": 31441500}, {"filename": "/test/assets/resources/import/db/db47641d-855f-4b0f-8f49-befe4250274c@f5ed5.3c779.cconb", "start": 31441500, "end": 31922284}, {"filename": "/test/assets/resources/import/e0/e00a736f-d61c-4ebb-b281-b7bcff50685c.b6765.cconb", "start": 31922284, "end": 31924520}, {"filename": "/test/assets/resources/import/e0/e01fc2a1-6c74-403c-824b-e1b6795cd162@f9941.06c21.json", "start": 31924520, "end": 31925082}, {"filename": "/test/assets/resources/import/e2/e20a5a51-c925-4f6a-8ed3-b3c76cac1dab.f7d13.json", "start": 31925082, "end": 31933172}, {"filename": "/test/assets/resources/import/e8/e85a91e7-472d-41bd-b477-866b77b6f4fd@b6879.8e7a8.cconb", "start": 31933172, "end": 32146872}, {"filename": "/test/assets/resources/import/ea/ea142ad0-8955-41b8-a3fa-be62e0bd804f.18368.json", "start": 32146872, "end": 32147001}, {"filename": "/test/assets/resources/import/ea/ea344a27-cc67-441c-8d12-e32eb25d303b.873ff.cconb", "start": 32147001, "end": 32148677}, {"filename": "/test/assets/resources/import/eb/eb4091c8-baab-447d-ba06-2abfd2944492@d935c.1c0bf.cconb", "start": 32148677, "end": 32414345}, {"filename": "/test/assets/resources/import/eb/ebbbd1a3-d62c-439f-9721-ba71256d098c@bbf62.ac577.cconb", "start": 32414345, "end": 32818753}, {"filename": "/test/assets/resources/import/ec/ec32a359-0ef5-4b35-a584-3536520b5440.45ff8.json", "start": 32818753, "end": 32819457}, {"filename": "/test/assets/resources/import/ec/ec424439-bb80-49af-bb74-2b409c4a19b8@f9941.6910e.json", "start": 32819457, "end": 32820046}, {"filename": "/test/assets/resources/import/ef/efcd32e8-8c08-4335-b716-8255f52f84dc@eb4b3.43e3e.cconb", "start": 32820046, "end": 33034266}, {"filename": "/test/assets/resources/import/f0/f09647d6-84a6-4737-93c4-1cea8315cea7@f9941.6f1e2.json", "start": 33034266, "end": 33034867}, {"filename": "/test/assets/resources/import/f1/f147a006-1e44-4525-920f-fcfedbf9d29d.ce2bc.json", "start": 33034867, "end": 33035731}, {"filename": "/test/assets/resources/import/f1/f15d8242-a950-42d7-af2a-e1a78cce14c0.10f89.json", "start": 33035731, "end": 33035858}, {"filename": "/test/assets/resources/import/f1/f1c45919-c63f-41f4-af12-b28ad942c7b0.c56b5.json", "start": 33035858, "end": 33066241}, {"filename": "/test/assets/resources/import/f2/f2467cf2-5d7f-43f3-9669-f2cb75e4c20a.3d3e9.json", "start": 33066241, "end": 33069388}, {"filename": "/test/assets/resources/import/f2/f2971d66-9d3d-4993-8514-c19cbd5e0abe.ddc45.cconb", "start": 33069388, "end": 33072120}, {"filename": "/test/assets/resources/import/f3/f39a270a-8500-4a6a-abfb-fb38baa494fc.d3e05.json", "start": 33072120, "end": 33072248}, {"filename": "/test/assets/resources/import/f4/f4547b09-0d0e-4083-a91e-4d34c3ee3a9b@4c517.e3b24.cconb", "start": 33072248, "end": 33235140}, {"filename": "/test/assets/resources/import/f4/f4547b09-0d0e-4083-a91e-4d34c3ee3a9b@9b93f.08f75.cconb", "start": 33235140, "end": 33516172}, {"filename": "/test/assets/resources/import/f4/f4b25947-357d-4a06-8f4a-30e58cfccf0e.4fc38.json", "start": 33516172, "end": 33518859}, {"filename": "/test/assets/resources/import/f5/f516e4bd-2f28-4a7e-ab71-3db0714514df.b0077.json", "start": 33518859, "end": 33520606}, {"filename": "/test/assets/resources/import/f7/f7dcb250-b187-4206-a66c-aca587139087.a2e4e.json", "start": 33520606, "end": 33521121}, {"filename": "/test/assets/resources/import/f8/f89208f6-44cf-494f-931c-40e60ed13ecb.bb0c0.json", "start": 33521121, "end": 33521249}, {"filename": "/test/assets/resources/import/f9/f99399f3-6c12-441f-97a0-431f501f64c7@54729.82734.cconb", "start": 33521249, "end": 33952685}, {"filename": "/test/assets/resources/import/f9/f9e3bdf5-db1a-4981-92aa-d323c29bc8b2.3009a.json", "start": 33952685, "end": 33959759}, {"filename": "/test/assets/resources/import/fa/fa04e55f-4bea-4b10-af3a-00599d022803.4b94f.json", "start": 33959759, "end": 33961700}, {"filename": "/test/assets/resources/import/fa/fa50a06d-f604-4f81-91a5-a0e690101ef8.8f7d6.json", "start": 33961700, "end": 33970568}, {"filename": "/test/assets/resources/import/fa/fa95db31-5a7f-43be-937e-ceec12e8dfac@f60d5.45a39.cconb", "start": 33970568, "end": 34243980}, {"filename": "/test/assets/resources/import/fb/fbbb70f0-c83d-4696-9750-62ed4149e6c9.d45b0.json", "start": 34243980, "end": 34244232}, {"filename": "/test/assets/resources/import/ff/ffe6f703-daa4-4085-b408-3aaa3202fb61.affd4.json", "start": 34244232, "end": 34244364}, {"filename": "/test/assets/resources/import/ff/ffebfd57-da9f-4eb5-b5fc-c0b78e8dad80@d95ca.26d13.cconb", "start": 34244364, "end": 34396552}, {"filename": "/test/assets/resources/index.70ea8.js", "start": 34396552, "end": 34397193}, {"filename": "/test/assets/resources/native/00/0009adee-7723-4e43-b613-4d94ba26a332.d6740.png", "start": 34397193, "end": 34405271}, {"filename": "/test/assets/resources/native/00/005003ce-b737-41c7-9ec5-a5d65806b57d.a12e2.png", "start": 34405271, "end": 34442129}, {"filename": "/test/assets/resources/native/00/009c7ee4-4aff-4659-8986-61e1f1d12ab8@792df.048ae.bin", "start": 34442129, "end": 34443073}, {"filename": "/test/assets/resources/native/00/00cbcdea-c342-43b7-8a8d-89f870630de5@7c3e5.f5ff2.bin", "start": 34443073, "end": 34485201}, {"filename": "/test/assets/resources/native/01/013e2ff8-d671-4710-ba8a-bb85fe047f0e.70016.png", "start": 34485201, "end": 34487684}, {"filename": "/test/assets/resources/native/01/014d6f04-9e5e-4983-96b5-c9244b98aeb2@4ce93.91bfe.bin", "start": 34487684, "end": 34493922}, {"filename": "/test/assets/resources/native/01/01de8ec1-bda5-45ed-8c09-0ed13ab87433@25893.c53e9.bin", "start": 34493922, "end": 34494126}, {"filename": "/test/assets/resources/native/02/021031d9-0669-4e92-b9cb-b3b354f2df75@11c07.85866.bin", "start": 34494126, "end": 34500522}, {"filename": "/test/assets/resources/native/02/0241fb84-7158-4ef7-88a6-9d9c22c1ae2e.98291.png", "start": 34500522, "end": 34587053}, {"filename": "/test/assets/resources/native/02/02fa4428-cc75-4f00-af8a-321ac5abd825@221eb.8dddf.bin", "start": 34587053, "end": 34596405}, {"filename": "/test/assets/resources/native/03/030e9ee2-a15f-44fa-a9ce-4809d3c5ac86@c4717.d3400.bin", "start": 34596405, "end": 34596641}, {"filename": "/test/assets/resources/native/03/03ad88c6-2f58-4242-bcea-578d24f26d1e.3f881.astc", "start": 34596641, "end": 34662193}, {"filename": "/test/assets/resources/native/03/03ad88c6-2f58-4242-bcea-578d24f26d1e.3f881.png", "start": 34662193, "end": 34732307}, {"filename": "/test/assets/resources/native/03/03b403f7-c6dc-491c-bcd1-11e38903c26a@332c2.72062.bin", "start": 34732307, "end": 35185867}, {"filename": "/test/assets/resources/native/03/03f1b6e8-f52e-429f-a7e8-192aa79a3005.c6c4a.astc", "start": 35185867, "end": 35251419}, {"filename": "/test/assets/resources/native/03/03f1b6e8-f52e-429f-a7e8-192aa79a3005.c6c4a.png", "start": 35251419, "end": 35288106}, {"filename": "/test/assets/resources/native/04/048567cb-e326-4d73-a499-18dbda3a9a66@1e374.ec71d.bin", "start": 35288106, "end": 35288310}, {"filename": "/test/assets/resources/native/04/04ac9f8f-7062-4226-9939-8e24d30670fd.08479.astc", "start": 35288310, "end": 35638106}, {"filename": "/test/assets/resources/native/04/04ac9f8f-7062-4226-9939-8e24d30670fd.08479.png", "start": 35638106, "end": 36010638}, {"filename": "/test/assets/resources/native/04/04e29d78-653f-46a6-955d-a121438f8408@ed752.7c281.bin", "start": 36010638, "end": 36026510}, {"filename": "/test/assets/resources/native/04/04f4fc29-cb59-47f7-affd-62762b4a8b49@8796e.1fbc6.bin", "start": 36026510, "end": 36026714}, {"filename": "/test/assets/resources/native/05/050681a1-a72a-4cfc-a4c2-539456f685d9.b4e69.astc", "start": 36026714, "end": 36092266}, {"filename": "/test/assets/resources/native/05/050681a1-a72a-4cfc-a4c2-539456f685d9.b4e69.png", "start": 36092266, "end": 36137082}, {"filename": "/test/assets/resources/native/05/055ee72b-5cb4-480c-a677-97ba2c59277a.842dd.astc", "start": 36137082, "end": 36202634}, {"filename": "/test/assets/resources/native/05/055ee72b-5cb4-480c-a677-97ba2c59277a.842dd.png", "start": 36202634, "end": 36324390}, {"filename": "/test/assets/resources/native/05/056ecdde-7a03-43f8-b1ef-d1d2cc537ded@b8162.faf38.bin", "start": 36324390, "end": 36324594}, {"filename": "/test/assets/resources/native/05/0578a1b1-d83a-4866-a55f-8ef40fc25b18.47eaf.png", "start": 36324594, "end": 36370072}, {"filename": "/test/assets/resources/native/05/05dc770f-95ef-4250-bb25-4e89a9bc2a04.e0913.png", "start": 36370072, "end": 36403446}, {"filename": "/test/assets/resources/native/06/0690786e-c064-4cef-b157-c3ec60e764ac.471a7.mp3", "start": 36403446, "end": 36423552, "audio": 1}, {"filename": "/test/assets/resources/native/06/06c28fcf-aa56-4ad5-9f7d-7c77b6463e47.c5ed5.astc", "start": 36423552, "end": 36489104}, {"filename": "/test/assets/resources/native/06/06c28fcf-aa56-4ad5-9f7d-7c77b6463e47.c5ed5.png", "start": 36489104, "end": 36592331}, {"filename": "/test/assets/resources/native/07/0705a4e8-cf42-4ff3-9345-74be6cfc4124.79b80.png", "start": 36592331, "end": 36593139}, {"filename": "/test/assets/resources/native/07/070f56ee-20d4-40c9-b9a4-4025fede272d.d6c8e.png", "start": 36593139, "end": 36645816}, {"filename": "/test/assets/resources/native/07/073de7d3-18fe-4ea4-91d3-def1fc3535ff@d3e2b.4c0cf.bin", "start": 36645816, "end": 36646020}, {"filename": "/test/assets/resources/native/07/0777bcba-f9ef-481a-b9a2-bbb4d9bab3a4.259ab.astc", "start": 36646020, "end": 36733652}, {"filename": "/test/assets/resources/native/07/0777bcba-f9ef-481a-b9a2-bbb4d9bab3a4.259ab.png", "start": 36733652, "end": 36973318}, {"filename": "/test/assets/resources/native/07/0787d492-d30a-436b-8f1c-8779490186fe.c1d03.astc", "start": 36973318, "end": 37038870}, {"filename": "/test/assets/resources/native/07/0787d492-d30a-436b-8f1c-8779490186fe.c1d03.png", "start": 37038870, "end": 37144818}, {"filename": "/test/assets/resources/native/07/078ff306-3a94-4e69-ae26-4a0777af0a17.00fff.astc", "start": 37144818, "end": 37210370}, {"filename": "/test/assets/resources/native/07/078ff306-3a94-4e69-ae26-4a0777af0a17.00fff.png", "start": 37210370, "end": 37215158}, {"filename": "/test/assets/resources/native/07/07b82f02-1df1-49d2-88df-20d019fd5d1f.54f21.mp3", "start": 37215158, "end": 37226933, "audio": 1}, {"filename": "/test/assets/resources/native/07/07cc6b3d-56d2-4387-a73f-f7596710bc21.f425f.astc", "start": 37226933, "end": 37576729}, {"filename": "/test/assets/resources/native/07/07cc6b3d-56d2-4387-a73f-f7596710bc21.f425f.png", "start": 37576729, "end": 38291442}, {"filename": "/test/assets/resources/native/07/07d61f46-6564-45bb-9c91-6714b31458c6@ae581.e8404.bin", "start": 38291442, "end": 38291646}, {"filename": "/test/assets/resources/native/07/07dce2f0-a6b9-4c26-b2db-80cac500fb27.46bbe.astc", "start": 38291646, "end": 38357198}, {"filename": "/test/assets/resources/native/07/07dce2f0-a6b9-4c26-b2db-80cac500fb27.46bbe.png", "start": 38357198, "end": 38446516}, {"filename": "/test/assets/resources/native/07/07ef1032-07e8-47b9-9390-2e0c0fc42fe4.eefc9.astc", "start": 38446516, "end": 38512068}, {"filename": "/test/assets/resources/native/07/07ef1032-07e8-47b9-9390-2e0c0fc42fe4.eefc9.png", "start": 38512068, "end": 38559514}, {"filename": "/test/assets/resources/native/08/085ff91e-7a00-482c-8b7a-8292a2ecae7b.57edf.astc", "start": 38559514, "end": 38625066}, {"filename": "/test/assets/resources/native/08/085ff91e-7a00-482c-8b7a-8292a2ecae7b.57edf.png", "start": 38625066, "end": 38729096}, {"filename": "/test/assets/resources/native/08/0887df01-326f-44ab-ae39-085dfd6499b9.97be1.astc", "start": 38729096, "end": 39078892}, {"filename": "/test/assets/resources/native/08/0887df01-326f-44ab-ae39-085dfd6499b9.97be1.png", "start": 39078892, "end": 39473181}, {"filename": "/test/assets/resources/native/08/08fc5bf8-12fe-4b23-873a-5e7e1c19f923.e09ca.mp3", "start": 39473181, "end": 39491615, "audio": 1}, {"filename": "/test/assets/resources/native/09/094304ed-349e-473e-af44-d3e2ea0dcde9.55451.png", "start": 39491615, "end": 39494740}, {"filename": "/test/assets/resources/native/09/099456bb-c753-41a0-adfb-4456216525f8.c4864.png", "start": 39494740, "end": 39721625}, {"filename": "/test/assets/resources/native/09/09ea91b1-7000-46fa-ae40-78ce61ba4740.632ed.astc", "start": 39721625, "end": 40071421}, {"filename": "/test/assets/resources/native/09/09ea91b1-7000-46fa-ae40-78ce61ba4740.632ed.pkm", "start": 40071421, "end": 40770713}, {"filename": "/test/assets/resources/native/09/09ea91b1-7000-46fa-ae40-78ce61ba4740.632ed.png", "start": 40770713, "end": 40837668}, {"filename": "/test/assets/resources/native/09/09ea91b1-7000-46fa-ae40-78ce61ba4740.632ed.pvr", "start": 40837668, "end": 41537593}, {"filename": "/test/assets/resources/native/0b/0b65ee6b-4e92-4459-8a94-edb99aa991c0.49ac1.astc", "start": 41537593, "end": 41603145}, {"filename": "/test/assets/resources/native/0b/0b65ee6b-4e92-4459-8a94-edb99aa991c0.49ac1.png", "start": 41603145, "end": 41648152}, {"filename": "/test/assets/resources/native/0b/0b92b4ff-96e3-4956-8164-8087f922ba60.a58db.png", "start": 41648152, "end": 41657662}, {"filename": "/test/assets/resources/native/0b/0bb9657a-90fc-4a4b-8603-66197974b0f6.12193.astc", "start": 41657662, "end": 41919822}, {"filename": "/test/assets/resources/native/0b/0bb9657a-90fc-4a4b-8603-66197974b0f6.12193.png", "start": 41919822, "end": 42234529}, {"filename": "/test/assets/resources/native/0b/0be183d6-2ccc-44b3-9178-a1e2ae841bb6.a07c5.png", "start": 42234529, "end": 42256723}, {"filename": "/test/assets/resources/native/0c/0c3554f2-6e31-4a82-85b4-259fba193b65.7d717.png", "start": 42256723, "end": 42264519}, {"filename": "/test/assets/resources/native/0c/0c391c1e-5ea8-4cdc-a5f4-ccf008e991e8@bd3c6.c5a1f.bin", "start": 42264519, "end": 42264723}, {"filename": "/test/assets/resources/native/0c/0c80515c-9b20-4af7-ab3f-96c8f6792c1c.f2e7c.astc", "start": 42264723, "end": 42330275}, {"filename": "/test/assets/resources/native/0c/0c80515c-9b20-4af7-ab3f-96c8f6792c1c.f2e7c.png", "start": 42330275, "end": 42457915}, {"filename": "/test/assets/resources/native/0c/0c8c5d7b-b029-47ad-bbc2-549a31117de8@163ef.857a6.bin", "start": 42457915, "end": 42479707}, {"filename": "/test/assets/resources/native/0c/0cda9986-70c5-4e5d-88b6-5b3594d8a4ab.cdc9a.astc", "start": 42479707, "end": 42545259}, {"filename": "/test/assets/resources/native/0c/0cda9986-70c5-4e5d-88b6-5b3594d8a4ab.cdc9a.png", "start": 42545259, "end": 42600796}, {"filename": "/test/assets/resources/native/0d/0d5f9e94-014f-4b57-87ff-496b56ed8119.f5995.png", "start": 42600796, "end": 42678409}, {"filename": "/test/assets/resources/native/0d/0dba6641-4f8f-4fac-93f7-7f2c273d4016@8069d.2212f.bin", "start": 42678409, "end": 42678613}, {"filename": "/test/assets/resources/native/0d/0de68f6d-6fd0-4368-84e8-ff7e280f1118.82be2.mp3", "start": 42678613, "end": 42694539, "audio": 1}, {"filename": "/test/assets/resources/native/0e/0e4c5b7a-45b6-4682-ab69-31b28f9f0cb0.eef09.astc", "start": 42694539, "end": 42760091}, {"filename": "/test/assets/resources/native/0e/0e4c5b7a-45b6-4682-ab69-31b28f9f0cb0.eef09.png", "start": 42760091, "end": 42860480}, {"filename": "/test/assets/resources/native/0e/0e67d650-30dc-4ef6-bd65-4385348cc977@1454c.9faf1.bin", "start": 42860480, "end": 42860684}, {"filename": "/test/assets/resources/native/0e/0e84b98d-0b28-4907-ad16-9c5f8626268f.09082.astc", "start": 42860684, "end": 42926236}, {"filename": "/test/assets/resources/native/0e/0e84b98d-0b28-4907-ad16-9c5f8626268f.09082.png", "start": 42926236, "end": 43018968}, {"filename": "/test/assets/resources/native/0e/0ea18d4c-5723-400d-8f8b-6a8760ce2150@39c32.16d6c.bin", "start": 43018968, "end": 43715744}, {"filename": "/test/assets/resources/native/0e/0ec5486a-0d93-4b31-b22f-057f64d31ef5.25213.png", "start": 43715744, "end": 43776089}, {"filename": "/test/assets/resources/native/0f/0f382e97-b4d8-46c5-bbe1-d990d3407b15@36684.7264e.bin", "start": 43776089, "end": 43776293}, {"filename": "/test/assets/resources/native/0f/0f390db4-8c40-4b38-a8e1-f81b275c3dbf.8a817.astc", "start": 43776293, "end": 43841845}, {"filename": "/test/assets/resources/native/0f/0f390db4-8c40-4b38-a8e1-f81b275c3dbf.8a817.png", "start": 43841845, "end": 43946904}, {"filename": "/test/assets/resources/native/0f/0f515437-2179-4224-83fb-e0bb0eb3be15@0f993.2236d.bin", "start": 43946904, "end": 43983216}, {"filename": "/test/assets/resources/native/0f/0f75c724-b73e-4b91-90e5-23fb47776917@4d163.8d6ed.bin", "start": 43983216, "end": 43983420}, {"filename": "/test/assets/resources/native/0f/0fcaadbb-062a-46d7-98ae-a72453c1f58c.adc46.png", "start": 43983420, "end": 45738618}, {"filename": "/test/assets/resources/native/10/10215ec8-a27f-4920-a850-2ee34b982a63.83c1f.mp3", "start": 45738618, "end": 45754962, "audio": 1}, {"filename": "/test/assets/resources/native/10/1024dee1-246f-46b2-a7f5-01f57d06dba6.8d2fc.astc", "start": 45754962, "end": 45820514}, {"filename": "/test/assets/resources/native/10/1024dee1-246f-46b2-a7f5-01f57d06dba6.8d2fc.png", "start": 45820514, "end": 45917286}, {"filename": "/test/assets/resources/native/10/102bbc4e-0047-453e-b977-5bcc3d7bf52d@ce5fc.ad36b.bin", "start": 45917286, "end": 45926318}, {"filename": "/test/assets/resources/native/10/10a610ab-8287-4157-a9ac-7b5efd09f611.fa9b4.astc", "start": 45926318, "end": 46013950}, {"filename": "/test/assets/resources/native/10/10a610ab-8287-4157-a9ac-7b5efd09f611.fa9b4.png", "start": 46013950, "end": 46120936}, {"filename": "/test/assets/resources/native/10/10e91379-14ac-497e-be23-81fe0c5b6b80@36fc5.64789.bin", "start": 46120936, "end": 46121140}, {"filename": "/test/assets/resources/native/11/11142f22-dfeb-4b8b-9a49-9ac3d9481f19.76a77.mp3", "start": 46121140, "end": 46138320, "audio": 1}, {"filename": "/test/assets/resources/native/11/1121298c-6337-4644-ac59-53732ca3b5cb.0d4d1.astc", "start": 46138320, "end": 46488116}, {"filename": "/test/assets/resources/native/11/1121298c-6337-4644-ac59-53732ca3b5cb.0d4d1.png", "start": 46488116, "end": 46826648}, {"filename": "/test/assets/resources/native/11/11cce1e6-6f72-47f7-982f-9008d4c85c9e@6fbb0.e4788.bin", "start": 46826648, "end": 46826852}, {"filename": "/test/assets/resources/native/12/1201ea86-99fb-4e62-8104-17091ff8bbb6.a08e1.astc", "start": 46826852, "end": 46892404}, {"filename": "/test/assets/resources/native/12/1201ea86-99fb-4e62-8104-17091ff8bbb6.a08e1.png", "start": 46892404, "end": 46949440}, {"filename": "/test/assets/resources/native/12/12166f6d-081d-4108-b7f1-19a02e0e3821@35b63.c8d79.bin", "start": 46949440, "end": 47170128}, {"filename": "/test/assets/resources/native/12/123a7156-b2e5-4b70-8568-b9cf70bcdfe4@ecc57.57dcf.bin", "start": 47170128, "end": 47170332}, {"filename": "/test/assets/resources/native/12/1263d74c-8167-4928-91a6-4e2672411f47@17020.613b8.bin", "start": 47170332, "end": 47257076}, {"filename": "/test/assets/resources/native/12/1263d74c-8167-4928-91a6-4e2672411f47@a804a.89e45.bin", "start": 47257076, "end": 47258492}, {"filename": "/test/assets/resources/native/12/126c9065-2589-47d1-8045-3bc198a1e3f8.cc1b0.png", "start": 47258492, "end": 47342358}, {"filename": "/test/assets/resources/native/12/12721e40-9abe-470a-b8fc-a2cb16415c1d.ab2e9.png", "start": 47342358, "end": 47401150}, {"filename": "/test/assets/resources/native/12/12b4f4e2-374b-47e3-9733-dc10bf49db15.1fbbc.astc", "start": 47401150, "end": 47466702}, {"filename": "/test/assets/resources/native/12/12b4f4e2-374b-47e3-9733-dc10bf49db15.1fbbc.png", "start": 47466702, "end": 47493055}, {"filename": "/test/assets/resources/native/13/1314cd7c-3c9d-406c-b934-bd8b789403d4.dab77.astc", "start": 47493055, "end": 47842851}, {"filename": "/test/assets/resources/native/13/1314cd7c-3c9d-406c-b934-bd8b789403d4.dab77.png", "start": 47842851, "end": 48244087}, {"filename": "/test/assets/resources/native/13/131ed0b8-d1d6-43be-9e46-797a43465480.ba1fd.mp3", "start": 48244087, "end": 48253510, "audio": 1}, {"filename": "/test/assets/resources/native/13/133b37ee-1002-4f7d-b9d0-63aeddf96bb1.f79dc.astc", "start": 48253510, "end": 48319062}, {"filename": "/test/assets/resources/native/13/133b37ee-1002-4f7d-b9d0-63aeddf96bb1.f79dc.png", "start": 48319062, "end": 48355886}, {"filename": "/test/assets/resources/native/15/150dbcee-4be6-4d7a-98b0-76a79ca821e3.87d2f.astc", "start": 48355886, "end": 48421438}, {"filename": "/test/assets/resources/native/15/150dbcee-4be6-4d7a-98b0-76a79ca821e3.87d2f.png", "start": 48421438, "end": 48497345}, {"filename": "/test/assets/resources/native/15/152f227c-0300-4277-9618-3845811c1c2a.d6952.astc", "start": 48497345, "end": 48562897}, {"filename": "/test/assets/resources/native/15/152f227c-0300-4277-9618-3845811c1c2a.d6952.png", "start": 48562897, "end": 48593422}, {"filename": "/test/assets/resources/native/15/158d5e66-f285-4e83-bdc1-3d7d44108466.f8ff3.astc", "start": 48593422, "end": 48658974}, {"filename": "/test/assets/resources/native/15/158d5e66-f285-4e83-bdc1-3d7d44108466.f8ff3.png", "start": 48658974, "end": 48841539}, {"filename": "/test/assets/resources/native/15/158f2501-4277-4c74-bfa5-537bf6463c6d.47eaf.png", "start": 48841539, "end": 48887017}, {"filename": "/test/assets/resources/native/15/15ffd0de-8bcb-4679-be83-3cb692f985d7.18193.mp3", "start": 48887017, "end": 48900017, "audio": 1}, {"filename": "/test/assets/resources/native/16/165c4405-e44b-4d60-90c4-e0fc41417831.387c1.jpg", "start": 48900017, "end": 48943120}, {"filename": "/test/assets/resources/native/16/16923288-bbe5-44c9-97c4-b2984e144a0e.fa78f.png", "start": 48943120, "end": 49030530}, {"filename": "/test/assets/resources/native/16/16a9663d-bd7c-4b3d-86f3-aadb68ded92c.32ede.png", "start": 49030530, "end": 49045799}, {"filename": "/test/assets/resources/native/17/17ac9a6a-f804-4b09-a850-498f7d38b513.a45ae.mp3", "start": 49045799, "end": 49078861, "audio": 1}, {"filename": "/test/assets/resources/native/17/17b1b7f8-e855-418b-bf12-ec981ff1e63b.c23b2.astc", "start": 49078861, "end": 49144413}, {"filename": "/test/assets/resources/native/17/17b1b7f8-e855-418b-bf12-ec981ff1e63b.c23b2.png", "start": 49144413, "end": 49164785}, {"filename": "/test/assets/resources/native/17/17c8ac63-87c7-486e-b6ae-e55347c01f1f@b7bc6.3bf97.bin", "start": 49164785, "end": 49166201}, {"filename": "/test/assets/resources/native/17/17d757f6-81e4-4de8-85d7-e666776f0a83@9d2e5.a0429.bin", "start": 49166201, "end": 49167145}, {"filename": "/test/assets/resources/native/18/18972e17-6754-4020-812d-22be93500d97@32c10.9688e.bin", "start": 49167145, "end": 49168165}, {"filename": "/test/assets/resources/native/19/19002e9b-37e4-4554-85b5-8ce0d5e1aa0e.9beb9.mp3", "start": 49168165, "end": 49175079, "audio": 1}, {"filename": "/test/assets/resources/native/19/19b538d2-59d5-4081-936f-688f4aad44ab@59c52.2a88a.bin", "start": 49175079, "end": 49176495}, {"filename": "/test/assets/resources/native/1a/1ab42c09-7ac0-4fb2-8712-a89ffc392248.b6886.astc", "start": 49176495, "end": 49526291}, {"filename": "/test/assets/resources/native/1a/1ab42c09-7ac0-4fb2-8712-a89ffc392248.b6886.png", "start": 49526291, "end": 50029168}, {"filename": "/test/assets/resources/native/1b/1b1eaef7-9f3b-45b4-a39a-8a21bae5812f.26bcf.astc", "start": 50029168, "end": 50116800}, {"filename": "/test/assets/resources/native/1b/1b1eaef7-9f3b-45b4-a39a-8a21bae5812f.26bcf.png", "start": 50116800, "end": 50257990}, {"filename": "/test/assets/resources/native/1b/1b5316fe-0b4c-42dd-8406-1801ea67d00e@c98cb.c1671.bin", "start": 50257990, "end": 50742806}, {"filename": "/test/assets/resources/native/1b/1b7e607d-6751-4ce2-8afb-d57bc47cb339.a089c.astc", "start": 50742806, "end": 50808358}, {"filename": "/test/assets/resources/native/1b/1b7e607d-6751-4ce2-8afb-d57bc47cb339.a089c.png", "start": 50808358, "end": 50808957}, {"filename": "/test/assets/resources/native/1b/1bae8ad8-8a9f-449a-b44d-155c9fbbb366.f470b.astc", "start": 50808957, "end": 51158753}, {"filename": "/test/assets/resources/native/1b/1bae8ad8-8a9f-449a-b44d-155c9fbbb366.f470b.png", "start": 51158753, "end": 51601055}, {"filename": "/test/assets/resources/native/1c/1c2361bf-89f2-4a91-a5a7-20ab1be9a07b.9e514.astc", "start": 51601055, "end": 51666607}, {"filename": "/test/assets/resources/native/1c/1c2361bf-89f2-4a91-a5a7-20ab1be9a07b.9e514.png", "start": 51666607, "end": 51705362}, {"filename": "/test/assets/resources/native/1c/1c659ea9-4589-460c-ac58-ac2c6d2b8d52.5844c.png", "start": 51705362, "end": 51706239}, {"filename": "/test/assets/resources/native/1c/1c793baa-fa21-40f8-9e39-fbdbc177b9a8@96613.a9060.bin", "start": 51706239, "end": 51978633}, {"filename": "/test/assets/resources/native/1c/1ccd787d-6497-4514-a1b9-442d2c1dfa19@a088a.1c713.bin", "start": 51978633, "end": 52044281}, {"filename": "/test/assets/resources/native/1c/1ce443bd-42b0-41b3-ab07-7f3c81f9967c@b48eb.b16d0.bin", "start": 52044281, "end": 52051069}, {"filename": "/test/assets/resources/native/1c/1cee3b42-fb65-4194-9352-2754221763a9@10d7d.62378.bin", "start": 52051069, "end": 52227645}, {"filename": "/test/assets/resources/native/1c/1cfe353a-592f-406a-ae04-e784251183fb.dc59b.astc", "start": 52227645, "end": 52293197}, {"filename": "/test/assets/resources/native/1c/1cfe353a-592f-406a-ae04-e784251183fb.dc59b.png", "start": 52293197, "end": 52374557}, {"filename": "/test/assets/resources/native/1d/1d2a3390-e281-4307-b344-31c1ad68c0c0.d6ffe.astc", "start": 52374557, "end": 52440109}, {"filename": "/test/assets/resources/native/1d/1d2a3390-e281-4307-b344-31c1ad68c0c0.d6ffe.png", "start": 52440109, "end": 52502217}, {"filename": "/test/assets/resources/native/1d/1d46146b-255b-43fb-8094-b3e3970d7ea7.8b2a4.astc", "start": 52502217, "end": 52567769}, {"filename": "/test/assets/resources/native/1d/1d46146b-255b-43fb-8094-b3e3970d7ea7.8b2a4.png", "start": 52567769, "end": 52655634}, {"filename": "/test/assets/resources/native/1d/1d725147-a4b1-4134-bece-963eb449acee.9cfa0.astc", "start": 52655634, "end": 52721186}, {"filename": "/test/assets/resources/native/1d/1d725147-a4b1-4134-bece-963eb449acee.9cfa0.png", "start": 52721186, "end": 52760902}, {"filename": "/test/assets/resources/native/1d/1db1c45b-24cc-4f3d-a106-8e61314468b7@74db7.658bb.bin", "start": 52760902, "end": 53019854}, {"filename": "/test/assets/resources/native/1e/1e151d2e-bd09-45fe-bd3d-456287d043bc@d88d2.67f53.bin", "start": 53019854, "end": 53736882}, {"filename": "/test/assets/resources/native/1e/1e4b5b38-d814-4a71-8874-db657e9bd734@2c6f9.51a48.bin", "start": 53736882, "end": 53789570}, {"filename": "/test/assets/resources/native/1e/1e7e1e2c-eaa8-4b77-acbe-bece42aba3a6.afa1f.png", "start": 53789570, "end": 53826407}, {"filename": "/test/assets/resources/native/1e/1e882125-2123-4e56-bb45-62f5c9e48896.eacb7.astc", "start": 53826407, "end": 53891959}, {"filename": "/test/assets/resources/native/1e/1e882125-2123-4e56-bb45-62f5c9e48896.eacb7.png", "start": 53891959, "end": 53955441}, {"filename": "/test/assets/resources/native/1e/1ee0e829-6e58-4fcc-9402-2832e1a0b9a4.2810a.astc", "start": 53955441, "end": 54020993}, {"filename": "/test/assets/resources/native/1e/1ee0e829-6e58-4fcc-9402-2832e1a0b9a4.2810a.png", "start": 54020993, "end": 54201789}, {"filename": "/test/assets/resources/native/1f/1f3258ab-29b1-478e-8688-c0ed5bc95973.9e061.mp3", "start": 54201789, "end": 54214789, "audio": 1}, {"filename": "/test/assets/resources/native/1f/1f51b2f9-77e4-4ff9-a8ea-4156bb3c85d4.2ba65.astc", "start": 54214789, "end": 54302421}, {"filename": "/test/assets/resources/native/1f/1f51b2f9-77e4-4ff9-a8ea-4156bb3c85d4.2ba65.png", "start": 54302421, "end": 54384996}, {"filename": "/test/assets/resources/native/1f/1f6571b3-2023-4d38-aaba-a80afbe16c53.b759a.png", "start": 54384996, "end": 54426634}, {"filename": "/test/assets/resources/native/1f/1f87c477-2d3a-418c-a20d-421d3b28b3e1@1b10c.d0ae7.bin", "start": 54426634, "end": 54426870}, {"filename": "/test/assets/resources/native/1f/1fb2b25f-d9ad-4e26-8047-abefac7559a5.4ab0a.png", "start": 54426870, "end": 54429408}, {"filename": "/test/assets/resources/native/1f/1fbd9814-2091-4022-a864-f0616527c6ee.726da.astc", "start": 54429408, "end": 54517040}, {"filename": "/test/assets/resources/native/1f/1fbd9814-2091-4022-a864-f0616527c6ee.726da.png", "start": 54517040, "end": 54633177}, {"filename": "/test/assets/resources/native/20/200329f7-0bbd-49f7-bf9c-e70283b92f4c.3977f.png", "start": 54633177, "end": 55081167}, {"filename": "/test/assets/resources/native/20/207e136c-9a49-465a-81f0-aefcf4a13a4b@80769.8bc76.bin", "start": 55081167, "end": 55094103}, {"filename": "/test/assets/resources/native/20/20835ba4-6145-4fbc-a58a-051ce700aa3e.90cf4.png", "start": 55094103, "end": 55095185}, {"filename": "/test/assets/resources/native/20/208c15d3-13fc-4b01-bf5c-97a3f6a48cda.2bf76.png", "start": 55095185, "end": 55096256}, {"filename": "/test/assets/resources/native/20/20983781-5314-45e7-add6-a26db78c429e.f4d1e.astc", "start": 55096256, "end": 55161808}, {"filename": "/test/assets/resources/native/20/20983781-5314-45e7-add6-a26db78c429e.f4d1e.png", "start": 55161808, "end": 55218456}, {"filename": "/test/assets/resources/native/20/20d99e09-8c0c-44a1-bfac-fa9827f87b32.47eaf.png", "start": 55218456, "end": 55263934}, {"filename": "/test/assets/resources/native/21/2103427b-c162-43a8-b9b6-ed36bb9cb614@5b3d7.6c19d.bin", "start": 55263934, "end": 55269658}, {"filename": "/test/assets/resources/native/21/213bd386-ec38-4d1a-8f15-1363d8e7dab6.505b1.mp3", "start": 55269658, "end": 55284330, "audio": 1}, {"filename": "/test/assets/resources/native/21/2152362e-21c6-445f-90d8-9cd62bf63234.17705.png", "start": 55284330, "end": 55285942}, {"filename": "/test/assets/resources/native/21/21dd4661-1d11-4283-8e31-58a06a50f2f8.e5782.astc", "start": 55285942, "end": 55351494}, {"filename": "/test/assets/resources/native/21/21dd4661-1d11-4283-8e31-58a06a50f2f8.e5782.png", "start": 55351494, "end": 55399636}, {"filename": "/test/assets/resources/native/22/224a8789-bb53-46d0-b3d4-a091c16d6b3a.ae5d6.jpg", "start": 55399636, "end": 55442540}, {"filename": "/test/assets/resources/native/22/22fea317-8827-4c8c-93bb-5e8662d12f90.ffbcc.png", "start": 55442540, "end": 55443844}, {"filename": "/test/assets/resources/native/23/230475ad-a8bc-45bb-b6fa-a01ffe1cc88f.e2f4e.mp3", "start": 55443844, "end": 55463297, "audio": 1}, {"filename": "/test/assets/resources/native/23/230f26a1-145f-4237-a9cb-66eea70b118f@72c58.56eaf.bin", "start": 55463297, "end": 55668169}, {"filename": "/test/assets/resources/native/23/232f92f9-48c0-4353-b218-79f1bc2921c3.b0a59.png", "start": 55668169, "end": 56078507}, {"filename": "/test/assets/resources/native/23/239cf81f-7a8d-4ec7-825d-f584fe1cce79@9a0a3.eba35.bin", "start": 56078507, "end": 56083227}, {"filename": "/test/assets/resources/native/23/23e8b705-c6b8-4a6c-a9b1-304901f099f5.68871.astc", "start": 56083227, "end": 56148779}, {"filename": "/test/assets/resources/native/23/23e8b705-c6b8-4a6c-a9b1-304901f099f5.68871.png", "start": 56148779, "end": 56150701}, {"filename": "/test/assets/resources/native/24/24b23128-4649-4766-9dba-a49f43eb376f.baeec.astc", "start": 56150701, "end": 56500497}, {"filename": "/test/assets/resources/native/24/24b23128-4649-4766-9dba-a49f43eb376f.baeec.png", "start": 56500497, "end": 56926381}, {"filename": "/test/assets/resources/native/24/24bee9fb-1ddc-42de-a073-930a026d439b.bfc5a.astc", "start": 56926381, "end": 56991933}, {"filename": "/test/assets/resources/native/24/24bee9fb-1ddc-42de-a073-930a026d439b.bfc5a.png", "start": 56991933, "end": 57081173}, {"filename": "/test/assets/resources/native/24/24f211bb-880a-468f-930e-c61e4cc610db.fba9a.astc", "start": 57081173, "end": 57146725}, {"filename": "/test/assets/resources/native/24/24f211bb-880a-468f-930e-c61e4cc610db.fba9a.png", "start": 57146725, "end": 57267539}, {"filename": "/test/assets/resources/native/24/24face67-fc20-4179-baa2-85f563843d89.3d0cc.png", "start": 57267539, "end": 57323374}, {"filename": "/test/assets/resources/native/25/250b1944-0c7e-4c40-a207-fa608eeaad65.cfaaa.astc", "start": 57323374, "end": 57388926}, {"filename": "/test/assets/resources/native/25/250b1944-0c7e-4c40-a207-fa608eeaad65.cfaaa.png", "start": 57388926, "end": 57587703}, {"filename": "/test/assets/resources/native/25/25137d62-eb16-447d-8eca-a50669ad0b79.40033.astc", "start": 57587703, "end": 57653255}, {"filename": "/test/assets/resources/native/25/25137d62-eb16-447d-8eca-a50669ad0b79.40033.png", "start": 57653255, "end": 57684645}, {"filename": "/test/assets/resources/native/25/252e2c63-195c-47ec-b8a7-75e81f0ba74c@25893.c8ff0.bin", "start": 57684645, "end": 57684849}, {"filename": "/test/assets/resources/native/25/25482c83-d8a9-41ab-94d2-413757e6ef9e@22cd2.42aa1.bin", "start": 57684849, "end": 57741411}, {"filename": "/test/assets/resources/native/25/254967f9-a7e1-4fea-95cc-faa1cfd9db26.93821.png", "start": 57741411, "end": 57742132}, {"filename": "/test/assets/resources/native/25/2597774a-a3e9-44d6-b660-d7dc435a57d8@56cd8.7d0e6.bin", "start": 57742132, "end": 57750164}, {"filename": "/test/assets/resources/native/26/26105225-4571-4ab8-9ff0-9f33d58154bf@f3041.68e66.bin", "start": 57750164, "end": 57773052}, {"filename": "/test/assets/resources/native/27/270d3405-8c61-4d74-a8c8-6571456fd871.7b2d8.png", "start": 57773052, "end": 57777838}, {"filename": "/test/assets/resources/native/27/270fa878-85eb-40c9-90e7-afcdee099cbf.bc656.png", "start": 57777838, "end": 57779172}, {"filename": "/test/assets/resources/native/28/28325205-bbd6-47a5-aa54-bd0e934f3aed.90317.mp3", "start": 57779172, "end": 57792348, "audio": 1}, {"filename": "/test/assets/resources/native/28/28626b1a-8975-47ce-ac6f-e9d4c77fcec0.3d95f.png", "start": 57792348, "end": 57817643}, {"filename": "/test/assets/resources/native/28/28e4a828-94c1-412e-a246-430da1282982.e1670.mp3", "start": 57817643, "end": 57837749, "audio": 1}, {"filename": "/test/assets/resources/native/28/28ff219a-c7df-4215-9216-2a78a16157a1@38dfd.97db1.bin", "start": 57837749, "end": 57843649}, {"filename": "/test/assets/resources/native/29/290d7890-5579-4388-b8a3-1bf2a6912c7e@9177b.bcdc0.bin", "start": 57843649, "end": 57843853}, {"filename": "/test/assets/resources/native/29/2944eefc-d316-4d3a-81fe-cc2f1a307681.38a0a.png", "start": 57843853, "end": 57863635}, {"filename": "/test/assets/resources/native/29/294c6938-f4f3-411c-ba86-7e51f4fda139.4f071.astc", "start": 57863635, "end": 57929187}, {"filename": "/test/assets/resources/native/29/294c6938-f4f3-411c-ba86-7e51f4fda139.4f071.png", "start": 57929187, "end": 57977868}, {"filename": "/test/assets/resources/native/29/294f17cf-1faf-4676-810f-7c0a5d55effe.4e47b.png", "start": 57977868, "end": 58017054}, {"filename": "/test/assets/resources/native/29/297456dc-c8d3-46b7-9660-98121a08b00e.63273.astc", "start": 58017054, "end": 58366850}, {"filename": "/test/assets/resources/native/29/297456dc-c8d3-46b7-9660-98121a08b00e.63273.png", "start": 58366850, "end": 59160838}, {"filename": "/test/assets/resources/native/29/29aef358-76ea-419d-8776-6662e3c0b9c7.fa6f3.astc", "start": 59160838, "end": 59226390}, {"filename": "/test/assets/resources/native/29/29aef358-76ea-419d-8776-6662e3c0b9c7.fa6f3.png", "start": 59226390, "end": 59321809}, {"filename": "/test/assets/resources/native/2a/2a02ded8-d2f2-4f64-92e0-8472102d8f22.21d9a.mp3", "start": 59321809, "end": 59328135, "audio": 1}, {"filename": "/test/assets/resources/native/2a/2a081bc0-518f-4524-ae9a-88d603aa6610.b54e7.astc", "start": 59328135, "end": 59677931}, {"filename": "/test/assets/resources/native/2a/2a081bc0-518f-4524-ae9a-88d603aa6610.b54e7.png", "start": 59677931, "end": 60053525}, {"filename": "/test/assets/resources/native/2a/2aae5191-cb7f-4ea6-9951-b9a309341c32@0ef90.4a8b7.bin", "start": 60053525, "end": 60172769}, {"filename": "/test/assets/resources/native/2a/2aff743f-fa5d-4a8f-9ea0-5522e53c8cc1.2026e.png", "start": 60172769, "end": 60175895}, {"filename": "/test/assets/resources/native/2b/2b593205-c08e-43d1-8393-633ca96a764b.8207d.mp3", "start": 60175895, "end": 60431680, "audio": 1}, {"filename": "/test/assets/resources/native/2b/2bb0f0f4-4d1a-4799-8e4b-87fe9aacaf69.612df.astc", "start": 60431680, "end": 60497232}, {"filename": "/test/assets/resources/native/2b/2bb0f0f4-4d1a-4799-8e4b-87fe9aacaf69.612df.png", "start": 60497232, "end": 60583182}, {"filename": "/test/assets/resources/native/2b/2bd9ea93-8173-4a4a-a46f-e59f7d1ed365.bbd8c.png", "start": 60583182, "end": 60591579}, {"filename": "/test/assets/resources/native/2b/2bf64230-51e3-4a7e-b791-9d310659d34a.7eebd.png", "start": 60591579, "end": 60600785}, {"filename": "/test/assets/resources/native/2c/2c0027b3-a093-49ea-b13d-5b72e9789112.d269e.astc", "start": 60600785, "end": 60666337}, {"filename": "/test/assets/resources/native/2c/2c0027b3-a093-49ea-b13d-5b72e9789112.d269e.png", "start": 60666337, "end": 60773534}, {"filename": "/test/assets/resources/native/2c/2cc529dc-0809-40fb-9797-1e2067c88a40.dec33.png", "start": 60773534, "end": 60865912}, {"filename": "/test/assets/resources/native/2c/2ccea738-8fa4-47d2-9d51-36be60dca9eb.b4e52.astc", "start": 60865912, "end": 60931464}, {"filename": "/test/assets/resources/native/2c/2ccea738-8fa4-47d2-9d51-36be60dca9eb.b4e52.png", "start": 60931464, "end": 61008354}, {"filename": "/test/assets/resources/native/2d/2d0eacb2-6995-4e4a-9270-528ae62ecde7@ba04b.d800f.bin", "start": 61008354, "end": 62737662}, {"filename": "/test/assets/resources/native/2d/2d1ece14-4c70-437b-951b-aeeb8a6fa843.e64b4.png", "start": 62737662, "end": 62738527}, {"filename": "/test/assets/resources/native/2d/2d727902-9220-4354-bdc8-97bc852fd09c@13ee1.e7ad4.bin", "start": 62738527, "end": 62896263}, {"filename": "/test/assets/resources/native/2d/2de47b08-7e68-4131-9d3a-35ff55ce76b4.9998e.astc", "start": 62896263, "end": 62961815}, {"filename": "/test/assets/resources/native/2d/2de47b08-7e68-4131-9d3a-35ff55ce76b4.9998e.png", "start": 62961815, "end": 63112936}, {"filename": "/test/assets/resources/native/2e/2e11c079-0ebd-4bfe-96a5-840918350387.da673.astc", "start": 63112936, "end": 63178488}, {"filename": "/test/assets/resources/native/2e/2e11c079-0ebd-4bfe-96a5-840918350387.da673.png", "start": 63178488, "end": 63234735}, {"filename": "/test/assets/resources/native/2e/2ed99ad3-31de-4ba6-930a-fbec5c5ce1c5@86c92.d844c.bin", "start": 63234735, "end": 63262695}, {"filename": "/test/assets/resources/native/2e/2eedfbd6-f7d9-4a08-95d2-6d52f3e36ea3@2ce22.e06d4.bin", "start": 63262695, "end": 63277367}, {"filename": "/test/assets/resources/native/2e/2ef1ae9c-271a-45d2-b3b4-0b8ce47c04d2@ef396.ea8bc.bin", "start": 63277367, "end": 63288247}, {"filename": "/test/assets/resources/native/2e/2ef295c6-48b1-4bab-be8d-9a15cb9b9929.f323a.astc", "start": 63288247, "end": 63375879}, {"filename": "/test/assets/resources/native/2e/2ef295c6-48b1-4bab-be8d-9a15cb9b9929.f323a.png", "start": 63375879, "end": 63460270}, {"filename": "/test/assets/resources/native/2f/2f2835a7-ca6e-4f1b-9282-8e60e0f14973.8e307.png", "start": 63460270, "end": 63466905}, {"filename": "/test/assets/resources/native/2f/2f389e41-e23f-48e0-9ad2-5aacd5122654.45b9c.astc", "start": 63466905, "end": 63532457}, {"filename": "/test/assets/resources/native/2f/2f389e41-e23f-48e0-9ad2-5aacd5122654.45b9c.png", "start": 63532457, "end": 63651857}, {"filename": "/test/assets/resources/native/30/30d7f6e7-1ad9-40e8-9854-77abd1a4982a.fe995.mp3", "start": 63651857, "end": 63660260, "audio": 1}, {"filename": "/test/assets/resources/native/30/30e0e74b-e4fa-4028-b459-20a6d0afb530.3bfec.png", "start": 63660260, "end": 63795186}, {"filename": "/test/assets/resources/native/31/31322671-04c8-4ff9-840d-247126416ab2@a34ab.17e4a.bin", "start": 63795186, "end": 63795422}, {"filename": "/test/assets/resources/native/31/3132b19b-08e6-415c-84e2-5d8c66b9b616.be4cb.png", "start": 63795422, "end": 63815114}, {"filename": "/test/assets/resources/native/31/315f85a9-d690-4ed8-a1fd-b892c49c9b34@c1860.78e9f.bin", "start": 63815114, "end": 64052746}, {"filename": "/test/assets/resources/native/31/3190e155-df63-4eaf-9cc6-d1f4a6d5fde4@555c0.29b7d.bin", "start": 64052746, "end": 64434242}, {"filename": "/test/assets/resources/native/31/31a5ae68-b6c9-420d-9a7a-c8cadb907eb1.0ced9.jpg", "start": 64434242, "end": 64486985}, {"filename": "/test/assets/resources/native/32/322e2a9e-af83-485f-bc82-9f9ae4ec09bf@63560.86e66.bin", "start": 64486985, "end": 64549977}, {"filename": "/test/assets/resources/native/32/323bcc7c-c1dd-4261-9fd9-0af73ccece9b.24ed1.astc", "start": 64549977, "end": 64615529}, {"filename": "/test/assets/resources/native/32/323bcc7c-c1dd-4261-9fd9-0af73ccece9b.24ed1.png", "start": 64615529, "end": 64674497}, {"filename": "/test/assets/resources/native/32/325c1671-34be-4a6f-9ed4-45b2d1c4faed@3eafc.7eded.bin", "start": 64674497, "end": 65350733}, {"filename": "/test/assets/resources/native/32/326aca67-0dae-4620-b972-9c4b57f1ffa8.c1204.mp3", "start": 65350733, "end": 65363733, "audio": 1}, {"filename": "/test/assets/resources/native/32/32900ead-4264-4935-b2ae-b6c970aeeb7b.9c248.astc", "start": 65363733, "end": 65713529}, {"filename": "/test/assets/resources/native/32/32900ead-4264-4935-b2ae-b6c970aeeb7b.9c248.png", "start": 65713529, "end": 66183119}, {"filename": "/test/assets/resources/native/32/329ea8de-b65b-48f5-8aa1-69a9e7eb0541.b69e5.astc", "start": 66183119, "end": 66248671}, {"filename": "/test/assets/resources/native/32/329ea8de-b65b-48f5-8aa1-69a9e7eb0541.b69e5.png", "start": 66248671, "end": 66406366}, {"filename": "/test/assets/resources/native/32/32f0a91e-22d0-4c03-9840-2741cf28dfeb@997a3.be72b.bin", "start": 66406366, "end": 66411914}, {"filename": "/test/assets/resources/native/32/32f676e7-0150-4e1c-8151-45dc08eca84a.2019d.astc", "start": 66411914, "end": 66477466}, {"filename": "/test/assets/resources/native/32/32f676e7-0150-4e1c-8151-45dc08eca84a.2019d.png", "start": 66477466, "end": 66717722}, {"filename": "/test/assets/resources/native/33/330be5b5-309a-4d2d-91f2-f132c2de89ff.43cc8.png", "start": 66717722, "end": 67121012}, {"filename": "/test/assets/resources/native/33/330c187c-03a3-41ad-b34f-c198ca9c194e@9db30.9399a.bin", "start": 67121012, "end": 67124352}, {"filename": "/test/assets/resources/native/33/330ca088-dc38-474d-99fc-81f0013eced5.f2931.astc", "start": 67124352, "end": 67474148}, {"filename": "/test/assets/resources/native/33/330ca088-dc38-474d-99fc-81f0013eced5.f2931.png", "start": 67474148, "end": 67562336}, {"filename": "/test/assets/resources/native/33/331da1a2-42f7-4ec0-8e42-4e0a833f95d6.8717f.astc", "start": 67562336, "end": 67627888}, {"filename": "/test/assets/resources/native/33/331da1a2-42f7-4ec0-8e42-4e0a833f95d6.8717f.png", "start": 67627888, "end": 67755901}, {"filename": "/test/assets/resources/native/33/3362f9bc-3ba7-4f82-8848-463e2b1ee4ae.8a519.astc", "start": 67755901, "end": 67821453}, {"filename": "/test/assets/resources/native/33/3362f9bc-3ba7-4f82-8848-463e2b1ee4ae.8a519.png", "start": 67821453, "end": 67874708}, {"filename": "/test/assets/resources/native/33/3372d904-95f4-4b5a-89cd-d7bcbccbd414.898bd.astc", "start": 67874708, "end": 67940260}, {"filename": "/test/assets/resources/native/33/3372d904-95f4-4b5a-89cd-d7bcbccbd414.898bd.png", "start": 67940260, "end": 67999564}, {"filename": "/test/assets/resources/native/33/33e68f2f-d8be-48c6-9ab9-510b019edd4f.e3a9a.mp3", "start": 67999564, "end": 68011310, "audio": 1}, {"filename": "/test/assets/resources/native/34/344b7e16-4987-490e-8071-f21bc70f10a9@ecc57.b90be.bin", "start": 68011310, "end": 68011514}, {"filename": "/test/assets/resources/native/35/356c4edd-7903-4276-b861-b76b450649a9.7e62f.png", "start": 68011514, "end": 68084710}, {"filename": "/test/assets/resources/native/36/363b9a27-49e9-447b-b734-682e54b8c84e@ff16b.41aae.bin", "start": 68084710, "end": 68086634}, {"filename": "/test/assets/resources/native/36/3673bb5c-eedb-4a06-b29f-78b5a83014e5.e2a6b.astc", "start": 68086634, "end": 68174266}, {"filename": "/test/assets/resources/native/36/3673bb5c-eedb-4a06-b29f-78b5a83014e5.e2a6b.png", "start": 68174266, "end": 68191496}, {"filename": "/test/assets/resources/native/36/367e7d45-24c8-4977-acb8-22cd47faced1.7d683.png", "start": 68191496, "end": 68216816}, {"filename": "/test/assets/resources/native/36/36ca44d5-f96b-4075-891f-1477fc98a425.22a4d.png", "start": 68216816, "end": 68232193}, {"filename": "/test/assets/resources/native/37/370d442a-62bc-4a7b-978e-ce9af9c02581.31024.astc", "start": 68232193, "end": 68319825}, {"filename": "/test/assets/resources/native/37/370d442a-62bc-4a7b-978e-ce9af9c02581.31024.png", "start": 68319825, "end": 68321783}, {"filename": "/test/assets/resources/native/37/37256cae-e555-4811-b415-c818e29ae707.dbdbc.mp3", "start": 68321783, "end": 68327678, "audio": 1}, {"filename": "/test/assets/resources/native/37/373d2166-3ca4-428e-aa3f-7aaccfcc3734@a893f.a486d.bin", "start": 68327678, "end": 68352326}, {"filename": "/test/assets/resources/native/37/374f2b5b-6568-4bc5-81b6-6b53910aec19.7bb12.png", "start": 68352326, "end": 68367635}, {"filename": "/test/assets/resources/native/37/37c70ac2-2bbb-4772-a115-21752f8c5550.8b124.png", "start": 68367635, "end": 68475944}, {"filename": "/test/assets/resources/native/37/37c79f1d-ff7a-46b4-b0f0-fc2b78196769.34112.png", "start": 68475944, "end": 68477385}, {"filename": "/test/assets/resources/native/37/37e60e90-6a03-4d6a-945d-8b995450163f.dde9c.astc", "start": 68477385, "end": 68542937}, {"filename": "/test/assets/resources/native/37/37e60e90-6a03-4d6a-945d-8b995450163f.dde9c.png", "start": 68542937, "end": 68644244}, {"filename": "/test/assets/resources/native/37/37ec2449-660d-4feb-b2e0-7a7c59e5389b@1bc1a.df35c.bin", "start": 68644244, "end": 68648280}, {"filename": "/test/assets/resources/native/38/3886ea12-c4b9-4acd-a320-783a1bf22700.fe277.astc", "start": 68648280, "end": 68735912}, {"filename": "/test/assets/resources/native/38/3886ea12-c4b9-4acd-a320-783a1bf22700.fe277.png", "start": 68735912, "end": 68808434}, {"filename": "/test/assets/resources/native/38/38d53889-6938-49db-b4fa-e07f2318430d.67c95.png", "start": 68808434, "end": 73543897}, {"filename": "/test/assets/resources/native/39/397f283c-c381-42e8-950b-53adf2e3cd4a.c15d7.astc", "start": 73543897, "end": 73893693}, {"filename": "/test/assets/resources/native/39/397f283c-c381-42e8-950b-53adf2e3cd4a.c15d7.png", "start": 73893693, "end": 74327843}, {"filename": "/test/assets/resources/native/39/398ed599-837e-47ab-83f4-c9bffd1c97bc@5c714.4878e.bin", "start": 74327843, "end": 74338739}, {"filename": "/test/assets/resources/native/3a/3a6c74c9-baa2-41d3-9499-0adbff247839.7a018.png", "start": 74338739, "end": 74371731}, {"filename": "/test/assets/resources/native/3a/3a845179-3534-4593-bae4-427c08e32253@6fbb0.78645.bin", "start": 74371731, "end": 74371935}, {"filename": "/test/assets/resources/native/3a/3a8ed455-6cab-4774-8d51-728da2bf2aee.f6f0e.mp3", "start": 74371935, "end": 74419208, "audio": 1}, {"filename": "/test/assets/resources/native/3a/3ae3cb22-0dd5-4741-981b-b3c7a32fb521.a6782.png", "start": 74419208, "end": 74767776}, {"filename": "/test/assets/resources/native/3b/3b03128a-fbae-4e15-912f-4ea6c0a05802.fe11b.png", "start": 74767776, "end": 84976460}, {"filename": "/test/assets/resources/native/3b/3bb80904-354c-48fb-a344-8cd0ae962ff8.e8af9.astc", "start": 84976460, "end": 85064092}, {"filename": "/test/assets/resources/native/3b/3bb80904-354c-48fb-a344-8cd0ae962ff8.e8af9.pkm", "start": 85064092, "end": 85239076}, {"filename": "/test/assets/resources/native/3b/3bb80904-354c-48fb-a344-8cd0ae962ff8.e8af9.png", "start": 85239076, "end": 85251367}, {"filename": "/test/assets/resources/native/3b/3bb80904-354c-48fb-a344-8cd0ae962ff8.e8af9.pvr", "start": 85251367, "end": 85426933}, {"filename": "/test/assets/resources/native/3b/3beca05f-03c6-455d-83d2-29cf504b2e51.4a79b.astc", "start": 85426933, "end": 85492485}, {"filename": "/test/assets/resources/native/3b/3beca05f-03c6-455d-83d2-29cf504b2e51.4a79b.png", "start": 85492485, "end": 85637781}, {"filename": "/test/assets/resources/native/3c/3c0e9e25-9ef6-45d5-b003-13c4c8d56bb6@7890e.5562d.bin", "start": 85637781, "end": 85709085}, {"filename": "/test/assets/resources/native/3c/3c0e9e25-9ef6-45d5-b003-13c4c8d56bb6@fa53a.28fb1.bin", "start": 85709085, "end": 86041737}, {"filename": "/test/assets/resources/native/3c/3c154a77-fe10-442e-a5e7-f5e17d87984c@b1359.769d7.bin", "start": 86041737, "end": 86044653}, {"filename": "/test/assets/resources/native/3c/3cb7c32c-260f-4685-b262-69e131454ec3@9088e.4c5f8.bin", "start": 86044653, "end": 86337365}, {"filename": "/test/assets/resources/native/3c/3cde4514-84bd-4412-8713-6ad57ea93e4f.98d3d.png", "start": 86337365, "end": 86339951}, {"filename": "/test/assets/resources/native/3d/3d26e768-0dee-47d8-9ab3-3f8fecf13df6@7aaeb.f8896.bin", "start": 86339951, "end": 86340155}, {"filename": "/test/assets/resources/native/3d/3d42d1c0-62c6-454c-b404-eeda9d52711f.0407e.png", "start": 86340155, "end": 86356765}, {"filename": "/test/assets/resources/native/3d/3d5d392f-5e78-4f86-a85d-4f082aaaa8c4.70a8b.astc", "start": 86356765, "end": 86422317}, {"filename": "/test/assets/resources/native/3d/3d5d392f-5e78-4f86-a85d-4f082aaaa8c4.70a8b.png", "start": 86422317, "end": 86595436}, {"filename": "/test/assets/resources/native/3d/3d976ab3-a70a-4a86-82c3-256b92c873f4@f34d3.574ca.bin", "start": 86595436, "end": 86595640}, {"filename": "/test/assets/resources/native/3d/3dc9a88a-56a4-4f66-b13b-cf576a146dd2.1b1a5.astc", "start": 86595640, "end": 86661192}, {"filename": "/test/assets/resources/native/3d/3dc9a88a-56a4-4f66-b13b-cf576a146dd2.1b1a5.png", "start": 86661192, "end": 86755766}, {"filename": "/test/assets/resources/native/3d/3dd78092-38cb-4810-b1a4-eaa64d79bbc5@ecb85.f8514.bin", "start": 86755766, "end": 86758174}, {"filename": "/test/assets/resources/native/3d/3dfb29b7-17d9-4e7b-bd84-a44f1178ab9f.bff8d.astc", "start": 86758174, "end": 86823726}, {"filename": "/test/assets/resources/native/3d/3dfb29b7-17d9-4e7b-bd84-a44f1178ab9f.bff8d.png", "start": 86823726, "end": 86941676}, {"filename": "/test/assets/resources/native/3e/3e563446-e1ed-4262-aefc-a612e856c99d.119f4.astc", "start": 86941676, "end": 87007228}, {"filename": "/test/assets/resources/native/3e/3e563446-e1ed-4262-aefc-a612e856c99d.119f4.png", "start": 87007228, "end": 87229090}, {"filename": "/test/assets/resources/native/3e/3e692fe3-0529-41ae-adf2-045a6d9127fc.d5e8f.mp3", "start": 87229090, "end": 87249569, "audio": 1}, {"filename": "/test/assets/resources/native/3e/3e6aad21-ef64-4696-8b24-742558fae49a@1dea9.1c3e0.bin", "start": 87249569, "end": 88266035}, {"filename": "/test/assets/resources/native/3e/3e9efcce-9285-46ea-aafc-45e1cecb113b@00095.f2c31.bin", "start": 88266035, "end": 88289679}, {"filename": "/test/assets/resources/native/3e/3eb2fd37-5024-47ca-86c3-1c4d25fc095a.8b0e8.astc", "start": 88289679, "end": 88355231}, {"filename": "/test/assets/resources/native/3e/3eb2fd37-5024-47ca-86c3-1c4d25fc095a.8b0e8.png", "start": 88355231, "end": 88358303}, {"filename": "/test/assets/resources/native/3e/3ebdac73-5148-4cfb-b99c-2183f085852a@db573.37664.bin", "start": 88358303, "end": 88358507}, {"filename": "/test/assets/resources/native/3e/3ec0167b-26ae-4e12-92db-b089174c6092@6296c.2234d.bin", "start": 88358507, "end": 89168211}, {"filename": "/test/assets/resources/native/3e/3ed52af3-c6ec-4db0-979a-0c004495455b.f1a6b.mp3", "start": 89168211, "end": 89177868, "audio": 1}, {"filename": "/test/assets/resources/native/3f/3f367c42-1b98-41d7-9b6d-3c05e15b52be.d2936.astc", "start": 89177868, "end": 89243420}, {"filename": "/test/assets/resources/native/3f/3f367c42-1b98-41d7-9b6d-3c05e15b52be.d2936.png", "start": 89243420, "end": 89264726}, {"filename": "/test/assets/resources/native/3f/3f968fe4-77b8-431d-a8ea-fd391d0a826a.1f155.astc", "start": 89264726, "end": 89330278}, {"filename": "/test/assets/resources/native/3f/3f968fe4-77b8-431d-a8ea-fd391d0a826a.1f155.png", "start": 89330278, "end": 89408922}, {"filename": "/test/assets/resources/native/3f/3fae3185-8755-4f4c-8eb3-0bea4b73bb89.d5642.astc", "start": 89408922, "end": 89758718}, {"filename": "/test/assets/resources/native/3f/3fae3185-8755-4f4c-8eb3-0bea4b73bb89.d5642.png", "start": 89758718, "end": 90109167}, {"filename": "/test/assets/resources/native/3f/3fbca3ca-083a-4ffe-94c6-4e0b070d8599@2678b.f85ac.bin", "start": 90109167, "end": 90109403}, {"filename": "/test/assets/resources/native/3f/3fef4446-10db-4393-818d-13af16b95635.ca766.astc", "start": 90109403, "end": 90459199}, {"filename": "/test/assets/resources/native/3f/3fef4446-10db-4393-818d-13af16b95635.ca766.png", "start": 90459199, "end": 90460382}, {"filename": "/test/assets/resources/native/40/400bd7ea-d0f9-4e0b-9a5c-f2bbef458adc.8d1c6.png", "start": 90460382, "end": 90479876}, {"filename": "/test/assets/resources/native/40/40bfcc30-e0d9-4673-ac5b-22686987cbff.961d4.astc", "start": 90479876, "end": 90545428}, {"filename": "/test/assets/resources/native/40/40bfcc30-e0d9-4673-ac5b-22686987cbff.961d4.png", "start": 90545428, "end": 90599710}, {"filename": "/test/assets/resources/native/40/40c1d22c-7a33-46d4-b2e5-d1d1395080d5@2c854.e4ecc.bin", "start": 90599710, "end": 90833486}, {"filename": "/test/assets/resources/native/40/40c38f70-4ac0-47d8-9e93-55bca65cb078.8a479.astc", "start": 90833486, "end": 90921118}, {"filename": "/test/assets/resources/native/40/40c38f70-4ac0-47d8-9e93-55bca65cb078.8a479.png", "start": 90921118, "end": 90942139}, {"filename": "/test/assets/resources/native/41/4142d130-cedf-4d9c-8e93-5a559c5fa569.eb897.png", "start": 90942139, "end": 92646842}, {"filename": "/test/assets/resources/native/41/41613331-0871-4515-9bcd-c689b61c9c79.8a8a0.mp3", "start": 92646842, "end": 92649811, "audio": 1}, {"filename": "/test/assets/resources/native/41/417f46a8-5124-4159-a472-4dedf9aca8f3.40717.mp3", "start": 92649811, "end": 92672743, "audio": 1}, {"filename": "/test/assets/resources/native/41/41af51cd-a86d-40f7-af0e-7059deab3f14@23b14.ab8ed.bin", "start": 92672743, "end": 92757139}, {"filename": "/test/assets/resources/native/41/41bea072-694a-41de-8e55-8876ad8f8439.80628.astc", "start": 92757139, "end": 92822691}, {"filename": "/test/assets/resources/native/41/41bea072-694a-41de-8e55-8876ad8f8439.80628.png", "start": 92822691, "end": 92977732}, {"filename": "/test/assets/resources/native/41/41e1f43c-a1a4-49a1-96df-312efcc62c05@c8ff7.3f057.bin", "start": 92977732, "end": 93060556}, {"filename": "/test/assets/resources/native/41/41e2ba42-cac8-403e-93b5-edd9430f41cc@c87e6.20d44.bin", "start": 93060556, "end": 93088516}, {"filename": "/test/assets/resources/native/42/428828df-9070-4466-9dee-51e39b786b18.b6cc0.astc", "start": 93088516, "end": 93154068}, {"filename": "/test/assets/resources/native/42/428828df-9070-4466-9dee-51e39b786b18.b6cc0.png", "start": 93154068, "end": 93335898}, {"filename": "/test/assets/resources/native/43/4320aeb4-cddf-44d7-81fd-3fe1f765fc93@6520e.ee8d9.bin", "start": 93335898, "end": 93339026}, {"filename": "/test/assets/resources/native/43/43738360-524f-4d2b-9d66-f3e94a6480ae.3911f.astc", "start": 93339026, "end": 93426658}, {"filename": "/test/assets/resources/native/43/43738360-524f-4d2b-9d66-f3e94a6480ae.3911f.png", "start": 93426658, "end": 93554721}, {"filename": "/test/assets/resources/native/43/437c45c0-f168-4028-af0c-362f301cf911.55155.astc", "start": 93554721, "end": 93620273}, {"filename": "/test/assets/resources/native/43/437c45c0-f168-4028-af0c-362f301cf911.55155.png", "start": 93620273, "end": 93806578}, {"filename": "/test/assets/resources/native/43/43cdaaf2-c7da-4ce9-9387-b8ef053b1e3f@d0fa6.4fb94.bin", "start": 93806578, "end": 93810154}, {"filename": "/test/assets/resources/native/43/43d60e71-4b7b-430c-a059-b0a839655bb7@a2fa6.cc0ed.bin", "start": 93810154, "end": 93825602}, {"filename": "/test/assets/resources/native/44/445730e1-3896-4022-acf5-c6e6fe0ed92c@b8108.aa255.bin", "start": 93825602, "end": 93830870}, {"filename": "/test/assets/resources/native/44/4460ecbf-541e-4abb-ab2a-bed428707bfc@5cb7f.815ff.bin", "start": 93830870, "end": 94299870}, {"filename": "/test/assets/resources/native/44/446de997-f8d0-45f4-b2c6-710789e063f4@07ab1.7ecb2.bin", "start": 94299870, "end": 94593550}, {"filename": "/test/assets/resources/native/44/449b4528-500a-4303-ba35-93cd6402c9f9@fe268.a4151.bin", "start": 94593550, "end": 94594570}, {"filename": "/test/assets/resources/native/44/44bb5c2b-7a0c-43fb-b104-3fd3fa723b1e.f748f.astc", "start": 94594570, "end": 94660122}, {"filename": "/test/assets/resources/native/44/44bb5c2b-7a0c-43fb-b104-3fd3fa723b1e.f748f.png", "start": 94660122, "end": 94822462}, {"filename": "/test/assets/resources/native/44/44c21028-9ba7-496a-ab49-56c74c07cd23.d7b7d.mp3", "start": 94822462, "end": 94838806, "audio": 1}, {"filename": "/test/assets/resources/native/44/44da27af-2b45-4d46-a4af-c950fbcc435a@11566.b375d.bin", "start": 94838806, "end": 95012290}, {"filename": "/test/assets/resources/native/44/44ee4ec9-96a7-4313-be5a-7494db31e230.74c57.png", "start": 95012290, "end": 96112229}, {"filename": "/test/assets/resources/native/45/45a24d19-f12f-4bdb-a6c4-47f47931cc5c@40885.5bfc1.bin", "start": 96112229, "end": 96401037}, {"filename": "/test/assets/resources/native/45/45ef2dea-2c3c-4a83-a195-bfac467deeb9.7345c.png", "start": 96401037, "end": 96487940}, {"filename": "/test/assets/resources/native/46/46421fe1-e0e3-4285-8cf6-05d9983faed9.c1204.mp3", "start": 96487940, "end": 96500940, "audio": 1}, {"filename": "/test/assets/resources/native/46/464cbd38-37aa-4e59-bb10-4a0a800a480c.57b85.mp3", "start": 96500940, "end": 96503943, "audio": 1}, {"filename": "/test/assets/resources/native/46/46587a94-a3c9-4abc-87fc-a080b9a64afb@76243.5627c.bin", "start": 96503943, "end": 96504147}, {"filename": "/test/assets/resources/native/46/4692bf9a-0284-4b26-b234-29f63108c8aa@ea748.632d1.bin", "start": 96504147, "end": 97023923}, {"filename": "/test/assets/resources/native/46/46fe4956-3b13-4bea-a147-1450cb8a2039@1071b.24180.bin", "start": 97023923, "end": 97266095}, {"filename": "/test/assets/resources/native/46/46ff2f4b-2173-49a7-95cf-127aa317bc52.8b029.astc", "start": 97266095, "end": 97331647}, {"filename": "/test/assets/resources/native/46/46ff2f4b-2173-49a7-95cf-127aa317bc52.8b029.png", "start": 97331647, "end": 97367558}, {"filename": "/test/assets/resources/native/47/4787ce77-72de-4a39-9729-18482a476a05@4cffa.675c1.bin", "start": 97367558, "end": 97503326}, {"filename": "/test/assets/resources/native/47/4799533d-f3a8-49dc-af60-d2989be2d0ad@a149f.4c4c8.bin", "start": 97503326, "end": 97539622}, {"filename": "/test/assets/resources/native/48/4812f7e7-70fc-4723-8eab-f9785c310d09@5db31.e8941.bin", "start": 97539622, "end": 97548654}, {"filename": "/test/assets/resources/native/49/490053da-ca40-4757-9c92-c85243f11174@16b27.f6197.bin", "start": 97548654, "end": 97548858}, {"filename": "/test/assets/resources/native/49/4946c235-92ea-4f61-898d-4a7369fe3008.6fe58.astc", "start": 97548858, "end": 97614410}, {"filename": "/test/assets/resources/native/49/4946c235-92ea-4f61-898d-4a7369fe3008.6fe58.png", "start": 97614410, "end": 97666086}, {"filename": "/test/assets/resources/native/49/499a7739-1c98-42af-a3b9-157ac5b92048.f17e5.png", "start": 97666086, "end": 97693958}, {"filename": "/test/assets/resources/native/49/49c52180-aa70-452a-b81d-523c45e15bdf.0342e.png", "start": 97693958, "end": 97767078}, {"filename": "/test/assets/resources/native/49/49e7f8f0-9ee9-4f9e-bed6-39c09c88aa2e@be633.20cea.bin", "start": 97767078, "end": 101148210}, {"filename": "/test/assets/resources/native/49/49fb1af3-3469-4e2c-b788-e0040b7d1ec0@731d9.076b6.bin", "start": 101148210, "end": 101239506}, {"filename": "/test/assets/resources/native/4a/4ab89a34-1df3-4b19-80d3-dd698e890833@f04b9.9bece.bin", "start": 101239506, "end": 101518370}, {"filename": "/test/assets/resources/native/4a/4ac12b52-4645-4659-a074-b0a63fdef844.9a11d.astc", "start": 101518370, "end": 101583922}, {"filename": "/test/assets/resources/native/4a/4ac12b52-4645-4659-a074-b0a63fdef844.9a11d.png", "start": 101583922, "end": 101671189}, {"filename": "/test/assets/resources/native/4b/4b1e9b2b-6c05-4e3a-aefb-01a542c6cc89.ce77d.astc", "start": 101671189, "end": 101736741}, {"filename": "/test/assets/resources/native/4b/4b1e9b2b-6c05-4e3a-aefb-01a542c6cc89.ce77d.png", "start": 101736741, "end": 101815258}, {"filename": "/test/assets/resources/native/4b/4b3debb0-84e4-4609-814d-e4658e55ce28@1043b.cc8b3.bin", "start": 101815258, "end": 101873602}, {"filename": "/test/assets/resources/native/4b/4b45f086-c77d-436b-988a-c87af0776311.ce8a5.astc", "start": 101873602, "end": 101939154}, {"filename": "/test/assets/resources/native/4b/4b45f086-c77d-436b-988a-c87af0776311.ce8a5.png", "start": 101939154, "end": 102156564}, {"filename": "/test/assets/resources/native/4b/4b716c8b-6d47-40b2-aa79-5c9b45efb265@8796e.97f3b.bin", "start": 102156564, "end": 102156768}, {"filename": "/test/assets/resources/native/4b/4b7aefee-db14-4a25-9512-b061087148df@2c228.22276.bin", "start": 102156768, "end": 102171440}, {"filename": "/test/assets/resources/native/4b/4b8400af-0220-4898-9f09-c10d48a15fdf.340be.astc", "start": 102171440, "end": 102236992}, {"filename": "/test/assets/resources/native/4b/4b8400af-0220-4898-9f09-c10d48a15fdf.340be.png", "start": 102236992, "end": 102317854}, {"filename": "/test/assets/resources/native/4b/4bad3a52-0f85-4f8e-a0e5-3f61698d19e7.5139d.png", "start": 102317854, "end": 102317985}, {"filename": "/test/assets/resources/native/4b/4bcd8e2f-9748-4f97-84ae-99fa22536ca5.11820.astc", "start": 102317985, "end": 102383537}, {"filename": "/test/assets/resources/native/4b/4bcd8e2f-9748-4f97-84ae-99fa22536ca5.11820.png", "start": 102383537, "end": 102473771}, {"filename": "/test/assets/resources/native/4b/4bf46133-88c1-474b-a5e8-dcf8fae27fce.886d2.astc", "start": 102473771, "end": 102539323}, {"filename": "/test/assets/resources/native/4b/4bf46133-88c1-474b-a5e8-dcf8fae27fce.886d2.png", "start": 102539323, "end": 102637545}, {"filename": "/test/assets/resources/native/4c/4c49337d-c588-4444-aa82-c8e8e4da435a@74917.c4938.bin", "start": 102637545, "end": 102638961}, {"filename": "/test/assets/resources/native/4c/4cf4980a-f689-4a77-a85e-7544e971ba9d@60f3e.c69dc.bin", "start": 102638961, "end": 102661121}, {"filename": "/test/assets/resources/native/4e/4e08f6aa-2d3d-4ca5-8c84-470f0425ae02.975a2.mp3", "start": 102661121, "end": 102674176, "audio": 1}, {"filename": "/test/assets/resources/native/4e/4e75bbaa-2e3c-4a16-855d-fb8e46a85206.02b02.astc", "start": 102674176, "end": 102739728}, {"filename": "/test/assets/resources/native/4e/4e75bbaa-2e3c-4a16-855d-fb8e46a85206.02b02.png", "start": 102739728, "end": 102842115}, {"filename": "/test/assets/resources/native/4f/4f333c60-c10e-484a-b270-9fbcfaa746bb@02403.6b33e.bin", "start": 102842115, "end": 102877511}, {"filename": "/test/assets/resources/native/4f/4f466431-d39c-42de-8bf5-0a8ba3abf924.c4971.astc", "start": 102877511, "end": 102943063}, {"filename": "/test/assets/resources/native/4f/4f466431-d39c-42de-8bf5-0a8ba3abf924.c4971.png", "start": 102943063, "end": 103040272}, {"filename": "/test/assets/resources/native/4f/4f67d905-fb71-4b59-aa9a-40d087301188@8f2c2.7105d.bin", "start": 103040272, "end": 103041948}, {"filename": "/test/assets/resources/native/4f/4fa4b6dd-ee36-48fa-82d3-19d07a57ca37@bf2ed.4659b.bin", "start": 103041948, "end": 103048016}, {"filename": "/test/assets/resources/native/50/502d5f4a-ecfb-46a7-97b1-988c9ed9771a@1efe6.3c4ce.bin", "start": 103048016, "end": 104551292}, {"filename": "/test/assets/resources/native/50/502d5f4a-ecfb-46a7-97b1-988c9ed9771a@a11d0.5c3d2.bin", "start": 104551292, "end": 104866346}, {"filename": "/test/assets/resources/native/50/50470700-6efd-49ba-a0db-8906baad75de.e8d6a.astc", "start": 104866346, "end": 104931898}, {"filename": "/test/assets/resources/native/50/50470700-6efd-49ba-a0db-8906baad75de.e8d6a.png", "start": 104931898, "end": 105002679}, {"filename": "/test/assets/resources/native/50/507af127-51cc-40c7-8728-62200fb2f67e.e0e55.astc", "start": 105002679, "end": 105068231}, {"filename": "/test/assets/resources/native/50/507af127-51cc-40c7-8728-62200fb2f67e.e0e55.png", "start": 105068231, "end": 105149918}, {"filename": "/test/assets/resources/native/50/50a55969-44e0-48df-9bab-3c74ac84386b@e7988.315e6.bin", "start": 105149918, "end": 105164142}, {"filename": "/test/assets/resources/native/50/50ec137d-3e34-4faf-b90d-1da3981fee4a.32e0c.astc", "start": 105164142, "end": 105229694}, {"filename": "/test/assets/resources/native/50/50ec137d-3e34-4faf-b90d-1da3981fee4a.32e0c.png", "start": 105229694, "end": 105331023}, {"filename": "/test/assets/resources/native/51/51073387-551d-49cf-ad5f-518b395949c2.21d9a.mp3", "start": 105331023, "end": 105337349, "audio": 1}, {"filename": "/test/assets/resources/native/51/51ac389c-91d6-4e29-89e3-1019ffedf01f@21b54.db73c.bin", "start": 105337349, "end": 105469777}, {"filename": "/test/assets/resources/native/51/51b0d5f2-17dc-412c-989e-245dd10597f8.78f30.mp3", "start": 105469777, "end": 105478180, "audio": 1}, {"filename": "/test/assets/resources/native/51/51f08f90-2dbc-486f-8384-887c5acc55a2.6b3b4.astc", "start": 105478180, "end": 105565812}, {"filename": "/test/assets/resources/native/51/51f08f90-2dbc-486f-8384-887c5acc55a2.6b3b4.png", "start": 105565812, "end": 105631181}, {"filename": "/test/assets/resources/native/52/52acfb88-7a0f-48b1-b944-a5b09bee02f6@d3e2b.30070.bin", "start": 105631181, "end": 105631385}, {"filename": "/test/assets/resources/native/52/52bacad6-c98b-48b3-a9c9-c35e3b04f9dc@4a7e8.18ba6.bin", "start": 105631385, "end": 105631621}, {"filename": "/test/assets/resources/native/52/52f888ea-2a52-42ee-979f-048b09969ee5@0dbf2.eb75d.bin", "start": 105631621, "end": 105642253}, {"filename": "/test/assets/resources/native/53/53391adc-3652-4212-a6c2-309ed3758d10.47c5c.png", "start": 105642253, "end": 106470867}, {"filename": "/test/assets/resources/native/53/5359a424-3fcf-41d2-8df5-e953f257454e.209e3.astc", "start": 106470867, "end": 106733027}, {"filename": "/test/assets/resources/native/53/5359a424-3fcf-41d2-8df5-e953f257454e.209e3.png", "start": 106733027, "end": 107207821}, {"filename": "/test/assets/resources/native/54/544e49d6-3f05-4fa8-9a9e-091f98fc2ce8.83fcc.png", "start": 107207821, "end": 107208935}, {"filename": "/test/assets/resources/native/54/5453ab58-b856-4582-ac07-77a03e0257b1@d5211.bf3ff.bin", "start": 107208935, "end": 107329731}, {"filename": "/test/assets/resources/native/54/547c4424-ef00-467a-adae-b4efddabc2cd.16685.astc", "start": 107329731, "end": 107679527}, {"filename": "/test/assets/resources/native/54/547c4424-ef00-467a-adae-b4efddabc2cd.16685.png", "start": 107679527, "end": 107682134}, {"filename": "/test/assets/resources/native/54/54d86646-b3c9-40f2-b4f4-a4095b2cc8f9.f0e29.png", "start": 107682134, "end": 107709552}, {"filename": "/test/assets/resources/native/55/5529133b-75d8-41de-a661-b66f492da3d1@64ab1.67506.bin", "start": 107709552, "end": 108392112}, {"filename": "/test/assets/resources/native/55/553fea13-a4e6-40da-8f04-e00230703510@5f075.f54db.bin", "start": 108392112, "end": 108393056}, {"filename": "/test/assets/resources/native/55/554f8b04-e574-438b-91b2-6535f53d655a.e769c.astc", "start": 108393056, "end": 108458608}, {"filename": "/test/assets/resources/native/55/554f8b04-e574-438b-91b2-6535f53d655a.e769c.png", "start": 108458608, "end": 108486463}, {"filename": "/test/assets/resources/native/56/56ad64dc-e07e-4144-ab3c-2ccd7a342ab1.880d8.astc", "start": 108486463, "end": 108574095}, {"filename": "/test/assets/resources/native/56/56ad64dc-e07e-4144-ab3c-2ccd7a342ab1.880d8.png", "start": 108574095, "end": 108578367}, {"filename": "/test/assets/resources/native/56/56fac070-7e8f-4914-bd83-cc5bd31c4435@98d65.5184d.bin", "start": 108578367, "end": 108600107}, {"filename": "/test/assets/resources/native/57/5751eb31-b5df-41c5-ae8d-8940ae9ca11f@df7d1.4ea92.bin", "start": 108600107, "end": 108700115}, {"filename": "/test/assets/resources/native/57/577cf434-2d56-43b3-b2c5-f367bb1c2fef@7ea18.4eeab.bin", "start": 108700115, "end": 108700319}, {"filename": "/test/assets/resources/native/57/57986975-600c-4fd8-8383-aae587efd865@daa45.56eaa.bin", "start": 108700319, "end": 108740807}, {"filename": "/test/assets/resources/native/57/57a65937-a556-4b4f-8117-38396b2e1bb4@7afc0.267b9.bin", "start": 108740807, "end": 108741011}, {"filename": "/test/assets/resources/native/57/57f0ee06-eaad-41fa-9ebd-7fede5b368fa@f8bc9.61521.bin", "start": 108741011, "end": 108764403}, {"filename": "/test/assets/resources/native/58/585aec53-d9b3-425c-ac4e-47ad0b6a6171.0f420.mp3", "start": 108764403, "end": 109263282, "audio": 1}, {"filename": "/test/assets/resources/native/58/589eec03-2cad-42e7-a12a-bf98f70d3802.0af14.png", "start": 109263282, "end": 109266506}, {"filename": "/test/assets/resources/native/58/58a95440-4056-4088-8c8e-2858cd93a082.4853e.png", "start": 109266506, "end": 109283602}, {"filename": "/test/assets/resources/native/58/58dff19c-572e-4979-83c5-03d1a6d43160.1ccf6.png", "start": 109283602, "end": 109285180}, {"filename": "/test/assets/resources/native/58/58ed37e3-0c42-48ca-9f3b-29a0d37037f9@35637.2506a.bin", "start": 109285180, "end": 109329460}, {"filename": "/test/assets/resources/native/59/590ca7c5-78c7-4b15-b91f-3e365c01682a.fd225.png", "start": 109329460, "end": 109343272}, {"filename": "/test/assets/resources/native/59/59304230-ccc5-4b2d-9b14-1631e34c0c45@c7fdb.c272d.bin", "start": 109343272, "end": 109858256}, {"filename": "/test/assets/resources/native/59/59343c3c-571b-450a-a441-e66196b43f4a.50fe9.astc", "start": 109858256, "end": 109923808}, {"filename": "/test/assets/resources/native/59/59343c3c-571b-450a-a441-e66196b43f4a.50fe9.png", "start": 109923808, "end": 110039440}, {"filename": "/test/assets/resources/native/59/5967e757-d57e-445d-9493-4e58fa0251a2.46562.png", "start": 110039440, "end": 110040890}, {"filename": "/test/assets/resources/native/59/59968ddf-18a0-45ea-9e0c-6620cae31505.ea677.astc", "start": 110040890, "end": 110106442}, {"filename": "/test/assets/resources/native/59/59968ddf-18a0-45ea-9e0c-6620cae31505.ea677.png", "start": 110106442, "end": 110236035}, {"filename": "/test/assets/resources/native/59/59989efb-a301-4168-bc73-23af2f50d5b2@ecf77.c6d03.bin", "start": 110236035, "end": 110239883}, {"filename": "/test/assets/resources/native/59/59a4a976-12df-4051-a5fc-97d878cf1816.2cea9.astc", "start": 110239883, "end": 110589679}, {"filename": "/test/assets/resources/native/59/59a4a976-12df-4051-a5fc-97d878cf1816.2cea9.png", "start": 110589679, "end": 111366292}, {"filename": "/test/assets/resources/native/59/59a4bf61-5eb9-40f3-bbe3-04bea7ca65ab.7bcd6.astc", "start": 111366292, "end": 111431844}, {"filename": "/test/assets/resources/native/59/59a4bf61-5eb9-40f3-bbe3-04bea7ca65ab.7bcd6.png", "start": 111431844, "end": 111487822}, {"filename": "/test/assets/resources/native/5a/5a43febf-64ce-41b7-8565-0a7a00be3520@ff420.38ab2.bin", "start": 111487822, "end": 111488026}, {"filename": "/test/assets/resources/native/5a/5a44e6ce-8019-4205-bb09-deb3fcb72681.9ef7d.png", "start": 111488026, "end": 112164636}, {"filename": "/test/assets/resources/native/5a/5a7689bd-dc1c-4082-97a8-7f3f9575715a.cbb7a.astc", "start": 112164636, "end": 112514432}, {"filename": "/test/assets/resources/native/5a/5a7689bd-dc1c-4082-97a8-7f3f9575715a.cbb7a.png", "start": 112514432, "end": 112936389}, {"filename": "/test/assets/resources/native/5a/5acec42d-2def-4b02-9401-096f66168ee5@f27c1.eeb76.bin", "start": 112936389, "end": 112936625}, {"filename": "/test/assets/resources/native/5a/5ae9e95b-cdcf-428a-abf0-096d1acccdb2@0a8f3.35322.bin", "start": 112936625, "end": 112936861}, {"filename": "/test/assets/resources/native/5b/5b094f8b-3488-4ef6-817b-bd10de683c1b.22c54.astc", "start": 112936861, "end": 113002413}, {"filename": "/test/assets/resources/native/5b/5b094f8b-3488-4ef6-817b-bd10de683c1b.22c54.png", "start": 113002413, "end": 113190489}, {"filename": "/test/assets/resources/native/5b/5b3ffcd1-3fb5-4967-9cd2-aeff30fba788.08d80.astc", "start": 113190489, "end": 113256041}, {"filename": "/test/assets/resources/native/5b/5b3ffcd1-3fb5-4967-9cd2-aeff30fba788.08d80.png", "start": 113256041, "end": 113264859}, {"filename": "/test/assets/resources/native/5b/5b557ed3-e214-4c9d-8d08-9d78ba26abd7.519b5.astc", "start": 113264859, "end": 113614655}, {"filename": "/test/assets/resources/native/5b/5b557ed3-e214-4c9d-8d08-9d78ba26abd7.519b5.png", "start": 113614655, "end": 113629168}, {"filename": "/test/assets/resources/native/5b/5bb38029-189d-412e-ad48-790d9bb40a89.3b336.astc", "start": 113629168, "end": 113694720}, {"filename": "/test/assets/resources/native/5b/5bb38029-189d-412e-ad48-790d9bb40a89.3b336.png", "start": 113694720, "end": 113773747}, {"filename": "/test/assets/resources/native/5b/5bba0979-fd4d-41e2-a18b-e37374c4e603.1544c.png", "start": 113773747, "end": 113812285}, {"filename": "/test/assets/resources/native/5b/5bd368dd-4c6c-41bd-b336-7edc273e4531@a5d74.c5a6c.bin", "start": 113812285, "end": 113815709}, {"filename": "/test/assets/resources/native/5b/5bee0b8b-78c5-4ed4-a679-13885384c0d8.a3583.astc", "start": 113815709, "end": 113881261}, {"filename": "/test/assets/resources/native/5b/5bee0b8b-78c5-4ed4-a679-13885384c0d8.a3583.png", "start": 113881261, "end": 114010482}, {"filename": "/test/assets/resources/native/5b/5bfb0407-89d8-4b07-8b81-e6657772dbd6@5660a.0b02c.bin", "start": 114010482, "end": 114026730}, {"filename": "/test/assets/resources/native/5c/5c093a42-b02b-4ff3-a8c8-35f868f50b7f.fa36d.png", "start": 114026730, "end": 114030877}, {"filename": "/test/assets/resources/native/5c/5c58bd2c-524c-47c0-a18a-a0a2595b72c4@a02cb.e2095.bin", "start": 114030877, "end": 114062441}, {"filename": "/test/assets/resources/native/5c/5c5e6b3b-56b2-4b5b-8931-1ed3254d02cd.661f8.png", "start": 114062441, "end": 114173225}, {"filename": "/test/assets/resources/native/5c/5c704db2-56f4-4d51-9125-beb1688d25d2@0ea93.31ad2.bin", "start": 114173225, "end": 114190201}, {"filename": "/test/assets/resources/native/5c/5c8cee11-6902-4b16-8823-3ee5aab3fabd.60228.astc", "start": 114190201, "end": 114277833}, {"filename": "/test/assets/resources/native/5c/5c8cee11-6902-4b16-8823-3ee5aab3fabd.60228.png", "start": 114277833, "end": 114356398}, {"filename": "/test/assets/resources/native/5c/5ca39624-1b61-4a25-ac3f-cf698bf2061d.5f4b5.mp3", "start": 114356398, "end": 114368353, "audio": 1}, {"filename": "/test/assets/resources/native/5c/5cd99724-3ec2-452a-8e64-8f49e8246992@36684.586a0.bin", "start": 114368353, "end": 114368557}, {"filename": "/test/assets/resources/native/5c/5ce0bf65-acff-4516-886d-3d0756cda25d.82c0e.jpg", "start": 114368557, "end": 114615713}, {"filename": "/test/assets/resources/native/5d/5d053dd2-13c9-4330-8af8-8280678fb0e6.4eeac.mp3", "start": 114615713, "end": 114621243, "audio": 1}, {"filename": "/test/assets/resources/native/5d/5d06b287-340d-4709-b13b-1908b6fdc2ee.dddf2.png", "start": 114621243, "end": 114634482}, {"filename": "/test/assets/resources/native/5d/5d1daedf-41f1-4b34-80df-36e68d90c070@c59a3.e996e.bin", "start": 114634482, "end": 114687246}, {"filename": "/test/assets/resources/native/5d/5d4a728b-f932-4170-a2cb-d6043c39b3af@d3e2b.633ff.bin", "start": 114687246, "end": 114688266}, {"filename": "/test/assets/resources/native/5d/5d83dff1-3770-437f-b73a-06cb7b703114.53a5e.png", "start": 114688266, "end": 114688383}, {"filename": "/test/assets/resources/native/5d/5d92de56-277b-42b2-a03a-af99fa4d7516@6eb28.4b6af.bin", "start": 114688383, "end": 114698103}, {"filename": "/test/assets/resources/native/5d/5df2d8ad-8198-4c2b-ba46-f50ac237d368.82b0c.png", "start": 114698103, "end": 114770444}, {"filename": "/test/assets/resources/native/5e/5e3b88a2-6783-48d8-a3d9-a1a7a40f3427.32958.astc", "start": 114770444, "end": 114835996}, {"filename": "/test/assets/resources/native/5e/5e3b88a2-6783-48d8-a3d9-a1a7a40f3427.32958.png", "start": 114835996, "end": 114972913}, {"filename": "/test/assets/resources/native/5e/5e77db2a-1571-4719-93e0-2bfede3c6516.03467.astc", "start": 114972913, "end": 115038465}, {"filename": "/test/assets/resources/native/5e/5e77db2a-1571-4719-93e0-2bfede3c6516.03467.png", "start": 115038465, "end": 115091684}, {"filename": "/test/assets/resources/native/5f/5f85d4da-be70-4e73-b6f3-f46c5cac17b4.08f21.astc", "start": 115091684, "end": 115179316}, {"filename": "/test/assets/resources/native/5f/5f85d4da-be70-4e73-b6f3-f46c5cac17b4.08f21.png", "start": 115179316, "end": 115332032}, {"filename": "/test/assets/resources/native/5f/5fbf54c5-f3b9-41fb-bb06-7308feaaa6c9.d5260.png", "start": 115332032, "end": 115334915}, {"filename": "/test/assets/resources/native/60/600c2eab-6316-499c-83c7-fad57753c30e@cdacf.aa6c2.bin", "start": 115334915, "end": 115378283}, {"filename": "/test/assets/resources/native/60/600f75b3-94d1-4cbf-905b-96658abe408d.a1e8f.astc", "start": 115378283, "end": 115443835}, {"filename": "/test/assets/resources/native/60/600f75b3-94d1-4cbf-905b-96658abe408d.a1e8f.png", "start": 115443835, "end": 115510836}, {"filename": "/test/assets/resources/native/60/601e52af-e53c-45a9-a5a7-d8ebe6c97b83.1ac9d.astc", "start": 115510836, "end": 115576388}, {"filename": "/test/assets/resources/native/60/601e52af-e53c-45a9-a5a7-d8ebe6c97b83.1ac9d.png", "start": 115576388, "end": 115659795}, {"filename": "/test/assets/resources/native/60/604e24b0-3939-49ff-8f33-a4e25f4ece5c@e5c50.bc690.bin", "start": 115659795, "end": 115671843}, {"filename": "/test/assets/resources/native/60/6053e7a5-2894-47ff-9e07-16122f939c42.4a8d8.astc", "start": 115671843, "end": 115737395}, {"filename": "/test/assets/resources/native/60/6053e7a5-2894-47ff-9e07-16122f939c42.4a8d8.png", "start": 115737395, "end": 115816383}, {"filename": "/test/assets/resources/native/60/605fdb83-e754-42e1-b74a-2ad6e861f1b5.c7498.png", "start": 115816383, "end": 115848265}, {"filename": "/test/assets/resources/native/60/607db1c1-da60-45eb-9108-6ec3fad11e88.9f17b.astc", "start": 115848265, "end": 116198061}, {"filename": "/test/assets/resources/native/60/607db1c1-da60-45eb-9108-6ec3fad11e88.9f17b.png", "start": 116198061, "end": 116696484}, {"filename": "/test/assets/resources/native/60/60df0722-98b0-4075-9c58-a1078d9e8302.8bc34.astc", "start": 116696484, "end": 116762036}, {"filename": "/test/assets/resources/native/60/60df0722-98b0-4075-9c58-a1078d9e8302.8bc34.png", "start": 116762036, "end": 116855637}, {"filename": "/test/assets/resources/native/61/612495d2-528d-412a-9349-fed0d78064d6@8ac7e.903fb.bin", "start": 116855637, "end": 116859597}, {"filename": "/test/assets/resources/native/61/614472c4-8179-4eff-937a-e23260fad8f0.8e01e.astc", "start": 116859597, "end": 116925149}, {"filename": "/test/assets/resources/native/61/614472c4-8179-4eff-937a-e23260fad8f0.8e01e.png", "start": 116925149, "end": 117059867}, {"filename": "/test/assets/resources/native/61/618534fa-a82c-4705-a956-a638390f93be.7565d.astc", "start": 117059867, "end": 117125419}, {"filename": "/test/assets/resources/native/61/618534fa-a82c-4705-a956-a638390f93be.7565d.png", "start": 117125419, "end": 117180657}, {"filename": "/test/assets/resources/native/61/61f5169e-815a-4e5c-ad33-d07a43f4c2e6.dccb2.mp3", "start": 117180657, "end": 117268054, "audio": 1}, {"filename": "/test/assets/resources/native/62/6283ce1e-8b27-4552-937d-95d36493ce91.98bcc.astc", "start": 117268054, "end": 117530214}, {"filename": "/test/assets/resources/native/62/6283ce1e-8b27-4552-937d-95d36493ce91.98bcc.png", "start": 117530214, "end": 117548317}, {"filename": "/test/assets/resources/native/63/63049075-9903-4a94-8ea9-fbbac3c7a878.17285.astc", "start": 117548317, "end": 117613869}, {"filename": "/test/assets/resources/native/63/63049075-9903-4a94-8ea9-fbbac3c7a878.17285.png", "start": 117613869, "end": 117739325}, {"filename": "/test/assets/resources/native/63/630d1be9-43b7-40e2-bfde-c857cc589c3e.637bc.png", "start": 117739325, "end": 117787950}, {"filename": "/test/assets/resources/native/63/630dbcbf-589b-46e6-86e6-45bf27e1939b@4d163.fbb4e.bin", "start": 117787950, "end": 117788154}, {"filename": "/test/assets/resources/native/63/631270ce-17bc-4737-b81b-9d3305d6f45b@03aea.4022e.bin", "start": 117788154, "end": 117833178}, {"filename": "/test/assets/resources/native/63/635db25b-7603-49c8-9a21-57ae3d3bac58@4f8d7.907d2.bin", "start": 117833178, "end": 118092694}, {"filename": "/test/assets/resources/native/63/63acf3c6-4fac-42dc-a0b6-a4609f045e27@4d163.dcbc4.bin", "start": 118092694, "end": 118092898}, {"filename": "/test/assets/resources/native/64/647492c7-c869-4a07-9359-ffce27bedcdb@ef020.32c0c.bin", "start": 118092898, "end": 118110438}, {"filename": "/test/assets/resources/native/64/6480d38e-5ce6-4d3b-b78e-106f64006e66@6ee27.408e8.bin", "start": 118110438, "end": 118110642}, {"filename": "/test/assets/resources/native/65/6552fc6e-ced7-4574-84e0-37240e83d3a3@af11a.69aea.bin", "start": 118110642, "end": 118117130}, {"filename": "/test/assets/resources/native/66/660e0d08-c010-435f-a0db-5a5d85adda9f@55b5b.00348.bin", "start": 118117130, "end": 119010426}, {"filename": "/test/assets/resources/native/66/66611f15-3826-43c8-9db3-81ccc265b000.e0810.astc", "start": 119010426, "end": 119075978}, {"filename": "/test/assets/resources/native/66/66611f15-3826-43c8-9db3-81ccc265b000.e0810.png", "start": 119075978, "end": 119121337}, {"filename": "/test/assets/resources/native/66/66812d12-5315-48ad-a844-d4d34edaed0f@a49f9.c712c.bin", "start": 119121337, "end": 119307769}, {"filename": "/test/assets/resources/native/66/66aa4f37-400e-4bc9-855e-44a88d5a5761.c8559.astc", "start": 119307769, "end": 119373321}, {"filename": "/test/assets/resources/native/66/66aa4f37-400e-4bc9-855e-44a88d5a5761.c8559.png", "start": 119373321, "end": 119456081}, {"filename": "/test/assets/resources/native/67/6779fa6f-8e32-435e-90d4-655b75bb9d82.3a731.astc", "start": 119456081, "end": 119543713}, {"filename": "/test/assets/resources/native/67/6779fa6f-8e32-435e-90d4-655b75bb9d82.3a731.pkm", "start": 119543713, "end": 119718697}, {"filename": "/test/assets/resources/native/67/6779fa6f-8e32-435e-90d4-655b75bb9d82.3a731.png", "start": 119718697, "end": 119744306}, {"filename": "/test/assets/resources/native/67/6779fa6f-8e32-435e-90d4-655b75bb9d82.3a731.pvr", "start": 119744306, "end": 119919872}, {"filename": "/test/assets/resources/native/67/67bfb3c0-c7a5-4046-b8db-ed753f22e564.cdb22.astc", "start": 119919872, "end": 119985424}, {"filename": "/test/assets/resources/native/67/67bfb3c0-c7a5-4046-b8db-ed753f22e564.cdb22.png", "start": 119985424, "end": 120141595}, {"filename": "/test/assets/resources/native/68/682a63e3-fb75-4e88-bbd7-0f66097175c6.d9673.astc", "start": 120141595, "end": 120207147}, {"filename": "/test/assets/resources/native/68/682a63e3-fb75-4e88-bbd7-0f66097175c6.d9673.png", "start": 120207147, "end": 120270417}, {"filename": "/test/assets/resources/native/68/6834a0be-e8a3-406a-8dbd-aab5fc94e7a9.b5ba2.png", "start": 120270417, "end": 120292227}, {"filename": "/test/assets/resources/native/68/6885986c-7579-43fa-b540-4964d52cf2bf@2f8a2.63650.bin", "start": 120292227, "end": 120300151}, {"filename": "/test/assets/resources/native/68/68de87a3-cf61-49b7-b555-06ec46b60191.a4f69.astc", "start": 120300151, "end": 120562311}, {"filename": "/test/assets/resources/native/68/68de87a3-cf61-49b7-b555-06ec46b60191.a4f69.png", "start": 120562311, "end": 120944261}, {"filename": "/test/assets/resources/native/68/68e1d593-1d4b-4fe9-84d7-44d3cff0f12d.4f15c.mp3", "start": 120944261, "end": 120959351, "audio": 1}, {"filename": "/test/assets/resources/native/68/68f4e58a-8cb0-496a-a551-70c1531c113c.a5587.astc", "start": 120959351, "end": 121024903}, {"filename": "/test/assets/resources/native/68/68f4e58a-8cb0-496a-a551-70c1531c113c.a5587.png", "start": 121024903, "end": 121092711}, {"filename": "/test/assets/resources/native/69/690dd834-33df-4796-9728-f2d4c03632dd.9e393.png", "start": 121092711, "end": 121646943}, {"filename": "/test/assets/resources/native/69/6988d16e-2d35-4989-a111-a82e602fbed5.d7b7d.mp3", "start": 121646943, "end": 121663287, "audio": 1}, {"filename": "/test/assets/resources/native/69/69bd4e90-fba2-4f56-a69e-698e33644660.160a7.astc", "start": 121663287, "end": 121728839}, {"filename": "/test/assets/resources/native/69/69bd4e90-fba2-4f56-a69e-698e33644660.160a7.png", "start": 121728839, "end": 121830946}, {"filename": "/test/assets/resources/native/6a/6a513f5d-6629-4e88-96d0-c76c00995b36.45e5d.png", "start": 121830946, "end": 121879448}, {"filename": "/test/assets/resources/native/6a/6a648b57-35b3-40f8-848d-e81c40554a28.80eb7.png", "start": 121879448, "end": 121884961}, {"filename": "/test/assets/resources/native/6a/6aad9c72-2ab4-4b7c-8542-ee3913ba5473.0a094.png", "start": 121884961, "end": 121886271}, {"filename": "/test/assets/resources/native/6b/6b4358fa-a550-4811-b1d1-c7149923b4be@19ff9.d531f.bin", "start": 121886271, "end": 122049763}, {"filename": "/test/assets/resources/native/6b/6b444c7e-dba1-459a-86d8-9f54c197e6b9.79483.astc", "start": 122049763, "end": 122115315}, {"filename": "/test/assets/resources/native/6b/6b444c7e-dba1-459a-86d8-9f54c197e6b9.79483.png", "start": 122115315, "end": 122222252}, {"filename": "/test/assets/resources/native/6b/6b5c7bd5-44f8-44a1-a487-1f2dba399248@16b27.16ce9.bin", "start": 122222252, "end": 122222456}, {"filename": "/test/assets/resources/native/6b/6ba9a498-2dff-45fa-b345-7dfe787ff711.32678.astc", "start": 122222456, "end": 122288008}, {"filename": "/test/assets/resources/native/6b/6ba9a498-2dff-45fa-b345-7dfe787ff711.32678.png", "start": 122288008, "end": 122344420}, {"filename": "/test/assets/resources/native/6c/6c00b290-ee1e-4bc4-bab2-79734af67938@ece4c.e5534.bin", "start": 122344420, "end": 123235660}, {"filename": "/test/assets/resources/native/6c/6c2bf0e3-96ea-4886-ab54-70760d5b4864.af446.astc", "start": 123235660, "end": 123301212}, {"filename": "/test/assets/resources/native/6c/6c2bf0e3-96ea-4886-ab54-70760d5b4864.af446.png", "start": 123301212, "end": 123488813}, {"filename": "/test/assets/resources/native/6c/6cb45773-2cdf-44a2-ad47-ec1deebd6fbc.e7915.png", "start": 123488813, "end": 123489116}, {"filename": "/test/assets/resources/native/6c/6cca4d79-0feb-4405-affb-841003507b73.b8941.astc", "start": 123489116, "end": 123554668}, {"filename": "/test/assets/resources/native/6c/6cca4d79-0feb-4405-affb-841003507b73.b8941.png", "start": 123554668, "end": 123636338}, {"filename": "/test/assets/resources/native/6c/6ccd7926-7136-4f4d-99c7-83f971e1a17e.91d12.astc", "start": 123636338, "end": 123986134}, {"filename": "/test/assets/resources/native/6c/6ccd7926-7136-4f4d-99c7-83f971e1a17e.91d12.png", "start": 123986134, "end": 124247945}, {"filename": "/test/assets/resources/native/6c/6ce70da8-aa48-45e7-9666-4506e57e87c3.0f73d.astc", "start": 124247945, "end": 124313497}, {"filename": "/test/assets/resources/native/6c/6ce70da8-aa48-45e7-9666-4506e57e87c3.0f73d.png", "start": 124313497, "end": 124382785}, {"filename": "/test/assets/resources/native/6c/6cf2280a-1dd3-4c5d-9de0-6a7ab8385348.8c8d1.astc", "start": 124382785, "end": 124448337}, {"filename": "/test/assets/resources/native/6c/6cf2280a-1dd3-4c5d-9de0-6a7ab8385348.8c8d1.png", "start": 124448337, "end": 124514351}, {"filename": "/test/assets/resources/native/6d/6d156013-a2af-4957-b1bc-56961c75cf1f@b8162.633ff.bin", "start": 124514351, "end": 124515371}, {"filename": "/test/assets/resources/native/6d/6d5e9a85-f667-4c1f-876b-95c361076e25.12c1c.astc", "start": 124515371, "end": 124580923}, {"filename": "/test/assets/resources/native/6d/6d5e9a85-f667-4c1f-876b-95c361076e25.12c1c.png", "start": 124580923, "end": 124691317}, {"filename": "/test/assets/resources/native/6d/6d916ec3-2cf7-4f89-9770-c295e30f939c.3ece6.astc", "start": 124691317, "end": 124756869}, {"filename": "/test/assets/resources/native/6d/6d916ec3-2cf7-4f89-9770-c295e30f939c.3ece6.png", "start": 124756869, "end": 124860636}, {"filename": "/test/assets/resources/native/6d/6da706d2-31f1-496c-b945-e41561a48d28@23b14.c3ebe.bin", "start": 124860636, "end": 124860840}, {"filename": "/test/assets/resources/native/6d/6dc35954-b7fd-481a-b9c7-3e12f14fea0d.b1d42.png", "start": 124860840, "end": 124878465}, {"filename": "/test/assets/resources/native/6d/6df0c102-75a2-4ab7-8edf-1d296c3e42d2@44655.14838.bin", "start": 124878465, "end": 124886265}, {"filename": "/test/assets/resources/native/6e/6e397034-7cf1-4c17-b6ec-448adb7eb9f0.ee57f.png", "start": 124886265, "end": 124888548}, {"filename": "/test/assets/resources/native/6e/6e475011-dac8-46ce-91b2-dd12e939ed57@f9fe0.5b5ab.bin", "start": 124888548, "end": 124896908}, {"filename": "/test/assets/resources/native/6e/6e58f9c9-64e9-4b58-938f-5a3267106c56.0925c.mp3", "start": 124896908, "end": 124905729, "audio": 1}, {"filename": "/test/assets/resources/native/6e/6e6a3afc-e281-441d-ac3e-a8c8d687a678.ae9de.astc", "start": 124905729, "end": 124971281}, {"filename": "/test/assets/resources/native/6e/6e6a3afc-e281-441d-ac3e-a8c8d687a678.ae9de.png", "start": 124971281, "end": 125143664}, {"filename": "/test/assets/resources/native/6e/6e9f2d89-05fd-42d3-bbd7-d1ce7590719a.c4382.astc", "start": 125143664, "end": 125209216}, {"filename": "/test/assets/resources/native/6e/6e9f2d89-05fd-42d3-bbd7-d1ce7590719a.c4382.png", "start": 125209216, "end": 125338701}, {"filename": "/test/assets/resources/native/6e/6ebaeee4-c83b-458c-910f-e3b79ad8ce5d.21240.astc", "start": 125338701, "end": 125404253}, {"filename": "/test/assets/resources/native/6e/6ebaeee4-c83b-458c-910f-e3b79ad8ce5d.21240.png", "start": 125404253, "end": 125578390}, {"filename": "/test/assets/resources/native/6e/6efd73b9-6739-49c5-979d-a79b70596b50.c815b.png", "start": 125578390, "end": 125606704}, {"filename": "/test/assets/resources/native/6f/6f4878da-0264-4bec-8829-cb9cbdb88a87.187c4.png", "start": 125606704, "end": 125634472}, {"filename": "/test/assets/resources/native/6f/6f8a894f-c367-44c2-a1ab-8d32a3e257ae@36684.59fb4.bin", "start": 125634472, "end": 125634676}, {"filename": "/test/assets/resources/native/6f/6f9d99c6-24d6-4a04-a9e0-2859a639ce20.34226.png", "start": 125634676, "end": 125639961}, {"filename": "/test/assets/resources/native/6f/6ff1b901-936d-46c3-9a19-45576b9ee3a0.90c0f.astc", "start": 125639961, "end": 125705513}, {"filename": "/test/assets/resources/native/6f/6ff1b901-936d-46c3-9a19-45576b9ee3a0.90c0f.png", "start": 125705513, "end": 125855193}, {"filename": "/test/assets/resources/native/70/7022dd4b-684a-4f9f-b2f0-7ce63bcf09f1@e3811.76e6f.bin", "start": 125855193, "end": 125967937}, {"filename": "/test/assets/resources/native/70/70b5f674-48bd-434f-8bfc-6fce4ba1275d.b9b2d.astc", "start": 125967937, "end": 126055569}, {"filename": "/test/assets/resources/native/70/70b5f674-48bd-434f-8bfc-6fce4ba1275d.b9b2d.png", "start": 126055569, "end": 126271622}, {"filename": "/test/assets/resources/native/70/70c4aa18-2b71-4e11-bd67-77e27ea43c03.3be13.astc", "start": 126271622, "end": 126337174}, {"filename": "/test/assets/resources/native/70/70c4aa18-2b71-4e11-bd67-77e27ea43c03.3be13.png", "start": 126337174, "end": 126441401}, {"filename": "/test/assets/resources/native/71/71ee7120-a36e-4936-aed2-dbeed33ba753.747c0.astc", "start": 126441401, "end": 126506953}, {"filename": "/test/assets/resources/native/71/71ee7120-a36e-4936-aed2-dbeed33ba753.747c0.png", "start": 126506953, "end": 126550047}, {"filename": "/test/assets/resources/native/71/71ff97d3-fa52-49b7-b6fe-ffb7faa7f26d@dd96e.12723.bin", "start": 126550047, "end": 126583671}, {"filename": "/test/assets/resources/native/72/721f3d17-017b-499e-a111-149f9c4ea787.5e9f8.mp3", "start": 126583671, "end": 126592910, "audio": 1}, {"filename": "/test/assets/resources/native/72/723a3756-cac2-4237-a855-a0da03d39739@cda0e.ed093.bin", "start": 126592910, "end": 126766442}, {"filename": "/test/assets/resources/native/72/724a3cf7-81a0-4948-a679-2460946f7caf.252e8.png", "start": 126766442, "end": 126785971}, {"filename": "/test/assets/resources/native/72/72c4bd28-a084-40a1-a6cb-c5626a1ae61d.216cd.astc", "start": 126785971, "end": 126851523}, {"filename": "/test/assets/resources/native/72/72c4bd28-a084-40a1-a6cb-c5626a1ae61d.216cd.png", "start": 126851523, "end": 126919728}, {"filename": "/test/assets/resources/native/73/7319b687-8042-49d0-bc46-9366a880b47c.7a5dd.astc", "start": 126919728, "end": 126985280}, {"filename": "/test/assets/resources/native/73/7319b687-8042-49d0-bc46-9366a880b47c.7a5dd.png", "start": 126985280, "end": 127044702}, {"filename": "/test/assets/resources/native/73/7342de4b-c3b8-4f85-95e6-5741ecd6aaca@effbf.7fb0a.bin", "start": 127044702, "end": 127362774}, {"filename": "/test/assets/resources/native/73/73832b3e-3166-433f-8e49-4dd3d68ff889.a61fa.png", "start": 127362774, "end": 127502187}, {"filename": "/test/assets/resources/native/73/73f564e9-e15c-4677-8fd9-ee237c5e882a@81f6d.154fb.bin", "start": 127502187, "end": 127594695}, {"filename": "/test/assets/resources/native/74/748f7fc0-6129-4e0b-8cf3-d4fa1c90120c.23f51.astc", "start": 127594695, "end": 127660247}, {"filename": "/test/assets/resources/native/74/748f7fc0-6129-4e0b-8cf3-d4fa1c90120c.23f51.png", "start": 127660247, "end": 127840340}, {"filename": "/test/assets/resources/native/74/749b1215-845e-4bf3-9bd6-8738b9c624a2.3789f.mp3", "start": 127840340, "end": 127843309, "audio": 1}, {"filename": "/test/assets/resources/native/75/75051913-2e48-4fd3-a60c-bb8c0a7566d3@5cab5.822d7.bin", "start": 127843309, "end": 127843513}, {"filename": "/test/assets/resources/native/75/751c32d5-f781-4f81-895f-4d81294fffc1@bf4a8.615f1.bin", "start": 127843513, "end": 127870257}, {"filename": "/test/assets/resources/native/75/7544904a-47cc-401c-8d10-4ae7d89a079b@afe0b.43670.bin", "start": 127870257, "end": 127907973}, {"filename": "/test/assets/resources/native/75/755b86e2-e118-4ac7-9a8c-ec62cd150437@25893.d3245.bin", "start": 127907973, "end": 127908177}, {"filename": "/test/assets/resources/native/75/756a3cb6-c3e0-48d6-b508-afb2934ab057.00809.astc", "start": 127908177, "end": 127973729}, {"filename": "/test/assets/resources/native/75/756a3cb6-c3e0-48d6-b508-afb2934ab057.00809.png", "start": 127973729, "end": 128012137}, {"filename": "/test/assets/resources/native/75/75ad843d-7992-4ff4-bbd4-2d3801989d2c@4d163.883d6.bin", "start": 128012137, "end": 128012341}, {"filename": "/test/assets/resources/native/75/75afaf73-58ad-4665-aa98-156f03b5106c.45165.mp3", "start": 128012341, "end": 128017400, "audio": 1}, {"filename": "/test/assets/resources/native/75/75c9c10b-a8db-42d0-a68d-1b110ff626e3@89e24.82592.bin", "start": 128017400, "end": 128050124}, {"filename": "/test/assets/resources/native/76/76021578-eb06-46b4-858d-cb755f42e71c.ba963.astc", "start": 128050124, "end": 128312284}, {"filename": "/test/assets/resources/native/76/76021578-eb06-46b4-858d-cb755f42e71c.ba963.png", "start": 128312284, "end": 128696261}, {"filename": "/test/assets/resources/native/76/76d3e79d-0f9e-4dea-b716-7ec94117e27b.c4084.astc", "start": 128696261, "end": 128761813}, {"filename": "/test/assets/resources/native/76/76d3e79d-0f9e-4dea-b716-7ec94117e27b.c4084.png", "start": 128761813, "end": 128974887}, {"filename": "/test/assets/resources/native/77/7708c47b-5bc4-4104-ab03-6665a336c140.c1204.mp3", "start": 128974887, "end": 128987887, "audio": 1}, {"filename": "/test/assets/resources/native/77/7726beda-9ba1-44f9-bb51-00a087a54e4c.7b64c.astc", "start": 128987887, "end": 129337683}, {"filename": "/test/assets/resources/native/77/7726beda-9ba1-44f9-bb51-00a087a54e4c.7b64c.png", "start": 129337683, "end": 129984513}, {"filename": "/test/assets/resources/native/77/77574b8c-6006-4ad1-9be6-c621aa94a93b.9e52f.astc", "start": 129984513, "end": 130050065}, {"filename": "/test/assets/resources/native/77/77574b8c-6006-4ad1-9be6-c621aa94a93b.9e52f.png", "start": 130050065, "end": 130159619}, {"filename": "/test/assets/resources/native/77/77f53c52-d017-4c2b-9de0-6f5d360bd026@f5d7d.888b3.bin", "start": 130159619, "end": 130196119}, {"filename": "/test/assets/resources/native/78/7824e1de-db20-4f8c-b219-97c4ed810c54.c9eac.astc", "start": 130196119, "end": 130283751}, {"filename": "/test/assets/resources/native/78/7824e1de-db20-4f8c-b219-97c4ed810c54.c9eac.png", "start": 130283751, "end": 130305408}, {"filename": "/test/assets/resources/native/78/78471db1-8b2d-450b-8cf4-106b20748bbe@3a7b3.8779a.bin", "start": 130305408, "end": 130305612}, {"filename": "/test/assets/resources/native/78/78774005-ea2b-4ce5-9e9d-1ae8ccd2dc98.59126.astc", "start": 130305612, "end": 130371164}, {"filename": "/test/assets/resources/native/78/78774005-ea2b-4ce5-9e9d-1ae8ccd2dc98.59126.png", "start": 130371164, "end": 130486503}, {"filename": "/test/assets/resources/native/78/78d879ff-83d1-40c2-acf8-77707a5d9672.90317.mp3", "start": 130486503, "end": 130499679, "audio": 1}, {"filename": "/test/assets/resources/native/79/79007354-81b3-44e1-a214-9de984a2bae1@064a7.79126.bin", "start": 130499679, "end": 130501567}, {"filename": "/test/assets/resources/native/79/79b008c1-2982-41a9-8089-53f5e9169a2b.e0d6c.png", "start": 130501567, "end": 130511353}, {"filename": "/test/assets/resources/native/79/79c06773-c951-4617-b9c1-4efcf7aae400@46037.d3cad.bin", "start": 130511353, "end": 130547793}, {"filename": "/test/assets/resources/native/79/79c1f3c9-a71f-4349-8261-9122207e1da4.ee57f.png", "start": 130547793, "end": 130550076}, {"filename": "/test/assets/resources/native/79/79f2a70d-5304-4e55-aab9-2c9ee2750969@16b27.f7620.bin", "start": 130550076, "end": 130550280}, {"filename": "/test/assets/resources/native/79/79ffebef-6142-4774-b833-d2a4a170a59b.11cac.mp3", "start": 130550280, "end": 130562053, "audio": 1}, {"filename": "/test/assets/resources/native/7a/7a1a4d8f-1f6a-46de-abaa-3e8c5c363778@a9229.3163f.bin", "start": 130562053, "end": 130705045}, {"filename": "/test/assets/resources/native/7a/7a39c094-6520-46c6-aa0a-35d82cfbdbf8.4bdef.astc", "start": 130705045, "end": 130770597}, {"filename": "/test/assets/resources/native/7a/7a39c094-6520-46c6-aa0a-35d82cfbdbf8.4bdef.png", "start": 130770597, "end": 130863938}, {"filename": "/test/assets/resources/native/7a/7a5458bb-8dd5-4d5d-ac06-ce345b11b656@3650e.56aa5.bin", "start": 130863938, "end": 130864174}, {"filename": "/test/assets/resources/native/7a/7a632415-dac0-4334-bb5f-91014e1fce2d.eab1c.astc", "start": 130864174, "end": 130929726}, {"filename": "/test/assets/resources/native/7a/7a632415-dac0-4334-bb5f-91014e1fce2d.eab1c.png", "start": 130929726, "end": 131028327}, {"filename": "/test/assets/resources/native/7a/7a9131de-e178-4bb8-af89-660c2c38d68f.a6df7.astc", "start": 131028327, "end": 131093879}, {"filename": "/test/assets/resources/native/7a/7a9131de-e178-4bb8-af89-660c2c38d68f.a6df7.png", "start": 131093879, "end": 131184569}, {"filename": "/test/assets/resources/native/7a/7a951a44-d7a7-486f-a4dd-e9530a672487.b0953.png", "start": 131184569, "end": 131246251}, {"filename": "/test/assets/resources/native/7a/7ad7dcb6-329e-406a-a274-706eb04601f9.a5f8d.png", "start": 131246251, "end": 131325280}, {"filename": "/test/assets/resources/native/7a/7af187ba-5cda-4b41-a81f-d5f06870de5b@12383.6947d.bin", "start": 131325280, "end": 131666168}, {"filename": "/test/assets/resources/native/7b/7b15ad60-ade4-4539-8551-9af548d6c3f2.5b2b8.astc", "start": 131666168, "end": 132015964}, {"filename": "/test/assets/resources/native/7b/7b15ad60-ade4-4539-8551-9af548d6c3f2.5b2b8.png", "start": 132015964, "end": 132294271}, {"filename": "/test/assets/resources/native/7b/7b892955-f2cc-4d16-abea-e6aa95f8359f.6fab5.mp3", "start": 132294271, "end": 132480756, "audio": 1}, {"filename": "/test/assets/resources/native/7b/7b943a8e-ccd8-4c8c-9595-3a28940ec85c.43f32.astc", "start": 132480756, "end": 132830552}, {"filename": "/test/assets/resources/native/7b/7b943a8e-ccd8-4c8c-9595-3a28940ec85c.43f32.png", "start": 132830552, "end": 133239712}, {"filename": "/test/assets/resources/native/7b/7bde7be8-9001-491b-87dc-bcc3b06a5d8c@c5302.abcf1.bin", "start": 133239712, "end": 133264640}, {"filename": "/test/assets/resources/native/7c/7c0f1da3-4ad6-4415-879c-0154edfc06fc.3150d.astc", "start": 133264640, "end": 133330192}, {"filename": "/test/assets/resources/native/7c/7c0f1da3-4ad6-4415-879c-0154edfc06fc.3150d.png", "start": 133330192, "end": 133391455}, {"filename": "/test/assets/resources/native/7c/7ce36fc3-1663-4d70-9d01-32f803d8d7d3.590d9.astc", "start": 133391455, "end": 133653615}, {"filename": "/test/assets/resources/native/7c/7ce36fc3-1663-4d70-9d01-32f803d8d7d3.590d9.png", "start": 133653615, "end": 134624562}, {"filename": "/test/assets/resources/native/7d/7d36569e-5ddd-43cd-80e1-9064a777f309@16b27.58e0a.bin", "start": 134624562, "end": 134624766}, {"filename": "/test/assets/resources/native/7d/7dba8342-a472-4848-b6af-662082343d8c.64984.astc", "start": 134624766, "end": 134690318}, {"filename": "/test/assets/resources/native/7d/7dba8342-a472-4848-b6af-662082343d8c.64984.png", "start": 134690318, "end": 134825379}, {"filename": "/test/assets/resources/native/7e/7e1070c2-13de-417e-b304-586ee0da217d.860c3.astc", "start": 134825379, "end": 134913011}, {"filename": "/test/assets/resources/native/7e/7e1070c2-13de-417e-b304-586ee0da217d.860c3.png", "start": 134913011, "end": 135018086}, {"filename": "/test/assets/resources/native/7e/7ea120b8-3bcc-4b6c-bad2-ad91d6c04607.1bcde.astc", "start": 135018086, "end": 135083638}, {"filename": "/test/assets/resources/native/7e/7ea120b8-3bcc-4b6c-bad2-ad91d6c04607.1bcde.png", "start": 135083638, "end": 135204312}, {"filename": "/test/assets/resources/native/7e/7ec93f64-38f6-4c4a-9a05-b096c8047e70.0ffd6.astc", "start": 135204312, "end": 135269864}, {"filename": "/test/assets/resources/native/7e/7ec93f64-38f6-4c4a-9a05-b096c8047e70.0ffd6.png", "start": 135269864, "end": 135414131}, {"filename": "/test/assets/resources/native/7f/7f39053a-e419-4b7a-a3ba-58d38c0752dd@aeb85.87283.bin", "start": 135414131, "end": 135540587}, {"filename": "/test/assets/resources/native/7f/7f480231-0e0f-4aca-9bc3-80ebd4e18eee.c4a2d.astc", "start": 135540587, "end": 135606139}, {"filename": "/test/assets/resources/native/7f/7f480231-0e0f-4aca-9bc3-80ebd4e18eee.c4a2d.png", "start": 135606139, "end": 135741838}, {"filename": "/test/assets/resources/native/7f/7f6c5d44-e2da-4386-b944-e14990ddad57@78e36.6fb41.bin", "start": 135741838, "end": 135786550}, {"filename": "/test/assets/resources/native/7f/7f857d42-f820-4af2-a8e5-1ac321789954.477e7.png", "start": 135786550, "end": 135821461}, {"filename": "/test/assets/resources/native/7f/7fb754ec-d49d-4eb7-8d42-30d18f218344.46b79.astc", "start": 135821461, "end": 135909093}, {"filename": "/test/assets/resources/native/7f/7fb754ec-d49d-4eb7-8d42-30d18f218344.46b79.png", "start": 135909093, "end": 136020741}, {"filename": "/test/assets/resources/native/7f/7fc2cc34-d35a-496d-926c-80c654046c19@787ee.228da.bin", "start": 136020741, "end": 136033981}, {"filename": "/test/assets/resources/native/7f/7fdc7e96-13a1-4adf-86d0-2dbaca9390f5@b420d.454b2.bin", "start": 136033981, "end": 136215145}, {"filename": "/test/assets/resources/native/80/80098050-ea4a-4250-80cf-7a143f01c7c5.e9ff4.astc", "start": 136215145, "end": 136280697}, {"filename": "/test/assets/resources/native/80/80098050-ea4a-4250-80cf-7a143f01c7c5.e9ff4.png", "start": 136280697, "end": 136284861}, {"filename": "/test/assets/resources/native/80/8069dbb5-1b41-4fdc-886b-02a5daf08da6@25893.d08e3.bin", "start": 136284861, "end": 136285065}, {"filename": "/test/assets/resources/native/80/80df7926-5906-4c51-b87f-aaa30bce606a.7a2f7.png", "start": 136285065, "end": 136366695}, {"filename": "/test/assets/resources/native/81/811a60e3-aeb9-406c-b2bc-7df2342576ef@1afc2.a05ca.bin", "start": 136366695, "end": 136410975}, {"filename": "/test/assets/resources/native/81/812df0a4-8ad2-4598-bdb1-91bfa7c442ba.63746.astc", "start": 136410975, "end": 136476527}, {"filename": "/test/assets/resources/native/81/812df0a4-8ad2-4598-bdb1-91bfa7c442ba.63746.png", "start": 136476527, "end": 136640371}, {"filename": "/test/assets/resources/native/81/8165911d-93b9-450f-b635-e575a84fe030.763f5.png", "start": 136640371, "end": 136738181}, {"filename": "/test/assets/resources/native/82/828051d5-2e16-4778-8465-9ecb104d3d91.ffd1b.astc", "start": 136738181, "end": 136803733}, {"filename": "/test/assets/resources/native/82/828051d5-2e16-4778-8465-9ecb104d3d91.ffd1b.png", "start": 136803733, "end": 136936910}, {"filename": "/test/assets/resources/native/82/828d849a-7474-4f71-9221-e2f5debb4b89.37657.astc", "start": 136936910, "end": 137024542}, {"filename": "/test/assets/resources/native/82/828d849a-7474-4f71-9221-e2f5debb4b89.37657.png", "start": 137024542, "end": 137155294}, {"filename": "/test/assets/resources/native/82/82ec4557-c8bc-4be8-bf2c-08ac758fcd3f@a187d.5bd41.bin", "start": 137155294, "end": 137156238}, {"filename": "/test/assets/resources/native/82/82f101de-5a02-4a03-a5c3-536ed8ca33e3.b2438.astc", "start": 137156238, "end": 137243870}, {"filename": "/test/assets/resources/native/82/82f101de-5a02-4a03-a5c3-536ed8ca33e3.b2438.png", "start": 137243870, "end": 137338654}, {"filename": "/test/assets/resources/native/83/837624a1-ddad-4724-b893-bf2dacffb96c@6bde7.3183c.bin", "start": 137338654, "end": 137338858}, {"filename": "/test/assets/resources/native/83/83c3227c-36e8-43d3-87e3-c04742496065.c65bd.astc", "start": 137338858, "end": 137404410}, {"filename": "/test/assets/resources/native/83/83c3227c-36e8-43d3-87e3-c04742496065.c65bd.png", "start": 137404410, "end": 137540470}, {"filename": "/test/assets/resources/native/84/841cc2d8-4a77-4768-9d0c-497cb0d4af08.d7fcf.mp3", "start": 137540470, "end": 137548037, "audio": 1}, {"filename": "/test/assets/resources/native/84/842a774a-2c89-459c-b268-8f31f9935e3d@35375.c249f.bin", "start": 137548037, "end": 137805833}, {"filename": "/test/assets/resources/native/84/84542c44-1cf2-44c6-8270-f29fb7da0cb2.72bda.astc", "start": 137805833, "end": 137871385}, {"filename": "/test/assets/resources/native/84/84542c44-1cf2-44c6-8270-f29fb7da0cb2.72bda.png", "start": 137871385, "end": 137987600}, {"filename": "/test/assets/resources/native/85/852d3bfe-ba10-4d29-bcd2-9397cec5c9c5.34f82.astc", "start": 137987600, "end": 138053152}, {"filename": "/test/assets/resources/native/85/852d3bfe-ba10-4d29-bcd2-9397cec5c9c5.34f82.png", "start": 138053152, "end": 138262815}, {"filename": "/test/assets/resources/native/85/85d03785-7104-4b21-ade7-421f93eceb61.a662e.astc", "start": 138262815, "end": 138328367}, {"filename": "/test/assets/resources/native/85/85d03785-7104-4b21-ade7-421f93eceb61.a662e.png", "start": 138328367, "end": 138432102}, {"filename": "/test/assets/resources/native/86/861f7861-7a44-4689-a0bf-cec95306b19c.0f29d.mp3", "start": 138432102, "end": 138458895, "audio": 1}, {"filename": "/test/assets/resources/native/86/86261bed-ce3a-4d3c-9396-de1a4da3535b.f0d2e.png", "start": 138458895, "end": 139563888}, {"filename": "/test/assets/resources/native/86/8683247b-ad77-442e-8b4d-fac692d477ca.640c0.mp3", "start": 139563888, "end": 139576470, "audio": 1}, {"filename": "/test/assets/resources/native/86/8693cc56-e0f3-47dd-a3d1-6794c5f35e9a.af570.astc", "start": 139576470, "end": 139926266}, {"filename": "/test/assets/resources/native/86/8693cc56-e0f3-47dd-a3d1-6794c5f35e9a.af570.png", "start": 139926266, "end": 139935041}, {"filename": "/test/assets/resources/native/87/8764ae81-25e6-4524-809e-52168ef4ef76@4a10e.476de.bin", "start": 139935041, "end": 139998593}, {"filename": "/test/assets/resources/native/87/878f8cbd-7137-417e-8857-57597fcc9d60.082f9.astc", "start": 139998593, "end": 140064145}, {"filename": "/test/assets/resources/native/87/878f8cbd-7137-417e-8857-57597fcc9d60.082f9.png", "start": 140064145, "end": 140121579}, {"filename": "/test/assets/resources/native/87/87eec132-c00e-4b0a-bcc0-6fbcaf8d1341@e0c54.a91cf.bin", "start": 140121579, "end": 140121783}, {"filename": "/test/assets/resources/native/88/881087b4-abf2-4fcf-97c9-613ba14e224c.f1e8f.astc", "start": 140121783, "end": 140187335}, {"filename": "/test/assets/resources/native/88/881087b4-abf2-4fcf-97c9-613ba14e224c.f1e8f.png", "start": 140187335, "end": 140263486}, {"filename": "/test/assets/resources/native/88/88419442-b13c-44ff-9a20-add23cfd9227@761c2.c316e.bin", "start": 140263486, "end": 140278542}, {"filename": "/test/assets/resources/native/88/886ac3b0-3ee1-4c69-8e6d-033de5247d4f.b0a03.png", "start": 140278542, "end": 140352243}, {"filename": "/test/assets/resources/native/88/8886912c-8590-47df-8ce2-e63ed4f948fd.d89b7.astc", "start": 140352243, "end": 140417795}, {"filename": "/test/assets/resources/native/88/8886912c-8590-47df-8ce2-e63ed4f948fd.d89b7.png", "start": 140417795, "end": 140470466}, {"filename": "/test/assets/resources/native/89/8937bf15-d14f-47ec-bbb7-b91a46ba6abd.4d0be.astc", "start": 140470466, "end": 140536018}, {"filename": "/test/assets/resources/native/89/8937bf15-d14f-47ec-bbb7-b91a46ba6abd.4d0be.png", "start": 140536018, "end": 140603924}, {"filename": "/test/assets/resources/native/89/8950c93d-9438-4fa4-a465-a484510144d7.e42aa.mp3", "start": 140603924, "end": 140662482, "audio": 1}, {"filename": "/test/assets/resources/native/89/899c2406-57c3-4a46-bf86-07c4d4db83c4@01aaf.92084.bin", "start": 140662482, "end": 140662686}, {"filename": "/test/assets/resources/native/89/89a0e487-02b9-4f30-8652-a8907dffc120.97ba6.astc", "start": 140662686, "end": 140728238}, {"filename": "/test/assets/resources/native/89/89a0e487-02b9-4f30-8652-a8907dffc120.97ba6.png", "start": 140728238, "end": 140876250}, {"filename": "/test/assets/resources/native/89/89c1bfff-a857-47cc-a15d-c4487491539c@3175e.a2b1c.bin", "start": 140876250, "end": 140876454}, {"filename": "/test/assets/resources/native/8a/8a2989e0-6c56-482b-9ae5-2247ae93ba6c@10d49.bf923.bin", "start": 140876454, "end": 140909832}, {"filename": "/test/assets/resources/native/8a/8a2e4fd0-6cd7-429f-bb7a-be327ffa5828@bbca8.762c8.bin", "start": 140909832, "end": 140910036}, {"filename": "/test/assets/resources/native/8a/8a51f512-f3cb-42dd-863c-3454b4c3c15a@9c589.59a35.bin", "start": 140910036, "end": 141529660}, {"filename": "/test/assets/resources/native/8a/8a7280ef-a672-43d0-ac96-3596c1c92400.3e0b8.astc", "start": 141529660, "end": 141595212}, {"filename": "/test/assets/resources/native/8a/8a7280ef-a672-43d0-ac96-3596c1c92400.3e0b8.png", "start": 141595212, "end": 141763923}, {"filename": "/test/assets/resources/native/8a/8ac6e865-dd71-4cd5-ab4c-08200cd78c4a@9177b.374da.bin", "start": 141763923, "end": 141764127}, {"filename": "/test/assets/resources/native/8b/8b37c4e0-ac26-4d96-b934-76846de669e1.66ec6.png", "start": 141764127, "end": 141797492}, {"filename": "/test/assets/resources/native/8b/8b404bd8-9aa2-4b8f-91b2-22358f32710a@3977a.09b5c.bin", "start": 141797492, "end": 141797696}, {"filename": "/test/assets/resources/native/8b/8b514de5-c1fb-4b0b-bd6b-e17a71731593@6a9df.476ff.bin", "start": 141797696, "end": 141799112}, {"filename": "/test/assets/resources/native/8b/8bc9fe2d-fb2b-48b4-a3a3-bebc3d9affc9.66dcb.mp3", "start": 141799112, "end": 141802399, "audio": 1}, {"filename": "/test/assets/resources/native/8b/8bd5606b-5e7e-44a7-b6c9-583775a4717c@58095.5a8c0.bin", "start": 141802399, "end": 141802635}, {"filename": "/test/assets/resources/native/8b/8bd61ccf-e07b-4ae0-b2ab-6b463ced0c63@25893.c83a2.bin", "start": 141802635, "end": 141802839}, {"filename": "/test/assets/resources/native/8c/8c3982f7-1842-40ab-8671-dccf3d2c7104.22ebf.png", "start": 141802839, "end": 141810012}, {"filename": "/test/assets/resources/native/8c/8c3b7ba6-43a8-496f-bff7-5e7608d460a0@ce732.080b8.bin", "start": 141810012, "end": 141811900}, {"filename": "/test/assets/resources/native/8c/8c4cba65-1079-4eaf-bc64-236f6947976a@01a55.9144e.bin", "start": 141811900, "end": 141812104}, {"filename": "/test/assets/resources/native/8d/8d0c24bb-faa7-4c86-bd69-a7e15f03798e.113da.astc", "start": 141812104, "end": 141877656}, {"filename": "/test/assets/resources/native/8d/8d0c24bb-faa7-4c86-bd69-a7e15f03798e.113da.png", "start": 141877656, "end": 141911050}, {"filename": "/test/assets/resources/native/8d/8d197438-66b5-4bd0-acc9-e01f57aa95e0@07cbd.7667b.bin", "start": 141911050, "end": 141911254}, {"filename": "/test/assets/resources/native/8d/8d1f8756-62ac-43aa-9cdc-4b7fc3862760.1d568.png", "start": 141911254, "end": 143825874}, {"filename": "/test/assets/resources/native/8d/8d407144-e3ac-4b7e-8a95-e283a990a93f.e99f1.astc", "start": 143825874, "end": 143913506}, {"filename": "/test/assets/resources/native/8d/8d407144-e3ac-4b7e-8a95-e283a990a93f.e99f1.pkm", "start": 143913506, "end": 144088490}, {"filename": "/test/assets/resources/native/8d/8d407144-e3ac-4b7e-8a95-e283a990a93f.e99f1.png", "start": 144088490, "end": 144242585}, {"filename": "/test/assets/resources/native/8d/8d407144-e3ac-4b7e-8a95-e283a990a93f.e99f1.pvr", "start": 144242585, "end": 144418151}, {"filename": "/test/assets/resources/native/8d/8d4483e4-425b-428e-87e1-83e4b8cc8b9c.42e83.png", "start": 144418151, "end": 144420767}, {"filename": "/test/assets/resources/native/8d/8d9e6e03-787b-4cec-a0c3-1103b51f71e7@05eb7.c8906.bin", "start": 144420767, "end": 144420971}, {"filename": "/test/assets/resources/native/8d/8df7d90c-abeb-4367-95e3-07541239d79e.d4775.astc", "start": 144420971, "end": 144486523}, {"filename": "/test/assets/resources/native/8d/8df7d90c-abeb-4367-95e3-07541239d79e.d4775.png", "start": 144486523, "end": 144488156}, {"filename": "/test/assets/resources/native/8e/8e0261fa-bc9c-49f8-a1c3-8e6589e28441.548f7.png", "start": 144488156, "end": 144500785}, {"filename": "/test/assets/resources/native/8e/8e14d853-99ee-45ec-8877-c73623867b71@d3e2b.96838.bin", "start": 144500785, "end": 144500989}, {"filename": "/test/assets/resources/native/8e/8e2a2f38-ed91-40f5-ad73-58f39126cddb.2e760.astc", "start": 144500989, "end": 144566541}, {"filename": "/test/assets/resources/native/8e/8e2a2f38-ed91-40f5-ad73-58f39126cddb.2e760.png", "start": 144566541, "end": 144605954}, {"filename": "/test/assets/resources/native/8e/8ef0ff2d-10c0-461d-a9ba-eb8f6ca7bf69.11944.png", "start": 144605954, "end": 144618838}, {"filename": "/test/assets/resources/native/8e/8ef8c234-fc34-4d52-aa69-114d855a3596@898a3.d886a.bin", "start": 144618838, "end": 144852614}, {"filename": "/test/assets/resources/native/8f/8f077de9-6d18-4e47-b086-03d2657dda0d.a1f8a.mp3", "start": 144852614, "end": 144865249, "audio": 1}, {"filename": "/test/assets/resources/native/8f/8f54dd74-b930-4bb5-8e80-d13d9562a042.b0b34.png", "start": 144865249, "end": 144871555}, {"filename": "/test/assets/resources/native/8f/8fe0d484-c44c-4bfc-aafb-1776d0784644.b0b61.png", "start": 144871555, "end": 144876996}, {"filename": "/test/assets/resources/native/90/9043fb6a-4ac3-4500-8a99-d71e79ad0433.49c87.png", "start": 144876996, "end": 144964251}, {"filename": "/test/assets/resources/native/90/906e1703-ea80-40f3-9f0f-26a71a6f83bd.7dce2.astc", "start": 144964251, "end": 145029803}, {"filename": "/test/assets/resources/native/90/906e1703-ea80-40f3-9f0f-26a71a6f83bd.7dce2.png", "start": 145029803, "end": 145112168}, {"filename": "/test/assets/resources/native/90/908056b6-6418-425e-a7d9-5b7f9cce88eb.5b3a1.astc", "start": 145112168, "end": 145177720}, {"filename": "/test/assets/resources/native/90/908056b6-6418-425e-a7d9-5b7f9cce88eb.5b3a1.png", "start": 145177720, "end": 145287883}, {"filename": "/test/assets/resources/native/90/908fbc9a-bcec-40ba-811f-f85fcba54be9@16541.20496.bin", "start": 145287883, "end": 145778235}, {"filename": "/test/assets/resources/native/90/9099145e-d152-476a-bd1b-dcee71d27f56.4b960.jpg", "start": 145778235, "end": 145821172}, {"filename": "/test/assets/resources/native/90/90bd0616-8ed3-4873-bd1b-b0b182c8241e@0774f.9e499.bin", "start": 145821172, "end": 145840900}, {"filename": "/test/assets/resources/native/90/90df2fab-cb37-4582-98d3-58f278539662@9991a.076cd.bin", "start": 145840900, "end": 146281828}, {"filename": "/test/assets/resources/native/91/911e489c-2d97-4209-a744-eebd23a1ad81@733c4.a3ec2.bin", "start": 146281828, "end": 146284956}, {"filename": "/test/assets/resources/native/91/9124bb0a-d630-4fc7-a1bb-2245e0996c6a@37377.541d6.bin", "start": 146284956, "end": 146297628}, {"filename": "/test/assets/resources/native/91/9141dbf0-6a23-4743-8a02-16f8aea5cb16.e4604.astc", "start": 146297628, "end": 146647424}, {"filename": "/test/assets/resources/native/91/9141dbf0-6a23-4743-8a02-16f8aea5cb16.e4604.png", "start": 146647424, "end": 146879164}, {"filename": "/test/assets/resources/native/91/914c0be3-1267-44a0-8691-e3967f2f8252.80ad4.astc", "start": 146879164, "end": 146944716}, {"filename": "/test/assets/resources/native/91/914c0be3-1267-44a0-8691-e3967f2f8252.80ad4.png", "start": 146944716, "end": 147078229}, {"filename": "/test/assets/resources/native/91/9156293a-1e87-4978-a240-0d7ea410af99@cfd98.4211c.bin", "start": 147078229, "end": 147085129}, {"filename": "/test/assets/resources/native/91/9168b952-c3a7-4728-ab9a-58eb8ee9e6b5.33800.png", "start": 147085129, "end": 147085357}, {"filename": "/test/assets/resources/native/91/91c4d535-32d7-4287-8d2a-bc654e5a44a0@b47c0@40c10.aff66.png", "start": 147085357, "end": 148332292}, {"filename": "/test/assets/resources/native/91/91c4d535-32d7-4287-8d2a-bc654e5a44a0@b47c0@74afd.89394.png", "start": 148332292, "end": 149527265}, {"filename": "/test/assets/resources/native/91/91c4d535-32d7-4287-8d2a-bc654e5a44a0@b47c0@7d38f.02866.png", "start": 149527265, "end": 150634703}, {"filename": "/test/assets/resources/native/91/91c4d535-32d7-4287-8d2a-bc654e5a44a0@b47c0@8fd34.53d35.png", "start": 150634703, "end": 151873747}, {"filename": "/test/assets/resources/native/91/91c4d535-32d7-4287-8d2a-bc654e5a44a0@b47c0@bb97f.f77ec.png", "start": 151873747, "end": 152760764}, {"filename": "/test/assets/resources/native/91/91c4d535-32d7-4287-8d2a-bc654e5a44a0@b47c0@e9a6d.50ff3.png", "start": 152760764, "end": 154000994}, {"filename": "/test/assets/resources/native/91/91e3f09f-a1b0-46c4-b616-8f1a7e5700d6.92dd7.astc", "start": 154000994, "end": 154066546}, {"filename": "/test/assets/resources/native/91/91e3f09f-a1b0-46c4-b616-8f1a7e5700d6.92dd7.png", "start": 154066546, "end": 154080212}, {"filename": "/test/assets/resources/native/92/92170a29-3ec9-4bcd-9a76-8639814ea0f4@d2709.fb400.bin", "start": 154080212, "end": 163528748}, {"filename": "/test/assets/resources/native/92/92493344-4ea8-4c70-96fa-8a5315d87edd@f3a9b.1b05b.bin", "start": 163528748, "end": 163692284}, {"filename": "/test/assets/resources/native/92/92545444-dd6e-4173-9da2-1072fafdf7ea@dc6bd.2dbf3.bin", "start": 163692284, "end": 163950228}, {"filename": "/test/assets/resources/native/92/927a1d1d-83b8-4e3f-b959-ebd01b2f3a67.5844c.png", "start": 163950228, "end": 163951105}, {"filename": "/test/assets/resources/native/92/9283c607-5346-4a6d-8102-ff94c13b019d@8eacc.1ef30.bin", "start": 163951105, "end": 163982785}, {"filename": "/test/assets/resources/native/93/931ba2e1-e71d-48db-9122-02ea4d41ae0e.e2872.astc", "start": 163982785, "end": 164048337}, {"filename": "/test/assets/resources/native/93/931ba2e1-e71d-48db-9122-02ea4d41ae0e.e2872.png", "start": 164048337, "end": 164256252}, {"filename": "/test/assets/resources/native/93/938d5766-4d7a-4114-9252-1d71f702d6f4.63c19.png", "start": 164256252, "end": 164744556}, {"filename": "/test/assets/resources/native/93/93b16173-b7be-48b5-885e-4dd3f7693500.7e091.png", "start": 164744556, "end": 164893542}, {"filename": "/test/assets/resources/native/94/94067e6b-9c24-4dab-b0c3-7055755ea40e.ba4b3.astc", "start": 164893542, "end": 164959094}, {"filename": "/test/assets/resources/native/94/94067e6b-9c24-4dab-b0c3-7055755ea40e.ba4b3.png", "start": 164959094, "end": 164984476}, {"filename": "/test/assets/resources/native/94/9452cd28-7284-4a60-9323-c76a0c001662.2fab5.png", "start": 164984476, "end": 164992986}, {"filename": "/test/assets/resources/native/94/948ca78b-a8f7-494d-bd18-c758e0bf1b9b.109a7.png", "start": 164992986, "end": 164994298}, {"filename": "/test/assets/resources/native/95/951249e0-9f16-456d-8b85-a6ca954da16b.c06a9.png", "start": 164994298, "end": 164995348}, {"filename": "/test/assets/resources/native/96/960745fd-5b81-4efb-ae8b-775ded6541d4.daf15.astc", "start": 164995348, "end": 165060900}, {"filename": "/test/assets/resources/native/96/960745fd-5b81-4efb-ae8b-775ded6541d4.daf15.png", "start": 165060900, "end": 165192768}, {"filename": "/test/assets/resources/native/96/9663b614-f364-42a2-93cd-fab330b9b799.e7c37.astc", "start": 165192768, "end": 165280400}, {"filename": "/test/assets/resources/native/96/9663b614-f364-42a2-93cd-fab330b9b799.e7c37.png", "start": 165280400, "end": 165286709}, {"filename": "/test/assets/resources/native/96/968f6eb4-5423-42cd-ad35-e7992721df38.dd3f9.png", "start": 165286709, "end": 166150030}, {"filename": "/test/assets/resources/native/97/9705a308-ecfb-4668-8444-481195e2799e@f30d5.333d2.bin", "start": 166150030, "end": 166172902}, {"filename": "/test/assets/resources/native/97/971d2f64-8898-4f5f-ae4c-a3c271fc0c54.5cfb1.astc", "start": 166172902, "end": 166238454}, {"filename": "/test/assets/resources/native/97/971d2f64-8898-4f5f-ae4c-a3c271fc0c54.5cfb1.png", "start": 166238454, "end": 166381646}, {"filename": "/test/assets/resources/native/97/975e2d87-b108-491e-8f95-88b48ce6efdd@f571e.8221e.bin", "start": 166381646, "end": 166441010}, {"filename": "/test/assets/resources/native/97/978c176f-d7fc-437a-842a-20814b17970a.00fff.astc", "start": 166441010, "end": 166506562}, {"filename": "/test/assets/resources/native/97/978c176f-d7fc-437a-842a-20814b17970a.00fff.png", "start": 166506562, "end": 166511350}, {"filename": "/test/assets/resources/native/97/97a807d5-7906-4497-8387-cdac6f97a5c4@5e786.6c4b4.bin", "start": 166511350, "end": 167035702}, {"filename": "/test/assets/resources/native/97/97d7a9ce-bacf-4cf6-bcc0-08e5ee16ec13@4d163.c1dba.bin", "start": 167035702, "end": 167035906}, {"filename": "/test/assets/resources/native/97/97f63625-c5a6-4585-8809-93cf86d5d484.a5ca5.astc", "start": 167035906, "end": 167101458}, {"filename": "/test/assets/resources/native/97/97f63625-c5a6-4585-8809-93cf86d5d484.a5ca5.png", "start": 167101458, "end": 167139842}, {"filename": "/test/assets/resources/native/97/97f843eb-b5a8-4e00-b6f9-5e0463ff93b0@4825d.b4230.bin", "start": 167139842, "end": 167140314}, {"filename": "/test/assets/resources/native/98/98d2e343-d8a8-4099-a9bf-dd072ee73bc9.3fe6c.astc", "start": 167140314, "end": 167205866}, {"filename": "/test/assets/resources/native/98/98d2e343-d8a8-4099-a9bf-dd072ee73bc9.3fe6c.png", "start": 167205866, "end": 167263412}, {"filename": "/test/assets/resources/native/99/997cca22-4e0a-4a76-bb87-353650a2da2f@19bbc.f8337.bin", "start": 167263412, "end": 167632820}, {"filename": "/test/assets/resources/native/99/99af5610-a0e9-4359-825a-deea6876dfa9.483d2.astc", "start": 167632820, "end": 167698372}, {"filename": "/test/assets/resources/native/99/99af5610-a0e9-4359-825a-deea6876dfa9.483d2.png", "start": 167698372, "end": 167817400}, {"filename": "/test/assets/resources/native/99/99dce3db-fc93-41cc-ab05-34de3befca1e.b8d7e.png", "start": 167817400, "end": 167821208}, {"filename": "/test/assets/resources/native/9b/9b19fd3b-4a61-429b-ac88-7a7d38dae1d5@58701.2e251.bin", "start": 167821208, "end": 167824120}, {"filename": "/test/assets/resources/native/9b/9b40b3b0-9ede-40aa-8422-9f084ff6c824@bda33.3dcce.bin", "start": 167824120, "end": 167824356}, {"filename": "/test/assets/resources/native/9b/9b836e4f-fd37-44aa-9e92-048d9993d9ff.40050.png", "start": 167824356, "end": 167825839}, {"filename": "/test/assets/resources/native/9b/9bf8ef0c-92b6-46bf-a92f-03a61e508556.9052b.png", "start": 167825839, "end": 167827988}, {"filename": "/test/assets/resources/native/9c/9ca6d33f-3b93-4d7a-b737-66f40bd469e6@57a45.662f7.bin", "start": 167827988, "end": 167951012}, {"filename": "/test/assets/resources/native/9d/9d13603e-90ba-4190-a1d6-7bfafeaff29d.778d1.astc", "start": 167951012, "end": 168300808}, {"filename": "/test/assets/resources/native/9d/9d13603e-90ba-4190-a1d6-7bfafeaff29d.778d1.png", "start": 168300808, "end": 169043427}, {"filename": "/test/assets/resources/native/9d/9d7adf22-9597-441d-a51a-c7d04c2a0551@47640.9aae0.bin", "start": 169043427, "end": 169407891}, {"filename": "/test/assets/resources/native/9d/9d8703b5-4020-4611-a5c4-7144da3a3ad0@66d6c.832f7.bin", "start": 169407891, "end": 169418523}, {"filename": "/test/assets/resources/native/9d/9dc54145-da94-49fc-b38e-cc45242c75ea.022e6.png", "start": 169418523, "end": 169421214}, {"filename": "/test/assets/resources/native/9d/9dce13eb-bbaa-457c-a93e-028fb3fb4d33.fb582.astc", "start": 169421214, "end": 169486766}, {"filename": "/test/assets/resources/native/9d/9dce13eb-bbaa-457c-a93e-028fb3fb4d33.fb582.png", "start": 169486766, "end": 169503827}, {"filename": "/test/assets/resources/native/9e/9e3b6cfd-0ab6-4b5e-aeba-a9a0a5dcd470.6e2ed.astc", "start": 169503827, "end": 169569379}, {"filename": "/test/assets/resources/native/9e/9e3b6cfd-0ab6-4b5e-aeba-a9a0a5dcd470.6e2ed.png", "start": 169569379, "end": 169733250}, {"filename": "/test/assets/resources/native/9e/9e662f73-c421-4a04-9796-d2b381eb5432@f4a5e.d05ad.bin", "start": 169733250, "end": 169751590}, {"filename": "/test/assets/resources/native/9e/9ec3250a-5984-476f-a6a3-6c80db93c8f2@567f2.4a3ea.bin", "start": 169751590, "end": 169850486}, {"filename": "/test/assets/resources/native/9f/9f8a217f-355b-492e-b2fa-749ea2d5d9d0.e8c1b.astc", "start": 169850486, "end": 169916038}, {"filename": "/test/assets/resources/native/9f/9f8a217f-355b-492e-b2fa-749ea2d5d9d0.e8c1b.png", "start": 169916038, "end": 170088108}, {"filename": "/test/assets/resources/native/a0/a0358e96-211e-4c5c-a576-c68e4e379449.a3d9b.png", "start": 170088108, "end": 170133256}, {"filename": "/test/assets/resources/native/a0/a040e6f4-689e-4f25-ac2f-7e3431f5bfb6.02dcd.astc", "start": 170133256, "end": 170198808}, {"filename": "/test/assets/resources/native/a0/a040e6f4-689e-4f25-ac2f-7e3431f5bfb6.02dcd.png", "start": 170198808, "end": 170240153}, {"filename": "/test/assets/resources/native/a0/a058437e-8554-4742-81d6-46ae50b15a41@8cf84.efb16.bin", "start": 170240153, "end": 170244757}, {"filename": "/test/assets/resources/native/a0/a075176d-b6d3-40db-a2ae-06afcea459f1.ad458.astc", "start": 170244757, "end": 170310309}, {"filename": "/test/assets/resources/native/a0/a075176d-b6d3-40db-a2ae-06afcea459f1.ad458.png", "start": 170310309, "end": 170382885}, {"filename": "/test/assets/resources/native/a0/a0f500fe-bc37-4eb3-987c-f7555080c855@d3e2b.633ff.bin", "start": 170382885, "end": 170383905}, {"filename": "/test/assets/resources/native/a1/a1467c5e-463b-4fa6-a5a0-8145a2abf893@042b7.dcae3.bin", "start": 170383905, "end": 170434125}, {"filename": "/test/assets/resources/native/a1/a1587532-4ea9-465f-bf5b-82fb5a9f6921@f377a.f84a8.bin", "start": 170434125, "end": 170630153}, {"filename": "/test/assets/resources/native/a1/a18fbd85-3a28-4723-8ed5-972e50e68ab3.b960e.astc", "start": 170630153, "end": 170695705}, {"filename": "/test/assets/resources/native/a1/a18fbd85-3a28-4723-8ed5-972e50e68ab3.b960e.png", "start": 170695705, "end": 170803728}, {"filename": "/test/assets/resources/native/a2/a2166c05-acab-4bf3-b21f-a77daf8ed255.b21fd.astc", "start": 170803728, "end": 170869280}, {"filename": "/test/assets/resources/native/a2/a2166c05-acab-4bf3-b21f-a77daf8ed255.b21fd.png", "start": 170869280, "end": 170910075}, {"filename": "/test/assets/resources/native/a2/a2973e1b-2bf4-48f1-af4d-d5f40726986a@0424a.114f4.bin", "start": 170910075, "end": 170993859}, {"filename": "/test/assets/resources/native/a2/a2ae8549-a259-4cd0-ab86-69554defd321.3092e.mp3", "start": 170993859, "end": 171006441, "audio": 1}, {"filename": "/test/assets/resources/native/a3/a3104581-02e5-42bd-80c7-9d8a340fa2c2.a85ea.astc", "start": 171006441, "end": 171071993}, {"filename": "/test/assets/resources/native/a3/a3104581-02e5-42bd-80c7-9d8a340fa2c2.a85ea.png", "start": 171071993, "end": 171151805}, {"filename": "/test/assets/resources/native/a3/a33a011b-328c-458a-8b4f-3351bf1f96a0.e75ce.astc", "start": 171151805, "end": 171239437}, {"filename": "/test/assets/resources/native/a3/a33a011b-328c-458a-8b4f-3351bf1f96a0.e75ce.png", "start": 171239437, "end": 171469657}, {"filename": "/test/assets/resources/native/a3/a362c20a-0d10-46e8-aec7-cb964c57cdf0.4ca66.astc", "start": 171469657, "end": 171557289}, {"filename": "/test/assets/resources/native/a3/a362c20a-0d10-46e8-aec7-cb964c57cdf0.4ca66.png", "start": 171557289, "end": 171731550}, {"filename": "/test/assets/resources/native/a3/a3d0dddb-65c3-4fa3-8699-df1c4e5a92dc.0ad21.astc", "start": 171731550, "end": 171797102}, {"filename": "/test/assets/resources/native/a3/a3d0dddb-65c3-4fa3-8699-df1c4e5a92dc.0ad21.png", "start": 171797102, "end": 171933308}, {"filename": "/test/assets/resources/native/a3/a3d4d28e-c584-442e-96e8-7b97ac440153.020f3.astc", "start": 171933308, "end": 171998860}, {"filename": "/test/assets/resources/native/a3/a3d4d28e-c584-442e-96e8-7b97ac440153.020f3.png", "start": 171998860, "end": 172077354}, {"filename": "/test/assets/resources/native/a4/a411228a-11d3-4788-b28d-e43b30ea5787.4d525.mp3", "start": 172077354, "end": 172377801, "audio": 1}, {"filename": "/test/assets/resources/native/a4/a434378e-f973-4bc1-9b98-8f1d4bd8e2d6@16b27.61d18.bin", "start": 172377801, "end": 172378005}, {"filename": "/test/assets/resources/native/a4/a43a834e-6497-4c02-88f7-095eb4b75125@8beb5.b3d74.bin", "start": 172378005, "end": 172664033}, {"filename": "/test/assets/resources/native/a4/a445ebc3-a75a-468b-afaa-d8cd91d33bc0@9bf72.1c61f.bin", "start": 172664033, "end": 172664269}, {"filename": "/test/assets/resources/native/a4/a4498652-da3e-457f-842f-b06fd1c08414.827f2.astc", "start": 172664269, "end": 172729821}, {"filename": "/test/assets/resources/native/a4/a4498652-da3e-457f-842f-b06fd1c08414.827f2.png", "start": 172729821, "end": 172858715}, {"filename": "/test/assets/resources/native/a4/a47830dd-4be3-4090-a7dd-81cbc4132cf6@4c8f0.e19e7.bin", "start": 172858715, "end": 172859895}, {"filename": "/test/assets/resources/native/a5/a51774c6-70aa-46c8-b116-ac377846075e.81fdb.png", "start": 172859895, "end": 172926950}, {"filename": "/test/assets/resources/native/a5/a533890b-b843-4687-9fdf-9c337ec86c50@59e63.d6ec4.bin", "start": 172926950, "end": 173260142}, {"filename": "/test/assets/resources/native/a5/a5b30010-d661-4d93-ab4a-e66d4425e48f@39529.128e9.bin", "start": 173260142, "end": 173444598}, {"filename": "/test/assets/resources/native/a5/a5d380f8-c39a-4190-95cd-48e01cbcec6d@30a8d.a807a.bin", "start": 173444598, "end": 173447006}, {"filename": "/test/assets/resources/native/a6/a6143306-7e5d-4595-8e1e-76db2a53895c.da17c.astc", "start": 173447006, "end": 173512558}, {"filename": "/test/assets/resources/native/a6/a6143306-7e5d-4595-8e1e-76db2a53895c.da17c.png", "start": 173512558, "end": 173659740}, {"filename": "/test/assets/resources/native/a6/a65c469b-e292-4679-a163-cff86cff40cf@2edb6.0418f.bin", "start": 173659740, "end": 173659944}, {"filename": "/test/assets/resources/native/a6/a694eb62-a87e-4885-97a8-685a10714ef7@36684.8cd75.bin", "start": 173659944, "end": 173660148}, {"filename": "/test/assets/resources/native/a6/a6a5b753-44a6-4f7b-a3e1-ffd4e8946f71.54f21.mp3", "start": 173660148, "end": 173671923, "audio": 1}, {"filename": "/test/assets/resources/native/a7/a70631b5-a553-40e0-a253-dca84942beda.bb696.png", "start": 173671923, "end": 173672589}, {"filename": "/test/assets/resources/native/a7/a7103597-e475-4394-8736-4082328b5a53.9d21c.png", "start": 173672589, "end": 173805219}, {"filename": "/test/assets/resources/native/a7/a76d6cee-8db4-41e7-99ed-f345ad6e69fc.c255a.png", "start": 173805219, "end": 173886751}, {"filename": "/test/assets/resources/native/a7/a78bb229-471a-4e27-82ae-6bc735586738.ad80c.png", "start": 173886751, "end": 173891088}, {"filename": "/test/assets/resources/native/a7/a7f14ed0-f6f1-4467-a1fd-b4d190648d6e.9af7c.astc", "start": 173891088, "end": 173956640}, {"filename": "/test/assets/resources/native/a7/a7f14ed0-f6f1-4467-a1fd-b4d190648d6e.9af7c.png", "start": 173956640, "end": 174052506}, {"filename": "/test/assets/resources/native/a8/a83b4926-aa41-4709-99fc-9dd97bf6f15d@ce571.801ed.bin", "start": 174052506, "end": 174065898}, {"filename": "/test/assets/resources/native/a8/a86278f1-b2e7-4409-8db8-9bc2c3be689d@40898.1d58a.bin", "start": 174065898, "end": 174186442}, {"filename": "/test/assets/resources/native/a8/a8e97bd0-bfbb-40c8-969f-108855e3fdb6.b6862.astc", "start": 174186442, "end": 174251994}, {"filename": "/test/assets/resources/native/a8/a8e97bd0-bfbb-40c8-969f-108855e3fdb6.b6862.png", "start": 174251994, "end": 174404497}, {"filename": "/test/assets/resources/native/a8/a8ef3d25-d1fc-4cbc-a7e8-62c861f4b8a4.3d2b8.astc", "start": 174404497, "end": 174470049}, {"filename": "/test/assets/resources/native/a8/a8ef3d25-d1fc-4cbc-a7e8-62c861f4b8a4.3d2b8.png", "start": 174470049, "end": 174532741}, {"filename": "/test/assets/resources/native/a9/a95363ac-d850-4811-87be-2e26e8a422a4.b105e.png", "start": 174532741, "end": 174533262}, {"filename": "/test/assets/resources/native/aa/aa4c6c56-b7d2-4363-97a8-d6abad55551a.a4af9.png", "start": 174533262, "end": 174534504}, {"filename": "/test/assets/resources/native/aa/aa761475-b918-4037-ba65-06e72f91a755@e768d.269ba.bin", "start": 174534504, "end": 174593352}, {"filename": "/test/assets/resources/native/aa/aa82c08f-3bdb-4ae1-aa53-de2a28f789cf@1d027.4606d.bin", "start": 174593352, "end": 175088736}, {"filename": "/test/assets/resources/native/aa/aaa0f626-aa79-4398-bc87-bbb5f01ba63a@52b7f.28abf.bin", "start": 175088736, "end": 175191472}, {"filename": "/test/assets/resources/native/aa/aaeba2b2-72bd-41df-aae8-e9ea4568df46@97409.ba518.bin", "start": 175191472, "end": 175247442}, {"filename": "/test/assets/resources/native/ab/ab83df06-228e-426b-86de-6f52086e660a@2aab5.4912e.bin", "start": 175247442, "end": 175247646}, {"filename": "/test/assets/resources/native/ab/ab91ba24-b656-4362-9097-a41edfd5f5a6@29366.777ef.bin", "start": 175247646, "end": 175275942}, {"filename": "/test/assets/resources/native/ab/abb0afcd-2e67-407f-8e85-3cc8b11b1edd.36162.mp3", "start": 175275942, "end": 175296040, "audio": 1}, {"filename": "/test/assets/resources/native/ab/abf1cd79-5e91-4284-af0e-4285f08a4767.b8f9c.astc", "start": 175296040, "end": 175558200}, {"filename": "/test/assets/resources/native/ab/abf1cd79-5e91-4284-af0e-4285f08a4767.b8f9c.png", "start": 175558200, "end": 175618233}, {"filename": "/test/assets/resources/native/ac/ac45c908-00c1-44f4-b652-1c55096b1ad1.feb7b.astc", "start": 175618233, "end": 175683785}, {"filename": "/test/assets/resources/native/ac/ac45c908-00c1-44f4-b652-1c55096b1ad1.feb7b.png", "start": 175683785, "end": 175701543}, {"filename": "/test/assets/resources/native/ac/ac9df0fd-3ff4-4581-978a-cd949f0c79ba.85688.astc", "start": 175701543, "end": 175767095}, {"filename": "/test/assets/resources/native/ac/ac9df0fd-3ff4-4581-978a-cd949f0c79ba.85688.png", "start": 175767095, "end": 175901316}, {"filename": "/test/assets/resources/native/ac/acadc3d4-f2f7-4a17-ae9e-82a832d77a3b.96aa5.astc", "start": 175901316, "end": 175966868}, {"filename": "/test/assets/resources/native/ac/acadc3d4-f2f7-4a17-ae9e-82a832d77a3b.96aa5.png", "start": 175966868, "end": 176030464}, {"filename": "/test/assets/resources/native/ad/ad3a6aec-b9d7-42fa-b028-3d0c787f30de.58d03.png", "start": 176030464, "end": 176337202}, {"filename": "/test/assets/resources/native/ad/ad811dd2-23ed-4e8d-9085-8f28c906731f.6587e.png", "start": 176337202, "end": 176421905}, {"filename": "/test/assets/resources/native/ae/ae00f625-f4ac-44b9-8dd7-d1b955edd559@782ac.14f8b.bin", "start": 176421905, "end": 176454193}, {"filename": "/test/assets/resources/native/ae/ae0e7270-233b-4841-b29d-5437485a4f31@29ccb.aca4a.bin", "start": 176454193, "end": 176754341}, {"filename": "/test/assets/resources/native/ae/ae61d62c-e682-4476-86f7-8b05be6090c8.251d5.astc", "start": 176754341, "end": 176819893}, {"filename": "/test/assets/resources/native/ae/ae61d62c-e682-4476-86f7-8b05be6090c8.251d5.png", "start": 176819893, "end": 176914842}, {"filename": "/test/assets/resources/native/ae/aeb60698-e7e0-4507-bf3f-fdaacef323be@32402.02608.bin", "start": 176914842, "end": 177324586}, {"filename": "/test/assets/resources/native/af/af1911ae-e7fa-41b6-91ca-c73e3a340e01@b47c0@40c10.345bd.png", "start": 177324586, "end": 178519227}, {"filename": "/test/assets/resources/native/af/af1911ae-e7fa-41b6-91ca-c73e3a340e01@b47c0@74afd.b3264.png", "start": 178519227, "end": 179715713}, {"filename": "/test/assets/resources/native/af/af1911ae-e7fa-41b6-91ca-c73e3a340e01@b47c0@7d38f.585e5.png", "start": 179715713, "end": 180908500}, {"filename": "/test/assets/resources/native/af/af1911ae-e7fa-41b6-91ca-c73e3a340e01@b47c0@8fd34.db04f.png", "start": 180908500, "end": 182147498}, {"filename": "/test/assets/resources/native/af/af1911ae-e7fa-41b6-91ca-c73e3a340e01@b47c0@bb97f.06518.png", "start": 182147498, "end": 183292282}, {"filename": "/test/assets/resources/native/af/af1911ae-e7fa-41b6-91ca-c73e3a340e01@b47c0@e9a6d.8f4d8.png", "start": 183292282, "end": 184571924}, {"filename": "/test/assets/resources/native/af/af7743ab-36bc-4e8b-8031-571af7e17bee@eb217.fd7f4.bin", "start": 184571924, "end": 184654168}, {"filename": "/test/assets/resources/native/af/afcbf1ea-d9a4-4118-a120-c525034a8c9c@18bc2.1b9f8.bin", "start": 184654168, "end": 185023576}, {"filename": "/test/assets/resources/native/af/afd2d46f-5156-479b-84bf-ef2e5df95aa0.00865.astc", "start": 185023576, "end": 185373372}, {"filename": "/test/assets/resources/native/af/afd2d46f-5156-479b-84bf-ef2e5df95aa0.00865.png", "start": 185373372, "end": 185847235}, {"filename": "/test/assets/resources/native/b0/b028eaa8-2055-49d4-82ef-b9959a46d7ac@187f8.5c77b.bin", "start": 185847235, "end": 186154255}, {"filename": "/test/assets/resources/native/b0/b06c4e9d-862f-4820-a625-1e43b24e3a49@98e48.d60dd.bin", "start": 186154255, "end": 186163479}, {"filename": "/test/assets/resources/native/b0/b0faf201-0c89-4696-a687-665e2cbae7db@d3e2b.85f19.bin", "start": 186163479, "end": 186163683}, {"filename": "/test/assets/resources/native/b1/b10d84b4-dddc-4f21-ba3b-edaca99ea757@9a678.b237d.bin", "start": 186163683, "end": 186169291}, {"filename": "/test/assets/resources/native/b1/b11e5daf-a8ff-4f8b-9628-19e25f79cb58.7b964.astc", "start": 186169291, "end": 186234843}, {"filename": "/test/assets/resources/native/b1/b11e5daf-a8ff-4f8b-9628-19e25f79cb58.7b964.png", "start": 186234843, "end": 186315377}, {"filename": "/test/assets/resources/native/b1/b1926be6-9129-4395-9600-e4bba481f89f@c4fde.72f68.bin", "start": 186315377, "end": 186315613}, {"filename": "/test/assets/resources/native/b1/b1bd9c55-9966-4e1e-a5f7-60726f2a4532@1e594.4d138.bin", "start": 186315613, "end": 186388973}, {"filename": "/test/assets/resources/native/b2/b20eee7e-cc10-42b0-a61d-d0dd643d10c2@ff17a.e72b8.bin", "start": 186388973, "end": 186409557}, {"filename": "/test/assets/resources/native/b2/b251f618-a58b-45ae-b477-83091ae55da0@60921.fc59b.bin", "start": 186409557, "end": 186410973}, {"filename": "/test/assets/resources/native/b2/b260161f-6c12-42ab-87de-b17f3424a6c2.35be7.astc", "start": 186410973, "end": 186476525}, {"filename": "/test/assets/resources/native/b2/b260161f-6c12-42ab-87de-b17f3424a6c2.35be7.png", "start": 186476525, "end": 186575360}, {"filename": "/test/assets/resources/native/b2/b2617542-fed9-48d0-9d22-3dac05a0e845@ff420.c9056.bin", "start": 186575360, "end": 186575564}, {"filename": "/test/assets/resources/native/b2/b269de97-1d71-4cf8-b052-43bb201afb27.e7697.astc", "start": 186575564, "end": 186641116}, {"filename": "/test/assets/resources/native/b2/b269de97-1d71-4cf8-b052-43bb201afb27.e7697.png", "start": 186641116, "end": 186729956}, {"filename": "/test/assets/resources/native/b2/b29549d6-4c12-4167-af9f-430b3213b684@54aca.6a041.bin", "start": 186729956, "end": 187877924}, {"filename": "/test/assets/resources/native/b3/b3086b47-a684-464a-921e-15e501b6876e.cf9b9.astc", "start": 187877924, "end": 187965556}, {"filename": "/test/assets/resources/native/b3/b3086b47-a684-464a-921e-15e501b6876e.cf9b9.png", "start": 187965556, "end": 188008561}, {"filename": "/test/assets/resources/native/b3/b3252cd1-99ec-4ec2-be1d-b52f7d70449c@672a7.793c9.bin", "start": 188008561, "end": 188339287}, {"filename": "/test/assets/resources/native/b3/b3429f85-6d96-4af4-a86f-56d73f9d6bb3.da7b5.png", "start": 188339287, "end": 188354340}, {"filename": "/test/assets/resources/native/b3/b3871ff9-4e79-4814-b649-a8b7566e0fce@096fb.78921.bin", "start": 188354340, "end": 188375988}, {"filename": "/test/assets/resources/native/b3/b3b6284a-e945-406c-9a02-d83b1389c04c@5f0c2.b2395.bin", "start": 188375988, "end": 188376224}, {"filename": "/test/assets/resources/native/b4/b4891455-7d5f-476c-901f-faf65d9174cd@f3ea3.73da2.bin", "start": 188376224, "end": 188601568}, {"filename": "/test/assets/resources/native/b4/b4b0ef66-6e31-471c-a357-a85596f05419.755b2.png", "start": 188601568, "end": 188605772}, {"filename": "/test/assets/resources/native/b4/b4f9035a-4fbd-449d-b67d-e2c091cddd46.ad61c.astc", "start": 188605772, "end": 188671324}, {"filename": "/test/assets/resources/native/b4/b4f9035a-4fbd-449d-b67d-e2c091cddd46.ad61c.png", "start": 188671324, "end": 188897096}, {"filename": "/test/assets/resources/native/b5/b52d1944-808c-47ea-ad76-c990ffd9b0e2.3092e.mp3", "start": 188897096, "end": 188909678, "audio": 1}, {"filename": "/test/assets/resources/native/b5/b5956070-359d-4bd9-a1fa-dce24f12be2b.dfb8d.png", "start": 188909678, "end": 188974780}, {"filename": "/test/assets/resources/native/b5/b5b27ab1-e740-4398-b407-848fc2b2c897.5d63c.png", "start": 188974780, "end": 188979806}, {"filename": "/test/assets/resources/native/b6/b6939f57-9232-4a39-8d9d-84310e26820f.fb244.png", "start": 188979806, "end": 188983054}, {"filename": "/test/assets/resources/native/b6/b6f511a8-5bec-4ca9-9ed6-89f71bedcc40.6f4cb.astc", "start": 188983054, "end": 189048606}, {"filename": "/test/assets/resources/native/b6/b6f511a8-5bec-4ca9-9ed6-89f71bedcc40.6f4cb.png", "start": 189048606, "end": 189116113}, {"filename": "/test/assets/resources/native/b7/b7294cf1-8242-4e1f-b22f-4336aaed88dd.fd82f.astc", "start": 189116113, "end": 189181665}, {"filename": "/test/assets/resources/native/b7/b7294cf1-8242-4e1f-b22f-4336aaed88dd.fd82f.png", "start": 189181665, "end": 189284582}, {"filename": "/test/assets/resources/native/b7/b730527c-3233-41c2-aaf7-7cdab58f9749.cdbc9.png", "start": 189284582, "end": 189284740}, {"filename": "/test/assets/resources/native/b7/b75cc619-564c-40b7-be6c-a51a189e0e04.764a3.png", "start": 189284740, "end": 189563867}, {"filename": "/test/assets/resources/native/b7/b78cf4d7-0a52-4f41-bc9b-0ba962bb3a2a.a6b03.astc", "start": 189563867, "end": 189826027}, {"filename": "/test/assets/resources/native/b7/b78cf4d7-0a52-4f41-bc9b-0ba962bb3a2a.a6b03.png", "start": 189826027, "end": 190217557}, {"filename": "/test/assets/resources/native/b7/b7a2b74c-2c4e-46cd-8b96-70fc5d000437@6d970.3fed2.bin", "start": 190217557, "end": 190218577}, {"filename": "/test/assets/resources/native/b7/b7e921d5-dd5f-4d61-a92d-e5e0c4d59228@fe410.bfee9.bin", "start": 190218577, "end": 190218781}, {"filename": "/test/assets/resources/native/b9/b90731bc-4761-437c-a610-03a836b82921@aafc4.a2d1d.bin", "start": 190218781, "end": 190316221}, {"filename": "/test/assets/resources/native/b9/b9500578-3b07-4b31-a6d6-871f6c9a4f9c.8f37d.astc", "start": 190316221, "end": 190381773}, {"filename": "/test/assets/resources/native/b9/b9500578-3b07-4b31-a6d6-871f6c9a4f9c.8f37d.png", "start": 190381773, "end": 190443480}, {"filename": "/test/assets/resources/native/b9/b95d6909-7a5a-4d4a-b2c1-90e36f646c42.68c09.astc", "start": 190443480, "end": 190509032}, {"filename": "/test/assets/resources/native/b9/b95d6909-7a5a-4d4a-b2c1-90e36f646c42.68c09.png", "start": 190509032, "end": 190632888}, {"filename": "/test/assets/resources/native/b9/b984855b-cfc9-4d6b-9909-af0d2d0a77a1@ecc57.cbddb.bin", "start": 190632888, "end": 190633092}, {"filename": "/test/assets/resources/native/b9/b9e56961-5767-4d94-8d76-6603a3c3d075.7fbc6.astc", "start": 190633092, "end": 190698644}, {"filename": "/test/assets/resources/native/b9/b9e56961-5767-4d94-8d76-6603a3c3d075.7fbc6.png", "start": 190698644, "end": 190793583}, {"filename": "/test/assets/resources/native/ba/ba1dcd8c-7e84-4596-ab54-d1c3b5124259@02e96.8af20.bin", "start": 190793583, "end": 191228603}, {"filename": "/test/assets/resources/native/ba/ba67bd8c-76f6-4969-bea1-586daf9812e1@9ba9b.5f731.bin", "start": 191228603, "end": 191276551}, {"filename": "/test/assets/resources/native/ba/ba822883-3349-4728-ad0a-98bcaeea8b05.9f766.astc", "start": 191276551, "end": 191342103}, {"filename": "/test/assets/resources/native/ba/ba822883-3349-4728-ad0a-98bcaeea8b05.9f766.png", "start": 191342103, "end": 191345840}, {"filename": "/test/assets/resources/native/ba/baa260a2-9ff7-4730-abbf-f63e6a61a541@ead60.900f1.bin", "start": 191345840, "end": 191347286}, {"filename": "/test/assets/resources/native/ba/bae3d360-9913-4222-accc-6a67f28d27b5.b5e54.astc", "start": 191347286, "end": 191412838}, {"filename": "/test/assets/resources/native/ba/bae3d360-9913-4222-accc-6a67f28d27b5.b5e54.png", "start": 191412838, "end": 191482836}, {"filename": "/test/assets/resources/native/bb/bb3f842a-17ca-4f01-b4f0-9b658f3b8709.5bb4a.png", "start": 191482836, "end": 197851818}, {"filename": "/test/assets/resources/native/bb/bb6b75ec-4ac3-4df3-b233-ee45f7f35c4c.e94d7.png", "start": 197851818, "end": 197855333}, {"filename": "/test/assets/resources/native/bb/bb6dc0aa-5016-4bf0-b62a-c1e75a935d14@a11d0.11861.bin", "start": 197855333, "end": 198170387}, {"filename": "/test/assets/resources/native/bb/bb6dc0aa-5016-4bf0-b62a-c1e75a935d14@c8860.5af2b.bin", "start": 198170387, "end": 198878987}, {"filename": "/test/assets/resources/native/bb/bba5f2ea-5ba3-4cdf-9822-82a7798df353.acee4.mp3", "start": 198878987, "end": 199817028, "audio": 1}, {"filename": "/test/assets/resources/native/bb/bbdc5e61-dd07-46fb-91ab-d96b3a42c273@8334f.b7d60.bin", "start": 199817028, "end": 199901864}, {"filename": "/test/assets/resources/native/bb/bbe89372-827a-4519-acaf-4889df2135aa@6fbb0.cad32.bin", "start": 199901864, "end": 199902068}, {"filename": "/test/assets/resources/native/bb/bbf953e1-ffb9-4370-950c-bcd64c2ddc81@4c1b3.dd03a.bin", "start": 199902068, "end": 199908296}, {"filename": "/test/assets/resources/native/bc/bcbd6d47-7c24-4456-936c-31fee9156d72.4384d.astc", "start": 199908296, "end": 200170456}, {"filename": "/test/assets/resources/native/bc/bcbd6d47-7c24-4456-936c-31fee9156d72.4384d.png", "start": 200170456, "end": 200544542}, {"filename": "/test/assets/resources/native/bd/bd1bcaba-bd7d-4a71-b143-997c882383e4.17df6.png", "start": 200544542, "end": 200545580}, {"filename": "/test/assets/resources/native/bd/bd8b9b1a-edbe-44cd-b159-e5ec2be0edfb.26c01.png", "start": 200545580, "end": 200547012}, {"filename": "/test/assets/resources/native/bd/bd8d6cc2-501b-4c45-b954-fbb667c65661.8e9d6.png", "start": 200547012, "end": 200552541}, {"filename": "/test/assets/resources/native/bd/bda5989f-3f26-4edc-9191-1b7baa0ea73d@29dcc.78921.bin", "start": 200552541, "end": 200574189}, {"filename": "/test/assets/resources/native/bd/bdfbf028-743b-44e4-b743-befe125d8a26.283d3.png", "start": 200574189, "end": 200575045}, {"filename": "/test/assets/resources/native/be/be1cd9e3-c779-409b-88e6-7b79bc096608.3506e.jpg", "start": 200575045, "end": 200608113}, {"filename": "/test/assets/resources/native/be/be343b60-a0dc-4274-8a2d-185674c1bfe4.f87bf.png", "start": 200608113, "end": 200610325}, {"filename": "/test/assets/resources/native/be/beb806cb-c418-4638-8775-04cb14e32759@c6513.d4d26.bin", "start": 200610325, "end": 200619527}, {"filename": "/test/assets/resources/native/be/befda35b-0dae-4ca1-80cd-d929cb02538f.28aaa.astc", "start": 200619527, "end": 200685079}, {"filename": "/test/assets/resources/native/be/befda35b-0dae-4ca1-80cd-d929cb02538f.28aaa.png", "start": 200685079, "end": 200747297}, {"filename": "/test/assets/resources/native/bf/bf3c962e-f1f1-46bb-961c-9c76835e0002.24401.astc", "start": 200747297, "end": 201009457}, {"filename": "/test/assets/resources/native/bf/bf3c962e-f1f1-46bb-961c-9c76835e0002.24401.png", "start": 201009457, "end": 201405121}, {"filename": "/test/assets/resources/native/bf/bf4af564-cf88-4d8c-8d5d-d85cd9045f34.df1fd.png", "start": 201405121, "end": 201413656}, {"filename": "/test/assets/resources/native/bf/bf573283-3235-4cb0-adaa-d5786e287f66@74a7d.8e0b4.bin", "start": 201413656, "end": 201413860}, {"filename": "/test/assets/resources/native/bf/bfeccbf4-b8f3-4842-8b93-dd0f188a88ce.61323.astc", "start": 201413860, "end": 201479412}, {"filename": "/test/assets/resources/native/bf/bfeccbf4-b8f3-4842-8b93-dd0f188a88ce.61323.png", "start": 201479412, "end": 201586941}, {"filename": "/test/assets/resources/native/c0/c017bd9b-46db-479f-a2d6-bfaf918bb743.65407.astc", "start": 201586941, "end": 201849101}, {"filename": "/test/assets/resources/native/c0/c017bd9b-46db-479f-a2d6-bfaf918bb743.65407.png", "start": 201849101, "end": 202284536}, {"filename": "/test/assets/resources/native/c0/c02db748-f9d7-4e4d-b824-7d580af8f407@190f5.c6974.bin", "start": 202284536, "end": 202294896}, {"filename": "/test/assets/resources/native/c0/c02f9516-52f8-457c-ac33-d7a5448f9abe.da528.astc", "start": 202294896, "end": 202360448}, {"filename": "/test/assets/resources/native/c0/c02f9516-52f8-457c-ac33-d7a5448f9abe.da528.png", "start": 202360448, "end": 202474062}, {"filename": "/test/assets/resources/native/c1/c166f427-c87b-4b1c-a1cb-1ed704d79b50@3977a.baa0d.bin", "start": 202474062, "end": 202474266}, {"filename": "/test/assets/resources/native/c1/c185ae00-3e26-47f5-bd2a-ca3f9931580e.7119f.astc", "start": 202474266, "end": 202539818}, {"filename": "/test/assets/resources/native/c1/c185ae00-3e26-47f5-bd2a-ca3f9931580e.7119f.png", "start": 202539818, "end": 202624377}, {"filename": "/test/assets/resources/native/c1/c1afe086-0261-4ca2-96be-f3fd4e52abb6@5a139.09858.bin", "start": 202624377, "end": 202630233}, {"filename": "/test/assets/resources/native/c3/c3c51e7f-fcad-45b2-b152-59c304ea1cab.a8933.png", "start": 202630233, "end": 202658132}, {"filename": "/test/assets/resources/native/c3/c3fa5163-4eb4-49ee-841d-8bc7b2fd85de@ff064.6b6be.bin", "start": 202658132, "end": 202666742}, {"filename": "/test/assets/resources/native/c4/c436f574-8849-4a68-a3b1-9d6ffa6e16d3@3977a.fec2c.bin", "start": 202666742, "end": 202666946}, {"filename": "/test/assets/resources/native/c4/c44e85c5-42cd-4b09-8f20-8d277e81e857.a3061.astc", "start": 202666946, "end": 202929106}, {"filename": "/test/assets/resources/native/c4/c44e85c5-42cd-4b09-8f20-8d277e81e857.a3061.png", "start": 202929106, "end": 203344772}, {"filename": "/test/assets/resources/native/c4/c4898149-1a4c-413e-b759-f19f8cb19e78.d8a93.mp3", "start": 203344772, "end": 203346905, "audio": 1}, {"filename": "/test/assets/resources/native/c4/c48e8c8e-babf-49d7-bd1f-623a3bd187dc@0fba8.4e69a.png", "start": 203346905, "end": 206502053}, {"filename": "/test/assets/resources/native/c4/c48e8c8e-babf-49d7-bd1f-623a3bd187dc@53e0d.6c3dc.jpg", "start": 206502053, "end": 207632114}, {"filename": "/test/assets/resources/native/c4/c48e8c8e-babf-49d7-bd1f-623a3bd187dc@7a57c.4c11b.bin", "start": 207632114, "end": 207693182}, {"filename": "/test/assets/resources/native/c4/c48e8c8e-babf-49d7-bd1f-623a3bd187dc@87c2d.c5c94.png", "start": 207693182, "end": 209758373}, {"filename": "/test/assets/resources/native/c4/c48e8c8e-babf-49d7-bd1f-623a3bd187dc@f71a2.98f13.jpg", "start": 209758373, "end": 210619720}, {"filename": "/test/assets/resources/native/c4/c4ae0520-e575-4875-a1e4-7e5a1b10da8b.c5d9b.png", "start": 210619720, "end": 211152920}, {"filename": "/test/assets/resources/native/c5/c51e5545-7bfd-436c-b7af-8f256572b79a@7e814.d2384.bin", "start": 211152920, "end": 211408152}, {"filename": "/test/assets/resources/native/c5/c55b800d-8d2a-4c22-9265-ebee753e95db.c25c9.astc", "start": 211408152, "end": 211473704}, {"filename": "/test/assets/resources/native/c5/c55b800d-8d2a-4c22-9265-ebee753e95db.c25c9.png", "start": 211473704, "end": 211476414}, {"filename": "/test/assets/resources/native/c5/c570440f-637e-4b63-ac51-c865881c5fcc.b13a1.png", "start": 211476414, "end": 211480972}, {"filename": "/test/assets/resources/native/c6/c6335096-8882-48d9-9126-4ea232120a54@971fb.05bea.bin", "start": 211480972, "end": 213007892}, {"filename": "/test/assets/resources/native/c6/c6389f62-e2d7-4366-ae00-24768d6524c8.c5c72.astc", "start": 213007892, "end": 213073444}, {"filename": "/test/assets/resources/native/c6/c6389f62-e2d7-4366-ae00-24768d6524c8.c5c72.png", "start": 213073444, "end": 213191188}, {"filename": "/test/assets/resources/native/c6/c63ba088-baf3-4e17-b155-d4c567f18155.33bb0.png", "start": 213191188, "end": 213257567}, {"filename": "/test/assets/resources/native/c6/c65d9054-f4a9-41ab-8286-6e465d8ef67d@335e2.00fd7.bin", "start": 213257567, "end": 213265291}, {"filename": "/test/assets/resources/native/c6/c669416f-4feb-46e5-bf2a-8d3feb939c4f@fb238.262e0.bin", "start": 213265291, "end": 213674287}, {"filename": "/test/assets/resources/native/c6/c6a62e1e-6f93-4241-bbf6-080533af9af2.4e1fc.astc", "start": 213674287, "end": 213739839}, {"filename": "/test/assets/resources/native/c6/c6a62e1e-6f93-4241-bbf6-080533af9af2.4e1fc.png", "start": 213739839, "end": 213911476}, {"filename": "/test/assets/resources/native/c6/c6a97a74-18a8-45c0-9ac7-e330ef66ddcb@7e8a4.b1345.bin", "start": 213911476, "end": 213943932}, {"filename": "/test/assets/resources/native/c6/c6bf1221-1df7-4335-9e4e-4b2fc0a99721@a46dc.c87b6.bin", "start": 213943932, "end": 214103804}, {"filename": "/test/assets/resources/native/c7/c7185374-8fcd-4d2d-b2d1-efe88680d025.7563f.astc", "start": 214103804, "end": 214169356}, {"filename": "/test/assets/resources/native/c7/c7185374-8fcd-4d2d-b2d1-efe88680d025.7563f.png", "start": 214169356, "end": 214217630}, {"filename": "/test/assets/resources/native/c7/c75d895c-3f00-4dc9-9125-638b93ed853d@c67a2.af963.bin", "start": 214217630, "end": 214865186}, {"filename": "/test/assets/resources/native/c7/c7898830-2868-49fc-ae2c-77ad28c90f33@066c0.fcd5e.bin", "start": 214865186, "end": 215475070}, {"filename": "/test/assets/resources/native/c7/c7d00ae8-00fa-4575-be15-4e78e34df287.b366d.astc", "start": 215475070, "end": 215540622}, {"filename": "/test/assets/resources/native/c7/c7d00ae8-00fa-4575-be15-4e78e34df287.b366d.png", "start": 215540622, "end": 215619777}, {"filename": "/test/assets/resources/native/c7/c7f9c920-7b7c-4382-9a28-fd3f75d838a8@73bd4.d07eb.bin", "start": 215619777, "end": 215654817}, {"filename": "/test/assets/resources/native/c7/c7fae2db-80c9-4c72-ba1a-446dae88d53d.8f827.astc", "start": 215654817, "end": 215720369}, {"filename": "/test/assets/resources/native/c7/c7fae2db-80c9-4c72-ba1a-446dae88d53d.8f827.png", "start": 215720369, "end": 215721583}, {"filename": "/test/assets/resources/native/c8/c89ba0ba-22d6-4ba0-8895-af3de471cf76.80eb7.png", "start": 215721583, "end": 215727096}, {"filename": "/test/assets/resources/native/c8/c8e6141b-c5a4-421e-a2b5-33997fb15fb7.4d0ba.png", "start": 215727096, "end": 215762225}, {"filename": "/test/assets/resources/native/c9/c92b4b08-1d74-4628-b8b5-3ca8f083b0d7.229e2.png", "start": 215762225, "end": 215763511}, {"filename": "/test/assets/resources/native/c9/c94116e8-e83b-4cd8-8383-4e2db6749478@a7d7e.99ba9.bin", "start": 215763511, "end": 215778183}, {"filename": "/test/assets/resources/native/c9/c9658871-57c9-4e6a-9b46-0906376cfd90.a26d2.png", "start": 215778183, "end": 215780538}, {"filename": "/test/assets/resources/native/c9/c97f1afc-a409-43b0-8b4f-52f799e27aaa@c807a.04d47.bin", "start": 215780538, "end": 215865806}, {"filename": "/test/assets/resources/native/c9/c99ffd4f-5472-4be7-aacd-c4443e539cb2.276c1.astc", "start": 215865806, "end": 216215602}, {"filename": "/test/assets/resources/native/c9/c99ffd4f-5472-4be7-aacd-c4443e539cb2.276c1.png", "start": 216215602, "end": 216699145}, {"filename": "/test/assets/resources/native/c9/c9a45b64-e9c5-49f6-911e-520770c8366f.e3612.png", "start": 216699145, "end": 216759161}, {"filename": "/test/assets/resources/native/c9/c9b0035a-8dae-467c-b50a-7bc8424024e0.5f6de.png", "start": 216759161, "end": 216761328}, {"filename": "/test/assets/resources/native/c9/c9b326e2-36fc-4a36-bee7-72c3cba744f7@c833e.c4938.bin", "start": 216761328, "end": 216762744}, {"filename": "/test/assets/resources/native/c9/c9e458d0-69de-479f-9b24-41b184c9bab3.de838.astc", "start": 216762744, "end": 216828296}, {"filename": "/test/assets/resources/native/c9/c9e458d0-69de-479f-9b24-41b184c9bab3.de838.png", "start": 216828296, "end": 216954245}, {"filename": "/test/assets/resources/native/ca/ca1d99c8-d076-4f2c-a236-d94ad09bbc99@bd3c6.9f21a.bin", "start": 216954245, "end": 216954449}, {"filename": "/test/assets/resources/native/ca/ca1f1e06-61c3-4ab8-aeb6-3ea6283dd11d.ad6b0.png", "start": 216954449, "end": 216956259}, {"filename": "/test/assets/resources/native/ca/ca26f4d2-e2de-4dd0-a477-1cf819ef6e52.2ada8.astc", "start": 216956259, "end": 217021811}, {"filename": "/test/assets/resources/native/ca/ca26f4d2-e2de-4dd0-a477-1cf819ef6e52.2ada8.png", "start": 217021811, "end": 217100402}, {"filename": "/test/assets/resources/native/ca/ca291929-5c31-4aa8-a756-bd1a759012a0@c7a5c.a2b96.bin", "start": 217100402, "end": 217112314}, {"filename": "/test/assets/resources/native/ca/ca68b194-cb47-4d23-be1c-fd8c26f584c7.e3010.mp3", "start": 217112314, "end": 218377938, "audio": 1}, {"filename": "/test/assets/resources/native/ca/caf92e8d-d884-48fd-8c7c-86be9c7405ad@e391b.d8019.bin", "start": 218377938, "end": 218422574}, {"filename": "/test/assets/resources/native/cb/cb436c7d-4053-4dd5-806c-f8101f09934e.acebc.png", "start": 218422574, "end": 218452694}, {"filename": "/test/assets/resources/native/cb/cbbde74d-32f5-4d90-9e1d-27dd7ed69bff@54cd5.3c597.bin", "start": 218452694, "end": 220141112}, {"filename": "/test/assets/resources/native/cc/cc08932e-59b3-44ff-b291-5ab8d2b2baf3.a61e6.png", "start": 220141112, "end": 220486885}, {"filename": "/test/assets/resources/native/cc/cc0cb45f-27e5-4695-b8d1-46bef6c579b3.62514.astc", "start": 220486885, "end": 220749045}, {"filename": "/test/assets/resources/native/cc/cc0cb45f-27e5-4695-b8d1-46bef6c579b3.62514.png", "start": 220749045, "end": 220879729}, {"filename": "/test/assets/resources/native/cc/cc4e4773-bd8f-4e39-bbcf-423e551cc0ec.f66ea.astc", "start": 220879729, "end": 220967361}, {"filename": "/test/assets/resources/native/cc/cc4e4773-bd8f-4e39-bbcf-423e551cc0ec.f66ea.png", "start": 220967361, "end": 221201771}, {"filename": "/test/assets/resources/native/cc/cc96cd01-ec06-4ef4-aca8-3d9de63f8d4d@a915a.d522d.bin", "start": 221201771, "end": 221279083}, {"filename": "/test/assets/resources/native/cd/cd3cde4e-509d-4a2c-8add-5aa81c958d47.defe2.astc", "start": 221279083, "end": 221366715}, {"filename": "/test/assets/resources/native/cd/cd3cde4e-509d-4a2c-8add-5aa81c958d47.defe2.png", "start": 221366715, "end": 221573758}, {"filename": "/test/assets/resources/native/cd/cd57ebf1-d48a-48ba-81dc-aaeba9a69787@a34a8.2bd10.bin", "start": 221573758, "end": 221574640}, {"filename": "/test/assets/resources/native/cd/cd923d9d-a0cf-47fc-8740-f7e5fa4c5e88.2d4e0.astc", "start": 221574640, "end": 221662272}, {"filename": "/test/assets/resources/native/cd/cd923d9d-a0cf-47fc-8740-f7e5fa4c5e88.2d4e0.pkm", "start": 221662272, "end": 221837256}, {"filename": "/test/assets/resources/native/cd/cd923d9d-a0cf-47fc-8740-f7e5fa4c5e88.2d4e0.png", "start": 221837256, "end": 221968385}, {"filename": "/test/assets/resources/native/cd/cd923d9d-a0cf-47fc-8740-f7e5fa4c5e88.2d4e0.pvr", "start": 221968385, "end": 222143951}, {"filename": "/test/assets/resources/native/cd/cd99ec30-30b2-42c3-a0ee-9d22be0198fd@435a1.ee41a.bin", "start": 222143951, "end": 222643199}, {"filename": "/test/assets/resources/native/cd/cd99ec30-30b2-42c3-a0ee-9d22be0198fd@e1421.c9fe9.png", "start": 222643199, "end": 223262076}, {"filename": "/test/assets/resources/native/cd/cdb4e80c-a4c2-42d9-9129-3cfb7d31527b.a3d0f.astc", "start": 223262076, "end": 223327628}, {"filename": "/test/assets/resources/native/cd/cdb4e80c-a4c2-42d9-9129-3cfb7d31527b.a3d0f.png", "start": 223327628, "end": 223472968}, {"filename": "/test/assets/resources/native/ce/ce2df14d-7e2d-4103-8ff5-f18d316191ac.4355f.mp3", "start": 223472968, "end": 223484296, "audio": 1}, {"filename": "/test/assets/resources/native/ce/cec4f58d-9fb0-4760-9751-6816eb4ba374.be551.astc", "start": 223484296, "end": 223549848}, {"filename": "/test/assets/resources/native/ce/cec4f58d-9fb0-4760-9751-6816eb4ba374.be551.png", "start": 223549848, "end": 223674212}, {"filename": "/test/assets/resources/native/ce/ceef2b9c-95d4-48a9-bb91-07838d0baa0c@ae651.53041.bin", "start": 223674212, "end": 224287042}, {"filename": "/test/assets/resources/native/ce/cef7b066-ef3d-4d6d-8bcd-c6f715c8dcd0@41080.6027e.bin", "start": 224287042, "end": 226899492}, {"filename": "/test/assets/resources/native/cf/cf480ec2-459a-4064-bf95-2d71b70d3ba3.87b45.png", "start": 226899492, "end": 226909389}, {"filename": "/test/assets/resources/native/cf/cfffd39c-e40d-41b9-b636-399210f96f93.aa44e.mp3", "start": 226909389, "end": 226928032, "audio": 1}, {"filename": "/test/assets/resources/native/d0/d01087d0-4c8a-4e7a-a7aa-0a09ba8e838b@720fb.cee17.bin", "start": 226928032, "end": 226987908}, {"filename": "/test/assets/resources/native/d0/d0239c36-67e1-4c0c-a497-eeeeb35c31e6.6ba84.astc", "start": 226987908, "end": 227337704}, {"filename": "/test/assets/resources/native/d0/d0239c36-67e1-4c0c-a497-eeeeb35c31e6.6ba84.png", "start": 227337704, "end": 227907571}, {"filename": "/test/assets/resources/native/d0/d0a36d9a-99e1-4353-9e52-a049420f814d.94a8f.astc", "start": 227907571, "end": 227973123}, {"filename": "/test/assets/resources/native/d0/d0a36d9a-99e1-4353-9e52-a049420f814d.94a8f.png", "start": 227973123, "end": 228081451}, {"filename": "/test/assets/resources/native/d0/d0b41f80-ead3-43de-a7b4-5f2b6a21d072@60809.11661.bin", "start": 228081451, "end": 228139711}, {"filename": "/test/assets/resources/native/d0/d0cfbe00-bf22-4b90-a3bb-ad1f2ff97d91@ecc57.45294.bin", "start": 228139711, "end": 228139915}, {"filename": "/test/assets/resources/native/d0/d0e69024-174a-4fae-a9ce-ba6d884d812f.da3a5.png", "start": 228139915, "end": 228140646}, {"filename": "/test/assets/resources/native/d1/d15a71ac-5b47-431d-9484-cf7b6c39cf11@ecc57.2d191.bin", "start": 228140646, "end": 228140850}, {"filename": "/test/assets/resources/native/d1/d1f09a6a-ad8e-426f-94ab-afb9222506fc@95883.5ad14.bin", "start": 228140850, "end": 228144274}, {"filename": "/test/assets/resources/native/d2/d28ab245-32cc-4129-936d-e06ff2885d01@6fbb0.88b3e.bin", "start": 228144274, "end": 228144478}, {"filename": "/test/assets/resources/native/d2/d2a4d51b-5959-42c9-a49d-e1c80c137d2a@6b97d.23a64.bin", "start": 228144478, "end": 228146850}, {"filename": "/test/assets/resources/native/d2/d2dd1403-8618-4ba4-a7df-eba68597fbb6.19d03.astc", "start": 228146850, "end": 228212402}, {"filename": "/test/assets/resources/native/d2/d2dd1403-8618-4ba4-a7df-eba68597fbb6.19d03.png", "start": 228212402, "end": 228213527}, {"filename": "/test/assets/resources/native/d3/d3092624-062b-4751-9206-151c0266caa8.f3089.astc", "start": 228213527, "end": 228279079}, {"filename": "/test/assets/resources/native/d3/d3092624-062b-4751-9206-151c0266caa8.f3089.png", "start": 228279079, "end": 228338010}, {"filename": "/test/assets/resources/native/d3/d399f172-b845-4b60-84e1-845146fc1f90.c19f9.astc", "start": 228338010, "end": 228403562}, {"filename": "/test/assets/resources/native/d3/d399f172-b845-4b60-84e1-845146fc1f90.c19f9.png", "start": 228403562, "end": 228515864}, {"filename": "/test/assets/resources/native/d3/d3a754e8-b5d9-41d9-8c0d-c909aeab4d03.6d581.png", "start": 228515864, "end": 229463332}, {"filename": "/test/assets/resources/native/d3/d3ed3b3a-d89d-48b0-835a-559dcd65f25a.95e7d.astc", "start": 229463332, "end": 229528884}, {"filename": "/test/assets/resources/native/d3/d3ed3b3a-d89d-48b0-835a-559dcd65f25a.95e7d.png", "start": 229528884, "end": 229564656}, {"filename": "/test/assets/resources/native/d3/d3f49bd7-fea2-4d06-a2c7-eae27798a467@d3e2b.633ff.bin", "start": 229564656, "end": 229565676}, {"filename": "/test/assets/resources/native/d4/d4128d5c-2891-4581-ac14-cb3804b26e53.7ca3f.astc", "start": 229565676, "end": 229631228}, {"filename": "/test/assets/resources/native/d4/d4128d5c-2891-4581-ac14-cb3804b26e53.7ca3f.png", "start": 229631228, "end": 229688425}, {"filename": "/test/assets/resources/native/d4/d4470bd9-1727-4014-b002-a15d778c34b1@06a1b.a9765.bin", "start": 229688425, "end": 229956181}, {"filename": "/test/assets/resources/native/d4/d468af81-28df-4044-9338-4e042e60da59.0b853.astc", "start": 229956181, "end": 230021733}, {"filename": "/test/assets/resources/native/d4/d468af81-28df-4044-9338-4e042e60da59.0b853.png", "start": 230021733, "end": 230188031}, {"filename": "/test/assets/resources/native/d4/d4e48288-e065-477c-b507-c54086d814a3.60cde.mp3", "start": 230188031, "end": 230205211, "audio": 1}, {"filename": "/test/assets/resources/native/d5/d50d2e3d-6f5a-45d4-a895-4a2789e449aa.9f766.astc", "start": 230205211, "end": 230270763}, {"filename": "/test/assets/resources/native/d5/d50d2e3d-6f5a-45d4-a895-4a2789e449aa.9f766.png", "start": 230270763, "end": 230274500}, {"filename": "/test/assets/resources/native/d5/d5bf9af8-2a5b-41a6-aa44-4e77cbc3ba34.3c565.mp3", "start": 230274500, "end": 230418396, "audio": 1}, {"filename": "/test/assets/resources/native/d6/d64a288c-f861-4c3e-a157-b544ab177801.93200.astc", "start": 230418396, "end": 230483948}, {"filename": "/test/assets/resources/native/d6/d64a288c-f861-4c3e-a157-b544ab177801.93200.png", "start": 230483948, "end": 230599931}, {"filename": "/test/assets/resources/native/d7/d73136d9-e283-4efa-828e-698c16eda168@dcb1a.06157.bin", "start": 230599931, "end": 230781355}, {"filename": "/test/assets/resources/native/d7/d7773afa-a14e-4b90-ae8b-2f4a1f4ea424.3832f.astc", "start": 230781355, "end": 230846907}, {"filename": "/test/assets/resources/native/d7/d7773afa-a14e-4b90-ae8b-2f4a1f4ea424.3832f.png", "start": 230846907, "end": 230966714}, {"filename": "/test/assets/resources/native/d7/d7a01335-8b33-4697-9f1a-47536b016298.447bf.astc", "start": 230966714, "end": 231032266}, {"filename": "/test/assets/resources/native/d7/d7a01335-8b33-4697-9f1a-47536b016298.447bf.png", "start": 231032266, "end": 231142049}, {"filename": "/test/assets/resources/native/d7/d7d70de2-c795-463e-bf87-8231a52a5820.5c4a4.mp3", "start": 231142049, "end": 231155049, "audio": 1}, {"filename": "/test/assets/resources/native/d8/d871a4e6-1e89-482d-8a10-9a5181c83caa.b0f4d.astc", "start": 231155049, "end": 231220601}, {"filename": "/test/assets/resources/native/d8/d871a4e6-1e89-482d-8a10-9a5181c83caa.b0f4d.png", "start": 231220601, "end": 231284250}, {"filename": "/test/assets/resources/native/d8/d8c423bf-ec85-47d6-bc45-a187571853aa.3796c.astc", "start": 231284250, "end": 231349802}, {"filename": "/test/assets/resources/native/d8/d8c423bf-ec85-47d6-bc45-a187571853aa.3796c.png", "start": 231349802, "end": 231466102}, {"filename": "/test/assets/resources/native/d8/d8cd2834-8061-4a91-9a1b-4d8ecc3e5cd4@9d1be.5a688.bin", "start": 231466102, "end": 231466338}, {"filename": "/test/assets/resources/native/d8/d8ed12bf-4455-4d2f-b1c9-596d60ae8497.213e3.astc", "start": 231466338, "end": 231531890}, {"filename": "/test/assets/resources/native/d8/d8ed12bf-4455-4d2f-b1c9-596d60ae8497.213e3.png", "start": 231531890, "end": 231592569}, {"filename": "/test/assets/resources/native/d9/d909a6d5-e81c-4a3e-9a8b-2773af8c6590@dce61.1718f.bin", "start": 231592569, "end": 232029033}, {"filename": "/test/assets/resources/native/d9/d96a6a25-5315-49f3-af0d-4374efc27863@3dd71.17f4f.bin", "start": 232029033, "end": 232048761}, {"filename": "/test/assets/resources/native/d9/d99f3844-050e-4d3e-88e5-50159b20bc48@7dc28.8d85f.bin", "start": 232048761, "end": 232085765}, {"filename": "/test/assets/resources/native/d9/d9e8f56e-bed9-4492-8675-00356fd3029e.37905.mp3", "start": 232085765, "end": 232096271, "audio": 1}, {"filename": "/test/assets/resources/native/da/da08a563-6f65-40a7-bd22-3cb5448b7d6a@66d58.e6a60.bin", "start": 232096271, "end": 232321203}, {"filename": "/test/assets/resources/native/da/da50cc8b-275c-4082-b7ca-50985febe1e4.1df1a.mp3", "start": 232321203, "end": 232354265, "audio": 1}, {"filename": "/test/assets/resources/native/da/da61432b-1226-49e5-99c5-c59cdb4f65b3.225be.astc", "start": 232354265, "end": 232419817}, {"filename": "/test/assets/resources/native/da/da61432b-1226-49e5-99c5-c59cdb4f65b3.225be.png", "start": 232419817, "end": 232542260}, {"filename": "/test/assets/resources/native/da/da698eb0-01eb-4ea8-bff8-b106d8ebec46.a5ff1.png", "start": 232542260, "end": 232544699}, {"filename": "/test/assets/resources/native/da/da891986-386d-41e5-ac22-5bd25b58b791.ccf86.astc", "start": 232544699, "end": 232610251}, {"filename": "/test/assets/resources/native/da/da891986-386d-41e5-ac22-5bd25b58b791.ccf86.png", "start": 232610251, "end": 232676797}, {"filename": "/test/assets/resources/native/da/dac32ed2-e18f-42f2-bbe4-15bfbab69a9d@bdd38.9dcd4.bin", "start": 232676797, "end": 232711069}, {"filename": "/test/assets/resources/native/da/dae906d6-adec-4800-9350-c0327d257162.526ff.png", "start": 232711069, "end": 232730403}, {"filename": "/test/assets/resources/native/db/db12aa92-87f4-4297-9c25-7007e87247ed.a9956.astc", "start": 232730403, "end": 232795955}, {"filename": "/test/assets/resources/native/db/db12aa92-87f4-4297-9c25-7007e87247ed.a9956.png", "start": 232795955, "end": 232949191}, {"filename": "/test/assets/resources/native/db/db40f629-9fa0-4181-98b4-ff8f5b53e89b.1638a.astc", "start": 232949191, "end": 233014743}, {"filename": "/test/assets/resources/native/db/db40f629-9fa0-4181-98b4-ff8f5b53e89b.1638a.png", "start": 233014743, "end": 233015707}, {"filename": "/test/assets/resources/native/db/db742fe9-abec-4f9d-b5aa-311f83c9d7b9.7e128.astc", "start": 233015707, "end": 233081259}, {"filename": "/test/assets/resources/native/db/db742fe9-abec-4f9d-b5aa-311f83c9d7b9.7e128.png", "start": 233081259, "end": 233166997}, {"filename": "/test/assets/resources/native/db/dbaf520b-0c79-49d9-a2c3-0913fa14ef38@f0f15.74e44.bin", "start": 233166997, "end": 233274665}, {"filename": "/test/assets/resources/native/db/dbc74171-f6ac-409b-8896-3d6d5092c36e@b4056.ec8d1.bin", "start": 233274665, "end": 233289813}, {"filename": "/test/assets/resources/native/db/dbcfd74c-cff3-4f86-b1ad-3d2993a29695@8b515.41f2f.bin", "start": 233289813, "end": 233319701}, {"filename": "/test/assets/resources/native/db/dbe2b242-e0b4-4d40-809f-3e69909648a9.34b65.astc", "start": 233319701, "end": 233385253}, {"filename": "/test/assets/resources/native/db/dbe2b242-e0b4-4d40-809f-3e69909648a9.34b65.png", "start": 233385253, "end": 233412986}, {"filename": "/test/assets/resources/native/dc/dc269d07-6303-46e6-a0c5-3f19c485edfc@fe146.db6cd.bin", "start": 233412986, "end": 233413222}, {"filename": "/test/assets/resources/native/dc/dc3ca810-1114-4262-89be-f639e4dc1238.aee72.astc", "start": 233413222, "end": 233478774}, {"filename": "/test/assets/resources/native/dc/dc3ca810-1114-4262-89be-f639e4dc1238.aee72.png", "start": 233478774, "end": 233577510}, {"filename": "/test/assets/resources/native/dc/dc68b7b9-39f2-4dea-ac7e-8b9c3a652acd@6def2.3e193.bin", "start": 233577510, "end": 233582514}, {"filename": "/test/assets/resources/native/dc/dc88695c-ddb4-4b8f-98ba-066d2061d34b.a9fb9.astc", "start": 233582514, "end": 233670146}, {"filename": "/test/assets/resources/native/dc/dc88695c-ddb4-4b8f-98ba-066d2061d34b.a9fb9.pkm", "start": 233670146, "end": 233845130}, {"filename": "/test/assets/resources/native/dc/dc88695c-ddb4-4b8f-98ba-066d2061d34b.a9fb9.png", "start": 233845130, "end": 233863814}, {"filename": "/test/assets/resources/native/dc/dc88695c-ddb4-4b8f-98ba-066d2061d34b.a9fb9.pvr", "start": 233863814, "end": 234039380}, {"filename": "/test/assets/resources/native/dc/dc89036c-823b-4082-b9dd-2c2a4cafdb53.18357.astc", "start": 234039380, "end": 234127012}, {"filename": "/test/assets/resources/native/dc/dc89036c-823b-4082-b9dd-2c2a4cafdb53.18357.png", "start": 234127012, "end": 234298508}, {"filename": "/test/assets/resources/native/dc/dc9d56cd-59dd-4361-83b4-f188aeff22d1@5b9ed.3a3b4.bin", "start": 234298508, "end": 234622460}, {"filename": "/test/assets/resources/native/dc/dcb558d4-9cf7-4295-96db-59346f65a96d.ab0ad.png", "start": 234622460, "end": 234659432}, {"filename": "/test/assets/resources/native/dc/dce08a06-21d3-4e54-8d4e-dd39a3836401.1ad25.astc", "start": 234659432, "end": 234921592}, {"filename": "/test/assets/resources/native/dc/dce08a06-21d3-4e54-8d4e-dd39a3836401.1ad25.png", "start": 234921592, "end": 235371115}, {"filename": "/test/assets/resources/native/dc/dcee1125-6d74-4200-b37f-743b14f96fd3.bfc2c.png", "start": 235371115, "end": 236021513}, {"filename": "/test/assets/resources/native/dc/dcfafec5-f428-408c-8add-f7cd85b674b6@8bd14.52519.bin", "start": 236021513, "end": 237059345}, {"filename": "/test/assets/resources/native/dd/dd260333-ad1e-46dd-aeb4-840523ca91a0@864eb.8f8a7.bin", "start": 237059345, "end": 237059549}, {"filename": "/test/assets/resources/native/dd/dd4aff90-e7f3-4ca7-b6b6-3dbdea19cc99@334cc.7d05a.bin", "start": 237059549, "end": 237061473}, {"filename": "/test/assets/resources/native/dd/dd711f3c-d5b0-48f0-baed-205604f3ed76.b059e.png", "start": 237061473, "end": 237066650}, {"filename": "/test/assets/resources/native/dd/dd87f400-3456-466f-a9b0-3d505b18eb81@b3125.0cf71.bin", "start": 237066650, "end": 237157078}, {"filename": "/test/assets/resources/native/dd/dddcde5e-309d-4df5-a66b-a32b130f1684.1987e.astc", "start": 237157078, "end": 237222630}, {"filename": "/test/assets/resources/native/dd/dddcde5e-309d-4df5-a66b-a32b130f1684.1987e.png", "start": 237222630, "end": 237293910}, {"filename": "/test/assets/resources/native/dd/ddebdba2-6f2d-4633-8b31-62af866370ae@edaa1.cbf73.bin", "start": 237293910, "end": 237493002}, {"filename": "/test/assets/resources/native/de/de3be432-5cd7-4e69-9b30-e9f36528f8e8@42dde.4748c.bin", "start": 237493002, "end": 237523962}, {"filename": "/test/assets/resources/native/de/de7ead80-9b82-4b27-a22f-668e853cbca7@3b500.5d1b8.bin", "start": 237523962, "end": 237569634}, {"filename": "/test/assets/resources/native/df/df06f63f-0953-4911-a1b6-109402009f09@4b67b.28ee6.bin", "start": 237569634, "end": 237570578}, {"filename": "/test/assets/resources/native/df/dfb05bd3-e558-4c22-be2a-5988ff89c508.1af43.jpg", "start": 237570578, "end": 237617995}, {"filename": "/test/assets/resources/native/df/dfbe1eb2-5c3a-4508-83ef-1339de0fe22f.0c359.png", "start": 237617995, "end": 237623894}, {"filename": "/test/assets/resources/native/df/dfd51153-7b56-4479-bfef-9250958d9b8d.a81f3.png", "start": 237623894, "end": 237724742}, {"filename": "/test/assets/resources/native/e0/e01fc2a1-6c74-403c-824b-e1b6795cd162.828a7.png", "start": 237724742, "end": 237725538}, {"filename": "/test/assets/resources/native/e0/e0350160-5d09-4c9f-a074-2be6a5d5e38a.f642e.astc", "start": 237725538, "end": 237791090}, {"filename": "/test/assets/resources/native/e0/e0350160-5d09-4c9f-a074-2be6a5d5e38a.f642e.png", "start": 237791090, "end": 237818806}, {"filename": "/test/assets/resources/native/e0/e0917b24-21a3-4bf9-ba8c-ad3da8a1fa74.44ec1.astc", "start": 237818806, "end": 237884358}, {"filename": "/test/assets/resources/native/e0/e0917b24-21a3-4bf9-ba8c-ad3da8a1fa74.44ec1.png", "start": 237884358, "end": 237906212}, {"filename": "/test/assets/resources/native/e0/e0bf01f2-0164-47ad-9a74-70a08ae7bf73@936a8.6f7e7.bin", "start": 237906212, "end": 237998122}, {"filename": "/test/assets/resources/native/e0/e0f948d4-0f54-4972-8ded-50cdd4b5e530@605a5.9264c.bin", "start": 237998122, "end": 238199910}, {"filename": "/test/assets/resources/native/e0/e0fd3fca-859e-41a0-ba06-15a7a8ddb0c3@e5ef3.0e397.bin", "start": 238199910, "end": 238200890}, {"filename": "/test/assets/resources/native/e1/e128f667-82b3-42ef-ad5b-777751b606a2@3ea18.61343.bin", "start": 238200890, "end": 238218946}, {"filename": "/test/assets/resources/native/e1/e1540b60-8d88-414f-9abd-7f013cd7cd59@24296.7dce0.bin", "start": 238218946, "end": 238219150}, {"filename": "/test/assets/resources/native/e2/e292a2c5-e0a8-42e6-b922-2b0fa002555c@6978c.cca13.bin", "start": 238219150, "end": 238284470}, {"filename": "/test/assets/resources/native/e3/e31a1a45-ac0b-4edb-b533-e025d439eab7.d237e.astc", "start": 238284470, "end": 238350022}, {"filename": "/test/assets/resources/native/e3/e31a1a45-ac0b-4edb-b533-e025d439eab7.d237e.png", "start": 238350022, "end": 238488203}, {"filename": "/test/assets/resources/native/e3/e38d5268-491d-4039-a7b4-dc6a07e5710c.cfea0.astc", "start": 238488203, "end": 238837999}, {"filename": "/test/assets/resources/native/e3/e38d5268-491d-4039-a7b4-dc6a07e5710c.cfea0.png", "start": 238837999, "end": 239302449}, {"filename": "/test/assets/resources/native/e3/e3ddc916-1eac-435c-ae7c-0a5b7c460555@35074.74957.bin", "start": 239302449, "end": 239616505}, {"filename": "/test/assets/resources/native/e4/e46b24ad-ca10-4e32-a0e4-86d167c86ebf.fce68.astc", "start": 239616505, "end": 239682057}, {"filename": "/test/assets/resources/native/e4/e46b24ad-ca10-4e32-a0e4-86d167c86ebf.fce68.png", "start": 239682057, "end": 239778065}, {"filename": "/test/assets/resources/native/e4/e4878601-f850-470a-858e-193bae555236@bd3c6.c1839.bin", "start": 239778065, "end": 239778269}, {"filename": "/test/assets/resources/native/e4/e4902997-a542-40c5-b0d0-dbbd93516798.c33e0.astc", "start": 239778269, "end": 239843821}, {"filename": "/test/assets/resources/native/e4/e4902997-a542-40c5-b0d0-dbbd93516798.c33e0.png", "start": 239843821, "end": 239980999}, {"filename": "/test/assets/resources/native/e4/e4a1738c-9709-4635-9fa4-b3f6a24a1e39@55c75.67e35.bin", "start": 239980999, "end": 239983359}, {"filename": "/test/assets/resources/native/e4/e4b53283-8d30-4372-ad27-b25f9710cd3f.6f50c.png", "start": 239983359, "end": 240009230}, {"filename": "/test/assets/resources/native/e4/e4babd50-4099-4d76-a6eb-746c57b9a21d@62973.704e2.bin", "start": 240009230, "end": 240084494}, {"filename": "/test/assets/resources/native/e4/e4bfb4d7-d4be-442f-af28-5d500543a76a.2e4c6.astc", "start": 240084494, "end": 240346654}, {"filename": "/test/assets/resources/native/e4/e4bfb4d7-d4be-442f-af28-5d500543a76a.2e4c6.png", "start": 240346654, "end": 240820703}, {"filename": "/test/assets/resources/native/e4/e4e820cb-8bc0-4695-8f8d-899ae387da88.17f99.astc", "start": 240820703, "end": 240886255}, {"filename": "/test/assets/resources/native/e4/e4e820cb-8bc0-4695-8f8d-899ae387da88.17f99.png", "start": 240886255, "end": 240973428}, {"filename": "/test/assets/resources/native/e5/e5117f65-51dc-4e28-9263-93470e600c00.23650.astc", "start": 240973428, "end": 241323224}, {"filename": "/test/assets/resources/native/e5/e5117f65-51dc-4e28-9263-93470e600c00.23650.png", "start": 241323224, "end": 241325625}, {"filename": "/test/assets/resources/native/e5/e56baee7-2fd1-4897-89df-88f1cffb1556.4fc6c.astc", "start": 241325625, "end": 241413257}, {"filename": "/test/assets/resources/native/e5/e56baee7-2fd1-4897-89df-88f1cffb1556.4fc6c.png", "start": 241413257, "end": 241563186}, {"filename": "/test/assets/resources/native/e6/e6394d97-4e13-42d5-b364-86860b2e5c2b.9a667.astc", "start": 241563186, "end": 241628738}, {"filename": "/test/assets/resources/native/e6/e6394d97-4e13-42d5-b364-86860b2e5c2b.9a667.png", "start": 241628738, "end": 241727560}, {"filename": "/test/assets/resources/native/e6/e6ecdb43-11bc-4eec-85ca-44eadb2660a0@350af.dfd12.bin", "start": 241727560, "end": 241776258}, {"filename": "/test/assets/resources/native/e6/e6f5d176-8925-43da-bb93-27fbfb0e9af6@1d3ec.9af08.bin", "start": 241776258, "end": 241879602}, {"filename": "/test/assets/resources/native/e7/e72e0176-7411-4936-8a98-3a721dd14bea.1e448.astc", "start": 241879602, "end": 241945154}, {"filename": "/test/assets/resources/native/e7/e72e0176-7411-4936-8a98-3a721dd14bea.1e448.png", "start": 241945154, "end": 241993798}, {"filename": "/test/assets/resources/native/e7/e732e2c9-79ad-4c46-ba63-a85016fe20be@43bcd.02bf2.bin", "start": 241993798, "end": 242298166}, {"filename": "/test/assets/resources/native/e7/e74285e8-3c9e-40e8-b719-2ea946d0ba27@7aaeb.2eca7.bin", "start": 242298166, "end": 242385158}, {"filename": "/test/assets/resources/native/e7/e77295a5-9752-42d3-8020-37f972a5f865.43608.astc", "start": 242385158, "end": 242472790}, {"filename": "/test/assets/resources/native/e7/e77295a5-9752-42d3-8020-37f972a5f865.43608.pkm", "start": 242472790, "end": 242647774}, {"filename": "/test/assets/resources/native/e7/e77295a5-9752-42d3-8020-37f972a5f865.43608.png", "start": 242647774, "end": 242772167}, {"filename": "/test/assets/resources/native/e7/e77295a5-9752-42d3-8020-37f972a5f865.43608.pvr", "start": 242772167, "end": 242947733}, {"filename": "/test/assets/resources/native/e8/e80a029b-ec4b-433c-b425-23479263a124.58140.png", "start": 242947733, "end": 242947826}, {"filename": "/test/assets/resources/native/e8/e833d004-c070-461c-9a6b-cb4268a157ea@3977a.2ce59.bin", "start": 242947826, "end": 242948030}, {"filename": "/test/assets/resources/native/e8/e836129d-6ba8-476a-a0a1-ab72d7ebd50b.07826.jpg", "start": 242948030, "end": 242989194}, {"filename": "/test/assets/resources/native/e8/e83ef5de-7efe-4fc5-9da2-405f725d17bc.8b0e8.astc", "start": 242989194, "end": 243054746}, {"filename": "/test/assets/resources/native/e8/e83ef5de-7efe-4fc5-9da2-405f725d17bc.8b0e8.png", "start": 243054746, "end": 243057818}, {"filename": "/test/assets/resources/native/e8/e84f6dbe-d244-47cf-ac46-b9ccccfedd19@eb6ac.28c2a.bin", "start": 243057818, "end": 243091478}, {"filename": "/test/assets/resources/native/e8/e8991dc3-46b9-4b1d-b19a-9584b40a72fd@ff35b.2b9f9.bin", "start": 243091478, "end": 243091682}, {"filename": "/test/assets/resources/native/e8/e8d6cbe4-f019-4122-811e-06f9e0d94d40@857af.75796.bin", "start": 243091682, "end": 243124218}, {"filename": "/test/assets/resources/native/e9/e9719380-305e-4051-945f-b1b85a51f496@de001.1576e.bin", "start": 243124218, "end": 243124422}, {"filename": "/test/assets/resources/native/e9/e976b93f-d1ff-487e-b568-a9645ddd2b6a@8c3a2.806aa.bin", "start": 243124422, "end": 243124626}, {"filename": "/test/assets/resources/native/e9/e9c260ec-03a5-402a-80be-a4087331264d.1c1c6.png", "start": 243124626, "end": 243126914}, {"filename": "/test/assets/resources/native/e9/e9dc765d-2b82-40e9-b508-2eb017dcc721.f40bc.png", "start": 243126914, "end": 243148181}, {"filename": "/test/assets/resources/native/ea/ea142ad0-8955-41b8-a3fa-be62e0bd804f.140d4.mp3", "start": 243148181, "end": 243151986, "audio": 1}, {"filename": "/test/assets/resources/native/ea/ea1d011a-b240-4769-8cbe-9c34dee59653.00889.astc", "start": 243151986, "end": 243217538}, {"filename": "/test/assets/resources/native/ea/ea1d011a-b240-4769-8cbe-9c34dee59653.00889.png", "start": 243217538, "end": 243263379}, {"filename": "/test/assets/resources/native/ea/ea2e17f7-7e92-4cfa-80f6-aadac6ca5b90@e482f.d39ce.bin", "start": 243263379, "end": 243386807}, {"filename": "/test/assets/resources/native/ea/ea872a83-f67f-4222-adf1-068f7fb20829@1d2bb.86f96.bin", "start": 243386807, "end": 243388507}, {"filename": "/test/assets/resources/native/eb/eb6c0e9f-0535-4f10-83bb-19b9b7ebfcfd@394eb.3b38d.bin", "start": 243388507, "end": 243427487}, {"filename": "/test/assets/resources/native/eb/ebc5bccd-cd19-48b0-8a8b-f919386bbfb1@e1759.28a3e.bin", "start": 243427487, "end": 243442471}, {"filename": "/test/assets/resources/native/eb/ebcd567f-203b-4741-8b7a-7ee8e56c550b.77956.astc", "start": 243442471, "end": 243704631}, {"filename": "/test/assets/resources/native/eb/ebcd567f-203b-4741-8b7a-7ee8e56c550b.77956.png", "start": 243704631, "end": 243804599}, {"filename": "/test/assets/resources/native/ec/ec29ace7-766b-4b65-b2cd-009ad0c82ea0.e8c09.astc", "start": 243804599, "end": 243870151}, {"filename": "/test/assets/resources/native/ec/ec29ace7-766b-4b65-b2cd-009ad0c82ea0.e8c09.png", "start": 243870151, "end": 243960034}, {"filename": "/test/assets/resources/native/ec/ec424439-bb80-49af-bb74-2b409c4a19b8.9e46e.png", "start": 243960034, "end": 243996718}, {"filename": "/test/assets/resources/native/ec/eca4accc-f018-4b6e-a74d-4d622b7fcbdc.538b7.astc", "start": 243996718, "end": 244062270}, {"filename": "/test/assets/resources/native/ec/eca4accc-f018-4b6e-a74d-4d622b7fcbdc.538b7.png", "start": 244062270, "end": 244259710}, {"filename": "/test/assets/resources/native/ed/ed37b5ad-f059-4307-ba4b-b9b7eb03f420@f5466.7a609.bin", "start": 244259710, "end": 244269182}, {"filename": "/test/assets/resources/native/ed/ed76a840-bd6d-4b04-895a-e7a5e138a362.bd7c3.astc", "start": 244269182, "end": 244334734}, {"filename": "/test/assets/resources/native/ed/ed76a840-bd6d-4b04-895a-e7a5e138a362.bd7c3.png", "start": 244334734, "end": 244507879}, {"filename": "/test/assets/resources/native/ee/ee0f3d58-a37b-4991-8a36-49ad539c1eb6@3eaad.b5c07.bin", "start": 244507879, "end": 244508899}, {"filename": "/test/assets/resources/native/ee/ee4b037c-caba-475d-bd2f-40f26ae15b15@af44f.be2c0.bin", "start": 244508899, "end": 244530923}, {"filename": "/test/assets/resources/native/ee/ee85db43-c893-47c4-b98f-547fe89f7998@6fbb0.22970.bin", "start": 244530923, "end": 244531127}, {"filename": "/test/assets/resources/native/ee/eecf27a2-9f30-47fc-98b6-c4b925bdfad5.f4aa9.png", "start": 244531127, "end": 250120082}, {"filename": "/test/assets/resources/native/ee/eee0ce6e-df50-4505-8454-ece86a03cf43.a5871.astc", "start": 250120082, "end": 250185634}, {"filename": "/test/assets/resources/native/ee/eee0ce6e-df50-4505-8454-ece86a03cf43.a5871.png", "start": 250185634, "end": 250211525}, {"filename": "/test/assets/resources/native/ef/ef4383d4-a98f-4ed9-b5fa-17c232098335@f2511.48ab4.bin", "start": 250211525, "end": 250214901}, {"filename": "/test/assets/resources/native/ef/efd8bdb6-4438-4260-a8c7-2db2b6b0b2e1@828d8.95979.bin", "start": 250214901, "end": 250234941}, {"filename": "/test/assets/resources/native/f0/f09647d6-84a6-4737-93c4-1cea8315cea7.dea6d.png", "start": 250234941, "end": 250262289}, {"filename": "/test/assets/resources/native/f0/f0a1cc9b-0053-4d86-b0e0-7660f8f3d0c3@0556f.e5a57.bin", "start": 250262289, "end": 250306161}, {"filename": "/test/assets/resources/native/f0/f0f0d89a-56f8-4f83-a1ca-1d75d5ba6a98.f4908.png", "start": 250306161, "end": 250315802}, {"filename": "/test/assets/resources/native/f1/f14c2df1-f4fb-463d-ae9e-f28b3e61abea@4be09.04f6d.bin", "start": 250315802, "end": 250678340}, {"filename": "/test/assets/resources/native/f1/f15d8242-a950-42d7-af2a-e1a78cce14c0.fa4df.mp3", "start": 250678340, "end": 250716895, "audio": 1}, {"filename": "/test/assets/resources/native/f1/f1ad9a4d-17c1-4f16-bf98-0cbb4ac6875e.7bfd4.png", "start": 250716895, "end": 250868004}, {"filename": "/test/assets/resources/native/f1/f1f5a4b3-f1c4-4146-98d1-e93bda4a90b3.374fd.astc", "start": 250868004, "end": 250933556}, {"filename": "/test/assets/resources/native/f1/f1f5a4b3-f1c4-4146-98d1-e93bda4a90b3.374fd.png", "start": 250933556, "end": 251013461}, {"filename": "/test/assets/resources/native/f2/f2311631-be98-4d2b-ba72-682f57ef1c27.a4069.png", "start": 251013461, "end": 251034520}, {"filename": "/test/assets/resources/native/f2/f2859c37-0789-4f79-af41-dbe4d6d8e448.f178c.astc", "start": 251034520, "end": 251384316}, {"filename": "/test/assets/resources/native/f2/f2859c37-0789-4f79-af41-dbe4d6d8e448.f178c.png", "start": 251384316, "end": 251685006}, {"filename": "/test/assets/resources/native/f3/f30b2ee0-5987-4b34-bb51-e2d853a6a4cc.ba963.astc", "start": 251685006, "end": 251947166}, {"filename": "/test/assets/resources/native/f3/f30b2ee0-5987-4b34-bb51-e2d853a6a4cc.ba963.png", "start": 251947166, "end": 252331143}, {"filename": "/test/assets/resources/native/f3/f37d5e5c-7d33-4e29-a7ee-fbcc3823893e@c8a1f.0819a.bin", "start": 252331143, "end": 252359015}, {"filename": "/test/assets/resources/native/f3/f3859751-7d20-4c3e-a53e-8582ba05bcb6.c7da0.astc", "start": 252359015, "end": 252708811}, {"filename": "/test/assets/resources/native/f3/f3859751-7d20-4c3e-a53e-8582ba05bcb6.c7da0.png", "start": 252708811, "end": 253436523}, {"filename": "/test/assets/resources/native/f3/f3990139-0077-47c2-81e6-5077fec4da67.3bc05.astc", "start": 253436523, "end": 253502075}, {"filename": "/test/assets/resources/native/f3/f3990139-0077-47c2-81e6-5077fec4da67.3bc05.png", "start": 253502075, "end": 253591662}, {"filename": "/test/assets/resources/native/f3/f39a270a-8500-4a6a-abfb-fb38baa494fc.9ee6f.mp3", "start": 253591662, "end": 253602573, "audio": 1}, {"filename": "/test/assets/resources/native/f3/f3a09a81-7859-4558-9705-89976bdd66b6@f05cb.40d68.bin", "start": 253602573, "end": 253757541}, {"filename": "/test/assets/resources/native/f3/f3d7a286-8a48-49c3-ad9d-fbff32c2965a.fd49e.astc", "start": 253757541, "end": 253823093}, {"filename": "/test/assets/resources/native/f3/f3d7a286-8a48-49c3-ad9d-fbff32c2965a.fd49e.png", "start": 253823093, "end": 253947185}, {"filename": "/test/assets/resources/native/f4/f423b339-ff18-46bc-b7de-c078ef4148bf.aee50.astc", "start": 253947185, "end": 254012737}, {"filename": "/test/assets/resources/native/f4/f423b339-ff18-46bc-b7de-c078ef4148bf.aee50.png", "start": 254012737, "end": 254145468}, {"filename": "/test/assets/resources/native/f4/f45debf5-f8d9-4f10-bb63-f773a2eafda8@76fad.37151.bin", "start": 254145468, "end": 256090428}, {"filename": "/test/assets/resources/native/f4/f474b2ba-58a5-4106-93d8-df126cae70c2.214fa.astc", "start": 256090428, "end": 256155980}, {"filename": "/test/assets/resources/native/f4/f474b2ba-58a5-4106-93d8-df126cae70c2.214fa.png", "start": 256155980, "end": 256193633}, {"filename": "/test/assets/resources/native/f4/f47cca43-876e-403d-82ce-44fc1f9249de.3b1a7.astc", "start": 256193633, "end": 256259185}, {"filename": "/test/assets/resources/native/f4/f47cca43-876e-403d-82ce-44fc1f9249de.3b1a7.png", "start": 256259185, "end": 256314920}, {"filename": "/test/assets/resources/native/f4/f4c2c603-8733-4dd8-a4e2-75d6588525b9.aaef4.png", "start": 256314920, "end": 256342116}, {"filename": "/test/assets/resources/native/f4/f4d079a9-a5ee-419f-9eb9-2510429a84c2.0eb77.astc", "start": 256342116, "end": 256604276}, {"filename": "/test/assets/resources/native/f4/f4d079a9-a5ee-419f-9eb9-2510429a84c2.0eb77.png", "start": 256604276, "end": 256962846}, {"filename": "/test/assets/resources/native/f4/f4d11853-ac7e-48cb-9780-ad708011d683.6b16c.astc", "start": 256962846, "end": 257312642}, {"filename": "/test/assets/resources/native/f4/f4d11853-ac7e-48cb-9780-ad708011d683.6b16c.png", "start": 257312642, "end": 258005061}, {"filename": "/test/assets/resources/native/f4/f4d590d1-1c78-4e84-b0cb-725850245572@d3e2b.9ee84.bin", "start": 258005061, "end": 258005265}, {"filename": "/test/assets/resources/native/f4/f4f3116f-2d7b-48b1-97c3-410ba6ddbcf2@94beb.cbd47.bin", "start": 258005265, "end": 258012345}, {"filename": "/test/assets/resources/native/f5/f5052486-258e-4f4b-860a-ddeb306c1509.494ac.astc", "start": 258012345, "end": 258077897}, {"filename": "/test/assets/resources/native/f5/f5052486-258e-4f4b-860a-ddeb306c1509.494ac.png", "start": 258077897, "end": 258204891}, {"filename": "/test/assets/resources/native/f5/f542daaa-dbc6-4d5c-9919-464af29a1ef4.5cb0a.png", "start": 258204891, "end": 258210788}, {"filename": "/test/assets/resources/native/f5/f5c0d98d-55ee-45ed-a177-2b5a8cc5aed2@71aca.c790a.bin", "start": 258210788, "end": 259299044}, {"filename": "/test/assets/resources/native/f6/f6f14609-8322-405c-891f-b4dc84b4bf31.7d687.astc", "start": 259299044, "end": 259364596}, {"filename": "/test/assets/resources/native/f6/f6f14609-8322-405c-891f-b4dc84b4bf31.7d687.png", "start": 259364596, "end": 259445208}, {"filename": "/test/assets/resources/native/f7/f7948b78-fc1b-47f1-92a5-75076839d669@54c30.184e4.bin", "start": 259445208, "end": 259449640}, {"filename": "/test/assets/resources/native/f7/f79ab0fe-e276-4ce1-b803-a7062f871b10.6c904.astc", "start": 259449640, "end": 259537272}, {"filename": "/test/assets/resources/native/f7/f79ab0fe-e276-4ce1-b803-a7062f871b10.6c904.png", "start": 259537272, "end": 259660551}, {"filename": "/test/assets/resources/native/f7/f79ff5dc-596f-4fe9-a74c-3ab220b8d2a1@13c72.2dd1e.bin", "start": 259660551, "end": 260274717}, {"filename": "/test/assets/resources/native/f7/f7ac6c0a-c5f0-4415-b75f-ce2891101b7a.11dfd.astc", "start": 260274717, "end": 260362349}, {"filename": "/test/assets/resources/native/f7/f7ac6c0a-c5f0-4415-b75f-ce2891101b7a.11dfd.png", "start": 260362349, "end": 260455441}, {"filename": "/test/assets/resources/native/f8/f8168fef-cf3b-466e-ab16-40ea6dd218c3@038d6.c7ca8.bin", "start": 260455441, "end": 260495881}, {"filename": "/test/assets/resources/native/f8/f8189276-5a38-49a3-85e5-9e6cf462061a@c570d.e5e70.bin", "start": 260495881, "end": 260498737}, {"filename": "/test/assets/resources/native/f8/f86104a5-b254-48ee-8f32-6fe4ce91d672@b47c0@40c10.addc9.png", "start": 260498737, "end": 261750120}, {"filename": "/test/assets/resources/native/f8/f86104a5-b254-48ee-8f32-6fe4ce91d672@b47c0@74afd.040e3.png", "start": 261750120, "end": 262959550}, {"filename": "/test/assets/resources/native/f8/f86104a5-b254-48ee-8f32-6fe4ce91d672@b47c0@7d38f.e7660.png", "start": 262959550, "end": 264142830}, {"filename": "/test/assets/resources/native/f8/f86104a5-b254-48ee-8f32-6fe4ce91d672@b47c0@8fd34.810d6.png", "start": 264142830, "end": 265391901}, {"filename": "/test/assets/resources/native/f8/f86104a5-b254-48ee-8f32-6fe4ce91d672@b47c0@bb97f.cf27e.png", "start": 265391901, "end": 266389781}, {"filename": "/test/assets/resources/native/f8/f86104a5-b254-48ee-8f32-6fe4ce91d672@b47c0@e9a6d.c1788.png", "start": 266389781, "end": 267602008}, {"filename": "/test/assets/resources/native/f8/f89208f6-44cf-494f-931c-40e60ed13ecb.d7b7d.mp3", "start": 267602008, "end": 267618352, "audio": 1}, {"filename": "/test/assets/resources/native/f8/f8cd3898-87ae-45f5-bb9a-1bdb04d1110c.5d4ff.astc", "start": 267618352, "end": 267968148}, {"filename": "/test/assets/resources/native/f8/f8cd3898-87ae-45f5-bb9a-1bdb04d1110c.5d4ff.png", "start": 267968148, "end": 268498616}, {"filename": "/test/assets/resources/native/f8/f8f9c131-c666-42b8-aad6-166373bb5ee6.73be0.png", "start": 268498616, "end": 268512945}, {"filename": "/test/assets/resources/native/f9/f91818bc-ae4d-45f1-865e-72f0430ee300.23fce.png", "start": 268512945, "end": 268609329}, {"filename": "/test/assets/resources/native/f9/f9380af9-e806-4f63-82f1-d7076be07a49@e208e.6b8e9.bin", "start": 268609329, "end": 268609533}, {"filename": "/test/assets/resources/native/f9/f9acf3ad-1412-4f93-a5ba-70595b318c58.ebcb9.png", "start": 268609533, "end": 268610579}, {"filename": "/test/assets/resources/native/fa/fa17b73e-e2ad-43f6-91ce-34599c5b5b27.b7fe7.png", "start": 268610579, "end": 268770539}, {"filename": "/test/assets/resources/native/fa/fa4888a4-67e1-455c-8d4f-d91746524f99.fbb9d.png", "start": 268770539, "end": 268877235}, {"filename": "/test/assets/resources/native/fa/fa5d3f46-b33c-4bb0-8fd4-494ef0812558@43698.6386e.bin", "start": 268877235, "end": 268878051}, {"filename": "/test/assets/resources/native/fa/fab038e1-0dcb-4cf7-8ba5-9a6c478cf931.aa332.astc", "start": 268878051, "end": 268943603}, {"filename": "/test/assets/resources/native/fa/fab038e1-0dcb-4cf7-8ba5-9a6c478cf931.aa332.png", "start": 268943603, "end": 269029524}, {"filename": "/test/assets/resources/native/fb/fb28ec0f-8fbf-4acc-b436-16e63548537f.2a9fa.astc", "start": 269029524, "end": 269117156}, {"filename": "/test/assets/resources/native/fb/fb28ec0f-8fbf-4acc-b436-16e63548537f.2a9fa.png", "start": 269117156, "end": 269233142}, {"filename": "/test/assets/resources/native/fb/fb5010f2-9e0c-4965-9b1c-1be43454212a.7cfe7.astc", "start": 269233142, "end": 269298694}, {"filename": "/test/assets/resources/native/fb/fb5010f2-9e0c-4965-9b1c-1be43454212a.7cfe7.png", "start": 269298694, "end": 269417083}, {"filename": "/test/assets/resources/native/fb/fb5d2847-5a47-4d00-85dc-696769722fed.9aecc.png", "start": 269417083, "end": 269423152}, {"filename": "/test/assets/resources/native/fb/fb6e5677-9b1d-4413-81b0-6aadb3698c1d.992f5.astc", "start": 269423152, "end": 269772948}, {"filename": "/test/assets/resources/native/fb/fb6e5677-9b1d-4413-81b0-6aadb3698c1d.992f5.png", "start": 269772948, "end": 270245275}, {"filename": "/test/assets/resources/native/fb/fb9bfb01-441d-4fd9-a59b-3bdb80aa8574.0c0fe.astc", "start": 270245275, "end": 270310827}, {"filename": "/test/assets/resources/native/fb/fb9bfb01-441d-4fd9-a59b-3bdb80aa8574.0c0fe.png", "start": 270310827, "end": 270400406}, {"filename": "/test/assets/resources/native/fc/fc6d5b4b-3208-49e3-8768-2cbc8610c455.2c6e4.png", "start": 270400406, "end": 270768384}, {"filename": "/test/assets/resources/native/fc/fc9701e1-5d7f-4237-9970-01656202f59a@fddfc.e7c2a.bin", "start": 270768384, "end": 271153200}, {"filename": "/test/assets/resources/native/fd/fd1751c5-e467-454a-9c05-4e560c817bb5.0d7b7.astc", "start": 271153200, "end": 271218752}, {"filename": "/test/assets/resources/native/fd/fd1751c5-e467-454a-9c05-4e560c817bb5.0d7b7.png", "start": 271218752, "end": 271331716}, {"filename": "/test/assets/resources/native/fd/fd7609f7-513f-4001-8618-dd7b7d141ba3.f9929.astc", "start": 271331716, "end": 271397268}, {"filename": "/test/assets/resources/native/fd/fd7609f7-513f-4001-8618-dd7b7d141ba3.f9929.png", "start": 271397268, "end": 271528636}, {"filename": "/test/assets/resources/native/fd/fdcc1ba2-cfb7-463a-892e-8c27193eb073@d36e4.04f9a.bin", "start": 271528636, "end": 271535788}, {"filename": "/test/assets/resources/native/fe/fe9653ed-b2bd-497c-a8a7-98af69fc5eed.eb9fa.astc", "start": 271535788, "end": 271623420}, {"filename": "/test/assets/resources/native/fe/fe9653ed-b2bd-497c-a8a7-98af69fc5eed.eb9fa.pkm", "start": 271623420, "end": 271798404}, {"filename": "/test/assets/resources/native/fe/fe9653ed-b2bd-497c-a8a7-98af69fc5eed.eb9fa.png", "start": 271798404, "end": 271905319}, {"filename": "/test/assets/resources/native/fe/fe9653ed-b2bd-497c-a8a7-98af69fc5eed.eb9fa.pvr", "start": 271905319, "end": 272080885}, {"filename": "/test/assets/resources/native/fe/febdbae8-886c-4038-8846-de5f3e3fd5e8@0a588.07431.bin", "start": 272080885, "end": 272096617}, {"filename": "/test/assets/resources/native/fe/fee57698-c836-4fda-b835-24c206937611@9eb4e.a918d.bin", "start": 272096617, "end": 272097561}, {"filename": "/test/assets/resources/native/ff/ff1f4832-ca1b-49f5-8834-5e45114e91d3@15792.c2085.bin", "start": 272097561, "end": 272102937}, {"filename": "/test/assets/resources/native/ff/ff30d549-9246-449e-8edf-5fbfdc9e9aa0.18f0c.png", "start": 272102937, "end": 272103030}, {"filename": "/test/assets/resources/native/ff/ff31fb4f-4311-45a8-a968-0e261b2fb0aa@cea4a.f8eee.bin", "start": 272103030, "end": 272316014}, {"filename": "/test/assets/resources/native/ff/ffad2850-3720-40ce-81f3-f0f0b51e3878.9c441.astc", "start": 272316014, "end": 272381566}, {"filename": "/test/assets/resources/native/ff/ffad2850-3720-40ce-81f3-f0f0b51e3878.9c441.png", "start": 272381566, "end": 272502846}, {"filename": "/test/assets/resources/native/ff/ffe6f703-daa4-4085-b408-3aaa3202fb61.c1204.mp3", "start": 272502846, "end": 272515846, "audio": 1}, {"filename": "/test/dd.ts", "start": 272515846, "end": 272515884}, {"filename": "/test/emscripten-main.zip", "start": 272515884, "end": 306063081}, {"filename": "/test/hello_world_file.txt", "start": 306063081, "end": 306063286}, {"filename": "/test/reward-dialog3.png", "start": 306063286, "end": 307094930}, {"filename": "/test/tab3-tip.png", "start": 307094930, "end": 307198167}, {"filename": "/test/test1.png", "start": 307198167, "end": 317406851}, {"filename": "/test/test2.bin", "start": 317406851, "end": 317588275}], "remote_package_size": 317588275});

  })();


    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if (Module['ENVIRONMENT_IS_PTHREAD'] || Module['$ww']) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();
  
    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach(function(task) {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });
  

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = nodePath.dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }

// include: node_shell_read.js
read_ = (filename, binary) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return fs.readFileSync(filename, binary ? undefined : 'utf8');
};

readBinary = (filename) => {
  var ret = read_(filename, true);
  if (!ret.buffer) {
    ret = new Uint8Array(ret);
  }
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, onload, onerror, binary = true) => {
  // See the comment in the `read_` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
    if (err) onerror(err);
    else onload(binary ? data.buffer : data);
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  process.on('uncaughtException', (ex) => {
    // suppress ExitStatus exceptions from showing an error
    if (ex !== 'unwind' && !(ex instanceof ExitStatus) && !(ex.context instanceof ExitStatus)) {
      throw ex;
    }
  });

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

  Module['inspect'] = () => '[Emscripten Module object]';

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  if (typeof read != 'undefined') {
    read_ = (f) => {
      return read(f);
    };
  }

  readBinary = (f) => {
    let data;
    if (typeof readbuffer == 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data == 'object');
    return data;
  };

  readAsync = (f, onload, onerror) => {
    setTimeout(() => onload(readBinary(f)));
  };

  if (typeof clearTimeout == 'undefined') {
    globalThis.clearTimeout = (id) => {};
  }

  if (typeof setTimeout == 'undefined') {
    // spidermonkey lacks setTimeout but we use it above in readAsync.
    globalThis.setTimeout = (f) => (typeof f == 'function') ? f() : abort();
  }

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit == 'function') {
    quit_ = (status, toThrow) => {
      // Unlike node which has process.exitCode, d8 has no such mechanism. So we
      // have no way to set the exit code and then let the program exit with
      // that code when it naturally stops running (say, when all setTimeouts
      // have completed). For that reason, we must call `quit` - the only way to
      // set the exit code - but quit also halts immediately.  To increase
      // consistency with node (and the web) we schedule the actual quit call
      // using a setTimeout to give the current stack and any exception handlers
      // a chance to run.  This enables features such as addOnPostRun (which
      // expected to be able to run code after main returns).
      setTimeout(() => {
        if (!(toThrow instanceof ExitStatus)) {
          let toLog = toThrow;
          if (toThrow && typeof toThrow == 'object' && toThrow.stack) {
            toLog = [toThrow, toThrow.stack];
          }
          err(`exiting due to exception: ${toLog}`);
        }
        quit(status);
      });
      throw toThrow;
    };
  }

  if (typeof print != 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console == 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr != 'undefined' ? printErr : print);
  }

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js
read_ = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  }

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  }

// end include: web_or_worker_shell_read.js
  }

  setWindowTitle = (title) => document.title = title;
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) quit_ = Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");


// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');
var noExitRuntime = Module['noExitRuntime'] || true;legacyModuleProp('noExitRuntime', 'noExitRuntime');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;
// end include: runtime_init_table.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_assertions.js
// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

var runtimeKeepaliveCounter = 0;

function keepRuntimeAlive() {
  return noExitRuntime || runtimeKeepaliveCounter > 0;
}

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module["noFSInit"] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;

TTY.init();
  callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}
// end include: URIUtils.js
/** @param {boolean=} fixedasm */
function createExportWrapper(name, fixedasm) {
  return function() {
    var displayName = name;
    var asm = fixedasm;
    if (!fixedasm) {
      asm = Module['asm'];
    }
    assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
    if (!asm[name]) {
      assert(asm[name], 'exported native function `' + displayName + '` not found');
    }
    return asm[name].apply(null, arguments);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
var wasmBinaryFile;
  wasmBinaryFile = 'fibonacci.wasm';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, try to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
    if (typeof fetch == 'function'
      && !isFileURI(binaryFile)
    ) {
      return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + binaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(() => getBinarySync(binaryFile));
    }
    else if (readAsync) {
      // fetch is not available or url is file => try XHR (readAsync uses XHR internally)
      return new Promise((resolve, reject) => {
        readAsync(binaryFile, (response) => resolve(new Uint8Array(/** @type{!ArrayBuffer} */(response))), reject)
      });
    }
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then((instance) => {
    return instance;
  }).then(receiver, (reason) => {
    err('failed to asynchronously prepare wasm: ' + reason);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err('warning: Loading from a file URI (' + wasmBinaryFile + ') is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing');
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      !isFileURI(binaryFile) &&
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      !ENVIRONMENT_IS_NODE &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then((response) => {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err('wasm streaming compile failed: ' + reason);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  }
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    assert(wasmMemory, "memory not found in wasm exports");
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateMemoryViews();

    wasmTable = Module['asm']['__indirect_function_table'];
    assert(wasmTable, "table not found in wasm exports");

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return exports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {

    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
        return false;
    }
  }

  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
function legacyModuleProp(prop, newName) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        abort('Module.' + prop + ' has been replaced with plain ' + newName + ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)');
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort('`Module.' + prop + '` was supplied but `' + prop + '` not included in INCOMING_MODULE_JS_API');
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        warnOnce('`' + sym + '` is not longer defined by emscripten. ' + msg);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');

function missingLibrarySymbol(sym) {
  if (typeof globalThis !== 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = '`' + sym + '` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line';
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='" + librarySymbol + "')";
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS libary is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)";
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(text) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn.apply(console, arguments);
}
// end include: runtime_debug.js
// === Body ===

// end include: preamble.js

  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[((ptr)>>0)] = value; break;
      case 'i8': HEAP8[((ptr)>>0)] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var warnOnce = (text) => {
      if (!warnOnce.shown) warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  /** @constructor */
  function ExceptionInfo(excPtr) {
      this.excPtr = excPtr;
      this.ptr = excPtr - 24;
  
      this.set_type = function(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      };
  
      this.get_type = function() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      };
  
      this.set_destructor = function(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      };
  
      this.get_destructor = function() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      };
  
      this.set_caught = function (caught) {
        caught = caught ? 1 : 0;
        HEAP8[(((this.ptr)+(12))>>0)] = caught;
      };
  
      this.get_caught = function () {
        return HEAP8[(((this.ptr)+(12))>>0)] != 0;
      };
  
      this.set_rethrown = function (rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(((this.ptr)+(13))>>0)] = rethrown;
      };
  
      this.get_rethrown = function () {
        return HEAP8[(((this.ptr)+(13))>>0)] != 0;
      };
  
      // Initialize native structure fields. Should be called once after allocated.
      this.init = function(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      this.set_adjusted_ptr = function(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      };
  
      this.get_adjusted_ptr = function() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      };
  
      // Get pointer which is expected to be received by catch clause in C++ code. It may be adjusted
      // when the pointer is casted to some of the exception object base classes (e.g. when virtual
      // inheritance is used). When a pointer is thrown this method should return the thrown pointer
      // itself.
      this.get_exception_ptr = function() {
        // Work around a fastcomp bug, this code is still included for some reason in a build without
        // exceptions support.
        var isPointer = ___cxa_is_pointer_type(this.get_type());
        if (isPointer) {
          return HEAPU32[((this.excPtr)>>2)];
        }
        var adjusted = this.get_adjusted_ptr();
        if (adjusted !== 0) return adjusted;
        return this.excPtr;
      };
    }
  
  var exceptionLast = 0;
  
  var uncaughtExceptionCount = 0;
  function ___cxa_throw(ptr, type, destructor) {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      assert(false, 'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.');
    }

  var setErrNo = (value) => {
      HEAP32[((___errno_location())>>2)] = value;
      return value;
    };
  
  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },
  basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },
  join:function() {
        var paths = Array.prototype.slice.call(arguments);
        return PATH.normalize(paths.join('/'));
      },
  join2:(l, r) => {
        return PATH.normalize(l + '/' + r);
      },
  };
  
  var initRandomFill = () => {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      if (ENVIRONMENT_IS_NODE) {
        // for nodejs with or without crypto support included
        try {
          var crypto_module = require('crypto');
          var randomFillSync = crypto_module['randomFillSync'];
          if (randomFillSync) {
            // nodejs with LTS crypto support
            return (view) => crypto_module['randomFillSync'](view);
          }
          // very old nodejs with the original crypto API
          var randomBytes = crypto_module['randomBytes'];
          return (view) => (
            view.set(randomBytes(view.byteLength)),
            // Return the original view to match modern native implementations.
            view
          );
        } catch (e) {
          // nodejs doesn't have crypto support
        }
      }
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: (array) => { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx, maxBytesToRead) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string');
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE, -1);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
            // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          } else {
            result = null;
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else if (typeof readline == 'function') {
          // Command line.
          result = readline();
          if (result !== null) {
            result += '\n';
          }
        }
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close:function(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync:function(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },
  write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char:function(tty) {
          return FS_stdin_getChar();
        },
  put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  ioctl_tcgets:function(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets:function(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz:function(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        },
  },
  };
  
  
  var zeroMemory = (address, size) => {
      HEAPU8.fill(0, address, address + size);
      return address;
    };
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  var mmapAlloc = (size) => {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw FS.genericErrors[44];
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now()
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },
  readdir(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  allocate(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  /** @param {boolean=} noRunDep */
  var asyncLoad = (url, onload, onerror, noRunDep) => {
      var dep = !noRunDep ? getUniqueRunDependency(`al ${url}`) : '';
      readAsync(url, (arrayBuffer) => {
        assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency(dep);
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw `Loading data file "${url}" failed.`;
        }
      });
      if (dep) addRunDependency(dep);
    };
  
  
  var preloadPlugins = Module['preloadPlugins'] || [];
  function FS_handledByPreloadPlugin(byteArray, fullname, finish, onerror) {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach(function(plugin) {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    }
  function FS_createPreloadedFile(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          if (preFinish) preFinish();
          if (!dontCreateFile) {
            FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          if (onload) onload();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          if (onerror) onerror();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url, (byteArray) => processData(byteArray), onerror);
      } else {
        processData(url);
      }
    }
  
  function FS_modeStringToFlags(str) {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    }
  
  function FS_getMode(canRead, canWrite) {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    }
  
  
  
  
  var ERRNO_MESSAGES = {
  0:"Success",
  1:"Arg list too long",
  2:"Permission denied",
  3:"Address already in use",
  4:"Address not available",
  5:"Address family not supported by protocol family",
  6:"No more processes",
  7:"Socket already connected",
  8:"Bad file number",
  9:"Trying to read unreadable message",
  10:"Mount device busy",
  11:"Operation canceled",
  12:"No children",
  13:"Connection aborted",
  14:"Connection refused",
  15:"Connection reset by peer",
  16:"File locking deadlock error",
  17:"Destination address required",
  18:"Math arg out of domain of func",
  19:"Quota exceeded",
  20:"File exists",
  21:"Bad address",
  22:"File too large",
  23:"Host is unreachable",
  24:"Identifier removed",
  25:"Illegal byte sequence",
  26:"Connection already in progress",
  27:"Interrupted system call",
  28:"Invalid argument",
  29:"I/O error",
  30:"Socket is already connected",
  31:"Is a directory",
  32:"Too many symbolic links",
  33:"Too many open files",
  34:"Too many links",
  35:"Message too long",
  36:"Multihop attempted",
  37:"File or path name too long",
  38:"Network interface is not configured",
  39:"Connection reset by network",
  40:"Network is unreachable",
  41:"Too many open files in system",
  42:"No buffer space available",
  43:"No such device",
  44:"No such file or directory",
  45:"Exec format error",
  46:"No record locks available",
  47:"The link has been severed",
  48:"Not enough core",
  49:"No message of desired type",
  50:"Protocol not available",
  51:"No space left on device",
  52:"Function not implemented",
  53:"Socket is not connected",
  54:"Not a directory",
  55:"Directory not empty",
  56:"State not recoverable",
  57:"Socket operation on non-socket",
  59:"Not a typewriter",
  60:"No such device or address",
  61:"Value too large for defined data type",
  62:"Previous owner died",
  63:"Not super-user",
  64:"Broken pipe",
  65:"Protocol error",
  66:"Unknown protocol",
  67:"Protocol wrong type for socket",
  68:"Math result not representable",
  69:"Read only file system",
  70:"Illegal seek",
  71:"No such process",
  72:"Stale file handle",
  73:"Connection timed out",
  74:"Text file busy",
  75:"Cross-device link",
  100:"Device not a stream",
  101:"Bad font file fmt",
  102:"Invalid slot",
  103:"Invalid request code",
  104:"No anode",
  105:"Block device required",
  106:"Channel number out of range",
  107:"Level 3 halted",
  108:"Level 3 reset",
  109:"Link number out of range",
  110:"Protocol driver not attached",
  111:"No CSI structure available",
  112:"Level 2 halted",
  113:"Invalid exchange",
  114:"Invalid request descriptor",
  115:"Exchange full",
  116:"No data (for no delay io)",
  117:"Timer expired",
  118:"Out of streams resources",
  119:"Machine is not on the network",
  120:"Package not installed",
  121:"The object is remote",
  122:"Advertise error",
  123:"Srmount error",
  124:"Communication error on send",
  125:"Cross mount point (not really error)",
  126:"Given log. name not unique",
  127:"f.d. invalid for this operation",
  128:"Remote address changed",
  129:"Can   access a needed shared lib",
  130:"Accessing a corrupted shared lib",
  131:".lib section in a.out corrupted",
  132:"Attempting to link in too many libs",
  133:"Attempting to exec a shared library",
  135:"Streams pipe error",
  136:"Too many users",
  137:"Socket type not supported",
  138:"Not supported",
  139:"Protocol family not supported",
  140:"Can't send after socket shutdown",
  141:"Too many references",
  142:"Host is down",
  148:"No medium (in tape drive)",
  156:"Level 2 not synchronized",
  };
  
  var ERRNO_CODES = {
  };
  
  function demangle(func) {
      warnOnce('warning: build with -sDEMANGLE_SUPPORT to link in libcxxabi demangling');
      return func;
    }
  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  ErrnoError:null,
  genericErrors:{
  },
  filesystems:null,
  syncFSRequests:0,
  lookupPath:(path, opts = {}) => {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts)
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },
  getPath:(node) => {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName:(parentid, name) => {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode:(parent, name) => {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode:(parent, name, mode, rdev) => {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode:(node) => {
        FS.hashRemoveNode(node);
      },
  isRoot:(node) => {
        return node === node.parent;
      },
  isMountpoint:(node) => {
        return !!node.mounted;
      },
  isFile:(mode) => {
        return (mode & 61440) === 32768;
      },
  isDir:(mode) => {
        return (mode & 61440) === 16384;
      },
  isLink:(mode) => {
        return (mode & 61440) === 40960;
      },
  isChrdev:(mode) => {
        return (mode & 61440) === 8192;
      },
  isBlkdev:(mode) => {
        return (mode & 61440) === 24576;
      },
  isFIFO:(mode) => {
        return (mode & 61440) === 4096;
      },
  isSocket:(mode) => {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString:(flag) => {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions:(node, perms) => {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup:(dir) => {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate:(dir, name) => {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete:(dir, name, isdir) => {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen:(node, flags) => {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  MAX_OPEN_FDS:4096,
  nextfd:() => {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked:(fd) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream:(stream, fd = -1) => {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function() {
            this.shared = { };
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              /** @this {FS.FSStream} */
              get() { return this.node; },
              /** @this {FS.FSStream} */
              set(val) { this.node = val; }
            },
            isRead: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              /** @this {FS.FSStream} */
              get() { return (this.flags & 1024); }
            },
            flags: {
              /** @this {FS.FSStream} */
              get() { return this.shared.flags; },
              /** @this {FS.FSStream} */
              set(val) { this.shared.flags = val; },
            },
            position : {
              /** @this {FS.FSStream} */
              get() { return this.shared.position; },
              /** @this {FS.FSStream} */
              set(val) { this.shared.position = val; },
            },
          });
        }
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream:(fd) => {
        FS.streams[fd] = null;
      },
  chrdev_stream_ops:{
  open:(stream) => {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },
  llseek:() => {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice:(dev, ops) => {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts:(mount) => {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },
  syncfs:(populate, callback) => {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount:(type, opts, mountpoint) => {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount:(mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup:(parent, name) => {
        return parent.node_ops.lookup(parent, name);
      },
  mknod:(path, mode, dev) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  create:(path, mode) => {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir:(path, mode) => {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree:(path, mode) => {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev:(path, mode, dev) => {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink:(oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename:(old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },
  unlink:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink:(path) => {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },
  stat:(path, dontFollow) => {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },
  lstat:(path) => {
        return FS.stat(path, true);
      },
  chmod:(path, mode, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },
  lchmod:(path, mode) => {
        FS.chmod(path, mode, true);
      },
  fchmod:(fd, mode) => {
        var stream = FS.getStreamChecked(fd);
        FS.chmod(stream.node, mode);
      },
  chown:(path, uid, gid, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },
  lchown:(path, uid, gid) => {
        FS.chown(path, uid, gid, true);
      },
  fchown:(fd, uid, gid) => {
        var stream = FS.getStreamChecked(fd);
        FS.chown(stream.node, uid, gid);
      },
  truncate:(path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },
  ftruncate:(fd, len) => {
        var stream = FS.getStreamChecked(fd);
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },
  utime:(path, atime, mtime) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },
  open:(path, flags, mode) => {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close:(stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed:(stream) => {
        return stream.fd === null;
      },
  llseek:(stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read:(stream, buffer, offset, length, position) => {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write:(stream, buffer, offset, length, position, canOwn) => {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  allocate:(stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },
  mmap:(stream, length, position, prot, flags) => {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync:(stream, buffer, offset, length, mmapFlags) => {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  munmap:(stream) => 0,
  ioctl:(stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile:(path, opts = {}) => {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },
  writeFile:(path, data, opts = {}) => {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories:() => {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices:() => {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories:() => {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: () => {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: (parent, name) => {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams:() => {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  ensureErrnoError:() => {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          // We set the `name` property to be able to identify `FS.ErrnoError`
          // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
          // - when using PROXYFS, an error can come from an underlying FS
          // as different FS objects have their own FS.ErrnoError each,
          // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
          // we'll use the reliable test `err.name == "ErrnoError"` instead
          this.name = 'ErrnoError';
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
  
          // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
          // now ensures it shows what we want.
          if (this.stack) {
            // Define the stack property for Node.js 4, which otherwise errors on the next line.
            Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },
  staticInit:() => {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init:(input, output, error) => {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },
  quit:() => {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },
  findObject:(path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath:(path, dontResolveLastLink) => {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath:(parent, path, canRead, canWrite) => {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },
  createFile:(parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile:(parent, name, data, canRead, canWrite, canOwn) => {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },
  createDevice:(parent, name, input, output) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false;
          },
          close: (stream) => {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: (stream, buffer, offset, length, pos /* ignored */) => {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: (stream, buffer, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile:(obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },
  createLazyFile:(parent, name, url, canRead, canWrite) => {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (from, to) => {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            }
            return intArrayFromString(xhr.responseText || '', true);
          };
          var lazyArray = this;
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if (!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath:() => {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder:() => {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink:() => {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath:() => {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc:() => {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath:() => {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number');
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt:function(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return PATH.join2(dir, path);
      },
  doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(24))>>2)] = tempI64[0],HEAP32[(((buf)+(28))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble=Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble=Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble=Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        return 0;
      },
  doMsync:function(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  varargs:undefined,
  get() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  getStreamFromFD:function(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  };
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.createStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 5:
        /* case 5: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 6:
        case 7:
        /* case 6: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 7: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fcntl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = SYSCALLS.get();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(((argp + i)+(17))>>0)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = SYSCALLS.get();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(((argp + i)+(17))>>0)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = SYSCALLS.get();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? SYSCALLS.get() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var _abort = () => {
      abort('native code called abort()');
    };

  var _emscripten_memcpy_big = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  var getHeapMax = () =>
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      2147483648;
  
  var growMemory = (size) => {
      var b = wasmMemory.buffer;
      var pages = (size - b.byteLength + 65535) >>> 16;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow(pages); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err(`growMemory: Attempted to grow heap from ${b.byteLength} bytes to ${size} bytes, but got error: ${e}`);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err(`Cannot enlarge memory, asked to go up to ${requestedSize} bytes, but the limit is ${maxHeapSize} bytes!`);
        return false;
      }
  
      var alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = growMemory(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err(`Failed to grow the heap from ${oldSize} bytes to ${newSize} bytes, not enough memory!`);
      return false;
    };

  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8,ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  function convertI32PairToI53Checked(lo, hi) {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    }
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);;
  
    
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? (+(Math.floor((tempDouble)/4294967296.0)))>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)], HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8,ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }


  var UTF32ToString = (ptr, maxBytesToRead) => {
      assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
      var i = 0;
  
      var str = '';
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
        if (utf32 == 0) break;
        ++i;
        // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        if (utf32 >= 0x10000) {
          var ch = utf32 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    };


  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_unlink"] = FS.unlink;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createDevice"] = FS.createDevice;;
ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };;
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  __cxa_throw: ___cxa_throw,
  __syscall_fcntl64: ___syscall_fcntl64,
  __syscall_ioctl: ___syscall_ioctl,
  __syscall_openat: ___syscall_openat,
  abort: _abort,
  emscripten_memcpy_big: _emscripten_memcpy_big,
  emscripten_resize_heap: _emscripten_resize_heap,
  fd_close: _fd_close,
  fd_read: _fd_read,
  fd_seek: _fd_seek,
  fd_write: _fd_write
};
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = createExportWrapper("__wasm_call_ctors");
/** @type {function(...*):?} */
var _fibonacci = Module['_fibonacci'] = createExportWrapper("fibonacci");
/** @type {function(...*):?} */
var _malloc = createExportWrapper("malloc");
/** @type {function(...*):?} */
var _chararr = Module['_chararr'] = createExportWrapper("chararr");
/** @type {function(...*):?} */
var _filechar = Module['_filechar'] = createExportWrapper("filechar");
/** @type {function(...*):?} */
var _get_result_pointer = Module['_get_result_pointer'] = createExportWrapper("get_result_pointer");
/** @type {function(...*):?} */
var _get_result_size = Module['_get_result_size'] = createExportWrapper("get_result_size");
/** @type {function(...*):?} */
var _charsize = Module['_charsize'] = createExportWrapper("charsize");
/** @type {function(...*):?} */
var _free_buf = Module['_free_buf'] = createExportWrapper("free_buf");
/** @type {function(...*):?} */
var _free = createExportWrapper("free");
/** @type {function(...*):?} */
var ___errno_location = createExportWrapper("__errno_location");
/** @type {function(...*):?} */
var _fflush = Module['_fflush'] = createExportWrapper("fflush");
/** @type {function(...*):?} */
var _emscripten_stack_init = function() {
  return (_emscripten_stack_init = Module['asm']['emscripten_stack_init']).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_free = function() {
  return (_emscripten_stack_get_free = Module['asm']['emscripten_stack_get_free']).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_base = function() {
  return (_emscripten_stack_get_base = Module['asm']['emscripten_stack_get_base']).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_end = function() {
  return (_emscripten_stack_get_end = Module['asm']['emscripten_stack_get_end']).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = createExportWrapper("stackSave");
/** @type {function(...*):?} */
var stackRestore = createExportWrapper("stackRestore");
/** @type {function(...*):?} */
var stackAlloc = createExportWrapper("stackAlloc");
/** @type {function(...*):?} */
var _emscripten_stack_get_current = function() {
  return (_emscripten_stack_get_current = Module['asm']['emscripten_stack_get_current']).apply(null, arguments);
};

/** @type {function(...*):?} */
var ___cxa_is_pointer_type = createExportWrapper("__cxa_is_pointer_type");
/** @type {function(...*):?} */
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper("dynCall_jiji");


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

// include: base64Utils.js
// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf['buffer'], buf['byteOffset'], buf['byteLength']);
  }

  try {
    var decoded = atob(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
Module['addRunDependency'] = addRunDependency;
Module['removeRunDependency'] = removeRunDependency;
Module['FS_createPath'] = FS.createPath;
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createLazyFile'] = FS.createLazyFile;
Module['FS_createDevice'] = FS.createDevice;
Module['FS_unlink'] = FS.unlink;
Module['UTF32ToString'] = UTF32ToString;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;
var missingLibrarySymbols = [
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'exitJS',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'getHostByName',
  'traverseStack',
  'getCallstack',
  'emscriptenLog',
  'convertPCtoSourceLocation',
  'readEmAsmArgs',
  'jstoi_q',
  'jstoi_s',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'handleException',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'safeSetTimeout',
  'asmjsMangle',
  'handleAllocatorInit',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'stringToUTF8',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'stackTrace',
  'getEnvStrings',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'setMainLoop',
  'getSocketFromFD',
  'getSocketAddress',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'heapAccessShiftForWebGLHeap',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  '__glGenObject',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'SDL_unicode',
  'SDL_ttfContext',
  'SDL_audio',
  'GLFW_Window',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'FS_createFolder',
  'FS_createLink',
  'out',
  'err',
  'callMain',
  'abort',
  'keepRuntimeAlive',
  'wasmMemory',
  'stackAlloc',
  'stackSave',
  'stackRestore',
  'getTempRet0',
  'setTempRet0',
  'writeStackCookie',
  'checkStackCookie',
  'convertI32PairToI53Checked',
  'ptrToString',
  'zeroMemory',
  'getHeapMax',
  'growMemory',
  'ENV',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'ERRNO_CODES',
  'ERRNO_MESSAGES',
  'setErrNo',
  'DNS',
  'Protocols',
  'Sockets',
  'initRandomFill',
  'randomFill',
  'timers',
  'warnOnce',
  'UNWIND_CACHE',
  'readEmAsmArgsArray',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'lengthBytesUTF8',
  'intArrayFromString',
  'UTF16Decoder',
  'JSEvents',
  'specialHTMLTargets',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'demangle',
  'demangleAll',
  'ExitStatus',
  'doReadv',
  'doWritev',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'Browser',
  'wget',
  'SYSCALLS',
  'preloadPlugins',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'emscripten_webgl_power_preferences',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'GLFW',
  'allocateUTF8',
  'allocateUTF8OnStack',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty && tty.output && tty.output.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();


// end include: postamble.js
