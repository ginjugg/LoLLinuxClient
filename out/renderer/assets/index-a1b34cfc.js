/*!
 * Vue.js v2.7.15
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
var emptyObject = Object.freeze({});
var isArray$2 = Array.isArray;
function isUndef(v) {
  return v === void 0 || v === null;
}
function isDef(v) {
  return v !== void 0 && v !== null;
}
function isTrue(v) {
  return v === true;
}
function isFalse(v) {
  return v === false;
}
function isPrimitive(value) {
  return typeof value === "string" || typeof value === "number" || // $flow-disable-line
  typeof value === "symbol" || typeof value === "boolean";
}
function isFunction$2(value) {
  return typeof value === "function";
}
function isObject$3(obj) {
  return obj !== null && typeof obj === "object";
}
var _toString = Object.prototype.toString;
function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}
function isPlainObject$1(obj) {
  return _toString.call(obj) === "[object Object]";
}
function isRegExp$1(v) {
  return _toString.call(v) === "[object RegExp]";
}
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function isPromise$1(val) {
  return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
}
function toString$1(val) {
  return val == null ? "" : Array.isArray(val) || isPlainObject$1(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
}
function toNumber(val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n;
}
function makeMap(str, expectsLowerCase) {
  var map = /* @__PURE__ */ Object.create(null);
  var list = str.split(",");
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? function(val) {
    return map[val.toLowerCase()];
  } : function(val) {
    return map[val];
  };
}
makeMap("slot,component", true);
var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
function remove$2(arr, item) {
  var len = arr.length;
  if (len) {
    if (item === arr[len - 1]) {
      arr.length = len - 1;
      return;
    }
    var index2 = arr.indexOf(item);
    if (index2 > -1) {
      return arr.splice(index2, 1);
    }
  }
}
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty$1.call(obj, key);
}
function cached(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var camelizeRE = /-(\w)/g;
var camelize = cached(function(str) {
  return str.replace(camelizeRE, function(_, c) {
    return c ? c.toUpperCase() : "";
  });
});
var capitalize = cached(function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function(str) {
  return str.replace(hyphenateRE, "-$1").toLowerCase();
});
function polyfillBind(fn, ctx) {
  function boundFn(a) {
    var l = arguments.length;
    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
  }
  boundFn._length = fn.length;
  return boundFn;
}
function nativeBind(fn, ctx) {
  return fn.bind(ctx);
}
var bind$1 = Function.prototype.bind ? nativeBind : polyfillBind;
function toArray$2(list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
function extend$2(to2, _from) {
  for (var key in _from) {
    to2[key] = _from[key];
  }
  return to2;
}
function toObject(arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend$2(res, arr[i]);
    }
  }
  return res;
}
function noop$2(a, b, c) {
}
var no = function(a, b, c) {
  return false;
};
var identity = function(_) {
  return _;
};
function looseEqual(a, b) {
  if (a === b)
    return true;
  var isObjectA = isObject$3(a);
  var isObjectB = isObject$3(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function(e, i) {
          return looseEqual(e, b[i]);
        });
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function(key) {
          return looseEqual(a[key], b[key]);
        });
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
function looseIndexOf(arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val))
      return i;
  }
  return -1;
}
function once$1(fn) {
  var called = false;
  return function() {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
function hasChanged(x, y) {
  if (x === y) {
    return x === 0 && 1 / x !== 1 / y;
  } else {
    return x === x || y === y;
  }
}
var SSR_ATTR = "data-server-rendered";
var ASSET_TYPES = ["component", "directive", "filter"];
var LIFECYCLE_HOOKS = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  "beforeUpdate",
  "updated",
  "beforeDestroy",
  "destroyed",
  "activated",
  "deactivated",
  "errorCaptured",
  "serverPrefetch",
  "renderTracked",
  "renderTriggered"
];
var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: /* @__PURE__ */ Object.create(null),
  /**
   * Whether to suppress warnings.
   */
  silent: false,
  /**
   * Show production mode tip message on boot?
   */
  productionTip: false,
  /**
   * Whether to enable devtools
   */
  devtools: false,
  /**
   * Whether to record perf
   */
  performance: false,
  /**
   * Error handler for watcher errors
   */
  errorHandler: null,
  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,
  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],
  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: /* @__PURE__ */ Object.create(null),
  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,
  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,
  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,
  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop$2,
  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,
  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,
  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,
  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
};
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
function isReserved(str) {
  var c = (str + "").charCodeAt(0);
  return c === 36 || c === 95;
}
function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
function parsePath$1(path) {
  if (bailRE.test(path)) {
    return;
  }
  var segments = path.split(".");
  return function(obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj)
        return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
var hasProto = "__proto__" in {};
var inBrowser$2 = typeof window !== "undefined";
var UA = inBrowser$2 && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
var isEdge = UA && UA.indexOf("edge/") > 0;
UA && UA.indexOf("android") > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);
var nativeWatch = {}.watch;
var supportsPassive = false;
if (inBrowser$2) {
  try {
    var opts = {};
    Object.defineProperty(opts, "passive", {
      get: function() {
        supportsPassive = true;
      }
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {
  }
}
var _isServer;
var isServerRendering = function() {
  if (_isServer === void 0) {
    if (!inBrowser$2 && typeof global !== "undefined") {
      _isServer = global["process"] && global["process"].env.VUE_ENV === "server";
    } else {
      _isServer = false;
    }
  }
  return _isServer;
};
var devtools = inBrowser$2 && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function isNative(Ctor) {
  return typeof Ctor === "function" && /native code/.test(Ctor.toString());
}
var hasSymbol$1 = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
var _Set;
if (typeof Set !== "undefined" && isNative(Set)) {
  _Set = Set;
} else {
  _Set = /** @class */
  function() {
    function Set2() {
      this.set = /* @__PURE__ */ Object.create(null);
    }
    Set2.prototype.has = function(key) {
      return this.set[key] === true;
    };
    Set2.prototype.add = function(key) {
      this.set[key] = true;
    };
    Set2.prototype.clear = function() {
      this.set = /* @__PURE__ */ Object.create(null);
    };
    return Set2;
  }();
}
var currentInstance = null;
function setCurrentInstance(vm) {
  if (vm === void 0) {
    vm = null;
  }
  if (!vm)
    currentInstance && currentInstance._scope.off();
  currentInstance = vm;
  vm && vm._scope.on();
}
var VNode = (
  /** @class */
  function() {
    function VNode2(tag, data3, children2, text, elm, context, componentOptions, asyncFactory) {
      this.tag = tag;
      this.data = data3;
      this.children = children2;
      this.text = text;
      this.elm = elm;
      this.ns = void 0;
      this.context = context;
      this.fnContext = void 0;
      this.fnOptions = void 0;
      this.fnScopeId = void 0;
      this.key = data3 && data3.key;
      this.componentOptions = componentOptions;
      this.componentInstance = void 0;
      this.parent = void 0;
      this.raw = false;
      this.isStatic = false;
      this.isRootInsert = true;
      this.isComment = false;
      this.isCloned = false;
      this.isOnce = false;
      this.asyncFactory = asyncFactory;
      this.asyncMeta = void 0;
      this.isAsyncPlaceholder = false;
    }
    Object.defineProperty(VNode2.prototype, "child", {
      // DEPRECATED: alias for componentInstance for backwards compat.
      /* istanbul ignore next */
      get: function() {
        return this.componentInstance;
      },
      enumerable: false,
      configurable: true
    });
    return VNode2;
  }()
);
var createEmptyVNode = function(text) {
  if (text === void 0) {
    text = "";
  }
  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node;
};
function createTextVNode(val) {
  return new VNode(void 0, void 0, void 0, String(val));
}
function cloneVNode(vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned;
}
var uid$2 = 0;
var pendingCleanupDeps = [];
var cleanupDeps = function() {
  for (var i = 0; i < pendingCleanupDeps.length; i++) {
    var dep = pendingCleanupDeps[i];
    dep.subs = dep.subs.filter(function(s) {
      return s;
    });
    dep._pending = false;
  }
  pendingCleanupDeps.length = 0;
};
var Dep = (
  /** @class */
  function() {
    function Dep2() {
      this._pending = false;
      this.id = uid$2++;
      this.subs = [];
    }
    Dep2.prototype.addSub = function(sub) {
      this.subs.push(sub);
    };
    Dep2.prototype.removeSub = function(sub) {
      this.subs[this.subs.indexOf(sub)] = null;
      if (!this._pending) {
        this._pending = true;
        pendingCleanupDeps.push(this);
      }
    };
    Dep2.prototype.depend = function(info) {
      if (Dep2.target) {
        Dep2.target.addDep(this);
      }
    };
    Dep2.prototype.notify = function(info) {
      var subs = this.subs.filter(function(s) {
        return s;
      });
      for (var i = 0, l = subs.length; i < l; i++) {
        var sub = subs[i];
        sub.update();
      }
    };
    return Dep2;
  }()
);
Dep.target = null;
var targetStack = [];
function pushTarget(target2) {
  targetStack.push(target2);
  Dep.target = target2;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}
var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);
var methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];
methodsToPatch.forEach(function(method) {
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted)
      ob.observeArray(inserted);
    {
      ob.dep.notify();
    }
    return result;
  });
});
var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
var NO_INITIAL_VALUE = {};
var shouldObserve = true;
function toggleObserving(value) {
  shouldObserve = value;
}
var mockDep = {
  notify: noop$2,
  depend: noop$2,
  addSub: noop$2,
  removeSub: noop$2
};
var Observer = (
  /** @class */
  function() {
    function Observer2(value, shallow, mock) {
      if (shallow === void 0) {
        shallow = false;
      }
      if (mock === void 0) {
        mock = false;
      }
      this.value = value;
      this.shallow = shallow;
      this.mock = mock;
      this.dep = mock ? mockDep : new Dep();
      this.vmCount = 0;
      def(value, "__ob__", this);
      if (isArray$2(value)) {
        if (!mock) {
          if (hasProto) {
            value.__proto__ = arrayMethods;
          } else {
            for (var i = 0, l = arrayKeys.length; i < l; i++) {
              var key = arrayKeys[i];
              def(value, key, arrayMethods[key]);
            }
          }
        }
        if (!shallow) {
          this.observeArray(value);
        }
      } else {
        var keys = Object.keys(value);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          defineReactive(value, key, NO_INITIAL_VALUE, void 0, shallow, mock);
        }
      }
    }
    Observer2.prototype.observeArray = function(value) {
      for (var i = 0, l = value.length; i < l; i++) {
        observe(value[i], false, this.mock);
      }
    };
    return Observer2;
  }()
);
function observe(value, shallow, ssrMockReactivity) {
  if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
    return value.__ob__;
  }
  if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray$2(value) || isPlainObject$1(value)) && Object.isExtensible(value) && !value.__v_skip && !isRef(value) && !(value instanceof VNode)) {
    return new Observer(value, shallow, ssrMockReactivity);
  }
}
function defineReactive(obj, key, val, customSetter, shallow, mock) {
  var dep = new Dep();
  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && (val === NO_INITIAL_VALUE || arguments.length === 2)) {
    val = obj[key];
  }
  var childOb = !shallow && observe(val, false, mock);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        {
          dep.depend();
        }
        if (childOb) {
          childOb.dep.depend();
          if (isArray$2(value)) {
            dependArray(value);
          }
        }
      }
      return isRef(value) && !shallow ? value.value : value;
    },
    set: function reactiveSetter(newVal) {
      var value = getter ? getter.call(obj) : val;
      if (!hasChanged(value, newVal)) {
        return;
      }
      if (setter) {
        setter.call(obj, newVal);
      } else if (getter) {
        return;
      } else if (!shallow && isRef(value) && !isRef(newVal)) {
        value.value = newVal;
        return;
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal, false, mock);
      {
        dep.notify();
      }
    }
  });
  return dep;
}
function set(target2, key, val) {
  if (isReadonly(target2)) {
    return;
  }
  var ob = target2.__ob__;
  if (isArray$2(target2) && isValidArrayIndex(key)) {
    target2.length = Math.max(target2.length, key);
    target2.splice(key, 1, val);
    if (ob && !ob.shallow && ob.mock) {
      observe(val, false, true);
    }
    return val;
  }
  if (key in target2 && !(key in Object.prototype)) {
    target2[key] = val;
    return val;
  }
  if (target2._isVue || ob && ob.vmCount) {
    return val;
  }
  if (!ob) {
    target2[key] = val;
    return val;
  }
  defineReactive(ob.value, key, val, void 0, ob.shallow, ob.mock);
  {
    ob.dep.notify();
  }
  return val;
}
function del(target2, key) {
  if (isArray$2(target2) && isValidArrayIndex(key)) {
    target2.splice(key, 1);
    return;
  }
  var ob = target2.__ob__;
  if (target2._isVue || ob && ob.vmCount) {
    return;
  }
  if (isReadonly(target2)) {
    return;
  }
  if (!hasOwn(target2, key)) {
    return;
  }
  delete target2[key];
  if (!ob) {
    return;
  }
  {
    ob.dep.notify();
  }
}
function dependArray(value) {
  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
    e = value[i];
    if (e && e.__ob__) {
      e.__ob__.dep.depend();
    }
    if (isArray$2(e)) {
      dependArray(e);
    }
  }
}
function shallowReactive(target2) {
  makeReactive(target2, true);
  def(target2, "__v_isShallow", true);
  return target2;
}
function makeReactive(target2, shallow) {
  if (!isReadonly(target2)) {
    observe(
      target2,
      shallow,
      isServerRendering()
      /* ssr mock reactivity */
    );
  }
}
function isReadonly(value) {
  return !!(value && value.__v_isReadonly);
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function proxyWithRefUnwrap(target2, source, key) {
  Object.defineProperty(target2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      var val = source[key];
      if (isRef(val)) {
        return val.value;
      } else {
        var ob = val && val.__ob__;
        if (ob)
          ob.dep.depend();
        return val;
      }
    },
    set: function(value) {
      var oldValue = source[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
      } else {
        source[key] = value;
      }
    }
  });
}
var activeEffectScope;
var EffectScope = (
  /** @class */
  function() {
    function EffectScope2(detached) {
      if (detached === void 0) {
        detached = false;
      }
      this.detached = detached;
      this.active = true;
      this.effects = [];
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    EffectScope2.prototype.run = function(fn) {
      if (this.active) {
        var currentEffectScope = activeEffectScope;
        try {
          activeEffectScope = this;
          return fn();
        } finally {
          activeEffectScope = currentEffectScope;
        }
      }
    };
    EffectScope2.prototype.on = function() {
      activeEffectScope = this;
    };
    EffectScope2.prototype.off = function() {
      activeEffectScope = this.parent;
    };
    EffectScope2.prototype.stop = function(fromParent) {
      if (this.active) {
        var i = void 0, l = void 0;
        for (i = 0, l = this.effects.length; i < l; i++) {
          this.effects[i].teardown();
        }
        for (i = 0, l = this.cleanups.length; i < l; i++) {
          this.cleanups[i]();
        }
        if (this.scopes) {
          for (i = 0, l = this.scopes.length; i < l; i++) {
            this.scopes[i].stop(true);
          }
        }
        if (!this.detached && this.parent && !fromParent) {
          var last = this.parent.scopes.pop();
          if (last && last !== this) {
            this.parent.scopes[this.index] = last;
            last.index = this.index;
          }
        }
        this.parent = void 0;
        this.active = false;
      }
    };
    return EffectScope2;
  }()
);
function recordEffectScope(effect, scope) {
  if (scope === void 0) {
    scope = activeEffectScope;
  }
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function resolveProvided(vm) {
  var existing = vm._provided;
  var parentProvides = vm.$parent && vm.$parent._provided;
  if (parentProvides === existing) {
    return vm._provided = Object.create(parentProvides);
  } else {
    return existing;
  }
}
var normalizeEvent = cached(function(name2) {
  var passive = name2.charAt(0) === "&";
  name2 = passive ? name2.slice(1) : name2;
  var once2 = name2.charAt(0) === "~";
  name2 = once2 ? name2.slice(1) : name2;
  var capture = name2.charAt(0) === "!";
  name2 = capture ? name2.slice(1) : name2;
  return {
    name: name2,
    once: once2,
    capture,
    passive
  };
});
function createFnInvoker(fns, vm) {
  function invoker() {
    var fns2 = invoker.fns;
    if (isArray$2(fns2)) {
      var cloned = fns2.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
      }
    } else {
      return invokeWithErrorHandling(fns2, null, arguments, vm, "v-on handler");
    }
  }
  invoker.fns = fns;
  return invoker;
}
function updateListeners(on, oldOn, add2, remove2, createOnceHandler2, vm) {
  var name2, cur, old, event;
  for (name2 in on) {
    cur = on[name2];
    old = oldOn[name2];
    event = normalizeEvent(name2);
    if (isUndef(cur))
      ;
    else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name2] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name2] = createOnceHandler2(event.name, cur, event.capture);
      }
      add2(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name2] = old;
    }
  }
  for (name2 in oldOn) {
    if (isUndef(on[name2])) {
      event = normalizeEvent(name2);
      remove2(event.name, oldOn[name2], event.capture);
    }
  }
}
function mergeVNodeHook(def2, hookKey, hook) {
  if (def2 instanceof VNode) {
    def2 = def2.data.hook || (def2.data.hook = {});
  }
  var invoker;
  var oldHook = def2[hookKey];
  function wrappedHook() {
    hook.apply(this, arguments);
    remove$2(invoker.fns, wrappedHook);
  }
  if (isUndef(oldHook)) {
    invoker = createFnInvoker([wrappedHook]);
  } else {
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }
  invoker.merged = true;
  def2[hookKey] = invoker;
}
function extractPropsFromVNodeData(data3, Ctor, tag) {
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return;
  }
  var res = {};
  var attrs2 = data3.attrs, props2 = data3.props;
  if (isDef(attrs2) || isDef(props2)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props2, key, altKey, true) || checkProp(res, attrs2, key, altKey, false);
    }
  }
  return res;
}
function checkProp(res, hash, key, altKey, preserve) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true;
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true;
    }
  }
  return false;
}
function simpleNormalizeChildren(children2) {
  for (var i = 0; i < children2.length; i++) {
    if (isArray$2(children2[i])) {
      return Array.prototype.concat.apply([], children2);
    }
  }
  return children2;
}
function normalizeChildren(children2) {
  return isPrimitive(children2) ? [createTextVNode(children2)] : isArray$2(children2) ? normalizeArrayChildren(children2) : void 0;
}
function isTextNode(node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment);
}
function normalizeArrayChildren(children2, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children2.length; i++) {
    c = children2[i];
    if (isUndef(c) || typeof c === "boolean")
      continue;
    lastIndex = res.length - 1;
    last = res[lastIndex];
    if (isArray$2(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + c[0].text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== "") {
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        if (isTrue(children2._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
          c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
        }
        res.push(c);
      }
    }
  }
  return res;
}
function renderList(val, render26) {
  var ret = null, i, l, keys, key;
  if (isArray$2(val) || typeof val === "string") {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render26(val[i], i);
    }
  } else if (typeof val === "number") {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render26(i + 1, i);
    }
  } else if (isObject$3(val)) {
    if (hasSymbol$1 && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render26(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render26(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  ret._isVList = true;
  return ret;
}
function renderSlot(name2, fallbackRender, props2, bindObject) {
  var scopedSlotFn = this.$scopedSlots[name2];
  var nodes;
  if (scopedSlotFn) {
    props2 = props2 || {};
    if (bindObject) {
      props2 = extend$2(extend$2({}, bindObject), props2);
    }
    nodes = scopedSlotFn(props2) || (isFunction$2(fallbackRender) ? fallbackRender() : fallbackRender);
  } else {
    nodes = this.$slots[name2] || (isFunction$2(fallbackRender) ? fallbackRender() : fallbackRender);
  }
  var target2 = props2 && props2.slot;
  if (target2) {
    return this.$createElement("template", { slot: target2 }, nodes);
  } else {
    return nodes;
  }
}
function resolveFilter(id) {
  return resolveAsset(this.$options, "filters", id) || identity;
}
function isKeyNotMatch(expect, actual) {
  if (isArray$2(expect)) {
    return expect.indexOf(actual) === -1;
  } else {
    return expect !== actual;
  }
}
function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName);
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode);
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key;
  }
  return eventKeyCode === void 0;
}
function bindObjectProps(data3, tag, value, asProp, isSync) {
  if (value) {
    if (!isObject$3(value))
      ;
    else {
      if (isArray$2(value)) {
        value = toObject(value);
      }
      var hash = void 0;
      var _loop_1 = function(key2) {
        if (key2 === "class" || key2 === "style" || isReservedAttribute(key2)) {
          hash = data3;
        } else {
          var type = data3.attrs && data3.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key2) ? data3.domProps || (data3.domProps = {}) : data3.attrs || (data3.attrs = {});
        }
        var camelizedKey = camelize(key2);
        var hyphenatedKey = hyphenate(key2);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key2] = value[key2];
          if (isSync) {
            var on = data3.on || (data3.on = {});
            on["update:".concat(key2)] = function($event) {
              value[key2] = $event;
            };
          }
        }
      };
      for (var key in value) {
        _loop_1(key);
      }
    }
  }
  return data3;
}
function renderStatic(index2, isInFor) {
  var cached2 = this._staticTrees || (this._staticTrees = []);
  var tree = cached2[index2];
  if (tree && !isInFor) {
    return tree;
  }
  tree = cached2[index2] = this.$options.staticRenderFns[index2].call(
    this._renderProxy,
    this._c,
    this
    // for render fns generated for functional component templates
  );
  markStatic(tree, "__static__".concat(index2), false);
  return tree;
}
function markOnce(tree, index2, key) {
  markStatic(tree, "__once__".concat(index2).concat(key ? "_".concat(key) : ""), true);
  return tree;
}
function markStatic(tree, key, isOnce) {
  if (isArray$2(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== "string") {
        markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}
function markStaticNode(node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}
function bindObjectListeners(data3, value) {
  if (value) {
    if (!isPlainObject$1(value))
      ;
    else {
      var on = data3.on = data3.on ? extend$2({}, data3.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data3;
}
function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (isArray$2(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    res.$key = contentHashKey;
  }
  return res;
}
function bindDynamicKeys(baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === "string" && key) {
      baseObj[values[i]] = values[i + 1];
    }
  }
  return baseObj;
}
function prependModifier(value, symbol) {
  return typeof value === "string" ? symbol + value : value;
}
function installRenderHelpers(target2) {
  target2._o = markOnce;
  target2._n = toNumber;
  target2._s = toString$1;
  target2._l = renderList;
  target2._t = renderSlot;
  target2._q = looseEqual;
  target2._i = looseIndexOf;
  target2._m = renderStatic;
  target2._f = resolveFilter;
  target2._k = checkKeyCodes;
  target2._b = bindObjectProps;
  target2._v = createTextVNode;
  target2._e = createEmptyVNode;
  target2._u = resolveScopedSlots;
  target2._g = bindObjectListeners;
  target2._d = bindDynamicKeys;
  target2._p = prependModifier;
}
function resolveSlots(children2, context) {
  if (!children2 || !children2.length) {
    return {};
  }
  var slots = {};
  for (var i = 0, l = children2.length; i < l; i++) {
    var child = children2[i];
    var data3 = child.data;
    if (data3 && data3.attrs && data3.attrs.slot) {
      delete data3.attrs.slot;
    }
    if ((child.context === context || child.fnContext === context) && data3 && data3.slot != null) {
      var name_1 = data3.slot;
      var slot = slots[name_1] || (slots[name_1] = []);
      if (child.tag === "template") {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  for (var name_2 in slots) {
    if (slots[name_2].every(isWhitespace)) {
      delete slots[name_2];
    }
  }
  return slots;
}
function isWhitespace(node) {
  return node.isComment && !node.asyncFactory || node.text === " ";
}
function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}
function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
  var key = scopedSlots && scopedSlots.$key;
  if (!scopedSlots) {
    res = {};
  } else if (scopedSlots._normalized) {
    return scopedSlots._normalized;
  } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
    return prevScopedSlots;
  } else {
    res = {};
    for (var key_1 in scopedSlots) {
      if (scopedSlots[key_1] && key_1[0] !== "$") {
        res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
      }
    }
  }
  for (var key_2 in normalSlots) {
    if (!(key_2 in res)) {
      res[key_2] = proxyNormalSlot(normalSlots, key_2);
    }
  }
  if (scopedSlots && Object.isExtensible(scopedSlots)) {
    scopedSlots._normalized = res;
  }
  def(res, "$stable", isStable);
  def(res, "$key", key);
  def(res, "$hasNormal", hasNormalSlots);
  return res;
}
function normalizeScopedSlot(vm, normalSlots, key, fn) {
  var normalized = function() {
    var cur = currentInstance;
    setCurrentInstance(vm);
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === "object" && !isArray$2(res) ? [res] : normalizeChildren(res);
    var vnode = res && res[0];
    setCurrentInstance(cur);
    return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? void 0 : res;
  };
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized;
}
function proxyNormalSlot(slots, key) {
  return function() {
    return slots[key];
  };
}
function initSetup(vm) {
  var options = vm.$options;
  var setup = options.setup;
  if (setup) {
    var ctx = vm._setupContext = createSetupContext(vm);
    setCurrentInstance(vm);
    pushTarget();
    var setupResult = invokeWithErrorHandling(setup, null, [vm._props || shallowReactive({}), ctx], vm, "setup");
    popTarget();
    setCurrentInstance();
    if (isFunction$2(setupResult)) {
      options.render = setupResult;
    } else if (isObject$3(setupResult)) {
      vm._setupState = setupResult;
      if (!setupResult.__sfc) {
        for (var key in setupResult) {
          if (!isReserved(key)) {
            proxyWithRefUnwrap(vm, setupResult, key);
          }
        }
      } else {
        var proxy2 = vm._setupProxy = {};
        for (var key in setupResult) {
          if (key !== "__sfc") {
            proxyWithRefUnwrap(proxy2, setupResult, key);
          }
        }
      }
    } else
      ;
  }
}
function createSetupContext(vm) {
  return {
    get attrs() {
      if (!vm._attrsProxy) {
        var proxy2 = vm._attrsProxy = {};
        def(proxy2, "_v_attr_proxy", true);
        syncSetupProxy(proxy2, vm.$attrs, emptyObject, vm, "$attrs");
      }
      return vm._attrsProxy;
    },
    get listeners() {
      if (!vm._listenersProxy) {
        var proxy2 = vm._listenersProxy = {};
        syncSetupProxy(proxy2, vm.$listeners, emptyObject, vm, "$listeners");
      }
      return vm._listenersProxy;
    },
    get slots() {
      return initSlotsProxy(vm);
    },
    emit: bind$1(vm.$emit, vm),
    expose: function(exposed) {
      if (exposed) {
        Object.keys(exposed).forEach(function(key) {
          return proxyWithRefUnwrap(vm, exposed, key);
        });
      }
    }
  };
}
function syncSetupProxy(to2, from, prev, instance, type) {
  var changed = false;
  for (var key in from) {
    if (!(key in to2)) {
      changed = true;
      defineProxyAttr(to2, key, instance, type);
    } else if (from[key] !== prev[key]) {
      changed = true;
    }
  }
  for (var key in to2) {
    if (!(key in from)) {
      changed = true;
      delete to2[key];
    }
  }
  return changed;
}
function defineProxyAttr(proxy2, key, instance, type) {
  Object.defineProperty(proxy2, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      return instance[type][key];
    }
  });
}
function initSlotsProxy(vm) {
  if (!vm._slotsProxy) {
    syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
  }
  return vm._slotsProxy;
}
function syncSetupSlots(to2, from) {
  for (var key in from) {
    to2[key] = from[key];
  }
  for (var key in to2) {
    if (!(key in from)) {
      delete to2[key];
    }
  }
}
function initRender(vm) {
  vm._vnode = null;
  vm._staticTrees = null;
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
  vm._c = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, false);
  };
  vm.$createElement = function(a, b, c, d) {
    return createElement$1(vm, a, b, c, d, true);
  };
  var parentData = parentVnode && parentVnode.data;
  {
    defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
  }
}
var currentRenderingInstance = null;
function renderMixin(Vue2) {
  installRenderHelpers(Vue2.prototype);
  Vue2.prototype.$nextTick = function(fn) {
    return nextTick(fn, this);
  };
  Vue2.prototype._render = function() {
    var vm = this;
    var _a = vm.$options, render26 = _a.render, _parentVnode = _a._parentVnode;
    if (_parentVnode && vm._isMounted) {
      vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
      if (vm._slotsProxy) {
        syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
      }
    }
    vm.$vnode = _parentVnode;
    var vnode;
    try {
      setCurrentInstance(vm);
      currentRenderingInstance = vm;
      vnode = render26.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
      setCurrentInstance();
    }
    if (isArray$2(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    if (!(vnode instanceof VNode)) {
      vnode = createEmptyVNode();
    }
    vnode.parent = _parentVnode;
    return vnode;
  };
}
function ensureCtor(comp, base) {
  if (comp.__esModule || hasSymbol$1 && comp[Symbol.toStringTag] === "Module") {
    comp = comp.default;
  }
  return isObject$3(comp) ? base.extend(comp) : comp;
}
function createAsyncPlaceholder(factory, data3, context, children2, tag) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data3, context, children: children2, tag };
  return node;
}
function resolveAsyncComponent(factory, baseCtor) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }
  if (isDef(factory.resolved)) {
    return factory.resolved;
  }
  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    factory.owners.push(owner);
  }
  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }
  if (owner && !isDef(factory.owners)) {
    var owners_1 = factory.owners = [owner];
    var sync_1 = true;
    var timerLoading_1 = null;
    var timerTimeout_1 = null;
    owner.$on("hook:destroyed", function() {
      return remove$2(owners_1, owner);
    });
    var forceRender_1 = function(renderCompleted) {
      for (var i = 0, l = owners_1.length; i < l; i++) {
        owners_1[i].$forceUpdate();
      }
      if (renderCompleted) {
        owners_1.length = 0;
        if (timerLoading_1 !== null) {
          clearTimeout(timerLoading_1);
          timerLoading_1 = null;
        }
        if (timerTimeout_1 !== null) {
          clearTimeout(timerTimeout_1);
          timerTimeout_1 = null;
        }
      }
    };
    var resolve2 = once$1(function(res) {
      factory.resolved = ensureCtor(res, baseCtor);
      if (!sync_1) {
        forceRender_1(true);
      } else {
        owners_1.length = 0;
      }
    });
    var reject_1 = once$1(function(reason) {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender_1(true);
      }
    });
    var res_1 = factory(resolve2, reject_1);
    if (isObject$3(res_1)) {
      if (isPromise$1(res_1)) {
        if (isUndef(factory.resolved)) {
          res_1.then(resolve2, reject_1);
        }
      } else if (isPromise$1(res_1.component)) {
        res_1.component.then(resolve2, reject_1);
        if (isDef(res_1.error)) {
          factory.errorComp = ensureCtor(res_1.error, baseCtor);
        }
        if (isDef(res_1.loading)) {
          factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
          if (res_1.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading_1 = setTimeout(function() {
              timerLoading_1 = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender_1(false);
              }
            }, res_1.delay || 200);
          }
        }
        if (isDef(res_1.timeout)) {
          timerTimeout_1 = setTimeout(function() {
            timerTimeout_1 = null;
            if (isUndef(factory.resolved)) {
              reject_1(null);
            }
          }, res_1.timeout);
        }
      }
    }
    sync_1 = false;
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}
function getFirstComponentChild(children2) {
  if (isArray$2(children2)) {
    for (var i = 0; i < children2.length; i++) {
      var c = children2[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
}
var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;
function createElement$1(context, tag, data3, children2, normalizationType, alwaysNormalize) {
  if (isArray$2(data3) || isPrimitive(data3)) {
    normalizationType = children2;
    children2 = data3;
    data3 = void 0;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data3, children2, normalizationType);
}
function _createElement(context, tag, data3, children2, normalizationType) {
  if (isDef(data3) && isDef(data3.__ob__)) {
    return createEmptyVNode();
  }
  if (isDef(data3) && isDef(data3.is)) {
    tag = data3.is;
  }
  if (!tag) {
    return createEmptyVNode();
  }
  if (isArray$2(children2) && isFunction$2(children2[0])) {
    data3 = data3 || {};
    data3.scopedSlots = { default: children2[0] };
    children2.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children2 = normalizeChildren(children2);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children2 = simpleNormalizeChildren(children2);
  }
  var vnode, ns;
  if (typeof tag === "string") {
    var Ctor = void 0;
    ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      vnode = new VNode(config.parsePlatformTagName(tag), data3, children2, void 0, void 0, context);
    } else if ((!data3 || !data3.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
      vnode = createComponent(Ctor, data3, context, children2, tag);
    } else {
      vnode = new VNode(tag, data3, children2, void 0, void 0, context);
    }
  } else {
    vnode = createComponent(tag, data3, context, children2);
  }
  if (isArray$2(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns))
      applyNS(vnode, ns);
    if (isDef(data3))
      registerDeepBindings(data3);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
function applyNS(vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === "foreignObject") {
    ns = void 0;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
        applyNS(child, ns, force);
      }
    }
  }
}
function registerDeepBindings(data3) {
  if (isObject$3(data3.style)) {
    traverse(data3.style);
  }
  if (isObject$3(data3.class)) {
    traverse(data3.class);
  }
}
function handleError(err, vm, info) {
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while (cur = cur.$parent) {
        var hooks2 = cur.$options.errorCaptured;
        if (hooks2) {
          for (var i = 0; i < hooks2.length; i++) {
            try {
              var capture = hooks2[i].call(cur, err, vm, info) === false;
              if (capture)
                return;
            } catch (e) {
              globalHandleError(e, cur, "errorCaptured hook");
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}
function invokeWithErrorHandling(handler, context, args, vm, info) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise$1(res) && !res._handled) {
      res.catch(function(e) {
        return handleError(e, vm, info + " (Promise/async)");
      });
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res;
}
function globalHandleError(err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info);
    } catch (e) {
      if (e !== err) {
        logError(e);
      }
    }
  }
  logError(err);
}
function logError(err, vm, info) {
  if (inBrowser$2 && typeof console !== "undefined") {
    console.error(err);
  } else {
    throw err;
  }
}
var isUsingMicroTask = false;
var callbacks$1 = [];
var pending = false;
function flushCallbacks() {
  pending = false;
  var copies = callbacks$1.slice(0);
  callbacks$1.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
var timerFunc;
if (typeof Promise !== "undefined" && isNative(Promise)) {
  var p_1 = Promise.resolve();
  timerFunc = function() {
    p_1.then(flushCallbacks);
    if (isIOS)
      setTimeout(noop$2);
  };
  isUsingMicroTask = true;
} else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || // PhantomJS and iOS 7.x
MutationObserver.toString() === "[object MutationObserverConstructor]")) {
  var counter_1 = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode_1 = document.createTextNode(String(counter_1));
  observer.observe(textNode_1, {
    characterData: true
  });
  timerFunc = function() {
    counter_1 = (counter_1 + 1) % 2;
    textNode_1.data = String(counter_1);
  };
  isUsingMicroTask = true;
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = function() {
    setImmediate(flushCallbacks);
  };
} else {
  timerFunc = function() {
    setTimeout(flushCallbacks, 0);
  };
}
function nextTick(cb, ctx) {
  var _resolve;
  callbacks$1.push(function() {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  if (!cb && typeof Promise !== "undefined") {
    return new Promise(function(resolve2) {
      _resolve = resolve2;
    });
  }
}
var version$1 = "2.7.15";
var seenObjects = new _Set();
function traverse(val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
  return val;
}
function _traverse(val, seen2) {
  var i, keys;
  var isA = isArray$2(val);
  if (!isA && !isObject$3(val) || val.__v_skip || Object.isFrozen(val) || val instanceof VNode) {
    return;
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen2.has(depId)) {
      return;
    }
    seen2.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--)
      _traverse(val[i], seen2);
  } else if (isRef(val)) {
    _traverse(val.value, seen2);
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--)
      _traverse(val[keys[i]], seen2);
  }
}
var uid$1 = 0;
var Watcher = (
  /** @class */
  function() {
    function Watcher2(vm, expOrFn, cb, options, isRenderWatcher) {
      recordEffectScope(
        this,
        // if the active effect scope is manually created (not a component scope),
        // prioritize it
        activeEffectScope && !activeEffectScope._vm ? activeEffectScope : vm ? vm._scope : void 0
      );
      if ((this.vm = vm) && isRenderWatcher) {
        vm._watcher = this;
      }
      if (options) {
        this.deep = !!options.deep;
        this.user = !!options.user;
        this.lazy = !!options.lazy;
        this.sync = !!options.sync;
        this.before = options.before;
      } else {
        this.deep = this.user = this.lazy = this.sync = false;
      }
      this.cb = cb;
      this.id = ++uid$1;
      this.active = true;
      this.post = false;
      this.dirty = this.lazy;
      this.deps = [];
      this.newDeps = [];
      this.depIds = new _Set();
      this.newDepIds = new _Set();
      this.expression = "";
      if (isFunction$2(expOrFn)) {
        this.getter = expOrFn;
      } else {
        this.getter = parsePath$1(expOrFn);
        if (!this.getter) {
          this.getter = noop$2;
        }
      }
      this.value = this.lazy ? void 0 : this.get();
    }
    Watcher2.prototype.get = function() {
      pushTarget(this);
      var value;
      var vm = this.vm;
      try {
        value = this.getter.call(vm, vm);
      } catch (e) {
        if (this.user) {
          handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
        } else {
          throw e;
        }
      } finally {
        if (this.deep) {
          traverse(value);
        }
        popTarget();
        this.cleanupDeps();
      }
      return value;
    };
    Watcher2.prototype.addDep = function(dep) {
      var id = dep.id;
      if (!this.newDepIds.has(id)) {
        this.newDepIds.add(id);
        this.newDeps.push(dep);
        if (!this.depIds.has(id)) {
          dep.addSub(this);
        }
      }
    };
    Watcher2.prototype.cleanupDeps = function() {
      var i = this.deps.length;
      while (i--) {
        var dep = this.deps[i];
        if (!this.newDepIds.has(dep.id)) {
          dep.removeSub(this);
        }
      }
      var tmp = this.depIds;
      this.depIds = this.newDepIds;
      this.newDepIds = tmp;
      this.newDepIds.clear();
      tmp = this.deps;
      this.deps = this.newDeps;
      this.newDeps = tmp;
      this.newDeps.length = 0;
    };
    Watcher2.prototype.update = function() {
      if (this.lazy) {
        this.dirty = true;
      } else if (this.sync) {
        this.run();
      } else {
        queueWatcher(this);
      }
    };
    Watcher2.prototype.run = function() {
      if (this.active) {
        var value = this.get();
        if (value !== this.value || // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject$3(value) || this.deep) {
          var oldValue = this.value;
          this.value = value;
          if (this.user) {
            var info = 'callback for watcher "'.concat(this.expression, '"');
            invokeWithErrorHandling(this.cb, this.vm, [value, oldValue], this.vm, info);
          } else {
            this.cb.call(this.vm, value, oldValue);
          }
        }
      }
    };
    Watcher2.prototype.evaluate = function() {
      this.value = this.get();
      this.dirty = false;
    };
    Watcher2.prototype.depend = function() {
      var i = this.deps.length;
      while (i--) {
        this.deps[i].depend();
      }
    };
    Watcher2.prototype.teardown = function() {
      if (this.vm && !this.vm._isBeingDestroyed) {
        remove$2(this.vm._scope.effects, this);
      }
      if (this.active) {
        var i = this.deps.length;
        while (i--) {
          this.deps[i].removeSub(this);
        }
        this.active = false;
        if (this.onStop) {
          this.onStop();
        }
      }
    };
    return Watcher2;
  }()
);
function initEvents(vm) {
  vm._events = /* @__PURE__ */ Object.create(null);
  vm._hasHookEvent = false;
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}
var target$1;
function add$1(event, fn) {
  target$1.$on(event, fn);
}
function remove$1(event, fn) {
  target$1.$off(event, fn);
}
function createOnceHandler$1(event, fn) {
  var _target = target$1;
  return function onceHandler() {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  };
}
function updateComponentListeners(vm, listeners, oldListeners) {
  target$1 = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
  target$1 = void 0;
}
function eventsMixin(Vue2) {
  var hookRE = /^hook:/;
  Vue2.prototype.$on = function(event, fn) {
    var vm = this;
    if (isArray$2(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm;
  };
  Vue2.prototype.$once = function(event, fn) {
    var vm = this;
    function on() {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm;
  };
  Vue2.prototype.$off = function(event, fn) {
    var vm = this;
    if (!arguments.length) {
      vm._events = /* @__PURE__ */ Object.create(null);
      return vm;
    }
    if (isArray$2(event)) {
      for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
        vm.$off(event[i_1], fn);
      }
      return vm;
    }
    var cbs = vm._events[event];
    if (!cbs) {
      return vm;
    }
    if (!fn) {
      vm._events[event] = null;
      return vm;
    }
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break;
      }
    }
    return vm;
  };
  Vue2.prototype.$emit = function(event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray$2(cbs) : cbs;
      var args = toArray$2(arguments, 1);
      var info = 'event handler for "'.concat(event, '"');
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm;
  };
}
var activeInstance = null;
function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function() {
    activeInstance = prevActiveInstance;
  };
}
function initLifecycle(vm) {
  var options = vm.$options;
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }
  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;
  vm.$children = [];
  vm.$refs = {};
  vm._provided = parent ? parent._provided : /* @__PURE__ */ Object.create(null);
  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}
function lifecycleMixin(Vue2) {
  Vue2.prototype._update = function(vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    if (!prevVnode) {
      vm.$el = vm.__patch__(
        vm.$el,
        vnode,
        hydrating,
        false
        /* removeOnly */
      );
    } else {
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    var wrapper = vm;
    while (wrapper && wrapper.$vnode && wrapper.$parent && wrapper.$vnode === wrapper.$parent._vnode) {
      wrapper.$parent.$el = wrapper.$el;
      wrapper = wrapper.$parent;
    }
  };
  Vue2.prototype.$forceUpdate = function() {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };
  Vue2.prototype.$destroy = function() {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return;
    }
    callHook$1(vm, "beforeDestroy");
    vm._isBeingDestroyed = true;
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$2(parent.$children, vm);
    }
    vm._scope.stop();
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    vm._isDestroyed = true;
    vm.__patch__(vm._vnode, null);
    callHook$1(vm, "destroyed");
    vm.$off();
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}
function mountComponent(vm, el, hydrating) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  callHook$1(vm, "beforeMount");
  var updateComponent;
  {
    updateComponent = function() {
      vm._update(vm._render(), hydrating);
    };
  }
  var watcherOptions = {
    before: function() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook$1(vm, "beforeUpdate");
      }
    }
  };
  new Watcher(
    vm,
    updateComponent,
    noop$2,
    watcherOptions,
    true
    /* isRenderWatcher */
  );
  hydrating = false;
  var preWatchers = vm._preWatchers;
  if (preWatchers) {
    for (var i = 0; i < preWatchers.length; i++) {
      preWatchers[i].run();
    }
  }
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook$1(vm, "mounted");
  }
  return vm;
}
function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
  var needsForceUpdate = !!(renderChildren || // has new static slots
  vm.$options._renderChildren || // has old static slots
  hasDynamicScopedSlot);
  var prevVNode = vm.$vnode;
  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode;
  if (vm._vnode) {
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;
  var attrs2 = parentVnode.data.attrs || emptyObject;
  if (vm._attrsProxy) {
    if (syncSetupProxy(vm._attrsProxy, attrs2, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
      needsForceUpdate = true;
    }
  }
  vm.$attrs = attrs2;
  listeners = listeners || emptyObject;
  var prevListeners = vm.$options._parentListeners;
  if (vm._listenersProxy) {
    syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
  }
  vm.$listeners = vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, prevListeners);
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props2 = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props;
      props2[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    vm.$options.propsData = propsData;
  }
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }
}
function isInInactiveTree(vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive)
      return true;
  }
  return false;
}
function activateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return;
    }
  } else if (vm._directInactive) {
    return;
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "activated");
  }
}
function deactivateChildComponent(vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return;
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook$1(vm, "deactivated");
  }
}
function callHook$1(vm, hook, args, setContext) {
  if (setContext === void 0) {
    setContext = true;
  }
  pushTarget();
  var prevInst = currentInstance;
  var prevScope = getCurrentScope();
  setContext && setCurrentInstance(vm);
  var handlers = vm.$options[hook];
  var info = "".concat(hook, " hook");
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit("hook:" + hook);
  }
  if (setContext) {
    setCurrentInstance(prevInst);
    prevScope && prevScope.on();
  }
  popTarget();
}
var queue = [];
var activatedChildren = [];
var has = {};
var waiting = false;
var flushing = false;
var index$3 = 0;
function resetSchedulerState() {
  index$3 = queue.length = activatedChildren.length = 0;
  has = {};
  waiting = flushing = false;
}
var currentFlushTimestamp = 0;
var getNow = Date.now;
if (inBrowser$2 && !isIE) {
  var performance_1 = window.performance;
  if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
    getNow = function() {
      return performance_1.now();
    };
  }
}
var sortCompareFn = function(a, b) {
  if (a.post) {
    if (!b.post)
      return 1;
  } else if (b.post) {
    return -1;
  }
  return a.id - b.id;
};
function flushSchedulerQueue() {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;
  queue.sort(sortCompareFn);
  for (index$3 = 0; index$3 < queue.length; index$3++) {
    watcher = queue[index$3];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();
  resetSchedulerState();
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);
  cleanupDeps();
  if (devtools && config.devtools) {
    devtools.emit("flush");
  }
}
function callUpdatedHooks(queue2) {
  var i = queue2.length;
  while (i--) {
    var watcher = queue2[i];
    var vm = watcher.vm;
    if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook$1(vm, "updated");
    }
  }
}
function queueActivatedComponent(vm) {
  vm._inactive = false;
  activatedChildren.push(vm);
}
function callActivatedHooks(queue2) {
  for (var i = 0; i < queue2.length; i++) {
    queue2[i]._inactive = true;
    activateChildComponent(
      queue2[i],
      true
      /* true */
    );
  }
}
function queueWatcher(watcher) {
  var id = watcher.id;
  if (has[id] != null) {
    return;
  }
  if (watcher === Dep.target && watcher.noRecurse) {
    return;
  }
  has[id] = true;
  if (!flushing) {
    queue.push(watcher);
  } else {
    var i = queue.length - 1;
    while (i > index$3 && queue[i].id > watcher.id) {
      i--;
    }
    queue.splice(i + 1, 0, watcher);
  }
  if (!waiting) {
    waiting = true;
    nextTick(flushSchedulerQueue);
  }
}
function initProvide(vm) {
  var provideOption = vm.$options.provide;
  if (provideOption) {
    var provided = isFunction$2(provideOption) ? provideOption.call(vm) : provideOption;
    if (!isObject$3(provided)) {
      return;
    }
    var source = resolveProvided(vm);
    var keys = hasSymbol$1 ? Reflect.ownKeys(provided) : Object.keys(provided);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
    }
  }
}
function initInjections(vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function(key) {
      {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}
function resolveInject(inject2, vm) {
  if (inject2) {
    var result = /* @__PURE__ */ Object.create(null);
    var keys = hasSymbol$1 ? Reflect.ownKeys(inject2) : Object.keys(inject2);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (key === "__ob__")
        continue;
      var provideKey = inject2[key].from;
      if (provideKey in vm._provided) {
        result[key] = vm._provided[provideKey];
      } else if ("default" in inject2[key]) {
        var provideDefault = inject2[key].default;
        result[key] = isFunction$2(provideDefault) ? provideDefault.call(vm) : provideDefault;
      } else
        ;
    }
    return result;
  }
}
function FunctionalRenderContext(data3, props2, children2, parent, Ctor) {
  var _this = this;
  var options = Ctor.options;
  var contextVm;
  if (hasOwn(parent, "_uid")) {
    contextVm = Object.create(parent);
    contextVm._original = parent;
  } else {
    contextVm = parent;
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;
  this.data = data3;
  this.props = props2;
  this.children = children2;
  this.parent = parent;
  this.listeners = data3.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function() {
    if (!_this.$slots) {
      normalizeScopedSlots(parent, data3.scopedSlots, _this.$slots = resolveSlots(children2, parent));
    }
    return _this.$slots;
  };
  Object.defineProperty(this, "scopedSlots", {
    enumerable: true,
    get: function() {
      return normalizeScopedSlots(parent, data3.scopedSlots, this.slots());
    }
  });
  if (isCompiled) {
    this.$options = options;
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(parent, data3.scopedSlots, this.$slots);
  }
  if (options._scopeId) {
    this._c = function(a, b, c, d) {
      var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
      if (vnode && !isArray$2(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode;
    };
  } else {
    this._c = function(a, b, c, d) {
      return createElement$1(contextVm, a, b, c, d, needNormalization);
    };
  }
}
installRenderHelpers(FunctionalRenderContext.prototype);
function createFunctionalComponent(Ctor, propsData, data3, contextVm, children2) {
  var options = Ctor.options;
  var props2 = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props2[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data3.attrs))
      mergeProps(props2, data3.attrs);
    if (isDef(data3.props))
      mergeProps(props2, data3.props);
  }
  var renderContext = new FunctionalRenderContext(data3, props2, children2, contextVm, Ctor);
  var vnode = options.render.call(null, renderContext._c, renderContext);
  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data3, renderContext.parent, options);
  } else if (isArray$2(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data3, renderContext.parent, options);
    }
    return res;
  }
}
function cloneAndMarkFunctionalResult(vnode, data3, contextVm, options, renderContext) {
  var clone2 = cloneVNode(vnode);
  clone2.fnContext = contextVm;
  clone2.fnOptions = options;
  if (data3.slot) {
    (clone2.data || (clone2.data = {})).slot = data3.slot;
  }
  return clone2;
}
function mergeProps(to2, from) {
  for (var key in from) {
    to2[camelize(key)] = from[key];
  }
}
function getComponentName(options) {
  return options.name || options.__name || options._componentTag;
}
var componentVNodeHooks = {
  init: function(vnode, hydrating) {
    if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
      var mountedNode = vnode;
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
      child.$mount(hydrating ? vnode.elm : void 0, hydrating);
    }
  },
  prepatch: function(oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData,
      // updated props
      options.listeners,
      // updated listeners
      vnode,
      // new parent vnode
      options.children
      // new children
    );
  },
  insert: function(vnode) {
    var context = vnode.context, componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook$1(componentInstance, "mounted");
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(
          componentInstance,
          true
          /* direct */
        );
      }
    }
  },
  destroy: function(vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(
          componentInstance,
          true
          /* direct */
        );
      }
    }
  }
};
var hooksToMerge = Object.keys(componentVNodeHooks);
function createComponent(Ctor, data3, context, children2, tag) {
  if (isUndef(Ctor)) {
    return;
  }
  var baseCtor = context.$options._base;
  if (isObject$3(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }
  if (typeof Ctor !== "function") {
    return;
  }
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === void 0) {
      return createAsyncPlaceholder(asyncFactory, data3, context, children2, tag);
    }
  }
  data3 = data3 || {};
  resolveConstructorOptions(Ctor);
  if (isDef(data3.model)) {
    transformModel(Ctor.options, data3);
  }
  var propsData = extractPropsFromVNodeData(data3, Ctor);
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data3, context, children2);
  }
  var listeners = data3.on;
  data3.on = data3.nativeOn;
  if (isTrue(Ctor.options.abstract)) {
    var slot = data3.slot;
    data3 = {};
    if (slot) {
      data3.slot = slot;
    }
  }
  installComponentHooks(data3);
  var name2 = getComponentName(Ctor.options) || tag;
  var vnode = new VNode(
    // @ts-expect-error
    "vue-component-".concat(Ctor.cid).concat(name2 ? "-".concat(name2) : ""),
    data3,
    void 0,
    void 0,
    void 0,
    context,
    // @ts-expect-error
    { Ctor, propsData, listeners, tag, children: children2 },
    asyncFactory
  );
  return vnode;
}
function createComponentInstanceForVnode(vnode, parent) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent
  };
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options);
}
function installComponentHooks(data3) {
  var hooks2 = data3.hook || (data3.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks2[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks2[key] = existing ? mergeHook(toMerge, existing) : toMerge;
    }
  }
}
function mergeHook(f1, f2) {
  var merged = function(a, b) {
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged;
}
function transformModel(options, data3) {
  var prop = options.model && options.model.prop || "value";
  var event = options.model && options.model.event || "input";
  (data3.attrs || (data3.attrs = {}))[prop] = data3.model.value;
  var on = data3.on || (data3.on = {});
  var existing = on[event];
  var callback = data3.model.callback;
  if (isDef(existing)) {
    if (isArray$2(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}
var warn$1 = noop$2;
var strats = config.optionMergeStrategies;
function mergeData(to2, from, recursive) {
  if (recursive === void 0) {
    recursive = true;
  }
  if (!from)
    return to2;
  var key, toVal, fromVal;
  var keys = hasSymbol$1 ? Reflect.ownKeys(from) : Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    if (key === "__ob__")
      continue;
    toVal = to2[key];
    fromVal = from[key];
    if (!recursive || !hasOwn(to2, key)) {
      set(to2, key, fromVal);
    } else if (toVal !== fromVal && isPlainObject$1(toVal) && isPlainObject$1(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to2;
}
function mergeDataOrFn(parentVal, childVal, vm) {
  if (!vm) {
    if (!childVal) {
      return parentVal;
    }
    if (!parentVal) {
      return childVal;
    }
    return function mergedDataFn() {
      return mergeData(isFunction$2(childVal) ? childVal.call(this, this) : childVal, isFunction$2(parentVal) ? parentVal.call(this, this) : parentVal);
    };
  } else {
    return function mergedInstanceDataFn() {
      var instanceData = isFunction$2(childVal) ? childVal.call(vm, vm) : childVal;
      var defaultData = isFunction$2(parentVal) ? parentVal.call(vm, vm) : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData);
      } else {
        return defaultData;
      }
    };
  }
}
strats.data = function(parentVal, childVal, vm) {
  if (!vm) {
    if (childVal && typeof childVal !== "function") {
      return parentVal;
    }
    return mergeDataOrFn(parentVal, childVal);
  }
  return mergeDataOrFn(parentVal, childVal, vm);
};
function mergeLifecycleHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$2(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks2) {
  var res = [];
  for (var i = 0; i < hooks2.length; i++) {
    if (res.indexOf(hooks2[i]) === -1) {
      res.push(hooks2[i]);
    }
  }
  return res;
}
LIFECYCLE_HOOKS.forEach(function(hook) {
  strats[hook] = mergeLifecycleHook;
});
function mergeAssets(parentVal, childVal, vm, key) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    return extend$2(res, childVal);
  } else {
    return res;
  }
}
ASSET_TYPES.forEach(function(type) {
  strats[type + "s"] = mergeAssets;
});
strats.watch = function(parentVal, childVal, vm, key) {
  if (parentVal === nativeWatch)
    parentVal = void 0;
  if (childVal === nativeWatch)
    childVal = void 0;
  if (!childVal)
    return Object.create(parentVal || null);
  if (!parentVal)
    return childVal;
  var ret = {};
  extend$2(ret, parentVal);
  for (var key_1 in childVal) {
    var parent_1 = ret[key_1];
    var child = childVal[key_1];
    if (parent_1 && !isArray$2(parent_1)) {
      parent_1 = [parent_1];
    }
    ret[key_1] = parent_1 ? parent_1.concat(child) : isArray$2(child) ? child : [child];
  }
  return ret;
};
strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
  if (childVal && false) {
    assertObjectType(key, childVal);
  }
  if (!parentVal)
    return childVal;
  var ret = /* @__PURE__ */ Object.create(null);
  extend$2(ret, parentVal);
  if (childVal)
    extend$2(ret, childVal);
  return ret;
};
strats.provide = function(parentVal, childVal) {
  if (!parentVal)
    return childVal;
  return function() {
    var ret = /* @__PURE__ */ Object.create(null);
    mergeData(ret, isFunction$2(parentVal) ? parentVal.call(this) : parentVal);
    if (childVal) {
      mergeData(
        ret,
        isFunction$2(childVal) ? childVal.call(this) : childVal,
        false
        // non-recursive
      );
    }
    return ret;
  };
};
var defaultStrat = function(parentVal, childVal) {
  return childVal === void 0 ? parentVal : childVal;
};
function normalizeProps(options, vm) {
  var props2 = options.props;
  if (!props2)
    return;
  var res = {};
  var i, val, name2;
  if (isArray$2(props2)) {
    i = props2.length;
    while (i--) {
      val = props2[i];
      if (typeof val === "string") {
        name2 = camelize(val);
        res[name2] = { type: null };
      }
    }
  } else if (isPlainObject$1(props2)) {
    for (var key in props2) {
      val = props2[key];
      name2 = camelize(key);
      res[name2] = isPlainObject$1(val) ? val : { type: val };
    }
  } else
    ;
  options.props = res;
}
function normalizeInject(options, vm) {
  var inject2 = options.inject;
  if (!inject2)
    return;
  var normalized = options.inject = {};
  if (isArray$2(inject2)) {
    for (var i = 0; i < inject2.length; i++) {
      normalized[inject2[i]] = { from: inject2[i] };
    }
  } else if (isPlainObject$1(inject2)) {
    for (var key in inject2) {
      var val = inject2[key];
      normalized[key] = isPlainObject$1(val) ? extend$2({ from: key }, val) : { from: val };
    }
  } else
    ;
}
function normalizeDirectives$1(options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def2 = dirs[key];
      if (isFunction$2(def2)) {
        dirs[key] = { bind: def2, update: def2 };
      }
    }
  }
}
function assertObjectType(name2, value, vm) {
  if (!isPlainObject$1(value)) {
    warn$1('Invalid value for option "'.concat(name2, '": expected an Object, ') + "but got ".concat(toRawType(value), "."));
  }
}
function mergeOptions(parent, child, vm) {
  if (isFunction$2(child)) {
    child = child.options;
  }
  normalizeProps(child);
  normalizeInject(child);
  normalizeDirectives$1(child);
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField(key2) {
    var strat = strats[key2] || defaultStrat;
    options[key2] = strat(parent[key2], child[key2], vm, key2);
  }
  return options;
}
function resolveAsset(options, type, id, warnMissing) {
  if (typeof id !== "string") {
    return;
  }
  var assets = options[type];
  if (hasOwn(assets, id))
    return assets[id];
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId))
    return assets[camelizedId];
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId))
    return assets[PascalCaseId];
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  return res;
}
function validateProp(key, propOptions, propsData, vm) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, "default")) {
      value = false;
    } else if (value === "" || value === hyphenate(key)) {
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  if (value === void 0) {
    value = getPropDefaultValue(vm, prop, key);
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  return value;
}
function getPropDefaultValue(vm, prop, key) {
  if (!hasOwn(prop, "default")) {
    return void 0;
  }
  var def2 = prop.default;
  if (vm && vm.$options.propsData && vm.$options.propsData[key] === void 0 && vm._props[key] !== void 0) {
    return vm._props[key];
  }
  return isFunction$2(def2) && getType(prop.type) !== "Function" ? def2.call(vm) : def2;
}
var functionTypeCheckRE = /^\s*function (\w+)/;
function getType(fn) {
  var match2 = fn && fn.toString().match(functionTypeCheckRE);
  return match2 ? match2[1] : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (!isArray$2(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i;
    }
  }
  return -1;
}
var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop$2,
  set: noop$2
};
function proxy(target2, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter() {
    return this[sourceKey][key];
  };
  sharedPropertyDefinition.set = function proxySetter(val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function initState(vm) {
  var opts = vm.$options;
  if (opts.props)
    initProps$1(vm, opts.props);
  initSetup(vm);
  if (opts.methods)
    initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    var ob = observe(vm._data = {});
    ob && ob.vmCount++;
  }
  if (opts.computed)
    initComputed$1(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
function initProps$1(vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props2 = vm._props = shallowReactive({});
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  if (!isRoot) {
    toggleObserving(false);
  }
  var _loop_1 = function(key2) {
    keys.push(key2);
    var value = validateProp(key2, propsOptions, propsData, vm);
    {
      defineReactive(props2, key2, value);
    }
    if (!(key2 in vm)) {
      proxy(vm, "_props", key2);
    }
  };
  for (var key in propsOptions) {
    _loop_1(key);
  }
  toggleObserving(true);
}
function initData(vm) {
  var data3 = vm.$options.data;
  data3 = vm._data = isFunction$2(data3) ? getData(data3, vm) : data3 || {};
  if (!isPlainObject$1(data3)) {
    data3 = {};
  }
  var keys = Object.keys(data3);
  var props2 = vm.$options.props;
  vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (props2 && hasOwn(props2, key))
      ;
    else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  var ob = observe(data3);
  ob && ob.vmCount++;
}
function getData(data3, vm) {
  pushTarget();
  try {
    return data3.call(vm, vm);
  } catch (e) {
    handleError(e, vm, "data()");
    return {};
  } finally {
    popTarget();
  }
}
var computedWatcherOptions = { lazy: true };
function initComputed$1(vm, computed) {
  var watchers = vm._computedWatchers = /* @__PURE__ */ Object.create(null);
  var isSSR = isServerRendering();
  for (var key in computed) {
    var userDef = computed[key];
    var getter = isFunction$2(userDef) ? userDef : userDef.get;
    if (!isSSR) {
      watchers[key] = new Watcher(vm, getter || noop$2, noop$2, computedWatcherOptions);
    }
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}
function defineComputed(target2, key, userDef) {
  var shouldCache = !isServerRendering();
  if (isFunction$2(userDef)) {
    sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop$2;
  } else {
    sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop$2;
    sharedPropertyDefinition.set = userDef.set || noop$2;
  }
  Object.defineProperty(target2, key, sharedPropertyDefinition);
}
function createComputedGetter(key) {
  return function computedGetter() {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value;
    }
  };
}
function createGetterInvoker(fn) {
  return function computedGetter() {
    return fn.call(this, this);
  };
}
function initMethods(vm, methods) {
  vm.$options.props;
  for (var key in methods) {
    vm[key] = typeof methods[key] !== "function" ? noop$2 : bind$1(methods[key], vm);
  }
}
function initWatch(vm, watch2) {
  for (var key in watch2) {
    var handler = watch2[key];
    if (isArray$2(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}
function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject$1(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === "string") {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
function stateMixin(Vue2) {
  var dataDef = {};
  dataDef.get = function() {
    return this._data;
  };
  var propsDef = {};
  propsDef.get = function() {
    return this._props;
  };
  Object.defineProperty(Vue2.prototype, "$data", dataDef);
  Object.defineProperty(Vue2.prototype, "$props", propsDef);
  Vue2.prototype.$set = set;
  Vue2.prototype.$delete = del;
  Vue2.prototype.$watch = function(expOrFn, cb, options) {
    var vm = this;
    if (isPlainObject$1(cb)) {
      return createWatcher(vm, expOrFn, cb, options);
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
      pushTarget();
      invokeWithErrorHandling(cb, vm, [watcher.value], vm, info);
      popTarget();
    }
    return function unwatchFn() {
      watcher.teardown();
    };
  };
}
var uid$3 = 0;
function initMixin$1(Vue2) {
  Vue2.prototype._init = function(options) {
    var vm = this;
    vm._uid = uid$3++;
    vm._isVue = true;
    vm.__v_skip = true;
    vm._scope = new EffectScope(
      true
      /* detached */
    );
    vm._scope._vm = true;
    if (options && options._isComponent) {
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
    }
    {
      vm._renderProxy = vm;
    }
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook$1(
      vm,
      "beforeCreate",
      void 0,
      false
      /* setContext */
    );
    initInjections(vm);
    initState(vm);
    initProvide(vm);
    callHook$1(vm, "created");
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
function initInternalComponent(vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}
function resolveConstructorOptions(Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      Ctor.superOptions = superOptions;
      var modifiedOptions = resolveModifiedOptions(Ctor);
      if (modifiedOptions) {
        extend$2(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options;
}
function resolveModifiedOptions(Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified)
        modified = {};
      modified[key] = latest[key];
    }
  }
  return modified;
}
function Vue$1(options) {
  this._init(options);
}
initMixin$1(Vue$1);
stateMixin(Vue$1);
eventsMixin(Vue$1);
lifecycleMixin(Vue$1);
renderMixin(Vue$1);
function initUse(Vue2) {
  Vue2.use = function(plugin) {
    var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
    if (installedPlugins.indexOf(plugin) > -1) {
      return this;
    }
    var args = toArray$2(arguments, 1);
    args.unshift(this);
    if (isFunction$2(plugin.install)) {
      plugin.install.apply(plugin, args);
    } else if (isFunction$2(plugin)) {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this;
  };
}
function initMixin(Vue2) {
  Vue2.mixin = function(mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this;
  };
}
function initExtend(Vue2) {
  Vue2.cid = 0;
  var cid = 1;
  Vue2.extend = function(extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId];
    }
    var name2 = getComponentName(extendOptions) || getComponentName(Super.options);
    var Sub = function VueComponent(options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(Super.options, extendOptions);
    Sub["super"] = Super;
    if (Sub.options.props) {
      initProps(Sub);
    }
    if (Sub.options.computed) {
      initComputed(Sub);
    }
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    ASSET_TYPES.forEach(function(type) {
      Sub[type] = Super[type];
    });
    if (name2) {
      Sub.options.components[name2] = Sub;
    }
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend$2({}, Sub.options);
    cachedCtors[SuperId] = Sub;
    return Sub;
  };
}
function initProps(Comp) {
  var props2 = Comp.options.props;
  for (var key in props2) {
    proxy(Comp.prototype, "_props", key);
  }
}
function initComputed(Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}
function initAssetRegisters(Vue2) {
  ASSET_TYPES.forEach(function(type) {
    Vue2[type] = function(id, definition) {
      if (!definition) {
        return this.options[type + "s"][id];
      } else {
        if (type === "component" && isPlainObject$1(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === "directive" && isFunction$2(definition)) {
          definition = { bind: definition, update: definition };
        }
        this.options[type + "s"][id] = definition;
        return definition;
      }
    };
  });
}
function _getComponentName(opts) {
  return opts && (getComponentName(opts.Ctor.options) || opts.tag);
}
function matches(pattern, name2) {
  if (isArray$2(pattern)) {
    return pattern.indexOf(name2) > -1;
  } else if (typeof pattern === "string") {
    return pattern.split(",").indexOf(name2) > -1;
  } else if (isRegExp$1(pattern)) {
    return pattern.test(name2);
  }
  return false;
}
function pruneCache(keepAliveInstance, filter2) {
  var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var entry = cache[key];
    if (entry) {
      var name_1 = entry.name;
      if (name_1 && !filter2(name_1)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}
function pruneCacheEntry(cache, key, keys, current) {
  var entry = cache[key];
  if (entry && (!current || entry.tag !== current.tag)) {
    entry.componentInstance.$destroy();
  }
  cache[key] = null;
  remove$2(keys, key);
}
var patternTypes = [String, RegExp, Array];
var KeepAlive = {
  name: "keep-alive",
  abstract: true,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },
  methods: {
    cacheVNode: function() {
      var _a = this, cache = _a.cache, keys = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
      if (vnodeToCache) {
        var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
        cache[keyToCache] = {
          name: _getComponentName(componentOptions),
          tag,
          componentInstance
        };
        keys.push(keyToCache);
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        this.vnodeToCache = null;
      }
    }
  },
  created: function() {
    this.cache = /* @__PURE__ */ Object.create(null);
    this.keys = [];
  },
  destroyed: function() {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },
  mounted: function() {
    var _this = this;
    this.cacheVNode();
    this.$watch("include", function(val) {
      pruneCache(_this, function(name2) {
        return matches(val, name2);
      });
    });
    this.$watch("exclude", function(val) {
      pruneCache(_this, function(name2) {
        return !matches(val, name2);
      });
    });
  },
  updated: function() {
    this.cacheVNode();
  },
  render: function() {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      var name_2 = _getComponentName(componentOptions);
      var _a = this, include = _a.include, exclude = _a.exclude;
      if (
        // not included
        include && (!name_2 || !matches(include, name_2)) || // excluded
        exclude && name_2 && matches(exclude, name_2)
      ) {
        return vnode;
      }
      var _b = this, cache = _b.cache, keys = _b.keys;
      var key = vnode.key == null ? (
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "")
      ) : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        remove$2(keys, key);
        keys.push(key);
      } else {
        this.vnodeToCache = vnode;
        this.keyToCache = key;
      }
      vnode.data.keepAlive = true;
    }
    return vnode || slot && slot[0];
  }
};
var builtInComponents = {
  KeepAlive
};
function initGlobalAPI(Vue2) {
  var configDef = {};
  configDef.get = function() {
    return config;
  };
  Object.defineProperty(Vue2, "config", configDef);
  Vue2.util = {
    warn: warn$1,
    extend: extend$2,
    mergeOptions,
    defineReactive
  };
  Vue2.set = set;
  Vue2.delete = del;
  Vue2.nextTick = nextTick;
  Vue2.observable = function(obj) {
    observe(obj);
    return obj;
  };
  Vue2.options = /* @__PURE__ */ Object.create(null);
  ASSET_TYPES.forEach(function(type) {
    Vue2.options[type + "s"] = /* @__PURE__ */ Object.create(null);
  });
  Vue2.options._base = Vue2;
  extend$2(Vue2.options.components, builtInComponents);
  initUse(Vue2);
  initMixin(Vue2);
  initExtend(Vue2);
  initAssetRegisters(Vue2);
}
initGlobalAPI(Vue$1);
Object.defineProperty(Vue$1.prototype, "$isServer", {
  get: isServerRendering
});
Object.defineProperty(Vue$1.prototype, "$ssrContext", {
  get: function() {
    return this.$vnode && this.$vnode.ssrContext;
  }
});
Object.defineProperty(Vue$1, "FunctionalRenderContext", {
  value: FunctionalRenderContext
});
Vue$1.version = version$1;
var isReservedAttr = makeMap("style,class");
var acceptValue = makeMap("input,textarea,option,select,progress");
var mustUseProp = function(tag, type, attr) {
  return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
};
var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
var convertEnumeratedValue = function(key, value) {
  return isFalsyAttrValue(value) || value === "false" ? "false" : (
    // allow arbitrary string value for contenteditable
    key === "contenteditable" && isValidContentEditableValue(value) ? value : "true"
  );
};
var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,truespeed,typemustmatch,visible");
var xlinkNS = "http://www.w3.org/1999/xlink";
var isXlink = function(name2) {
  return name2.charAt(5) === ":" && name2.slice(0, 5) === "xlink";
};
var getXlinkProp = function(name2) {
  return isXlink(name2) ? name2.slice(6, name2.length) : "";
};
var isFalsyAttrValue = function(val) {
  return val == null || val === false;
};
function genClassForVnode(vnode) {
  var data3 = vnode.data;
  var parentNode2 = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data3 = mergeClassData(childNode.data, data3);
    }
  }
  while (isDef(parentNode2 = parentNode2.parent)) {
    if (parentNode2 && parentNode2.data) {
      data3 = mergeClassData(data3, parentNode2.data);
    }
  }
  return renderClass(data3.staticClass, data3.class);
}
function mergeClassData(child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class) ? [child.class, parent.class] : parent.class
  };
}
function renderClass(staticClass, dynamicClass) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass));
  }
  return "";
}
function concat(a, b) {
  return a ? b ? a + " " + b : a : b || "";
}
function stringifyClass(value) {
  if (Array.isArray(value)) {
    return stringifyArray(value);
  }
  if (isObject$3(value)) {
    return stringifyObject(value);
  }
  if (typeof value === "string") {
    return value;
  }
  return "";
}
function stringifyArray(value) {
  var res = "";
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
      if (res)
        res += " ";
      res += stringified;
    }
  }
  return res;
}
function stringifyObject(value) {
  var res = "";
  for (var key in value) {
    if (value[key]) {
      if (res)
        res += " ";
      res += key;
    }
  }
  return res;
}
var namespaceMap = {
  svg: "http://www.w3.org/2000/svg",
  math: "http://www.w3.org/1998/Math/MathML"
};
var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot");
var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
var isReservedTag = function(tag) {
  return isHTMLTag(tag) || isSVG(tag);
};
function getTagNamespace(tag) {
  if (isSVG(tag)) {
    return "svg";
  }
  if (tag === "math") {
    return "math";
  }
}
var unknownElementCache = /* @__PURE__ */ Object.create(null);
function isUnknownElement(tag) {
  if (!inBrowser$2) {
    return true;
  }
  if (isReservedTag(tag)) {
    return false;
  }
  tag = tag.toLowerCase();
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag];
  }
  var el = document.createElement(tag);
  if (tag.indexOf("-") > -1) {
    return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
  } else {
    return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
  }
}
var isTextInputType = makeMap("text,number,password,search,email,tel,url");
function query(el) {
  if (typeof el === "string") {
    var selected = document.querySelector(el);
    if (!selected) {
      return document.createElement("div");
    }
    return selected;
  } else {
    return el;
  }
}
function createElement(tagName2, vnode) {
  var elm = document.createElement(tagName2);
  if (tagName2 !== "select") {
    return elm;
  }
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== void 0) {
    elm.setAttribute("multiple", "multiple");
  }
  return elm;
}
function createElementNS(namespace, tagName2) {
  return document.createElementNS(namespaceMap[namespace], tagName2);
}
function createTextNode(text) {
  return document.createTextNode(text);
}
function createComment(text) {
  return document.createComment(text);
}
function insertBefore(parentNode2, newNode, referenceNode) {
  parentNode2.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
  node.removeChild(child);
}
function appendChild(node, child) {
  node.appendChild(child);
}
function parentNode(node) {
  return node.parentNode;
}
function nextSibling(node) {
  return node.nextSibling;
}
function tagName(node) {
  return node.tagName;
}
function setTextContent(node, text) {
  node.textContent = text;
}
function setStyleScope(node, scopeId) {
  node.setAttribute(scopeId, "");
}
var nodeOps = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createElement,
  createElementNS,
  createTextNode,
  createComment,
  insertBefore,
  removeChild,
  appendChild,
  parentNode,
  nextSibling,
  tagName,
  setTextContent,
  setStyleScope
});
var ref = {
  create: function(_, vnode) {
    registerRef(vnode);
  },
  update: function(oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function(vnode) {
    registerRef(vnode, true);
  }
};
function registerRef(vnode, isRemoval) {
  var ref2 = vnode.data.ref;
  if (!isDef(ref2))
    return;
  var vm = vnode.context;
  var refValue = vnode.componentInstance || vnode.elm;
  var value = isRemoval ? null : refValue;
  var $refsValue = isRemoval ? void 0 : refValue;
  if (isFunction$2(ref2)) {
    invokeWithErrorHandling(ref2, vm, [value], vm, "template ref function");
    return;
  }
  var isFor = vnode.data.refInFor;
  var _isString = typeof ref2 === "string" || typeof ref2 === "number";
  var _isRef = isRef(ref2);
  var refs = vm.$refs;
  if (_isString || _isRef) {
    if (isFor) {
      var existing = _isString ? refs[ref2] : ref2.value;
      if (isRemoval) {
        isArray$2(existing) && remove$2(existing, refValue);
      } else {
        if (!isArray$2(existing)) {
          if (_isString) {
            refs[ref2] = [refValue];
            setSetupRef(vm, ref2, refs[ref2]);
          } else {
            ref2.value = [refValue];
          }
        } else if (!existing.includes(refValue)) {
          existing.push(refValue);
        }
      }
    } else if (_isString) {
      if (isRemoval && refs[ref2] !== refValue) {
        return;
      }
      refs[ref2] = $refsValue;
      setSetupRef(vm, ref2, value);
    } else if (_isRef) {
      if (isRemoval && ref2.value !== refValue) {
        return;
      }
      ref2.value = value;
    } else
      ;
  }
}
function setSetupRef(_a, key, val) {
  var _setupState = _a._setupState;
  if (_setupState && hasOwn(_setupState, key)) {
    if (isRef(_setupState[key])) {
      _setupState[key].value = val;
    } else {
      _setupState[key] = val;
    }
  }
}
var emptyNode = new VNode("", {}, []);
var hooks = ["create", "activate", "update", "remove", "destroy"];
function sameVnode(a, b) {
  return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
}
function sameInputType(a, b) {
  if (a.tag !== "input")
    return true;
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
}
function createKeyToOldIdx(children2, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children2[i].key;
    if (isDef(key))
      map[key] = i;
  }
  return map;
}
function createPatchFunction(backend) {
  var i, j;
  var cbs = {};
  var modules2 = backend.modules, nodeOps2 = backend.nodeOps;
  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules2.length; ++j) {
      if (isDef(modules2[j][hooks[i]])) {
        cbs[hooks[i]].push(modules2[j][hooks[i]]);
      }
    }
  }
  function emptyNodeAt(elm) {
    return new VNode(nodeOps2.tagName(elm).toLowerCase(), {}, [], void 0, elm);
  }
  function createRmCb(childElm, listeners) {
    function remove2() {
      if (--remove2.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove2.listeners = listeners;
    return remove2;
  }
  function removeNode(el) {
    var parent = nodeOps2.parentNode(el);
    if (isDef(parent)) {
      nodeOps2.removeChild(parent, el);
    }
  }
  function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index2) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    vnode.isRootInsert = !nested;
    if (createComponent2(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return;
    }
    var data3 = vnode.data;
    var children2 = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      vnode.elm = vnode.ns ? nodeOps2.createElementNS(vnode.ns, tag) : nodeOps2.createElement(tag, vnode);
      setScope(vnode);
      createChildren(vnode, children2, insertedVnodeQueue);
      if (isDef(data3)) {
        invokeCreateHooks(vnode, insertedVnodeQueue);
      }
      insert(parentElm, vnode.elm, refElm);
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps2.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps2.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }
  function createComponent2(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2 = vnode.data;
    if (isDef(i2)) {
      var isReactivated = isDef(vnode.componentInstance) && i2.keepAlive;
      if (isDef(i2 = i2.hook) && isDef(i2 = i2.init)) {
        i2(
          vnode,
          false
          /* hydrating */
        );
      }
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        insert(parentElm, vnode.elm, refElm);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true;
      }
    }
  }
  function initComponent(vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      registerRef(vnode);
      insertedVnodeQueue.push(vnode);
    }
  }
  function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
    var i2;
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i2 = innerNode.data) && isDef(i2 = i2.transition)) {
        for (i2 = 0; i2 < cbs.activate.length; ++i2) {
          cbs.activate[i2](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break;
      }
    }
    insert(parentElm, vnode.elm, refElm);
  }
  function insert(parent, elm, ref2) {
    if (isDef(parent)) {
      if (isDef(ref2)) {
        if (nodeOps2.parentNode(ref2) === parent) {
          nodeOps2.insertBefore(parent, elm, ref2);
        }
      } else {
        nodeOps2.appendChild(parent, elm);
      }
    }
  }
  function createChildren(vnode, children2, insertedVnodeQueue) {
    if (isArray$2(children2)) {
      for (var i_1 = 0; i_1 < children2.length; ++i_1) {
        createElm(children2[i_1], insertedVnodeQueue, vnode.elm, null, true, children2, i_1);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps2.appendChild(vnode.elm, nodeOps2.createTextNode(String(vnode.text)));
    }
  }
  function isPatchable(vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag);
  }
  function invokeCreateHooks(vnode, insertedVnodeQueue) {
    for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
      cbs.create[i_2](emptyNode, vnode);
    }
    i = vnode.data.hook;
    if (isDef(i)) {
      if (isDef(i.create))
        i.create(emptyNode, vnode);
      if (isDef(i.insert))
        insertedVnodeQueue.push(vnode);
    }
  }
  function setScope(vnode) {
    var i2;
    if (isDef(i2 = vnode.fnScopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i2 = ancestor.context) && isDef(i2 = i2.$options._scopeId)) {
          nodeOps2.setStyleScope(vnode.elm, i2);
        }
        ancestor = ancestor.parent;
      }
    }
    if (isDef(i2 = activeInstance) && i2 !== vnode.context && i2 !== vnode.fnContext && isDef(i2 = i2.$options._scopeId)) {
      nodeOps2.setStyleScope(vnode.elm, i2);
    }
  }
  function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }
  function invokeDestroyHook(vnode) {
    var i2, j2;
    var data3 = vnode.data;
    if (isDef(data3)) {
      if (isDef(i2 = data3.hook) && isDef(i2 = i2.destroy))
        i2(vnode);
      for (i2 = 0; i2 < cbs.destroy.length; ++i2)
        cbs.destroy[i2](vnode);
    }
    if (isDef(i2 = vnode.children)) {
      for (j2 = 0; j2 < vnode.children.length; ++j2) {
        invokeDestroyHook(vnode.children[j2]);
      }
    }
  }
  function removeVnodes(vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else {
          removeNode(ch.elm);
        }
      }
    }
  }
  function removeAndInvokeRemoveHook(vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i_3;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        rm.listeners += listeners;
      } else {
        rm = createRmCb(vnode.elm, listeners);
      }
      if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
        removeAndInvokeRemoveHook(i_3, rm);
      }
      for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
        cbs.remove[i_3](vnode, rm);
      }
      if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
        i_3(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }
  function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
    var canMove = !removeOnly;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx];
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldStartVnode.elm, nodeOps2.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
        canMove && nodeOps2.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx))
          oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) {
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
            oldCh[idxInOld] = void 0;
            canMove && nodeOps2.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
  }
  function findIdxInOld(node, oldCh, start, end) {
    for (var i_5 = start; i_5 < end; i_5++) {
      var c = oldCh[i_5];
      if (isDef(c) && sameVnode(node, c))
        return i_5;
    }
  }
  function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index2, removeOnly) {
    if (oldVnode === vnode) {
      return;
    }
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      vnode = ownerArray[index2] = cloneVNode(vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return;
    }
    if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
      vnode.componentInstance = oldVnode.componentInstance;
      return;
    }
    var i2;
    var data3 = vnode.data;
    if (isDef(data3) && isDef(i2 = data3.hook) && isDef(i2 = i2.prepatch)) {
      i2(oldVnode, vnode);
    }
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data3) && isPatchable(vnode)) {
      for (i2 = 0; i2 < cbs.update.length; ++i2)
        cbs.update[i2](oldVnode, vnode);
      if (isDef(i2 = data3.hook) && isDef(i2 = i2.update))
        i2(oldVnode, vnode);
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch)
          updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text))
          nodeOps2.setTextContent(elm, "");
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps2.setTextContent(elm, "");
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps2.setTextContent(elm, vnode.text);
    }
    if (isDef(data3)) {
      if (isDef(i2 = data3.hook) && isDef(i2 = i2.postpatch))
        i2(oldVnode, vnode);
    }
  }
  function invokeInsertHook(vnode, queue2, initial) {
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue2;
    } else {
      for (var i_6 = 0; i_6 < queue2.length; ++i_6) {
        queue2[i_6].data.hook.insert(queue2[i_6]);
      }
    }
  }
  var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
  function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
    var i2;
    var tag = vnode.tag, data3 = vnode.data, children2 = vnode.children;
    inVPre = inVPre || data3 && data3.pre;
    vnode.elm = elm;
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true;
    }
    if (isDef(data3)) {
      if (isDef(i2 = data3.hook) && isDef(i2 = i2.init))
        i2(
          vnode,
          true
          /* hydrating */
        );
      if (isDef(i2 = vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        return true;
      }
    }
    if (isDef(tag)) {
      if (isDef(children2)) {
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children2, insertedVnodeQueue);
        } else {
          if (isDef(i2 = data3) && isDef(i2 = i2.domProps) && isDef(i2 = i2.innerHTML)) {
            if (i2 !== elm.innerHTML) {
              return false;
            }
          } else {
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i_7 = 0; i_7 < children2.length; i_7++) {
              if (!childNode || !hydrate(childNode, children2[i_7], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break;
              }
              childNode = childNode.nextSibling;
            }
            if (!childrenMatch || childNode) {
              return false;
            }
          }
        }
      }
      if (isDef(data3)) {
        var fullInvoke = false;
        for (var key in data3) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break;
          }
        }
        if (!fullInvoke && data3["class"]) {
          traverse(data3["class"]);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true;
  }
  return function patch2(oldVnode, vnode, hydrating, removeOnly) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode))
        invokeDestroyHook(oldVnode);
      return;
    }
    var isInitialPatch = false;
    var insertedVnodeQueue = [];
    if (isUndef(oldVnode)) {
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
      } else {
        if (isRealElement) {
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode;
            }
          }
          oldVnode = emptyNodeAt(oldVnode);
        }
        var oldElm = oldVnode.elm;
        var parentElm = nodeOps2.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm,
          nodeOps2.nextSibling(oldElm)
        );
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
              cbs.destroy[i_8](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                cbs.create[i_9](emptyNode, ancestor);
              }
              var insert_1 = ancestor.data.hook.insert;
              if (insert_1.merged) {
                var cloned = insert_1.fns.slice(1);
                for (var i_10 = 0; i_10 < cloned.length; i_10++) {
                  cloned[i_10]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }
        if (isDef(parentElm)) {
          removeVnodes([oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }
    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm;
  };
}
var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives(vnode) {
    updateDirectives(vnode, emptyNode);
  }
};
function updateDirectives(oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}
function _update(oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
  var dirsWithInsert = [];
  var dirsWithPostpatch = [];
  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      callHook(dir, "bind", vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      dir.oldValue = oldDir.value;
      dir.oldArg = oldDir.arg;
      callHook(dir, "update", vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }
  if (dirsWithInsert.length) {
    var callInsert = function() {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, "insert", callInsert);
    } else {
      callInsert();
    }
  }
  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, "postpatch", function() {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
      }
    });
  }
  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
      }
    }
  }
}
var emptyModifiers = /* @__PURE__ */ Object.create(null);
function normalizeDirectives(dirs, vm) {
  var res = /* @__PURE__ */ Object.create(null);
  if (!dirs) {
    return res;
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    if (vm._setupState && vm._setupState.__sfc) {
      var setupDef = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
      if (typeof setupDef === "function") {
        dir.def = {
          bind: setupDef,
          update: setupDef
        };
      } else {
        dir.def = setupDef;
      }
    }
    dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name);
  }
  return res;
}
function getRawDirName(dir) {
  return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
}
function callHook(dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
    }
  }
}
var baseModules = [ref, directives];
function updateAttrs(oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return;
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return;
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs2 = vnode.data.attrs || {};
  if (isDef(attrs2.__ob__) || isTrue(attrs2._v_attr_proxy)) {
    attrs2 = vnode.data.attrs = extend$2({}, attrs2);
  }
  for (key in attrs2) {
    cur = attrs2[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur, vnode.data.pre);
    }
  }
  if ((isIE || isEdge) && attrs2.value !== oldAttrs.value) {
    setAttr(elm, "value", attrs2.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs2[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}
function setAttr(el, key, value, isInPre) {
  if (isInPre || el.tagName.indexOf("-") > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, convertEnumeratedValue(key, value));
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}
function baseSetAttr(el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
      var blocker_1 = function(e) {
        e.stopImmediatePropagation();
        el.removeEventListener("input", blocker_1);
      };
      el.addEventListener("input", blocker_1);
      el.__ieph = true;
    }
    el.setAttribute(key, value);
  }
}
var attrs = {
  create: updateAttrs,
  update: updateAttrs
};
function updateClass(oldVnode, vnode) {
  var el = vnode.elm;
  var data3 = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data3.staticClass) && isUndef(data3.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
    return;
  }
  var cls = genClassForVnode(vnode);
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }
  if (cls !== el._prevClass) {
    el.setAttribute("class", cls);
    el._prevClass = cls;
  }
}
var klass = {
  create: updateClass,
  update: updateClass
};
var RANGE_TOKEN = "__r";
var CHECKBOX_RADIO_TOKEN = "__c";
function normalizeEvents(on) {
  if (isDef(on[RANGE_TOKEN])) {
    var event_1 = isIE ? "change" : "input";
    on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
    delete on[RANGE_TOKEN];
  }
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}
var target$2;
function createOnceHandler(event, handler, capture) {
  var _target = target$2;
  return function onceHandler() {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove(event, onceHandler, capture, _target);
    }
  };
}
var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
function add(name2, handler, capture, passive) {
  if (useMicrotaskFix) {
    var attachedTimestamp_1 = currentFlushTimestamp;
    var original_1 = handler;
    handler = original_1._wrapper = function(e) {
      if (
        // no bubbling, should always fire.
        // this is just a safety net in case event.timeStamp is unreliable in
        // certain weird environments...
        e.target === e.currentTarget || // event is fired after handler attachment
        e.timeStamp >= attachedTimestamp_1 || // bail for environments that have buggy event.timeStamp implementations
        // #9462 iOS 9 bug: event.timeStamp is 0 after history.pushState
        // #9681 QtWebEngine event.timeStamp is negative value
        e.timeStamp <= 0 || // #9448 bail if event is fired in another document in a multi-page
        // electron/nw.js app, since event.timeStamp will be using a different
        // starting reference
        e.target.ownerDocument !== document
      ) {
        return original_1.apply(this, arguments);
      }
    };
  }
  target$2.addEventListener(name2, handler, supportsPassive ? { capture, passive } : capture);
}
function remove(name2, handler, capture, _target) {
  (_target || target$2).removeEventListener(
    name2,
    //@ts-expect-error
    handler._wrapper || handler,
    capture
  );
}
function updateDOMListeners(oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return;
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$2 = vnode.elm || oldVnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
  target$2 = void 0;
}
var events = {
  create: updateDOMListeners,
  update: updateDOMListeners,
  // @ts-expect-error emptyNode has actually data
  destroy: function(vnode) {
    return updateDOMListeners(vnode, emptyNode);
  }
};
var svgContainer;
function updateDOMProps(oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return;
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props2 = vnode.data.domProps || {};
  if (isDef(props2.__ob__) || isTrue(props2._v_attr_proxy)) {
    props2 = vnode.data.domProps = extend$2({}, props2);
  }
  for (key in oldProps) {
    if (!(key in props2)) {
      elm[key] = "";
    }
  }
  for (key in props2) {
    cur = props2[key];
    if (key === "textContent" || key === "innerHTML") {
      if (vnode.children)
        vnode.children.length = 0;
      if (cur === oldProps[key])
        continue;
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }
    if (key === "value" && elm.tagName !== "PROGRESS") {
      elm._value = cur;
      var strCur = isUndef(cur) ? "" : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
      svgContainer = svgContainer || document.createElement("div");
      svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
      var svg = svgContainer.firstChild;
      while (elm.firstChild) {
        elm.removeChild(elm.firstChild);
      }
      while (svg.firstChild) {
        elm.appendChild(svg.firstChild);
      }
    } else if (
      // skip the update if old and new VDOM state is the same.
      // `value` is handled separately because the DOM value may be temporarily
      // out of sync with VDOM state due to focus, composition and modifiers.
      // This  #4521 by skipping the unnecessary `checked` update.
      cur !== oldProps[key]
    ) {
      try {
        elm[key] = cur;
      } catch (e) {
      }
    }
  }
}
function shouldUpdateValue(elm, checkVal) {
  return (
    //@ts-expect-error
    !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal))
  );
}
function isNotInFocusAndDirty(elm, checkVal) {
  var notInFocus = true;
  try {
    notInFocus = document.activeElement !== elm;
  } catch (e) {
  }
  return notInFocus && elm.value !== checkVal;
}
function isDirtyWithModifiers(elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers;
  if (isDef(modifiers)) {
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal);
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim();
    }
  }
  return value !== newVal;
}
var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};
var parseStyleText = cached(function(cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res;
});
function normalizeStyleData(data3) {
  var style2 = normalizeStyleBinding(data3.style);
  return data3.staticStyle ? extend$2(data3.staticStyle, style2) : style2;
}
function normalizeStyleBinding(bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle);
  }
  if (typeof bindingStyle === "string") {
    return parseStyleText(bindingStyle);
  }
  return bindingStyle;
}
function getStyle(vnode, checkChild) {
  var res = {};
  var styleData;
  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend$2(res, styleData);
      }
    }
  }
  if (styleData = normalizeStyleData(vnode.data)) {
    extend$2(res, styleData);
  }
  var parentNode2 = vnode;
  while (parentNode2 = parentNode2.parent) {
    if (parentNode2.data && (styleData = normalizeStyleData(parentNode2.data))) {
      extend$2(res, styleData);
    }
  }
  return res;
}
var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function(el, name2, val) {
  if (cssVarRE.test(name2)) {
    el.style.setProperty(name2, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(hyphenate(name2), val.replace(importantRE, ""), "important");
  } else {
    var normalizedName = normalize(name2);
    if (Array.isArray(val)) {
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};
var vendorNames = ["Webkit", "Moz", "ms"];
var emptyStyle;
var normalize = cached(function(prop) {
  emptyStyle = emptyStyle || document.createElement("div").style;
  prop = camelize(prop);
  if (prop !== "filter" && prop in emptyStyle) {
    return prop;
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name_1 = vendorNames[i] + capName;
    if (name_1 in emptyStyle) {
      return name_1;
    }
  }
});
function updateStyle(oldVnode, vnode) {
  var data3 = vnode.data;
  var oldData = oldVnode.data;
  if (isUndef(data3.staticStyle) && isUndef(data3.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
    return;
  }
  var cur, name2;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
  var oldStyle = oldStaticStyle || oldStyleBinding;
  var style2 = normalizeStyleBinding(vnode.data.style) || {};
  vnode.data.normalizedStyle = isDef(style2.__ob__) ? extend$2({}, style2) : style2;
  var newStyle = getStyle(vnode, true);
  for (name2 in oldStyle) {
    if (isUndef(newStyle[name2])) {
      setProp(el, name2, "");
    }
  }
  for (name2 in newStyle) {
    cur = newStyle[name2];
    if (cur !== oldStyle[name2]) {
      setProp(el, name2, cur == null ? "" : cur);
    }
  }
}
var style = {
  create: updateStyle,
  update: updateStyle
};
var whitespaceRE = /\s+/;
function addClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.add(c);
      });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    if (cur.indexOf(" " + cls + " ") < 0) {
      el.setAttribute("class", (cur + cls).trim());
    }
  }
}
function removeClass(el, cls) {
  if (!cls || !(cls = cls.trim())) {
    return;
  }
  if (el.classList) {
    if (cls.indexOf(" ") > -1) {
      cls.split(whitespaceRE).forEach(function(c) {
        return el.classList.remove(c);
      });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute("class");
    }
  } else {
    var cur = " ".concat(el.getAttribute("class") || "", " ");
    var tar = " " + cls + " ";
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, " ");
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute("class", cur);
    } else {
      el.removeAttribute("class");
    }
  }
}
function resolveTransition(def2) {
  if (!def2) {
    return;
  }
  if (typeof def2 === "object") {
    var res = {};
    if (def2.css !== false) {
      extend$2(res, autoCssTransition(def2.name || "v"));
    }
    extend$2(res, def2);
    return res;
  } else if (typeof def2 === "string") {
    return autoCssTransition(def2);
  }
}
var autoCssTransition = cached(function(name2) {
  return {
    enterClass: "".concat(name2, "-enter"),
    enterToClass: "".concat(name2, "-enter-to"),
    enterActiveClass: "".concat(name2, "-enter-active"),
    leaveClass: "".concat(name2, "-leave"),
    leaveToClass: "".concat(name2, "-leave-to"),
    leaveActiveClass: "".concat(name2, "-leave-active")
  };
});
var hasTransition = inBrowser$2 && !isIE9;
var TRANSITION = "transition";
var ANIMATION = "animation";
var transitionProp = "transition";
var transitionEndEvent = "transitionend";
var animationProp = "animation";
var animationEndEvent = "animationend";
if (hasTransition) {
  if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
    transitionProp = "WebkitTransition";
    transitionEndEvent = "webkitTransitionEnd";
  }
  if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
    animationProp = "WebkitAnimation";
    animationEndEvent = "webkitAnimationEnd";
  }
}
var raf = inBrowser$2 ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : (
  /* istanbul ignore next */
  function(fn) {
    return fn();
  }
);
function nextFrame(fn) {
  raf(function() {
    raf(fn);
  });
}
function addTransitionClass(el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}
function removeTransitionClass(el, cls) {
  if (el._transitionClasses) {
    remove$2(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}
function whenTransitionEnds(el, expectedType, cb) {
  var _a = getTransitionInfo(el, expectedType), type = _a.type, timeout = _a.timeout, propCount = _a.propCount;
  if (!type)
    return cb();
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function() {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function(e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function() {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}
var transformRE = /\b(transform|all)(,|$)/;
function getTransitionInfo(el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
  var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
  var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
  var animationTimeout = getTimeout(animationDelays, animationDurations);
  var type;
  var timeout = 0;
  var propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
  return {
    type,
    timeout,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max.apply(null, durations.map(function(d, i) {
    return toMs(d) + toMs(delays[i]);
  }));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function enter(vnode, toggleDisplay) {
  var el = vnode.elm;
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }
  var data3 = resolveTransition(vnode.data.transition);
  if (isUndef(data3)) {
    return;
  }
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return;
  }
  var css = data3.css, type = data3.type, enterClass = data3.enterClass, enterToClass = data3.enterToClass, enterActiveClass = data3.enterActiveClass, appearClass = data3.appearClass, appearToClass = data3.appearToClass, appearActiveClass = data3.appearActiveClass, beforeEnter = data3.beforeEnter, enter2 = data3.enter, afterEnter = data3.afterEnter, enterCancelled = data3.enterCancelled, beforeAppear = data3.beforeAppear, appear = data3.appear, afterAppear = data3.afterAppear, appearCancelled = data3.appearCancelled, duration = data3.duration;
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    context = transitionNode.context;
    transitionNode = transitionNode.parent;
  }
  var isAppear = !context._isMounted || !vnode.isRootInsert;
  if (isAppear && !appear && appear !== "") {
    return;
  }
  var startClass = isAppear && appearClass ? appearClass : enterClass;
  var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
  var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
  var enterHook = isAppear ? isFunction$2(appear) ? appear : enter2 : enter2;
  var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
  var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
  var explicitEnterDuration = toNumber(isObject$3(duration) ? duration.enter : duration);
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);
  var cb = el._enterCb = once$1(function() {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });
  if (!vnode.data.show) {
    mergeVNodeHook(vnode, "insert", function() {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function() {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }
  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }
  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}
function leave(vnode, rm) {
  var el = vnode.elm;
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }
  var data3 = resolveTransition(vnode.data.transition);
  if (isUndef(data3) || el.nodeType !== 1) {
    return rm();
  }
  if (isDef(el._leaveCb)) {
    return;
  }
  var css = data3.css, type = data3.type, leaveClass = data3.leaveClass, leaveToClass = data3.leaveToClass, leaveActiveClass = data3.leaveActiveClass, beforeLeave = data3.beforeLeave, leave2 = data3.leave, afterLeave = data3.afterLeave, leaveCancelled = data3.leaveCancelled, delayLeave = data3.delayLeave, duration = data3.duration;
  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave2);
  var explicitLeaveDuration = toNumber(isObject$3(duration) ? duration.leave : duration);
  var cb = el._leaveCb = once$1(function() {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });
  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }
  function performLeave() {
    if (cb.cancelled) {
      return;
    }
    if (!vnode.data.show && el.parentNode) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function() {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave2 && leave2(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}
function isValidDuration(val) {
  return typeof val === "number" && !isNaN(val);
}
function getHookArgumentsLength(fn) {
  if (isUndef(fn)) {
    return false;
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
  } else {
    return (fn._length || fn.length) > 1;
  }
}
function _enter(_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
var transition = inBrowser$2 ? {
  create: _enter,
  activate: _enter,
  remove: function(vnode, rm) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};
var platformModules = [attrs, klass, events, domProps, style, transition];
var modules = platformModules.concat(baseModules);
var patch = createPatchFunction({ nodeOps, modules });
if (isIE9) {
  document.addEventListener("selectionchange", function() {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, "input");
    }
  });
}
var directive = {
  inserted: function(el, binding, vnode, oldVnode) {
    if (vnode.tag === "select") {
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, "postpatch", function() {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener("compositionstart", onCompositionStart);
        el.addEventListener("compositionend", onCompositionEnd);
        el.addEventListener("change", onCompositionEnd);
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function(el, binding, vnode) {
    if (vnode.tag === "select") {
      setSelected(el, binding, vnode.context);
      var prevOptions_1 = el._vOptions;
      var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions_1.some(function(o, i) {
        return !looseEqual(o, prevOptions_1[i]);
      })) {
        var needReset = el.multiple ? binding.value.some(function(v) {
          return hasNoMatchingOption(v, curOptions_1);
        }) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
        if (needReset) {
          trigger(el, "change");
        }
      }
    }
  }
};
function setSelected(el, binding, vm) {
  actuallySetSelected(el, binding);
  if (isIE || isEdge) {
    setTimeout(function() {
      actuallySetSelected(el, binding);
    }, 0);
  }
}
function actuallySetSelected(el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    return;
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return;
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}
function hasNoMatchingOption(value, options) {
  return options.every(function(o) {
    return !looseEqual(o, value);
  });
}
function getValue(option) {
  return "_value" in option ? option._value : option.value;
}
function onCompositionStart(e) {
  e.target.composing = true;
}
function onCompositionEnd(e) {
  if (!e.target.composing)
    return;
  e.target.composing = false;
  trigger(e.target, "input");
}
function trigger(el, type) {
  var e = document.createEvent("HTMLEvents");
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}
function locateNode(vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
}
var show = {
  bind: function(el, _a, vnode) {
    var value = _a.value;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
    if (value && transition2) {
      vnode.data.show = true;
      enter(vnode, function() {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : "none";
    }
  },
  update: function(el, _a, vnode) {
    var value = _a.value, oldValue = _a.oldValue;
    if (!value === !oldValue)
      return;
    vnode = locateNode(vnode);
    var transition2 = vnode.data && vnode.data.transition;
    if (transition2) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function() {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function() {
          el.style.display = "none";
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : "none";
    }
  },
  unbind: function(el, binding, vnode, oldVnode, isDestroy) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};
var platformDirectives = {
  model: directive,
  show
};
var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};
function getRealChild(vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children));
  } else {
    return vnode;
  }
}
function extractTransitionData(comp) {
  var data3 = {};
  var options = comp.$options;
  for (var key in options.propsData) {
    data3[key] = comp[key];
  }
  var listeners = options._parentListeners;
  for (var key in listeners) {
    data3[camelize(key)] = listeners[key];
  }
  return data3;
}
function placeholder(h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h("keep-alive", {
      props: rawChild.componentOptions.propsData
    });
  }
}
function hasParentTransition(vnode) {
  while (vnode = vnode.parent) {
    if (vnode.data.transition) {
      return true;
    }
  }
}
function isSameChild(child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag;
}
var isNotTextNode = function(c) {
  return c.tag || isAsyncPlaceholder(c);
};
var isVShowDirective = function(d) {
  return d.name === "show";
};
var Transition = {
  name: "transition",
  props: transitionProps,
  abstract: true,
  render: function(h) {
    var _this = this;
    var children2 = this.$slots.default;
    if (!children2) {
      return;
    }
    children2 = children2.filter(isNotTextNode);
    if (!children2.length) {
      return;
    }
    var mode = this.mode;
    var rawChild = children2[0];
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }
    var child = getRealChild(rawChild);
    if (!child) {
      return rawChild;
    }
    if (this._leaving) {
      return placeholder(h, rawChild);
    }
    var id = "__transition-".concat(this._uid, "-");
    child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
    var data3 = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);
    if (child.data.directives && child.data.directives.some(isVShowDirective)) {
      child.data.show = true;
    }
    if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && // #6687 component root is a comment node
    !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
      var oldData = oldChild.data.transition = extend$2({}, data3);
      if (mode === "out-in") {
        this._leaving = true;
        mergeVNodeHook(oldData, "afterLeave", function() {
          _this._leaving = false;
          _this.$forceUpdate();
        });
        return placeholder(h, rawChild);
      } else if (mode === "in-out") {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }
        var delayedLeave_1;
        var performLeave = function() {
          delayedLeave_1();
        };
        mergeVNodeHook(data3, "afterEnter", performLeave);
        mergeVNodeHook(data3, "enterCancelled", performLeave);
        mergeVNodeHook(oldData, "delayLeave", function(leave2) {
          delayedLeave_1 = leave2;
        });
      }
    }
    return rawChild;
  }
};
var props = extend$2({
  tag: String,
  moveClass: String
}, transitionProps);
delete props.mode;
var TransitionGroup = {
  props,
  beforeMount: function() {
    var _this = this;
    var update3 = this._update;
    this._update = function(vnode, hydrating) {
      var restoreActiveInstance = setActiveInstance(_this);
      _this.__patch__(
        _this._vnode,
        _this.kept,
        false,
        // hydrating
        true
        // removeOnly (!important, avoids unnecessary moves)
      );
      _this._vnode = _this.kept;
      restoreActiveInstance();
      update3.call(_this, vnode, hydrating);
    };
  },
  render: function(h) {
    var tag = this.tag || this.$vnode.data.tag || "span";
    var map = /* @__PURE__ */ Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children2 = this.children = [];
    var transitionData = extractTransitionData(this);
    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
          children2.push(c);
          map[c.key] = c;
          (c.data || (c.data = {})).transition = transitionData;
        }
      }
    }
    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i = 0; i < prevChildren.length; i++) {
        var c = prevChildren[i];
        c.data.transition = transitionData;
        c.data.pos = c.elm.getBoundingClientRect();
        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }
    return h(tag, null, children2);
  },
  updated: function() {
    var children2 = this.prevChildren;
    var moveClass = this.moveClass || (this.name || "v") + "-move";
    if (!children2.length || !this.hasMove(children2[0].elm, moveClass)) {
      return;
    }
    children2.forEach(callPendingCbs);
    children2.forEach(recordPosition);
    children2.forEach(applyTranslation);
    this._reflow = document.body.offsetHeight;
    children2.forEach(function(c) {
      if (c.data.moved) {
        var el_1 = c.elm;
        var s = el_1.style;
        addTransitionClass(el_1, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = "";
        el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
          if (e && e.target !== el_1) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el_1.removeEventListener(transitionEndEvent, cb);
            el_1._moveCb = null;
            removeTransitionClass(el_1, moveClass);
          }
        });
      }
    });
  },
  methods: {
    hasMove: function(el, moveClass) {
      if (!hasTransition) {
        return false;
      }
      if (this._hasMove) {
        return this._hasMove;
      }
      var clone2 = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function(cls) {
          removeClass(clone2, cls);
        });
      }
      addClass(clone2, moveClass);
      clone2.style.display = "none";
      this.$el.appendChild(clone2);
      var info = getTransitionInfo(clone2);
      this.$el.removeChild(clone2);
      return this._hasMove = info.hasTransform;
    }
  }
};
function callPendingCbs(c) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}
function recordPosition(c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}
function applyTranslation(c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
    s.transitionDuration = "0s";
  }
}
var platformComponents = {
  Transition,
  TransitionGroup
};
Vue$1.config.mustUseProp = mustUseProp;
Vue$1.config.isReservedTag = isReservedTag;
Vue$1.config.isReservedAttr = isReservedAttr;
Vue$1.config.getTagNamespace = getTagNamespace;
Vue$1.config.isUnknownElement = isUnknownElement;
extend$2(Vue$1.options.directives, platformDirectives);
extend$2(Vue$1.options.components, platformComponents);
Vue$1.prototype.__patch__ = inBrowser$2 ? patch : noop$2;
Vue$1.prototype.$mount = function(el, hydrating) {
  el = el && inBrowser$2 ? query(el) : void 0;
  return mountComponent(this, el, hydrating);
};
if (inBrowser$2) {
  setTimeout(function() {
    if (config.devtools) {
      if (devtools) {
        devtools.emit("init", Vue$1);
      }
    }
  }, 0);
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray: isArray$1 } = Array;
const isUndefined$1 = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined$1(val) && val.constructor !== null && !isUndefined$1(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString$1 = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber$1 = typeOfTest("number");
const isObject$2 = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject$2(val) && isFunction$1(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction$1(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray$1(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key2;
  while (i-- > 0) {
    _key2 = keys[i];
    if (key === _key2.toLowerCase()) {
      return _key2;
    }
  }
  return null;
}
const _global$1 = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined$1(context) && context !== _global$1;
function merge$1() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge$1(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge$1({}, val);
    } else if (isArray$1(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend$1 = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction$1(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props2, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props2 && Object.assign(constructor.prototype, props2);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props2;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props2 = Object.getOwnPropertyNames(sourceObj);
    i = props2.length;
    while (i-- > 0) {
      prop = props2[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray$1 = (thing) => {
  if (!thing)
    return null;
  if (isArray$1(thing))
    return thing;
  let i = thing.length;
  if (!isNumber$1(i))
    return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches2;
  const arr = [];
  while ((matches2 = regExp.exec(str)) !== null) {
    arr.push(matches2);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name2) => {
    let ret;
    if ((ret = reducer(descriptor, name2, obj)) !== false) {
      reducedDescriptors[name2] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name2) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].indexOf(name2) !== -1) {
      return false;
    }
    const value = obj[name2];
    if (!isFunction$1(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name2 + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray$1(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop$1 = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject$2(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target2 = isArray$1(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined$1(reducedValue) && (target2[key] = reducedValue);
        });
        stack[i] = void 0;
        return target2;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject$2(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const utils$1 = {
  isArray: isArray$1,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString: isString$1,
  isNumber: isNumber$1,
  isBoolean,
  isObject: isObject$2,
  isPlainObject,
  isUndefined: isUndefined$1,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge: merge$1,
  extend: extend$1,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray: toArray$1,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop: noop$1,
  toFiniteNumber,
  findKey,
  global: _global$1,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};
function AxiosError(message, code, config2, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config2 && (this.config = config2);
  request && (this.request = request);
  response && (this.response = response);
}
utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype$1 = AxiosError.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError.from = (error, code, config2, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config2, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index2) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index2, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$2(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match2) {
    return charMap[match2];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name2, value) {
  this._pairs.push([name2, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$2);
  } : encode$2;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode$1(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode$1;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const InterceptorManager$1 = InterceptorManager;
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const hasStandardBrowserEnv = ((product) => {
  return hasBrowserEnv && ["ReactNative", "NativeScript", "NS"].indexOf(product) < 0;
})(typeof navigator !== "undefined" && navigator.product);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data3, options) {
  return toFormData(data3, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name2) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name2).map((match2) => {
    return match2[0] === "[]" ? "" : match2[1] || match2[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target2, index2) {
    let name2 = path[index2++];
    const isNumericKey = Number.isFinite(+name2);
    const isLast = index2 >= path.length;
    name2 = !name2 && utils$1.isArray(target2) ? target2.length : name2;
    if (isLast) {
      if (utils$1.hasOwnProp(target2, name2)) {
        target2[name2] = [target2[name2], value];
      } else {
        target2[name2] = value;
      }
      return !isNumericKey;
    }
    if (!target2[name2] || !utils$1.isObject(target2[name2])) {
      target2[name2] = [];
    }
    const result = buildPath(path, value, target2[name2], index2);
    if (result && utils$1.isArray(target2[name2])) {
      target2[name2] = arrayToObject(target2[name2]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name2, value) => {
      buildPath(parsePropPath(name2), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http"],
  transformRequest: [function transformRequest(data3, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data3);
    if (isObjectPayload && utils$1.isHTMLForm(data3)) {
      data3 = new FormData(data3);
    }
    const isFormData2 = utils$1.isFormData(data3);
    if (isFormData2) {
      if (!hasJSONContentType) {
        return data3;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data3)) : data3;
    }
    if (utils$1.isArrayBuffer(data3) || utils$1.isBuffer(data3) || utils$1.isStream(data3) || utils$1.isFile(data3) || utils$1.isBlob(data3)) {
      return data3;
    }
    if (utils$1.isArrayBufferView(data3)) {
      return data3.buffer;
    }
    if (utils$1.isURLSearchParams(data3)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data3.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data3, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data3)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData(
          isFileList2 ? { "files[]": data3 } : data3,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data3);
    }
    return data3;
  }],
  transformResponse: [function transformResponse(data3) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (data3 && utils$1.isString(data3) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data3);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === "SyntaxError") {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }
    return data3;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const defaults$1 = defaults;
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match2;
  while (match2 = tokensRE.exec(str)) {
    tokens[match2[1]] = match2[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value))
    return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets2) {
    return this.constructor.concat(this, ...targets2);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets2) {
    const computed = new this(first);
    targets2.forEach((target2) => computed.set(target2));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(fns, response) {
  const config2 = this || defaults$1;
  const context = response || config2;
  const headers = AxiosHeaders$1.from(context.headers);
  let data3 = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data3 = fn.call(config2, data3, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data3;
}
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError(message, config2, request) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config2, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
function settle(resolve2, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve2(response);
  } else {
    reject(new AxiosError(
      "Request failed with status code " + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name2, value, expires, path, domain, secure) {
      const cookie = [name2 + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name2) {
      const match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name2 + ")=([^;]*)"));
      return match2 ? decodeURIComponent(match2[3]) : null;
    },
    remove(name2) {
      this.write(name2, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const isURLSameOrigin = platform.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url) {
      let href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      const parsed = utils$1.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return function isURLSameOrigin2() {
      return true;
    };
  }()
);
function parseProtocol(url) {
  const match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match2 && match2[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push2(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return (e) => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data3 = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e
    };
    data3[isDownloadStream ? "download" : "upload"] = true;
    listener(data3);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config2) {
  return new Promise(function dispatchXhrRequest(resolve2, reject) {
    let requestData = config2.data;
    const requestHeaders = AxiosHeaders$1.from(config2.headers).normalize();
    let { responseType, withXSRFToken } = config2;
    let onCanceled;
    function done() {
      if (config2.cancelToken) {
        config2.cancelToken.unsubscribe(onCanceled);
      }
      if (config2.signal) {
        config2.signal.removeEventListener("abort", onCanceled);
      }
    }
    let contentType;
    if (utils$1.isFormData(requestData)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false);
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || "multipart/form-data", ...tokens].join("; "));
      }
    }
    let request = new XMLHttpRequest();
    if (config2.auth) {
      const username = config2.auth.username || "";
      const password = config2.auth.password ? unescape(encodeURIComponent(config2.auth.password)) : "";
      requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
    }
    const fullPath = buildFullPath(config2.baseURL, config2.url);
    request.open(config2.method.toUpperCase(), buildURL(fullPath, config2.params, config2.paramsSerializer), true);
    request.timeout = config2.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config2,
        request
      };
      settle(function _resolve(value) {
        resolve2(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config2, request));
      request = null;
    };
    request.onerror = function handleError2() {
      reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config2, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config2.timeout ? "timeout of " + config2.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = config2.transitional || transitionalDefaults;
      if (config2.timeoutErrorMessage) {
        timeoutErrorMessage = config2.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config2,
        request
      ));
      request = null;
    };
    if (platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config2));
      if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(fullPath)) {
        const xsrfValue = config2.xsrfHeaderName && config2.xsrfCookieName && cookies.read(config2.xsrfCookieName);
        if (xsrfValue) {
          requestHeaders.set(config2.xsrfHeaderName, xsrfValue);
        }
      }
    }
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(config2.withCredentials)) {
      request.withCredentials = !!config2.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = config2.responseType;
    }
    if (typeof config2.onDownloadProgress === "function") {
      request.addEventListener("progress", progressEventReducer(config2.onDownloadProgress, true));
    }
    if (typeof config2.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", progressEventReducer(config2.onUploadProgress));
    }
    if (config2.cancelToken || config2.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config2, request) : cancel);
        request.abort();
        request = null;
      };
      config2.cancelToken && config2.cancelToken.subscribe(onCanceled);
      if (config2.signal) {
        config2.signal.aborted ? onCanceled() : config2.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(fullPath);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config2));
      return;
    }
    request.send(requestData || null);
  });
};
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state2]) => `adapter ${id} ` + (state2 === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested();
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError(null, config2);
  }
}
function dispatchRequest(config2) {
  throwIfCancellationRequested(config2);
  config2.headers = AxiosHeaders$1.from(config2.headers);
  config2.data = transformData.call(
    config2,
    config2.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config2.method) !== -1) {
    config2.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config2.adapter || defaults$1.adapter);
  return adapter(config2).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config2);
    response.data = transformData.call(
      config2,
      config2.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config2);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config2,
          config2.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config3 = {};
  function getMergedValue(target2, source, caseless) {
    if (utils$1.isPlainObject(target2) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target2, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
  });
  return config3;
}
const VERSION = "1.6.2";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version2, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version2 ? " in " + version2 : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version2 && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version2 + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config2) {
    if (typeof configOrUrl === "string") {
      config2 = config2 || {};
      config2.url = configOrUrl;
    } else {
      config2 = configOrUrl || {};
    }
    config2 = mergeConfig(this.defaults, config2);
    const { transitional: transitional2, paramsSerializer, headers } = config2;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config2.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    config2.method = (config2.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config2.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config2.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config2);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config2;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config2) {
    config2 = mergeConfig(this.defaults, config2);
    const fullPath = buildFullPath(config2.baseURL, config2.url);
    return buildURL(fullPath, config2.params, config2.paramsSerializer);
  }
}
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios.prototype[method] = function(url, config2) {
    return this.request(mergeConfig(config2 || {}, {
      method,
      url,
      data: (config2 || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data3, config2) {
      return this.request(mergeConfig(config2 || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data: data3
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
const Axios$1 = Axios;
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve2) {
      resolvePromise = resolve2;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve2) => {
        token.subscribe(resolve2);
        _resolve = resolve2;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config2, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError(message, config2, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
const CancelToken$2 = CancelToken$1;
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios$1 = createInstance(defaults$1);
axios$1.Axios = Axios$1;
axios$1.CanceledError = CanceledError;
axios$1.CancelToken = CancelToken$2;
axios$1.isCancel = isCancel;
axios$1.VERSION = VERSION;
axios$1.toFormData = toFormData;
axios$1.AxiosError = AxiosError;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$1.mergeConfig = mergeConfig;
axios$1.AxiosHeaders = AxiosHeaders$1;
axios$1.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios$1.getAdapter = adapters.getAdapter;
axios$1.HttpStatusCode = HttpStatusCode$1;
axios$1.default = axios$1;
const axiosHttp = axios$1;
const scriptRel = function detectScriptRel() {
  const relList = typeof document !== "undefined" && document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const assetsURL = function(dep, importerUrl) {
  return new URL(dep, importerUrl).href;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  const links = document.getElementsByTagName("link");
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep, importerUrl);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    const isBaseRelative = !!importerUrl;
    if (isBaseRelative) {
      for (let i = links.length - 1; i >= 0; i--) {
        const link2 = links[i];
        if (link2.href === dep && (!isCss || link2.rel === "stylesheet")) {
          return;
        }
      }
    } else if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule()).catch((err) => {
    const e = new Event("vite:preloadError", { cancelable: true });
    e.payload = err;
    window.dispatchEvent(e);
    if (!e.defaultPrevented) {
      throw err;
    }
  });
};
/*!
  * vue-router v3.6.5
  * (c) 2022 Evan You
  * @license MIT
  */
function extend(a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function(c) {
  return "%" + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;
var encode = function(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ",");
};
function decode(str) {
  try {
    return decodeURIComponent(str);
  } catch (err) {
  }
  return str;
}
function resolveQuery(query2, extraQuery, _parseQuery) {
  if (extraQuery === void 0)
    extraQuery = {};
  var parse2 = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse2(query2 || "");
  } catch (e) {
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var value = extraQuery[key];
    parsedQuery[key] = Array.isArray(value) ? value.map(castQueryParamValue) : castQueryParamValue(value);
  }
  return parsedQuery;
}
var castQueryParamValue = function(value) {
  return value == null || typeof value === "object" ? value : String(value);
};
function parseQuery(query2) {
  var res = {};
  query2 = query2.trim().replace(/^(\?|#|&)/, "");
  if (!query2) {
    return res;
  }
  query2.split("&").forEach(function(param) {
    var parts = param.replace(/\+/g, " ").split("=");
    var key = decode(parts.shift());
    var val = parts.length > 0 ? decode(parts.join("=")) : null;
    if (res[key] === void 0) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });
  return res;
}
function stringifyQuery(obj) {
  var res = obj ? Object.keys(obj).map(function(key) {
    var val = obj[key];
    if (val === void 0) {
      return "";
    }
    if (val === null) {
      return encode(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function(val2) {
        if (val2 === void 0) {
          return;
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + "=" + encode(val2));
        }
      });
      return result.join("&");
    }
    return encode(key) + "=" + encode(val);
  }).filter(function(x) {
    return x.length > 0;
  }).join("&") : null;
  return res ? "?" + res : "";
}
var trailingSlashRE = /\/?$/;
function createRoute(record, location, redirectedFrom, router2) {
  var stringifyQuery2 = router2 && router2.options.stringifyQuery;
  var query2 = location.query || {};
  try {
    query2 = clone(query2);
  } catch (e) {
  }
  var route = {
    name: location.name || record && record.name,
    meta: record && record.meta || {},
    path: location.path || "/",
    hash: location.hash || "",
    query: query2,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery2),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery2);
  }
  return Object.freeze(route);
}
function clone(value) {
  if (Array.isArray(value)) {
    return value.map(clone);
  } else if (value && typeof value === "object") {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res;
  } else {
    return value;
  }
}
var START = createRoute(null, {
  path: "/"
});
function formatMatch(record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res;
}
function getFullPath(ref2, _stringifyQuery) {
  var path = ref2.path;
  var query2 = ref2.query;
  if (query2 === void 0)
    query2 = {};
  var hash = ref2.hash;
  if (hash === void 0)
    hash = "";
  var stringify = _stringifyQuery || stringifyQuery;
  return (path || "/") + stringify(query2) + hash;
}
function isSameRoute(a, b, onlyPath) {
  if (b === START) {
    return a === b;
  } else if (!b) {
    return false;
  } else if (a.path && b.path) {
    return a.path.replace(trailingSlashRE, "") === b.path.replace(trailingSlashRE, "") && (onlyPath || a.hash === b.hash && isObjectEqual(a.query, b.query));
  } else if (a.name && b.name) {
    return a.name === b.name && (onlyPath || a.hash === b.hash && isObjectEqual(a.query, b.query) && isObjectEqual(a.params, b.params));
  } else {
    return false;
  }
}
function isObjectEqual(a, b) {
  if (a === void 0)
    a = {};
  if (b === void 0)
    b = {};
  if (!a || !b) {
    return a === b;
  }
  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();
  if (aKeys.length !== bKeys.length) {
    return false;
  }
  return aKeys.every(function(key, i) {
    var aVal = a[key];
    var bKey = bKeys[i];
    if (bKey !== key) {
      return false;
    }
    var bVal = b[key];
    if (aVal == null || bVal == null) {
      return aVal === bVal;
    }
    if (typeof aVal === "object" && typeof bVal === "object") {
      return isObjectEqual(aVal, bVal);
    }
    return String(aVal) === String(bVal);
  });
}
function isIncludedRoute(current, target2) {
  return current.path.replace(trailingSlashRE, "/").indexOf(
    target2.path.replace(trailingSlashRE, "/")
  ) === 0 && (!target2.hash || current.hash === target2.hash) && queryIncludes(current.query, target2.query);
}
function queryIncludes(current, target2) {
  for (var key in target2) {
    if (!(key in current)) {
      return false;
    }
  }
  return true;
}
function handleRouteEntered(route) {
  for (var i = 0; i < route.matched.length; i++) {
    var record = route.matched[i];
    for (var name2 in record.instances) {
      var instance = record.instances[name2];
      var cbs = record.enteredCbs[name2];
      if (!instance || !cbs) {
        continue;
      }
      delete record.enteredCbs[name2];
      for (var i$1 = 0; i$1 < cbs.length; i$1++) {
        if (!instance._isBeingDestroyed) {
          cbs[i$1](instance);
        }
      }
    }
  }
}
var View = {
  name: "RouterView",
  functional: true,
  props: {
    name: {
      type: String,
      default: "default"
    }
  },
  render: function render(_, ref2) {
    var props2 = ref2.props;
    var children2 = ref2.children;
    var parent = ref2.parent;
    var data3 = ref2.data;
    data3.routerView = true;
    var h = parent.$createElement;
    var name2 = props2.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode ? parent.$vnode.data : {};
      if (vnodeData.routerView) {
        depth++;
      }
      if (vnodeData.keepAlive && parent._directInactive && parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data3.routerViewDepth = depth;
    if (inactive) {
      var cachedData = cache[name2];
      var cachedComponent = cachedData && cachedData.component;
      if (cachedComponent) {
        if (cachedData.configProps) {
          fillPropsinData(cachedComponent, data3, cachedData.route, cachedData.configProps);
        }
        return h(cachedComponent, data3, children2);
      } else {
        return h();
      }
    }
    var matched = route.matched[depth];
    var component = matched && matched.components[name2];
    if (!matched || !component) {
      cache[name2] = null;
      return h();
    }
    cache[name2] = { component };
    data3.registerRouteInstance = function(vm, val) {
      var current = matched.instances[name2];
      if (val && current !== vm || !val && current === vm) {
        matched.instances[name2] = val;
      }
    };
    (data3.hook || (data3.hook = {})).prepatch = function(_2, vnode) {
      matched.instances[name2] = vnode.componentInstance;
    };
    data3.hook.init = function(vnode) {
      if (vnode.data.keepAlive && vnode.componentInstance && vnode.componentInstance !== matched.instances[name2]) {
        matched.instances[name2] = vnode.componentInstance;
      }
      handleRouteEntered(route);
    };
    var configProps = matched.props && matched.props[name2];
    if (configProps) {
      extend(cache[name2], {
        route,
        configProps
      });
      fillPropsinData(component, data3, route, configProps);
    }
    return h(component, data3, children2);
  }
};
function fillPropsinData(component, data3, route, configProps) {
  var propsToPass = data3.props = resolveProps(route, configProps);
  if (propsToPass) {
    propsToPass = data3.props = extend({}, propsToPass);
    var attrs2 = data3.attrs = data3.attrs || {};
    for (var key in propsToPass) {
      if (!component.props || !(key in component.props)) {
        attrs2[key] = propsToPass[key];
        delete propsToPass[key];
      }
    }
  }
}
function resolveProps(route, config2) {
  switch (typeof config2) {
    case "undefined":
      return;
    case "object":
      return config2;
    case "function":
      return config2(route);
    case "boolean":
      return config2 ? route.params : void 0;
  }
}
function resolvePath(relative, base, append2) {
  var firstChar = relative.charAt(0);
  if (firstChar === "/") {
    return relative;
  }
  if (firstChar === "?" || firstChar === "#") {
    return base + relative;
  }
  var stack = base.split("/");
  if (!append2 || !stack[stack.length - 1]) {
    stack.pop();
  }
  var segments = relative.replace(/^\//, "").split("/");
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === "..") {
      stack.pop();
    } else if (segment !== ".") {
      stack.push(segment);
    }
  }
  if (stack[0] !== "") {
    stack.unshift("");
  }
  return stack.join("/");
}
function parsePath(path) {
  var hash = "";
  var query2 = "";
  var hashIndex = path.indexOf("#");
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }
  var queryIndex = path.indexOf("?");
  if (queryIndex >= 0) {
    query2 = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }
  return {
    path,
    query: query2,
    hash
  };
}
function cleanPath(path) {
  return path.replace(/\/(?:\s*\/)+/g, "/");
}
var isarray = Array.isArray || function(arr) {
  return Object.prototype.toString.call(arr) == "[object Array]";
};
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  "(\\\\.)",
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"
].join("|"), "g");
function parse(str, options) {
  var tokens = [];
  var key = 0;
  var index2 = 0;
  var path = "";
  var defaultDelimiter = options && options.delimiter || "/";
  var res;
  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index2, offset);
    index2 = offset + m.length;
    if (escaped) {
      path += escaped[1];
      continue;
    }
    var next = str[index2];
    var prefix = res[2];
    var name2 = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];
    if (path) {
      tokens.push(path);
      path = "";
    }
    var partial2 = prefix != null && next != null && next !== prefix;
    var repeat2 = modifier === "+" || modifier === "*";
    var optional = modifier === "?" || modifier === "*";
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;
    tokens.push({
      name: name2 || key++,
      prefix: prefix || "",
      delimiter,
      optional,
      repeat: repeat2,
      partial: partial2,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : asterisk ? ".*" : "[^" + escapeString(delimiter) + "]+?"
    });
  }
  if (index2 < str.length) {
    path += str.substr(index2);
  }
  if (path) {
    tokens.push(path);
  }
  return tokens;
}
function compile(str, options) {
  return tokensToFunction(parse(str, options), options);
}
function encodeURIComponentPretty(str) {
  return encodeURI(str).replace(/[\/?#]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function encodeAsterisk(str) {
  return encodeURI(str).replace(/[?#]/g, function(c) {
    return "%" + c.charCodeAt(0).toString(16).toUpperCase();
  });
}
function tokensToFunction(tokens, options) {
  var matches2 = new Array(tokens.length);
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === "object") {
      matches2[i] = new RegExp("^(?:" + tokens[i].pattern + ")$", flags(options));
    }
  }
  return function(obj, opts) {
    var path = "";
    var data3 = obj || {};
    var options2 = opts || {};
    var encode2 = options2.pretty ? encodeURIComponentPretty : encodeURIComponent;
    for (var i2 = 0; i2 < tokens.length; i2++) {
      var token = tokens[i2];
      if (typeof token === "string") {
        path += token;
        continue;
      }
      var value = data3[token.name];
      var segment;
      if (value == null) {
        if (token.optional) {
          if (token.partial) {
            path += token.prefix;
          }
          continue;
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined');
        }
      }
      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + "`");
        }
        if (value.length === 0) {
          if (token.optional) {
            continue;
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
        }
        for (var j = 0; j < value.length; j++) {
          segment = encode2(value[j]);
          if (!matches2[i2].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + "`");
          }
          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }
        continue;
      }
      segment = token.asterisk ? encodeAsterisk(value) : encode2(value);
      if (!matches2[i2].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
      }
      path += token.prefix + segment;
    }
    return path;
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
}
function escapeGroup(group) {
  return group.replace(/([=!:$\/()])/g, "\\$1");
}
function attachKeys(re, keys) {
  re.keys = keys;
  return re;
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path, keys) {
  var groups = path.source.match(/\((?!\?)/g);
  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }
  return attachKeys(path, keys);
}
function arrayToRegexp(path, keys, options) {
  var parts = [];
  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }
  var regexp = new RegExp("(?:" + parts.join("|") + ")", flags(options));
  return attachKeys(regexp, keys);
}
function stringToRegexp(path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options);
}
function tokensToRegExp(tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */
    keys || options;
    keys = [];
  }
  options = options || {};
  var strict = options.strict;
  var end = options.end !== false;
  var route = "";
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];
    if (typeof token === "string") {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = "(?:" + token.pattern + ")";
      keys.push(token);
      if (token.repeat) {
        capture += "(?:" + prefix + capture + ")*";
      }
      if (token.optional) {
        if (!token.partial) {
          capture = "(?:" + prefix + "(" + capture + "))?";
        } else {
          capture = prefix + "(" + capture + ")?";
        }
      } else {
        capture = prefix + "(" + capture + ")";
      }
      route += capture;
    }
  }
  var delimiter = escapeString(options.delimiter || "/");
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + "(?:" + delimiter + "(?=$))?";
  }
  if (end) {
    route += "$";
  } else {
    route += strict && endsWithDelimiter ? "" : "(?=" + delimiter + "|$)";
  }
  return attachKeys(new RegExp("^" + route, flags(options)), keys);
}
function pathToRegexp(path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */
    keys || options;
    keys = [];
  }
  options = options || {};
  if (path instanceof RegExp) {
    return regexpToRegexp(
      path,
      /** @type {!Array} */
      keys
    );
  }
  if (isarray(path)) {
    return arrayToRegexp(
      /** @type {!Array} */
      path,
      /** @type {!Array} */
      keys,
      options
    );
  }
  return stringToRegexp(
    /** @type {string} */
    path,
    /** @type {!Array} */
    keys,
    options
  );
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;
var regexpCompileCache = /* @__PURE__ */ Object.create(null);
function fillParams(path, params, routeMsg) {
  params = params || {};
  try {
    var filler = regexpCompileCache[path] || (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    if (typeof params.pathMatch === "string") {
      params[0] = params.pathMatch;
    }
    return filler(params, { pretty: true });
  } catch (e) {
    return "";
  } finally {
    delete params[0];
  }
}
function normalizeLocation(raw, current, append2, router2) {
  var next = typeof raw === "string" ? { path: raw } : raw;
  if (next._normalized) {
    return next;
  } else if (next.name) {
    next = extend({}, raw);
    var params = next.params;
    if (params && typeof params === "object") {
      next.params = extend({}, params);
    }
    return next;
  }
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params$1 = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params$1;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params$1, "path " + current.path);
    } else
      ;
    return next;
  }
  var parsedPath = parsePath(next.path || "");
  var basePath = current && current.path || "/";
  var path = parsedPath.path ? resolvePath(parsedPath.path, basePath, append2 || next.append) : basePath;
  var query2 = resolveQuery(
    parsedPath.query,
    next.query,
    router2 && router2.options.parseQuery
  );
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== "#") {
    hash = "#" + hash;
  }
  return {
    _normalized: true,
    path,
    query: query2,
    hash
  };
}
var toTypes = [String, Object];
var eventTypes = [String, Array];
var noop = function() {
};
var Link = {
  name: "RouterLink",
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: "a"
    },
    custom: Boolean,
    exact: Boolean,
    exactPath: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    ariaCurrentValue: {
      type: String,
      default: "page"
    },
    event: {
      type: eventTypes,
      default: "click"
    }
  },
  render: function render2(h) {
    var this$1$1 = this;
    var router2 = this.$router;
    var current = this.$route;
    var ref2 = router2.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref2.location;
    var route = ref2.route;
    var href = ref2.href;
    var classes = {};
    var globalActiveClass = router2.options.linkActiveClass;
    var globalExactActiveClass = router2.options.linkExactActiveClass;
    var activeClassFallback = globalActiveClass == null ? "router-link-active" : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null ? "router-link-exact-active" : globalExactActiveClass;
    var activeClass = this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null ? exactActiveClassFallback : this.exactActiveClass;
    var compareTarget = route.redirectedFrom ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router2) : route;
    classes[exactActiveClass] = isSameRoute(current, compareTarget, this.exactPath);
    classes[activeClass] = this.exact || this.exactPath ? classes[exactActiveClass] : isIncludedRoute(current, compareTarget);
    var ariaCurrentValue = classes[exactActiveClass] ? this.ariaCurrentValue : null;
    var handler = function(e) {
      if (guardEvent(e)) {
        if (this$1$1.replace) {
          router2.replace(location, noop);
        } else {
          router2.push(location, noop);
        }
      }
    };
    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function(e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }
    var data3 = { class: classes };
    var scopedSlot = !this.$scopedSlots.$hasNormal && this.$scopedSlots.default && this.$scopedSlots.default({
      href,
      route,
      navigate: handler,
      isActive: classes[activeClass],
      isExactActive: classes[exactActiveClass]
    });
    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0];
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        return scopedSlot.length === 0 ? h() : h("span", {}, scopedSlot);
      }
    }
    if (this.tag === "a") {
      data3.on = on;
      data3.attrs = { href, "aria-current": ariaCurrentValue };
    } else {
      var a = findAnchor(this.$slots.default);
      if (a) {
        a.isStatic = false;
        var aData = a.data = extend({}, a.data);
        aData.on = aData.on || {};
        for (var event in aData.on) {
          var handler$1 = aData.on[event];
          if (event in on) {
            aData.on[event] = Array.isArray(handler$1) ? handler$1 : [handler$1];
          }
        }
        for (var event$1 in on) {
          if (event$1 in aData.on) {
            aData.on[event$1].push(on[event$1]);
          } else {
            aData.on[event$1] = handler;
          }
        }
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
        aAttrs["aria-current"] = ariaCurrentValue;
      } else {
        data3.on = on;
      }
    }
    return h(this.tag, data3, this.$slots.default);
  }
};
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }
  if (e.defaultPrevented) {
    return;
  }
  if (e.button !== void 0 && e.button !== 0) {
    return;
  }
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target2 = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target2)) {
      return;
    }
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}
function findAnchor(children2) {
  if (children2) {
    var child;
    for (var i = 0; i < children2.length; i++) {
      child = children2[i];
      if (child.tag === "a") {
        return child;
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child;
      }
    }
  }
}
var _Vue;
function install$3(Vue2) {
  if (install$3.installed && _Vue === Vue2) {
    return;
  }
  install$3.installed = true;
  _Vue = Vue2;
  var isDef2 = function(v) {
    return v !== void 0;
  };
  var registerInstance = function(vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef2(i) && isDef2(i = i.data) && isDef2(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };
  Vue2.mixin({
    beforeCreate: function beforeCreate() {
      if (isDef2(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue2.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed() {
      registerInstance(this);
    }
  });
  Object.defineProperty(Vue2.prototype, "$router", {
    get: function get2() {
      return this._routerRoot._router;
    }
  });
  Object.defineProperty(Vue2.prototype, "$route", {
    get: function get2() {
      return this._routerRoot._route;
    }
  });
  Vue2.component("RouterView", View);
  Vue2.component("RouterLink", Link);
  var strats2 = Vue2.config.optionMergeStrategies;
  strats2.beforeRouteEnter = strats2.beforeRouteLeave = strats2.beforeRouteUpdate = strats2.created;
}
var inBrowser$1 = typeof window !== "undefined";
function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap, parentRoute) {
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || /* @__PURE__ */ Object.create(null);
  var nameMap = oldNameMap || /* @__PURE__ */ Object.create(null);
  routes.forEach(function(route) {
    addRouteRecord(pathList, pathMap, nameMap, route, parentRoute);
  });
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === "*") {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }
  return {
    pathList,
    pathMap,
    nameMap
  };
}
function addRouteRecord(pathList, pathMap, nameMap, route, parent, matchAs) {
  var path = route.path;
  var name2 = route.name;
  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);
  if (typeof route.caseSensitive === "boolean") {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }
  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    alias: route.alias ? typeof route.alias === "string" ? [route.alias] : route.alias : [],
    instances: {},
    enteredCbs: {},
    name: name2,
    parent,
    matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null ? {} : route.components ? route.props : { default: route.props }
  };
  if (route.children) {
    route.children.forEach(function(child) {
      var childMatchAs = matchAs ? cleanPath(matchAs + "/" + child.path) : void 0;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }
  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }
  if (route.alias !== void 0) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || "/"
        // matchAs
      );
    }
  }
  if (name2) {
    if (!nameMap[name2]) {
      nameMap[name2] = record;
    }
  }
}
function compileRouteRegex(path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  return regex;
}
function normalizePath(path, parent, strict) {
  if (!strict) {
    path = path.replace(/\/$/, "");
  }
  if (path[0] === "/") {
    return path;
  }
  if (parent == null) {
    return path;
  }
  return cleanPath(parent.path + "/" + path);
}
function createMatcher(routes, router2) {
  var ref2 = createRouteMap(routes);
  var pathList = ref2.pathList;
  var pathMap = ref2.pathMap;
  var nameMap = ref2.nameMap;
  function addRoutes2(routes2) {
    createRouteMap(routes2, pathList, pathMap, nameMap);
  }
  function addRoute2(parentOrRoute, route) {
    var parent = typeof parentOrRoute !== "object" ? nameMap[parentOrRoute] : void 0;
    createRouteMap([route || parentOrRoute], pathList, pathMap, nameMap, parent);
    if (parent && parent.alias.length) {
      createRouteMap(
        // $flow-disable-line route is defined if parent is
        parent.alias.map(function(alias2) {
          return { path: alias2, children: [route] };
        }),
        pathList,
        pathMap,
        nameMap,
        parent
      );
    }
  }
  function getRoutes2() {
    return pathList.map(function(path) {
      return pathMap[path];
    });
  }
  function match2(raw, currentRoute, redirectedFrom) {
    var location = normalizeLocation(raw, currentRoute, false, router2);
    var name2 = location.name;
    if (name2) {
      var record = nameMap[name2];
      if (!record) {
        return _createRoute(null, location);
      }
      var paramNames = record.regex.keys.filter(function(key2) {
        return !key2.optional;
      }).map(function(key2) {
        return key2.name;
      });
      if (typeof location.params !== "object") {
        location.params = {};
      }
      if (currentRoute && typeof currentRoute.params === "object") {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }
      location.path = fillParams(record.path, location.params);
      return _createRoute(record, location, redirectedFrom);
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom);
        }
      }
    }
    return _createRoute(null, location);
  }
  function redirect(record, location) {
    var originalRedirect = record.redirect;
    var redirect2 = typeof originalRedirect === "function" ? originalRedirect(createRoute(record, location, null, router2)) : originalRedirect;
    if (typeof redirect2 === "string") {
      redirect2 = { path: redirect2 };
    }
    if (!redirect2 || typeof redirect2 !== "object") {
      return _createRoute(null, location);
    }
    var re = redirect2;
    var name2 = re.name;
    var path = re.path;
    var query2 = location.query;
    var hash = location.hash;
    var params = location.params;
    query2 = re.hasOwnProperty("query") ? re.query : query2;
    hash = re.hasOwnProperty("hash") ? re.hash : hash;
    params = re.hasOwnProperty("params") ? re.params : params;
    if (name2) {
      nameMap[name2];
      return match2({
        _normalized: true,
        name: name2,
        query: query2,
        hash,
        params
      }, void 0, location);
    } else if (path) {
      var rawPath = resolveRecordPath(path, record);
      var resolvedPath = fillParams(rawPath, params);
      return match2({
        _normalized: true,
        path: resolvedPath,
        query: query2,
        hash
      }, void 0, location);
    } else {
      return _createRoute(null, location);
    }
  }
  function alias(record, location, matchAs) {
    var aliasedPath = fillParams(matchAs, location.params);
    var aliasedMatch = match2({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location);
    }
    return _createRoute(null, location);
  }
  function _createRoute(record, location, redirectedFrom) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location);
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs);
    }
    return createRoute(record, location, redirectedFrom, router2);
  }
  return {
    match: match2,
    addRoute: addRoute2,
    getRoutes: getRoutes2,
    addRoutes: addRoutes2
  };
}
function matchRoute(regex, path, params) {
  var m = path.match(regex);
  if (!m) {
    return false;
  } else if (!params) {
    return true;
  }
  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    if (key) {
      params[key.name || "pathMatch"] = typeof m[i] === "string" ? decode(m[i]) : m[i];
    }
  }
  return true;
}
function resolveRecordPath(path, record) {
  return resolvePath(path, record.parent ? record.parent.path : "/", true);
}
var Time = inBrowser$1 && window.performance && window.performance.now ? window.performance : Date;
function genStateKey() {
  return Time.now().toFixed(3);
}
var _key = genStateKey();
function getStateKey() {
  return _key;
}
function setStateKey(key) {
  return _key = key;
}
var positionStore = /* @__PURE__ */ Object.create(null);
function setupScroll() {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  var protocolAndPath = window.location.protocol + "//" + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, "");
  var stateCopy = extend({}, window.history.state);
  stateCopy.key = getStateKey();
  window.history.replaceState(stateCopy, "", absolutePath);
  window.addEventListener("popstate", handlePopState);
  return function() {
    window.removeEventListener("popstate", handlePopState);
  };
}
function handleScroll(router2, to2, from, isPop) {
  if (!router2.app) {
    return;
  }
  var behavior = router2.options.scrollBehavior;
  if (!behavior) {
    return;
  }
  router2.app.$nextTick(function() {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router2,
      to2,
      from,
      isPop ? position : null
    );
    if (!shouldScroll) {
      return;
    }
    if (typeof shouldScroll.then === "function") {
      shouldScroll.then(function(shouldScroll2) {
        scrollToPosition(shouldScroll2, position);
      }).catch(function(err) {
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}
function saveScrollPosition() {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}
function handlePopState(e) {
  saveScrollPosition();
  if (e.state && e.state.key) {
    setStateKey(e.state.key);
  }
}
function getScrollPosition() {
  var key = getStateKey();
  if (key) {
    return positionStore[key];
  }
}
function getElementPosition(el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  };
}
function isValidPosition(obj) {
  return isNumber(obj.x) || isNumber(obj.y);
}
function normalizePosition(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  };
}
function normalizeOffset(obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  };
}
function isNumber(v) {
  return typeof v === "number";
}
var hashStartsWithNumberRE = /^#\d/;
function scrollToPosition(shouldScroll, position) {
  var isObject2 = typeof shouldScroll === "object";
  if (isObject2 && typeof shouldScroll.selector === "string") {
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) ? document.getElementById(shouldScroll.selector.slice(1)) : document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === "object" ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject2 && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }
  if (position) {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        left: position.x,
        top: position.y,
        // $flow-disable-line
        behavior: shouldScroll.behavior
      });
    } else {
      window.scrollTo(position.x, position.y);
    }
  }
}
var supportsPushState = inBrowser$1 && function() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) && ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Chrome") === -1 && ua.indexOf("Windows Phone") === -1) {
    return false;
  }
  return window.history && typeof window.history.pushState === "function";
}();
function pushState(url, replace2) {
  saveScrollPosition();
  var history = window.history;
  try {
    if (replace2) {
      var stateCopy = extend({}, history.state);
      stateCopy.key = getStateKey();
      history.replaceState(stateCopy, "", url);
    } else {
      history.pushState({ key: setStateKey(genStateKey()) }, "", url);
    }
  } catch (e) {
    window.location[replace2 ? "replace" : "assign"](url);
  }
}
function replaceState(url) {
  pushState(url, true);
}
var NavigationFailureType = {
  redirected: 2,
  aborted: 4,
  cancelled: 8,
  duplicated: 16
};
function createNavigationRedirectedError(from, to2) {
  return createRouterError(
    from,
    to2,
    NavigationFailureType.redirected,
    'Redirected when going from "' + from.fullPath + '" to "' + stringifyRoute(
      to2
    ) + '" via a navigation guard.'
  );
}
function createNavigationDuplicatedError(from, to2) {
  var error = createRouterError(
    from,
    to2,
    NavigationFailureType.duplicated,
    'Avoided redundant navigation to current location: "' + from.fullPath + '".'
  );
  error.name = "NavigationDuplicated";
  return error;
}
function createNavigationCancelledError(from, to2) {
  return createRouterError(
    from,
    to2,
    NavigationFailureType.cancelled,
    'Navigation cancelled from "' + from.fullPath + '" to "' + to2.fullPath + '" with a new navigation.'
  );
}
function createNavigationAbortedError(from, to2) {
  return createRouterError(
    from,
    to2,
    NavigationFailureType.aborted,
    'Navigation aborted from "' + from.fullPath + '" to "' + to2.fullPath + '" via a navigation guard.'
  );
}
function createRouterError(from, to2, type, message) {
  var error = new Error(message);
  error._isRouter = true;
  error.from = from;
  error.to = to2;
  error.type = type;
  return error;
}
var propertiesToLog = ["params", "query", "hash"];
function stringifyRoute(to2) {
  if (typeof to2 === "string") {
    return to2;
  }
  if ("path" in to2) {
    return to2.path;
  }
  var location = {};
  propertiesToLog.forEach(function(key) {
    if (key in to2) {
      location[key] = to2[key];
    }
  });
  return JSON.stringify(location, null, 2);
}
function isError(err) {
  return Object.prototype.toString.call(err).indexOf("Error") > -1;
}
function isNavigationFailure(err, errorType) {
  return isError(err) && err._isRouter && (errorType == null || err.type === errorType);
}
function runQueue(queue2, fn, cb) {
  var step = function(index2) {
    if (index2 >= queue2.length) {
      cb();
    } else {
      if (queue2[index2]) {
        fn(queue2[index2], function() {
          step(index2 + 1);
        });
      } else {
        step(index2 + 1);
      }
    }
  };
  step(0);
}
function resolveAsyncComponents(matched) {
  return function(to2, from, next) {
    var hasAsync = false;
    var pending2 = 0;
    var error = null;
    flatMapComponents(matched, function(def2, _, match2, key) {
      if (typeof def2 === "function" && def2.cid === void 0) {
        hasAsync = true;
        pending2++;
        var resolve2 = once(function(resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          def2.resolved = typeof resolvedDef === "function" ? resolvedDef : _Vue.extend(resolvedDef);
          match2.components[key] = resolvedDef;
          pending2--;
          if (pending2 <= 0) {
            next();
          }
        });
        var reject = once(function(reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          if (!error) {
            error = isError(reason) ? reason : new Error(msg);
            next(error);
          }
        });
        var res;
        try {
          res = def2(resolve2, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === "function") {
            res.then(resolve2, reject);
          } else {
            var comp = res.component;
            if (comp && typeof comp.then === "function") {
              comp.then(resolve2, reject);
            }
          }
        }
      }
    });
    if (!hasAsync) {
      next();
    }
  };
}
function flatMapComponents(matched, fn) {
  return flatten(matched.map(function(m) {
    return Object.keys(m.components).map(function(key) {
      return fn(
        m.components[key],
        m.instances[key],
        m,
        key
      );
    });
  }));
}
function flatten(arr) {
  return Array.prototype.concat.apply([], arr);
}
var hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
function isESModule(obj) {
  return obj.__esModule || hasSymbol && obj[Symbol.toStringTag] === "Module";
}
function once(fn) {
  var called = false;
  return function() {
    var args = [], len = arguments.length;
    while (len--)
      args[len] = arguments[len];
    if (called) {
      return;
    }
    called = true;
    return fn.apply(this, args);
  };
}
var History = function History2(router2, base) {
  this.router = router2;
  this.base = normalizeBase(base);
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
  this.listeners = [];
};
History.prototype.listen = function listen(cb) {
  this.cb = cb;
};
History.prototype.onReady = function onReady(cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};
History.prototype.onError = function onError(errorCb) {
  this.errorCbs.push(errorCb);
};
History.prototype.transitionTo = function transitionTo(location, onComplete, onAbort) {
  var this$1$1 = this;
  var route;
  try {
    route = this.router.match(location, this.current);
  } catch (e) {
    this.errorCbs.forEach(function(cb) {
      cb(e);
    });
    throw e;
  }
  var prev = this.current;
  this.confirmTransition(
    route,
    function() {
      this$1$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1$1.ensureURL();
      this$1$1.router.afterHooks.forEach(function(hook) {
        hook && hook(route, prev);
      });
      if (!this$1$1.ready) {
        this$1$1.ready = true;
        this$1$1.readyCbs.forEach(function(cb) {
          cb(route);
        });
      }
    },
    function(err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1$1.ready) {
        if (!isNavigationFailure(err, NavigationFailureType.redirected) || prev !== START) {
          this$1$1.ready = true;
          this$1$1.readyErrorCbs.forEach(function(cb) {
            cb(err);
          });
        }
      }
    }
  );
};
History.prototype.confirmTransition = function confirmTransition(route, onComplete, onAbort) {
  var this$1$1 = this;
  var current = this.current;
  this.pending = route;
  var abort = function(err) {
    if (!isNavigationFailure(err) && isError(err)) {
      if (this$1$1.errorCbs.length) {
        this$1$1.errorCbs.forEach(function(cb) {
          cb(err);
        });
      } else {
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  var lastRouteIndex = route.matched.length - 1;
  var lastCurrentIndex = current.matched.length - 1;
  if (isSameRoute(route, current) && // in the case the route map has been dynamically appended to
  lastRouteIndex === lastCurrentIndex && route.matched[lastRouteIndex] === current.matched[lastCurrentIndex]) {
    this.ensureURL();
    if (route.hash) {
      handleScroll(this.router, current, route, false);
    }
    return abort(createNavigationDuplicatedError(current, route));
  }
  var ref2 = resolveQueue(
    this.current.matched,
    route.matched
  );
  var updated2 = ref2.updated;
  var deactivated = ref2.deactivated;
  var activated = ref2.activated;
  var queue2 = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated2),
    // in-config enter guards
    activated.map(function(m) {
      return m.beforeEnter;
    }),
    // async components
    resolveAsyncComponents(activated)
  );
  var iterator = function(hook, next) {
    if (this$1$1.pending !== route) {
      return abort(createNavigationCancelledError(current, route));
    }
    try {
      hook(route, current, function(to2) {
        if (to2 === false) {
          this$1$1.ensureURL(true);
          abort(createNavigationAbortedError(current, route));
        } else if (isError(to2)) {
          this$1$1.ensureURL(true);
          abort(to2);
        } else if (typeof to2 === "string" || typeof to2 === "object" && (typeof to2.path === "string" || typeof to2.name === "string")) {
          abort(createNavigationRedirectedError(current, route));
          if (typeof to2 === "object" && to2.replace) {
            this$1$1.replace(to2);
          } else {
            this$1$1.push(to2);
          }
        } else {
          next(to2);
        }
      });
    } catch (e) {
      abort(e);
    }
  };
  runQueue(queue2, iterator, function() {
    var enterGuards = extractEnterGuards(activated);
    var queue3 = enterGuards.concat(this$1$1.router.resolveHooks);
    runQueue(queue3, iterator, function() {
      if (this$1$1.pending !== route) {
        return abort(createNavigationCancelledError(current, route));
      }
      this$1$1.pending = null;
      onComplete(route);
      if (this$1$1.router.app) {
        this$1$1.router.app.$nextTick(function() {
          handleRouteEntered(route);
        });
      }
    });
  });
};
History.prototype.updateRoute = function updateRoute(route) {
  this.current = route;
  this.cb && this.cb(route);
};
History.prototype.setupListeners = function setupListeners() {
};
History.prototype.teardown = function teardown() {
  this.listeners.forEach(function(cleanupListener) {
    cleanupListener();
  });
  this.listeners = [];
  this.current = START;
  this.pending = null;
};
function normalizeBase(base) {
  if (!base) {
    if (inBrowser$1) {
      var baseEl = document.querySelector("base");
      base = baseEl && baseEl.getAttribute("href") || "/";
      base = base.replace(/^https?:\/\/[^\/]+/, "");
    } else {
      base = "/";
    }
  }
  if (base.charAt(0) !== "/") {
    base = "/" + base;
  }
  return base.replace(/\/$/, "");
}
function resolveQueue(current, next) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break;
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  };
}
function extractGuards(records, name2, bind2, reverse) {
  var guards = flatMapComponents(records, function(def2, instance, match2, key) {
    var guard = extractGuard(def2, name2);
    if (guard) {
      return Array.isArray(guard) ? guard.map(function(guard2) {
        return bind2(guard2, instance, match2, key);
      }) : bind2(guard, instance, match2, key);
    }
  });
  return flatten(reverse ? guards.reverse() : guards);
}
function extractGuard(def2, key) {
  if (typeof def2 !== "function") {
    def2 = _Vue.extend(def2);
  }
  return def2.options[key];
}
function extractLeaveGuards(deactivated) {
  return extractGuards(deactivated, "beforeRouteLeave", bindGuard, true);
}
function extractUpdateHooks(updated2) {
  return extractGuards(updated2, "beforeRouteUpdate", bindGuard);
}
function bindGuard(guard, instance) {
  if (instance) {
    return function boundRouteGuard() {
      return guard.apply(instance, arguments);
    };
  }
}
function extractEnterGuards(activated) {
  return extractGuards(
    activated,
    "beforeRouteEnter",
    function(guard, _, match2, key) {
      return bindEnterGuard(guard, match2, key);
    }
  );
}
function bindEnterGuard(guard, match2, key) {
  return function routeEnterGuard(to2, from, next) {
    return guard(to2, from, function(cb) {
      if (typeof cb === "function") {
        if (!match2.enteredCbs[key]) {
          match2.enteredCbs[key] = [];
        }
        match2.enteredCbs[key].push(cb);
      }
      next(cb);
    });
  };
}
var HTML5History = /* @__PURE__ */ function(History3) {
  function HTML5History2(router2, base) {
    History3.call(this, router2, base);
    this._startLocation = getLocation(this.base);
  }
  if (History3)
    HTML5History2.__proto__ = History3;
  HTML5History2.prototype = Object.create(History3 && History3.prototype);
  HTML5History2.prototype.constructor = HTML5History2;
  HTML5History2.prototype.setupListeners = function setupListeners2() {
    var this$1$1 = this;
    if (this.listeners.length > 0) {
      return;
    }
    var router2 = this.router;
    var expectScroll = router2.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;
    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }
    var handleRoutingEvent = function() {
      var current = this$1$1.current;
      var location = getLocation(this$1$1.base);
      if (this$1$1.current === START && location === this$1$1._startLocation) {
        return;
      }
      this$1$1.transitionTo(location, function(route) {
        if (supportsScroll) {
          handleScroll(router2, route, current, true);
        }
      });
    };
    window.addEventListener("popstate", handleRoutingEvent);
    this.listeners.push(function() {
      window.removeEventListener("popstate", handleRoutingEvent);
    });
  };
  HTML5History2.prototype.go = function go2(n) {
    window.history.go(n);
  };
  HTML5History2.prototype.push = function push2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref2 = this;
    var fromRoute = ref2.current;
    this.transitionTo(location, function(route) {
      pushState(cleanPath(this$1$1.base + route.fullPath));
      handleScroll(this$1$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };
  HTML5History2.prototype.replace = function replace2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref2 = this;
    var fromRoute = ref2.current;
    this.transitionTo(location, function(route) {
      replaceState(cleanPath(this$1$1.base + route.fullPath));
      handleScroll(this$1$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };
  HTML5History2.prototype.ensureURL = function ensureURL(push2) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push2 ? pushState(current) : replaceState(current);
    }
  };
  HTML5History2.prototype.getCurrentLocation = function getCurrentLocation() {
    return getLocation(this.base);
  };
  return HTML5History2;
}(History);
function getLocation(base) {
  var path = window.location.pathname;
  var pathLowerCase = path.toLowerCase();
  var baseLowerCase = base.toLowerCase();
  if (base && (pathLowerCase === baseLowerCase || pathLowerCase.indexOf(cleanPath(baseLowerCase + "/")) === 0)) {
    path = path.slice(base.length);
  }
  return (path || "/") + window.location.search + window.location.hash;
}
var HashHistory = /* @__PURE__ */ function(History3) {
  function HashHistory2(router2, base, fallback) {
    History3.call(this, router2, base);
    if (fallback && checkFallback(this.base)) {
      return;
    }
    ensureSlash();
  }
  if (History3)
    HashHistory2.__proto__ = History3;
  HashHistory2.prototype = Object.create(History3 && History3.prototype);
  HashHistory2.prototype.constructor = HashHistory2;
  HashHistory2.prototype.setupListeners = function setupListeners2() {
    var this$1$1 = this;
    if (this.listeners.length > 0) {
      return;
    }
    var router2 = this.router;
    var expectScroll = router2.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;
    if (supportsScroll) {
      this.listeners.push(setupScroll());
    }
    var handleRoutingEvent = function() {
      var current = this$1$1.current;
      if (!ensureSlash()) {
        return;
      }
      this$1$1.transitionTo(getHash(), function(route) {
        if (supportsScroll) {
          handleScroll(this$1$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    };
    var eventType = supportsPushState ? "popstate" : "hashchange";
    window.addEventListener(
      eventType,
      handleRoutingEvent
    );
    this.listeners.push(function() {
      window.removeEventListener(eventType, handleRoutingEvent);
    });
  };
  HashHistory2.prototype.push = function push2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref2 = this;
    var fromRoute = ref2.current;
    this.transitionTo(
      location,
      function(route) {
        pushHash(route.fullPath);
        handleScroll(this$1$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  HashHistory2.prototype.replace = function replace2(location, onComplete, onAbort) {
    var this$1$1 = this;
    var ref2 = this;
    var fromRoute = ref2.current;
    this.transitionTo(
      location,
      function(route) {
        replaceHash(route.fullPath);
        handleScroll(this$1$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  HashHistory2.prototype.go = function go2(n) {
    window.history.go(n);
  };
  HashHistory2.prototype.ensureURL = function ensureURL(push2) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push2 ? pushHash(current) : replaceHash(current);
    }
  };
  HashHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
    return getHash();
  };
  return HashHistory2;
}(History);
function checkFallback(base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + "/#" + location));
    return true;
  }
}
function ensureSlash() {
  var path = getHash();
  if (path.charAt(0) === "/") {
    return true;
  }
  replaceHash("/" + path);
  return false;
}
function getHash() {
  var href = window.location.href;
  var index2 = href.indexOf("#");
  if (index2 < 0) {
    return "";
  }
  href = href.slice(index2 + 1);
  return href;
}
function getUrl(path) {
  var href = window.location.href;
  var i = href.indexOf("#");
  var base = i >= 0 ? href.slice(0, i) : href;
  return base + "#" + path;
}
function pushHash(path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}
function replaceHash(path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}
var AbstractHistory = /* @__PURE__ */ function(History3) {
  function AbstractHistory2(router2, base) {
    History3.call(this, router2, base);
    this.stack = [];
    this.index = -1;
  }
  if (History3)
    AbstractHistory2.__proto__ = History3;
  AbstractHistory2.prototype = Object.create(History3 && History3.prototype);
  AbstractHistory2.prototype.constructor = AbstractHistory2;
  AbstractHistory2.prototype.push = function push2(location, onComplete, onAbort) {
    var this$1$1 = this;
    this.transitionTo(
      location,
      function(route) {
        this$1$1.stack = this$1$1.stack.slice(0, this$1$1.index + 1).concat(route);
        this$1$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  AbstractHistory2.prototype.replace = function replace2(location, onComplete, onAbort) {
    var this$1$1 = this;
    this.transitionTo(
      location,
      function(route) {
        this$1$1.stack = this$1$1.stack.slice(0, this$1$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };
  AbstractHistory2.prototype.go = function go2(n) {
    var this$1$1 = this;
    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return;
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function() {
        var prev = this$1$1.current;
        this$1$1.index = targetIndex;
        this$1$1.updateRoute(route);
        this$1$1.router.afterHooks.forEach(function(hook) {
          hook && hook(route, prev);
        });
      },
      function(err) {
        if (isNavigationFailure(err, NavigationFailureType.duplicated)) {
          this$1$1.index = targetIndex;
        }
      }
    );
  };
  AbstractHistory2.prototype.getCurrentLocation = function getCurrentLocation() {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : "/";
  };
  AbstractHistory2.prototype.ensureURL = function ensureURL() {
  };
  return AbstractHistory2;
}(History);
var VueRouter = function VueRouter2(options) {
  if (options === void 0)
    options = {};
  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);
  var mode = options.mode || "hash";
  this.fallback = mode === "history" && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = "hash";
  }
  if (!inBrowser$1) {
    mode = "abstract";
  }
  this.mode = mode;
  switch (mode) {
    case "history":
      this.history = new HTML5History(this, options.base);
      break;
    case "hash":
      this.history = new HashHistory(this, options.base, this.fallback);
      break;
    case "abstract":
      this.history = new AbstractHistory(this, options.base);
      break;
  }
};
var prototypeAccessors$2 = { currentRoute: { configurable: true } };
VueRouter.prototype.match = function match(raw, current, redirectedFrom) {
  return this.matcher.match(raw, current, redirectedFrom);
};
prototypeAccessors$2.currentRoute.get = function() {
  return this.history && this.history.current;
};
VueRouter.prototype.init = function init(app) {
  var this$1$1 = this;
  this.apps.push(app);
  app.$once("hook:destroyed", function() {
    var index2 = this$1$1.apps.indexOf(app);
    if (index2 > -1) {
      this$1$1.apps.splice(index2, 1);
    }
    if (this$1$1.app === app) {
      this$1$1.app = this$1$1.apps[0] || null;
    }
    if (!this$1$1.app) {
      this$1$1.history.teardown();
    }
  });
  if (this.app) {
    return;
  }
  this.app = app;
  var history = this.history;
  if (history instanceof HTML5History || history instanceof HashHistory) {
    var handleInitialScroll = function(routeOrError) {
      var from = history.current;
      var expectScroll = this$1$1.options.scrollBehavior;
      var supportsScroll = supportsPushState && expectScroll;
      if (supportsScroll && "fullPath" in routeOrError) {
        handleScroll(this$1$1, routeOrError, from, false);
      }
    };
    var setupListeners2 = function(routeOrError) {
      history.setupListeners();
      handleInitialScroll(routeOrError);
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupListeners2,
      setupListeners2
    );
  }
  history.listen(function(route) {
    this$1$1.apps.forEach(function(app2) {
      app2._route = route;
    });
  });
};
VueRouter.prototype.beforeEach = function beforeEach(fn) {
  return registerHook(this.beforeHooks, fn);
};
VueRouter.prototype.beforeResolve = function beforeResolve(fn) {
  return registerHook(this.resolveHooks, fn);
};
VueRouter.prototype.afterEach = function afterEach(fn) {
  return registerHook(this.afterHooks, fn);
};
VueRouter.prototype.onReady = function onReady2(cb, errorCb) {
  this.history.onReady(cb, errorCb);
};
VueRouter.prototype.onError = function onError2(errorCb) {
  this.history.onError(errorCb);
};
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  var this$1$1 = this;
  if (!onComplete && !onAbort && typeof Promise !== "undefined") {
    return new Promise(function(resolve2, reject) {
      this$1$1.history.push(location, resolve2, reject);
    });
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};
VueRouter.prototype.replace = function replace(location, onComplete, onAbort) {
  var this$1$1 = this;
  if (!onComplete && !onAbort && typeof Promise !== "undefined") {
    return new Promise(function(resolve2, reject) {
      this$1$1.history.replace(location, resolve2, reject);
    });
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};
VueRouter.prototype.go = function go(n) {
  this.history.go(n);
};
VueRouter.prototype.back = function back() {
  this.go(-1);
};
VueRouter.prototype.forward = function forward() {
  this.go(1);
};
VueRouter.prototype.getMatchedComponents = function getMatchedComponents(to2) {
  var route = to2 ? to2.matched ? to2 : this.resolve(to2).route : this.currentRoute;
  if (!route) {
    return [];
  }
  return [].concat.apply(
    [],
    route.matched.map(function(m) {
      return Object.keys(m.components).map(function(key) {
        return m.components[key];
      });
    })
  );
};
VueRouter.prototype.resolve = function resolve(to2, current, append2) {
  current = current || this.history.current;
  var location = normalizeLocation(to2, current, append2, this);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location,
    route,
    href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  };
};
VueRouter.prototype.getRoutes = function getRoutes() {
  return this.matcher.getRoutes();
};
VueRouter.prototype.addRoute = function addRoute(parentOrRoute, route) {
  this.matcher.addRoute(parentOrRoute, route);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};
VueRouter.prototype.addRoutes = function addRoutes(routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};
Object.defineProperties(VueRouter.prototype, prototypeAccessors$2);
var VueRouter$1 = VueRouter;
function registerHook(list, fn) {
  list.push(fn);
  return function() {
    var i = list.indexOf(fn);
    if (i > -1) {
      list.splice(i, 1);
    }
  };
}
function createHref(base, fullPath, mode) {
  var path = mode === "hash" ? "#" + fullPath : fullPath;
  return base ? cleanPath(base + "/" + path) : path;
}
VueRouter.install = install$3;
VueRouter.version = "3.6.5";
VueRouter.isNavigationFailure = isNavigationFailure;
VueRouter.NavigationFailureType = NavigationFailureType;
VueRouter.START_LOCATION = START;
if (inBrowser$1 && window.Vue) {
  window.Vue.use(VueRouter);
}
Vue$1.use(VueRouter$1);
const router = new VueRouter$1({
  mode: "history",
  base: "./",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => __vitePreload(() => import("./Home-306cf635.js"), true ? ["./Home-306cf635.js","./Home-bbfa96b7.css"] : void 0, import.meta.url),
      meta: {
        layout: "Home"
      }
    },
    {
      path: "/summoner/:region/:name",
      name: "summoner",
      component: () => __vitePreload(() => import("./Summoner-b60e5ec0.js"), true ? ["./Summoner-b60e5ec0.js","./liveGame-298aec0b.js","./Ripple-31b574bb.js","./Summoner-8d1651b8.css"] : void 0, import.meta.url),
      meta: {
        season: true
      }
    },
    {
      path: "/summoner/:region/:name/champions",
      name: "summonerChampions",
      component: () => __vitePreload(() => import("./SummonerChampions-75b99991.js"), true ? ["./SummonerChampions-75b99991.js","./Ripple-31b574bb.js","./SummonerChampions-e9e6cf77.css"] : void 0, import.meta.url),
      meta: {
        season: true
      }
    },
    {
      path: "/summoner/:region/:name/records",
      name: "summonerRecords",
      component: () => __vitePreload(() => import("./SummonerRecords-c35e5875.js"), true ? ["./SummonerRecords-c35e5875.js","./SummonerRecords-19a4d378.css"] : void 0, import.meta.url),
      meta: {
        season: true
      }
    },
    {
      path: "/summoner/:region/:name/live",
      name: "summonerLive",
      component: () => __vitePreload(() => import("./SummonerLive-c60f5cda.js"), true ? ["./SummonerLive-c60f5cda.js","./liveGame-298aec0b.js","./SummonerLive-4c5a2eee.css"] : void 0, import.meta.url)
    },
    {
      path: "/summoner/:region/:name/test",
      name: "summonerTest",
      component: () => __vitePreload(() => import("./SummonerTest-87d64510.js"), true ? ["./SummonerTest-87d64510.js","./Test-5830332e.js"] : void 0, import.meta.url)
    },
    {
      path: "/summoner/:region/:name/runeimport",
      name: "summonerRunes",
      component: () => __vitePreload(() => import("./SummonerRunes-bf4cf4da.js"), true ? ["./SummonerRunes-bf4cf4da.js","./Test-5830332e.js"] : void 0, import.meta.url)
    }
  ]
});
router.beforeEach((to2, from, next) => {
  if (to2.params.name !== from.params.name && from.name !== null) {
    const axiosCancel = axios.defaults.axiosSource.cancel;
    axiosCancel("Summoner changed");
    const CancelToken3 = axios.CancelToken;
    const axiosSource2 = CancelToken3.source();
    axios.defaults.axiosSource = axiosSource2;
    axios.defaults.cancelToken = axiosSource2.token;
  }
  next();
});
/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */
function applyMixin(Vue2) {
  var version2 = Number(Vue2.version.split(".")[0]);
  if (version2 >= 2) {
    Vue2.mixin({ beforeCreate: vuexInit });
  } else {
    var _init = Vue2.prototype._init;
    Vue2.prototype._init = function(options) {
      if (options === void 0)
        options = {};
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }
  function vuexInit() {
    var options = this.$options;
    if (options.store) {
      this.$store = typeof options.store === "function" ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}
var target = typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;
function devtoolPlugin(store2) {
  if (!devtoolHook) {
    return;
  }
  store2._devtoolHook = devtoolHook;
  devtoolHook.emit("vuex:init", store2);
  devtoolHook.on("vuex:travel-to-state", function(targetState) {
    store2.replaceState(targetState);
  });
  store2.subscribe(function(mutation, state2) {
    devtoolHook.emit("vuex:mutation", mutation, state2);
  }, { prepend: true });
  store2.subscribeAction(function(action, state2) {
    devtoolHook.emit("vuex:action", action, state2);
  }, { prepend: true });
}
function find$1(list, f) {
  return list.filter(f)[0];
}
function deepCopy(obj, cache) {
  if (cache === void 0)
    cache = [];
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  var hit = find$1(cache, function(c) {
    return c.original === obj;
  });
  if (hit) {
    return hit.copy;
  }
  var copy = Array.isArray(obj) ? [] : {};
  cache.push({
    original: obj,
    copy
  });
  Object.keys(obj).forEach(function(key) {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
}
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    return fn(obj[key], key);
  });
}
function isObject$1(obj) {
  return obj !== null && typeof obj === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors = { namespaced: { configurable: true } };
prototypeAccessors.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module) {
  this._children[key] = module;
};
Module.prototype.removeChild = function removeChild2(key) {
  delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};
Module.prototype.update = function update(rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};
Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};
Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get(path) {
  return path.reduce(function(module, key) {
    return module.getChild(key);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module = this.root;
  return path.reduce(function(namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0)
    runtime = true;
  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (parent) {
    return parent.hasChild(key);
  }
  return false;
};
function update2(path, targetModule, newModule) {
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        return;
      }
      update2(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}
var Vue;
var Store = function Store2(options) {
  var this$1$1 = this;
  if (options === void 0)
    options = {};
  if (!Vue && typeof window !== "undefined" && window.Vue) {
    install$2(window.Vue);
  }
  var plugins = options.plugins;
  if (plugins === void 0)
    plugins = [];
  var strict = options.strict;
  if (strict === void 0)
    strict = false;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var store2 = this;
  var ref2 = this;
  var dispatch2 = ref2.dispatch;
  var commit2 = ref2.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store2, type, payload);
  };
  this.commit = function boundCommit(type, payload, options2) {
    return commit2.call(store2, type, payload, options2);
  };
  this.strict = strict;
  var state2 = this._modules.root.state;
  installModule(this, state2, [], this._modules.root);
  resetStoreVM(this, state2);
  plugins.forEach(function(plugin) {
    return plugin(this$1$1);
  });
  var useDevtools = options.devtools !== void 0 ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};
var prototypeAccessors$1 = { state: { configurable: true } };
prototypeAccessors$1.state.get = function() {
  return this._vm._data.$$state;
};
prototypeAccessors$1.state.set = function(v) {
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload, _options);
  var type = ref2.type;
  var payload = ref2.payload;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload);
  var type = ref2.type;
  var payload = ref2.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e) {
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve2, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e) {
      }
      resolve2(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e) {
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch(getter, cb, options) {
  var this$1$1 = this;
  return this._watcherVM.$watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, options);
};
Store.prototype.replaceState = function replaceState2(state2) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._vm._data.$$state = state2;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0)
    options = {};
  if (typeof path === "string") {
    path = [path];
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  resetStoreVM(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors$1);
function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
function resetStore(store2, hot) {
  store2._actions = /* @__PURE__ */ Object.create(null);
  store2._mutations = /* @__PURE__ */ Object.create(null);
  store2._wrappedGetters = /* @__PURE__ */ Object.create(null);
  store2._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var state2 = store2.state;
  installModule(store2, state2, [], store2._modules.root, true);
  resetStoreVM(store2, state2, hot);
}
function resetStoreVM(store2, state2, hot) {
  var oldVm = store2._vm;
  store2.getters = {};
  store2._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store2._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function(fn, key) {
    computed[key] = partial(fn, store2);
    Object.defineProperty(store2.getters, key, {
      get: function() {
        return store2._vm[key];
      },
      enumerable: true
      // for local getters
    });
  });
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store2._vm = new Vue({
    data: {
      $$state: state2
    },
    computed
  });
  Vue.config.silent = silent;
  if (store2.strict) {
    enableStrictMode(store2);
  }
  if (oldVm) {
    if (hot) {
      store2._withCommit(function() {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function() {
      return oldVm.$destroy();
    });
  }
}
function installModule(store2, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store2._modules.getNamespace(path);
  if (module.namespaced) {
    if (store2._modulesNamespaceMap[namespace] && false) {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
    }
    store2._modulesNamespaceMap[namespace] = module;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store2._withCommit(function() {
      Vue.set(parentState, moduleName, module.state);
    });
  }
  var local = module.context = makeLocalContext(store2, namespace, path);
  module.forEachMutation(function(mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store2, namespacedType, mutation, local);
  });
  module.forEachAction(function(action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store2, type, handler, local);
  });
  module.forEachGetter(function(getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store2, namespacedType, getter, local);
  });
  module.forEachChild(function(child, key) {
    installModule(store2, rootState, path.concat(key), child, hot);
  });
}
function makeLocalContext(store2, namespace, path) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store2.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
      }
      return store2.dispatch(type, payload);
    },
    commit: noNamespace ? store2.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
      }
      store2.commit(type, payload, options);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store2.getters;
      } : function() {
        return makeLocalGetters(store2, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store2.state, path);
      }
    }
  });
  return local;
}
function makeLocalGetters(store2, namespace) {
  if (!store2._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store2.getters).forEach(function(type) {
      if (type.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store2.getters[type];
        },
        enumerable: true
      });
    });
    store2._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store2._makeLocalGettersCache[namespace];
}
function registerMutation(store2, type, handler, local) {
  var entry = store2._mutations[type] || (store2._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store2, local.state, payload);
  });
}
function registerAction(store2, type, handler, local) {
  var entry = store2._actions[type] || (store2._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    var res = handler.call(store2, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store2.getters,
      rootState: store2.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store2._devtoolHook) {
      return res.catch(function(err) {
        store2._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store2, type, rawGetter, local) {
  if (store2._wrappedGetters[type]) {
    return;
  }
  store2._wrappedGetters[type] = function wrappedGetter(store3) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store3.state,
      // root state
      store3.getters
      // root getters
    );
  };
}
function enableStrictMode(store2) {
  store2._vm.$watch(function() {
    return this._data.$$state;
  }, function() {
  }, { deep: true, sync: true });
}
function getNestedState(state2, path) {
  return path.reduce(function(state3, key) {
    return state3[key];
  }, state2);
}
function unifyObjectStyle(type, payload, options) {
  if (isObject$1(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }
  return { type, payload, options };
}
function install$2(_Vue2) {
  if (Vue && _Vue2 === Vue) {
    return;
  }
  Vue = _Vue2;
  applyMixin(Vue);
}
var mapState = normalizeNamespace(function(namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function(ref2) {
    var key = ref2.key;
    var val = ref2.val;
    res[key] = function mappedState() {
      var state2 = this.$store.state;
      var getters2 = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, "mapState", namespace);
        if (!module) {
          return;
        }
        state2 = module.context.state;
        getters2 = module.context.getters;
      }
      return typeof val === "function" ? val.call(this, state2, getters2) : state2[val];
    };
    res[key].vuex = true;
  });
  return res;
});
var mapMutations = normalizeNamespace(function(namespace, mutations2) {
  var res = {};
  normalizeMap(mutations2).forEach(function(ref2) {
    var key = ref2.key;
    var val = ref2.val;
    res[key] = function mappedMutation() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var commit2 = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, "mapMutations", namespace);
        if (!module) {
          return;
        }
        commit2 = module.context.commit;
      }
      return typeof val === "function" ? val.apply(this, [commit2].concat(args)) : commit2.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
var mapGetters = normalizeNamespace(function(namespace, getters2) {
  var res = {};
  normalizeMap(getters2).forEach(function(ref2) {
    var key = ref2.key;
    var val = ref2.val;
    val = namespace + val;
    res[key] = function mappedGetter() {
      if (namespace && !getModuleByNamespace(this.$store, "mapGetters", namespace)) {
        return;
      }
      return this.$store.getters[val];
    };
    res[key].vuex = true;
  });
  return res;
});
var mapActions = normalizeNamespace(function(namespace, actions2) {
  var res = {};
  normalizeMap(actions2).forEach(function(ref2) {
    var key = ref2.key;
    var val = ref2.val;
    res[key] = function mappedAction() {
      var args = [], len = arguments.length;
      while (len--)
        args[len] = arguments[len];
      var dispatch2 = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, "mapActions", namespace);
        if (!module) {
          return;
        }
        dispatch2 = module.context.dispatch;
      }
      return typeof val === "function" ? val.apply(this, [dispatch2].concat(args)) : dispatch2.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});
var createNamespacedHelpers = function(namespace) {
  return {
    mapState: mapState.bind(null, namespace),
    mapGetters: mapGetters.bind(null, namespace),
    mapMutations: mapMutations.bind(null, namespace),
    mapActions: mapActions.bind(null, namespace)
  };
};
function normalizeMap(map) {
  if (!isValidMap(map)) {
    return [];
  }
  return Array.isArray(map) ? map.map(function(key) {
    return { key, val: key };
  }) : Object.keys(map).map(function(key) {
    return { key, val: map[key] };
  });
}
function isValidMap(map) {
  return Array.isArray(map) || isObject$1(map);
}
function normalizeNamespace(fn) {
  return function(namespace, map) {
    if (typeof namespace !== "string") {
      map = namespace;
      namespace = "";
    } else if (namespace.charAt(namespace.length - 1) !== "/") {
      namespace += "/";
    }
    return fn(namespace, map);
  };
}
function getModuleByNamespace(store2, helper, namespace) {
  var module = store2._modulesNamespaceMap[namespace];
  return module;
}
function createLogger(ref2) {
  if (ref2 === void 0)
    ref2 = {};
  var collapsed = ref2.collapsed;
  if (collapsed === void 0)
    collapsed = true;
  var filter2 = ref2.filter;
  if (filter2 === void 0)
    filter2 = function(mutation, stateBefore, stateAfter) {
      return true;
    };
  var transformer = ref2.transformer;
  if (transformer === void 0)
    transformer = function(state2) {
      return state2;
    };
  var mutationTransformer = ref2.mutationTransformer;
  if (mutationTransformer === void 0)
    mutationTransformer = function(mut) {
      return mut;
    };
  var actionFilter = ref2.actionFilter;
  if (actionFilter === void 0)
    actionFilter = function(action, state2) {
      return true;
    };
  var actionTransformer = ref2.actionTransformer;
  if (actionTransformer === void 0)
    actionTransformer = function(act) {
      return act;
    };
  var logMutations = ref2.logMutations;
  if (logMutations === void 0)
    logMutations = true;
  var logActions = ref2.logActions;
  if (logActions === void 0)
    logActions = true;
  var logger = ref2.logger;
  if (logger === void 0)
    logger = console;
  return function(store2) {
    var prevState = deepCopy(store2.state);
    if (typeof logger === "undefined") {
      return;
    }
    if (logMutations) {
      store2.subscribe(function(mutation, state2) {
        var nextState = deepCopy(state2);
        if (filter2(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + mutation.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log("%c prev state", "color: #9E9E9E; font-weight: bold", transformer(prevState));
          logger.log("%c mutation", "color: #03A9F4; font-weight: bold", formattedMutation);
          logger.log("%c next state", "color: #4CAF50; font-weight: bold", transformer(nextState));
          endMessage(logger);
        }
        prevState = nextState;
      });
    }
    if (logActions) {
      store2.subscribeAction(function(action, state2) {
        if (actionFilter(action, state2)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + action.type + formattedTime;
          startMessage(logger, message, collapsed);
          logger.log("%c action", "color: #03A9F4; font-weight: bold", formattedAction);
          endMessage(logger);
        }
      });
    }
  };
}
function startMessage(logger, message, collapsed) {
  var startMessage2 = collapsed ? logger.groupCollapsed : logger.group;
  try {
    startMessage2.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}
function endMessage(logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log("—— log end ——");
  }
}
function getFormattedTime() {
  var time = /* @__PURE__ */ new Date();
  return " @ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
}
function repeat(str, times) {
  return new Array(times + 1).join(str);
}
function pad(num, maxLength) {
  return repeat("0", maxLength - num.toString().length) + num;
}
var index$2 = {
  Store,
  install: install$2,
  version: "3.6.2",
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  createLogger
};
const Vuex = index$2;
const namespaced$4 = true;
const state$4 = {
  kStats: [
    [5008, 5005, 5007],
    [5008, 5002, 5003],
    [5001, 5002, 5003]
  ],
  runes: null,
  runesOpen: false,
  selectedRunes: {}
};
const mutations$4 = {
  DISPLAY_RUNES(state2, selectedRunes) {
    state2.runesOpen = true;
    state2.selectedRunes = selectedRunes;
  },
  HIDE_RUNES(state2) {
    state2.runesOpen = false;
  },
  SET_RUNES(state2, runes) {
    state2.runes = runes;
  }
};
const actions$4 = {
  displayRunes({ commit: commit2 }, selectedRunes) {
    commit2("DISPLAY_RUNES", selectedRunes);
    console.log("SelectedRunes:", selectedRunes);
  },
  hideRunes({ commit: commit2 }) {
    commit2("HIDE_RUNES");
  },
  async getRunes({ commit: commit2, getters: getters2 }) {
    if (getters2.runesLoaded) {
      return;
    }
    const { data: data3 } = await axios.get("cdragon/runes").catch((e) => {
    });
    console.log("All Runes:", data3);
    commit2("SET_RUNES", data3);
  }
};
const getters$2 = {
  runesLoaded: (state2) => state2.runes
};
const cdragon = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actions: actions$4,
  getters: getters$2,
  mutations: mutations$4,
  namespaced: namespaced$4,
  state: state$4
}, Symbol.toStringTag, { value: "Module" }));
const namespaced$3 = true;
const state$3 = {
  matches: []
};
const mutations$3 = {
  MATCH_LOADING(state2, matchId) {
    const alreadyIn = state2.matches.find((m) => m.matchId === matchId);
    if (!alreadyIn) {
      state2.matches.push({ matchId, status: "loading" });
    }
  },
  MATCH_FOUND(state2, { matchDetails, ranksLoaded }) {
    matchDetails.status = "loaded";
    matchDetails.ranksLoaded = ranksLoaded;
    if (ranksLoaded) {
      for (const player of matchDetails.blueTeam.players) {
        player.rank = player.rank && player.rank[420];
      }
      for (const player of matchDetails.redTeam.players) {
        player.rank = player.rank && player.rank[420];
      }
    }
    const index2 = state2.matches.findIndex((m) => m.matchId === matchDetails.matchId);
    Vue$1.set(state2.matches, index2, matchDetails);
  },
  MATCH_RANKS_FOUND(state2, { matchId, ranksByPlayer }) {
    const match2 = state2.matches.find((m) => m.matchId === matchId);
    for (const player of match2.blueTeam.players) {
      const ranks = ranksByPlayer[player.id];
      if (!ranks)
        continue;
      Vue$1.set(player, "rank", ranks[420]);
    }
    for (const player of match2.redTeam.players) {
      const ranks = ranksByPlayer[player.id];
      if (!ranks)
        continue;
      Vue$1.set(player, "rank", ranks[420]);
    }
    match2.ranksLoaded = true;
  }
};
const actions$3 = {
  async matchDetails({ commit: commit2 }, matchId) {
    commit2("MATCH_LOADING", matchId);
    const resp = await axios({ url: "match/details", data: { matchId }, method: "POST" }).catch(
      () => {
      }
    );
    const { matchDetails, ranksLoaded } = resp.data;
    commit2("MATCH_FOUND", { matchDetails, ranksLoaded });
    if (!ranksLoaded) {
      const ranks = await axios({
        url: "match/details/ranks",
        data: { matchId },
        method: "POST"
      }).catch(() => {
      });
      if (!ranks)
        return;
      commit2("MATCH_RANKS_FOUND", { matchId, ranksByPlayer: ranks.data });
    }
  }
};
const getters$1 = {
  getMatchDetails: (state2) => (matchId) => state2.matches.find((m) => m.matchId === matchId)
};
const detailedMatch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actions: actions$3,
  getters: getters$1,
  mutations: mutations$3,
  namespaced: namespaced$3,
  state: state$3
}, Symbol.toStringTag, { value: "Module" }));
const namespaced$2 = true;
const state$2 = {
  notifications: []
};
let nextId = 1;
const mutations$2 = {
  PUSH(state2, notification2) {
    state2.notifications.push({
      ...notification2,
      id: nextId++
    });
  },
  DELETE(state2, notificationToRemove) {
    state2.notifications = state2.notifications.filter(
      (notification2) => notification2.id !== notificationToRemove.id
    );
  }
};
const actions$2 = {
  add({ commit: commit2 }, notification2) {
    commit2("PUSH", notification2);
  },
  remove({ commit: commit2 }, notificationToRemove) {
    commit2("DELETE", notificationToRemove);
  }
};
const notification = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actions: actions$2,
  mutations: mutations$2,
  namespaced: namespaced$2,
  state: state$2
}, Symbol.toStringTag, { value: "Module" }));
const namespaced$1 = true;
const state$1 = {
  favorites: [],
  percent: false,
  recentSearches: [],
  region: "euw"
};
const mutations$1 = {
  ADD_FAVORITE(state2, summoner2) {
    state2.favorites.push(summoner2);
  },
  ADD_SEARCH(state2, summoner2) {
    const alreadyFav = state2.favorites.find(
      (s) => s.name === summoner2.name && s.region === summoner2.region
    );
    if (alreadyFav) {
      return;
    }
    let searches = state2.recentSearches;
    const alreadySearch = searches.find(
      (s) => s.name === summoner2.name && s.region === summoner2.region
    );
    if (alreadySearch) {
      alreadySearch.date = Date.now();
      searches.sort((a, b) => b.date - a.date);
      return;
    }
    if (searches.length > 10) {
      searches.pop();
    }
    summoner2.date = Date.now();
    searches.unshift(summoner2);
  },
  REMOVE_FAVORITE(state2, summoner2) {
    state2.favorites = state2.favorites.filter(
      (s) => s.name !== summoner2.name || s.region !== summoner2.region
    );
  },
  REMOVE_SEARCH(state2, summoner2) {
    state2.recentSearches = state2.recentSearches.filter(
      (s) => s.name !== summoner2.name || s.region !== summoner2.region
    );
  },
  UPDATE_SETTING(state2, { name: name2, value }) {
    state2[name2] = value;
  }
};
const actions$1 = {
  addRecentSearch({ commit: commit2, dispatch: dispatch2, state: state2 }, summoner2) {
    commit2("ADD_SEARCH", summoner2);
    dispatch2("updateSettings", {
      name: "recentSearches",
      value: state2.recentSearches,
      isJson: true
    });
  },
  removeRecentSearch({ commit: commit2, dispatch: dispatch2 }, summoner2) {
    commit2("REMOVE_SEARCH", summoner2);
    dispatch2("updateSettings", {
      name: "recentSearches",
      value: state$1.recentSearches,
      isJson: true
    });
  },
  updateFavorite({ commit: commit2, dispatch: dispatch2, state: state2 }, summoner2) {
    const alreadyFav = state2.favorites.find(
      (s) => s.name === summoner2.name && s.region === summoner2.region
    );
    if (alreadyFav) {
      commit2("REMOVE_FAVORITE", summoner2);
    } else {
      if (state2.favorites.length >= 6) {
        return dispatch2(
          "notification/add",
          {
            type: "error",
            message: "Too many favorite summoners."
          },
          { root: true }
        );
      }
      commit2("ADD_FAVORITE", summoner2);
      const searched = state2.recentSearches.find(
        (s) => s.name === summoner2.name && s.region === summoner2.region
      );
      if (searched) {
        dispatch2("removeRecentSearch", summoner2);
      }
    }
    dispatch2("updateSettings", { name: "favorites", value: state2.favorites, isJson: true });
  },
  updatePercent({ commit: commit2 }, percent) {
    if (typeof percent !== "boolean") {
      percent = localStorage.getItem("settings-percent") === "true";
    } else {
      localStorage.setItem("settings-percent", percent);
    }
    commit2("UPDATE_SETTING", { name: "percent", value: percent });
  },
  updateSettings({ commit: commit2 }, { name: name2, value, isJson = false }) {
    if (!value) {
      value = localStorage.getItem(name2);
      value = isJson ? JSON.parse(value) : value;
      if (!value)
        return;
    } else {
      localStorage.setItem(name2, isJson ? JSON.stringify(value) : value);
    }
    commit2("UPDATE_SETTING", { name: name2, value });
  }
};
const settings = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actions: actions$1,
  mutations: mutations$1,
  namespaced: namespaced$1,
  state: state$1
}, Symbol.toStringTag, { value: "Module" }));
function timeDifference(previous) {
  const current = /* @__PURE__ */ new Date();
  const msPerMinute = 60 * 1e3;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerWeek = msPerDay * 7;
  const elapsed = current - previous;
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1e3) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerWeek) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else {
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(previous).toLocaleString(void 0, dateOptions).replace(/\//g, ".");
  }
}
function secToTime(seconds) {
  const min = Math.floor(seconds / 60);
  let newSec = Math.floor(seconds - min * 60);
  newSec = newSec < 10 ? "0" + newSec : newSec;
  return `${min}:${newSec}`;
}
function sortTeamByRole(a, b) {
  const sortingArr = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];
  return sortingArr.indexOf(a.role) - sortingArr.indexOf(b.role);
}
function createCDragonAssetUrl(iconPath) {
  const name2 = iconPath.split("/assets/")[1].toLowerCase();
  return `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/${name2}`;
}
const maps = { 10: "The Twisted Treeline", 11: "Summoner's Rift", 12: "Howling Abyss" };
const gameModes = {
  0: {
    type: "Custom",
    name: "Custom Game"
  },
  900: {
    type: "Normal",
    name: "ARURF"
  },
  450: {
    type: "Normal",
    name: "ARAM"
  },
  400: {
    type: "Normal",
    name: "DRAFT"
  },
  420: {
    type: "Ranked",
    name: "Solo/Duo"
  },
  430: {
    type: "Normal",
    name: "BLIND"
  },
  440: {
    type: "Ranked",
    name: "FLEX"
  },
  460: {
    type: "Normal",
    name: "BLIND 3vs3"
  },
  470: {
    type: "Ranked",
    name: "FLEX 3vs3"
  },
  490: {
    type: "Normal",
    name: "QUICKPLAY"
  },
  700: {
    type: "Ranked",
    name: "CLASH"
  },
  720: {
    type: "Ranked",
    name: "CLASH ARAM"
  },
  800: {
    type: "Bot",
    name: "3vs3 Co-op vs. AI (Intermediate)"
  },
  810: {
    type: "Bot",
    name: "3vs3 Co-op vs. AI (Intro)"
  },
  820: {
    type: "Bot",
    name: "3vs3 Co-op vs. AI (Beginner)"
  },
  830: {
    type: "Bot",
    name: "Co-op vs. AI (Intro)"
  },
  840: {
    type: "Bot",
    name: "Co-op vs. AI (Beginner)"
  },
  850: {
    type: "Bot",
    name: "Co-op vs. AI (Intermediate)"
  },
  920: {
    type: "Normal",
    name: "PORO KING"
  },
  1020: {
    type: "Normal",
    name: "One for All"
  },
  1300: {
    type: "Normal",
    name: "Nexus Blitz"
  },
  1400: {
    type: "Normal",
    name: "Ultimate Spellbook"
  },
  1900: {
    type: "Normal",
    name: "URF"
  }
};
const colorValues = {
  green: "54,148,109",
  red: "197,85,93",
  purple: "141,116,217",
  teal: "104,186,191",
  yellow: "166,176,134",
  orange: "184,137,101",
  brown: "161,127,134",
  blue: "55, 118, 179"
};
const colors = {
  // match-details
  kills: colorValues["green"],
  deaths: colorValues["red"],
  assists: colorValues["purple"],
  minions: colorValues["teal"],
  vision: colorValues["yellow"],
  gold: colorValues["orange"],
  dmgChamp: colorValues["red"],
  dmgObj: colorValues["yellow"],
  dmgTaken: colorValues["red"],
  kp: colorValues["brown"],
  // champions
  winrate: colorValues["green"],
  playrate: colorValues["purple"],
  wins: colorValues["green"],
  count: colorValues["purple"],
  kda: colorValues["blue"],
  gameLength: colorValues["green"]
};
function getPrimarRune(perks) {
  const primaryRune = perks.selected.length ? store.state.cdragon.runes.perks[perks.selected[0]] : null;
  return primaryRune ? createCDragonAssetUrl(primaryRune.icon) : null;
}
function getSecondaryRune(perks) {
  const secondaryRune = store.state.cdragon.runes.perkstyles[perks.secondaryStyle];
  return secondaryRune ? createCDragonAssetUrl(secondaryRune.icon) : null;
}
function createMatchData(matches2) {
  for (const match2 of matches2) {
    match2.primaryRune = getPrimarRune(match2.perks);
    match2.secondaryRune = getSecondaryRune(match2.perks);
    const date = new Date(match2.date);
    const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };
    const timeOptions = { hour12: false, hour: "2-digit", minute: "2-digit" };
    match2.fullDate = {
      date: date.toLocaleString(void 0, dateOptions),
      time: date.toLocaleString(void 0, timeOptions)
    };
    match2.date = timeDifference(match2.date);
    match2.map = maps[match2.map];
    match2.gamemode = gameModes[match2.gamemode];
    if (!match2.gamemode) {
      match2.gamemode = { name: "Unknown gamemode" };
    }
  }
  return matches2;
}
function createBasicSummonerData(summonerBasic) {
  summonerBasic.ranked.soloQ = getLeagueData(summonerBasic.ranked.soloQ, "Solo/Duo");
  if (!summonerBasic.ranked.soloQ)
    delete summonerBasic.ranked.soloQ;
  summonerBasic.ranked.flex5v5 = getLeagueData(summonerBasic.ranked.flex5v5, "Flex 5vs5");
  if (!summonerBasic.ranked.flex5v5)
    delete summonerBasic.ranked.flex5v5;
  summonerBasic.ranked.flex3v3 = getLeagueData(summonerBasic.ranked.flex3v3, "Flex 3vs3");
  if (!summonerBasic.ranked.flex3v3)
    delete summonerBasic.ranked.flex3v3;
  if (Object.entries(summonerBasic.ranked).length === 0) {
    summonerBasic.ranked.soloQ = {
      fullRank: "Unranked",
      rankImgLink: "https://res.cloudinary.com/kln/image/upload/v1693310423/unranked.png",
      leaguePoints: 0,
      wins: 0,
      losses: 0,
      winrate: "0%",
      name: "Solo/Duo"
    };
  }
  return summonerBasic;
}
function createRecordsData(recordsDto) {
  const records = recordsDto.reduce((acc, record) => {
    acc[record.what] = record;
    return acc;
  }, {});
  records.game_duration.amount = secToTime(records.game_duration.amount);
  records.gold.amount = records.gold.amount.toLocaleString();
  records.damage_taken.amount = records.damage_taken.amount.toLocaleString();
  records.damage_dealt_champions.amount = records.damage_dealt_champions.amount.toLocaleString();
  records.damage_dealt_objectives.amount = records.damage_dealt_objectives.amount.toLocaleString();
  records.kp.amount = `${records.kp.amount}%`;
  records.time_spent_living.amount = secToTime(records.time_spent_living.amount);
  records.heal.amount = records.heal.amount.toLocaleString();
  return records;
}
function getLeagueData(leagueData, leagueName) {
  if (!leagueData)
    return null;
  leagueData.rankImgLink = `https://res.cloudinary.com/kln/image/upload/v1693310423/${leagueData.tier}.png`;
  leagueData.name = leagueName;
  return leagueData;
}
const namespaced = true;
const state = {
  basic: {
    account: {},
    currentSeason: null,
    ranked: {},
    recentActivity: [],
    seasons: [],
    gamemodes: [],
    status: ""
  },
  overview: {
    NB_LOAD_GAMES: 10,
    matches: [],
    stats: {},
    loaded: false,
    matchesLoading: false,
    moreMatchesToFetch: true
  },
  champions: {
    list: [],
    championsLoaded: false
  },
  records: {
    list: {},
    recordsLoaded: false
  },
  live: {
    match: {},
    liveLoaded: false,
    playing: false
  }
};
const mutations = {
  BASIC_REQUEST(state2) {
    state2.basic.status = "loading";
    state2.basic.currentSeason = null;
    state2.champions.championsLoaded = false;
    state2.records.recordsLoaded = false;
    state2.overview.loaded = false;
    state2.overview.moreMatchesToFetch = true;
    state2.live.liveLoaded = false;
  },
  CHAMPIONS_NOT_FOUND(state2) {
    state2.champions.championsLoaded = false;
  },
  CHAMPIONS_FOUND(state2, { champions }) {
    state2.champions.list = champions;
    state2.champions.championsLoaded = true;
  },
  KEEP_LAST_X_MATCHES(state2, number) {
    state2.overview.matches = state2.overview.matches.slice(0, number);
  },
  LIVE_FOUND(state2, { live }) {
    state2.live.match = live;
    state2.live.liveLoaded = true;
  },
  LIVE_LOADING(state2) {
    state2.live.playing = true;
    state2.live.liveLoaded = false;
  },
  MATCHES_LOADING(state2) {
    state2.overview.matchesLoading = true;
  },
  MATCHES_FOUND(state2, { newMatches, stats }) {
    state2.overview.matchesLoading = false;
    if (newMatches.length > 0) {
      state2.basic.recentActivity = stats.recentActivity;
      state2.overview.matches = [...state2.overview.matches, ...newMatches];
      state2.overview.stats = stats;
      state2.champions.championsLoaded = false;
      state2.records.recordsLoaded = false;
    }
    state2.overview.moreMatchesToFetch = newMatches.length > 0;
  },
  OVERVIEW_FOUND(state2, infos) {
    state2.basic.recentActivity = infos.stats.recentActivity;
    state2.overview.matches = infos.matches;
    state2.overview.stats = infos.stats;
    state2.overview.loaded = true;
    state2.records.recordsLoaded = false;
    state2.overview.moreMatchesToFetch = infos.matches.length > 0;
  },
  RECORDS_FOUND(state2, { records }) {
    state2.records.list = records;
    state2.records.recordsLoaded = true;
  },
  SUMMONER_FOUND(state2, infos) {
    state2.basic.account = infos.account;
    state2.basic.ranked = infos.ranked;
    state2.basic.recentActivity = infos.recentActivity;
    state2.basic.seasons = infos.seasons.sort((a, b) => b - a);
    state2.basic.gamemodes = infos.gamemodes;
    state2.basic.status = "found";
    state2.live.match = infos.current;
    state2.live.playing = infos.playing;
  },
  SUMMONER_NOT_FOUND(state2) {
    state2.basic.status = "error";
  },
  SUMMONER_NOT_PLAYING(state2) {
    state2.live.match = {};
    state2.live.playing = false;
    state2.live.liveLoaded = false;
  },
  UPDATE_SEASON(state2, { season }) {
    state2.basic.currentSeason = season;
    state2.overview.loaded = false;
    state2.champions.championsLoaded = false;
    state2.records.recordsLoaded = false;
  }
};
const actions = {
  async basicRequest({ commit: commit2, dispatch: dispatch2, rootState }, { summoner: summoner2, region }) {
    const regionId = rootState.regionsList[region];
    commit2("BASIC_REQUEST");
    try {
      const resp = await axios({
        url: "summoner/basic",
        data: { summoner: summoner2, region: regionId },
        method: "POST"
      });
      if (!resp.data) {
        dispatch2(
          "notification/add",
          {
            type: "error",
            message: "Summoner not found."
          },
          { root: true }
        );
        return commit2("SUMMONER_NOT_FOUND");
      }
      const infos = createBasicSummonerData(resp.data);
      commit2("SUMMONER_FOUND", infos);
      dispatch2(
        "settings/addRecentSearch",
        {
          name: infos.account.name,
          icon: infos.account.profileIconId,
          region
        },
        { root: true }
      );
    } catch (error) {
      if (error.response && error.response.status === 422) {
        dispatch2(
          "notification/add",
          {
            type: "error",
            message: "Summoner not found."
          },
          { root: true }
        );
      }
      if (error.message !== "Summoner changed") {
        commit2("SUMMONER_NOT_FOUND");
      }
    }
  },
  championsNotLoaded({ commit: commit2 }) {
    commit2("CHAMPIONS_NOT_FOUND");
  },
  async championsRequest({ commit: commit2 }, queue2 = null) {
    const resp = await axios({
      url: "summoner/champions",
      data: { puuid: state.basic.account.puuid, queue: queue2 },
      method: "POST"
    }).catch(() => {
    });
    commit2("CHAMPIONS_FOUND", { champions: resp.data });
  },
  async liveMatchRequest({ commit: commit2, rootState }) {
    commit2("LIVE_LOADING");
    const resp = await axios({
      url: "summoner/live",
      data: {
        id: state.basic.account.id,
        region: rootState.regionsList[rootState.settings.region]
      },
      method: "POST"
    }).catch(() => {
    });
    if (resp.data) {
      commit2("LIVE_FOUND", { live: resp.data });
    } else {
      commit2("SUMMONER_NOT_PLAYING");
    }
  },
  async moreMatches({ commit: commit2, rootState }) {
    commit2("MATCHES_LOADING");
    if (!state.overview.matches.length)
      return;
    const lastMatchId = state.overview.matches[state.overview.matches.length - 1].matchId;
    const resp = await axios({
      url: "match",
      data: {
        puuid: state.basic.account.puuid,
        region: rootState.regionsList[rootState.settings.region],
        lastMatchId
      },
      method: "POST"
    }).catch(() => {
    });
    const newMatches = createMatchData(resp.data.matches);
    commit2("MATCHES_FOUND", { newMatches, stats: resp.data.stats });
  },
  async overviewRequest({ commit: commit2, rootState }) {
    const resp = await axios({
      url: "summoner/overview",
      data: {
        puuid: state.basic.account.puuid,
        accountId: state.basic.account.accountId,
        region: rootState.regionsList[rootState.settings.region]
      },
      method: "POST"
    }).catch(() => {
    });
    resp.data.matches = createMatchData(resp.data.matchesDetails);
    commit2("OVERVIEW_FOUND", resp.data);
  },
  async recordsRequest({ commit: commit2 }) {
    const resp = await axios({
      url: "summoner/records",
      data: { puuid: state.basic.account.puuid },
      method: "POST"
    }).catch(() => {
    });
    const records = resp.data.length ? createRecordsData(resp.data) : {};
    commit2("RECORDS_FOUND", { records });
  },
  sliceOverviewMatches({ commit: commit2 }, number) {
    commit2("KEEP_LAST_X_MATCHES", number);
  },
  updateSeason({ commit: commit2 }, season) {
    commit2("UPDATE_SEASON", { season });
  }
};
const getters = {
  matchesLoading: (state2) => state2.overview.matchesLoading,
  overviewLoaded: (state2) => state2.overview.loaded,
  playing: (state2) => state2.live.playing,
  regionFilterApplied: (state2) => !!state2.basic.currentSeason,
  summonerFound: (state2) => state2.basic.status === "found",
  summonerNotFound: (state2) => state2.basic.status === "error",
  summonerLoading: (state2) => state2.basic.status === "loading"
};
const summoner = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  actions,
  getters,
  mutations,
  namespaced,
  state
}, Symbol.toStringTag, { value: "Module" }));
class LeagueOfLegendsClient {
  constructor(lockfile) {
    this.lockfile = lockfile;
  }
  LeagueOfLegendsClientInstance() {
    return axiosHttp.create({
      baseURL: `https://127.0.0.1:${this.lockfile.port}`,
      auth: {
        username: "riot",
        password: `${this.lockfile.password}`
      }
    });
  }
}
class LeagueOfLegendsClientApi {
  constructor(LeagueOfLegendsClient2) {
    this.LeagueOfLegendsClient = LeagueOfLegendsClient2;
  }
  static create(lockfile) {
    const lolClient = new LeagueOfLegendsClient(lockfile).LeagueOfLegendsClientInstance();
    return new LeagueOfLegendsClientApi(lolClient);
  }
  async handshakeRequest() {
    try {
      await this.LeagueOfLegendsClient.get("/lol-login/v1/session");
      return true;
    } catch (error) {
      return false;
    }
  }
  async requestSummonerData() {
    const response = await this.LeagueOfLegendsClient.get("/lol-summoner/v1/current-summoner");
    const responseData = response.data;
    return responseData;
  }
  async requestMatchesData() {
    const response = await this.LeagueOfLegendsClient.get(
      "/lol-match-history/v1/products/lol/current-summoner/matches"
    );
    const responseData = response.data;
    return responseData;
  }
  async getCurrentRunePage() {
    try {
      const response = await this.LeagueOfLegendsClient.get("/lol-perks/v1/currentpage/");
      const responseData = response.data;
      return responseData;
    } catch (error) {
      return error;
    }
  }
  async deleteCurrentRunePage(id) {
    try {
      await this.LeagueOfLegendsClient.delete(`/lol-perks/v1/pages/${id}/`);
      return true;
    } catch (error) {
      return false;
    }
  }
  async createCurrentRunePage(body) {
    try {
      await this.LeagueOfLegendsClient.post("/lol-perks/v1/pages/", body);
      return true;
    } catch (error) {
      return false;
    }
  }
  async inChampionSelect() {
    const response = await this.LeagueOfLegendsClient.get("/lol-champ-select/v1/session/");
    return response;
  }
  async currentChampion() {
    const response = await this.LeagueOfLegendsClient.get("/lol-champ-select/v1/current-champion/");
    return response;
  }
  getLane(championSelectStage) {
    const team = championSelectStage.myTeam;
    let lane = "";
    for (let index2 = 0; index2 < team.length; index2++) {
      if (championSelectStage.localPlayerCellId === team[index2].cellId) {
        lane = team[index2].assignedPosition;
      }
    }
    return lane;
  }
  getChampionId(match2) {
    for (let index2 = 0; index2 < match2.myTeam.length; index2++) {
      if (match2.localPlayerCellId === match2.myTeam[index2].cellId) {
        return match2.myTeam[index2].championId;
      }
    }
    return 0;
  }
  // async getPlayer(id: number) {
  //   return await this.LeagueOfLegendsClient.get(`/lol-champ-select/v1/summoners/${id}`);
  // }
}
const LeagueOfLegendsClientApi$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: LeagueOfLegendsClientApi
}, Symbol.toStringTag, { value: "Module" }));
Vue$1.use(Vuex);
const debug = false;
const store = new Vuex.Store({
  modules: {
    cdragon,
    detailedMatch,
    notification,
    settings,
    summoner,
    LeagueOfLegendsClientApi: LeagueOfLegendsClientApi$1
  },
  state: {
    regionsList: {
      br: "br1",
      eune: "eun1",
      euw: "euw1",
      jp: "jp1",
      kr: "kr",
      lan: "la1",
      las: "la2",
      na: "na1",
      oce: "oc1",
      tr: "tr1",
      ru: "ru",
      ph: "ph2",
      sg: "sg2",
      th: "th2",
      tw: "tw2",
      vn: "vn2"
    },
    roles: ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"]
  },
  strict: debug
});
const axios = axiosHttp;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = "https://api.leaguestats.gg/";
const CancelToken2 = axios.CancelToken;
const axiosSource = CancelToken2.source();
axios.defaults.axiosSource = axiosSource;
axios.defaults.cancelToken = axiosSource.token;
axios.interceptors.request.use(function(config2) {
  if (config2.method === "post" && config2.url !== "summoner/basic" && router.currentRoute.meta.season) {
    config2.data.season = store.state.summoner.basic.currentSeason;
  }
  return config2;
});
const VueAxios = {
  install(Vue2) {
    Vue2.prototype.$axios = axiosHttp;
  }
};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target2, source, options) {
  return target2.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function getMergeFunction(key, options) {
  if (!options.customMerge) {
    return deepmerge;
  }
  var customMerge = options.customMerge(key);
  return typeof customMerge === "function" ? customMerge : deepmerge;
}
function getEnumerableOwnPropertySymbols(target2) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target2).filter(function(symbol) {
    return Object.propertyIsEnumerable.call(target2, symbol);
  }) : [];
}
function getKeys(target2) {
  return Object.keys(target2).concat(getEnumerableOwnPropertySymbols(target2));
}
function propertyIsOnObject(object, property) {
  try {
    return property in object;
  } catch (_) {
    return false;
  }
}
function propertyIsUnsafe(target2, key) {
  return propertyIsOnObject(target2, key) && !(Object.hasOwnProperty.call(target2, key) && Object.propertyIsEnumerable.call(target2, key));
}
function mergeObject(target2, source, options) {
  var destination = {};
  if (options.isMergeableObject(target2)) {
    getKeys(target2).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target2[key], options);
    });
  }
  getKeys(source).forEach(function(key) {
    if (propertyIsUnsafe(target2, key)) {
      return;
    }
    if (propertyIsOnObject(target2, key) && options.isMergeableObject(source[key])) {
      destination[key] = getMergeFunction(key, options)(target2[key], source[key], options);
    } else {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    }
  });
  return destination;
}
function deepmerge(target2, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  options.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target2);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target2, source, options);
  } else {
    return mergeObject(target2, source, options);
  }
}
deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};
var deepmerge_1 = deepmerge;
var cjs = deepmerge_1;
const deepmerge$1 = /* @__PURE__ */ getDefaultExportFromCjs(cjs);
/**
 * vue-meta v2.4.0
 * (c) 2020
 * - Declan de Wet
 * - Sébastien Chopin (@Atinux)
 * - Pim (@pimlie)
 * - All the amazing contributors
 * @license MIT
 */
var version = "2.4.0";
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target2) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target2, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target2, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target2, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target2;
}
function _toConsumableArray$1(arr) {
  return _arrayWithoutHoles$1(arr) || _iterableToArray$1(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread$1();
}
function _arrayWithoutHoles$1(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray$1(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter))
    return Array.from(iter);
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o)
    return;
  if (typeof o === "string")
    return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor)
    n = o.constructor.name;
  if (n === "Map" || n === "Set")
    return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++)
    arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread$1() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it)
        o = it;
      var i = 0;
      var F = function() {
      };
      return {
        s: F,
        n: function() {
          if (i >= o.length)
            return {
              done: true
            };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function(e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true, didErr = false, err;
  return {
    s: function() {
      it = o[Symbol.iterator]();
    },
    n: function() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function(e) {
      didErr = true;
      err = e;
    },
    f: function() {
      try {
        if (!normalCompletion && it.return != null)
          it.return();
      } finally {
        if (didErr)
          throw err;
      }
    }
  };
}
function isArray(arg) {
  return Array.isArray(arg);
}
function isUndefined(arg) {
  return typeof arg === "undefined";
}
function isObject(arg) {
  return _typeof$1(arg) === "object";
}
function isPureObject(arg) {
  return _typeof$1(arg) === "object" && arg !== null;
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isString(arg) {
  return typeof arg === "string";
}
function hasGlobalWindowFn() {
  try {
    return !isUndefined(window);
  } catch (e) {
    return false;
  }
}
var hasGlobalWindow = hasGlobalWindowFn();
var _global = hasGlobalWindow ? window : global;
var console$1 = _global.console || {};
function warn(str) {
  if (!console$1 || !console$1.warn) {
    return;
  }
  console$1.warn(str);
}
var showWarningNotSupported = function showWarningNotSupported2() {
  return warn("This vue app/component has no vue-meta configuration");
};
var defaultInfo = {
  title: void 0,
  titleChunk: "",
  titleTemplate: "%s",
  htmlAttrs: {},
  bodyAttrs: {},
  headAttrs: {},
  base: [],
  link: [],
  meta: [],
  style: [],
  script: [],
  noscript: [],
  __dangerouslyDisableSanitizers: [],
  __dangerouslyDisableSanitizersByTagID: {}
};
var rootConfigKey = "_vueMeta";
var keyName = "metaInfo";
var attribute = "data-vue-meta";
var ssrAttribute = "data-vue-meta-server-rendered";
var tagIDKeyName = "vmid";
var metaTemplateKeyName = "template";
var contentKeyName = "content";
var ssrAppId = "ssr";
var debounceWait = 10;
var waitOnDestroyed = true;
var defaultOptions = {
  keyName,
  attribute,
  ssrAttribute,
  tagIDKeyName,
  contentKeyName,
  metaTemplateKeyName,
  waitOnDestroyed,
  debounceWait,
  ssrAppId
};
var defaultInfoKeys = Object.keys(defaultInfo);
var disableOptionKeys = [defaultInfoKeys[12], defaultInfoKeys[13]];
var metaInfoOptionKeys = [defaultInfoKeys[1], defaultInfoKeys[2], "changed"].concat(disableOptionKeys);
var metaInfoAttributeKeys = [defaultInfoKeys[3], defaultInfoKeys[4], defaultInfoKeys[5]];
var tagsSupportingOnload = ["link", "style", "script"];
var tagsWithoutEndTag = ["base", "meta", "link"];
var tagsWithInnerContent = ["noscript", "script", "style"];
var tagAttributeAsInnerContent = ["innerHTML", "cssText", "json"];
var tagProperties = ["once", "skip", "template"];
var commonDataAttributes = ["body", "pbody"];
var booleanHtmlAttributes = ["allowfullscreen", "amp", "amp-boilerplate", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "truespeed", "typemustmatch", "visible"];
var batchId = null;
function triggerUpdate(_ref, rootVm, hookName) {
  var debounceWait2 = _ref.debounceWait;
  if (!rootVm[rootConfigKey].initialized && (rootVm[rootConfigKey].initializing || hookName === "watcher")) {
    rootVm[rootConfigKey].initialized = null;
  }
  if (rootVm[rootConfigKey].initialized && !rootVm[rootConfigKey].pausing) {
    batchUpdate(function() {
      return void rootVm.$meta().refresh();
    }, debounceWait2);
  }
}
function batchUpdate(callback, timeout) {
  timeout = timeout === void 0 ? 10 : timeout;
  if (!timeout) {
    callback();
    return;
  }
  clearTimeout(batchId);
  batchId = setTimeout(function() {
    callback();
  }, timeout);
  return batchId;
}
function find(array, predicate, thisArg) {
  if (!Array.prototype.find) {
    for (var idx = 0; idx < array.length; idx++) {
      if (predicate.call(thisArg, array[idx], idx, array)) {
        return array[idx];
      }
    }
    return;
  }
  return array.find(predicate, thisArg);
}
function findIndex(array, predicate, thisArg) {
  if (!Array.prototype.findIndex) {
    for (var idx = 0; idx < array.length; idx++) {
      if (predicate.call(thisArg, array[idx], idx, array)) {
        return idx;
      }
    }
    return -1;
  }
  return array.findIndex(predicate, thisArg);
}
function toArray(arg) {
  if (!Array.from) {
    return Array.prototype.slice.call(arg);
  }
  return Array.from(arg);
}
function includes(array, value) {
  if (!Array.prototype.includes) {
    for (var idx in array) {
      if (array[idx] === value) {
        return true;
      }
    }
    return false;
  }
  return array.includes(value);
}
var querySelector = function querySelector2(arg, el) {
  return (el || document).querySelectorAll(arg);
};
function getTag(tags, tag) {
  if (!tags[tag]) {
    tags[tag] = document.getElementsByTagName(tag)[0];
  }
  return tags[tag];
}
function getElementsKey(_ref) {
  var body = _ref.body, pbody = _ref.pbody;
  return body ? "body" : pbody ? "pbody" : "head";
}
function queryElements(parentNode2, _ref2, attributes) {
  var appId2 = _ref2.appId, attribute2 = _ref2.attribute, type = _ref2.type, tagIDKeyName2 = _ref2.tagIDKeyName;
  attributes = attributes || {};
  var queries = ["".concat(type, "[").concat(attribute2, '="').concat(appId2, '"]'), "".concat(type, "[data-").concat(tagIDKeyName2, "]")].map(function(query2) {
    for (var key in attributes) {
      var val = attributes[key];
      var attributeValue = val && val !== true ? '="'.concat(val, '"') : "";
      query2 += "[data-".concat(key).concat(attributeValue, "]");
    }
    return query2;
  });
  return toArray(querySelector(queries.join(", "), parentNode2));
}
function removeElementsByAppId(_ref3, appId2) {
  var attribute2 = _ref3.attribute;
  toArray(querySelector("[".concat(attribute2, '="').concat(appId2, '"]'))).map(function(el) {
    return el.remove();
  });
}
function removeAttribute(el, attributeName) {
  el.removeAttribute(attributeName);
}
function hasMetaInfo(vm) {
  vm = vm || this;
  return vm && (vm[rootConfigKey] === true || isObject(vm[rootConfigKey]));
}
function inMetaInfoBranch(vm) {
  vm = vm || this;
  return vm && !isUndefined(vm[rootConfigKey]);
}
function pause(rootVm, refresh2) {
  rootVm[rootConfigKey].pausing = true;
  return function() {
    return resume(rootVm, refresh2);
  };
}
function resume(rootVm, refresh2) {
  rootVm[rootConfigKey].pausing = false;
  if (refresh2 || refresh2 === void 0) {
    return rootVm.$meta().refresh();
  }
}
function addNavGuards(rootVm) {
  var router2 = rootVm.$router;
  if (rootVm[rootConfigKey].navGuards || !router2) {
    return;
  }
  rootVm[rootConfigKey].navGuards = true;
  router2.beforeEach(function(to2, from, next) {
    pause(rootVm);
    next();
  });
  router2.afterEach(function() {
    rootVm.$nextTick(function() {
      var _resume = resume(rootVm), metaInfo = _resume.metaInfo;
      if (metaInfo && isFunction(metaInfo.afterNavigation)) {
        metaInfo.afterNavigation(metaInfo);
      }
    });
  });
}
var appId = 1;
function createMixin(Vue2, options) {
  var updateOnLifecycleHook = ["activated", "deactivated", "beforeMount"];
  var wasServerRendered = false;
  return {
    beforeCreate: function beforeCreate() {
      var _this2 = this;
      var rootKey = "$root";
      var $root = this[rootKey];
      var $options = this.$options;
      var devtoolsEnabled = Vue2.config.devtools;
      Object.defineProperty(this, "_hasMetaInfo", {
        configurable: true,
        get: function get2() {
          if (devtoolsEnabled && !$root[rootConfigKey].deprecationWarningShown) {
            warn("VueMeta DeprecationWarning: _hasMetaInfo has been deprecated and will be removed in a future version. Please use hasMetaInfo(vm) instead");
            $root[rootConfigKey].deprecationWarningShown = true;
          }
          return hasMetaInfo(this);
        }
      });
      if (this === $root) {
        $root.$once("hook:beforeMount", function() {
          wasServerRendered = this.$el && this.$el.nodeType === 1 && this.$el.hasAttribute("data-server-rendered");
          if (!wasServerRendered && $root[rootConfigKey] && $root[rootConfigKey].appId === 1) {
            var htmlTag = getTag({}, "html");
            wasServerRendered = htmlTag && htmlTag.hasAttribute(options.ssrAttribute);
          }
        });
      }
      if (isUndefined($options[options.keyName]) || $options[options.keyName] === null) {
        return;
      }
      if (!$root[rootConfigKey]) {
        $root[rootConfigKey] = {
          appId
        };
        appId++;
        if (devtoolsEnabled && $root.$options[options.keyName]) {
          this.$nextTick(function() {
            var child = find($root.$children, function(c) {
              return c.$vnode && c.$vnode.fnOptions;
            });
            if (child && child.$vnode.fnOptions[options.keyName]) {
              warn("VueMeta has detected a possible global mixin which adds a ".concat(options.keyName, " property to all Vue components on the page. This could cause severe performance issues. If possible, use $meta().addApp to add meta information instead"));
            }
          });
        }
      }
      if (!this[rootConfigKey]) {
        this[rootConfigKey] = true;
        var parent = this.$parent;
        while (parent && parent !== $root) {
          if (isUndefined(parent[rootConfigKey])) {
            parent[rootConfigKey] = false;
          }
          parent = parent.$parent;
        }
      }
      if (isFunction($options[options.keyName])) {
        $options.computed = $options.computed || {};
        $options.computed.$metaInfo = $options[options.keyName];
        if (!this.$isServer) {
          this.$on("hook:created", function() {
            this.$watch("$metaInfo", function() {
              triggerUpdate(options, this[rootKey], "watcher");
            });
          });
        }
      }
      if (isUndefined($root[rootConfigKey].initialized)) {
        $root[rootConfigKey].initialized = this.$isServer;
        if (!$root[rootConfigKey].initialized) {
          if (!$root[rootConfigKey].initializedSsr) {
            $root[rootConfigKey].initializedSsr = true;
            this.$on("hook:beforeMount", function() {
              var $root2 = this[rootKey];
              if (wasServerRendered) {
                $root2[rootConfigKey].appId = options.ssrAppId;
              }
            });
          }
          this.$on("hook:mounted", function() {
            var $root2 = this[rootKey];
            if ($root2[rootConfigKey].initialized) {
              return;
            }
            $root2[rootConfigKey].initializing = true;
            this.$nextTick(function() {
              var _$root$$meta$refresh = $root2.$meta().refresh(), tags = _$root$$meta$refresh.tags, metaInfo = _$root$$meta$refresh.metaInfo;
              if (tags === false && $root2[rootConfigKey].initialized === null) {
                this.$nextTick(function() {
                  return triggerUpdate(options, $root2, "init");
                });
              }
              $root2[rootConfigKey].initialized = true;
              delete $root2[rootConfigKey].initializing;
              if (!options.refreshOnceOnNavigation && metaInfo.afterNavigation) {
                addNavGuards($root2);
              }
            });
          });
          if (options.refreshOnceOnNavigation) {
            addNavGuards($root);
          }
        }
      }
      this.$on("hook:destroyed", function() {
        var _this = this;
        if (!this.$parent || !hasMetaInfo(this)) {
          return;
        }
        delete this._hasMetaInfo;
        this.$nextTick(function() {
          if (!options.waitOnDestroyed || !_this.$el || !_this.$el.offsetParent) {
            triggerUpdate(options, _this.$root, "destroyed");
            return;
          }
          var interval = setInterval(function() {
            if (_this.$el && _this.$el.offsetParent !== null) {
              return;
            }
            clearInterval(interval);
            triggerUpdate(options, _this.$root, "destroyed");
          }, 50);
        });
      });
      if (this.$isServer) {
        return;
      }
      updateOnLifecycleHook.forEach(function(lifecycleHook) {
        _this2.$on("hook:".concat(lifecycleHook), function() {
          triggerUpdate(options, this[rootKey], lifecycleHook);
        });
      });
    }
  };
}
function setOptions(options) {
  options = isObject(options) ? options : {};
  return {
    keyName: options["keyName"] || defaultOptions.keyName,
    attribute: options["attribute"] || defaultOptions.attribute,
    ssrAttribute: options["ssrAttribute"] || defaultOptions.ssrAttribute,
    tagIDKeyName: options["tagIDKeyName"] || defaultOptions.tagIDKeyName,
    contentKeyName: options["contentKeyName"] || defaultOptions.contentKeyName,
    metaTemplateKeyName: options["metaTemplateKeyName"] || defaultOptions.metaTemplateKeyName,
    debounceWait: isUndefined(options["debounceWait"]) ? defaultOptions.debounceWait : options["debounceWait"],
    waitOnDestroyed: isUndefined(options["waitOnDestroyed"]) ? defaultOptions.waitOnDestroyed : options["waitOnDestroyed"],
    ssrAppId: options["ssrAppId"] || defaultOptions.ssrAppId,
    refreshOnceOnNavigation: !!options["refreshOnceOnNavigation"]
  };
}
function getOptions(options) {
  var optionsCopy = {};
  for (var key in options) {
    optionsCopy[key] = options[key];
  }
  return optionsCopy;
}
function ensureIsArray(arg, key) {
  if (!key || !isObject(arg)) {
    return isArray(arg) ? arg : [];
  }
  if (!isArray(arg[key])) {
    arg[key] = [];
  }
  return arg;
}
var serverSequences = [[/&/g, "&amp;"], [/</g, "&lt;"], [/>/g, "&gt;"], [/"/g, "&quot;"], [/'/g, "&#x27;"]];
var clientSequences = [[/&/g, "&"], [/</g, "<"], [/>/g, ">"], [/"/g, '"'], [/'/g, "'"]];
function escape(info, options, escapeOptions, escapeKeys) {
  var tagIDKeyName2 = options.tagIDKeyName;
  var _escapeOptions$doEsca = escapeOptions.doEscape, doEscape = _escapeOptions$doEsca === void 0 ? function(v) {
    return v;
  } : _escapeOptions$doEsca;
  var escaped = {};
  for (var key in info) {
    var value = info[key];
    if (includes(metaInfoOptionKeys, key)) {
      escaped[key] = value;
      continue;
    }
    var disableKey = disableOptionKeys[0];
    if (escapeOptions[disableKey] && includes(escapeOptions[disableKey], key)) {
      escaped[key] = value;
      continue;
    }
    var tagId = info[tagIDKeyName2];
    if (tagId) {
      disableKey = disableOptionKeys[1];
      if (escapeOptions[disableKey] && escapeOptions[disableKey][tagId] && includes(escapeOptions[disableKey][tagId], key)) {
        escaped[key] = value;
        continue;
      }
    }
    if (isString(value)) {
      escaped[key] = doEscape(value);
    } else if (isArray(value)) {
      escaped[key] = value.map(function(v) {
        if (isPureObject(v)) {
          return escape(v, options, escapeOptions, true);
        }
        return doEscape(v);
      });
    } else if (isPureObject(value)) {
      escaped[key] = escape(value, options, escapeOptions, true);
    } else {
      escaped[key] = value;
    }
    if (escapeKeys) {
      var escapedKey = doEscape(key);
      if (key !== escapedKey) {
        escaped[escapedKey] = escaped[key];
        delete escaped[key];
      }
    }
  }
  return escaped;
}
function escapeMetaInfo(options, info, escapeSequences) {
  escapeSequences = escapeSequences || [];
  var escapeOptions = {
    doEscape: function doEscape(value) {
      return escapeSequences.reduce(function(val, seq) {
        return val.replace(seq[0], seq[1]);
      }, value);
    }
  };
  disableOptionKeys.forEach(function(disableKey, index2) {
    if (index2 === 0) {
      ensureIsArray(info, disableKey);
    } else if (index2 === 1) {
      for (var key in info[disableKey]) {
        ensureIsArray(info[disableKey], key);
      }
    }
    escapeOptions[disableKey] = info[disableKey];
  });
  return escape(info, options, escapeOptions);
}
function applyTemplate(_ref, headObject, template, chunk) {
  var component = _ref.component, metaTemplateKeyName2 = _ref.metaTemplateKeyName, contentKeyName2 = _ref.contentKeyName;
  if (template === true || headObject[metaTemplateKeyName2] === true) {
    return false;
  }
  if (isUndefined(template) && headObject[metaTemplateKeyName2]) {
    template = headObject[metaTemplateKeyName2];
    headObject[metaTemplateKeyName2] = true;
  }
  if (!template) {
    delete headObject[metaTemplateKeyName2];
    return false;
  }
  if (isUndefined(chunk)) {
    chunk = headObject[contentKeyName2];
  }
  headObject[contentKeyName2] = isFunction(template) ? template.call(component, chunk) : template.replace(/%s/g, chunk);
  return true;
}
function _arrayMerge(_ref, target2, source) {
  var component = _ref.component, tagIDKeyName2 = _ref.tagIDKeyName, metaTemplateKeyName2 = _ref.metaTemplateKeyName, contentKeyName2 = _ref.contentKeyName;
  var destination = [];
  if (!target2.length && !source.length) {
    return destination;
  }
  target2.forEach(function(targetItem, targetIndex) {
    if (!targetItem[tagIDKeyName2]) {
      destination.push(targetItem);
      return;
    }
    var sourceIndex = findIndex(source, function(item) {
      return item[tagIDKeyName2] === targetItem[tagIDKeyName2];
    });
    var sourceItem = source[sourceIndex];
    if (sourceIndex === -1) {
      destination.push(targetItem);
      return;
    }
    if (contentKeyName2 in sourceItem && sourceItem[contentKeyName2] === void 0 || "innerHTML" in sourceItem && sourceItem.innerHTML === void 0) {
      destination.push(targetItem);
      source.splice(sourceIndex, 1);
      return;
    }
    if (sourceItem[contentKeyName2] === null || sourceItem.innerHTML === null) {
      source.splice(sourceIndex, 1);
      return;
    }
    var targetTemplate = targetItem[metaTemplateKeyName2];
    if (!targetTemplate) {
      return;
    }
    var sourceTemplate = sourceItem[metaTemplateKeyName2];
    if (!sourceTemplate) {
      applyTemplate({
        component,
        metaTemplateKeyName: metaTemplateKeyName2,
        contentKeyName: contentKeyName2
      }, sourceItem, targetTemplate);
      sourceItem.template = true;
      return;
    }
    if (!sourceItem[contentKeyName2]) {
      applyTemplate({
        component,
        metaTemplateKeyName: metaTemplateKeyName2,
        contentKeyName: contentKeyName2
      }, sourceItem, void 0, targetItem[contentKeyName2]);
    }
  });
  return destination.concat(source);
}
var warningShown = false;
function merge(target2, source, options) {
  options = options || {};
  if (source.title === void 0) {
    delete source.title;
  }
  metaInfoAttributeKeys.forEach(function(attrKey) {
    if (!source[attrKey]) {
      return;
    }
    for (var key in source[attrKey]) {
      if (key in source[attrKey] && source[attrKey][key] === void 0) {
        if (includes(booleanHtmlAttributes, key) && !warningShown) {
          warn("VueMeta: Please note that since v2 the value undefined is not used to indicate boolean attributes anymore, see migration guide for details");
          warningShown = true;
        }
        delete source[attrKey][key];
      }
    }
  });
  return deepmerge$1(target2, source, {
    arrayMerge: function arrayMerge(t, s) {
      return _arrayMerge(options, t, s);
    }
  });
}
function getComponentMetaInfo(options, component) {
  return getComponentOption(options || {}, component, defaultInfo);
}
function getComponentOption(options, component, result) {
  result = result || {};
  if (component._inactive) {
    return result;
  }
  options = options || {};
  var _options = options, keyName2 = _options.keyName;
  var $metaInfo = component.$metaInfo, $options = component.$options, $children = component.$children;
  if ($options[keyName2]) {
    var data3 = $metaInfo || $options[keyName2];
    if (isObject(data3)) {
      result = merge(result, data3, options);
    }
  }
  if ($children.length) {
    $children.forEach(function(childComponent) {
      if (!inMetaInfoBranch(childComponent)) {
        return;
      }
      result = getComponentOption(options, childComponent, result);
    });
  }
  return result;
}
var callbacks = [];
function isDOMComplete(d) {
  return (d || document).readyState === "complete";
}
function addCallback(query2, callback) {
  if (arguments.length === 1) {
    callback = query2;
    query2 = "";
  }
  callbacks.push([query2, callback]);
}
function addCallbacks(_ref, type, tags, autoAddListeners) {
  var tagIDKeyName2 = _ref.tagIDKeyName;
  var hasAsyncCallback = false;
  tags.forEach(function(tag) {
    if (!tag[tagIDKeyName2] || !tag.callback) {
      return;
    }
    hasAsyncCallback = true;
    addCallback("".concat(type, "[data-").concat(tagIDKeyName2, '="').concat(tag[tagIDKeyName2], '"]'), tag.callback);
  });
  if (!autoAddListeners || !hasAsyncCallback) {
    return hasAsyncCallback;
  }
  return addListeners();
}
function addListeners() {
  if (isDOMComplete()) {
    applyCallbacks();
    return;
  }
  document.onreadystatechange = function() {
    applyCallbacks();
  };
}
function applyCallbacks(matchElement) {
  callbacks.forEach(function(args) {
    var query2 = args[0];
    var callback = args[1];
    var selector = "".concat(query2, '[onload="this.__vm_l=1"]');
    var elements = [];
    if (!matchElement) {
      elements = toArray(querySelector(selector));
    }
    if (matchElement && matchElement.matches(selector)) {
      elements = [matchElement];
    }
    elements.forEach(function(element) {
      if (element.__vm_cb) {
        return;
      }
      var onload = function onload2() {
        element.__vm_cb = true;
        removeAttribute(element, "onload");
        callback(element);
      };
      if (element.__vm_l) {
        onload();
        return;
      }
      if (!element.__vm_ev) {
        element.__vm_ev = true;
        element.addEventListener("load", onload);
      }
    });
  });
}
var attributeMap = {};
function updateAttribute(appId2, options, type, attrs2, tag) {
  var _ref = options || {}, attribute2 = _ref.attribute;
  var vueMetaAttrString = tag.getAttribute(attribute2);
  if (vueMetaAttrString) {
    attributeMap[type] = JSON.parse(decodeURI(vueMetaAttrString));
    removeAttribute(tag, attribute2);
  }
  var data3 = attributeMap[type] || {};
  var toUpdate = [];
  for (var attr in data3) {
    if (data3[attr] !== void 0 && appId2 in data3[attr]) {
      toUpdate.push(attr);
      if (!attrs2[attr]) {
        delete data3[attr][appId2];
      }
    }
  }
  for (var _attr in attrs2) {
    var attrData = data3[_attr];
    if (!attrData || attrData[appId2] !== attrs2[_attr]) {
      toUpdate.push(_attr);
      if (attrs2[_attr] !== void 0) {
        data3[_attr] = data3[_attr] || {};
        data3[_attr][appId2] = attrs2[_attr];
      }
    }
  }
  for (var _i = 0, _toUpdate = toUpdate; _i < _toUpdate.length; _i++) {
    var _attr2 = _toUpdate[_i];
    var _attrData = data3[_attr2];
    var attrValues = [];
    for (var _appId in _attrData) {
      Array.prototype.push.apply(attrValues, [].concat(_attrData[_appId]));
    }
    if (attrValues.length) {
      var attrValue = includes(booleanHtmlAttributes, _attr2) && attrValues.some(Boolean) ? "" : attrValues.filter(function(v) {
        return v !== void 0;
      }).join(" ");
      tag.setAttribute(_attr2, attrValue);
    } else {
      removeAttribute(tag, _attr2);
    }
  }
  attributeMap[type] = data3;
}
function updateTitle(title) {
  if (!title && title !== "") {
    return;
  }
  document.title = title;
}
function updateTag(appId2, options, type, tags, head, body) {
  var _ref = options || {}, attribute2 = _ref.attribute, tagIDKeyName2 = _ref.tagIDKeyName;
  var dataAttributes = commonDataAttributes.slice();
  dataAttributes.push(tagIDKeyName2);
  var newElements = [];
  var queryOptions = {
    appId: appId2,
    attribute: attribute2,
    type,
    tagIDKeyName: tagIDKeyName2
  };
  var currentElements = {
    head: queryElements(head, queryOptions),
    pbody: queryElements(body, queryOptions, {
      pbody: true
    }),
    body: queryElements(body, queryOptions, {
      body: true
    })
  };
  if (tags.length > 1) {
    var found = [];
    tags = tags.filter(function(x) {
      var k = JSON.stringify(x);
      var res = !includes(found, k);
      found.push(k);
      return res;
    });
  }
  tags.forEach(function(tag) {
    if (tag.skip) {
      return;
    }
    var newElement = document.createElement(type);
    if (!tag.once) {
      newElement.setAttribute(attribute2, appId2);
    }
    Object.keys(tag).forEach(function(attr) {
      if (includes(tagProperties, attr)) {
        return;
      }
      if (attr === "innerHTML") {
        newElement.innerHTML = tag.innerHTML;
        return;
      }
      if (attr === "json") {
        newElement.innerHTML = JSON.stringify(tag.json);
        return;
      }
      if (attr === "cssText") {
        if (newElement.styleSheet) {
          newElement.styleSheet.cssText = tag.cssText;
        } else {
          newElement.appendChild(document.createTextNode(tag.cssText));
        }
        return;
      }
      if (attr === "callback") {
        newElement.onload = function() {
          return tag[attr](newElement);
        };
        return;
      }
      var _attr = includes(dataAttributes, attr) ? "data-".concat(attr) : attr;
      var isBooleanAttribute = includes(booleanHtmlAttributes, attr);
      if (isBooleanAttribute && !tag[attr]) {
        return;
      }
      var value = isBooleanAttribute ? "" : tag[attr];
      newElement.setAttribute(_attr, value);
    });
    var oldElements2 = currentElements[getElementsKey(tag)];
    var indexToDelete;
    var hasEqualElement = oldElements2.some(function(existingTag, index2) {
      indexToDelete = index2;
      return newElement.isEqualNode(existingTag);
    });
    if (hasEqualElement && (indexToDelete || indexToDelete === 0)) {
      oldElements2.splice(indexToDelete, 1);
    } else {
      newElements.push(newElement);
    }
  });
  var oldElements = [];
  for (var _type in currentElements) {
    Array.prototype.push.apply(oldElements, currentElements[_type]);
  }
  oldElements.forEach(function(element) {
    element.parentNode.removeChild(element);
  });
  newElements.forEach(function(element) {
    if (element.hasAttribute("data-body")) {
      body.appendChild(element);
      return;
    }
    if (element.hasAttribute("data-pbody")) {
      body.insertBefore(element, body.firstChild);
      return;
    }
    head.appendChild(element);
  });
  return {
    oldTags: oldElements,
    newTags: newElements
  };
}
function updateClientMetaInfo(appId2, options, newInfo) {
  options = options || {};
  var _options = options, ssrAttribute2 = _options.ssrAttribute, ssrAppId2 = _options.ssrAppId;
  var tags = {};
  var htmlTag = getTag(tags, "html");
  if (appId2 === ssrAppId2 && htmlTag.hasAttribute(ssrAttribute2)) {
    removeAttribute(htmlTag, ssrAttribute2);
    var addLoadListeners = false;
    tagsSupportingOnload.forEach(function(type2) {
      if (newInfo[type2] && addCallbacks(options, type2, newInfo[type2])) {
        addLoadListeners = true;
      }
    });
    if (addLoadListeners) {
      addListeners();
    }
    return false;
  }
  var tagsAdded = {};
  var tagsRemoved = {};
  for (var type in newInfo) {
    if (includes(metaInfoOptionKeys, type)) {
      continue;
    }
    if (type === "title") {
      updateTitle(newInfo.title);
      continue;
    }
    if (includes(metaInfoAttributeKeys, type)) {
      var tagName2 = type.substr(0, 4);
      updateAttribute(appId2, options, type, newInfo[type], getTag(tags, tagName2));
      continue;
    }
    if (!isArray(newInfo[type])) {
      continue;
    }
    var _updateTag = updateTag(appId2, options, type, newInfo[type], getTag(tags, "head"), getTag(tags, "body")), oldTags = _updateTag.oldTags, newTags = _updateTag.newTags;
    if (newTags.length) {
      tagsAdded[type] = newTags;
      tagsRemoved[type] = oldTags;
    }
  }
  return {
    tagsAdded,
    tagsRemoved
  };
}
var appsMetaInfo;
function addApp(rootVm, appId2, options) {
  return {
    set: function set2(metaInfo) {
      return setMetaInfo(rootVm, appId2, options, metaInfo);
    },
    remove: function remove2() {
      return removeMetaInfo(rootVm, appId2, options);
    }
  };
}
function setMetaInfo(rootVm, appId2, options, metaInfo) {
  if (rootVm && rootVm.$el) {
    return updateClientMetaInfo(appId2, options, metaInfo);
  }
  appsMetaInfo = appsMetaInfo || {};
  appsMetaInfo[appId2] = metaInfo;
}
function removeMetaInfo(rootVm, appId2, options) {
  if (rootVm && rootVm.$el) {
    var tags = {};
    var _iterator = _createForOfIteratorHelper(metaInfoAttributeKeys), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var type = _step.value;
        var tagName2 = type.substr(0, 4);
        updateAttribute(appId2, options, type, {}, getTag(tags, tagName2));
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return removeElementsByAppId(options, appId2);
  }
  if (appsMetaInfo[appId2]) {
    delete appsMetaInfo[appId2];
    clearAppsMetaInfo();
  }
}
function getAppsMetaInfo() {
  return appsMetaInfo;
}
function clearAppsMetaInfo(force) {
  if (force || !Object.keys(appsMetaInfo).length) {
    appsMetaInfo = void 0;
  }
}
function getMetaInfo(options, info, escapeSequences, component) {
  options = options || {};
  escapeSequences = escapeSequences || [];
  var _options = options, tagIDKeyName2 = _options.tagIDKeyName;
  if (info.title) {
    info.titleChunk = info.title;
  }
  if (info.titleTemplate && info.titleTemplate !== "%s") {
    applyTemplate({
      component,
      contentKeyName: "title"
    }, info, info.titleTemplate, info.titleChunk || "");
  }
  if (info.base) {
    info.base = Object.keys(info.base).length ? [info.base] : [];
  }
  if (info.meta) {
    info.meta = info.meta.filter(function(metaItem, index2, arr) {
      var hasVmid = !!metaItem[tagIDKeyName2];
      if (!hasVmid) {
        return true;
      }
      var isFirstItemForVmid = index2 === findIndex(arr, function(item) {
        return item[tagIDKeyName2] === metaItem[tagIDKeyName2];
      });
      return isFirstItemForVmid;
    });
    info.meta.forEach(function(metaObject) {
      return applyTemplate(options, metaObject);
    });
  }
  return escapeMetaInfo(options, info, escapeSequences);
}
function refresh(rootVm, options) {
  options = options || {};
  if (!rootVm[rootConfigKey]) {
    showWarningNotSupported();
    return {};
  }
  var rawInfo = getComponentMetaInfo(options, rootVm);
  var metaInfo = getMetaInfo(options, rawInfo, clientSequences, rootVm);
  var appId2 = rootVm[rootConfigKey].appId;
  var tags = updateClientMetaInfo(appId2, options, metaInfo);
  if (tags && isFunction(metaInfo.changed)) {
    metaInfo.changed(metaInfo, tags.tagsAdded, tags.tagsRemoved);
    tags = {
      addedTags: tags.tagsAdded,
      removedTags: tags.tagsRemoved
    };
  }
  var appsMetaInfo2 = getAppsMetaInfo();
  if (appsMetaInfo2) {
    for (var additionalAppId in appsMetaInfo2) {
      updateClientMetaInfo(additionalAppId, options, appsMetaInfo2[additionalAppId]);
      delete appsMetaInfo2[additionalAppId];
    }
    clearAppsMetaInfo(true);
  }
  return {
    vm: rootVm,
    metaInfo,
    // eslint-disable-line object-shorthand
    tags
  };
}
function attributeGenerator(options, type, data3, _ref) {
  var addSsrAttribute = _ref.addSsrAttribute;
  var _ref2 = options || {}, attribute2 = _ref2.attribute, ssrAttribute2 = _ref2.ssrAttribute;
  var attributeStr = "";
  for (var attr in data3) {
    var attrData = data3[attr];
    var attrValues = [];
    for (var appId2 in attrData) {
      attrValues.push.apply(attrValues, _toConsumableArray$1([].concat(attrData[appId2])));
    }
    if (attrValues.length) {
      attributeStr += booleanHtmlAttributes.includes(attr) && attrValues.some(Boolean) ? "".concat(attr) : "".concat(attr, '="').concat(attrValues.join(" "), '"');
      attributeStr += " ";
    }
  }
  if (attributeStr) {
    attributeStr += "".concat(attribute2, '="').concat(encodeURI(JSON.stringify(data3)), '"');
  }
  if (type === "htmlAttrs" && addSsrAttribute) {
    return "".concat(ssrAttribute2).concat(attributeStr ? " " : "").concat(attributeStr);
  }
  return attributeStr;
}
function titleGenerator(options, type, data3, generatorOptions) {
  var _ref = generatorOptions || {}, ln = _ref.ln;
  if (!data3) {
    return "";
  }
  return "<".concat(type, ">").concat(data3, "</").concat(type, ">").concat(ln ? "\n" : "");
}
function tagGenerator(options, type, tags, generatorOptions) {
  var _ref = options || {}, ssrAppId2 = _ref.ssrAppId, attribute2 = _ref.attribute, tagIDKeyName2 = _ref.tagIDKeyName;
  var _ref2 = generatorOptions || {}, appId2 = _ref2.appId, _ref2$isSSR = _ref2.isSSR, isSSR = _ref2$isSSR === void 0 ? true : _ref2$isSSR, _ref2$body = _ref2.body, body = _ref2$body === void 0 ? false : _ref2$body, _ref2$pbody = _ref2.pbody, pbody = _ref2$pbody === void 0 ? false : _ref2$pbody, _ref2$ln = _ref2.ln, ln = _ref2$ln === void 0 ? false : _ref2$ln;
  var dataAttributes = [tagIDKeyName2].concat(_toConsumableArray$1(commonDataAttributes));
  if (!tags || !tags.length) {
    return "";
  }
  return tags.reduce(function(tagsStr, tag) {
    if (tag.skip) {
      return tagsStr;
    }
    var tagKeys = Object.keys(tag);
    if (tagKeys.length === 0) {
      return tagsStr;
    }
    if (Boolean(tag.body) !== body || Boolean(tag.pbody) !== pbody) {
      return tagsStr;
    }
    var attrs2 = tag.once ? "" : " ".concat(attribute2, '="').concat(appId2 || (isSSR === false ? "1" : ssrAppId2), '"');
    for (var attr in tag) {
      if (tagAttributeAsInnerContent.includes(attr) || tagProperties.includes(attr)) {
        continue;
      }
      if (attr === "callback") {
        attrs2 += ' onload="this.__vm_l=1"';
        continue;
      }
      var prefix = "";
      if (dataAttributes.includes(attr)) {
        prefix = "data-";
      }
      var isBooleanAttr2 = !prefix && booleanHtmlAttributes.includes(attr);
      if (isBooleanAttr2 && !tag[attr]) {
        continue;
      }
      attrs2 += " ".concat(prefix).concat(attr) + (isBooleanAttr2 ? "" : '="'.concat(tag[attr], '"'));
    }
    var json = "";
    if (tag.json) {
      json = JSON.stringify(tag.json);
    }
    var content = tag.innerHTML || tag.cssText || json;
    var hasEndTag = !tagsWithoutEndTag.includes(type);
    var hasContent = hasEndTag && tagsWithInnerContent.includes(type);
    return "".concat(tagsStr, "<").concat(type).concat(attrs2).concat(!hasContent && hasEndTag ? "/" : "", ">") + (hasContent ? "".concat(content, "</").concat(type, ">") : "") + (ln ? "\n" : "");
  }, "");
}
function generateServerInjector(options, metaInfo, globalInjectOptions) {
  var serverInjector = {
    data: metaInfo,
    extraData: void 0,
    addInfo: function addInfo(appId2, metaInfo2) {
      this.extraData = this.extraData || {};
      this.extraData[appId2] = metaInfo2;
    },
    callInjectors: function callInjectors(opts) {
      var m = this.injectors;
      return (opts.body || opts.pbody ? "" : m.title.text(opts)) + m.meta.text(opts) + m.base.text(opts) + m.link.text(opts) + m.style.text(opts) + m.script.text(opts) + m.noscript.text(opts);
    },
    injectors: {
      head: function head(ln) {
        return serverInjector.callInjectors(_objectSpread2(_objectSpread2({}, globalInjectOptions), {}, {
          ln
        }));
      },
      bodyPrepend: function bodyPrepend(ln) {
        return serverInjector.callInjectors(_objectSpread2(_objectSpread2({}, globalInjectOptions), {}, {
          ln,
          pbody: true
        }));
      },
      bodyAppend: function bodyAppend(ln) {
        return serverInjector.callInjectors(_objectSpread2(_objectSpread2({}, globalInjectOptions), {}, {
          ln,
          body: true
        }));
      }
    }
  };
  var _loop = function _loop2(type2) {
    if (metaInfoOptionKeys.includes(type2)) {
      return "continue";
    }
    serverInjector.injectors[type2] = {
      text: function text(injectOptions) {
        var addSsrAttribute = injectOptions === true;
        injectOptions = _objectSpread2(_objectSpread2({
          addSsrAttribute
        }, globalInjectOptions), injectOptions);
        if (type2 === "title") {
          return titleGenerator(options, type2, serverInjector.data[type2], injectOptions);
        }
        if (metaInfoAttributeKeys.includes(type2)) {
          var attributeData = {};
          var data3 = serverInjector.data[type2];
          if (data3) {
            var appId2 = injectOptions.isSSR === false ? "1" : options.ssrAppId;
            for (var attr in data3) {
              attributeData[attr] = _defineProperty({}, appId2, data3[attr]);
            }
          }
          if (serverInjector.extraData) {
            for (var _appId in serverInjector.extraData) {
              var _data = serverInjector.extraData[_appId][type2];
              if (_data) {
                for (var _attr in _data) {
                  attributeData[_attr] = _objectSpread2(_objectSpread2({}, attributeData[_attr]), {}, _defineProperty({}, _appId, _data[_attr]));
                }
              }
            }
          }
          return attributeGenerator(options, type2, attributeData, injectOptions);
        }
        var str = tagGenerator(options, type2, serverInjector.data[type2], injectOptions);
        if (serverInjector.extraData) {
          for (var _appId2 in serverInjector.extraData) {
            var _data2 = serverInjector.extraData[_appId2][type2];
            var extraStr = tagGenerator(options, type2, _data2, _objectSpread2({
              appId: _appId2
            }, injectOptions));
            str = "".concat(str).concat(extraStr);
          }
        }
        return str;
      }
    };
  };
  for (var type in defaultInfo) {
    var _ret = _loop(type);
    if (_ret === "continue")
      continue;
  }
  return serverInjector;
}
function inject(rootVm, options, injectOptions) {
  if (!rootVm[rootConfigKey]) {
    showWarningNotSupported();
    return {};
  }
  var rawInfo = getComponentMetaInfo(options, rootVm);
  var metaInfo = getMetaInfo(options, rawInfo, serverSequences, rootVm);
  var serverInjector = generateServerInjector(options, metaInfo, injectOptions);
  var appsMetaInfo2 = getAppsMetaInfo();
  if (appsMetaInfo2) {
    for (var additionalAppId in appsMetaInfo2) {
      serverInjector.addInfo(additionalAppId, appsMetaInfo2[additionalAppId]);
      delete appsMetaInfo2[additionalAppId];
    }
    clearAppsMetaInfo(true);
  }
  return serverInjector.injectors;
}
function $meta(options) {
  options = options || {};
  var $root = this.$root;
  return {
    getOptions: function getOptions$1() {
      return getOptions(options);
    },
    setOptions: function setOptions2(newOptions) {
      var refreshNavKey = "refreshOnceOnNavigation";
      if (newOptions && newOptions[refreshNavKey]) {
        options.refreshOnceOnNavigation = !!newOptions[refreshNavKey];
        addNavGuards($root);
      }
      var debounceWaitKey = "debounceWait";
      if (newOptions && debounceWaitKey in newOptions) {
        var debounceWait2 = parseInt(newOptions[debounceWaitKey]);
        if (!isNaN(debounceWait2)) {
          options.debounceWait = debounceWait2;
        }
      }
      var waitOnDestroyedKey = "waitOnDestroyed";
      if (newOptions && waitOnDestroyedKey in newOptions) {
        options.waitOnDestroyed = !!newOptions[waitOnDestroyedKey];
      }
    },
    refresh: function refresh$1() {
      return refresh($root, options);
    },
    inject: function inject$1(injectOptions) {
      return inject($root, options, injectOptions);
    },
    pause: function pause$1() {
      return pause($root);
    },
    resume: function resume$1() {
      return resume($root);
    },
    addApp: function addApp$1(appId2) {
      return addApp($root, appId2, options);
    }
  };
}
function generate(rawInfo, options) {
  options = setOptions(options);
  var metaInfo = getMetaInfo(options, rawInfo, serverSequences);
  var serverInjector = generateServerInjector(options, metaInfo);
  return serverInjector.injectors;
}
function install$1(Vue2, options) {
  if (Vue2.__vuemeta_installed) {
    return;
  }
  Vue2.__vuemeta_installed = true;
  options = setOptions(options);
  Vue2.prototype.$meta = function() {
    return $meta.call(this, options);
  };
  Vue2.mixin(createMixin(Vue2, options));
}
var index$1 = {
  version,
  install: install$1,
  generate: function generate$1(metaInfo, options) {
    return generate(metaInfo, options);
  },
  hasMetaInfo
};
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++)
      arr2[i] = arr[i];
    return arr2;
  }
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]")
    return Array.from(iter);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
var inBrowser = typeof window !== "undefined";
function freeze(item) {
  if (Array.isArray(item) || _typeof(item) === "object") {
    return Object.freeze(item);
  }
  return item;
}
function combinePassengers(transports2) {
  var slotProps = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return transports2.reduce(function(passengers2, transport) {
    var temp = transport.passengers[0];
    var newPassengers = typeof temp === "function" ? temp(slotProps) : transport.passengers;
    return passengers2.concat(newPassengers);
  }, []);
}
function stableSort(array, compareFn) {
  return array.map(function(v, idx) {
    return [idx, v];
  }).sort(function(a, b) {
    return compareFn(a[1], b[1]) || a[0] - b[0];
  }).map(function(c) {
    return c[1];
  });
}
function pick(obj, keys) {
  return keys.reduce(function(acc, key) {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}
var transports = {};
var targets = {};
var sources = {};
var Wormhole = Vue$1.extend({
  data: function data() {
    return {
      transports,
      targets,
      sources,
      trackInstances: inBrowser
    };
  },
  methods: {
    open: function open(transport) {
      if (!inBrowser)
        return;
      var to2 = transport.to, from = transport.from, passengers2 = transport.passengers, _transport$order = transport.order, order = _transport$order === void 0 ? Infinity : _transport$order;
      if (!to2 || !from || !passengers2)
        return;
      var newTransport = {
        to: to2,
        from,
        passengers: freeze(passengers2),
        order
      };
      var keys = Object.keys(this.transports);
      if (keys.indexOf(to2) === -1) {
        Vue$1.set(this.transports, to2, []);
      }
      var currentIndex = this.$_getTransportIndex(newTransport);
      var newTransports = this.transports[to2].slice(0);
      if (currentIndex === -1) {
        newTransports.push(newTransport);
      } else {
        newTransports[currentIndex] = newTransport;
      }
      this.transports[to2] = stableSort(newTransports, function(a, b) {
        return a.order - b.order;
      });
    },
    close: function close(transport) {
      var force = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var to2 = transport.to, from = transport.from;
      if (!to2 || !from && force === false)
        return;
      if (!this.transports[to2]) {
        return;
      }
      if (force) {
        this.transports[to2] = [];
      } else {
        var index2 = this.$_getTransportIndex(transport);
        if (index2 >= 0) {
          var newTransports = this.transports[to2].slice(0);
          newTransports.splice(index2, 1);
          this.transports[to2] = newTransports;
        }
      }
    },
    registerTarget: function registerTarget(target2, vm, force) {
      if (!inBrowser)
        return;
      if (this.trackInstances && !force && this.targets[target2]) {
        console.warn("[portal-vue]: Target ".concat(target2, " already exists"));
      }
      this.$set(this.targets, target2, Object.freeze([vm]));
    },
    unregisterTarget: function unregisterTarget(target2) {
      this.$delete(this.targets, target2);
    },
    registerSource: function registerSource(source, vm, force) {
      if (!inBrowser)
        return;
      if (this.trackInstances && !force && this.sources[source]) {
        console.warn("[portal-vue]: source ".concat(source, " already exists"));
      }
      this.$set(this.sources, source, Object.freeze([vm]));
    },
    unregisterSource: function unregisterSource(source) {
      this.$delete(this.sources, source);
    },
    hasTarget: function hasTarget(to2) {
      return !!(this.targets[to2] && this.targets[to2][0]);
    },
    hasSource: function hasSource(to2) {
      return !!(this.sources[to2] && this.sources[to2][0]);
    },
    hasContentFor: function hasContentFor(to2) {
      return !!this.transports[to2] && !!this.transports[to2].length;
    },
    // Internal
    $_getTransportIndex: function $_getTransportIndex(_ref) {
      var to2 = _ref.to, from = _ref.from;
      for (var i in this.transports[to2]) {
        if (this.transports[to2][i].from === from) {
          return +i;
        }
      }
      return -1;
    }
  }
});
var wormhole = new Wormhole(transports);
var _id = 1;
var Portal = Vue$1.extend({
  name: "portal",
  props: {
    disabled: {
      type: Boolean
    },
    name: {
      type: String,
      default: function _default() {
        return String(_id++);
      }
    },
    order: {
      type: Number,
      default: 0
    },
    slim: {
      type: Boolean
    },
    slotProps: {
      type: Object,
      default: function _default2() {
        return {};
      }
    },
    tag: {
      type: String,
      default: "DIV"
    },
    to: {
      type: String,
      default: function _default3() {
        return String(Math.round(Math.random() * 1e7));
      }
    }
  },
  created: function created() {
    var _this = this;
    this.$nextTick(function() {
      wormhole.registerSource(_this.name, _this);
    });
  },
  mounted: function mounted() {
    if (!this.disabled) {
      this.sendUpdate();
    }
  },
  updated: function updated() {
    if (this.disabled) {
      this.clear();
    } else {
      this.sendUpdate();
    }
  },
  beforeDestroy: function beforeDestroy() {
    wormhole.unregisterSource(this.name);
    this.clear();
  },
  watch: {
    to: function to(newValue, oldValue) {
      oldValue && oldValue !== newValue && this.clear(oldValue);
      this.sendUpdate();
    }
  },
  methods: {
    clear: function clear(target2) {
      var closer = {
        from: this.name,
        to: target2 || this.to
      };
      wormhole.close(closer);
    },
    normalizeSlots: function normalizeSlots() {
      return this.$scopedSlots.default ? [this.$scopedSlots.default] : this.$slots.default;
    },
    normalizeOwnChildren: function normalizeOwnChildren(children2) {
      return typeof children2 === "function" ? children2(this.slotProps) : children2;
    },
    sendUpdate: function sendUpdate() {
      var slotContent = this.normalizeSlots();
      if (slotContent) {
        var transport = {
          from: this.name,
          to: this.to,
          passengers: _toConsumableArray(slotContent),
          order: this.order
        };
        wormhole.open(transport);
      } else {
        this.clear();
      }
    }
  },
  render: function render3(h) {
    var children2 = this.$slots.default || this.$scopedSlots.default || [];
    var Tag = this.tag;
    if (children2 && this.disabled) {
      return children2.length <= 1 && this.slim ? this.normalizeOwnChildren(children2)[0] : h(Tag, [this.normalizeOwnChildren(children2)]);
    } else {
      return this.slim ? h() : h(Tag, {
        class: {
          "v-portal": true
        },
        style: {
          display: "none"
        },
        key: "v-portal-placeholder"
      });
    }
  }
});
var PortalTarget = Vue$1.extend({
  name: "portalTarget",
  props: {
    multiple: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      required: true
    },
    slim: {
      type: Boolean,
      default: false
    },
    slotProps: {
      type: Object,
      default: function _default4() {
        return {};
      }
    },
    tag: {
      type: String,
      default: "div"
    },
    transition: {
      type: [String, Object, Function]
    }
  },
  data: function data2() {
    return {
      transports: wormhole.transports,
      firstRender: true
    };
  },
  created: function created2() {
    var _this = this;
    this.$nextTick(function() {
      wormhole.registerTarget(_this.name, _this);
    });
  },
  watch: {
    ownTransports: function ownTransports() {
      this.$emit("change", this.children().length > 0);
    },
    name: function name(newVal, oldVal) {
      wormhole.unregisterTarget(oldVal);
      wormhole.registerTarget(newVal, this);
    }
  },
  mounted: function mounted2() {
    var _this2 = this;
    if (this.transition) {
      this.$nextTick(function() {
        _this2.firstRender = false;
      });
    }
  },
  beforeDestroy: function beforeDestroy2() {
    wormhole.unregisterTarget(this.name);
  },
  computed: {
    ownTransports: function ownTransports2() {
      var transports2 = this.transports[this.name] || [];
      if (this.multiple) {
        return transports2;
      }
      return transports2.length === 0 ? [] : [transports2[transports2.length - 1]];
    },
    passengers: function passengers() {
      return combinePassengers(this.ownTransports, this.slotProps);
    }
  },
  methods: {
    // can't be a computed prop because it has to "react" to $slot changes.
    children: function children() {
      return this.passengers.length !== 0 ? this.passengers : this.$scopedSlots.default ? this.$scopedSlots.default(this.slotProps) : this.$slots.default || [];
    },
    // can't be a computed prop because it has to "react" to this.children().
    noWrapper: function noWrapper() {
      var noWrapper2 = this.slim && !this.transition;
      if (noWrapper2 && this.children().length > 1) {
        console.warn("[portal-vue]: PortalTarget with `slim` option received more than one child element.");
      }
      return noWrapper2;
    }
  },
  render: function render4(h) {
    var noWrapper2 = this.noWrapper();
    var children2 = this.children();
    var Tag = this.transition || this.tag;
    return noWrapper2 ? children2[0] : this.slim && !Tag ? h() : h(Tag, {
      props: {
        // if we have a transition component, pass the tag if it exists
        tag: this.transition && this.tag ? this.tag : void 0
      },
      class: {
        "vue-portal-target": true
      }
    }, children2);
  }
});
var _id$1 = 0;
var portalProps = ["disabled", "name", "order", "slim", "slotProps", "tag", "to"];
var targetProps = ["multiple", "transition"];
var MountingPortal = Vue$1.extend({
  name: "MountingPortal",
  inheritAttrs: false,
  props: {
    append: {
      type: [Boolean, String]
    },
    bail: {
      type: Boolean
    },
    mountTo: {
      type: String,
      required: true
    },
    // Portal
    disabled: {
      type: Boolean
    },
    // name for the portal
    name: {
      type: String,
      default: function _default5() {
        return "mounted_" + String(_id$1++);
      }
    },
    order: {
      type: Number,
      default: 0
    },
    slim: {
      type: Boolean
    },
    slotProps: {
      type: Object,
      default: function _default6() {
        return {};
      }
    },
    tag: {
      type: String,
      default: "DIV"
    },
    // name for the target
    to: {
      type: String,
      default: function _default7() {
        return String(Math.round(Math.random() * 1e7));
      }
    },
    // Target
    multiple: {
      type: Boolean,
      default: false
    },
    targetSlim: {
      type: Boolean
    },
    targetSlotProps: {
      type: Object,
      default: function _default8() {
        return {};
      }
    },
    targetTag: {
      type: String,
      default: "div"
    },
    transition: {
      type: [String, Object, Function]
    }
  },
  created: function created3() {
    if (typeof document === "undefined")
      return;
    var el = document.querySelector(this.mountTo);
    if (!el) {
      console.error("[portal-vue]: Mount Point '".concat(this.mountTo, "' not found in document"));
      return;
    }
    var props2 = this.$props;
    if (wormhole.targets[props2.name]) {
      if (props2.bail) {
        console.warn("[portal-vue]: Target ".concat(props2.name, " is already mounted.\n        Aborting because 'bail: true' is set"));
      } else {
        this.portalTarget = wormhole.targets[props2.name];
      }
      return;
    }
    var append2 = props2.append;
    if (append2) {
      var type = typeof append2 === "string" ? append2 : "DIV";
      var mountEl = document.createElement(type);
      el.appendChild(mountEl);
      el = mountEl;
    }
    var _props = pick(this.$props, targetProps);
    _props.slim = this.targetSlim;
    _props.tag = this.targetTag;
    _props.slotProps = this.targetSlotProps;
    _props.name = this.to;
    this.portalTarget = new PortalTarget({
      el,
      parent: this.$parent || this,
      propsData: _props
    });
  },
  beforeDestroy: function beforeDestroy3() {
    var target2 = this.portalTarget;
    if (this.append) {
      var el = target2.$el;
      el.parentNode.removeChild(el);
    }
    target2.$destroy();
  },
  render: function render5(h) {
    if (!this.portalTarget) {
      console.warn("[portal-vue] Target wasn't mounted");
      return h();
    }
    if (!this.$scopedSlots.manual) {
      var props2 = pick(this.$props, portalProps);
      return h(Portal, {
        props: props2,
        attrs: this.$attrs,
        on: this.$listeners,
        scopedSlots: this.$scopedSlots
      }, this.$slots.default);
    }
    var content = this.$scopedSlots.manual({
      to: this.to
    });
    if (Array.isArray(content)) {
      content = content[0];
    }
    if (!content)
      return h();
    return content;
  }
});
function install(Vue$$1) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  Vue$$1.component(options.portalName || "Portal", Portal);
  Vue$$1.component(options.portalTargetName || "PortalTarget", PortalTarget);
  Vue$$1.component(options.MountingPortalName || "MountingPortal", MountingPortal);
}
var index = {
  install
};
const main = "";
function normalizeComponent(scriptExports, render26, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render26) {
    options.render = render26;
    options.staticRenderFns = staticRenderFns;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(
        this,
        (options.functional ? this.parent : this).$root.$options.shadowRoot
      );
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const _sfc_main$i = {
  data() {
    return {
      season: null
    };
  },
  computed: {
    sortedSeasons() {
      return [...this.seasons].sort((a, b) => b - a);
    },
    ...mapState({
      currentseason: (state2) => state2.summoner.basic.currentSeason,
      seasons: (state2) => state2.summoner.basic.seasons
    })
  },
  created() {
    this.season = this.currentseason;
  },
  methods: {
    filterSeason() {
      this.updateSeason(this.season);
    },
    ...mapActions("summoner", ["updateSeason"])
  }
};
var _sfc_render$i = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "group relative inline-block self-end leading-none text-blue-200" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.season, expression: "season" }], staticClass: "block w-full cursor-pointer appearance-none rounded-md bg-transparent px-4 pr-8 focus:outline-none group-hover:text-white", attrs: { "dir": "rtl" }, on: { "change": [function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.season = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  }, _vm.filterSeason] } }, [_c("option", { staticClass: "bg-blue-800", domProps: { "value": null } }, [_vm._v("All seasons")]), _vm._l(_vm.sortedSeasons, function(s, index2) {
    return _c("option", { key: index2, staticClass: "bg-blue-800", domProps: { "value": s } }, [Number.isInteger(s) ? [_vm._v("Season " + _vm._s(s))] : [_vm._v("Preseason " + _vm._s(s + 0.5))]], 2);
  })], 2), _c("div", { staticClass: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" }, [_c("svg", { staticClass: "h-4 w-4 text-blue-200 group-hover:text-white" }, [_c("use", { attrs: { "xlink:href": "#caret-down" } })])])]);
};
var _sfc_staticRenderFns$i = [];
var __component__$i = /* @__PURE__ */ normalizeComponent(
  _sfc_main$i,
  _sfc_render$i,
  _sfc_staticRenderFns$i,
  false,
  null,
  null,
  null,
  null
);
const FilterSeason = __component__$i.exports;
const _sfc_main$h = {
  props: {
    imageSource: {
      type: String,
      required: true
    },
    imageClass: {
      type: String,
      required: false,
      default: ""
    },
    backgroundSize: {
      type: String,
      required: false,
      default: "cover"
    },
    moreBackgrounds: {
      type: String,
      required: false,
      default: ""
    },
    transitionName: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      imageState: "loading",
      asyncImage: new Image()
    };
  },
  computed: {
    computedStyle() {
      if (this.imageState === "loaded") {
        return `background-image: ${this.moreBackgrounds} url(${this.asyncImage.src}); background-size: ${this.backgroundSize}`;
      }
      return "";
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchImage();
    });
  },
  methods: {
    fetchImage() {
      this.asyncImage.onload = this.imageOnLoad;
      this.imageState = "loading";
      this.asyncImage.src = this.imageSource;
    },
    imageOnLoad() {
      this.imageState = "loaded";
    }
  }
};
var _sfc_render$h = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": _vm.transitionName } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.imageState === "loaded", expression: "imageState === 'loaded'" }], class: [_vm.imageClass, _vm.imageState], style: _vm.computedStyle, attrs: { "data-state": _vm.imageState } })]);
};
var _sfc_staticRenderFns$h = [];
var __component__$h = /* @__PURE__ */ normalizeComponent(
  _sfc_main$h,
  _sfc_render$h,
  _sfc_staticRenderFns$h,
  false,
  null,
  null,
  null,
  null
);
const LazyBackground = __component__$h.exports;
const MainFooter_vue_vue_type_style_index_0_scoped_7fa5f000_lang = "";
const _sfc_main$g = {};
var _sfc_render$g = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("footer", { staticClass: "pb-4 pt-20 text-blue-200" }, [_vm._m(0), _c("div", { staticClass: "flex items-center justify-between px-6" }, [_c("p", [_c("a", { staticClass: "block w-32 transition duration-200 hover:text-white", attrs: { "href": "https://m.do.co/c/4f4a6c382133", "target": "_blank" } }, [_c("svg", { staticClass: "fill-current", attrs: { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 604 129" } }, [_c("path", { attrs: { "d": "M174.3,3c4.9,0,8.7,2.9,8.7,8.6c0,5.6-3.8,8.5-8.7,8.5h-7.6v11.1h-3.5V3H174.3z M166.7,17.1h7.2\n				c3,0,5.6-1.8,5.6-5.5c0-3.8-2.5-5.5-5.6-5.5h-7.2V17.1z" } }), _c("path", { attrs: { "d": "M208.8,21.7c0,6.1-4.3,10-9.9,10c-5.6,0-9.9-3.9-9.9-10c0-6.1,4.3-10,9.9-10\n				C204.5,11.7,208.8,15.6,208.8,21.7z M192.3,21.7c0,4.5,2.9,7.2,6.6,7.2c3.7,0,6.6-2.7,6.6-7.2c0-4.5-2.9-7.1-6.6-7.1\n				C195.2,14.5,192.3,17.2,192.3,21.7z" } }), _c("path", { attrs: { "d": "M234.4,31.3l-5.2-13.8L224,31.3h-2.6L214.1,12h3.6l5.2,14l5.2-14h2.3l5.3,14l5.2-14h3.5L237,31.3H234.4z" } }), _c("path", { attrs: { "d": "M253,22.9c0.2,3.7,2.6,5.9,6,5.9c2.8,0,4.8-1.3,5.4-3.4l3.2,0.2c-0.8,3.5-4.1,6.1-8.6,6.1\n				c-5.5,0-9.6-3.7-9.6-10c0-6.3,4-10,9.5-10c5.5,0,8.8,3.7,8.8,9.4v1.8H253z M253,20.3h11.6c-0.1-3.4-2-5.7-5.6-5.7\n				C255.6,14.5,253.2,16.5,253,20.3z" } }), _c("path", { attrs: { "d": "M285.4,14.9c-3.4,0-5.6,2.3-5.6,5.3v11.1h-3.2V12h3.2v2.9c0.7-1.6,2.5-3.1,5.7-3.1V14.9z" } }), _c("path", { attrs: { "d": "M294.7,22.9c0.2,3.7,2.6,5.9,6,5.9c2.8,0,4.8-1.3,5.4-3.4l3.2,0.2c-0.8,3.5-4.1,6.1-8.6,6.1\n				c-5.5,0-9.6-3.7-9.6-10c0-6.3,4-10,9.5-10c5.5,0,8.8,3.7,8.8,9.4v1.8H294.7z M294.7,20.3h11.6c-0.1-3.4-2-5.7-5.6-5.7\n				C297.4,14.5,294.9,16.5,294.7,20.3z" } }), _c("path", { attrs: { "d": "M333.1,31.3v-3.1c-1.1,2-3.6,3.5-6.8,3.5c-5.3,0-9.3-3.8-9.3-10c0-6.2,4-10,9.3-10c3.2,0,5.6,1.4,6.6,3.2V2\n				h3.2v29.4H333.1z M320.3,21.7c0,4.6,2.8,7.2,6.5,7.2c3.6,0,6.2-2.2,6.2-6.6v-1.1c0-4.3-2.6-6.6-6.2-6.6\n				C323.1,14.5,320.3,17.1,320.3,21.7z" } }), _c("path", { attrs: { "d": "M361.8,14.9c1.1-1.9,3.4-3.2,6.7-3.2c5.3,0,9.3,3.8,9.3,10c0,6.2-4,10-9.3,10c-3.3,0-5.7-1.5-6.8-3.5v3.1\n				h-3.1V2h3.2V14.9z M361.9,21.1v1.1c0,4.4,2.6,6.6,6.2,6.6c3.7,0,6.5-2.5,6.5-7.2c0-4.6-2.8-7.1-6.5-7.1\n				C364.5,14.5,361.9,16.8,361.9,21.1z" } }), _c("path", { attrs: { "d": "M386.3,40.9l4.6-10.7L383.2,12h3.6l5.8,14.5l5.8-14.5h3.6l-12.2,28.9H386.3z" } }), _c("path", { attrs: { "d": "M64.4,127l0-24.2c25.6,0,45.5-25.4,35.7-52.3c-3.6-10-11.6-17.9-21.6-21.6\n									c-27-9.8-52.3,10-52.3,35.7c0,0,0,0,0,0L2,64.7C2,23.8,41.5-8,84.3,5.4c18.7,5.8,33.6,20.7,39.4,39.4\n									C137,87.6,105.2,127,64.4,127z" } }), _c("polygon", { attrs: { "points": "64.4,102.9 40.4,102.9 40.4,78.9 40.4,78.9 64.4,78.9 64.4,78.9" } }), _c("polygon", { attrs: { "points": "40.3,121.5 21.8,121.5 21.8,121.5 21.8,102.9 40.4,102.9 40.4,121.5" } }), _c("path", { attrs: { "d": "M21.9,102.9H6.3c0,0,0,0,0,0V87.4c0,0,0,0,0,0h15.5c0,0,0,0,0,0V102.9z" } }), _c("path", { attrs: { "d": "M200.9,52.4c-5.5-3.8-12.4-5.8-20.5-5.8h-17.5v55.5h17.5c8,0,14.9-2.1,20.5-6.1\n					c3-2.1,5.4-5.1,7.1-8.9c1.7-3.7,2.5-8.2,2.5-13.1c0-4.9-0.8-9.3-2.5-13C206.3,57.4,203.9,54.4,200.9,52.4z M173.1,56h5.5\n					c6.1,0,11.1,1.2,15,3.6c4.2,2.6,6.4,7.4,6.4,14.4c0,7.2-2.2,12.3-6.4,15.1h0c-3.7,2.4-8.7,3.6-14.9,3.6h-5.6V56z" } }), _c("path", { attrs: { "d": "M222.6,45.9c-1.7,0-3.1,0.6-4.3,1.8c-1.2,1.1-1.8,2.6-1.8,4.2c0,1.7,0.6,3.1,1.8,4.3\n					c1.2,1.2,2.6,1.8,4.3,1.8c1.7,0,3.1-0.6,4.3-1.8c1.2-1.2,1.8-2.6,1.8-4.3c0-1.7-0.6-3.1-1.8-4.2\n					C225.7,46.5,224.3,45.9,222.6,45.9z" } }), _c("rect", { staticClass: "st0", attrs: { "x": "217.6", "y": "63", "width": "9.8", "height": "39.1" } }), _c("path", { attrs: { "d": "M263.2,66.3c-3-2.6-6.3-4.2-9.9-4.2c-5.4,0-9.9,1.9-13.4,5.6c-3.5,3.7-5.3,8.4-5.3,14.1\n					c0,5.5,1.8,10.2,5.2,14c3.5,3.7,8,5.5,13.5,5.5c3.8,0,7.1-1.1,9.7-3.1V99c0,3.2-0.9,5.8-2.6,7.5c-1.7,1.7-4.1,2.6-7.1,2.6\n					c-4.5,0-7.4-1.8-10.9-6.5l-6.7,6.4l0.2,0.3c1.4,2,3.7,4,6.6,5.9c2.9,1.9,6.6,2.8,10.9,2.8c5.8,0,10.6-1.8,14.1-5.4\n					c3.5-3.6,5.3-8.4,5.3-14.2V63h-9.7V66.3z M260.6,89.4c-1.7,2-3.9,2.9-6.8,2.9c-2.8,0-5-0.9-6.7-2.9c-1.7-1.9-2.5-4.5-2.5-7.7\n					c0-3.2,0.9-5.8,2.5-7.7c1.7-1.9,3.9-2.9,6.7-2.9c2.8,0,5,1,6.8,2.9c1.7,2,2.6,4.6,2.6,7.7C263.2,84.9,262.3,87.5,260.6,89.4z" } }), _c("rect", { staticClass: "st0", attrs: { "x": "281.3", "y": "63", "width": "9.8", "height": "39.1" } }), _c("path", { attrs: { "d": "M286.3,45.9c-1.7,0-3.1,0.6-4.3,1.8c-1.2,1.1-1.8,2.6-1.8,4.2c0,1.7,0.6,3.1,1.8,4.3\n					c1.2,1.2,2.6,1.8,4.3,1.8c1.7,0,3.1-0.6,4.3-1.8c1.2-1.2,1.8-2.6,1.8-4.3c0-1.7-0.6-3.1-1.8-4.2C289.4,46.5,288,45.9,286.3,45.9\n					z" } }), _c("path", { attrs: { "d": "M312.7,52.5H303V63h-5.6v9h5.6v16.2c0,5.1,1,8.7,3,10.8c2,2.1,5.6,3.2,10.6,3.2\n					c1.6,0,3.2-0.1,4.8-0.2l0.4,0v-9l-3.4,0.2c-2.3,0-3.9-0.4-4.7-1.2c-0.8-0.8-1.1-2.6-1.1-5.2V72h9.2v-9h-9.2V52.5z" } }), _c("rect", { staticClass: "st0", attrs: { "x": "368", "y": "46.6", "width": "9.8", "height": "55.5" } }), _c("path", { attrs: { "d": "M477.3,88.2c-1.8,2-3.6,3.7-4.9,4.6v0c-1.4,0.9-3.1,1.3-5.1,1.3c-2.9,0-5.2-1.1-7.1-3.2\n					c-1.9-2.2-2.8-4.9-2.8-8.3s0.9-6.1,2.8-8.2c1.9-2.2,4.2-3.2,7.1-3.2c3.2,0,6.5,2,9.4,5.4l6.5-6.2l0,0c-4.2-5.5-9.7-8.1-16.1-8.1\n					c-5.4,0-10.1,2-13.9,5.8c-3.8,3.9-5.7,8.8-5.7,14.6s1.9,10.7,5.7,14.6c3.8,3.9,8.5,5.9,13.9,5.9c7.1,0,12.9-3.1,16.8-8.7\n					L477.3,88.2z" } }), _c("path", { attrs: { "d": "M517.7,68.5c-1.4-1.9-3.3-3.5-5.7-4.7c-2.3-1.1-5.1-1.7-8.1-1.7c-5.5,0-10,2-13.4,6\n					c-3.3,4-4.9,8.9-4.9,14.7c0,5.9,1.8,10.8,5.4,14.6c3.6,3.7,8.4,5.6,14.2,5.6c6.6,0,12.1-2.7,16.2-8l0.2-0.3l-6.4-6.2l0,0\n					c-0.6,0.7-1.4,1.5-2.2,2.3c-1,0.9-1.9,1.6-2.9,2.1c-1.5,0.7-3.1,1.1-5,1.1c-2.7,0-5-0.8-6.7-2.4c-1.6-1.5-2.6-3.5-2.8-5.9h26.1\n					l0.1-3.6c0-2.5-0.3-5-1-7.3C520.1,72.6,519.1,70.4,517.7,68.5z M496.2,77.7c0.5-1.9,1.3-3.4,2.6-4.6c1.3-1.3,3.1-2,5.2-2\n					c2.4,0,4.2,0.7,5.5,2c1.2,1.2,1.8,2.8,2,4.6H496.2z" } }), _c("path", { attrs: { "d": "M555.5,66L555.5,66c-3-2.5-7.1-3.8-12.3-3.8c-3.3,0-6.3,0.7-9.1,2.1\n					c-2.6,1.3-5.1,3.5-6.7,6.3l0.1,0.1l6.3,6c2.6-4.1,5.5-5.6,9.3-5.6c2.1,0,3.8,0.6,5.1,1.6c1.3,1.1,1.9,2.5,1.9,4.2v1.9\n					c-2.4-0.7-4.9-1.1-7.2-1.1c-4.9,0-8.9,1.2-11.8,3.4c-3,2.3-4.5,5.6-4.5,9.8c0,3.7,1.3,6.7,3.8,8.9c2.6,2.1,5.8,3.2,9.5,3.2\n					c3.7,0,7.3-1.5,10.4-4.1v3.2h9.7V77C560,72.2,558.5,68.5,555.5,66z M538,87.2c1.1-0.8,2.7-1.2,4.7-1.2c2.4,0,4.9,0.5,7.5,1.4\n					v3.8c-2.1,2-5,3-8.5,3c-1.7,0-3-0.4-3.9-1.1c-0.9-0.7-1.3-1.7-1.3-2.8C536.4,89,536.9,88,538,87.2z" } }), _c("path", { attrs: { "d": "M597.9,66.7c-2.7-3.1-6.6-4.6-11.5-4.6c-3.9,0-7.1,1.1-9.4,3.3V63h-9.7v39.1h9.8V80.6\n					c0-3,0.7-5.3,2.1-7c1.4-1.7,3.3-2.5,5.8-2.5c2.2,0,3.9,0.7,5.2,2.2c1.3,1.5,1.9,3.6,1.9,6.2v22.7h9.8V79.5\n					C602,74.1,600.6,69.8,597.9,66.7z" } }), _c("path", { attrs: { "d": "M355.6,66L355.6,66c-3-2.5-7.1-3.8-12.3-3.8c-3.3,0-6.3,0.7-9.1,2.1\n					c-2.6,1.3-5.1,3.5-6.7,6.3l0.1,0.1l6.3,6c2.6-4.1,5.5-5.6,9.3-5.6c2.1,0,3.8,0.6,5.1,1.6c1.3,1.1,1.9,2.5,1.9,4.2v1.9\n					c-2.4-0.7-4.9-1.1-7.2-1.1c-4.9,0-8.9,1.2-11.8,3.4c-3,2.3-4.5,5.6-4.5,9.8c0,3.7,1.3,6.7,3.8,8.9c2.6,2.1,5.8,3.2,9.5,3.2\n					c3.7,0,7.3-1.5,10.4-4.1v3.2h9.7V77C360.2,72.2,358.7,68.5,355.6,66z M338.2,87.2c1.1-0.8,2.7-1.2,4.7-1.2\n					c2.4,0,4.9,0.5,7.5,1.4v3.8c-2.1,2-5,3-8.5,3c-1.7,0-3-0.4-3.9-1.1c-0.9-0.7-1.3-1.7-1.3-2.8C336.6,89,337.1,88,338.2,87.2z" } }), _c("path", { attrs: { "d": "M413.6,103c-15.8,0-28.6-12.8-28.6-28.6s12.8-28.6,28.6-28.6s28.6,12.8,28.6,28.6\n					S429.4,103,413.6,103z M413.6,55.8c-10.2,0-18.5,8.3-18.5,18.5s8.3,18.5,18.5,18.5s18.5-8.3,18.5-18.5S423.8,55.8,413.6,55.8z" } })])])]), _c("a", { staticClass: "github relative text-sm", attrs: { "href": "https://github.com/vkaelin/LeagueStats", "target": "_blank" } }, [_c("svg", { staticClass: "absolute fill-current", attrs: { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24" } }, [_c("path", { attrs: { "d": "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" } })]), _c("span", { staticClass: "ml-8" }, [_vm._v("Open Source Project")])])])]);
};
var _sfc_staticRenderFns$g = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "horizontal-center pointer-events-none absolute text-center text-xxs leading-tight", staticStyle: { "color": "#5d80af" } }, [_vm._v(" LeagueStats.gg isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. "), _c("br"), _vm._v("Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc. ")]);
}];
var __component__$g = /* @__PURE__ */ normalizeComponent(
  _sfc_main$g,
  _sfc_render$g,
  _sfc_staticRenderFns$g,
  false,
  null,
  "7fa5f000",
  null,
  null
);
const MainFooter = __component__$g.exports;
const _sfc_main$f = {
  data() {
    return {
      isOpen: false,
      left: 0,
      offset: 12,
      top: 0,
      directionBottom: true,
      directionRight: true,
      directionChecked: false,
      width: 0
    };
  },
  computed: {
    position() {
      const valuetoRemove = this.directionBottom ? 0 : this.height();
      const leftValue = this.directionRight ? this.left + this.offset : this.left - this.width - this.offset / 2;
      return {
        left: `${leftValue}px`,
        top: `${this.top + this.offset - valuetoRemove}px`
      };
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    checkTooltipVisibility() {
      this.directionChecked = true;
      const contentRect = this.$refs.content.getBoundingClientRect();
      const triggerRect = this.$refs.trigger.getBoundingClientRect();
      this.width = contentRect.width;
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth);
      this.directionBottom = contentRect.bottom + this.offset < viewHeight;
      this.directionRight = this.left + this.width + triggerRect.width + this.offset < viewWidth;
    },
    handleScroll() {
      this.isOpen = false;
    },
    height() {
      return this.$refs.content ? this.$refs.content.clientHeight : 0;
    },
    hideTooltip() {
      this.isOpen = false;
      this.directionBottom = true;
      this.directionRight = true;
      this.directionChecked = false;
    },
    async mousemove(event) {
      this.left = event.clientX;
      this.top = event.clientY;
      if (!this.directionChecked) {
        if (!this.$refs.content || !this.$refs.trigger) {
          return;
        }
        await this.$nextTick();
        this.checkTooltipVisibility();
      }
    },
    showTooltip(event) {
      this.left = event.clientX;
      this.top = event.clientY;
      this.isOpen = true;
    }
  }
};
var _sfc_render$f = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { ref: "trigger", attrs: { "aria-expanded": _vm.isOpen, "aria-haspopup": "true" }, on: { "mouseenter": _vm.showTooltip, "mousemove": _vm.mousemove, "mouseleave": _vm.hideTooltip } }, [_vm._t("trigger")], 2), _vm.isOpen ? _c("portal", { attrs: { "to": "tooltip-destination" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.isOpen, expression: "isOpen" }], ref: "content", staticClass: "fixed z-50 rounded-md bg-blue-1000 py-2 shadow", style: { ..._vm.position } }, [_vm._t("default")], 2)]) : _vm._e()], 1);
};
var _sfc_staticRenderFns$f = [];
var __component__$f = /* @__PURE__ */ normalizeComponent(
  _sfc_main$f,
  _sfc_render$f,
  _sfc_staticRenderFns$f,
  false,
  null,
  null,
  null,
  null
);
const Tooltip = __component__$f.exports;
const _sfc_main$e = {
  components: {
    Tooltip
  },
  data() {
    return {
      gridDays: [],
      indexFirstMonday: 0,
      nbColumns: 15,
      options: {
        year: "numeric",
        month: "2-digit",
        day: "numeric"
      }
    };
  },
  computed: {
    ...mapState({
      recentActivity: (state2) => state2.summoner.basic.recentActivity
    })
  },
  watch: {
    recentActivity() {
      this.fillGrid();
    }
  },
  created() {
    this.createGrid();
  },
  methods: {
    createGrid() {
      const nbDaysInGrid = this.nbColumns * 7;
      for (let i = 1; i <= nbDaysInGrid; i++) {
        const day = /* @__PURE__ */ new Date();
        day.setDate(day.getDate() - nbDaysInGrid + i);
        const formattedDay = day.toLocaleString(void 0, this.options);
        this.gridDays.push({
          date: formattedDay,
          time: 0,
          matches: 0,
          wins: 0,
          losses: 0,
          day: day.toLocaleString("en", { weekday: "long" }).substring(0, 2),
          month: day.toLocaleString("en", { month: "long" }).substring(0, 3)
        });
      }
      this.fillGrid();
    },
    fillGrid() {
      for (const match2 of this.recentActivity) {
        const matchTime = new Date(match2.day);
        const formattedTime = matchTime.toLocaleString(void 0, this.options);
        const dayOfTheMatch = this.gridDays.filter((e) => e.date === formattedTime);
        if (dayOfTheMatch.length > 0) {
          dayOfTheMatch[0].time = match2.time;
          dayOfTheMatch[0].matches = match2.wins + match2.losses;
          dayOfTheMatch[0].wins = match2.wins;
          dayOfTheMatch[0].losses = match2.losses;
        }
      }
      this.indexFirstMonday = this.gridDays.findIndex((d) => d.day === "Mo");
    },
    getCaseColor(nbMatches) {
      if (nbMatches >= 6) {
        return "bg-teal-200";
      } else if (nbMatches >= 4) {
        return "bg-teal-300";
      } else if (nbMatches >= 2) {
        return "bg-teal-400";
      } else if (nbMatches >= 1) {
        return "bg-teal-500";
      }
      return "bg-teal-700";
    },
    getCaseMargin(index2) {
      if (index2 % 7 !== 0) {
        return "mt-1";
      }
    }
  }
};
var _sfc_render$e = function render10() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "inline-block rounded-lg bg-blue-800" }, [_c("div", { staticClass: "heading relative flex items-center justify-center rounded-t-lg py-2 text-blue-200" }, [_c("svg", { staticClass: "h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#time" } })]), _c("span", { staticClass: "mx-3 text-sm font-bold uppercase" }, [_vm._v("Recent Activity")]), _c("svg", { staticClass: "h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#time" } })])]), _c("div", { staticClass: "p-3 pt-1" }, [_c("div", { staticClass: "flex" }, [_c("span", { staticClass: "ml-12 text-xs font-semibold text-blue-200" }, [_vm._v(_vm._s(_vm.gridDays[11].month))]), _c("span", { staticClass: "ml-16 text-xs font-semibold text-blue-200" }, [_vm._v(_vm._s(_vm.gridDays[42].month))]), _c("span", { staticClass: "ml-16 text-xs font-semibold text-blue-200" }, [_vm._v(_vm._s(_vm.gridDays[73].month))]), _c("span", { staticClass: "ml-16 text-xs font-semibold text-blue-200" }, [_vm._v(_vm._s(_vm.gridDays[104].month))])]), _c("div", { staticClass: "mt-1 flex" }, [_vm._m(0), _c("div", { staticClass: "ml-1 flex flex-col flex-wrap", staticStyle: { "width": "calc(20px * 15)", "height": "calc(20px * 7)" } }, _vm._l(_vm.gridDays.slice(_vm.indexFirstMonday), function(day, index2) {
    return _c("Tooltip", { key: day.timestamp, scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "ml-1 h-4 w-4 cursor-pointer", class: [_vm.getCaseMargin(index2), _vm.getCaseColor(day.matches)] })];
    }, proxy: true }, { key: "default", fn: function() {
      return [_c("div", { staticClass: "px-2 text-center text-xs leading-5 text-blue-200" }, [_c("div", [_c("span", { staticClass: "font-semibold text-white" }, [_vm._v(_vm._s(day.date))]), _c("span", [_vm._v(": ")]), _c("span", { staticClass: "font-bold text-teal-400" }, [_vm._v(_vm._s(day.matches))]), _c("span", [_vm._v(" " + _vm._s(day.matches > 1 ? "games" : "game"))])]), day.matches > 0 ? [_c("div", [_c("span", [_vm._v("time played: ")]), _c("span", { staticClass: "font-semibold text-white" }, [_vm._v(_vm._s(_vm._f("secToHours")(day.time)))])]), _c("div", [_c("span", [_vm._v("record: ")]), _c("span", { staticClass: "font-bold text-green-400" }, [_vm._v(_vm._s(day.wins))]), _c("span", [_vm._v(" - ")]), _c("span", { staticClass: "font-bold text-red-400" }, [_vm._v(_vm._s(day.losses))])])] : _vm._e()], 2)];
    }, proxy: true }], null, true) });
  }), 1)])])])]);
};
var _sfc_staticRenderFns$e = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex flex-col" }, [_c("span", { staticClass: "text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("Mo")]), _c("span", { staticClass: "mt-1 text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("Tu")]), _c("span", { staticClass: "mt-1 text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("We")]), _c("span", { staticClass: "mt-1 text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("Th")]), _c("span", { staticClass: "mt-1 text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("Fr")]), _c("span", { staticClass: "mt-1 text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("Sa")]), _c("span", { staticClass: "mt-1 text-xs font-semibold leading-snug text-blue-200" }, [_vm._v("Su")])]);
}];
var __component__$e = /* @__PURE__ */ normalizeComponent(
  _sfc_main$e,
  _sfc_render$e,
  _sfc_staticRenderFns$e,
  false,
  null,
  null,
  null,
  null
);
const RecentActivity = __component__$e.exports;
const SearchFormRegion_vue_vue_type_style_index_0_scoped_cc1748cc_lang = "";
const _sfc_main$d = {
  props: {
    dropdown: {
      type: Boolean,
      default: false
    },
    homepage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      regions: [
        "BR",
        "EUNE",
        "EUW",
        "JP",
        "KR",
        "LAN",
        "LAS",
        "NA",
        "OCE",
        "TR",
        "RU",
        "PH",
        "SG",
        "TH",
        "TW",
        "VN"
      ]
    };
  },
  computed: {
    dropdownClasses() {
      return {
        "offsetDropDown mr-4 rounded": !this.homepage,
        "offsetDropDownXl rounded-b": this.homepage
      };
    },
    selectRegionClasses() {
      return {
        "px-2 text-base rounded-md": !this.homepage,
        "px-2 py-1": this.homepage,
        "bg-blue-1000": this.dropdown && !this.homepage,
        "border-teal-200": this.dropdown && this.homepage
      };
    },
    ...mapState({
      selectedRegion: (state2) => state2.settings.region
    })
  },
  methods: {
    classRegions(index2) {
      return {
        "rounded-t": index2 === 0,
        "rounded-b": index2 === this.regions.length - 1
      };
    },
    selectRegion(region) {
      this.toggle();
      this.updateSettings({ name: "region", value: region.toLowerCase() });
    },
    toggle() {
      this.$emit("toggle");
    },
    ...mapActions("settings", ["updateSettings"])
  }
};
var _sfc_render$d = function render11() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("div", { staticClass: "vertical-center absolute right-0 z-30 flex h-full items-center", class: [_vm.homepage ? "mr-12" : "mr-4"] }, [_c("div", { staticClass: "flex cursor-pointer items-center rounded border-2 border-transparent transition duration-150 ease-in-out hover:text-white", class: [_vm.selectRegionClasses], on: { "click": _vm.toggle } }, [_c("span", { staticClass: "selected select-none font-bold uppercase" }, [_vm._v(_vm._s(_vm.selectedRegion))]), _c("svg", { staticClass: "-mr-1 ml-1 h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#caret-down" } })])])]), _c("transition", { attrs: { "name": "scale-fade" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.dropdown, expression: "dropdown" }], staticClass: "absolute right-0 z-30 cursor-pointer text-white shadow", class: [_vm.dropdownClasses] }, _vm._l(_vm.regions, function(region, index2) {
    return _c("div", { key: region, staticClass: "relative select-none bg-blue-1000 py-1 pl-5 pr-2 text-right text-xs hover:bg-blue-800", class: _vm.classRegions(index2), on: { "click": function($event) {
      return _vm.selectRegion(region);
    } } }, [region.toLowerCase() === _vm.selectedRegion ? _c("svg", { staticClass: "vertical-center offsetIcon absolute h-3 w-3 fill-current", attrs: { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 512 512" } }, [_c("path", { attrs: { "d": "M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" } })]) : _vm._e(), _vm._v(" " + _vm._s(region) + " ")]);
  }), 0)])], 1);
};
var _sfc_staticRenderFns$d = [];
var __component__$d = /* @__PURE__ */ normalizeComponent(
  _sfc_main$d,
  _sfc_render$d,
  _sfc_staticRenderFns$d,
  false,
  null,
  "cc1748cc",
  null,
  null
);
const SearchFormRegion = __component__$d.exports;
const _sfc_main$c = {
  props: {
    favoritesList: {
      type: Boolean,
      default: false
    },
    player: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    closeClick() {
      if (this.favoritesList) {
        this.updateFavorite(this.player);
        return;
      }
      this.removeRecentSearch(this.player);
    },
    favoriteClick() {
      this.updateFavorite(this.player);
    },
    ...mapActions("settings", ["removeRecentSearch", "updateFavorite"])
  }
};
var _sfc_render$c = function render12() {
  var _vm = this, _c = _vm._self._c;
  return _c("router-link", { staticClass: "bypass-click mt-1 flex w-full cursor-pointer select-none items-center justify-between rounded-md px-4 py-3 text-blue-200 shadow-md", class: _vm.selected ? "bg-blue-760" : "bg-blue-900", attrs: { "to": { name: "summoner", params: { region: _vm.player.region, name: _vm.player.name } }, "title": _vm.player.name, "role": "option" }, nativeOn: { "click": function($event) {
    return _vm.close.apply(null, arguments);
  } } }, [_c("div", { staticClass: "flex items-center" }, [_vm.favoritesList ? _c("svg", { staticClass: "h-5 w-5 text-yellow-400" }, [_c("use", { attrs: { "xlink:href": "#star-outline" } })]) : _c("svg", { staticClass: "h-5 w-5" }, [_c("use", { attrs: { "xlink:href": "#time" } })]), _c("div", { staticClass: "w-20" }, [_c("div", { staticClass: "ml-6 inline-flex rounded bg-blue-800 px-2 py-1 text-xs font-semibold uppercase text-white" }, [_vm._v(" " + _vm._s(_vm.player.region) + " ")])]), _c("div", { staticClass: "ml-2 h-6 w-6 rounded-full bg-cover bg-center", style: {
    backgroundImage: `url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${_vm.player.icon}.jpg')`
  } }), _c("div", { staticClass: "ml-2 text-base" }, [_vm._v(_vm._s(_vm.player.name))])]), _c("div", { staticClass: "flex items-center space-x-1" }, [!_vm.favoritesList ? _c("button", { staticClass: "flex items-center justify-center rounded-full p-2 hover:bg-blue-700 hover:text-yellow-400", on: { "click": function($event) {
    $event.preventDefault();
    return _vm.favoriteClick.apply(null, arguments);
  } } }, [_c("svg", { staticClass: "h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#star" } })])]) : _vm._e(), _c("button", { staticClass: "cursor-pointerhover:text-white rounded-full p-2 hover:bg-blue-700", on: { "click": function($event) {
    $event.preventDefault();
    return _vm.closeClick.apply(null, arguments);
  } } }, [_c("svg", { staticClass: "h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#times" } })])])])]);
};
var _sfc_staticRenderFns$c = [];
var __component__$c = /* @__PURE__ */ normalizeComponent(
  _sfc_main$c,
  _sfc_render$c,
  _sfc_staticRenderFns$c,
  false,
  null,
  null,
  null,
  null
);
const SearchFormDropdownPlayer = __component__$c.exports;
const SearchFormDropdown_vue_vue_type_style_index_0_scoped_62ec9aaa_lang = "";
const _sfc_main$b = {
  components: {
    SearchFormRegion,
    SearchFormDropdownPlayer
  },
  props: {
    dropdown: {
      type: Boolean,
      default: false
    },
    homepage: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      bypassKeys: ["Esc", "Escape", "ArrowUp", "ArrowDown", "Enter", "Space", "/"],
      favoritesCount: null,
      totalCount: null,
      recentSearchesCount: null,
      selected: null
    };
  },
  computed: {
    allPlayers() {
      return [...this.recentSearchesSliced, ...this.favorites];
    },
    recentSearchesSliced() {
      return this.recentSearches.slice(0, 4);
    },
    ...mapState("settings", ["favorites", "recentSearches"])
  },
  created() {
    window.addEventListener("mousedown", this.handleClick);
    window.addEventListener("keydown", this.handleKeyDown);
  },
  mounted() {
    const input = document.querySelector(".summoner-input");
    input.focus();
    this.recentSearchesCount = this.$refs.searches ? this.$refs.searches.children.length : 0;
    this.favoritesCount = this.$refs.favorites ? this.$refs.favorites.children.length : 0;
    this.totalCount = this.recentSearchesCount + this.favoritesCount;
    if (this.totalCount > 0) {
      this.selected = 1;
    }
  },
  beforeDestroy() {
    window.removeEventListener("mousedown", this.handleClick);
    window.removeEventListener("keydown", this.handleKeyDown);
  },
  methods: {
    close() {
      this.$emit("close");
      if (this.dropdown) {
        this.toggle();
      }
    },
    handleClick(e) {
      const bypassElements = document.querySelectorAll(".bypass-click");
      for (const element of bypassElements) {
        if (e.target === element || element.contains(e.target))
          return;
      }
      if (this.$refs["region-dropdown"] && e.target !== this.$refs["region-dropdown"] && !this.$refs["region-dropdown"].contains(e.target) && this.dropdown) {
        this.toggle();
      }
      e.preventDefault();
      this.$refs.searches.focus();
    },
    handleKeyDown(e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        this.$refs.searches.focus();
        if (e.key === "ArrowUp") {
          this.onArrowUp();
        } else {
          this.onArrowDown();
        }
      }
      if (this.bypassKeys.includes(e.key) || e.key === "k" && (e.ctrlKey || e.metaKey)) {
        return;
      }
      const input = document.querySelector(".summoner-input");
      input.focus();
    },
    onArrow() {
      const scrollIntoBlock = this.selected === 1 ? "end" : this.selected >= 7 ? "start" : "nearest";
      if (this.selected > this.recentSearchesCount) {
        this.$refs.favorites.children[this.selected - this.recentSearchesCount - 1].scrollIntoView({
          block: scrollIntoBlock
        });
      } else {
        this.$refs.searches.children[this.selected - 1].scrollIntoView({ block: scrollIntoBlock });
      }
    },
    onArrowUp() {
      this.selected = this.selected - 1 < 1 ? this.totalCount : this.selected - 1;
      this.onArrow();
    },
    onArrowDown() {
      this.selected = this.selected + 1 > this.totalCount ? 1 : this.selected + 1;
      this.onArrow();
    },
    onHover(id) {
      this.selected = id;
      if (this.$refs.searches && this.$refs.searches !== document.activeElement) {
        this.$refs.searches.focus();
        this.onArrow();
      }
    },
    onOptionSelect() {
      if (this.selected === null) {
        return;
      }
      const player = this.allPlayers[this.selected - 1];
      this.$router.push(`/summoner/${player.region}/${player.name}`).catch(() => {
      });
      this.close();
    },
    toggle() {
      this.$emit("toggle");
    }
  }
};
var _sfc_render$b = function render13() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "absolute z-30 w-full rounded-lg bg-blue-800 shadow-md", class: _vm.homepage ? "mt-2" : "mt-1" }, [_c("div", { staticClass: "shadow" }, [_c("div", { staticClass: "pt-3" }, [!_vm.homepage ? _c("div", { staticClass: "bypass-click relative px-3" }, [_c("button", { staticClass: "absolute h-full w-12 text-blue-200 hover:text-white", attrs: { "type": "submit" } }, [_c("svg", { staticClass: "vertical-center horizontal-center absolute h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#search" } })])]), _c("input", { ref: "input", staticClass: "summoner-input w-full rounded-md border border-blue-500 bg-blue-700 py-2 pl-12 pr-32 placeholder-blue-200 placeholder-opacity-75 outline-none focus:bg-blue-760", attrs: { "type": "text", "placeholder": "Search summoner", "spellcheck": "false" }, domProps: { "value": _vm.value }, on: { "input": function($event) {
    return _vm.$emit("input", $event.target.value);
  } } }), !_vm.homepage && _vm.value.length ? _c("button", { staticClass: "vertical-center absolute right-0 mr-24 flex items-center justify-center rounded-full p-1 text-blue-200 hover:text-white", attrs: { "type": "button" }, on: { "click": function($event) {
    return _vm.$emit("input", "");
  } } }, [_c("svg", { staticClass: "h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#times" } })])]) : _vm._e(), !_vm.homepage ? _c("div", { ref: "region-dropdown" }, [_c("SearchFormRegion", { attrs: { "dropdown": _vm.dropdown, "homepage": _vm.homepage }, on: { "toggle": _vm.toggle } })], 1) : _vm._e()]) : _vm._e(), _c("div", { staticClass: "light-scrollbar overflow-y-auto px-3 pb-6", style: { maxHeight: _vm.homepage ? "300px" : "480px" } }, [_c("div", { class: { "mt-4": !_vm.homepage } }, [_vm.recentSearches.length ? _c("div", { staticClass: "text-base text-blue-100" }, [_vm._v("Recent")]) : _vm.favorites.length === 0 ? _c("div", { staticClass: "flex items-center space-x-2" }, [_c("svg", { staticClass: "h-4 w-4 text-blue-100" }, [_c("use", { attrs: { "xlink:href": "#info" } })]), _c("div", { staticClass: "text-base text-blue-100" }, [_vm._v("Summoner example")])]) : _vm._e(), _c("div", { ref: "searches", staticClass: "flex flex-wrap items-center text-xs leading-none focus:outline-none", attrs: { "role": "listbox", "tabindex": "-1" }, on: { "keydown": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter"))
      return null;
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.onOptionSelect();
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"]))
      return null;
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.onOptionSelect();
  }] } }, [_vm.recentSearches.length ? _vm._l(_vm.recentSearchesSliced, function(player, index2) {
    return _c("SearchFormDropdownPlayer", { key: player.name + player.region, attrs: { "selected": index2 === _vm.selected - 1, "player": player, "favorites-list": false }, on: { "close": _vm.close }, nativeOn: { "mousemove": function($event) {
      return _vm.onHover(index2 + 1);
    } } });
  }) : _vm.favorites.length === 0 ? [_c("SearchFormDropdownPlayer", { attrs: { "player": { name: "KC NEXT ADKING", icon: 29, region: "euw" }, "selected": _vm.selected === 1, "favorites-list": false }, on: { "close": _vm.close }, nativeOn: { "mousemove": function($event) {
    return _vm.onHover(1);
  } } })] : _vm._e()], 2)]), _vm.favorites.length ? _c("div", { class: { "mt-4": _vm.recentSearches.length } }, [_c("div", { staticClass: "text-base text-blue-100" }, [_vm._v("Favorites")]), _c("div", { ref: "favorites", staticClass: "flex flex-wrap items-center text-xs leading-none", attrs: { "role": "listbox", "tabindex": "-1" }, on: { "keydown": [function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter"))
      return null;
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.onOptionSelect();
  }, function($event) {
    if (!$event.type.indexOf("key") && _vm._k($event.keyCode, "space", 32, $event.key, [" ", "Spacebar"]))
      return null;
    $event.preventDefault();
    $event.stopPropagation();
    return _vm.onOptionSelect();
  }] } }, _vm._l(_vm.favorites, function(player, index2) {
    return _c("SearchFormDropdownPlayer", { key: player.name + player.region, attrs: { "player": player, "selected": index2 === _vm.selected - 1 - _vm.recentSearchesCount, "favorites-list": true }, on: { "close": _vm.close }, nativeOn: { "mousemove": function($event) {
      return _vm.onHover(index2 + _vm.recentSearchesCount + 1);
    } } });
  }), 1)]) : _vm._e()])]), _vm._m(0)])]);
};
var _sfc_staticRenderFns$b = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "rounded-b-md bg-blue-1000 px-4 py-4" }, [_c("div", { staticClass: "flex select-none items-center justify-between text-xxs" }, [_c("div", { staticClass: "space-x-2" }, [_c("span", { staticClass: "key rounded-md bg-blue-100 text-xs font-medium text-blue-700" }, [_vm._v("Enter")]), _c("span", [_vm._v("to select")])]), _c("div", { staticClass: "space-x-2" }, [_c("span", { staticClass: "key rounded-md bg-blue-100 text-xs font-medium text-blue-700" }, [_vm._v("↓ ↑")]), _c("span", [_vm._v("to navigate")])]), _c("div", { staticClass: "space-x-2" }, [_c("span", { staticClass: "key rounded-md bg-blue-100 text-xs font-medium text-blue-700" }, [_vm._v("Escape")]), _c("span", [_vm._v("to close")])]), _c("div", { staticClass: "space-x-2" }, [_c("span", { staticClass: "key rounded-md bg-blue-100 text-xs font-medium text-blue-700" }, [_vm._v("CTRL K")]), _c("span", [_vm._v("to open")])])])]);
}];
var __component__$b = /* @__PURE__ */ normalizeComponent(
  _sfc_main$b,
  _sfc_render$b,
  _sfc_staticRenderFns$b,
  false,
  null,
  "62ec9aaa",
  null,
  null
);
const SearchFormDropdown = __component__$b.exports;
const SearchForm_vue_vue_type_style_index_0_scoped_c7242e8d_lang = "";
const _sfc_main$a = {
  components: {
    SearchFormDropdown,
    SearchFormRegion
  },
  props: {
    homepage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      summoner: "",
      dropdown: false,
      open: false
    };
  },
  computed: {
    ...mapState({
      selectedRegion: (state2) => state2.settings.region
    })
  },
  watch: {
    open(newVal) {
      if (newVal) {
        this.dropDownOpening();
      } else {
        this.dropDownClosing();
      }
    },
    $route(newRoute) {
      this.summoner = newRoute.params.name;
      this.dropdown = false;
      this.open = false;
    }
  },
  created() {
    if (!this.summoner.length && !this.homepage) {
      this.summoner = this.$route.params.name;
    }
    window.addEventListener("blur", this.windowBlur);
    window.addEventListener("keydown", this.handleEscape);
  },
  beforeDestroy() {
    window.removeEventListener("blur", this.windowBlur);
    window.removeEventListener("keydown", this.handleEscape);
    this.dropDownClosing();
  },
  methods: {
    dropDownClosing() {
      const header = document.querySelector(".header div");
      if (!this.homepage && header) {
        header.style.paddingRight = 0;
      }
      document.body.style.marginLeft = 0;
      document.body.style.overflow = "auto";
    },
    dropDownOpening() {
      const header = document.querySelector(".header div");
      if (!this.homepage) {
        document.body.style.marginLeft = `-${this.getScrollbarWidth()}px`;
        header.style.paddingRight = `${this.getScrollbarWidth()}px`;
      }
      document.body.style.overflow = "hidden";
    },
    formSubmit() {
      const search = this.summoner.split(" ").join("").replace("+", " ");
      if (search.length) {
        this.$emit("formSubmit", search, this.selectedRegion);
      }
    },
    getScrollbarWidth() {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.overflow = "scroll";
      outer.style.msOverflowStyle = "scrollbar";
      document.body.appendChild(outer);
      const inner = document.createElement("div");
      outer.appendChild(inner);
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
      outer.parentNode.removeChild(outer);
      return scrollbarWidth;
    },
    handleEscape(e) {
      if (e.key === "Esc" || e.key === "Escape") {
        this.dropdown = false;
        this.open = false;
      } else if (e.key === "k" && (e.ctrlKey || e.metaKey) || e.key === "/") {
        e.preventDefault();
        this.dropdown = false;
        this.open = !this.open;
      }
    },
    windowBlur() {
      this.open = false;
    }
  }
};
var _sfc_render$a = function render14() {
  var _vm = this, _c = _vm._self._c;
  return _c("form", { staticClass: "flex h-full w-full self-start text-lg text-teal-100", class: { "max-w-lg": !_vm.homepage }, on: { "submit": function($event) {
    $event.preventDefault();
    return _vm.formSubmit.apply(null, arguments);
  } } }, [_vm.open ? _c("div", { staticClass: "fixed inset-0 z-20 bg-gray-900", style: { opacity: _vm.homepage ? 0 : 0.9 }, on: { "click": function($event) {
    _vm.open = false;
  } } }) : _vm._e(), _c("div", { staticClass: "relative w-full" }, [_vm.homepage ? _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.summoner, expression: "summoner" }], ref: "input", staticClass: "summoner-input bypass-click relative z-30 w-full rounded-lg py-4 pl-6 pr-32 font-bold placeholder-teal-100 placeholder-opacity-75 outline-none focus:bg-blue-1000", class: _vm.dropdown ? "bg-blue-1000" : "input-color", attrs: { "spellcheck": "false", "type": "text", "placeholder": "Search summoner" }, domProps: { "value": _vm.summoner }, on: { "focus": function($event) {
    _vm.open = true;
  }, "input": function($event) {
    if ($event.target.composing)
      return;
    _vm.summoner = $event.target.value;
  } } }) : _vm._e(), _vm.homepage ? _c("button", { ref: "submit", staticClass: "absolute right-0 z-40 h-full w-12 hover:text-teal-200", attrs: { "type": "submit" } }, [_c("svg", { staticClass: "vertical-center horizontal-center absolute h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#search" } })])]) : _vm._e(), !_vm.homepage ? _c("button", { staticClass: "-mt-px h-10 w-full rounded-md bg-blue-1000 px-4 text-left text-base font-light text-blue-200", attrs: { "type": "button" }, on: { "click": function($event) {
    _vm.open = true;
  } } }, [_c("div", { staticClass: "flex items-center space-x-3" }, [_c("svg", { staticClass: "h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#search" } })]), _c("span", [_vm._v('Search summoner (Press "/" to focus)')])])]) : _vm._e(), _c("transition", { attrs: { "name": "scale-fade" } }, [_vm.open ? _c("SearchFormDropdown", { attrs: { "dropdown": _vm.dropdown, "homepage": _vm.homepage }, on: { "close": function($event) {
    _vm.open = false;
  }, "toggle": function($event) {
    _vm.dropdown = !_vm.dropdown;
  } }, model: { value: _vm.summoner, callback: function($$v) {
    _vm.summoner = $$v;
  }, expression: "summoner" } }) : _vm._e()], 1), _c("div", { ref: "region-dropdown" }, [_vm.homepage ? _c("SearchFormRegion", { attrs: { "dropdown": _vm.dropdown, "homepage": _vm.homepage }, on: { "toggle": function($event) {
    _vm.dropdown = !_vm.dropdown;
  } } }) : _vm._e()], 1)], 1)]);
};
var _sfc_staticRenderFns$a = [];
var __component__$a = /* @__PURE__ */ normalizeComponent(
  _sfc_main$a,
  _sfc_render$a,
  _sfc_staticRenderFns$a,
  false,
  null,
  "c7242e8d",
  null,
  null
);
const SearchForm = __component__$a.exports;
var nestRE = /^(attrs|props|on|nativeOn|class|style|hook)$/;
var babelHelperVueJsxMergeProps = function mergeJSXProps(objs) {
  return objs.reduce(function(a, b) {
    var aa, bb, key, nestedKey, temp;
    for (key in b) {
      aa = a[key];
      bb = b[key];
      if (aa && nestRE.test(key)) {
        if (key === "class") {
          if (typeof aa === "string") {
            temp = aa;
            a[key] = aa = {};
            aa[temp] = true;
          }
          if (typeof bb === "string") {
            temp = bb;
            b[key] = bb = {};
            bb[temp] = true;
          }
        }
        if (key === "on" || key === "nativeOn" || key === "hook") {
          for (nestedKey in bb) {
            aa[nestedKey] = mergeFn(aa[nestedKey], bb[nestedKey]);
          }
        } else if (Array.isArray(aa)) {
          a[key] = aa.concat(bb);
        } else if (Array.isArray(bb)) {
          a[key] = [aa].concat(bb);
        } else {
          for (nestedKey in bb) {
            aa[nestedKey] = bb[nestedKey];
          }
        }
      } else {
        a[key] = b[key];
      }
    }
    return a;
  }, {});
};
function mergeFn(a, b) {
  return function() {
    a && a.apply(this, arguments);
    b && b.apply(this, arguments);
  };
}
const _mergeJSXProps = /* @__PURE__ */ getDefaultExportFromCjs(babelHelperVueJsxMergeProps);
var uid = function() {
  return Math.random().toString(36).substring(2);
};
var ContentLoader = {
  name: "ContentLoader",
  functional: true,
  props: {
    width: {
      type: [Number, String],
      "default": 400
    },
    height: {
      type: [Number, String],
      "default": 130
    },
    speed: {
      type: Number,
      "default": 2
    },
    preserveAspectRatio: {
      type: String,
      "default": "xMidYMid meet"
    },
    baseUrl: {
      type: String,
      "default": ""
    },
    primaryColor: {
      type: String,
      "default": "#f9f9f9"
    },
    secondaryColor: {
      type: String,
      "default": "#ecebeb"
    },
    primaryOpacity: {
      type: Number,
      "default": 1
    },
    secondaryOpacity: {
      type: Number,
      "default": 1
    },
    uniqueKey: {
      type: String
    },
    animate: {
      type: Boolean,
      "default": true
    }
  },
  render: function render15(h, _ref) {
    var props2 = _ref.props, data3 = _ref.data, children2 = _ref.children;
    var idClip = props2.uniqueKey ? props2.uniqueKey + "-idClip" : uid();
    var idGradient = props2.uniqueKey ? props2.uniqueKey + "-idGradient" : uid();
    return h("svg", _mergeJSXProps([data3, {
      attrs: {
        viewBox: "0 0 " + props2.width + " " + props2.height,
        version: "1.1",
        preserveAspectRatio: props2.preserveAspectRatio
      }
    }]), [h("rect", {
      style: {
        fill: "url(" + props2.baseUrl + "#" + idGradient + ")"
      },
      attrs: {
        "clip-path": "url(" + props2.baseUrl + "#" + idClip + ")",
        x: "0",
        y: "0",
        width: props2.width,
        height: props2.height
      }
    }), h("defs", [h("clipPath", {
      attrs: {
        id: idClip
      }
    }, [children2 || h("rect", {
      attrs: {
        x: "0",
        y: "0",
        rx: "5",
        ry: "5",
        width: props2.width,
        height: props2.height
      }
    })]), h("linearGradient", {
      attrs: {
        id: idGradient
      }
    }, [h("stop", {
      attrs: {
        offset: "0%",
        "stop-color": props2.primaryColor,
        "stop-opacity": props2.primaryOpacity
      }
    }, [props2.animate ? h("animate", {
      attrs: {
        attributeName: "offset",
        values: "-2; 1",
        dur: props2.speed + "s",
        repeatCount: "indefinite"
      }
    }) : null]), h("stop", {
      attrs: {
        offset: "50%",
        "stop-color": props2.secondaryColor,
        "stop-opacity": props2.secondaryOpacity
      }
    }, [props2.animate ? h("animate", {
      attrs: {
        attributeName: "offset",
        values: "-1.5; 1.5",
        dur: props2.speed + "s",
        repeatCount: "indefinite"
      }
    }) : null]), h("stop", {
      attrs: {
        offset: "100%",
        "stop-color": props2.primaryColor,
        "stop-opacity": props2.primaryOpacity
      }
    }, [props2.animate ? h("animate", {
      attrs: {
        attributeName: "offset",
        values: "-1; 2",
        dur: props2.speed + "s",
        repeatCount: "indefinite"
      }
    }) : null])])])]);
  }
};
const _sfc_main$9 = {
  components: {
    ContentLoader
  }
};
var _sfc_render$9 = function render16() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "pb-2 text-white" }, [_c("div", { staticClass: "flex justify-between" }, [_c("div", { staticStyle: { "width": "520px", "height": "239px" } }, [_c("content-loader", { attrs: { "height": 239, "width": 520, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "0", "y": "45", "rx": "3", "ry": "3", "width": "126.28", "height": "31" } }), _c("circle", { attrs: { "cx": "49", "cy": "145", "r": "48" } }), _c("rect", { attrs: { "x": "365", "y": "108", "rx": "3", "ry": "3", "width": "62", "height": "31" } }), _c("rect", { attrs: { "x": "162", "y": "108", "rx": "3", "ry": "3", "width": "195", "height": "31" } }), _c("rect", { attrs: { "x": "109", "y": "154", "rx": "6", "ry": "6", "width": "126", "height": "38" } }), _c("rect", { attrs: { "x": "243", "y": "154", "rx": "6", "ry": "6", "width": "277", "height": "38" } }), _c("rect", { attrs: { "x": "0", "y": "217", "rx": "3", "ry": "3", "width": "67", "height": "22" } }), _c("rect", { attrs: { "x": "78", "y": "217", "rx": "3", "ry": "3", "width": "80", "height": "22" } }), _c("rect", { attrs: { "x": "169", "y": "217", "rx": "3", "ry": "3", "width": "57", "height": "22" } }), _c("rect", { attrs: { "x": "237", "y": "217", "rx": "3", "ry": "3", "width": "72", "height": "22" } }), _c("circle", { attrs: { "cx": "133", "cy": "122", "r": "24" } })])], 1), _c("div", { staticClass: "rounded-lg bg-blue-850", staticStyle: { "width": "347px", "height": "215px" } }, [_c("content-loader", { attrs: { "height": 215, "width": 347, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "110", "y": "10", "rx": "3", "ry": "3", "width": "130", "height": "19" } }), _c("rect", { attrs: { "x": "53", "y": "45", "rx": "3", "ry": "3", "width": "30", "height": "11" } }), _c("rect", { attrs: { "x": "135", "y": "45", "rx": "3", "ry": "3", "width": "30", "height": "11" } }), _c("rect", { attrs: { "x": "220", "y": "45", "rx": "3", "ry": "3", "width": "30", "height": "11" } }), _c("rect", { attrs: { "x": "305", "y": "45", "rx": "3", "ry": "3", "width": "30", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "66", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "86", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "106", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "126", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "146", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "166", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "10", "y": "186", "rx": "3", "ry": "3", "width": "22", "height": "11" } }), _c("rect", { attrs: { "x": "38", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "38", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "38", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "38", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "38", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "38", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "38", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "58", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "78", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "98", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "118", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "138", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "158", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "178", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "198", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "218", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "238", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "258", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "278", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "164", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "298", "y": "184", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "318", "y": "64", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "318", "y": "84", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "318", "y": "104", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "318", "y": "124", "rx": "0", "ry": "0", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "318", "y": "144", "rx": "0", "ry": "0", "width": "16", "height": "16" } })])], 1)])]);
};
var _sfc_staticRenderFns$9 = [];
var __component__$9 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$9,
  _sfc_render$9,
  _sfc_staticRenderFns$9,
  false,
  null,
  null,
  null,
  null
);
const HeaderLoader = __component__$9.exports;
const _sfc_main$8 = {
  props: {
    ranked: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentDegree: 0,
      rankColors: {
        iron: "#574D4F",
        bronze: "#8C523A",
        silver: "#80989D",
        gold: "#CD8837",
        platinum: "#4E9996",
        diamond: "#576BCE",
        master: "#9D48E0",
        grandmaster: "#CD4545",
        challenger: "#F4C874"
      },
      selectedKey: Object.keys(this.ranked)[0]
    };
  },
  computed: {
    bo() {
      return this.selectedLeague.miniSeries.progress.split("");
    },
    colorBorder() {
      if (!this.selectedLeague.tier || this.selectedLeague.leaguePoints === 0) {
        return "#2c5282";
      }
      return this.rankColors[this.selectedLeague.tier.toLowerCase()];
    },
    leagueDegrees() {
      return (this.selectedLeague.leaguePoints <= 100 ? this.selectedLeague.leaguePoints : 100) * 360 / 100;
    },
    selectedLeague() {
      return this.ranked[this.selectedKey];
    }
  },
  watch: {
    selectedKey() {
      this.currentDegree = 0;
      this.$refs.leagueBorder.style.backgroundImage = null;
      this.triggerAnimation();
    }
  },
  mounted() {
    this.triggerAnimation();
  },
  methods: {
    animateLeagueDegrees(stop = false) {
      if (stop || !this.$refs.leagueBorder)
        return;
      this.selectedLeague.leaguePoints > 50 ? this.currentDegree += 2 : this.currentDegree++;
      const linearGradient = this.currentDegree <= 180 ? `linear-gradient(${90 + this.currentDegree}deg, transparent 50%, #2c5282 50%)` : `linear-gradient(${this.currentDegree - 90}deg, transparent 50%, ${this.colorBorder} 50%)`;
      this.$refs.leagueBorder.style.backgroundImage = `${linearGradient}, linear-gradient(90deg, #2c5282 50%, transparent 50%)`;
      this.triggerAnimation();
    },
    boGame(result) {
      switch (result) {
        case "W":
          return "bg-green-400";
        case "L":
          return "bg-red-400";
        default:
          return "bg-blue-200";
      }
    },
    triggerAnimation() {
      setTimeout(() => {
        if (this.currentDegree < 360 && this.currentDegree < this.leagueDegrees)
          this.animateLeagueDegrees();
        else
          this.animateLeagueDegrees(true);
      }, 1);
    }
  }
};
var _sfc_render$8 = function render17() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "ml-2 flex items-center leading-none" }, [_c("div", { staticClass: "ml-1 flex flex-col justify-center" }, [_c("div", { staticClass: "flex items-center" }, [_c("div", { ref: "leagueBorder", staticClass: "percentage-circle relative flex h-12 w-12 items-center justify-center rounded-full", style: { backgroundColor: _vm.colorBorder } }, [_c("div", { staticClass: "relative h-11 w-11 rounded-full bg-blue-900 p-1" }, [_c("div", { staticClass: "mt-0.5 h-full bg-cover bg-center", style: { backgroundImage: `url(${_vm.selectedLeague.rankImgLink})` } })])]), _c("div", { staticClass: "ml-2 text-3xl font-bold uppercase text-teal-500" }, [_vm._v(" " + _vm._s(_vm.selectedLeague.fullRank) + " ")]), _c("div", { staticClass: "ml-4 text-2xl font-bold" }, [_vm._v(_vm._s(_vm.selectedLeague.leaguePoints) + " LP")]), _vm.selectedLeague.miniSeries ? _c("div", { staticClass: "ml-2 flex items-center rounded bg-blue-800 p-2" }, _vm._l(_vm.bo, function(result, index2) {
    return _c("div", { key: index2 + result, staticClass: "h-3 w-3 rounded-full", class: [{ "ml-1": index2 !== 0 }, _vm.boGame(result)] });
  }), 0) : _vm._e()]), _c("div", { staticClass: "mt-2 flex items-center" }, [_c("div", { staticClass: "relative inline-block text-white" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.selectedKey, expression: "selectedKey" }], staticClass: "block w-full cursor-pointer appearance-none rounded-md bg-blue-800 px-4 py-2 pr-8 text-lg font-bold leading-tight hover:bg-blue-700 focus:outline-none", on: { "change": function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.selectedKey = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  } } }, _vm._l(_vm.ranked, function(data3, leagueName) {
    return _c("option", { key: leagueName, domProps: { "value": leagueName } }, [_vm._v(" " + _vm._s(data3.name) + " ")]);
  }), 0), _c("div", { staticClass: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" }, [_c("svg", { staticClass: "h-5 w-5 text-white" }, [_c("use", { attrs: { "xlink:href": "#chevron-down" } })])])]), _c("div", { staticClass: "ml-2 flex items-center rounded bg-blue-800 p-2" }, [_c("div", { staticClass: "text-base font-semibold uppercase" }, [_vm._v("Record")]), _c("div", { staticClass: "ml-2 font-semibold text-green-400" }, [_vm._v(_vm._s(_vm.selectedLeague.wins))]), _c("span", { staticClass: "mx-1" }, [_vm._v("-")]), _c("div", { staticClass: "font-semibold text-red-400" }, [_vm._v(_vm._s(_vm.selectedLeague.losses))]), _c("div", { staticClass: "ml-3 text-base font-semibold uppercase" }, [_vm._v("Winrate")]), _c("div", { class: [
    "ml-2 text-base font-semibold leading-tight",
    parseFloat(_vm.selectedLeague.winrate) >= 50 ? "text-green-400" : "text-red-400"
  ] }, [_vm._v(" " + _vm._s(_vm.selectedLeague.winrate) + " ")])])])])]);
};
var _sfc_staticRenderFns$8 = [];
var __component__$8 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  null,
  null,
  null
);
const SummonerRanked = __component__$8.exports;
const __$_require_13b7a352__ = "" + new URL("../img/Logo.svg", import.meta.url).href;
const Default_vue_vue_type_style_index_0_scoped_3361f9ac_lang = "";
const _sfc_main$7 = {
  components: {
    FilterSeason,
    LazyBackground,
    MainFooter,
    RecentActivity,
    SearchForm,
    HeaderLoader,
    SummonerRanked,
    Tooltip
  },
  data() {
    return {
      bgHeader: false
    };
  },
  computed: {
    tabTransition() {
      return this.summonerFound && this.overviewLoaded ? "tab" : "none";
    },
    ...mapState({
      basic: (state2) => state2.summoner.basic
    }),
    ...mapGetters("summoner", [
      "playing",
      "overviewLoaded",
      "summonerFound",
      "summonerNotFound",
      "summonerLoading"
    ])
  },
  watch: {
    $route(to2, from) {
      if (from.params.region === to2.params.region && from.params.name === to2.params.name)
        return;
      this.apiCall();
    }
  },
  created() {
    if (this.$route.params.region) {
      this.apiCall();
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    apiCall() {
      this.updateSettings({ name: "region", value: this.$route.params.region.toLowerCase() });
      this.basicRequest({ summoner: this.$route.params.name, region: this.$route.params.region });
    },
    handleScroll() {
      this.bgHeader = window.scrollY > 25;
    },
    isRouteActive(currentRoute) {
      return {
        "router-link-active": this.$route.name === currentRoute
      };
    },
    redirect(summoner2, region) {
      this.$router.push(`/summoner/${region}/${summoner2}`).catch(() => {
      });
    },
    ...mapActions("settings", ["updateSettings"]),
    ...mapActions("summoner", ["basicRequest"])
  },
  metaInfo() {
    return {
      titleTemplate: this.summonerFound ? `${this.basic.account.name} | LeagueStats.gg %s` : "LeagueStats.gg %s"
    };
  }
};
var _sfc_render$7 = function render18() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex min-h-screen flex-col overflow-hidden bg-blue-900" }, [_c("LazyBackground", { attrs: { "image-source": "/img/bg-homepage-1.jpg", "image-class": "absolute z-0 w-full h-[50rem]", "more-backgrounds": "linear-gradient(180deg, rgba(42, 67, 101, 0) 0%, #2A4365 50%),", "transition-name": "fade" } }), _c("header", { staticClass: "header fixed left-0 right-0 z-20 border-b-2 px-4 text-teal-100 transition-colors duration-100 ease-in-out", class: _vm.bgHeader ? "header-scrolled" : "bg-transparent", staticStyle: { "border-color": "rgba(144, 205, 244, 0.4)" } }, [_c("div", { staticClass: "-mb-0.5 flex items-center justify-between py-2" }, [_c("div", { staticClass: "flex flex-1" }, [_c("router-link", { attrs: { "to": "/" } }, [_c("img", { staticClass: "block h-10", attrs: { "src": __$_require_13b7a352__, "alt": "LeagueStats logo" } })])], 1), _c("SearchForm", { attrs: { "homepage": false }, on: { "formSubmit": _vm.redirect } }), _c("div", { staticClass: "flex-1" }, [_c("div", { staticClass: "flex items-center justify-end" }, [_c("a", { staticClass: "discord relative text-sm", attrs: { "href": "https://discord.gg/RjBzjfk", "target": "_blank" } }, [_c("svg", { staticClass: "absolute fill-current", attrs: { "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 448 512" } }, [_c("path", { attrs: { "fill": "currentColor", "d": "M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z" } })]), _vm._m(0)])])])], 1)]), _c("div", { staticClass: "page-wrapper relative z-10 mx-auto mt-20 flex-grow text-white" }, [_vm.summonerLoading || _vm.summonerFound ? [_vm.summonerLoading ? [_c("HeaderLoader")] : _vm.summonerFound ? [_c("div", { staticClass: "flex items-center justify-between" }, [_c("div", [_c("div", { staticClass: "mt-2 flex items-center" }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
    return [_c("h1", { staticClass: "text-4xl font-extrabold" }, [_vm._v(" " + _vm._s(_vm.basic.account.name) + " ")])];
  }, proxy: true }, { key: "default", fn: function() {
    return [_vm.basic.account.names.length > 1 ? _c("div", { staticClass: "select-none px-2 text-center text-sm text-white" }, [_c("div", [_vm._v("Old summoner names")]), _c("ul", { staticClass: "list-inside list-disc pl-2 text-left" }, _vm._l(_vm.basic.account.names.slice(0, -1), function(name2) {
      return _c("li", { key: name2.date, staticClass: "text-teal-400" }, [_vm._v(" " + _vm._s(name2.name) + " ")]);
    }), 0)]) : _vm._e()];
  }, proxy: true }], null, false, 1606678118) }), _vm.playing ? _c("div", { staticClass: "ml-4 mt-2 flex items-center rounded-full border border-teal-400 bg-teal-800 px-3 py-1" }, [_c("div", { staticClass: "playing-dot h-2 w-2 rounded-full bg-teal-flashy" }), _c("span", { staticClass: "ml-2 text-sm font-semibold text-teal-flashy" }, [_vm._v("In Game")])]) : _vm._e(), _vm._e()], 1), _c("div", { staticClass: "mt-2 flex" }, [_c("div", { staticClass: "relative h-24 w-24", class: { playing: _vm.playing } }, [_c("div", { staticClass: "relative z-10 h-24 w-24 rounded-full border-teal-400 bg-blue-1000 bg-cover bg-center", class: { "border-2": !_vm.playing }, style: {
    backgroundImage: `url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${_vm.basic.account.profileIconId}.jpg')`
  } }, [_c("div", { staticClass: "absolute bottom-0 left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-teal-400 bg-blue-900 text-xs font-extrabold text-teal-500" }, [_vm._v(" " + _vm._s(_vm.basic.account.summonerLevel) + " ")])])]), Object.entries(_vm.basic.ranked).length !== 0 ? _c("SummonerRanked", { attrs: { "ranked": _vm.basic.ranked } }) : _vm._e()], 1)]), _c("div", [_c("RecentActivity")], 1)]), _c("div", { staticClass: "flex items-center justify-between" }, [_c("div", { staticClass: "pb-2" }, [_c("router-link", { staticClass: "cursor-pointer border-b-2 border-transparent pb-2 text-blue-300 hover:text-blue-100", class: _vm.isRouteActive("summoner"), attrs: { "to": {
    name: "summoner",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  }, "exact": "" } }, [_vm._v("Overview")]), _c("router-link", { staticClass: "ml-4 cursor-pointer border-b-2 border-transparent pb-2 text-blue-300 hover:text-blue-100", class: _vm.isRouteActive("summonerChampions"), attrs: { "to": {
    name: "summonerChampions",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  }, "exact": "" } }, [_vm._v("Champions")]), _c("router-link", { staticClass: "ml-4 cursor-pointer border-b-2 border-transparent pb-2 text-blue-300 hover:text-blue-100", class: _vm.isRouteActive("summonerRecords"), attrs: { "to": {
    name: "summonerRecords",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  }, "exact": "" } }, [_vm._v("Records")]), _c("router-link", { staticClass: "ml-4 cursor-pointer border-b-2 border-transparent pb-2 text-blue-300 hover:text-blue-100", class: _vm.isRouteActive("summonerLive"), attrs: { "to": {
    name: "summonerLive",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  }, "exact": "" } }, [_vm._v("Live game")]), _c("router-link", { staticClass: "ml-4 cursor-pointer border-b-2 border-transparent pb-2 text-blue-300 hover:text-blue-100", class: _vm.isRouteActive("summonerTest"), attrs: { "to": {
    name: "summonerTest",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  }, "exact": "" } }, [_vm._v("ClientData")]), _c("router-link", { staticClass: "ml-4 cursor-pointer border-b-2 border-transparent pb-2 text-blue-300 hover:text-blue-100", class: _vm.isRouteActive("summonerTest"), attrs: { "to": {
    name: "summonerRunes",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  }, "exact": "" } }, [_vm._v("Runes Import")])], 1), _vm.$route.meta.season ? [_c("FilterSeason")] : _vm._e()], 2)] : _vm._e(), _c("transition", { attrs: { "name": _vm.tabTransition } }, [_vm._t("default")], 2)] : _vm.summonerNotFound ? [_vm._m(1)] : _vm._e()], 2), _c("MainFooter")], 1);
};
var _sfc_staticRenderFns$7 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "ml-8" }, [_vm._v(" Join "), _c("span", { staticClass: "font-bold" }, [_vm._v("our Discord")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-16 flex justify-center" }, [_c("div", { staticClass: "bg-gradient rounded-lg px-4 py-3 text-center text-lg font-bold text-blue-100" }, [_c("div", [_vm._v("Player can't be found.")]), _c("div", [_vm._v("😕")])])]);
}];
var __component__$7 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  "3361f9ac",
  null,
  null
);
const Default = __component__$7.exports;
const _sfc_main$6 = {};
var _sfc_render$6 = function render19() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_vm._t("default")], 2);
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  null,
  null,
  null
);
const Home = __component__$6.exports;
const _sfc_main$5 = {
  props: {
    notification: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      timeout: null
    };
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  mounted() {
    this.timeout = setTimeout(() => this.deleteNotification(), 3e3);
  },
  methods: {
    deleteNotification() {
      this.remove(this.notification);
    },
    ...mapActions("notification", ["remove"])
  }
};
var _sfc_render$5 = function render20() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "slide-fade" } }, [_c("div", { staticClass: "relative mt-2 rounded-lg p-6 pr-10 text-white shadow-md", class: {
    "bg-red-500": _vm.notification.type === "error",
    "bg-green-500": _vm.notification.type === "success"
  }, staticStyle: { "min-width": "240px" } }, [_c("button", { staticClass: "absolute right-0 top-0 mx-1 my-1 block cursor-pointer rounded-full border border-transparent px-1 py-1 hover:border-white focus:outline-none", on: { "click": _vm.deleteNotification } }, [_c("svg", { staticClass: "h-3 w-3 fill-current", attrs: { "viewBox": "0 0 20 20" } }, [_c("path", { attrs: { "d": "M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" } })])]), _c("div", { staticClass: "flex items-center text-white" }, [_vm.notification.type === "success" ? _c("svg", { staticClass: "w-6 fill-current", attrs: { "viewBox": "0 0 20 20" } }, [_c("path", { attrs: { "d": "M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" } })]) : _vm._e(), _vm.notification.type === "error" ? _c("svg", { staticClass: "w-6 fill-current", attrs: { "viewBox": "0 0 20 20" } }, [_c("path", { attrs: { "d": "M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm1.41-1.41A8 8 0 1 0 15.66 4.34 8 8 0 0 0 4.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z" } })]) : _vm._e(), _c("span", { staticClass: "ml-3" }, [_vm._v(_vm._s(_vm.notification.message))])])])]);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  null,
  null,
  null
);
const PopupNotification = __component__$5.exports;
const _sfc_main$4 = {
  components: {
    PopupNotification
  },
  computed: {
    ...mapState("notification", ["notifications"])
  }
};
var _sfc_render$4 = function render21() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "fixed bottom-0 right-0 z-50 pb-2 pr-2" }, _vm._l(_vm.notifications, function(notification2) {
    return _c("PopupNotification", { key: notification2.id, attrs: { "notification": notification2 } });
  }), 1);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null,
  null,
  null
);
const NotificationsContainer = __component__$4.exports;
const RuneStyle_vue_vue_type_style_index_0_scoped_df901561_lang = "";
const _sfc_main$3 = {
  components: {
    Tooltip
  },
  props: {
    primary: {
      type: Boolean,
      default: false
    },
    runeStyle: {
      type: Object,
      required: true
    }
  },
  computed: {
    slots() {
      return this.primary ? this.runeStyle.slots : this.runeStyle.slots.slice(1);
    },
    ...mapState({
      kStats: (state2) => state2.cdragon.kStats,
      runes: (state2) => state2.cdragon.runes,
      runesOpen: (state2) => state2.cdragon.runesOpen,
      selectedRunes: (state2) => state2.cdragon.selectedRunes
    })
  },
  methods: {
    createCategoryBorderUrl(name2) {
      const lower = name2.toLowerCase();
      return `https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-collections/global/default/perks/images/${lower}/vfx-${lower[0]}.png`;
    },
    createCategoryUrl(name2) {
      const lower = name2.toLowerCase();
      return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-collections/global/default/perks/images/${lower}/icon-${lower[0]}.png`;
    },
    createCDragonAssetUrl
  },
  mounted() {
    console.log("RuneStyle: ", this.runeStyle);
  }
};
var _sfc_render$3 = function render22() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex" }, [_c("div", { staticClass: "flex h-24 w-24 items-center justify-center bg-cover", style: {
    backgroundImage: `url('${_vm.createCategoryBorderUrl(_vm.runeStyle.name)}')`
  } }, [_c("div", { staticClass: "mt-4 h-56 w-56 bg-contain bg-center bg-no-repeat", staticStyle: { "filter": "brightness(1.2)" }, style: {
    backgroundImage: `url('${_vm.createCategoryUrl(_vm.runeStyle.name)}')`
  } })]), _c("div", { staticClass: "mt-24 space-y-4" }, [_vm._l(_vm.slots, function(category, index2) {
    return _c("div", { key: `secondary-category-${index2}` }, [_c("div", { staticClass: "flex space-x-4" }, _vm._l(category, function(runeId) {
      return _c("ul", { key: `slot-${runeId}` }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
        return [_c("li", { staticClass: "h-12 w-12 cursor-pointer rounded-full border-2 border-gray-700 bg-cover bg-center", class: _vm.selectedRunes.selected.includes(runeId) ? "used-rune" : "not-used-rune", style: {
          backgroundImage: `url('${_vm.createCDragonAssetUrl(_vm.runes.perks[runeId].icon)}')`
        } })];
      }, proxy: true }, { key: "default", fn: function() {
        return [_c("div", { staticClass: "flex max-w-md select-none p-2 text-left text-sm text-white" }, [_c("div", { staticClass: "ml-1 h-12 w-12 flex-shrink-0 rounded-md bg-blue-1000 bg-cover bg-center", style: {
          backgroundImage: `url('${_vm.createCDragonAssetUrl(_vm.runes.perks[runeId].icon)}')`
        } }), _c("div", { staticClass: "ml-2 leading-none" }, [_c("div", { staticClass: "text-base" }, [_vm._v(_vm._s(_vm.runes.perks[runeId].name))]), _c("div", { staticClass: "rune-description mt-3 font-light leading-tight text-blue-200", domProps: { "innerHTML": _vm._s(_vm.runes.perks[runeId].desc) } })])])];
      }, proxy: true }], null, true) })], 1);
    }), 0), _vm.primary && index2 == 0 ? _c("div", { staticClass: "mt-4 h-0.5 w-full bg-gray-500 bg-opacity-25" }) : _vm._e()]);
  }), !_vm.primary ? _c("div", [_c("div", { staticClass: "mt-8 space-y-4" }, _vm._l(_vm.kStats, function(row, index2) {
    return _c("div", { key: `row-${index2}`, staticClass: "flex space-x-8 px-3" }, _vm._l(row, function(kStat, i) {
      return _c("ul", { key: `${kStat}-${i}` }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
        return [_c("li", { staticClass: "h-8 w-8 cursor-pointer rounded-full border-2 border-gray-700 bg-gray-900 bg-cover bg-center", class: _vm.selectedRunes.selected[index2 + 6] === kStat ? "used-rune" : "not-used-rune", style: {
          backgroundImage: `url('${_vm.createCDragonAssetUrl(_vm.runes.perks[kStat].icon)}')`
        } })];
      }, proxy: true }, { key: "default", fn: function() {
        return [_c("div", { staticClass: "flex max-w-md select-none p-2 text-left text-sm text-white" }, [_c("div", { staticClass: "ml-1 h-8 w-8 flex-shrink-0 rounded-md bg-blue-1000 bg-cover bg-center", style: {
          backgroundImage: `url('${_vm.createCDragonAssetUrl(_vm.runes.perks[kStat].icon)}')`
        } }), _c("div", { staticClass: "ml-2 leading-none" }, [_c("div", { staticClass: "text-base" }, [_vm._v(_vm._s(_vm.runes.perks[kStat].name))]), _c("div", { staticClass: "rune-description mt-3 font-light leading-tight text-blue-200", domProps: { "innerHTML": _vm._s(_vm.runes.perks[kStat].desc) } })])])];
      }, proxy: true }], null, true) })], 1);
    }), 0);
  }), 0)]) : _vm._e()], 2)]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  "df901561",
  null,
  null
);
const RuneStyle = __component__$3.exports;
const _sfc_main$2 = {
  components: {
    LazyBackground,
    RuneStyle
  },
  computed: {
    primaryStyle() {
      return this.runes.perkstyles[this.selectedRunes.primaryStyle];
    },
    secondaryStyle() {
      return this.runes.perkstyles[this.selectedRunes.secondaryStyle];
    },
    ...mapState({
      runes: (state2) => state2.cdragon.runes,
      runesOpen: (state2) => state2.cdragon.runesOpen,
      selectedRunes: (state2) => state2.cdragon.selectedRunes
    })
  },
  created() {
    document.addEventListener("keydown", this.handleEscape);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handleEscape);
  },
  methods: {
    close() {
      this.hideRunes({});
    },
    handleEscape(e) {
      if (e.key === "Esc" || e.key === "Escape") {
        this.hideRunes({});
      }
    },
    createCDragonAssetUrl,
    ...mapActions("cdragon", ["hideRunes"])
  }
};
var _sfc_render$2 = function render23() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "leave-active-class": "duration-300" } }, [_c("div", { directives: [{ name: "show", rawName: "v-show", value: _vm.runesOpen, expression: "runesOpen" }], staticClass: "fixed inset-0 z-50 flex items-center justify-center" }, [_c("transition", { attrs: { "enter-active-class": "transition duration-300 ease-out", "enter-class": "transform opacity-0", "enter-to-class": "transform opacity-100", "leave-active-class": "transition duration-200 ease-in", "leave-class": "transform opacity-100", "leave-to-class": "transform opacity-0" } }, [_vm.runesOpen ? _c("div", { staticClass: "fixed inset-0 bg-gray-900 bg-opacity-75", on: { "click": _vm.close } }) : _vm._e()]), _c("transition", { attrs: { "enter-active-class": "transition duration-300 ease-out", "enter-class": "transform scale-95 opacity-0", "enter-to-class": "transform scale-100 opacity-100", "leave-active-class": "transition duration-200 ease-in", "leave-class": "transform scale-100 opacity-100", "leave-to-class": "transform scale-95 opacity-0" } }, [_vm.runesOpen ? _c("div", { staticClass: "relative overflow-hidden rounded-md bg-gray-900 shadow-lg", staticStyle: { "width": "800px", "height": "500px" } }, [_c("LazyBackground", { staticStyle: { "filter": "blur(2px)" }, attrs: { "image-source": `/img/runes/${_vm.primaryStyle.name.toLowerCase()}.jpg`, "image-class": "absolute inset-0", "more-backgrounds": "linear-gradient(rgba(26, 32, 44, 0.6), rgba(26, 32, 44, 0.8)),", "transition-name": "fade-fast" } }), _c("div", { staticClass: "relative flex h-full items-start px-4 py-2" }, [_c("div", { staticClass: "w-1/2" }, [_c("div", [_vm._v("Anzeigen")]), _c("RuneStyle", { attrs: { "primary": true, "rune-style": _vm.primaryStyle } })], 1), _c("div", { staticClass: "w-1/2" }, [_c("RuneStyle", { attrs: { "primary": false, "rune-style": _vm.secondaryStyle } })], 1)])], 1) : _vm._e()])], 1)]);
};
var _sfc_staticRenderFns$2 = [];
var __component__$2 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null,
  null,
  null
);
const RunesContainer = __component__$2.exports;
const _sfc_main$1 = {};
var _sfc_render$1 = function render24() {
  var _vm = this, _c = _vm._self._c;
  return _c("svg", { staticClass: "hidden", attrs: { "xmlns": "http://www.w3.org/2000/svg" } }, [_c("symbol", { staticClass: "stroke-current", attrs: { "id": "arrow-right", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("line", { attrs: { "x1": "5", "y1": "12", "x2": "19", "y2": "12" } }), _c("polyline", { attrs: { "points": "12 5 19 12 12 19" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "caret-down", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 320 512" } }, [_c("path", { attrs: { "d": "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "caret-up", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 320 512" } }, [_c("path", { attrs: { "d": "M288.662 352H31.338c-17.818 0-26.741-21.543-14.142-34.142l128.662-128.662c7.81-7.81 20.474-7.81 28.284 0l128.662 128.662c12.6 12.599 3.676 34.142-14.142 34.142z" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "chevron-down", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 20 20" } }, [_c("path", { attrs: { "d": "M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" } })]), _c("symbol", { staticClass: "stroke-current", attrs: { "id": "close", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("line", { attrs: { "x1": "18", "y1": "6", "x2": "6", "y2": "18" } }), _c("line", { attrs: { "x1": "6", "y1": "6", "x2": "18", "y2": "18" } })]), _c("symbol", { attrs: { "id": "creeps", "viewBox": "0 0 15 15", "fill": "none", "xmlns": "http://www.w3.org/2000/svg" } }, [_c("path", { attrs: { "d": "M8.04 1.04912C7.97335 0.971025 7.89055 0.908316 7.79733 0.865316C7.7041 0.822316 7.60266 0.800049 7.5 0.800049C7.39734 0.800049 7.2959 0.822316 7.20267 0.865316C7.10945 0.908316 7.02665 0.971025 6.96 1.04912C5.5 2.79946 2.5 7.60041 2.5 8.42057C2.5 9.24073 5.74 12.9315 7.09 14.0717C7.20224 14.1736 7.34841 14.23 7.5 14.23C7.65159 14.23 7.79776 14.1736 7.91 14.0717C9.26 12.9315 12.5 9.26074 12.5 8.42057C12.5 7.58041 9.5 2.79946 8.04 1.04912ZM7.32 12.1813L4.58 8.53059C4.55791 8.49446 4.54621 8.45292 4.54621 8.41057C4.54621 8.36821 4.55791 8.32668 4.58 8.29054L5.38 6.69023C5.40154 6.66315 5.42891 6.64127 5.46008 6.62624C5.49124 6.6112 5.5254 6.60339 5.56 6.60339C5.5946 6.60339 5.62876 6.6112 5.65992 6.62624C5.69109 6.64127 5.71846 6.66315 5.74 6.69023L7.34 8.26054C7.36057 8.28233 7.38536 8.2997 7.41288 8.31157C7.44039 8.32343 7.47004 8.32956 7.5 8.32956C7.52996 8.32956 7.55961 8.32343 7.58712 8.31157C7.61464 8.2997 7.63943 8.28233 7.66 8.26054L9.28 6.64022C9.30154 6.61314 9.32891 6.59126 9.36008 6.57623C9.39124 6.56119 9.4254 6.55338 9.46 6.55338C9.4946 6.55338 9.52876 6.56119 9.55992 6.57623C9.59109 6.59126 9.61846 6.61314 9.64 6.64022L10.44 8.24054C10.4621 8.27667 10.4738 8.3182 10.4738 8.36056C10.4738 8.40291 10.4621 8.44445 10.44 8.48058L7.68 12.1813C7.6597 12.2102 7.63275 12.2338 7.60142 12.2501C7.57009 12.2663 7.5353 12.2748 7.5 12.2748C7.4647 12.2748 7.42991 12.2663 7.39858 12.2501C7.36725 12.2338 7.3403 12.2102 7.32 12.1813Z", "fill": "#81E6D9" } })]), _c("symbol", { attrs: { "id": "damage", "viewBox": "0 0 15 15", "fill": "none", "xmlns": "http://www.w3.org/2000/svg" } }, [_c("path", { attrs: { "d": "M13.0714 1.92857V1H12.1429V1.92857L11.2143 2.85714H9.35714V1.92857H8.42857V2.85714H6.57143V1.92857H5.64286V2.85714H3.78571L2.85714 1.92857V1H1.92857V1.92857H1V2.85714H1.92857L2.85714 3.78571V5.64286H1.92857V6.57143H2.85714V7.5H3.78571V6.57143H5.64286L6.57143 5.64286V3.78571H8.42857V5.64286L1 11.2143V14H3.78571L9.35714 6.57143H11.2143V7.5H12.1429V6.57143H13.0714V5.64286H12.1429V3.78571L13.0714 2.85714H14V1.92857H13.0714Z", "fill": "#E25656" } }), _c("path", { attrs: { "d": "M8.02929 9.75643L11.2143 14H14V11.2143L9.75643 8.02929L8.02929 9.75643Z", "fill": "#E25656" } })]), _c("symbol", { attrs: { "id": "gold", "viewBox": "0 0 15 15", "fill": "none", "xmlns": "http://www.w3.org/2000/svg" } }, [_c("path", { attrs: { "d": "M14 5.63324C14 3.57057 11.7157 1.8999 8.89286 1.8999C6.07 1.8999 3.78571 3.57057 3.78571 5.63324C3.7765 5.76685 3.7765 5.90095 3.78571 6.03457C2.12357 6.65057 1 7.90124 1 9.36657C1 11.4292 3.28429 13.0999 6.10714 13.0999C8.93 13.0999 11.2143 11.4292 11.2143 9.36657C11.2235 9.23295 11.2235 9.09885 11.2143 8.96524C12.8486 8.34924 14 7.08924 14 5.63324ZM6.10714 11.3172C4.315 11.3172 2.85714 10.2999 2.85714 8.94657C2.90787 8.55215 3.06303 8.17865 3.3064 7.86507C3.54978 7.55149 3.87244 7.30934 4.24071 7.1639C4.77538 7.8881 5.47991 8.46817 6.29158 8.85247C7.10324 9.23677 7.99686 9.41338 8.89286 9.36657H9.30143C9.03214 10.4679 7.71357 11.3172 6.10714 11.3172Z", "fill": "#F3A05A" } })]), _c("symbol", { attrs: { "id": "kill-participation", "viewBox": "0 0 15 15", "fill": "none", "xmlns": "http://www.w3.org/2000/svg" } }, [_c("path", { attrs: { "d": "M7.5 1.5C4.18594 1.5 1.5 3.85078 1.5 6.75C1.5 8.39297 2.36484 9.85781 3.71484 10.8211C3.93984 10.9828 4.07109 11.2453 4.03125 11.5219L3.81094 13.0734C3.77813 13.2984 3.95156 13.5 4.17891 13.5H6V12.1875C6 12.0844 6.08437 12 6.1875 12H6.5625C6.66563 12 6.75 12.0844 6.75 12.1875V13.5H8.25V12.1875C8.25 12.0844 8.33437 12 8.4375 12H8.8125C8.91563 12 9 12.0844 9 12.1875V13.5H10.8211C11.0484 13.5 11.2219 13.2984 11.1891 13.0734L10.9688 11.5219C10.9289 11.2477 11.0578 10.9828 11.2852 10.8211C12.6352 9.85781 13.5 8.39297 13.5 6.75C13.5 3.85078 10.8141 1.5 7.5 1.5ZM5.25 9C4.42266 9 3.75 8.32734 3.75 7.5C3.75 6.67266 4.42266 6 5.25 6C6.07734 6 6.75 6.67266 6.75 7.5C6.75 8.32734 6.07734 9 5.25 9ZM9.75 9C8.92266 9 8.25 8.32734 8.25 7.5C8.25 6.67266 8.92266 6 9.75 6C10.5773 6 11.25 6.67266 11.25 7.5C11.25 8.32734 10.5773 9 9.75 9Z", "fill": "#B78787" } })]), _c("symbol", { staticClass: "stroke-current", attrs: { "id": "layers", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("polygon", { attrs: { "points": "12 2 2 7 12 12 22 7 12 2" } }), _c("polyline", { attrs: { "points": "2 17 12 22 22 17" } }), _c("polyline", { attrs: { "points": "2 12 12 17 22 12" } })]), _c("symbol", { staticClass: "stroke-current", attrs: { "id": "people", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("path", { attrs: { "d": "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" } }), _vm._v(" "), _c("circle", { attrs: { "cx": "9", "cy": "7", "r": "4" } }), _vm._v(" "), _c("path", { attrs: { "d": "M23 21v-2a4 4 0 0 0-3-3.87" } }), _vm._v(" "), _c("path", { attrs: { "d": "M16 3.13a4 4 0 0 1 0 7.75" } })]), _c("symbol", { staticClass: "stroke-current", attrs: { "id": "graph", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("line", { attrs: { "x1": "18", "y1": "20", "x2": "18", "y2": "10" } }), _vm._v(" "), _c("line", { attrs: { "x1": "12", "y1": "20", "x2": "12", "y2": "4" } }), _vm._v(" "), _c("line", { attrs: { "x1": "6", "y1": "20", "x2": "6", "y2": "14" } })]), _c("symbol", { staticClass: "stroke-current", attrs: { "id": "info", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("circle", { attrs: { "cx": "12", "cy": "12", "r": "10" } }), _c("line", { attrs: { "x1": "12", "y1": "16", "x2": "12", "y2": "12" } }), _c("line", { attrs: { "x1": "12", "y1": "8", "x2": "12.01", "y2": "8" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "award", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 384 512" } }, [_c("path", { attrs: { "d": "M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "gold", "viewBox": "0 0 15 15", "fill": "fill-current" } }, [_c("title", [_vm._v("gold")]), _c("path", { attrs: { "d": "M14 5.63324C14 3.57057 11.7157 1.8999 8.89286 1.8999C6.07 1.8999 3.78571 3.57057 3.78571 5.63324C3.7765 5.76685 3.7765 5.90095 3.78571 6.03457C2.12357 6.65057 1 7.90124 1 9.36657C1 11.4292 3.28429 13.0999 6.10714 13.0999C8.93 13.0999 11.2143 11.4292 11.2143 9.36657C11.2235 9.23295 11.2235 9.09885 11.2143 8.96524C12.8486 8.34924 14 7.08924 14 5.63324ZM6.10714 11.3172C4.315 11.3172 2.85714 10.2999 2.85714 8.94657C2.90787 8.55215 3.06303 8.17865 3.3064 7.86507C3.54978 7.55149 3.87244 7.30934 4.24071 7.1639C4.77538 7.8881 5.47991 8.46817 6.29158 8.85247C7.10324 9.23677 7.99686 9.41338 8.89286 9.36657H9.30143C9.03214 10.4679 7.71357 11.3172 6.10714 11.3172Z" } })]), _c("symbol", { attrs: { "id": "rank-iron", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 17 12", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M5.09169 7.28713C5.09174 6.7095 5.22139 6.1391 5.47128 5.61712C5.72117 5.09514 6.08505 4.63461 6.53664 4.26881C4.61235 3.59731 1.81243 2.25945 0.999109 0C0.999109 0 0.826062 2.28858 2.21044 4.84952C2.21044 4.84952 3.68308 5.80538 4.27144 7.09356L3.1276 6.39465C3.41666 7.3131 3.77114 8.21011 4.18838 9.07893C4.85288 10.3448 6.09191 11.3058 6.09191 11.3058C6.09191 11.3058 5.51566 9.59283 6.19054 10.004C6.21382 10.0176 6.23635 10.0325 6.25803 10.0485C5.88788 9.68626 5.59403 9.2549 5.39352 8.77942C5.19302 8.30395 5.08983 7.7938 5.08996 7.27856L5.09169 7.28713ZM11.5123 4.25168C11.9343 4.58914 12.2812 5.00928 12.5314 5.48574C12.7816 5.96221 12.9296 6.48472 12.9662 7.02049C13.0028 7.55626 12.9271 8.09373 12.7439 8.59918C12.5607 9.10462 12.2739 9.56714 11.9016 9.9577C12.4017 9.80182 11.9016 11.3076 11.9016 11.3076C11.9016 11.3076 13.1407 10.3431 13.8052 9.08064C14.2203 8.21155 14.5731 7.31457 14.8608 6.39636L13.7256 7.08157C14.3243 5.80195 15.7831 4.84952 15.7831 4.84952C17.1588 2.28858 16.9944 0 16.9944 0C16.1932 2.2389 13.4348 3.57333 11.5123 4.25168ZM11.7269 7.28712C11.7269 8.75826 10.5221 9.95084 9.03598 9.95084C7.54984 9.95084 6.34509 8.75826 6.34509 7.28712C6.34509 5.81599 7.54984 4.6234 9.03598 4.6234C10.5221 4.6234 11.7269 5.81599 11.7269 7.28712Z", "fill": "#51484A" } })]), _c("symbol", { attrs: { "id": "rank-bronze", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 18 12", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M5.09125 7.28713C5.09142 6.70952 5.22111 6.13916 5.47096 5.6172C5.72081 5.09523 6.08459 4.63469 6.53604 4.26881C4.61196 3.59731 1.81235 2.25945 0.999109 0C0.999109 0 0.82608 2.28858 2.21031 4.84952C2.21031 4.84952 3.68279 5.80538 4.27109 7.09356L3.12737 6.39465C3.41639 7.3131 3.77084 8.21011 4.18804 9.07893C4.85247 10.3466 6.09136 11.3058 6.09136 11.3058C6.09136 11.3058 5.51517 9.59283 6.19171 10.004L6.25746 10.0485C5.88735 9.68626 5.59353 9.2549 5.39305 8.77942C5.19256 8.30395 5.08939 7.7938 5.08952 7.27856L5.09125 7.28713ZM11.5126 4.25168C11.9705 4.6172 12.3399 5.07953 12.5938 5.60477C12.8476 6.13001 12.9796 6.70484 12.9799 7.28713C12.9791 7.63908 12.9308 7.98935 12.8363 8.32863C12.6632 8.93912 12.3418 9.4984 11.9002 9.9577C12.4003 9.80182 11.9002 11.3076 11.9002 11.3076C11.9002 11.3076 13.1374 10.3448 13.8035 9.08064C14.2211 8.21257 14.5755 7.3161 14.8642 6.39808L13.7291 7.08328C14.3226 5.80195 15.783 4.84952 15.783 4.84952C17.1672 2.28858 16.9942 0 16.9942 0C16.1931 2.2389 13.4332 3.57333 11.5126 4.25168ZM11.7254 7.28712C11.7254 8.75826 10.5208 9.95084 9.03485 9.95084C7.54887 9.95084 6.34424 8.75826 6.34424 7.28712C6.34424 5.81599 7.54887 4.6234 9.03485 4.6234C10.5208 4.6234 11.7254 5.81599 11.7254 7.28712Z", "fill": "#8C513A" } })]), _c("symbol", { attrs: { "id": "rank-silver", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 18 12", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M5.09125 7.28713C5.09142 6.70952 5.22111 6.13916 5.47096 5.6172C5.72081 5.09523 6.08459 4.63469 6.53604 4.26881C4.61196 3.59731 1.81235 2.25945 0.999109 0C0.999109 0 0.82608 2.28858 2.21031 4.84952C2.21031 4.84952 3.68279 5.80538 4.27109 7.09356L3.12737 6.39465C3.41639 7.3131 3.77084 8.21011 4.18804 9.07893C4.85247 10.3466 6.09136 11.3058 6.09136 11.3058C6.09136 11.3058 5.51517 9.59283 6.19171 10.004L6.25746 10.0485C5.88735 9.68626 5.59353 9.2549 5.39305 8.77942C5.19256 8.30395 5.08939 7.7938 5.08952 7.27856L5.09125 7.28713ZM11.5126 4.25168C11.9702 4.61729 12.3394 5.07968 12.593 5.60493C12.8466 6.13017 12.9782 6.70496 12.9782 7.28713C12.978 7.639 12.9303 7.98927 12.8363 8.32863C12.6632 8.93912 12.3418 9.4984 11.9002 9.9577C12.4003 9.80182 11.9002 11.3076 11.9002 11.3076C11.9002 11.3076 13.1374 10.3448 13.8035 9.08064C14.2211 8.21257 14.5755 7.3161 14.8642 6.39808L13.7291 7.08328C14.3226 5.80195 15.783 4.84952 15.783 4.84952C17.1672 2.28858 16.9942 0 16.9942 0C16.1931 2.2389 13.4332 3.57333 11.5126 4.25168ZM11.7255 7.28712C11.7255 8.75826 10.5208 9.95084 9.03485 9.95084C7.54887 9.95084 6.34425 8.75826 6.34425 7.28712C6.34425 5.81599 7.54887 4.6234 9.03485 4.6234C10.5208 4.6234 11.7255 5.81599 11.7255 7.28712Z", "fill": "#80989D" } })]), _c("symbol", { attrs: { "id": "rank-gold", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 17 13", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M10.7388 4.77729C11.2994 5.45163 11.6066 6.31003 11.6048 7.1971C11.6032 7.8058 11.457 8.40488 11.179 8.94233C10.901 9.47977 10.4996 9.93932 10.0096 10.2811C9.89852 10.3595 9.78284 10.4308 9.66325 10.4947C9.42458 10.8456 9.25671 11.2421 9.16955 11.6607C9.08239 12.0794 9.07771 12.5118 9.15578 12.9323C9.30127 11.8586 10.8271 10.4502 11.5078 10.0923C12.1885 9.73442 11.5078 11.4082 11.5078 11.4082C11.5078 11.4082 12.7773 10.5286 13.51 9.30352C13.9738 8.45975 14.3789 7.5833 14.7224 6.68073L13.4649 7.35379C13.7698 5.93645 15.2645 4.72209 15.2645 4.72209C15.8863 3.23542 16.1249 1.60908 15.9573 0C15.3511 2.46254 12.4188 4.04903 10.7388 4.77729ZM4.40497 7.26298C4.40347 6.37598 4.71064 5.51767 5.27096 4.84318C3.59441 4.11492 0.660441 2.5213 0.0559813 0.0658875C-0.111632 1.67555 0.126966 3.30246 0.748772 4.78976C0.748772 4.78976 2.22788 6.00233 2.53271 7.41967L1.27356 6.7484C1.61959 7.65073 2.02764 8.52661 2.4946 9.36941C3.22723 10.5944 4.5037 11.474 4.5037 11.474C4.5037 11.474 3.81091 9.79318 4.5037 10.16C5.19649 10.5268 6.69984 11.9299 6.84533 12.9982C6.9234 12.5777 6.91872 12.1453 6.83156 11.7266C6.7444 11.3079 6.57653 10.9115 6.33786 10.5606C6.21864 10.4954 6.103 10.4235 5.99147 10.3452C5.50334 10.0026 5.10377 9.54289 4.82733 9.00584C4.5509 8.4688 4.40593 7.87059 4.40497 7.26298ZM8.03695 9.81098C9.40576 9.81098 10.5154 8.6702 10.5154 7.26297C10.5154 5.85575 9.40576 4.71497 8.03695 4.71497C6.66813 4.71497 5.55849 5.85575 5.55849 7.26297C5.55849 8.6702 6.66813 9.81098 8.03695 9.81098Z", "fill": "#CD8837" } })]), _c("symbol", { attrs: { "id": "rank-platinum", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 20 20", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M12.7382 7.77729C13.2988 8.45163 13.606 9.31003 13.6042 10.1971C13.6026 10.8058 13.4564 11.4049 13.1784 11.9423C12.9005 12.4798 12.4991 12.9393 12.0091 13.2811C11.898 13.3595 11.7823 13.4308 11.6627 13.4947C11.424 13.8456 11.2561 14.2421 11.169 14.6607C11.0818 15.0794 11.0771 15.5118 11.1552 15.9323C11.3007 14.8586 12.8266 13.4502 13.5072 13.0923C14.1879 12.7344 13.5072 14.4082 13.5072 14.4082C13.5072 14.4082 14.7768 13.5286 15.5094 12.3035C15.9732 11.4598 16.3784 10.5833 16.7218 9.68073L15.4644 10.3538C15.7692 8.93645 17.2639 7.72209 17.2639 7.72209C17.8857 6.23542 18.1243 4.60908 17.9567 3C17.3505 5.46254 14.4183 7.04903 12.7382 7.77729ZM6.40441 10.263C6.40291 9.37598 6.71007 8.51767 7.2704 7.84318C5.59385 7.11492 2.65988 5.5213 2.05542 3.06589C1.8878 4.67555 2.1264 6.30246 2.74821 7.78976C2.74821 7.78976 4.22732 9.00233 4.53214 10.4197L3.273 9.7484C3.61903 10.6507 4.02708 11.5266 4.49404 12.3694C5.22667 13.5944 6.50313 14.474 6.50313 14.474C6.50313 14.474 5.81034 12.7932 6.50313 13.16C7.19592 13.5268 8.69928 14.9299 8.84477 15.9982C8.92284 15.5777 8.91816 15.1453 8.831 14.7266C8.74384 14.3079 8.57597 13.9115 8.3373 13.5606C8.21807 13.4954 8.10243 13.4235 7.9909 13.3452C7.50277 13.0026 7.1032 12.5429 6.82677 12.0058C6.55034 11.4688 6.40537 10.8706 6.40441 10.263ZM10.0364 12.811C11.4052 12.811 12.5148 11.6702 12.5148 10.263C12.5148 8.85575 11.4052 7.71497 10.0364 7.71497C8.66757 7.71497 7.55792 8.85575 7.55792 10.263C7.55792 11.6702 8.66757 12.811 10.0364 12.811Z", "fill": "#4E9996" } })]), _c("symbol", { attrs: { "id": "rank-emerald", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 20 20", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M7.28209 7.77729C6.7215 8.45163 6.41429 9.31003 6.4161 10.1971C6.41774 10.8058 6.5639 11.4049 6.84189 11.9423C7.11988 12.4798 7.52129 12.9393 8.01126 13.2811C8.12238 13.3595 8.23806 13.4308 8.35765 13.4947C8.59632 13.8456 8.76419 14.2421 8.85135 14.6607C8.93851 15.0794 8.94319 15.5118 8.86512 15.9323C8.71963 14.8586 7.19376 13.4502 6.51309 13.0923C5.83243 12.7344 6.51309 14.4082 6.51309 14.4082C6.51309 14.4082 5.3646 13.5605 4.33093 11.9941C4.31699 11.973 4.30313 11.9519 4.28935 11.931C3.62867 10.9293 3.1492 10.2023 2.13162 9.92188C3.11722 9.58748 4.55596 10.3538 4.55596 10.3538C4.25113 8.93645 2.75644 7.72209 2.75644 7.72209C2.13463 6.23542 1.89602 4.60908 2.06365 3C2.66984 5.46254 5.60208 7.04903 7.28209 7.77729ZM13.6042 10.1971C13.606 9.31003 13.2988 8.45163 12.7382 7.77729C14.4183 7.04903 17.3505 5.46254 17.9567 3C18.1243 4.60908 17.8857 6.23542 17.2639 7.72209C17.2639 7.72209 15.7692 8.93645 15.4644 10.3538C15.4644 10.3538 16.9031 9.58748 17.8887 9.92188C16.8711 10.2023 16.3917 10.9293 15.731 11.931L15.6894 11.9941C14.6557 13.5605 13.5072 14.4082 13.5072 14.4082C13.5072 14.4082 14.1879 12.7344 13.5072 13.0923C12.8266 13.4502 11.3007 14.8586 11.1552 15.9323C11.0771 15.5118 11.0818 15.0794 11.169 14.6607C11.2561 14.2421 11.424 13.8456 11.6627 13.4947C11.7823 13.4308 11.898 13.3595 12.0091 13.2811C12.4991 12.9393 12.9005 12.4798 13.1785 11.9423C13.4564 11.4049 13.6026 10.8058 13.6042 10.1971ZM10.0364 12.811C11.4052 12.811 12.5149 11.6702 12.5149 10.263C12.5149 8.85575 11.4052 7.71497 10.0364 7.71497C8.66758 7.71497 7.55794 8.85575 7.55794 10.263C7.55794 11.6702 8.66758 12.811 10.0364 12.811Z", "fill": "#149C3A" } })]), _c("symbol", { attrs: { "id": "rank-diamond", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 20 20", "fill": "none" } }, [_c("path", { attrs: { "fill-rule": "evenodd", "clip-rule": "evenodd", "d": "M7.26501 7.77728C6.70441 8.45162 6.39721 9.31003 6.39902 10.1971C6.40066 10.8058 6.54682 11.4049 6.8248 11.9423C7.10279 12.4798 7.5042 12.9393 7.99417 13.2811C8.10529 13.3595 8.22097 13.4308 8.34056 13.4947C8.57923 13.8456 8.74711 14.2421 8.83427 14.6607C8.92142 15.0794 8.92611 15.5118 8.84803 15.9323C8.70255 14.8586 7.17668 13.4502 6.49601 13.0923C5.81534 12.7344 6.49601 14.4082 6.49601 14.4082C4.85133 13.4099 4.53293 12.4616 4.21748 11.5221C3.98661 10.8345 3.75732 10.1516 3.01078 9.45731C4.15628 9.79612 4.53888 10.3538 4.53888 10.3538C4.39221 8.54614 2.51869 7.99745 2.51869 7.99745C2.27947 7.16721 2.14678 6.49021 2.0302 5.89533C1.81547 4.79969 1.65534 3.98265 0.984772 3C4.28701 3.89704 5.63879 5.52611 7.26501 7.77728ZM13.6043 10.1971C13.6061 9.31003 13.2989 8.45163 12.7383 7.77729C14.3645 5.52612 15.7163 3.89704 19.0185 3.00001C18.3479 3.98265 18.1878 4.7997 17.9731 5.89534C17.8565 6.49021 17.7238 7.16722 17.4846 7.99745C17.4846 7.99745 15.6111 8.54615 15.4644 10.3538C15.4644 10.3538 15.847 9.79612 16.9925 9.45731C16.2459 10.1516 16.0167 10.8345 15.7858 11.5221C15.4703 12.4616 15.1519 13.4099 13.5073 14.4082C13.5073 14.4082 14.1879 12.7344 13.5073 13.0923C12.8266 13.4502 11.3007 14.8586 11.1552 15.9323C11.0772 15.5118 11.0818 15.0794 11.169 14.6607C11.2562 14.2421 11.424 13.8456 11.6627 13.4947C11.7823 13.4308 11.898 13.3595 12.0091 13.2811C12.4991 12.9393 12.9005 12.4798 13.1785 11.9423C13.4565 11.4049 13.6026 10.8058 13.6043 10.1971ZM10.0364 12.811C11.4052 12.811 12.5149 11.6702 12.5149 10.263C12.5149 8.85575 11.4052 7.71497 10.0364 7.71497C8.66759 7.71497 7.55795 8.85575 7.55795 10.263C7.55795 11.6702 8.66759 12.811 10.0364 12.811Z", "fill": "#576BCE" } })]), _c("symbol", { attrs: { "id": "rank-master", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 17 15", "fill": "none" } }, [_c("path", { attrs: { "d": "M7.61488 15C7.90271 14.2471 8.14287 13.4744 8.33375 12.6872C7.75357 12.5611 7.21753 12.2657 6.78526 11.8339C6.353 11.402 6.04145 10.8506 5.88528 10.2411C5.72911 9.63153 5.73445 8.98768 5.90068 8.38116C6.06692 7.77464 6.38755 7.22924 6.82689 6.80561C5.56024 5.40575 3.3708 2.56363 3.76479 0C3.76479 0 2.61564 1.82958 2.60009 4.64589C2.60009 4.64589 3.26884 5.95906 3.29131 7.23903C2.37026 6.36297 1.39045 5.10697 1.36799 3.73478C1.36799 3.73478 1.32479 3.84913 1.26776 4.05201L1.1347 4.63667C1.05957 5.0581 1.01967 5.48582 1.01547 5.91479C0.99224 6.36754 0.99224 6.82132 1.01547 7.27407C1.07101 8.50634 1.35406 9.71476 1.84839 10.83C1.84839 10.83 2.08167 10.8816 2.45148 10.9867C3.41745 11.2486 4.76188 11.7245 5.82808 12.4825L5.92658 12.5544C6.75777 13.1501 7.41616 13.9137 7.5233 14.8672", "fill": "#A4584E" } }), _c("path", { attrs: { "d": "M11.1591 9.33981C11.1594 8.8783 11.0315 8.42704 10.7915 8.04312C10.5515 7.6592 10.2102 7.35988 9.81083 7.18301C9.41142 7.00614 8.97184 6.95967 8.54769 7.04949C8.12354 7.1393 7.73387 7.36136 7.42798 7.68758C7.12209 8.01379 6.91373 8.4295 6.82924 8.88213C6.74475 9.33475 6.78794 9.80395 6.95334 10.2304C7.11874 10.6568 7.39893 11.0213 7.75845 11.2777C8.11797 11.5342 8.54067 11.6711 8.97309 11.6711C9.55241 11.6706 10.1079 11.4249 10.5177 10.9878C10.9275 10.5508 11.1582 9.95812 11.1591 9.33981Z", "fill": "#9D48E0" } }), _c("path", { attrs: { "d": "M10.3849 15C10.0971 14.2471 9.8569 13.4744 9.66602 12.6872C10.2462 12.5611 10.7822 12.2657 11.2145 11.8339C11.6468 11.402 11.9583 10.8506 12.1145 10.2411C12.2707 9.63153 12.2653 8.98768 12.0991 8.38116C11.9328 7.77464 11.6122 7.22924 11.1729 6.80561C12.4395 5.40575 14.629 2.56363 14.235 0C14.235 0 15.3841 1.82958 15.398 4.64589C15.398 4.64589 14.7309 5.95906 14.7067 7.23903C15.6278 6.36297 16.6076 5.10697 16.63 3.73478C16.63 3.73478 16.6733 3.84913 16.7303 4.05201L16.8616 4.63298C16.9383 5.05421 16.9788 5.48202 16.9826 5.9111C17.0058 6.36386 17.0058 6.81763 16.9826 7.27038C16.9287 8.50227 16.6474 9.71068 16.1548 10.8263C16.1548 10.8263 15.9198 10.8779 15.5517 10.983C14.584 11.2449 13.2413 11.7208 12.1751 12.4788L12.0749 12.5507C11.2437 13.1464 10.5853 13.91 10.4782 14.8635", "fill": "#A4584E" } })]), _c("symbol", { attrs: { "id": "rank-grandmaster", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 17 15", "fill": "none" } }, [_c("path", { attrs: { "d": "M7.61488 15C7.90271 14.2471 8.14287 13.4744 8.33375 12.6872C7.75357 12.5611 7.21753 12.2657 6.78526 11.8339C6.353 11.402 6.04145 10.8506 5.88528 10.2411C5.72911 9.63153 5.73445 8.98768 5.90068 8.38116C6.06692 7.77464 6.38755 7.22924 6.82689 6.80561C5.56024 5.40575 3.3708 2.56363 3.76479 0C3.76479 0 2.61564 1.82958 2.60009 4.64589C2.60009 4.64589 3.26884 5.95906 3.29131 7.23903C2.37026 6.36297 1.39045 5.10697 1.36799 3.73478C1.36799 3.73478 1.32479 3.84913 1.26776 4.05201L1.1347 4.63667C1.05957 5.0581 1.01967 5.48582 1.01547 5.91479C0.99224 6.36754 0.99224 6.82132 1.01547 7.27407C1.07101 8.50634 1.35406 9.71476 1.84839 10.83C1.84839 10.83 2.08167 10.8816 2.45148 10.9867C3.41745 11.2486 4.76188 11.7245 5.82808 12.4825L5.92658 12.5544C6.75777 13.1501 7.41616 13.9137 7.5233 14.8672", "fill": "#756572" } }), _c("path", { attrs: { "d": "M11.1591 9.33981C11.1594 8.8783 11.0315 8.42704 10.7915 8.04312C10.5515 7.6592 10.2102 7.35988 9.81083 7.18301C9.41142 7.00614 8.97184 6.95967 8.54769 7.04949C8.12354 7.1393 7.73387 7.36136 7.42798 7.68758C7.12209 8.01379 6.91373 8.4295 6.82924 8.88213C6.74475 9.33475 6.78794 9.80395 6.95334 10.2304C7.11874 10.6568 7.39893 11.0213 7.75845 11.2777C8.11797 11.5342 8.54067 11.6711 8.97309 11.6711C9.55241 11.6706 10.1079 11.4249 10.5177 10.9878C10.9275 10.5508 11.1582 9.95812 11.1591 9.33981Z", "fill": "#CD4545" } }), _c("path", { attrs: { "d": "M10.3849 15C10.0971 14.2471 9.8569 13.4744 9.66602 12.6872C10.2462 12.5611 10.7822 12.2657 11.2145 11.8339C11.6468 11.402 11.9583 10.8506 12.1145 10.2411C12.2707 9.63153 12.2653 8.98768 12.0991 8.38116C11.9328 7.77464 11.6122 7.22924 11.1729 6.80561C12.4395 5.40575 14.629 2.56363 14.235 0C14.235 0 15.3841 1.82958 15.398 4.64589C15.398 4.64589 14.7309 5.95906 14.7067 7.23903C15.6278 6.36297 16.6076 5.10697 16.63 3.73478C16.63 3.73478 16.6733 3.84913 16.7303 4.05201L16.8616 4.63298C16.9383 5.05421 16.9788 5.48202 16.9826 5.9111C17.0058 6.36386 17.0058 6.81763 16.9826 7.27038C16.9287 8.50227 16.6474 9.71068 16.1548 10.8263C16.1548 10.8263 15.9198 10.8779 15.5517 10.983C14.584 11.2449 13.2413 11.7208 12.1751 12.4788L12.0749 12.5507C11.2437 13.1464 10.5853 13.91 10.4782 14.8635", "fill": "#756572" } })]), _c("symbol", { attrs: { "id": "rank-challenger", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 17 15", "fill": "none" } }, [_c("path", { attrs: { "d": "M7.61488 15C7.90271 14.2471 8.14287 13.4744 8.33375 12.6872C7.75357 12.5611 7.21753 12.2657 6.78526 11.8339C6.353 11.402 6.04145 10.8506 5.88528 10.2411C5.72911 9.63153 5.73445 8.98768 5.90068 8.38116C6.06692 7.77464 6.38755 7.22924 6.82689 6.80561C5.56024 5.40575 3.3708 2.56363 3.76479 0C3.76479 0 2.61564 1.82958 2.60009 4.64589C2.60009 4.64589 3.26884 5.95906 3.29131 7.23903C2.37026 6.36297 1.39045 5.10697 1.36799 3.73478C1.36799 3.73478 1.32479 3.84913 1.26776 4.05201L1.1347 4.63667C1.05957 5.0581 1.01967 5.48582 1.01547 5.91479C0.99224 6.36754 0.99224 6.82132 1.01547 7.27407C1.07101 8.50634 1.35406 9.71476 1.84839 10.83C1.84839 10.83 2.08167 10.8816 2.45148 10.9867C3.41745 11.2486 4.76188 11.7245 5.82808 12.4825L5.92658 12.5544C6.75777 13.1501 7.41616 13.9137 7.5233 14.8672", "fill": "#F4C874" } }), _c("path", { attrs: { "d": "M11.1591 9.33981C11.1594 8.8783 11.0315 8.42704 10.7915 8.04312C10.5515 7.6592 10.2102 7.35988 9.81083 7.18301C9.41142 7.00614 8.97184 6.95967 8.54769 7.04949C8.12354 7.1393 7.73387 7.36136 7.42798 7.68758C7.12209 8.01379 6.91373 8.4295 6.82924 8.88213C6.74475 9.33475 6.78794 9.80395 6.95334 10.2304C7.11874 10.6568 7.39893 11.0213 7.75845 11.2777C8.11797 11.5342 8.54067 11.6711 8.97309 11.6711C9.55241 11.6706 10.1079 11.4249 10.5177 10.9878C10.9275 10.5508 11.1582 9.95812 11.1591 9.33981Z", "fill": "#3FBFDD" } }), _c("path", { attrs: { "d": "M10.3849 15C10.0971 14.2471 9.8569 13.4744 9.66602 12.6872C10.2462 12.5611 10.7822 12.2657 11.2145 11.8339C11.6468 11.402 11.9583 10.8506 12.1145 10.2411C12.2707 9.63153 12.2653 8.98768 12.0991 8.38116C11.9328 7.77464 11.6122 7.22924 11.1729 6.80561C12.4395 5.40575 14.629 2.56363 14.235 0C14.235 0 15.3841 1.82958 15.398 4.64589C15.398 4.64589 14.7309 5.95906 14.7067 7.23903C15.6278 6.36297 16.6076 5.10697 16.63 3.73478C16.63 3.73478 16.6733 3.84913 16.7303 4.05201L16.8616 4.63298C16.9383 5.05421 16.9788 5.48202 16.9826 5.9111C17.0058 6.36386 17.0058 6.81763 16.9826 7.27038C16.9287 8.50227 16.6474 9.71068 16.1548 10.8263C16.1548 10.8263 15.9198 10.8779 15.5517 10.983C14.584 11.2449 13.2413 11.7208 12.1751 12.4788L12.0749 12.5507C11.2437 13.1464 10.5853 13.91 10.4782 14.8635", "fill": "#F4C874" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "search", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 512 512" } }, [_c("path", { attrs: { "d": "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "star", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 576 512" } }, [_c("path", { attrs: { "fill": "currentColor", "d": "M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" } })]), _c("symbol", { attrs: { "id": "star-outline", "fill": "none", "viewBox": "0 0 24 24", "stroke": "currentColor" } }, [_c("path", { attrs: { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", "d": "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "stopwatch", "viewBox": "0 0 17 20", "xmlns": "http://www.w3.org/2000/svg" } }, [_c("path", { attrs: { "d": "M16.999 11.875C16.999 16.3633 13.1946 20 8.49949 20C3.80434 20 0 16.3633 0 11.875C0 7.8125 3.11784 4.44531 7.19188 3.84766V2.5H6.04771C5.77802 2.5 5.55736 2.28906 5.55736 2.03125V0.46875C5.55736 0.210938 5.77802 0 6.04771 0H10.9513C11.221 0 11.4416 0.210938 11.4416 0.46875V2.03125C11.4416 2.28906 11.221 2.5 10.9513 2.5H9.8071V3.84766C11.3395 4.07422 12.737 4.69141 13.8811 5.58984L15.0049 4.51562C15.1969 4.33203 15.5075 4.33203 15.6995 4.51562L16.856 5.62109C17.048 5.80469 17.048 6.10156 16.856 6.28516L15.6546 7.43359L15.6301 7.45703C16.4964 8.72266 16.999 10.2422 16.999 11.875ZM9.8071 13.2812V7.36328C9.8071 7.10547 9.58644 6.89453 9.31675 6.89453H7.68223C7.41254 6.89453 7.19188 7.10547 7.19188 7.36328V13.2812C7.19188 13.5391 7.41254 13.75 7.68223 13.75H9.31675C9.58644 13.75 9.8071 13.5391 9.8071 13.2812Z" } })]), _c("symbol", { staticClass: "stroke-current", attrs: { "id": "time", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" } }, [_c("circle", { attrs: { "cx": "12", "cy": "12", "r": "10" } }), _c("polyline", { attrs: { "points": "12 6 12 12 16 14" } })]), _c("symbol", { staticClass: "fill-current", attrs: { "id": "times", "xmlns": "http://www.w3.org/2000/svg", "viewBox": "0 0 352 512" } }, [_c("path", { attrs: { "fill": "currentColor", "d": "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" } })])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null,
  null,
  null
);
const SVGContainer = __component__$1.exports;
console.log("App.vue");
const _sfc_main = {
  components: {
    Default,
    Home,
    NotificationsContainer,
    RunesContainer,
    SVGContainer,
    console
  },
  computed: {
    layout() {
      return this.$route.meta.layout || "Default";
    }
  },
  created() {
    this.updatePercent();
    this.updateSettings({ name: "region" });
    this.updateSettings({ name: "recentSearches", isJson: true });
    this.updateSettings({ name: "favorites", isJson: true });
  },
  methods: {
    ...mapActions("settings", ["updatePercent", "updateSettings"])
  }
};
var _sfc_render = function render25() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "min-h-screen bg-blue-900 font-sans antialiased", attrs: { "id": "app" } }, [_c("SVGContainer"), _c("NotificationsContainer"), _c("RunesContainer"), _c("portal-target", { attrs: { "name": "tooltip-destination" } }), _c(_vm.layout, { tag: "component" }, [_c("router-view")], 1)], 1);
};
var _sfc_staticRenderFns = [];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  null,
  null,
  null
);
const App = __component__.exports;
Vue$1.config.productionTip = false;
Vue$1.use(VueAxios);
Vue$1.use(index$1);
Vue$1.use(index);
Vue$1.filter("capitalize", (value) => {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
});
Vue$1.filter("kilo", (value, shortFormat = true) => {
  return value > 1e3 || shortFormat ? `${+(value / 1e3).toFixed(1)}k` : value;
});
Vue$1.filter("secToTime", (sec, dotNotation = false) => {
  if (isNaN(sec))
    return 0;
  const min = Math.floor(sec / 60);
  let newSec = Math.floor(sec - min * 60);
  newSec = newSec < 10 ? "0" + newSec : newSec;
  return dotNotation ? `${min}:${newSec}` : `${min}m${newSec}s`;
});
Vue$1.filter("secToHours", (sec) => {
  if (isNaN(sec))
    return 0;
  const result = [];
  const d = Math.floor(sec / (3600 * 24));
  const h = Math.floor(sec % (3600 * 24) / 3600);
  const m = Math.floor(sec % 3600 / 60);
  if (d > 0) {
    result.push(d + " days");
  } else {
    if (h > 0) {
      result.push(h + "h");
    }
    if (m > 0) {
      result.push(m + "m");
    }
  }
  return result.join(" ");
});
Vue$1.filter("percent", (value) => {
  return `${+value.toFixed(1)}%`;
});
Vue$1.filter("round", (value, decimals = 2) => {
  if (isNaN(value))
    return 0;
  return parseFloat(value.toFixed(decimals));
});
new Vue$1({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
router.push("/");
export {
  ContentLoader as C,
  LazyBackground as L,
  RuneStyle as R,
  SearchForm as S,
  Tooltip as T,
  __$_require_13b7a352__ as _,
  mapActions as a,
  mapGetters as b,
  colors as c,
  getPrimarRune as d,
  getSecondaryRune as e,
  createCDragonAssetUrl as f,
  gameModes as g,
  store as h,
  LeagueOfLegendsClientApi as i,
  mapState as m,
  normalizeComponent as n,
  sortTeamByRole as s,
  timeDifference as t
};
