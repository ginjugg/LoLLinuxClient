import { n as normalizeComponent, g as gameModes, t as timeDifference, C as ContentLoader, b as mapGetters, m as mapState, a as mapActions } from "./index-a1b34cfc.js";
const RecordCard_vue_vue_type_style_index_0_scoped_c170af7e_lang = "";
const _sfc_main$1 = {
  props: {
    borderColor: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    textColor: {
      type: String,
      required: true
    },
    record: {
      type: Object,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      gradient: "linear-gradient(180deg, rgba(42, 67, 101, 0.8) 0%, rgba(42, 67, 101, 0.95) 60%, rgba(42, 67, 101, 1) 100%)",
      gradientHover: "linear-gradient(rgba(42, 67, 101, 0.1) 0%, rgba(42, 67, 101, 0.3) 60%, rgba(42, 67, 101, 0.5) 100%)",
      hover: false,
      gameModes
    };
  },
  methods: {
    timeDifference
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "record-card relative mx-2 mt-6 w-full rounded-lg border bg-cover bg-center p-4 leading-none", class: _vm.borderColor, style: {
    backgroundImage: `${_vm.hover ? _vm.gradientHover : _vm.gradient},
       url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${_vm.record.champion_id}/${_vm.record.champion_id}000.jpg')`
  }, on: { "mouseenter": function($event) {
    _vm.hover = true;
  }, "mouseleave": function($event) {
    _vm.hover = false;
  } } }, [_c("div", { staticClass: "absolute left-0 top-0 ml-2 mt-2 rounded-md border border-transparent px-3 py-2 font-medium leading-4 transition-colors duration-500 ease-in-out", class: [
    { "bg-blue-1000 bg-opacity-75": _vm.hover },
    _vm.title.length > 15 ? "text-sm" : "text-base"
  ], style: { borderColor: _vm.hover ? _vm.color : "transparent" } }, [_c("span", { staticClass: "ml-0", class: _vm.textColor }, [_vm._v(_vm._s(_vm.title))])]), _c("img", { staticClass: "mx-auto mt-10 block h-16 w-16 transform rounded-full border-2 transition duration-500 ease-in", class: [{ "scale-125 opacity-0": _vm.hover }, _vm.borderColor], attrs: { "src": `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${_vm.record.champion_id}.png`, "alt": "Champion Played" } }), _c("div", { staticClass: "mt-6 text-4xl", style: { textShadow: `-2px 1px 6px ${_vm.color}` } }, [_vm._v(" " + _vm._s(_vm.record.amount) + " ")]), _c("div", { staticClass: "text-sm" }, [_c("div", { staticClass: "mt-6" }, [_c("span", { class: _vm.record.result ? "text-green-400" : "text-red-400" }, [_vm._v(_vm._s(_vm.record.result ? "Won" : "Lost"))]), _c("span", { staticClass: "ml-1 font-semibold" }, [_vm._v(_vm._s(_vm.timeDifference(_vm.record.date)))])]), _c("div", { staticClass: "mt-2 text-gray-500" }, [_vm._v(" As "), _c("span", { staticClass: "font-semibold text-white" }, [_vm._v(_vm._s(_vm.record.champion.name))])])]), _c("div", { staticClass: "mt-6 text-right text-xs font-light text-gray-200 opacity-25" }, [_vm.hover ? _c("span", [_vm._v(_vm._s(_vm.record.id))]) : _c("span", [_vm._v(_vm._s(_vm.gameModes[_vm.record.gamemode].name))])])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "c170af7e",
  null,
  null
);
const RecordCard = __component__$1.exports;
const SummonerRecords_vue_vue_type_style_index_0_scoped_f52361bb_lang = "";
const _sfc_main = {
  components: {
    ContentLoader,
    RecordCard
  },
  computed: {
    ...mapGetters("summoner", ["summonerFound"]),
    ...mapState({
      records: (state) => state.summoner.records.list,
      recordsLoaded: (state) => state.summoner.records.recordsLoaded
    })
  },
  watch: {
    recordsLoaded() {
      this.fetchData();
    },
    summonerFound() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      if (!this.recordsLoaded && this.summonerFound) {
        this.recordsRequest();
      }
    },
    ...mapActions("summoner", ["recordsRequest"])
  },
  metaInfo() {
    return {
      title: "Summoner Records"
    };
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { key: "records" }, [!_vm.recordsLoaded || _vm.recordsLoaded && _vm.records.assists ? [_c("div", { staticClass: "category blue-900 relative border-b-2 border-blue-800 pl-6 text-2xl text-blue-200" }, [_vm._v(" Basics ")]), _c("div", { staticClass: "-mx-2 flex flex-wrap" }, [_vm.recordsLoaded ? [_c("RecordCard", { attrs: { "color": "#63b3ed", "text-color": "text-blue-400", "border-color": "border-blue-400", "record": _vm.records.kda, "title": "KDA" } }), _c("RecordCard", { attrs: { "color": "#68D391", "text-color": "text-green-400", "border-color": "border-green-400", "record": _vm.records.kills, "title": "Kills" } }), _c("RecordCard", { attrs: { "color": "#9F7AEA", "text-color": "text-purple-500", "border-color": "border-purple-500", "record": _vm.records.assists, "title": "Assists" } }), _c("RecordCard", { attrs: { "color": "#F56565", "text-color": "text-red-500", "border-color": "border-red-500", "record": _vm.records.deaths, "title": "Deaths" } }), _c("RecordCard", { attrs: { "color": "#D69E2E", "text-color": "text-yellow-600", "border-color": "border-yellow-600", "record": _vm.records.gold, "title": "Gold earned" } }), _c("RecordCard", { attrs: { "color": "#81E6D9", "text-color": "text-teal-300", "border-color": "border-teal-300", "record": _vm.records.minions, "title": "Minions killed" } })] : _vm._l(6, function(index) {
    return _c("div", { key: index, staticClass: "mx-2 mt-6", staticStyle: { "width": "176px", "height": "294px" } }, [_c("content-loader", { attrs: { "height": 294, "width": 176, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "0", "y": "0", "rx": "8", "ry": "8", "width": "176", "height": "294" } })])], 1);
  })], 2), _c("div", { staticClass: "blue-900 category relative mt-3 border-b-2 border-blue-800 pl-6 text-2xl text-blue-200" }, [_vm._v(" Game impact ")]), _c("div", { staticClass: "-mx-2 flex flex-wrap" }, [_vm.recordsLoaded ? [_c("RecordCard", { attrs: { "color": "#FC8181", "text-color": "text-red-400", "border-color": "border-red-400", "record": _vm.records.damage_dealt_champions, "title": "Damage champions" } }), _c("RecordCard", { attrs: { "color": "#D69E2E", "text-color": "text-yellow-400", "border-color": "border-yellow-400", "record": _vm.records.damage_dealt_objectives, "title": "Damage objectives" } }), _c("RecordCard", { attrs: { "color": "#FC8181", "text-color": "text-red-400", "border-color": "border-red-400", "record": _vm.records.damage_taken, "title": "Damage taken" } }), _vm.records.maxTowers ? _c("RecordCard", { attrs: { "color": "#D69E2E", "text-color": "text-yellow-400", "border-color": "border-yellow-400", "record": _vm.records.turret_kills, "title": "Towers" } }) : _vm._e(), _c("RecordCard", { attrs: { "color": "#68D391", "text-color": "text-green-400", "border-color": "border-green-400", "record": _vm.records.kp, "title": "Kill participation" } }), _c("RecordCard", { attrs: { "color": "#D69E2E", "text-color": "text-yellow-400", "border-color": "border-yellow-400", "record": _vm.records.vision_score, "title": "Vision score" } })] : _vm._l(6, function(index) {
    return _c("div", { key: index, staticClass: "mx-2 mt-6", staticStyle: { "width": "176px", "height": "294px" } }, [_c("content-loader", { attrs: { "height": 294, "width": 176, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "0", "y": "0", "rx": "8", "ry": "8", "width": "176", "height": "294" } })])], 1);
  })], 2), _c("div", { staticClass: "category relative mt-3 border-b-2 border-blue-800 pl-6 text-2xl text-blue-200" }, [_vm._v(" Miscellaneous ")]), _c("div", { staticClass: "-mx-2 flex flex-wrap" }, [_vm.recordsLoaded ? [_c("RecordCard", { attrs: { "color": "#4299E1", "text-color": "text-blue-500", "border-color": "border-blue-500", "record": _vm.records.game_duration, "title": "Longest game" } }), _c("RecordCard", { attrs: { "color": "#4299E1", "text-color": "text-blue-500", "border-color": "border-blue-500", "record": _vm.records.time_spent_living, "title": "Longest living" } }), _c("RecordCard", { attrs: { "color": "#D69E2E", "text-color": "text-yellow-400", "border-color": "border-yellow-400", "record": _vm.records.critical_strike, "title": "Critical Strike" } }), _c("RecordCard", { attrs: { "color": "#68D391", "text-color": "text-green-400", "border-color": "border-green-400", "record": _vm.records.heal, "title": "Heal" } })] : _vm._l(4, function(index) {
    return _c("div", { key: index, staticClass: "mx-2 mt-6", staticStyle: { "width": "176px", "height": "294px" } }, [_c("content-loader", { attrs: { "height": 294, "width": 176, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "0", "y": "0", "rx": "8", "ry": "8", "width": "176", "height": "294" } })])], 1);
  })], 2), _c("div", { staticClass: "category relative mt-3 border-b-2 border-blue-800 pl-6 text-2xl text-blue-200" }, [_vm._v(" Multi kills ")]), _c("div", { staticClass: "-mx-2 flex flex-wrap" }, [_vm.recordsLoaded ? [_c("RecordCard", { attrs: { "color": "#FEFCBF", "text-color": "text-yellow-200", "border-color": "border-yellow-200", "record": _vm.records.double_kills, "title": "Double kills" } }), _c("RecordCard", { attrs: { "color": "#F6E05E", "text-color": "text-yellow-400", "border-color": "border-yellow-400", "record": _vm.records.triple_kills, "title": "Triple kills" } }), _c("RecordCard", { attrs: { "color": "#D69E2E", "text-color": "text-yellow-600", "border-color": "border-yellow-600", "record": _vm.records.quadra_kills, "title": "Quadra kills" } }), _c("RecordCard", { attrs: { "color": "#F56565", "text-color": "text-red-500", "border-color": "border-red-500", "record": _vm.records.penta_kills, "title": "Penta kills" } }), _c("RecordCard", { attrs: { "color": "#63b3ed", "text-color": "text-blue-400", "border-color": "border-blue-400", "record": _vm.records.killing_spree, "title": "Killing Spree" } })] : _vm._l(5, function(index) {
    return _c("div", { key: index, staticClass: "mx-2 mt-6", staticStyle: { "width": "176px", "height": "294px" } }, [_c("content-loader", { attrs: { "height": 294, "width": 176, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "0", "y": "0", "rx": "8", "ry": "8", "width": "176", "height": "294" } })])], 1);
  })], 2)] : _vm._e(), _vm.recordsLoaded && !_vm.records.assists ? [_vm._m(0)] : _vm._e()], 2);
};
var _sfc_staticRenderFns = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-4 flex flex-col items-center" }, [_c("div", [_vm._v("No records have been found.")]), _c("div", [_vm._v("😕")])]);
}];
var __component__ = /* @__PURE__ */ normalizeComponent(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "f52361bb",
  null,
  null
);
const SummonerRecords = __component__.exports;
export {
  SummonerRecords as default
};
