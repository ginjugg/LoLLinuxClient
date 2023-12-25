import { n as normalizeComponent, C as ContentLoader, c as colors, t as timeDifference, a as mapActions, T as Tooltip, g as gameModes, b as mapGetters, m as mapState } from "./index-a1b34cfc.js";
import { R as Ripple } from "./Ripple-31b574bb.js";
const ChampionsSearch_vue_vue_type_style_index_0_scoped_620fd673_lang = "";
const _sfc_main$4 = {
  components: {
    Ripple
  },
  data() {
    return {
      championName: ""
    };
  },
  methods: {
    search() {
      this.$emit("search-champions", this.championName);
    }
  }
};
var _sfc_render$4 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("Ripple", { staticClass: "relative inline-block rounded-lg", attrs: { "color": "rgba(43, 108, 176, 0.7)" } }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.championName, expression: "championName" }], staticClass: "input-color rounded-lg px-2 py-2 pl-10 outline-none focus:bg-blue-1000", attrs: { "type": "text", "placeholder": "Search Champions" }, domProps: { "value": _vm.championName }, on: { "input": [function($event) {
    if ($event.target.composing)
      return;
    _vm.championName = $event.target.value;
  }, _vm.search] } }), _c("svg", { staticClass: "vertical-center absolute left-0 ml-3 h-4 w-4" }, [_c("use", { attrs: { "xlink:href": "#search" } })])]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  "620fd673",
  null,
  null
);
const ChampionsSearch = __component__$4.exports;
const ChampionsTable_vue_vue_type_style_index_0_scoped_1c7c505c_lang = "";
const _sfc_main$3 = {
  components: {
    ContentLoader
  },
  props: {
    champions: {
      type: Array,
      required: true
    },
    onlyMostPlayed: {
      type: Boolean,
      default: false
    },
    search: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      headings: [
        {
          name: "Name",
          props: "champion.name"
        },
        {
          name: "Win <br> rate",
          props: "winrate"
        },
        {
          name: "Play <br> rate",
          props: "playrate"
        },
        {
          name: "Wins",
          props: "wins"
        },
        {
          name: "Plays",
          props: "count"
        },
        {
          name: "KDA",
          props: "kda"
        },
        {
          name: "KP",
          props: "kp"
        },
        {
          name: "Minions",
          props: "minions"
        },
        {
          name: "Gold",
          props: "gold"
        },
        {
          name: "Dmg <br> champ",
          props: "dmgChamp"
        },
        {
          name: "Dmg <br> taken",
          props: "dmgTaken"
        },
        {
          name: "Game <br> length",
          props: "gameLength"
        },
        {
          name: "Last <br> played",
          props: "date"
        }
      ],
      championsFull: [],
      sortProps: "index",
      order: -1
    };
  },
  computed: {
    championsToDisplay() {
      return this.championsFull.filter((c) => {
        const playedEnough = this.onlyMostPlayed ? c.playrate >= 1 : true;
        const searched = c.champion.name.toLowerCase().includes(this.search.toLowerCase());
        return playedEnough && searched;
      });
    },
    totalGames() {
      return this.champions.reduce((agg, champ) => agg + champ.count, 0);
    }
  },
  watch: {
    champions() {
      this.updateChampionsList();
    },
    championsToDisplay() {
      this.reApplySorts();
    }
  },
  created() {
    this.updateChampionsList();
  },
  methods: {
    bgColor(champion, stats) {
      const biggestValue = Math.max(
        ...this.championsToDisplay.filter((c) => c[stats] !== Infinity).map((c) => parseFloat(c[stats])),
        0
      );
      const value = champion[stats] === Infinity ? biggestValue : parseFloat(champion[stats]);
      const opacity = (value / biggestValue).toFixed(2);
      return {
        backgroundColor: `rgba(${colors[stats]}, ${opacity})`
      };
    },
    sortBy(props) {
      if (props === this.sortProps) {
        this.order *= -1;
      } else {
        this.order = -1;
      }
      this.championsToDisplay.sort((a, b) => {
        const aProp = props.split(".").reduce((p, c) => p && p[c], a);
        const bProp = props.split(".").reduce((p, c) => p && p[c], b);
        let order = typeof aProp === "string" ? aProp.localeCompare(bProp) : aProp - bProp;
        if (this.order == -1)
          order *= -1;
        if (props === "index" || props === "champion.name") {
          order *= -1;
        }
        return order || a.champion.name.localeCompare(b.champion.name);
      });
      this.sortProps = props;
    },
    reApplySorts() {
      this.order *= -1;
      this.sortBy(this.sortProps);
    },
    sortedClasses(props) {
      return {
        "sorted": this.sortProps === props,
        "sorted-asc": this.sortProps === props && this.order === 1,
        "sorted-desc": this.sortProps === props && this.order === -1
      };
    },
    updateChampionsList() {
      this.championsFull = this.champions.map((champ, index) => {
        let kda = champ.kills === 0 && champ.assists === 0 && champ.deaths === 0 ? 0 : (champ.kills + champ.assists) / champ.deaths;
        return {
          ...champ,
          winrate: champ.wins * 100 / champ.count,
          playrate: champ.count * 100 / this.totalGames,
          kda,
          index,
          lastPlayed: timeDifference(champ.date),
          show: true
        };
      });
    }
  }
};
var _sfc_render$3 = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "w-full table-fixed rounded-lg bg-blue-800 text-center leading-none" }, [_c("thead", [_c("tr", { staticClass: "heading select-none rounded-t-lg text-sm" }, [_c("th", { staticClass: "relative cursor-pointer rounded-tl-lg px-2 py-4 font-normal hover:bg-blue-700", class: _vm.sortedClasses("index"), on: { "click": function($event) {
    return _vm.sortBy("index");
  } } }, [_vm._v(" rank ")]), _vm._l(_vm.headings, function(heading, index) {
    return _c("th", { key: `champHeading-${index}`, staticClass: "relative cursor-pointer px-2 py-4 font-normal hover:bg-blue-700", class: [
      {
        "rounded-tr-lg": index === _vm.headings.length - 1,
        "w-name": heading.name === "Name",
        "w-kda": heading.name === "KDA"
      },
      _vm.sortedClasses(heading.props)
    ], domProps: { "innerHTML": _vm._s(heading.name) }, on: { "click": function($event) {
      return _vm.sortBy(heading.props);
    } } });
  })], 2)]), _vm.champions.length ? _c("tbody", { staticClass: "bg-blue-760" }, _vm._l(_vm.championsToDisplay, function(champion, index) {
    return _c("tr", { key: champion._id, class: { "rounded-b-lg": index === _vm.championsToDisplay.length - 1 } }, [_c("td", { staticClass: "border-t-table relative bg-blue-800 px-2 py-3 text-sm text-white", class: { "rounded-bl-lg": index === _vm.championsToDisplay.length - 1 } }, [_vm._v(" " + _vm._s(champion.index + 1) + " ")]), _c("td", { staticClass: "border-t-table relative bg-blue-800 px-2 py-3 text-sm text-white" }, [_c("div", { staticClass: "flex items-center" }, [_c("div", { staticClass: "h-6 w-6 flex-shrink-0 rounded-full bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url('${champion.champion.icon}')` } }), _c("div", { staticClass: "ml-2" }, [_vm._v(_vm._s(champion.champion.name))])])]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "winrate") }, [_vm._v(" " + _vm._s(_vm._f("percent")(champion.winrate)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "playrate") }, [_vm._v(" " + _vm._s(_vm._f("percent")(champion.playrate)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "wins") }, [_vm._v(" " + _vm._s(champion.wins) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "count") }, [_vm._v(" " + _vm._s(champion.count) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "kda") }, [_c("div", [_vm._v(_vm._s(_vm._f("round")(champion.kda)))]), _c("div", { staticClass: "mt-1 whitespace-nowrap text-xxs text-blue-200" }, [_vm._v(" " + _vm._s(_vm._f("round")(champion.kills / champion.count, 1)) + " / " + _vm._s(_vm._f("round")(champion.deaths / champion.count, 1)) + " / " + _vm._s(_vm._f("round")(champion.assists / champion.count, 1)) + " ")])]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "kp") }, [_vm._v(" " + _vm._s(_vm._f("percent")(champion.kp)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "minions") }, [_vm._v(" " + _vm._s(_vm._f("round")(champion.minions, 0)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "gold") }, [_vm._v(" " + _vm._s(_vm._f("kilo")(champion.gold)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "dmgChamp") }, [_vm._v(" " + _vm._s(_vm._f("kilo")(champion.dmgChamp)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "dmgTaken") }, [_vm._v(" " + _vm._s(_vm._f("kilo")(champion.dmgTaken)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-sm text-white", style: _vm.bgColor(champion, "gameLength") }, [_vm._v(" " + _vm._s(_vm._f("secToTime")(champion.gameLength)) + " ")]), _c("td", { staticClass: "px-2 py-3 text-xs text-white", class: { "rounded-br-lg": index === _vm.championsToDisplay.length - 1 } }, [_vm._v(" " + _vm._s(champion.lastPlayed) + " ")])]);
  }), 0) : _c("tbody", _vm._l(11, function(index) {
    return _c("tr", { key: index }, [_c("td", { attrs: { "colspan": "14" } }, [_c("content-loader", { attrs: { "height": 50, "width": 1200, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "31", "y": "16", "rx": "3", "ry": "3", "width": "20", "height": "20" } }), _c("circle", { attrs: { "cx": "101", "cy": "26", "r": "12" } }), _c("rect", { attrs: { "x": "119", "y": "16", "rx": "3", "ry": "3", "width": "50", "height": "20" } }), _c("rect", { attrs: { "x": "234.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "316.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "398.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "480.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "565", "y": "14", "rx": "3", "ry": "3", "width": "40", "height": "10" } }), _c("rect", { attrs: { "x": "558", "y": "30", "rx": "3", "ry": "3", "width": "55", "height": "10" } }), _c("rect", { attrs: { "x": "644.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "726.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "808.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "890.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "972.5", "y": "16", "rx": "3", "ry": "3", "width": "45", "height": "20" } }), _c("rect", { attrs: { "x": "1052", "y": "16", "rx": "3", "ry": "3", "width": "50", "height": "20" } }), _c("rect", { attrs: { "x": "1129", "y": "16", "rx": "3", "ry": "3", "width": "60", "height": "20" } })])], 1)]);
  }), 0)]);
};
var _sfc_staticRenderFns$3 = [];
var __component__$3 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  "1c7c505c",
  null,
  null
);
const ChampionsTable = __component__$3.exports;
const _sfc_main$2 = {
  props: {
    choices: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      queue: ""
    };
  },
  created() {
    this.queue = 0;
  },
  destroyed() {
    if (this.queue !== 0)
      this.championsNotLoaded();
  },
  methods: {
    filterQueue() {
      this.$emit("filter-queue", this.queue);
    },
    ...mapActions("summoner", ["championsNotLoaded"])
  }
};
var _sfc_render$2 = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "relative inline-block text-white" }, [_c("select", { directives: [{ name: "model", rawName: "v-model", value: _vm.queue, expression: "queue" }], staticClass: "block w-full cursor-pointer appearance-none rounded-md bg-blue-800 px-4 py-2 pr-8 font-semibold capitalize hover:bg-blue-700 focus:outline-none", staticStyle: { "width": "144px" }, on: { "change": [function($event) {
    var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
      return o.selected;
    }).map(function(o) {
      var val = "_value" in o ? o._value : o.value;
      return val;
    });
    _vm.queue = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
  }, _vm.filterQueue] } }, _vm._l(Object.keys(_vm.choices), function(key) {
    return _c("option", { key, domProps: { "value": key } }, [_vm._v(" " + _vm._s(_vm.choices[key].name) + " ")]);
  }), 0), _c("div", { staticClass: "pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700" }, [_c("svg", { staticClass: "h-5 w-5 text-white" }, [_c("use", { attrs: { "xlink:href": "#chevron-down" } })])])]);
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
const FilterQueue = __component__$2.exports;
const _sfc_main$1 = {
  components: {
    Tooltip
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    change(e) {
      this.$emit("input", e.target.checked);
    }
  }
};
var _sfc_render$1 = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex items-center space-x-2 text-base" }, [_c("input", { staticClass: "form-checkbox", attrs: { "id": "onlyMostPlayed", "type": "checkbox" }, domProps: { "checked": _vm.value }, on: { "change": _vm.change } }), _c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
    return [_c("label", { staticClass: "cursor-pointer select-none", attrs: { "for": "onlyMostPlayed" } }, [_vm._v("Only most played")])];
  }, proxy: true }, { key: "default", fn: function() {
    return [_c("div", { staticClass: "px-2 text-center text-xs text-white" }, [_vm._v(" Hide champions with less than "), _c("br"), _c("span", { staticClass: "font-bold text-teal-400" }, [_vm._v("1% playrate")]), _vm._v(" to be able to compare "), _c("br"), _vm._v("statistics more easily. ")])];
  }, proxy: true }]) })], 1);
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
const OnlyMostPlayed = __component__$1.exports;
const _sfc_main = {
  components: {
    ChampionsSearch,
    ChampionsTable,
    FilterQueue,
    OnlyMostPlayed
  },
  data() {
    return {
      onlyMostPlayed: false,
      queue: null,
      searchChampions: ""
    };
  },
  computed: {
    queues() {
      const queues = Object.keys(gameModes).filter(
        (gameMode) => gameModes[gameMode].type !== "Bot" && this.gamemodes.includes(Number(gameMode))
      ).reduce((obj, key) => {
        return {
          ...obj,
          [key]: gameModes[key]
        };
      }, {});
      return { 0: { type: "Normal", name: "All queues" }, ...queues };
    },
    ...mapGetters("summoner", ["summonerFound"]),
    ...mapState({
      champions: (state) => state.summoner.champions.list,
      championsLoaded: (state) => state.summoner.champions.championsLoaded,
      gamemodes: (state) => state.summoner.basic.gamemodes
    })
  },
  watch: {
    championsLoaded() {
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
      if (!this.championsLoaded && this.summonerFound) {
        this.championsRequest(this.queue);
      }
    },
    filterByQueue(queue) {
      queue = Number(queue);
      this.queue = queue === 0 ? null : queue;
      this.championsRequest(this.queue);
    },
    updateSearch(search) {
      this.searchChampions = search;
    },
    ...mapActions("summoner", ["championsRequest"])
  },
  metaInfo() {
    return {
      title: "Summoner Champions"
    };
  }
};
var _sfc_render = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { key: "champions", staticClass: "mt-3" }, [_c("div", { staticClass: "flex items-center space-x-4" }, [_c("ChampionsSearch", { on: { "search-champions": _vm.updateSearch } }), _c("FilterQueue", { attrs: { "choices": _vm.queues }, on: { "filter-queue": _vm.filterByQueue } }), _c("OnlyMostPlayed", { model: { value: _vm.onlyMostPlayed, callback: function($$v) {
    _vm.onlyMostPlayed = $$v;
  }, expression: "onlyMostPlayed" } })], 1), _c("ChampionsTable", { staticClass: "mt-6", attrs: { "champions": _vm.champions, "search": _vm.searchChampions, "only-most-played": _vm.onlyMostPlayed } })], 1);
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
const SummonerChampions = __component__.exports;
export {
  SummonerChampions as default
};
