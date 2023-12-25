import { n as normalizeComponent, L as LazyBackground, S as SearchForm, _ as __$_require_13b7a352__ } from "./index-a1b34cfc.js";
const Home_vue_vue_type_style_index_0_scoped_782e955d_lang = "";
console.log("Homeview");
const _sfc_main = {
  components: {
    LazyBackground,
    SearchForm,
    console
  },
  methods: {
    redirect(summoner, region) {
      this.$router.push(`/summoner/${region}/${summoner}`);
    }
  },
  metaInfo() {
    return {
      title: "LeagueStats.gg"
    };
  }
};
var _sfc_render = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "relative overflow-hidden bg-blue-900" }, [_c("LazyBackground", { attrs: { "image-source": "/img/bg-homepage-1.jpg", "image-class": "absolute inset-0 bg-center", "transition-name": "fade" } }), _c("div", { staticClass: "flex h-screen flex-col items-center justify-center" }, [_vm._m(0), _vm._m(1), _c("div", { staticClass: "relative flex w-full max-w-lg flex-col items-center" }, [_c("img", { staticClass: "logo absolute", attrs: { "src": __$_require_13b7a352__, "alt": "logo" } }), _c("SearchForm", { attrs: { "homepage": true }, on: { "formSubmit": _vm.redirect } })], 1), _vm._m(2)])], 1);
};
var _sfc_staticRenderFns = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "absolute right-0 top-0" }, [_c("div", { staticClass: "line line-top relative mr-4 mt-4 h-2 w-20" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "absolute bottom-0 left-0" }, [_c("div", { staticClass: "line line-bottom relative mb-4 ml-4 h-2 w-20" })]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("p", { staticClass: "horizontal-center absolute bottom-0 pb-4 text-center text-xxs leading-tight text-blue-300" }, [_vm._v(" LeagueStats.gg isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. "), _c("br"), _vm._v("Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc. ")]);
}];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "782e955d",
  null,
  null
);
const Home = __component__.exports;
export {
  Home as default
};
