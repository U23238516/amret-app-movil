/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-54d0af47'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "assets/focus-visible-legacy-CdO5cX4I.js",
    "revision": null
  }, {
    "url": "assets/focus-visible-supuXXMI.js",
    "revision": null
  }, {
    "url": "assets/index-BjedFwf1.css",
    "revision": null
  }, {
    "url": "assets/index-legacy-Bg2NsAc5.js",
    "revision": null
  }, {
    "url": "assets/index-tXOknAA3.js",
    "revision": null
  }, {
    "url": "assets/index9-CjiUS2eH.js",
    "revision": null
  }, {
    "url": "assets/index9-legacy-Ci79HJ8V.js",
    "revision": null
  }, {
    "url": "assets/input-shims-BFkwGj87.js",
    "revision": null
  }, {
    "url": "assets/input-shims-legacy-OiZXm7_G.js",
    "revision": null
  }, {
    "url": "assets/ios.transition-legacy-zJBwfLxX.js",
    "revision": null
  }, {
    "url": "assets/ios.transition-O0si-Ztr.js",
    "revision": null
  }, {
    "url": "assets/md.transition-Cgj8Y6r6.js",
    "revision": null
  }, {
    "url": "assets/md.transition-legacy-cD2Xwjlj.js",
    "revision": null
  }, {
    "url": "assets/polyfills-legacy-DWiiIFfC.js",
    "revision": null
  }, {
    "url": "assets/status-tap-DwbOr8wk.js",
    "revision": null
  }, {
    "url": "assets/status-tap-legacy-BYN2XWi9.js",
    "revision": null
  }, {
    "url": "assets/swipe-back-DR7MN3WM.js",
    "revision": null
  }, {
    "url": "assets/swipe-back-legacy-BaKWHHts.js",
    "revision": null
  }, {
    "url": "index.html",
    "revision": "a97b3c48ca731d7171ebec5fffc67ccb"
  }, {
    "url": "registerServiceWorker.js",
    "revision": "134883d95a1fa2478bfbb85489149900"
  }, {
    "url": "registerSW.js",
    "revision": "acd0b1f90a0ece433b535c95d55d8688"
  }, {
    "url": "manifest.webmanifest",
    "revision": "68af533a7e9db95b73cd2fd206029a52"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
