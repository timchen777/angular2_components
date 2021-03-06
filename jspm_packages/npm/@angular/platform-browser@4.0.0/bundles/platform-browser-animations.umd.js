/* */ 
"format cjs";
(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('./platform-browser.umd'), require('@angular/animations/browser')) : typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/platform-browser', '@angular/animations/browser'], factory) : (factory((global.ng = global.ng || {}, global.ng.platformBrowser = global.ng.platformBrowser || {}, global.ng.platformBrowser.animations = global.ng.platformBrowser.animations || {}), global.ng.core, global.ng.platformBrowser, global.ng.animations.browser));
}(this, (function(exports, _angular_core, _angular_platformBrowser, _angular_animations_browser) {
  'use strict';
  var __extends = (undefined && undefined.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var AnimationRendererFactory = (function() {
    function AnimationRendererFactory(delegate, _engine, _zone) {
      this.delegate = delegate;
      this._engine = _engine;
      this._zone = _zone;
    }
    AnimationRendererFactory.prototype.createRenderer = function(hostElement, type) {
      var _this = this;
      var delegate = this.delegate.createRenderer(hostElement, type);
      if (!hostElement || !type || !type.data || !type.data['animation'])
        return delegate;
      var namespaceId = type.id;
      var animationTriggers = (type.data['animation']);
      animationTriggers.forEach(function(trigger) {
        return _this._engine.registerTrigger(trigger, namespaceify(namespaceId, trigger.name));
      });
      return new AnimationRenderer(delegate, this._engine, this._zone, namespaceId);
    };
    return AnimationRendererFactory;
  }());
  AnimationRendererFactory.decorators = [{type: _angular_core.Injectable}];
  AnimationRendererFactory.ctorParameters = function() {
    return [{type: _angular_core.RendererFactory2}, {type: _angular_animations_browser.ɵAnimationEngine}, {type: _angular_core.NgZone}];
  };
  var AnimationRenderer = (function() {
    function AnimationRenderer(delegate, _engine, _zone, _namespaceId) {
      this.delegate = delegate;
      this._engine = _engine;
      this._zone = _zone;
      this._namespaceId = _namespaceId;
      this.destroyNode = null;
      this._flushPromise = null;
      this.destroyNode = this.delegate.destroyNode ? function(n) {
        return delegate.destroyNode(n);
      } : null;
    }
    Object.defineProperty(AnimationRenderer.prototype, "data", {
      get: function() {
        return this.delegate.data;
      },
      enumerable: true,
      configurable: true
    });
    AnimationRenderer.prototype.destroy = function() {
      this.delegate.destroy();
    };
    AnimationRenderer.prototype.createElement = function(name, namespace) {
      return this.delegate.createElement(name, namespace);
    };
    AnimationRenderer.prototype.createComment = function(value) {
      return this.delegate.createComment(value);
    };
    AnimationRenderer.prototype.createText = function(value) {
      return this.delegate.createText(value);
    };
    AnimationRenderer.prototype.selectRootElement = function(selectorOrNode) {
      return this.delegate.selectRootElement(selectorOrNode);
    };
    AnimationRenderer.prototype.parentNode = function(node) {
      return this.delegate.parentNode(node);
    };
    AnimationRenderer.prototype.nextSibling = function(node) {
      return this.delegate.nextSibling(node);
    };
    AnimationRenderer.prototype.setAttribute = function(el, name, value, namespace) {
      this.delegate.setAttribute(el, name, value, namespace);
    };
    AnimationRenderer.prototype.removeAttribute = function(el, name, namespace) {
      this.delegate.removeAttribute(el, name, namespace);
    };
    AnimationRenderer.prototype.addClass = function(el, name) {
      this.delegate.addClass(el, name);
    };
    AnimationRenderer.prototype.removeClass = function(el, name) {
      this.delegate.removeClass(el, name);
    };
    AnimationRenderer.prototype.setStyle = function(el, style, value, flags) {
      this.delegate.setStyle(el, style, value, flags);
    };
    AnimationRenderer.prototype.removeStyle = function(el, style, flags) {
      this.delegate.removeStyle(el, style, flags);
    };
    AnimationRenderer.prototype.setValue = function(node, value) {
      this.delegate.setValue(node, value);
    };
    AnimationRenderer.prototype.appendChild = function(parent, newChild) {
      var _this = this;
      this._engine.onInsert(newChild, function() {
        return _this.delegate.appendChild(parent, newChild);
      });
      this._queueFlush();
    };
    AnimationRenderer.prototype.insertBefore = function(parent, newChild, refChild) {
      var _this = this;
      this._engine.onInsert(newChild, function() {
        return _this.delegate.insertBefore(parent, newChild, refChild);
      });
      this._queueFlush();
    };
    AnimationRenderer.prototype.removeChild = function(parent, oldChild) {
      var _this = this;
      this._engine.onRemove(oldChild, function() {
        if (_this.delegate.parentNode(oldChild)) {
          _this.delegate.removeChild(parent, oldChild);
        }
      });
      this._queueFlush();
    };
    AnimationRenderer.prototype.setProperty = function(el, name, value) {
      if (name.charAt(0) == '@') {
        this._engine.setProperty(el, namespaceify(this._namespaceId, name.substr(1)), value);
        this._queueFlush();
      } else {
        this.delegate.setProperty(el, name, value);
      }
    };
    AnimationRenderer.prototype.listen = function(target, eventName, callback) {
      var _this = this;
      if (eventName.charAt(0) == '@') {
        var element = resolveElementFromTarget(target);
        var _a = parseTriggerCallbackName(eventName.substr(1)),
            name = _a[0],
            phase = _a[1];
        return this._engine.listen(element, namespaceify(this._namespaceId, name), phase, function(event) {
          var e = (event);
          if (e.triggerName) {
            e.triggerName = deNamespaceify(_this._namespaceId, e.triggerName);
          }
          _this._zone.run(function() {
            return callback(event);
          });
        });
      }
      return this.delegate.listen(target, eventName, callback);
    };
    AnimationRenderer.prototype._queueFlush = function() {
      var _this = this;
      if (!this._flushPromise) {
        this._zone.runOutsideAngular(function() {
          _this._flushPromise = Promise.resolve(null).then(function() {
            _this._flushPromise = null;
            _this._engine.flush();
          });
        });
      }
    };
    return AnimationRenderer;
  }());
  function resolveElementFromTarget(target) {
    switch (target) {
      case 'body':
        return document.body;
      case 'document':
        return document;
      case 'window':
        return window;
      default:
        return target;
    }
  }
  function parseTriggerCallbackName(triggerName) {
    var dotIndex = triggerName.indexOf('.');
    var trigger = triggerName.substring(0, dotIndex);
    var phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
  }
  function namespaceify(namespaceId, value) {
    return namespaceId + "#" + value;
  }
  function deNamespaceify(namespaceId, value) {
    return value.replace(namespaceId + '#', '');
  }
  var InjectableAnimationEngine = (function(_super) {
    __extends(InjectableAnimationEngine, _super);
    function InjectableAnimationEngine(driver, normalizer) {
      return _super.call(this, driver, normalizer) || this;
    }
    return InjectableAnimationEngine;
  }(_angular_animations_browser.ɵDomAnimationEngine));
  InjectableAnimationEngine.decorators = [{type: _angular_core.Injectable}];
  InjectableAnimationEngine.ctorParameters = function() {
    return [{type: _angular_animations_browser.AnimationDriver}, {type: _angular_animations_browser.ɵAnimationStyleNormalizer}];
  };
  function instantiateSupportedAnimationDriver() {
    if (_angular_animations_browser.ɵsupportsWebAnimations()) {
      return new _angular_animations_browser.ɵWebAnimationsDriver();
    }
    return new _angular_animations_browser.ɵNoopAnimationDriver();
  }
  function instantiateDefaultStyleNormalizer() {
    return new _angular_animations_browser.ɵWebAnimationsStyleNormalizer();
  }
  function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
  }
  var BROWSER_ANIMATIONS_PROVIDERS = [{
    provide: _angular_animations_browser.AnimationDriver,
    useFactory: instantiateSupportedAnimationDriver
  }, {
    provide: _angular_animations_browser.ɵAnimationStyleNormalizer,
    useFactory: instantiateDefaultStyleNormalizer
  }, {
    provide: _angular_animations_browser.ɵAnimationEngine,
    useClass: InjectableAnimationEngine
  }, {
    provide: _angular_core.RendererFactory2,
    useFactory: instantiateRendererFactory,
    deps: [_angular_platformBrowser.ɵDomRendererFactory2, _angular_animations_browser.ɵAnimationEngine, _angular_core.NgZone]
  }];
  var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
    provide: _angular_animations_browser.ɵAnimationEngine,
    useClass: _angular_animations_browser.ɵNoopAnimationEngine
  }, {
    provide: _angular_core.RendererFactory2,
    useFactory: instantiateRendererFactory,
    deps: [_angular_platformBrowser.ɵDomRendererFactory2, _angular_animations_browser.ɵAnimationEngine, _angular_core.NgZone]
  }];
  var BrowserAnimationsModule = (function() {
    function BrowserAnimationsModule() {}
    return BrowserAnimationsModule;
  }());
  BrowserAnimationsModule.decorators = [{
    type: _angular_core.NgModule,
    args: [{
      imports: [_angular_platformBrowser.BrowserModule],
      providers: BROWSER_ANIMATIONS_PROVIDERS
    }]
  }];
  BrowserAnimationsModule.ctorParameters = function() {
    return [];
  };
  var NoopAnimationsModule = (function() {
    function NoopAnimationsModule() {}
    return NoopAnimationsModule;
  }());
  NoopAnimationsModule.decorators = [{
    type: _angular_core.NgModule,
    args: [{
      imports: [_angular_platformBrowser.BrowserModule],
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS
    }]
  }];
  NoopAnimationsModule.ctorParameters = function() {
    return [];
  };
  exports.BrowserAnimationsModule = BrowserAnimationsModule;
  exports.NoopAnimationsModule = NoopAnimationsModule;
  exports.ɵAnimationRenderer = AnimationRenderer;
  exports.ɵAnimationRendererFactory = AnimationRendererFactory;
  exports.ɵe = BROWSER_ANIMATIONS_PROVIDERS;
  exports.ɵf = BROWSER_NOOP_ANIMATIONS_PROVIDERS;
  exports.ɵa = InjectableAnimationEngine;
  exports.ɵc = instantiateDefaultStyleNormalizer;
  exports.ɵd = instantiateRendererFactory;
  exports.ɵb = instantiateSupportedAnimationDriver;
  Object.defineProperty(exports, '__esModule', {value: true});
})));
