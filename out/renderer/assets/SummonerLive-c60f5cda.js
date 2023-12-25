import { C as ContentLoader, m as mapState, d as getPrimarRune, e as getSecondaryRune, a as mapActions, n as normalizeComponent, b as mapGetters } from "./index-a1b34cfc.js";
import { l as liveGame } from "./liveGame-298aec0b.js";
const LiveTeam_vue_vue_type_style_index_0_scoped_b9422ab8_lang = "";
const _sfc_main$1 = {
  components: {
    ContentLoader
  },
  props: {
    team: {
      type: Array,
      required: true
    },
    ally: {
      type: Boolean,
      default: true
    },
    gamemode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      clashGameBanOrder: {
        100: [1, 3, 5, 8, 10],
        200: [2, 4, 6, 7, 9]
      },
      customGameBanOrder: {
        100: [1, 3, 5, 2, 4],
        200: [2, 4, 6, 1, 3]
      }
    };
  },
  computed: {
    isClash() {
      return this.gamemode === "CLASH";
    },
    isCustom() {
      return this.gamemode === "Custom Game";
    },
    ...mapState({
      account: (state) => state.summoner.basic.account,
      live: (state) => state.summoner.live.match,
      liveLoaded: (state) => state.summoner.live.liveLoaded
    })
  },
  methods: {
    banChamp(index, teamId) {
      if (teamId === 200 && !this.isCustom && !this.isClash) {
        index += 5;
      }
      let toFind = index + 1;
      if (this.isClash) {
        toFind = this.clashGameBanOrder[teamId][index];
      } else if (this.isCustom) {
        toFind = this.customGameBanOrder[teamId][index];
      }
      return this.live.bannedChampions.find((b) => b.pickTurn === toFind && b.teamId === teamId);
    },
    borderChampion(id) {
      if (id === this.account.id) {
        return "border-yellow-500";
      }
      return this.ally ? "border-teal-400" : "border-red-400";
    },
    getCSSVars(championId) {
      return {
        "--bg-img": `linear-gradient(90deg, rgba(42, 67, 101, 0.3) 0%, rgba(42, 67, 101, 0.8) 40%, rgba(42, 67, 101, 1) 100%),
            url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${championId}000.jpg')`
      };
    },
    selectRunes(player) {
      if (!player.perks)
        return;
      this.displayRunes(player.perks);
    },
    getPrimarRune,
    getSecondaryRune,
    ...mapActions("cdragon", ["displayRunes"])
  }
};
var _sfc_render$1 = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-2 rounded-lg bg-blue-800 px-5 py-4" }, [_c("table", { staticClass: "w-full table-fixed text-center leading-none", staticStyle: { "border-collapse": "separate", "border-spacing": "0 0.5rem" } }, [_c("thead", [_c("tr", { staticClass: "text-left" }, [_c("th", { staticClass: "w-team font-semibold", class: [_vm.ally ? "text-teal-400 " : "text-red-400 "] }, [_vm._v(" " + _vm._s(_vm.ally ? "Ally" : "Enemy") + " Team ")]), _c("th", { staticClass: "w-ranked text-sm font-normal text-blue-200" }, [_vm._v("SoloQ Stats")]), _c("th", { staticClass: "w-ranked text-sm font-normal text-blue-200" }, [_vm._v("Flex Stats")]), _c("th", { staticClass: "w-bans px-2 text-right text-sm font-normal text-blue-200" }, [_vm._v("Bans")])])]), _vm.liveLoaded ? _c("tbody", _vm._l(_vm.team, function(player, index) {
    return _c("tr", { key: player.summonerId, staticClass: "live-team-row relative", style: _vm.getCSSVars(player.championId) }, [_c("td", { staticClass: "rounded-l-lg py-1 pl-2" }, [_c("div", { staticClass: "flex items-center" }, [player.perks ? _c("div", { staticClass: "runes flex flex-col items-center", class: { "cursor-pointer": player.perks }, on: { "click": function($event) {
      return _vm.selectRunes(player);
    } } }, [_c("div", { staticClass: "h-6 w-6 bg-cover bg-center", style: { backgroundImage: `url('${_vm.getPrimarRune(player.perks)}')` } }), _c("div", { staticClass: "mt-1 h-3 w-3 bg-cover bg-center", style: { backgroundImage: `url('${_vm.getSecondaryRune(player.perks)}')` } })]) : _c("div", { staticClass: "w-6" }), _c("div", { staticClass: "relative ml-2 h-12 w-12 rounded-full border-2 bg-blue-1000 bg-cover bg-center", class: _vm.borderChampion(player.summonerId), style: {
      backgroundImage: `url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${player.championId}.png')`
    } }, [player.role && player.role !== "NONE" ? _c("div", { staticClass: "absolute rounded-full border bg-blue-1000 p-0.5", class: _vm.borderChampion(player.summonerId), staticStyle: { "bottom": "-5px", "right": "-5px" } }, [_c("div", { staticClass: "h-4 w-4 bg-cover bg-center", style: { backgroundImage: `url(${"/img/roles/" + player.role + ".png"})` } })]) : _vm._e()]), _c("div", { staticClass: "ml-2 flex flex-col" }, [_c("div", { staticClass: "h-4 w-4 rounded-md bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url(${player.summonerSpell1.icon})` } }), _c("div", { staticClass: "mt-1 h-4 w-4 rounded-md bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url(${player.summonerSpell2.icon})` } })]), _c("div", { staticClass: "ml-3 text-left text-sm leading-tight" }, [!player.bot ? _c("router-link", { staticClass: "font-semibold", class: [
      player.summonerId === _vm.account.id ? "text-yellow-500" : "hover:text-blue-200"
    ], attrs: { "to": {
      name: "summoner",
      params: { region: _vm.$route.params.region, name: player.summonerName }
    } } }, [_vm._v(_vm._s(player.summonerName))]) : _vm._e(), _c("div", { staticClass: "text-xs", class: [_vm.ally ? "text-teal-300 " : "text-red-400 "] }, [_vm._v(" " + _vm._s(player.champion.name) + " ")])], 1)])]), _c("td", { staticClass: "py-1 text-left" }, [_c("div", { staticClass: "px-2" }, [player.rank.soloQ ? _c("div", { staticClass: "flex items-center" }, [_c("div", { staticClass: "inline-block text-center" }, [_c("svg", { staticClass: "h-5 w-5" }, [_c("use", { attrs: { "xlink:href": `#rank-${player.rank.soloQ.tier.toLowerCase()}` } })]), _c("div", { staticClass: "mt-0.5 text-xs font-semibold text-blue-300" }, [_vm._v(" " + _vm._s(player.rank.soloQ.shortName) + " ")])]), _c("div", { staticClass: "ml-5 text-center" }, [_c("div", { staticClass: "font-semibold" }, [_vm._v(_vm._s(player.rank.soloQ.winrate))]), _c("div", { staticClass: "mt-1 text-xs text-blue-300" }, [_vm._v(" " + _vm._s(player.rank.soloQ.wins + player.rank.soloQ.losses) + " games ")])])]) : _c("div", { staticClass: "h-5 w-5" }, [_c("div", { staticClass: "-mt-1 text-2xl text-blue-300" }, [_vm._v("-")])])])]), _c("td", { staticClass: "py-1 text-left" }, [_c("div", { staticClass: "px-2" }, [player.rank.flex5v5 ? _c("div", { staticClass: "flex items-center" }, [_c("div", { staticClass: "inline-block text-center" }, [_c("svg", { staticClass: "h-5 w-5" }, [_c("use", { attrs: { "xlink:href": `#rank-${player.rank.flex5v5.tier.toLowerCase()}` } })]), _c("div", { staticClass: "mt-0.5 text-xs font-semibold text-blue-300" }, [_vm._v(" " + _vm._s(player.rank.flex5v5.shortName) + " ")])]), _c("div", { staticClass: "ml-5 text-center" }, [_c("div", { staticClass: "font-semibold" }, [_vm._v(_vm._s(player.rank.flex5v5.winrate))]), _c("div", { staticClass: "mt-1 text-xs text-blue-300" }, [_vm._v(" " + _vm._s(player.rank.flex5v5.wins + player.rank.flex5v5.losses) + " games ")])])]) : _c("div", { staticClass: "h-5 w-5" }, [_c("div", { staticClass: "-mt-1 text-2xl text-blue-300" }, [_vm._v("-")])])])]), _c("td", { staticClass: "rounded-r-lg py-1 text-right" }, [_c("div", { staticClass: "inline-block px-2" }, [_vm.live.bannedChampions.length ? _c("div", { staticClass: "ban relative rounded-full border-2", class: [_vm.ally ? "ban-blue border-teal-500" : "ban-red border-red-500"] }, [_c("div", { staticClass: "ban-img h-6 w-6 rounded-full bg-blue-1000 bg-cover bg-center", style: [
      _vm.banChamp(index, player.teamId) ? {
        backgroundImage: `url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${_vm.banChamp(index, player.teamId).championId}.png')`
      } : ""
    ] }), _c("div", { staticClass: "ban-order absolute flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold", class: [_vm.ally ? "bg-teal-500 text-teal-100" : "bg-red-500 text-red-100"] }, [_vm._v(" " + _vm._s(_vm.banChamp(index, player.teamId).pickTurn) + " ")])]) : _c("div", { staticClass: "h-5 w-5 text-left" }, [_c("div", { staticClass: "text-2xl text-blue-300" }, [_vm._v("-")])])])])]);
  }), 0) : _c("tbody", _vm._l(5, function(index) {
    return _c("tr", { key: index }, [_c("td", { staticClass: "rounded-lg bg-blue-760", attrs: { "colspan": "4" } }, [_c("content-loader", { attrs: { "height": 54, "width": 1160, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "12", "y": "12", "rx": "3", "ry": "3", "width": "14", "height": "14" } }), _c("rect", { attrs: { "x": "12", "y": "32", "rx": "3", "ry": "3", "width": "14", "height": "14" } }), _c("circle", { attrs: { "cx": "64", "cy": "28", "r": "24" } }), _c("rect", { attrs: { "x": "96", "y": "10", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "96", "y": "31", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "124", "y": "32", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "124", "y": "13", "rx": "3", "ry": "3", "width": "70", "height": "14" } }), _c("rect", { attrs: { "x": "640", "y": "35", "rx": "3", "ry": "3", "width": "40", "height": "10" } }), _c("rect", { attrs: { "x": "691", "y": "33", "rx": "3", "ry": "3", "width": "55", "height": "10" } }), _c("rect", { attrs: { "x": "647", "y": "8", "rx": "3", "ry": "3", "width": "25", "height": "20" } }), _c("rect", { attrs: { "x": "696", "y": "12", "rx": "3", "ry": "3", "width": "41", "height": "15" } }), _c("rect", { attrs: { "x": "860", "y": "35", "rx": "3", "ry": "3", "width": "40", "height": "10" } }), _c("rect", { attrs: { "x": "911", "y": "33", "rx": "3", "ry": "3", "width": "55", "height": "10" } }), _c("rect", { attrs: { "x": "867", "y": "8", "rx": "3", "ry": "3", "width": "25", "height": "20" } }), _c("rect", { attrs: { "x": "916", "y": "12", "rx": "3", "ry": "3", "width": "41", "height": "15" } }), _c("circle", { attrs: { "cx": "1137", "cy": "27", "r": "14" } })])], 1)]);
  }), 0)])]);
};
var _sfc_staticRenderFns$1 = [];
var __component__$1 = /* @__PURE__ */ normalizeComponent(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  "b9422ab8",
  null,
  null
);
const LiveTeam = __component__$1.exports;
const _sfc_main = {
  components: {
    LiveTeam
  },
  mixins: [liveGame],
  computed: {
    ...mapGetters("summoner", ["summonerLoading", "summonerFound"]),
    ...mapState({
      live: (state) => state.summoner.live.match,
      liveLoaded: (state) => state.summoner.live.liveLoaded,
      playing: (state) => state.summoner.live.playing
    }),
    console: () => console
  },
  watch: {
    summonerFound() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
    this.getRunes();
  },
  methods: {
    fetchData() {
      if (this.playing && !this.liveLoaded && this.summonerFound) {
        this.liveMatchRequest();
      }
    },
    ...mapActions("cdragon", ["getRunes"]),
    ...mapActions("summoner", ["liveMatchRequest"])
  },
  metaInfo() {
    return {
      title: "Summoner Live Game"
    };
  }
};
var _sfc_render = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { key: "live-game" }, [_vm.playing || _vm.summonerLoading ? _c("div", [_vm.liveLoaded ? _c("div", { staticClass: "-mt-4 flex items-center justify-end text-base text-blue-200" }, [_c("div", [_vm._v(_vm._s(_vm.gamemode.type) + " " + _vm._s(_vm.gamemode.name))]), _c("div", { staticClass: "mx-2" }, [_vm._v("-")]), _c("div", { class: { "w-12": _vm.displayStartTime !== "Not started yet" } }, [_vm._v(" " + _vm._s(_vm.displayStartTime) + " ")]), _c("button", { staticClass: "ml-4 rounded-md bg-blue-800 px-3 py-1 text-blue-100 shadow-md hover:bg-blue-760", on: { "click": _vm.liveMatchRequest } }, [_vm._v(" Reload ")])]) : _c("div", { staticClass: "h-4" }), _c("LiveTeam", { attrs: { "team": _vm.allyTeam, "ally": true, "gamemode": _vm.gamemode.name } }), _c("LiveTeam", { staticClass: "mt-4", attrs: { "team": _vm.enemyTeam, "ally": false, "gamemode": _vm.gamemode.name } })], 1) : _c("div", [_c("div", { staticClass: "mt-16 flex justify-center" }, [_c("div", { staticClass: "bg-gradient rounded-lg px-4 py-3 text-center text-lg font-bold text-blue-100" }, [_c("div", [_vm._v("his summoner is not in game.")]), _c("div", { staticClass: "mt-2" }, [_vm._v("🕊")]), _c("button", { staticClass: "my-4 rounded-md bg-blue-800 px-3 py-1 text-sm text-blue-100 shadow-md hover:bg-blue-760", on: { "click": _vm.liveMatchRequest } }, [_vm._v(" Reload ")])])])])]);
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
const SummonerLive = __component__.exports;
export {
  SummonerLive as default
};
