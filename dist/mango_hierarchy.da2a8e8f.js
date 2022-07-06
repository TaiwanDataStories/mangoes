// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"data/mango_hierarchy.js":[function(require,module,exports) {
var mangoes = [{
  parent: "",
  name: "All",
  name_en: "All",
  size_cm: "",
  sweetness_brix: "",
  color: "",
  origin_en: "",
  origin: "",
  feature_en: "",
  feature: "",
  region: "",
  year: "",
  region_en: ""
}, {
  parent: "All",
  name: "夏雪",
  name_en: "Xiaxue",
  size_cm: 12.5,
  sweetness_brix: 12,
  color: "yellow",
  origin_en: "Kaohsiung City, 2008",
  origin: "2008年高雄場育成",
  feature_en: "Both peel & pulp are orange yellow. Full of mango aroma",
  feature: "",
  region: "高雄",
  year: 2008,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "愛文",
  name_en: "Irwin",
  size_cm: 11,
  sweetness_brix: 12.7,
  color: "bright reddish orange",
  origin_en: "Introduced from Florida, 1954",
  origin: "1954年美國引進",
  feature_en: "The most popular variety. The Japanese call it the king of mango. If you see the black spot on the mango skin, it means the mango is completely ripe",
  feature: "栽培面積最大，常見黑色斑點為炭疽病。果肉淡黃，纖維少，肉質細",
  region: "美國",
  year: 1954,
  region_en: "Florida, USA"
}, {
  parent: "All",
  name: "金興",
  name_en: "Jinxing",
  size_cm: 17,
  sweetness_brix: 14.1,
  color: "red",
  origin_en: "Tainan,1996",
  origin: "",
  feature_en: "Best at 70%-80% ripe",
  feature: "",
  region: "台南縣南化鄉",
  year: 1996,
  region_en: "Tainan"
}, {
  parent: "All",
  name: "土芒果",
  name_en: "Tu",
  size_cm: 8.5,
  sweetness_brix: 14.9,
  color: "green",
  origin_en: "Introduced by the Dutch,1623-1662",
  origin: "1623-1662年荷蘭人引進",
  feature_en: "Orange/yellow thick pulp. Sour/sweet taste",
  feature: "果肉橙黃，酸甜且肉質粗，幼果可做情人果。",
  region: "爪哇",
  year: "1623-1662",
  region_en: "Java, Indonesia"
}, {
  parent: "All",
  name: "玉文",
  name_en: "Yuwen",
  size_cm: 12.5,
  sweetness_brix: 15,
  color: "yellowish red",
  origin_en: "Tainan, 1954",
  origin: "1954年美國引進",
  feature_en: "Very little fiber & tender pulp",
  feature: "",
  region: "台南玉井鄉",
  year: 1954,
  region_en: "Tainan"
}, {
  parent: "All",
  name: "聖心",
  name_en: "Sensation",
  size_cm: 11,
  sweetness_brix: 15,
  color: "dark red",
  origin_en: "Introduced from the US, 1954",
  origin: "1954年美國引進",
  feature_en: "Red peel is shiny but thick. Almost no fiber",
  feature: "",
  region: "美國",
  year: 1954,
  region_en: "USA"
}, {
  parent: "All",
  name: "玉文6號",
  name_en: "Yuwen #6",
  size_cm: 15,
  sweetness_brix: 15.1,
  color: "reddish yellow",
  origin_en: "Yujing Dist., Tainan City,around 1980",
  origin: "1980年代左右台南市玉井區果農郭文忠",
  feature_en: "Tender pulp, low fiber & not sour",
  feature: "",
  region: "台南市玉井區",
  year: 1980,
  region_en: "Tainan"
}, {
  parent: "All",
  name: "凱特",
  name_en: "Keitt",
  size_cm: 15,
  sweetness_brix: 15.4,
  color: "orange / yellow / green",
  origin_en: "Introduced from the US, 1954",
  origin: "1954年美國引進",
  feature_en: "Riped peel is orange/green, large spots, more fiber. Best at 70%-80% riped",
  feature: "",
  region: "南縣玉井鄉",
  year: 1954,
  region_en: "Tainan"
}, {
  parent: "All",
  name: "海頓",
  name_en: "Haden",
  size_cm: 11,
  sweetness_brix: 15.4,
  color: "dark red yellow",
  origin_en: "Introduced from the US, 1954",
  origin: "1954年美國引進",
  feature_en: "Thick peel & great aroma. Slighly fibrous & thick pulp",
  feature: "",
  region: "美國",
  year: 1954,
  region_en: "USA"
}, {
  parent: "All",
  name: "黑香",
  name_en: "Hēi-xiāng",
  size_cm: 12.5,
  sweetness_brix: 15.6,
  color: "green",
  origin_en: "From Indonesia during the Japanese occupation (1912-1916)",
  origin: "日治時期（1912-1916年）自印尼引進",
  feature_en: "Green peel stays green after ripening. Has the aroma of longan fruit",
  feature: "",
  region: "印尼",
  year: 1912,
  region_en: "Indonesia"
}, {
  parent: "All",
  name: "西施",
  name_en: "Xishi",
  size_cm: 21,
  sweetness_brix: 16,
  color: "bright red",
  origin_en: "Nanhua Dist., Tainan City, year unknown",
  origin: "年代不可考，台南市南化區果農育成",
  feature_en: "Long shape, tender yellow pulp, & low fiber",
  feature: "",
  region: "台南市南化區",
  year: "Unknown",
  region_en: "Tainan"
}, {
  parent: "All",
  name: "杉林1號",
  name_en: "Shānlín #1",
  size_cm: 12.5,
  sweetness_brix: 16.2,
  color: "orange",
  origin_en: "Shanlin Dist., Kaohsiung City, 1991",
  origin: "1991年由高雄縣杉林鄉果農林慶瑩先生在",
  feature_en: "Tender, sweet and a little sour",
  feature: "",
  region: "高雄縣杉林鄉",
  year: 1991,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "蜜雪",
  name_en: "Michelle",
  size_cm: 11,
  sweetness_brix: 17,
  color: "peachy red",
  origin_en: "Kaohsiung City, 2012",
  origin: "2012年高雄場育成",
  feature_en: "Pink peel, aroma from mango's head, tender pulp & low fiber",
  feature: "果皮呈桃紅色，果蒂處散發淡淡果香味，肉質細緻纖維少",
  region: "高雄",
  year: 2012,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "四季檨",
  name_en: "Four seasons",
  size_cm: 14,
  sweetness_brix: 17,
  color: "pinkish yellow",
  origin_en: "Chiayi County, 1981",
  origin: "1981年嘉義縣張銘顯以愛文和懷特芒果育成",
  feature_en: "Lots of red juice, aroma from peel, stores well",
  feature: "",
  region: "嘉義縣",
  year: 1981,
  region_en: "Chiayi"
}, {
  parent: "All",
  name: "紅龍",
  name_en: "Hong-long",
  size_cm: 12.5,
  sweetness_brix: 17.3,
  color: "orangish yellow",
  origin_en: "Kaohsiung City, 1976",
  origin: "1976年高雄市荖濃地區果農發現",
  feature_en: "Head of mango has peaches' aroma. Tender pulp has milk's aroma",
  feature: "",
  region: "高雄市荖濃",
  year: 1976,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "金煌",
  name_en: "Jinhuang",
  size_cm: 21,
  sweetness_brix: 17.4,
  color: "yellow",
  origin_en: "Liouguei Dist., Kaohsiung City, 1976",
  origin: "1971年高雄市六龜區黃金煌先生育成",
  feature_en: "Tender pulp & best at 70%-80% riped",
  feature: "",
  region: "高雄市六龜區",
  year: 1981,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "台農2號",
  name_en: "Tainong #2",
  size_cm: 13.5,
  sweetness_brix: 17.7,
  color: "beige",
  origin_en: "Fongshan Dist., Kaohsiung City, 1985",
  origin: "1985年高雄市鳳山熱帶園藝試驗分所育成",
  feature_en: "Tender pulp & very refreshing.",
  feature: "",
  region: "高雄市鳳山",
  year: 1985,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "慢愛文",
  name_en: "Slow Irwin",
  size_cm: 11.5,
  sweetness_brix: 18,
  color: "reddish orange",
  origin_en: "Liouguei Dist., Kaohsiung City, 1996",
  origin: "1996年高雄六龜的果農在果園的實生苗後代中無意發現",
  feature_en: "Tender pulp & very juicy. Tastes well when freezed after a few hours",
  feature: "",
  region: "高雄縣六龜鄉",
  year: 1996,
  region_en: "Kaohsiung"
}, {
  parent: "All",
  name: "黃金",
  name_en: "Fortune",
  size_cm: 14,
  sweetness_brix: 20,
  color: "yellow",
  origin_en: "Introduced from Japan, 1912",
  origin: "1912年由日本人引進台灣",
  feature_en: "All season mango. Very juicy and chewey",
  feature: "",
  region: "泰國",
  year: 1912,
  region_en: "Thailand"
}, {
  parent: "All",
  name: "玉林",
  name_en: "Yulin",
  size_cm: 10.5,
  sweetness_brix: 20.1,
  color: "yellow",
  origin_en: "Yujing Dist., Tainan City,around 1976",
  origin: "1976年左右，由台南縣玉井鄉溫姓果農所發現",
  feature_en: "Becomes golden yellow after ripening",
  feature: "",
  region: "台南縣玉井鄉",
  year: 1976,
  region_en: "Tainan"
}, {
  parent: "All",
  name: "金蜜",
  name_en: "Golden Honey",
  size_cm: 9.5,
  sweetness_brix: 21.3,
  color: "yellow",
  origin_en: "Introduced from the Philippines by farmers in Changhua County, 1971",
  origin: "1971年由彰化縣員林鎮果農自菲律賓引進，自行育成",
  feature_en: "Riped mango's peel is golden yellow. Medium fiber, great aroma",
  feature: "成熟果實的外皮為金黃色，圓形果，纖維中等、風味佳、香氣濃",
  region: "彰化縣",
  year: 1971,
  region_en: "Changhua"
}, {
  parent: "All",
  name: "台中1號",
  name_en: "Taichung #1",
  size_cm: 12.5,
  sweetness_brix: 22.5,
  color: "light reddish yellow",
  origin_en: "Taichung District Agricultural Research Station, 2015",
  origin: "2015年台中農改場育成",
  feature_en: "Mango pulp has coconut fragrance, low fiber and very chewy",
  feature: "果肉有椰奶香氣，纖維少，口感Q彈",
  region: "台中",
  year: 2015,
  region_en: "Taichung"
}, {
  parent: "All",
  name: "香水",
  name_en: "Perfume",
  size_cm: 8.5,
  sweetness_brix: 25,
  color: "reddish yellow",
  origin_en: "Fongshan Dist., Kaohsiung City, 1985",
  origin: "1985年鳳山熱帶園藝試驗分所育成",
  feature_en: "Peel is yellow/pink with small spots. Less juice & long shelf life",
  feature: "果皮顏色為黃帶粉紅，果斑細小，果肉橙黃色，肉質細緻，汁少，較耐貯運",
  region: "鳳山",
  year: 1985,
  region_en: "Kaohsiung"
}];
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50139" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","data/mango_hierarchy.js"], null)
//# sourceMappingURL=/mango_hierarchy.da2a8e8f.js.map