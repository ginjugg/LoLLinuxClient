import { o as openedClient } from "./Test-5830332e.js";
import { L as LazyBackground, R as RuneStyle, m as mapState, f as createCDragonAssetUrl, a as mapActions, n as normalizeComponent, h as store } from "./index-a1b34cfc.js";
const _sfc_main$1 = {
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
      runes: (state) => state.cdragon.runes,
      runesOpen: (state) => state.cdragon.runesOpen,
      selectedRunes: (state) => state.cdragon.selectedRunes
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
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "relative flex h-full items-start px-4 py-2" }, [_c("div", { staticClass: "w-1/2" }, [_vm._m(0), _c("RuneStyle", { attrs: { "primary": true, "rune-style": _vm.primaryStyle } })], 1), _c("div", { staticClass: "w-1/2" }, [_c("RuneStyle", { attrs: { "primary": false, "rune-style": _vm.secondaryStyle } })], 1)]);
};
var _sfc_staticRenderFns$1 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", [_c("h1", [_vm._v(" DefaultRunes from Client: ")])]);
}];
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
const RunesContainerWithoutTransition = __component__$1.exports;
async function waitData() {
  const testdata = await openedClient();
  console.log("Testdata:", testdata);
  return testdata;
}
const _sfc_main = {
  components: {
    RunesContainerWithoutTransition
  },
  computed: {
    console: () => console,
    window: () => window
  },
  data() {
    return {
      isLoading: true,
      player: {
        perks: {
          primaryStyle: 0,
          secondaryStyle: 0,
          selected: []
        }
      }
      // other data
    };
  },
  async mounted() {
    const clientData = await waitData();
    store.state.cdragon.selectedRunes.primaryStyle = clientData.CurrentRunePage.primaryStyleId;
    store.state.cdragon.selectedRunes.secondaryStyle = clientData.CurrentRunePage.subStyleId;
    store.state.cdragon.selectedRunes.selected = clientData.CurrentRunePage.selectedPerkIds;
    store.state.runesOpen = true;
    this.isLoading = false;
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _vm.isLoading ? _c("div", [_vm._v(" Loading ClientData... ")]) : _c("div", [_c("RunesContainerWithoutTransition")], 1);
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
const SummonerRunes = __component__.exports;
export {
  SummonerRunes as default
};
