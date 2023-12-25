import { o as openedClient } from "./Test-5830332e.js";
import { n as normalizeComponent } from "./index-a1b34cfc.js";
async function waitData() {
  const testdata = await openedClient();
  console.log("Testdata:", testdata);
  return testdata;
}
const _sfc_main = {
  computed: {
    console: () => console,
    window: () => window
  },
  data() {
    return {
      isLoading: true
      // other data
    };
  },
  async mounted() {
    const clientData = await waitData();
    this.isLoading = false;
    this.data = JSON.stringify(clientData, null, 2);
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _vm.isLoading ? _c("div", [_vm._v(" Loading ClientData... ")]) : _c("div", [_c("pre", [_vm._v("    " + _vm._s(_vm.data) + "\n   ")])]);
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
const SummonerTest = __component__.exports;
export {
  SummonerTest as default
};
