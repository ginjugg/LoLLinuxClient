import { n as normalizeComponent } from "./index-a1b34cfc.js";
const _sfc_main = {
  props: {
    color: {
      type: String,
      default: "rgba(255, 255, 255, 0.3)"
    }
  },
  data() {
    return {
      ripples: [],
      rippleWidth: 0,
      halfRippleWidth: 0
    };
  },
  mounted() {
    const width = this.$refs.container.offsetWidth;
    const height = this.$refs.container.offsetHeight;
    this.rippleWidth = width > height ? width : height;
    this.halfRippleWidth = this.rippleWidth / 2;
    window.addEventListener("mouseup", this.purgeRipples);
  },
  beforeDestroy() {
    window.removeEventListener("mouseup", this.purgeRipples);
  },
  methods: {
    addRipple(e) {
      const { left, top } = this.$refs.container.getBoundingClientRect();
      const rippleId = Date.now();
      this.ripples.push({
        width: `${this.rippleWidth}px`,
        height: `${this.rippleWidth}px`,
        left: `${e.clientX - left - this.halfRippleWidth}px`,
        top: `${e.clientY - top - this.halfRippleWidth}px`,
        id: rippleId
      });
      setTimeout(() => {
        this.ripples = this.ripples.filter((r) => r.id !== rippleId);
      }, 400);
    },
    purgeRipples() {
      this.ripples = [];
    }
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { ref: "container", staticClass: "relative cursor-pointer overflow-hidden", on: { "mousedown": _vm.addRipple } }, [_c("transition-group", { staticClass: "pointer-events-none absolute left-0 top-0 h-full w-full", attrs: { "name": "grow", "tag": "div" } }, _vm._l(_vm.ripples, function(ripple) {
    return _c("div", { key: ripple.id, staticClass: "pointer-events-none absolute h-full w-full rounded-full opacity-0", style: {
      top: ripple.top,
      left: ripple.left,
      width: ripple.width,
      height: ripple.height,
      background: _vm.color
    } });
  }), 0), _vm._t("default")], 2);
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
const Ripple = __component__.exports;
export {
  Ripple as R
};
