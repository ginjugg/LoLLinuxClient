import { n as normalizeComponent$1, T as Tooltip, m as mapState, c as colors, a as mapActions, b as mapGetters, C as ContentLoader, g as gameModes } from "./index-a1b34cfc.js";
import { l as liveGame } from "./liveGame-298aec0b.js";
import { R as Ripple } from "./Ripple-31b574bb.js";
const LiveMatch_vue_vue_type_style_index_0_scoped_691b7c1e_lang = "";
const _sfc_main$e = {
  mixins: [liveGame]
};
var _sfc_render$e = function render() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "ml-4 flex overflow-hidden rounded-lg text-sm" }, [_c("div", { staticClass: "relative flex w-full justify-between overflow-hidden rounded-lg bg-blue-800" }, [_c("div", { staticClass: "horizontal-center absolute flex h-full flex-col items-center justify-between" }, [_c("div", { staticClass: "text-base leading-loose text-blue-200" }, [_vm._v(_vm._s(_vm.gamemode.name))]), _vm._m(0), _c("div", { staticClass: "pb-2 text-blue-200", class: { "w-10": _vm.displayStartTime !== "Not started yet" } }, [_vm._v(" " + _vm._s(_vm.displayStartTime) + " ")])]), _c("ul", { staticClass: "w-1/2 text-left" }, _vm._l(_vm.allyTeam, function(ally, index) {
    return _c("li", { key: ally.summonerId, staticClass: "flex items-center px-5 py-1 leading-loose", class: index % 2 === 0 ? "accent-ally" : "ally" }, [_c("div", { staticClass: "h-6 w-6 rounded-full bg-blue-1000 bg-cover bg-center", style: {
      backgroundImage: `url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${ally.championId}.png')`
    } }), !ally.bot ? _c("router-link", { staticClass: "relative ml-2 hover:text-white", class: [ally.summonerId === _vm.account.id ? "text-white" : "text-blue-200"], attrs: { "to": {
      name: "summoner",
      params: { region: _vm.$route.params.region, name: ally.summonerName }
    } } }, [_vm._v(_vm._s(ally.summonerName))]) : _vm._e()], 1);
  }), 0), _c("ul", { staticClass: "w-1/2 text-right" }, _vm._l(_vm.enemyTeam, function(enemy, index) {
    return _c("li", { key: enemy.summonerId, staticClass: "flex items-center justify-end px-5 py-1 leading-loose", class: index % 2 === 0 ? "accent-enemy" : "enemy" }, [!enemy.bot ? _c("router-link", { staticClass: "relative text-red-200 hover:text-white", attrs: { "to": {
      name: "summoner",
      params: { region: _vm.$route.params.region, name: enemy.summonerName }
    } } }, [_vm._v(_vm._s(enemy.summonerName))]) : _vm._e(), _c("div", { staticClass: "ml-2 h-6 w-6 rounded-full bg-blue-1000 bg-cover bg-center", style: {
      backgroundImage: `url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${enemy.championId}.png')`
    } })], 1);
  }), 0)]), _c("router-link", { staticClass: "live-game-link bg-gradient-x -ml-2 flex cursor-pointer items-center pl-6 pr-4 text-base text-blue-200 hover:bg-blue-800 hover:text-blue-100", attrs: { "to": {
    name: "summonerLive",
    params: { region: _vm.$route.params.region, name: _vm.$route.params.name }
  } } }, [_c("div", { staticClass: "-mt-0.5" }, [_vm._v("more")]), _c("svg", { staticClass: "ml-1 h-4 w-4 transform transition-transform duration-200 ease-in-out" }, [_c("use", { attrs: { "xlink:href": "#arrow-right" } })])])], 1);
};
var _sfc_staticRenderFns$e = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "vs flex flex-col text-2xl font-bold leading-none" }, [_c("span", [_vm._v("V")]), _c("span", { staticClass: "-mt-3 ml-4" }, [_vm._v("S")])]);
}];
var __component__$e = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$e,
  _sfc_render$e,
  _sfc_staticRenderFns$e,
  false,
  null,
  "691b7c1e",
  null,
  null
);
const LiveMatch = __component__$e.exports;
const LoadingButton_vue_vue_type_style_index_0_scoped_8fcfcf36_lang = "";
const _sfc_main$d = {
  props: {
    btnClass: {
      type: String,
      required: false,
      default: ""
    },
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    btnClicked() {
      this.$emit("clicked");
    }
  }
};
var _sfc_render$d = function render2() {
  var _vm = this, _c = _vm._self._c;
  return _c("button", { staticClass: "relative select-none", class: [_vm.btnClass, { loading: _vm.loading }, { "pr-12": _vm.loading }], attrs: { "disabled": _vm.loading, "type": "button" }, on: { "click": _vm.btnClicked } }, [_vm._t("default", function() {
    return [_vm._v("Send")];
  }), _vm._m(0)], 2);
};
var _sfc_staticRenderFns$d = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("span", { staticClass: "spinner absolute left-auto opacity-0" }, [_c("span", { staticClass: "absolute right-0 inline-block h-4 w-4 rounded-full border-[3px] border-white opacity-100" }), _c("span", { staticClass: "absolute right-0 inline-block h-4 w-4 rounded-full border-[3px] border-white opacity-100" }), _c("span", { staticClass: "absolute right-0 inline-block h-4 w-4 rounded-full border-[3px] border-white opacity-100" }), _c("span", { staticClass: "absolute right-0 inline-block h-4 w-4 rounded-full border-[3px] border-white opacity-100" })]);
}];
var __component__$d = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$d,
  _sfc_render$d,
  _sfc_staticRenderFns$d,
  false,
  null,
  "8fcfcf36",
  null,
  null
);
const LoadingButton = __component__$d.exports;
const CubeLoader_vue_vue_type_style_index_0_scoped_0b66301e_lang = "";
const _sfc_main$c = {
  props: {
    color: {
      type: String,
      default: "#bee3f8"
    },
    size: {
      type: String,
      default: "30px"
    },
    margin: {
      type: String,
      default: "0 auto"
    }
  }
};
var _sfc_render$c = function render3() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "relative", staticStyle: { "transform": "rotateZ(45deg)" }, style: { width: _vm.size, height: _vm.size, margin: _vm.margin } }, [_c("div", { staticClass: "cube-1 cube relative float-left h-1/2 w-1/2" }), _c("div", { staticClass: "cube-2 cube relative float-left h-1/2 w-1/2" }), _c("div", { staticClass: "cube-4 cube relative float-left h-1/2 w-1/2" }), _c("div", { staticClass: "cube-3 cube relative float-left h-1/2 w-1/2" })]);
};
var _sfc_staticRenderFns$c = [];
var __component__$c = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$c,
  _sfc_render$c,
  _sfc_staticRenderFns$c,
  false,
  null,
  "0b66301e",
  null,
  null
);
const CubeLoader = __component__$c.exports;
const _sfc_main$b = {
  components: {
    Tooltip
  },
  props: {
    team: {
      type: Object,
      required: true
    },
    allyTeam: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    textLightColor() {
      return this.allyTeam ? "text-teal-100" : "text-red-100";
    },
    textColor() {
      return this.allyTeam ? "text-teal-400" : "text-red-400";
    },
    bgColor() {
      return this.allyTeam ? "bg-teal-500" : "bg-red-500";
    }
  }
};
var _sfc_render$b = function render4() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { class: _vm.allyTeam ? "text-left" : "text-right" }, [_vm.team.bans ? _c("div", _vm._l(_vm.team.bans, function(ban) {
    return _c("Tooltip", { key: "ban-" + ban.pickTurn, staticClass: "inline-block", class: { "ml-2": ban.pickTurn !== 6 && ban.pickTurn !== 1 }, scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "ban relative cursor-pointer rounded-full border-2", class: [_vm.allyTeam ? "ban-blue border-teal-500" : "ban-red border-red-500"] }, [_c("div", { staticClass: "ban-img h-6 w-6 rounded-full bg-blue-1000 bg-cover bg-center", style: [ban.champion.id ? { backgroundImage: `url('${ban.champion.icon}')` } : ""] }), _c("div", { staticClass: "ban-order absolute flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold", class: [_vm.textLightColor, _vm.bgColor] }, [_vm._v(" " + _vm._s(ban.pickTurn) + " ")])])];
    }, proxy: true }, { key: "default", fn: function() {
      return [_c("div", { staticClass: "select-none px-2 text-center text-xs leading-tight text-white" }, [_c("div", [_vm._v(_vm._s(ban.champion.id ? ban.champion.name : "No ban"))])])];
    }, proxy: true }], null, true) });
  }), 1) : _vm._e(), _c("div", { staticClass: "mt-2 flex leading-tight", class: _vm.allyTeam ? "text-left" : "flex-row-reverse text-right" }, [_c("div", [_c("div", { staticClass: "text-sm font-medium", class: _vm.textColor }, [_vm._v(" " + _vm._s(`${_vm.team.teamStats.kills}/${_vm.team.teamStats.deaths}/${_vm.team.teamStats.assists}`) + " ")]), _c("div", { staticClass: "text-xs text-white" }, [_vm._v("K / D / A")])]), _c("div", { class: _vm.allyTeam ? "ml-3" : "mr-3" }, [_c("div", { staticClass: "text-sm font-medium", class: _vm.textColor }, [_vm._v(" " + _vm._s(+(_vm.team.teamStats.gold / 1e3).toFixed(1) + "k") + " ")]), _c("div", { staticClass: "text-xs text-white" }, [_vm._v("Gold")])]), _c("div", { class: _vm.allyTeam ? "ml-3" : "mr-3" }, [_c("div", { staticClass: "text-sm font-medium", class: _vm.textColor }, [_vm._v(" " + _vm._s(+(_vm.team.teamStats.dmgChamp / 1e3).toFixed(1) + "k") + " ")]), _c("div", { staticClass: "text-xs text-white" }, [_vm._v("Dmg")])]), _c("div", { staticClass: "flex flex-col justify-end", class: _vm.allyTeam ? "ml-3" : "mr-3" }, [_c("div", { staticClass: "text-sm font-medium text-teal-400" }), _c("div", { staticClass: "flex text-xs text-white" }, [_c("div", { class: _vm.allyTeam ? "" : "mr-2" }, [_c("span", { class: _vm.textColor }, [_vm._v(_vm._s(_vm.team.towers))]), _vm._v(" Towers ")]), _c("div", { class: _vm.allyTeam ? "ml-2" : "mr-2" }, [_c("span", { class: _vm.textColor }, [_vm._v(_vm._s(_vm.team.dragons))]), _vm._v(" Dragons ")]), _c("div", { class: _vm.allyTeam ? "ml-2" : "" }, [_c("span", { class: _vm.textColor }, [_vm._v(_vm._s(_vm.team.barons))]), _vm._v(" Barons ")])])])])]);
};
var _sfc_staticRenderFns$b = [];
var __component__$b = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$b,
  _sfc_render$b,
  _sfc_staticRenderFns$b,
  false,
  null,
  null,
  null,
  null
);
const DetailedMatchGlobalStats = __component__$b.exports;
const DotsLoader_vue_vue_type_style_index_0_scoped_737a3618_lang = "";
const _sfc_main$a = {
  props: {
    color: {
      type: String,
      default: "#90cdf4"
    },
    dotWidth: {
      type: String,
      default: "18px"
    },
    width: {
      type: String,
      default: "70px"
    }
  },
  computed: {
    dotStyle() {
      return {
        backgroundColor: this.color,
        height: this.dotWidth,
        width: this.dotWidth
      };
    }
  }
};
var _sfc_render$a = function render5() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "spinner text-center", style: { width: _vm.width } }, [_c("div", { staticClass: "bounce1 inline-block rounded-full", style: _vm.dotStyle }), _c("div", { staticClass: "bounce2 inline-block rounded-full", style: _vm.dotStyle }), _c("div", { staticClass: "bounce3 inline-block rounded-full", style: _vm.dotStyle })]);
};
var _sfc_staticRenderFns$a = [];
var __component__$a = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$a,
  _sfc_render$a,
  _sfc_staticRenderFns$a,
  false,
  null,
  "737a3618",
  null,
  null
);
const DotsLoader = __component__$a.exports;
const MatchItems_vue_vue_type_style_index_0_scoped_df02db1a_lang = "";
const _sfc_main$9 = {
  components: {
    Tooltip
  },
  props: {
    oneRow: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    isMythic(item) {
      return item && item.isMythic;
    },
    itemLink(item) {
      if (!item) {
        return null;
      }
      const originalUrl = item.image;
      const newUrl = originalUrl.includes("/global/default/assets/items/") ? originalUrl : originalUrl.replace("latest", "10.22");
      return `url('${newUrl}')`;
    },
    itemName(name) {
      return name.replace(/%[^%]*%/, "");
    }
  }
};
var _sfc_render$9 = function render6() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex", class: _vm.oneRow ? "ml-2 items-center" : "items-2-rows flex-wrap" }, _vm._l(_vm.items, function(item, index) {
    return _c("Tooltip", { key: index, scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "relative" }, [_c("div", { staticClass: "relative z-10 rounded-md bg-blue-1000 bg-cover bg-center", class: [
        _vm.oneRow ? "ml-0.5 h-6 w-6" : "ml-1 h-8 w-8",
        { "cursor-pointer": item !== null }
      ], style: { backgroundImage: _vm.itemLink(item) } }, [_vm.isMythic(item) ? _c("div", { staticClass: "mythic-inside h-full w-full rounded-md" }) : _vm._e()]), _vm.isMythic(item) ? _c("div", { staticClass: "mythic absolute rounded-md", class: _vm.oneRow ? "mythic-sm" : "mythic-xl" }) : _vm._e()])];
    }, proxy: true }, item !== null ? { key: "default", fn: function() {
      return [_c("div", { staticClass: "flex max-w-md select-none p-2 text-left text-xs text-white" }, [_c("div", { staticClass: "ml-1 h-12 w-12 flex-shrink-0 rounded-md bg-blue-1000 bg-cover bg-center", style: { backgroundImage: _vm.itemLink(item) } }), _c("div", { staticClass: "ml-2 leading-none" }, [_c("div", { staticClass: "text-base" }, [_vm._v(_vm._s(_vm.itemName(item.name)))]), _c("div", { staticClass: "mt-1" }, [_c("span", { staticClass: "text-blue-200" }, [_vm._v("Price:")]), _c("span", { staticClass: "ml-1 text-sm font-semibold text-yellow-500" }, [_vm._v(_vm._s(item.price))])]), _c("div", { staticClass: "item-description mt-1 font-light text-blue-200", domProps: { "innerHTML": _vm._s(item.description) } })])])];
    }, proxy: true } : null], null, true) });
  }), 1);
};
var _sfc_staticRenderFns$9 = [];
var __component__$9 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$9,
  _sfc_render$9,
  _sfc_staticRenderFns$9,
  false,
  null,
  "df02db1a",
  null,
  null
);
const MatchItems = __component__$9.exports;
const DetailedMatchTeam_vue_vue_type_style_index_0_scoped_318af43b_lang = "";
const _sfc_main$8 = {
  components: {
    DotsLoader,
    Tooltip,
    MatchItems
  },
  props: {
    allPlayers: {
      type: Array,
      required: true
    },
    allyTeam: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    ranksLoaded: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    statsFormat() {
      return this.percentSettings ? "percentStats" : "stats";
    },
    ...mapState({
      account: (state) => state.summoner.basic.account,
      percentSettings: (state) => state.settings.percent
    })
  },
  methods: {
    bgColor(player, stats) {
      const value = parseFloat(player.stats[stats]);
      const biggestValue = Math.max(...this.allPlayers.map((p) => parseFloat(p.stats[stats])), 0);
      const opacity = (value / biggestValue).toFixed(2);
      const biggestValueStyle = {};
      if (value === biggestValue && value !== 0) {
        biggestValueStyle.boxShadow = "rgba(181, 160, 122, 0.5) 0px 0px 10px";
        biggestValueStyle.border = "2px solid";
        biggestValueStyle.borderImageSlice = "1";
        biggestValueStyle.borderImageSource = "linear-gradient(to top, #edb457, #f9e9ce)";
        biggestValueStyle.borderCollapse = "separate";
      }
      return {
        backgroundColor: `rgba(${colors[stats]}, ${opacity})`,
        ...biggestValueStyle
      };
    },
    displayBorderbottom(index) {
      return this.allyTeam || index !== this.data.players.length - 1;
    },
    getHeadingColor(result) {
      switch (result) {
        case "Win":
          return {
            "--bg-img": "linear-gradient(90deg, rgba(1, 97, 28, 0.3) 0%, rgba(44, 82, 130, 0) 45% )"
          };
        case "Fail":
          return {
            "--bg-img": "linear-gradient(90deg, rgba(140, 0, 0, 0.3) 0%, rgba(44, 82, 130, 0) 45% )"
          };
        default:
          return {
            "--bg-img": "linear-gradient(90deg, rgba(233, 169, 75, 0.3) 0%, rgba(44, 82, 130, 0) 45% )"
          };
      }
    },
    roundStats(value) {
      return this.percentSettings ? value : this.$options.filters.kilo(value);
    },
    selectRunes(player) {
      if (!player.perks) {
        return;
      }
      this.displayRunes(player.perks);
    },
    ...mapActions("cdragon", ["displayRunes"])
  }
};
var _sfc_render$8 = function render7() {
  var _vm = this, _c = _vm._self._c;
  return _c("table", { staticClass: "w-full table-fixed", class: [{ "overflow-hidden rounded-b-lg": !_vm.allyTeam }, _vm.data.result] }, [_c("thead", { staticClass: "heading-detailed leading-none" }, [_c("tr", { staticClass: "heading-row relative font-semibold text-blue-200", style: _vm.getHeadingColor(_vm.data.result) }, [_c("th", { staticClass: "w-players py-5" }, [_c("div", { staticClass: "flex justify-between" }, [_c("span", { staticClass: "pl-2", class: _vm.allyTeam ? "text-teal-400" : "text-red-400" }, [_vm._v(_vm._s(_vm.allyTeam ? "Ally" : "Enemy") + " Team")]), _vm.data.result === "Win" ? _c("div", { staticClass: "flex pr-2", class: _vm.allyTeam ? "text-teal-400" : "text-red-400" }, [_c("svg", { staticClass: "h-4 w-4 items-center" }, [_c("use", { attrs: { "xlink:href": "#award" } })]), _c("span", { staticClass: "ml-0.5" }, [_vm._v("VICTORY")])]) : _vm._e()])]), _c("th", { staticClass: "w-kda px-2 py-5 text-sm font-medium" }, [_vm._v("K")]), _c("th", { staticClass: "w-kda px-2 py-5 text-sm font-medium" }, [_vm._v("D")]), _c("th", { staticClass: "w-kda px-2 py-5 text-sm font-medium" }, [_vm._v("A")]), _c("th", { staticClass: "w-minions px-2 py-5 text-sm font-medium" }, [_vm._v(" " + _vm._s(_vm.statsFormat === "stats" ? "Cs" : "Cs/m") + " ")]), _c("th", { staticClass: "w-vision px-2 py-5 text-sm font-medium" }, [_vm._v(" " + _vm._s(_vm.statsFormat === "stats" ? "Vs" : "Vs/m") + " ")]), _c("th", { staticClass: "w-gold-dmg-kp px-2 py-5 text-sm font-medium" }, [_vm._v("Gold")]), _vm._m(0), _vm._m(1), _vm._m(2), _c("th", { staticClass: "w-gold-dmg-kp px-2 py-5 text-sm font-medium" }, [_vm._v("KP")])])]), _c("tbody", { staticClass: "leading-none", class: { "border-b border-blue-700": _vm.allyTeam } }, _vm._l(_vm.data.players, function(player, index) {
    return _c("tr", { key: player.name + index }, [_c("td", { staticClass: "border-r border-blue-700 py-2" }, [_c("div", { staticClass: "flex justify-between px-1" }, [_c("div", { staticClass: "flex" }, [_c("div", { staticClass: "flex items-center" }, [player.role !== "NONE" ? _c("div", { staticClass: "h-4 w-4 bg-cover bg-center", style: {
      backgroundImage: `url(${"/img/roles/" + player.role + ".png"})`
    } }) : _vm._e()]), _c("div", { staticClass: "relative ml-2 h-8 w-8 rounded-full bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url('${player.champion.icon}')` } }, [_c("div", { staticClass: "level-position absolute bottom-0 flex h-4 w-4 items-center justify-center rounded-full text-xxs", class: _vm.allyTeam ? "bg-teal-500 text-teal-100" : "bg-red-500 text-red-100" }, [_c("span", [_vm._v(_vm._s(player.level))])])]), _c("div", { staticClass: "ml-1 flex flex-col justify-around" }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "h-4 w-4 rounded-md bg-blue-1000 bg-cover bg-center", class: { "cursor-pointer": player.summonerSpell1 }, style: {
        backgroundImage: `url(${player.summonerSpell1 ? player.summonerSpell1.icon : null})`
      } })];
    }, proxy: true }, player.summonerSpell1 ? { key: "default", fn: function() {
      return [_c("div", { staticClass: "flex max-w-sm select-none p-2 text-left text-xs text-white" }, [_c("div", { staticClass: "ml-1 h-12 w-12 flex-shrink-0 rounded-md bg-blue-1000 bg-cover bg-center", style: {
        backgroundImage: `url('${player.summonerSpell1.icon}')`
      } }), _c("div", { staticClass: "ml-2 leading-tight" }, [_c("div", { staticClass: "text-base leading-none" }, [_vm._v(" " + _vm._s(player.summonerSpell1.name) + " ")]), _c("div", { staticClass: "mt-1 font-light text-blue-200" }, [_vm._v(" " + _vm._s(player.summonerSpell1.description) + " ")])])])];
    }, proxy: true } : null], null, true) }), _c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "h-4 w-4 rounded-md bg-blue-1000 bg-cover bg-center", class: { "cursor-pointer": player.summonerSpell2 }, style: {
        backgroundImage: `url(${player.summonerSpell2 ? player.summonerSpell2.icon : null})`
      } })];
    }, proxy: true }, player.summonerSpell2 ? { key: "default", fn: function() {
      return [_c("div", { staticClass: "flex max-w-sm select-none p-2 text-left text-xs text-white" }, [_c("div", { staticClass: "ml-1 h-12 w-12 flex-shrink-0 rounded-md bg-blue-1000 bg-cover bg-center", style: {
        backgroundImage: `url('${player.summonerSpell2.icon}')`
      } }), _c("div", { staticClass: "ml-2 leading-tight" }, [_c("div", { staticClass: "text-base leading-none" }, [_vm._v(" " + _vm._s(player.summonerSpell2.name) + " ")]), _c("div", { staticClass: "mt-1 font-light text-blue-200" }, [_vm._v(" " + _vm._s(player.summonerSpell2.description) + " ")])])])];
    }, proxy: true } : null], null, true) })], 1), _c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "ml-0.5 flex cursor-pointer flex-col justify-around", class: { "cursor-pointer": player.perks }, on: { "click": function($event) {
        return _vm.selectRunes(player);
      } } }, [_c("div", { staticClass: "h-4 w-4 rounded-md bg-blue-1000", style: [
        player.primaryRune ? {
          background: `url(${player.primaryRune}) center/cover`
        } : ""
      ] }), _c("div", { staticClass: "h-4 w-4 rounded-md bg-blue-1000", style: [
        player.secondaryRune ? {
          background: `url(${player.secondaryRune}) center/cover`
        } : ""
      ] })])];
    }, proxy: true }, player.perks ? { key: "default", fn: function() {
      return [_c("div", { staticClass: "select-none px-2 text-center text-sm leading-relaxed text-white" }, [_c("p", [_vm._v("Click to display")]), _c("p", { staticClass: "font-bold text-teal-400" }, [_vm._v("full runes")])])];
    }, proxy: true } : null], null, true) }), _c("div", { staticClass: "ml-1 flex flex-col items-start justify-center leading-none" }, [player.summonerSpell1 ? _c("router-link", { staticClass: "text-overflow w-[5.5rem] overflow-hidden whitespace-nowrap text-left text-xs text-white hover:text-blue-200", class: {
      "font-semibold text-yellow-400": _vm.account.id === player.summonerId
    }, attrs: { "to": {
      name: "summoner",
      params: { region: _vm.$route.params.region, name: player.name }
    } } }, [_vm._v(_vm._s(player.name))]) : _c("div", { staticClass: "text-overflow w-[5.5rem] overflow-hidden whitespace-nowrap text-left text-xs text-white" }, [_vm._v(" " + _vm._s(player.name) + " ")]), _c("div", { staticClass: "text-xxs text-teal-500" }, [_vm._v(" " + _vm._s(player.champion.name) + " ")])], 1)], 1), _c("div", { staticClass: "flex items-center" }, [player.rank ? _c("div", [_c("svg", { staticClass: "ml-auto h-5 w-5" }, [_c("use", { attrs: { "xlink:href": `#rank-${player.rank.tier.toLowerCase()}` } })]), _c("div", { staticClass: "text-xxs text-blue-300" }, [_vm._v(" " + _vm._s(player.rank.shortName) + " ")])]) : !_vm.ranksLoaded ? _c("div", [_c("DotsLoader", { attrs: { "width": "30px", "dot-width": "10px" } })], 1) : _c("div", { staticClass: "h-5 w-5" }, [_c("div", { staticClass: "-mt-1 text-2xl text-blue-300" }, [_vm._v("-")])]), _c("MatchItems", { attrs: { "items": player.items, "one-row": true } })], 1)])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "kills") }, [_vm._v(" " + _vm._s(player.stats.kills) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "deaths") }, [_vm._v(" " + _vm._s(player.stats.deaths) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "assists") }, [_vm._v(" " + _vm._s(player.stats.assists) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "minions") }, [_vm._v(" " + _vm._s(player[_vm.statsFormat].minions) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "vision") }, [_vm._v(" " + _vm._s(player[_vm.statsFormat].vision) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "gold") }, [_vm._v(" " + _vm._s(_vm.roundStats(player[_vm.statsFormat].gold)) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "dmgChamp") }, [_vm._v(" " + _vm._s(_vm.roundStats(player[_vm.statsFormat].dmgChamp)) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "dmgObj") }, [_vm._v(" " + _vm._s(_vm.roundStats(player[_vm.statsFormat].dmgObj)) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "dmgTaken") }, [_vm._v(" " + _vm._s(_vm.roundStats(player[_vm.statsFormat].dmgTaken)) + " ")])]), _c("td", { staticClass: "relative" }, [_c("div", { staticClass: "absolute inset-0 flex items-center justify-center p-2 text-sm text-white", style: _vm.bgColor(player, "kp") }, [_vm._v(" " + _vm._s(player.stats.kp) + " ")])])]);
  }), 0)]);
};
var _sfc_staticRenderFns$8 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("th", { staticClass: "w-gold-dmg-kp px-2 py-5 text-sm font-medium" }, [_vm._v(" Dmg "), _c("br"), _vm._v("champ ")]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("th", { staticClass: "w-gold-dmg-kp px-2 py-5 text-sm font-medium" }, [_vm._v(" Dmg "), _c("br"), _vm._v("obj ")]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("th", { staticClass: "w-gold-dmg-kp px-2 py-5 text-sm font-medium" }, [_vm._v(" Dmg "), _c("br"), _vm._v("taken ")]);
}];
var __component__$8 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$8,
  _sfc_render$8,
  _sfc_staticRenderFns$8,
  false,
  null,
  "318af43b",
  null,
  null
);
const DetailedMatchTeam = __component__$8.exports;
const SwitchToggle_vue_vue_type_style_index_0_scoped_a75de222_lang = "";
const _sfc_main$7 = {
  props: {
    leftLabel: {
      type: String,
      required: true
    },
    rightLabel: {
      type: String,
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("updateValue", value);
      }
    }
  }
};
var _sfc_render$7 = function render8() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "switch relative z-10 select-none text-sm leading-tight text-teal-400" }, [_c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selected, expression: "selected" }], staticClass: "toggle toggle-left hidden", attrs: { "id": "toggle-on", "type": "radio" }, domProps: { "value": true, "checked": _vm._q(_vm.selected, true) }, on: { "change": function($event) {
    _vm.selected = true;
  } } }), _c("label", { staticClass: "inline-block cursor-pointer rounded-l-full border-b-2 border-l-2 border-r border-t-2 border-teal-500 py-1", class: { "selected-label": _vm.selected }, attrs: { "for": "toggle-on" } }, [_vm._v(_vm._s(_vm.leftLabel))]), _c("input", { directives: [{ name: "model", rawName: "v-model", value: _vm.selected, expression: "selected" }], staticClass: "toggle toggle-right hidden", attrs: { "id": "toggle-off", "type": "radio" }, domProps: { "value": false, "checked": _vm._q(_vm.selected, false) }, on: { "change": function($event) {
    _vm.selected = false;
  } } }), _c("label", { staticClass: "inline-block cursor-pointer rounded-r-full border-b-2 border-l border-r-2 border-t-2 border-teal-500 py-1", class: { "selected-label": !_vm.selected }, attrs: { "for": "toggle-off" } }, [_vm._v(_vm._s(_vm.rightLabel))]), _c("div", { staticClass: "selector absolute inset-0 w-1/2 bg-teal-500", class: _vm.selected ? "left-checked" : "right-checked" })]);
};
var _sfc_staticRenderFns$7 = [];
var __component__$7 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$7,
  _sfc_render$7,
  _sfc_staticRenderFns$7,
  false,
  null,
  "a75de222",
  null,
  null
);
const SwitchToggle = __component__$7.exports;
const DetailedMatch_vue_vue_type_style_index_0_scoped_c0cb3983_lang = "";
const _sfc_main$6 = {
  components: {
    CubeLoader,
    DetailedMatchGlobalStats,
    DetailedMatchTeam,
    SwitchToggle
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    detailsOpen: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    allyTeam() {
      return this.data.blueTeam.players.some((p) => p.summonerId === this.account.id) ? this.data.blueTeam : this.data.redTeam;
    },
    enemyTeam() {
      return this.data.blueTeam.players.some((p) => p.summonerId === this.account.id) ? this.data.redTeam : this.data.blueTeam;
    },
    ...mapState({
      account: (state) => state.summoner.basic.account,
      percentSettings: (state) => state.settings.percent
    })
  },
  methods: {
    ...mapActions("settings", ["updatePercent"])
  }
};
var _sfc_render$6 = function render9() {
  var _vm = this, _c = _vm._self._c;
  return _c("transition", { attrs: { "name": "slide" } }, [_vm.data.status === "loaded" && _vm.detailsOpen ? _c("div", { staticClass: "rounded-b-lg bg-blue-800" }, [_c("DetailedMatchTeam", { attrs: { "data": _vm.allyTeam, "all-players": [..._vm.allyTeam.players, ..._vm.enemyTeam.players], "ally-team": true, "ranks-loaded": _vm.data.ranksLoaded } }), _c("div", { staticClass: "flex items-start justify-between px-3 py-2" }, [_c("DetailedMatchGlobalStats", { attrs: { "team": _vm.allyTeam, "ally-team": true } }), _c("SwitchToggle", { staticClass: "mt-2", attrs: { "left-label": "%", "right-label": "Total", "value": _vm.percentSettings }, on: { "updateValue": _vm.updatePercent } }), _c("DetailedMatchGlobalStats", { attrs: { "team": _vm.enemyTeam, "ally-team": false } })], 1), _c("DetailedMatchTeam", { attrs: { "data": _vm.enemyTeam, "all-players": [..._vm.allyTeam.players, ..._vm.enemyTeam.players], "ally-team": false, "ranks-loaded": _vm.data.ranksLoaded } })], 1) : _vm.data.status === "loading" && _vm.detailsOpen ? _c("div", [_c("div", { staticClass: "rounded-b-lg bg-blue-800 py-5" }, [_c("CubeLoader")], 1)]) : _vm._e()]);
};
var _sfc_staticRenderFns$6 = [];
var __component__$6 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$6,
  _sfc_render$6,
  _sfc_staticRenderFns$6,
  false,
  null,
  "c0cb3983",
  null,
  null
);
const DetailedMatch = __component__$6.exports;
const Match_vue_vue_type_style_index_0_scoped_5de22e9e_lang = "";
const _sfc_main$5 = {
  components: {
    DetailedMatch,
    Tooltip,
    MatchItems,
    Ripple
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    indexMatch: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      showDetails: false
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.summoner.basic.account,
      roles: (state) => state.roles
    }),
    ...mapGetters("detailedMatch", ["getMatchDetails"])
  },
  methods: {
    displayDetails() {
      this.showDetails = !this.showDetails;
      if (!this.getMatchDetails(this.data.matchId)) {
        this.matchDetails(this.data.matchId);
      }
    },
    isSummonerProfile(account_id) {
      return {
        "font-bold text-white": this.account.accountId === account_id,
        "text-blue-200": this.account.accountId !== account_id
      };
    },
    ...mapActions("detailedMatch", ["matchDetails"])
  }
};
var _sfc_render$5 = function render10() {
  var _vm = this, _c = _vm._self._c;
  return _c("li", { staticClass: "relative ml-4" }, [_c("Ripple", { staticClass: "match relative cursor-pointer bg-blue-800 text-base text-white hover:shadow-xl", class: [
    _vm.data.result,
    _vm.showDetails ? "rounded-t-lg" : "rounded-lg",
    { "mt-4": _vm.indexMatch !== 0 }
  ], attrs: { "color": "rgba(43, 108, 176, 0.7)" }, nativeOn: { "click": function($event) {
    return _vm.displayDetails.apply(null, arguments);
  } } }, [_c("div", { staticClass: "relative flex flex-wrap px-5 py-3" }, [_vm.data.newMatch ? _c("div", { staticClass: "new-match absolute right-0 top-0 rounded-full px-2 text-xxs", staticStyle: { "margin": "0.35rem 0.35rem 0 0", "background-color": "rgba(99, 179, 237, 0.2)" } }, [_vm._v(" New ")]) : _vm._e(), _c("div", { staticClass: "first w-4/12 text-left" }, [_c("div", [_c("div", { staticClass: "h-6 text-lg font-extrabold uppercase leading-none text-teal-500" }, [_vm._v(" " + _vm._s(_vm.data.champion.name) + " ")]), _c("div", { staticClass: "flex" }, [_c("div", { staticClass: "flex flex-col items-center justify-end" }, [_vm.data.role !== "NONE" ? _c("div", { staticClass: "h-10 w-10 bg-cover bg-center", style: { backgroundImage: `url(${"/img/roles/" + _vm.data.role + ".png"})` } }) : _vm._e(), _c("div", { staticClass: "w-10 text-center text-xs font-extrabold text-teal-500" }, [_vm._v(" LVL " + _vm._s(_vm.data.level) + " ")])]), _c("div", { staticClass: "crop-champion ml-2 h-16 w-16 rounded-lg bg-blue-1000", style: { backgroundImage: `url('${_vm.data.champion.icon}')` } }), _c("div", { staticClass: "ml-2 flex flex-col justify-around" }, [_vm.data.summonerSpell1 ? _c("div", { staticClass: "h-6 w-6 rounded-md bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url(${_vm.data.summonerSpell1.icon})` } }) : _c("div", { staticClass: "h-6 w-6 rounded-md bg-blue-1000" }), _vm.data.summonerSpell2 ? _c("div", { staticClass: "h-6 w-6 rounded-md bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url(${_vm.data.summonerSpell2.icon})` } }) : _c("div", { staticClass: "h-6 w-6 rounded-md bg-blue-1000" })]), _c("div", { staticClass: "ml-1 flex flex-col justify-around" }, [_c("div", { staticClass: "h-6 w-6 rounded-md bg-blue-1000", style: [
    _vm.data.primaryRune ? { background: `url(${_vm.data.primaryRune}) center/cover` } : ""
  ] }), _c("div", { staticClass: "h-6 w-6 rounded-md bg-blue-1000", style: [
    _vm.data.secondaryRune ? { background: `url(${_vm.data.secondaryRune}) center/cover` } : ""
  ] })]), _c("div", { staticClass: "mx-auto flex flex-col items-center justify-center leading-none" }, [_c("div", { staticClass: "text-xl font-extrabold text-teal-500" }, [_c("span", {}, [_vm._v(_vm._s(_vm.data.stats.kills))]), _c("span", {}, [_vm._v("/")]), _c("span", {}, [_vm._v(_vm._s(_vm.data.stats.deaths))]), _c("span", {}, [_vm._v("/")]), _c("span", {}, [_vm._v(_vm._s(_vm.data.stats.assists))])]), _c("div", { staticClass: "relative z-30 mt-2 text-xs font-extrabold text-white" }, [_vm._v(" " + _vm._s(_vm.data.stats.kda) + " KDA ")])])]), _c("div", { staticClass: "relative z-30 flex h-6 items-end text-sm font-extrabold leading-none text-white" }, [_vm._v(" " + _vm._s(_vm.data.gamemode.name) + " ")])])]), _c("div", { staticClass: "second flex w-3/12 items-center py-6" }, [_c("MatchItems", { attrs: { "items": _vm.data.items } }), _c("div", { staticClass: "relative z-30 ml-4 leading-none" }, [_c("div", { staticClass: "flex items-center" }, [_c("svg", { staticStyle: { "width": "15px", "height": "15px" } }, [_c("use", { attrs: { "xlink:href": "#creeps" } })]), _c("div", { staticClass: "ml-1 text-sm font-bold text-teal-300" }, [_vm._v(" " + _vm._s(_vm.data.stats.minions) + " "), _c("span", { staticClass: "font-normal" }, [_vm._v("cs")])])]), _c("div", { staticClass: "flex items-center" }, [_c("svg", { staticStyle: { "width": "15px", "height": "15px" } }, [_c("use", { attrs: { "xlink:href": "#gold" } })]), _c("div", { staticClass: "gold ml-1 text-sm font-bold" }, [_vm._v(_vm._s(_vm._f("kilo")(_vm.data.stats.gold)))])]), _c("div", { staticClass: "flex items-center" }, [_c("svg", { staticStyle: { "width": "15px", "height": "15px" } }, [_c("use", { attrs: { "xlink:href": "#damage" } })]), _c("div", { staticClass: "damage ml-1 text-sm font-bold" }, [_vm._v(_vm._s(_vm._f("kilo")(_vm.data.stats.dmgChamp)))])]), _c("div", { staticClass: "flex items-center" }, [_c("svg", { staticStyle: { "width": "15px", "height": "15px" } }, [_c("use", { attrs: { "xlink:href": "#kill-participation" } })]), _c("div", { staticClass: "kp ml-1 text-sm font-bold" }, [_vm._v(_vm._s(_vm._f("percent")(_vm.data.stats.kp)))])])])], 1), _c("div", { staticClass: "third flex w-5/12 items-center py-1" }, [_vm.data.allyTeam.length > 1 ? _c("div", _vm._l(_vm.data.allyTeam, function(ally, index) {
    return _c("div", { key: "player-" + index, staticClass: "ml-4 flex items-center leading-none" }, [ally.account_id !== "0" && _vm.account.accountId !== ally.account_id ? _c("router-link", { staticClass: "text-overflow w-16 overflow-hidden whitespace-nowrap text-right text-xs font-medium hover:text-white", class: _vm.isSummonerProfile(ally.account_id), attrs: { "to": {
      name: "summoner",
      params: { region: _vm.$route.params.region, name: ally.name }
    } }, nativeOn: { "click": function($event) {
      return $event.stopImmediatePropagation();
    } } }, [_vm._v(_vm._s(ally.name))]) : _c("div", { staticClass: "text-overflow w-16 overflow-hidden whitespace-nowrap text-right text-xs font-medium", class: _vm.isSummonerProfile(ally.account_id) }, [_vm._v(" " + _vm._s(ally.name) + " ")]), _c("div", { staticClass: "ml-1 h-6 w-6 overflow-hidden rounded-full bg-blue-1000 bg-cover bg-center", class: index !== 0 ? "-mt-1" : "", style: { backgroundImage: `url('${ally.champion.icon}')` } }), _c("div", { staticClass: "mx-2 h-4 w-4 bg-cover bg-center", style: {
      backgroundImage: _vm.data.role !== "NONE" ? `url(${"/img/roles/" + _vm.roles[index] + ".png"})` : null
    } }), _c("div", { staticClass: "h-6 w-6 rounded-full bg-blue-1000 bg-cover bg-center", class: index !== 0 ? "-mt-1" : "", style: { backgroundImage: `url('${_vm.data.enemyTeam[index].champion.icon}')` } }), _vm.data.enemyTeam[index].account_id !== "0" ? _c("router-link", { staticClass: "text-overflow ml-1 w-16 overflow-hidden whitespace-nowrap text-left text-xs font-medium text-blue-200 hover:text-white", attrs: { "to": {
      name: "summoner",
      params: { region: _vm.$route.params.region, name: _vm.data.enemyTeam[index].name }
    } }, nativeOn: { "click": function($event) {
      return $event.stopImmediatePropagation();
    } } }, [_vm._v(_vm._s(_vm.data.enemyTeam[index].name))]) : _c("div", { staticClass: "text-overflow ml-1 w-16 overflow-hidden whitespace-nowrap text-left text-xs font-medium text-blue-200" }, [_vm._v(" " + _vm._s(_vm.data.enemyTeam[index].name) + " ")])], 1);
  }), 0) : _vm._e(), _c("div", { staticClass: "ml-auto flex flex-col items-center justify-center" }, [_c("svg", { staticClass: "h-5 w-5 text-blue-200" }, [_c("use", { attrs: { "xlink:href": "#stopwatch" } })]), _c("div", { staticClass: "text-lg font-medium text-teal-400" }, [_vm._v(_vm._s(_vm._f("secToTime")(_vm.data.time)))]), _c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
    return [_c("div", { staticClass: "text-xs font-medium text-white" }, [_vm._v(_vm._s(_vm.data.date))])];
  }, proxy: true }, { key: "default", fn: function() {
    return [_c("div", { staticClass: "select-none px-2 text-center text-xs leading-tight text-white" }, [_c("svg", { staticClass: "mx-auto h-4 w-4 text-teal-400" }, [_c("use", { attrs: { "xlink:href": "#time" } })]), _c("div", { staticClass: "mt-1" }, [_vm._v(_vm._s(_vm.data.fullDate.date))]), _c("div", [_vm._v(_vm._s(_vm.data.fullDate.time))])])];
  }, proxy: true }]) })], 1)])])]), _c("DetailedMatch", { attrs: { "data": _vm.getMatchDetails(_vm.data.matchId) || {}, "details-open": _vm.showDetails } })], 1);
};
var _sfc_staticRenderFns$5 = [];
var __component__$5 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$5,
  _sfc_render$5,
  _sfc_staticRenderFns$5,
  false,
  null,
  "5de22e9e",
  null,
  null
);
const Match = __component__$5.exports;
const _sfc_main$4 = {
  components: {
    ContentLoader
  }
};
var _sfc_render$4 = function render11() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3 flex text-center" }, [_c("div", { staticClass: "w-3/12" }, [_c("div", { staticClass: "rounded-lg bg-blue-850", staticStyle: { "width": "300px", "height": "339px" } }, [_c("content-loader", { attrs: { "height": 339, "width": 300, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "94", "y": "18", "rx": "3", "ry": "3", "width": "111", "height": "24" } }), _c("rect", { attrs: { "x": "23", "y": "76", "rx": "3", "ry": "3", "width": "74", "height": "12" } }), _c("rect", { attrs: { "x": "130", "y": "76", "rx": "3", "ry": "3", "width": "34", "height": "12" } }), _c("rect", { attrs: { "x": "185", "y": "76", "rx": "3", "ry": "3", "width": "48", "height": "12" } }), _c("rect", { attrs: { "x": "246", "y": "76", "rx": "3", "ry": "3", "width": "30", "height": "12" } }), _c("circle", { attrs: { "cx": "40", "cy": "123", "r": "16" } }), _c("rect", { attrs: { "x": "60", "y": "116", "rx": "3", "ry": "3", "width": "49", "height": "13" } }), _c("rect", { attrs: { "x": "130", "y": "116", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "185", "y": "116", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "246", "y": "116", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("circle", { attrs: { "cx": "40", "cy": "171", "r": "16" } }), _c("rect", { attrs: { "x": "60", "y": "163", "rx": "3", "ry": "3", "width": "49", "height": "13" } }), _c("rect", { attrs: { "x": "130", "y": "163", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "185", "y": "163", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "246", "y": "163", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("circle", { attrs: { "cx": "40", "cy": "219", "r": "16" } }), _c("rect", { attrs: { "x": "60", "y": "212", "rx": "3", "ry": "3", "width": "49", "height": "13" } }), _c("rect", { attrs: { "x": "130", "y": "212", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "185", "y": "212", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "246", "y": "212", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("circle", { attrs: { "cx": "40", "cy": "267", "r": "16" } }), _c("rect", { attrs: { "x": "60", "y": "260", "rx": "3", "ry": "3", "width": "49", "height": "13" } }), _c("rect", { attrs: { "x": "130", "y": "260", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "185", "y": "260", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "246", "y": "260", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("circle", { attrs: { "cx": "40", "cy": "315", "r": "16" } }), _c("rect", { attrs: { "x": "60", "y": "308", "rx": "3", "ry": "3", "width": "49", "height": "13" } }), _c("rect", { attrs: { "x": "130", "y": "308", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "185", "y": "308", "rx": "3", "ry": "3", "width": "42", "height": "16" } }), _c("rect", { attrs: { "x": "246", "y": "308", "rx": "3", "ry": "3", "width": "42", "height": "16" } })])], 1), _c("div", { staticClass: "mt-4 rounded-lg bg-blue-850", staticStyle: { "width": "300px", "height": "828px" } }, [_c("content-loader", { attrs: { "height": 828, "width": 300, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "122", "y": "17", "rx": "3", "ry": "3", "width": "55", "height": "24" } }), _c("rect", { attrs: { "x": "26", "y": "72", "rx": "4", "ry": "4", "width": "8", "height": "51" } }), _c("rect", { attrs: { "x": "86", "y": "72", "rx": "4", "ry": "4", "width": "8", "height": "51" } }), _c("rect", { attrs: { "x": "146", "y": "72", "rx": "4", "ry": "4", "width": "8", "height": "51" } }), _c("rect", { attrs: { "x": "206", "y": "72", "rx": "4", "ry": "4", "width": "8", "height": "51" } }), _c("rect", { attrs: { "x": "266", "y": "72", "rx": "4", "ry": "4", "width": "8", "height": "51" } }), _c("rect", { attrs: { "x": "22", "y": "128", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "82", "y": "128", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "142", "y": "128", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "202", "y": "128", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "262", "y": "128", "rx": "3", "ry": "3", "width": "16", "height": "16" } }), _c("rect", { attrs: { "x": "14", "y": "182", "rx": "3", "ry": "3", "width": "45", "height": "16" } }), _c("rect", { attrs: { "x": "93", "y": "182", "rx": "3", "ry": "3", "width": "45", "height": "16" } }), _c("rect", { attrs: { "x": "155", "y": "182", "rx": "3", "ry": "3", "width": "58", "height": "16" } }), _c("rect", { attrs: { "x": "250", "y": "182", "rx": "3", "ry": "3", "width": "33", "height": "16" } }), _c("rect", { attrs: { "x": "14", "y": "212", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "93", "y": "212", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "168", "y": "212", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "212", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "237", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "93", "y": "237", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "168", "y": "237", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "237", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "262", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "93", "y": "262", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "168", "y": "262", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "262", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "287", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "93", "y": "287", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "168", "y": "287", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "287", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "312", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "93", "y": "312", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "168", "y": "312", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "312", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "337", "rx": "3", "ry": "3", "width": "105", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "337", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "362", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "362", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "397", "rx": "3", "ry": "3", "width": "115", "height": "16" } }), _c("rect", { attrs: { "x": "150", "y": "397", "rx": "3", "ry": "3", "width": "65", "height": "16" } }), _c("rect", { attrs: { "x": "223", "y": "397", "rx": "3", "ry": "3", "width": "60", "height": "16" } }), _c("rect", { attrs: { "x": "14", "y": "427", "rx": "3", "ry": "3", "width": "95", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "427", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "427", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "452", "rx": "3", "ry": "3", "width": "95", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "452", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "452", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "487", "rx": "3", "ry": "3", "width": "115", "height": "16" } }), _c("rect", { attrs: { "x": "150", "y": "487", "rx": "3", "ry": "3", "width": "65", "height": "16" } }), _c("rect", { attrs: { "x": "223", "y": "487", "rx": "3", "ry": "3", "width": "60", "height": "16" } }), _c("rect", { attrs: { "x": "14", "y": "517", "rx": "3", "ry": "3", "width": "95", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "517", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "517", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "542", "rx": "3", "ry": "3", "width": "95", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "542", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "542", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "577", "rx": "3", "ry": "3", "width": "115", "height": "16" } }), _c("rect", { attrs: { "x": "150", "y": "577", "rx": "3", "ry": "3", "width": "65", "height": "16" } }), _c("rect", { attrs: { "x": "223", "y": "577", "rx": "3", "ry": "3", "width": "60", "height": "16" } }), _c("rect", { attrs: { "x": "14", "y": "607", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "607", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "607", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "632", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "632", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "632", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "657", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "657", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "657", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "682", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "682", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "682", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "707", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "707", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "707", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "732", "rx": "3", "ry": "3", "width": "50", "height": "12" } }), _c("rect", { attrs: { "x": "165", "y": "732", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "238", "y": "732", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "122", "y": "762", "rx": "3", "ry": "3", "width": "55", "height": "20" } }), _c("rect", { attrs: { "x": "115", "y": "789", "rx": "3", "ry": "3", "width": "70", "height": "12" } }), _c("rect", { attrs: { "x": "110", "y": "805", "rx": "3", "ry": "3", "width": "80", "height": "12" } })])], 1), _c("div", { staticClass: "mt-4 rounded-lg bg-blue-850", staticStyle: { "width": "300px", "height": "384px" } }, [_c("content-loader", { attrs: { "height": 384, "width": 300, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "112", "y": "17", "rx": "3", "ry": "3", "width": "75", "height": "24" } }), _c("rect", { attrs: { "x": "14", "y": "70", "rx": "3", "ry": "3", "width": "80", "height": "16" } }), _c("rect", { attrs: { "x": "150", "y": "70", "rx": "3", "ry": "3", "width": "40", "height": "16" } }), _c("rect", { attrs: { "x": "217", "y": "70", "rx": "3", "ry": "3", "width": "59", "height": "16" } }), _c("rect", { attrs: { "x": "14", "y": "100", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "100", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "100", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "121", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "121", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "121", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "142", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "142", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "142", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "163", "rx": "3", "ry": "3", "width": "115", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "163", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "163", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "184", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "184", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "184", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "205", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "205", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "205", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "226", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "226", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "226", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "247", "rx": "3", "ry": "3", "width": "115", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "247", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "247", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "268", "rx": "3", "ry": "3", "width": "115", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "268", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "268", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "289", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "289", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "289", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "310", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "310", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "310", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "331", "rx": "3", "ry": "3", "width": "115", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "331", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "331", "rx": "3", "ry": "3", "width": "65", "height": "12" } }), _c("rect", { attrs: { "x": "14", "y": "352", "rx": "3", "ry": "3", "width": "85", "height": "12" } }), _c("rect", { attrs: { "x": "145", "y": "352", "rx": "3", "ry": "3", "width": "45", "height": "12" } }), _c("rect", { attrs: { "x": "218", "y": "352", "rx": "3", "ry": "3", "width": "65", "height": "12" } })])], 1)]), _c("div", { staticClass: "w-9/12" }, [_vm._l(10, function(index) {
    return _c("div", { key: index, staticClass: "ml-4 rounded-lg bg-blue-850", class: { "mt-4": index !== 1 }, staticStyle: { "width": "884px", "height": "144px" } }, [_c("content-loader", { attrs: { "height": 144, "width": 884, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "68", "y": "36", "rx": "8", "ry": "8", "width": "64", "height": "64" } }), _c("rect", { attrs: { "x": "140", "y": "40", "rx": "6", "ry": "6", "width": "24", "height": "24" } }), _c("rect", { attrs: { "x": "140", "y": "72", "rx": "6", "ry": "6", "width": "24", "height": "24" } }), _c("rect", { attrs: { "x": "206", "y": "46", "rx": "3", "ry": "3", "width": "81", "height": "22" } }), _c("rect", { attrs: { "x": "218", "y": "74", "rx": "3", "ry": "3", "width": "59", "height": "16" } }), _c("rect", { attrs: { "x": "305", "y": "36", "rx": "6", "ry": "6", "width": "32", "height": "32" } }), _c("rect", { attrs: { "x": "341", "y": "36", "rx": "6", "ry": "6", "width": "32", "height": "32" } }), _c("rect", { attrs: { "x": "377", "y": "36", "rx": "6", "ry": "6", "width": "32", "height": "32" } }), _c("rect", { attrs: { "x": "305", "y": "72", "rx": "6", "ry": "6", "width": "32", "height": "32" } }), _c("rect", { attrs: { "x": "341", "y": "72", "rx": "6", "ry": "6", "width": "32", "height": "32" } }), _c("rect", { attrs: { "x": "377", "y": "72", "rx": "6", "ry": "6", "width": "32", "height": "32" } }), _c("rect", { attrs: { "x": "430", "y": "45", "rx": "3", "ry": "3", "width": "50", "height": "10" } }), _c("rect", { attrs: { "x": "430", "y": "60", "rx": "3", "ry": "3", "width": "50", "height": "10" } }), _c("rect", { attrs: { "x": "430", "y": "75", "rx": "3", "ry": "3", "width": "70", "height": "10" } }), _c("rect", { attrs: { "x": "430", "y": "90", "rx": "3", "ry": "3", "width": "70", "height": "10" } }), _c("circle", { attrs: { "cx": "608", "cy": "32", "r": "12" } }), _c("circle", { attrs: { "cx": "608", "cy": "52", "r": "12" } }), _c("circle", { attrs: { "cx": "608", "cy": "72", "r": "12" } }), _c("circle", { attrs: { "cx": "608", "cy": "92", "r": "12" } }), _c("circle", { attrs: { "cx": "608", "cy": "112", "r": "12" } }), _c("circle", { attrs: { "cx": "672", "cy": "32", "r": "12" } }), _c("circle", { attrs: { "cx": "672", "cy": "52", "r": "12" } }), _c("circle", { attrs: { "cx": "672", "cy": "72", "r": "12" } }), _c("circle", { attrs: { "cx": "672", "cy": "92", "r": "12" } }), _c("circle", { attrs: { "cx": "672", "cy": "112", "r": "12" } }), _c("rect", { attrs: { "x": "516", "y": "29", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "516", "y": "49", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "516", "y": "69", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "516", "y": "89", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "516", "y": "109", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "691", "y": "29", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "691", "y": "49", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "691", "y": "69", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "691", "y": "89", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("rect", { attrs: { "x": "691", "y": "109", "rx": "3", "ry": "3", "width": "72", "height": "9" } }), _c("circle", { attrs: { "cx": "830", "cy": "50", "r": "12" } }), _c("rect", { attrs: { "x": "800", "y": "66", "rx": "3", "ry": "3", "width": "64", "height": "17" } }), _c("rect", { attrs: { "x": "803", "y": "90", "rx": "3", "ry": "3", "width": "59", "height": "14" } })])], 1);
  }), _c("div", { staticClass: "mx-auto mt-4", staticStyle: { "width": "135px", "height": "40px" } }, [_c("content-loader", { attrs: { "height": 40, "width": 135, "speed": 2, "primary-color": "#17314f", "secondary-color": "#2b6cb0" } }, [_c("rect", { attrs: { "x": "0", "y": "0", "rx": "6", "ry": "6", "width": "135", "height": "40" } })])], 1)], 2)]);
};
var _sfc_staticRenderFns$4 = [];
var __component__$4 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$4,
  _sfc_render$4,
  _sfc_staticRenderFns$4,
  false,
  null,
  null,
  null,
  null
);
const OverviewLoader = __component__$4.exports;
const SummonerChampions_vue_vue_type_style_index_0_scoped_42c3d228_lang = "";
const _sfc_main$3 = {
  components: {
    Tooltip
  },
  computed: {
    bestKda() {
      const bestChamp = this.stats.champion.reduce((a, b) => {
        return this.kda(a.kills, a.deaths, a.assists) > this.kda(b.kills, b.deaths, b.assists) ? a : b;
      });
      return this.kda(bestChamp.kills, bestChamp.deaths, bestChamp.assists);
    },
    mostPlayed() {
      return this.stats.champion.reduce((a, b) => a.count > b.count ? a : b).count;
    },
    ...mapState({
      stats: (state) => state.summoner.overview.stats
    })
  },
  methods: {
    kda(kills, deaths, assists) {
      if (kills === 0 && deaths === 0 && assists === 0) {
        return 0;
      }
      return this.$options.filters.round((kills + assists) / deaths);
    },
    widthBar(value, total) {
      return `${value * 36 / total}px`;
    }
  }
};
var _sfc_render$3 = function render12() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "rounded-lg bg-blue-800" }, [_c("div", { staticClass: "heading relative flex items-center justify-center rounded-t-lg py-4 text-blue-200" }, [_c("svg", { staticClass: "h-5 w-5", staticStyle: { "transform": "rotate(-5deg)" } }, [_c("use", { attrs: { "xlink:href": "#layers" } })]), _c("span", { staticClass: "mx-4 text-lg font-semibold uppercase" }, [_vm._v("CHAMPIONS")]), _c("svg", { staticClass: "h-5 w-5", staticStyle: { "transform": "rotate(5deg)" } }, [_c("use", { attrs: { "xlink:href": "#layers" } })]), _c("div", { staticClass: "absolute right-0 top-0 mr-2 mt-3" }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
    return [_c("svg", { staticClass: "h-4 w-4 cursor-pointer" }, [_c("use", { attrs: { "xlink:href": "#info" } })])];
  }, proxy: true }, { key: "default", fn: function() {
    return [_c("div", { staticClass: "select-none px-2 text-center text-sm text-white" }, [_c("div", [_vm._v("Stats based on")]), _c("div", [_c("span", { staticClass: "font-bold text-teal-400" }, [_vm._v(_vm._s(_vm.stats.global ? _vm.stats.global.count : 0))]), _vm._v(" matches ")]), _c("div", { staticClass: "mt-2 text-xs font-normal italic leading-tight text-blue-100" }, [_vm._v(" Load more matches "), _c("br"), _vm._v("to have better results. ")])])];
  }, proxy: true }]) })], 1)]), _vm.stats.champion.length ? _c("div", [_vm._m(0), _c("ul", { staticClass: "mt-1 text-left text-sm text-gray-100" }, _vm._l(_vm.stats.champion, function(champion, index) {
    return _c("li", { key: index, staticClass: "relative flex items-center px-4 py-2 leading-tight", class: [
      { "rounded-b-lg": index === _vm.stats.champion.length - 1 },
      { "bg-blue-760": index % 2 === 0 }
    ] }, [_c("div", { staticClass: "absolute text-xs", staticStyle: { "left": "6px" } }, [_vm._v(_vm._s(index + 1) + ".")]), _c("div", { staticClass: "w-champion ml-2 flex items-center" }, [_c("div", { staticClass: "h-8 w-8 flex-shrink-0 rounded-full bg-blue-1000 bg-cover bg-center", style: { backgroundImage: `url('${champion.champion.icon}')` } }), _c("div", { staticClass: "mx-1 truncate" }, [_vm._v(_vm._s(champion.champion.name))])]), _c("div", { staticClass: "w-plays" }, [_c("div", { staticClass: "text-xs text-purple-400" }, [_vm._v(_vm._s(champion.count))]), _c("div", { staticClass: "mt-0.5 h-1 rounded-full bg-purple-400", style: { width: _vm.widthBar(champion.count, _vm.mostPlayed) } })]), _c("div", { staticClass: "w-winrate" }, [_c("div", { staticClass: "text-xs text-green-400" }, [_vm._v(" " + _vm._s(_vm._f("percent")(champion.wins * 100 / champion.count)) + " ")]), _c("div", { staticClass: "mt-0.5 h-1 rounded-full bg-green-400", style: { width: _vm.widthBar(champion.wins, champion.count) } })]), _c("div", { staticClass: "w-kda" }, [_c("div", { staticClass: "text-xs text-blue-400" }, [_vm._v(" " + _vm._s(_vm.kda(champion.kills, champion.deaths, champion.assists)) + " ")]), _c("div", { staticClass: "mt-0.5 h-1 rounded-full bg-blue-400", style: {
      width: _vm.widthBar(_vm.kda(champion.kills, champion.deaths, champion.assists), _vm.bestKda)
    } })])]);
  }), 0)]) : _c("div", { staticClass: "px-4 py-2" }, [_c("div", [_vm._v("No champions have been found.")]), _c("div", [_vm._v("😕")])])]);
};
var _sfc_staticRenderFns$3 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3 flex items-baseline px-4 text-left text-xs font-semibold uppercase text-blue-300" }, [_c("div", { staticClass: "w-champion ml-2 text-base text-blue-400" }, [_vm._v("Champion")]), _c("div", { staticClass: "w-plays" }, [_vm._v("Plays")]), _c("div", { staticClass: "w-winrate" }, [_vm._v("Winrate")]), _c("div", { staticClass: "w-kda" }, [_vm._v("KDA")])]);
}];
var __component__$3 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$3,
  _sfc_render$3,
  _sfc_staticRenderFns$3,
  false,
  null,
  "42c3d228",
  null,
  null
);
const SummonerChampions = __component__$3.exports;
const _sfc_main$2 = {
  components: {
    Tooltip
  },
  data() {
    return {
      maxMates: 15
    };
  },
  computed: {
    hasMates() {
      return this.mates.length > 0;
    },
    ...mapState({
      mates: (state) => state.summoner.overview.stats.mates
    })
  },
  methods: {
    getWinrateColor(wins, count, background = true) {
      const winrate = this.winrate(wins, count);
      if (winrate >= 70) {
        return background ? "bg-yellow-400" : "text-yellow-400";
      } else if (winrate >= 60) {
        return background ? "bg-teal-500" : "text-teal-500";
      } else if (winrate >= 50) {
        return background ? "bg-teal-300" : "text-teal-300";
      }
      return background ? "bg-teal-200" : "text-teal-200";
    },
    winrate(wins, count) {
      return wins * 100 / count;
    }
  }
};
var _sfc_render$2 = function render13() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-4 rounded-lg bg-blue-800" }, [_c("div", { staticClass: "pb-2" }, [_c("div", { staticClass: "heading flex items-center justify-center rounded-t-lg py-4 text-blue-200" }, [_c("svg", { staticClass: "h-5 w-5", staticStyle: { "transform": "rotate(-5deg)" } }, [_c("use", { attrs: { "xlink:href": "#people" } })]), _c("span", { staticClass: "mx-4 text-lg font-semibold uppercase" }, [_vm._v("FRIENDS")]), _c("svg", { staticClass: "h-5 w-5", staticStyle: { "transform": "rotate(5deg)" } }, [_c("use", { attrs: { "xlink:href": "#people" } })])]), _vm.hasMates ? _c("div", { staticClass: "px-4 py-2 text-left text-sm" }, [_vm._m(0), _c("ul", { staticClass: "mt-1 text-gray-100" }, _vm._l(_vm.mates.slice(0, _vm.maxMates), function(mate) {
    return _c("li", { key: mate.name, staticClass: "flex items-center justify-between" }, [_c("router-link", { staticClass: "w-2/4 truncate hover:text-teal-200", attrs: { "to": { name: "summoner", params: { region: _vm.$route.params.region, name: mate.name } } } }, [_vm._v(_vm._s(mate.name))]), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(mate.wins) + " / " + _vm._s(mate.losses))]), _c("div", { staticClass: "w-1/4" }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "h-2 cursor-pointer rounded-full bg-blue-900" }, [_c("div", { staticClass: "h-full rounded-full", class: _vm.getWinrateColor(mate.wins, mate.count), style: { width: `${_vm.winrate(mate.wins, mate.count)}%` } })])];
    }, proxy: true }, { key: "default", fn: function() {
      return [_c("div", { staticClass: "px-2 text-center text-xs text-white" }, [_c("div", [_vm._v("Winrate")]), _c("div", [_c("span", { staticClass: "font-bold", class: _vm.getWinrateColor(mate.wins, mate.count, false) }, [_vm._v(_vm._s(_vm._f("percent")(_vm.winrate(mate.wins, mate.count))))])])])];
    }, proxy: true }], null, true) })], 1)], 1);
  }), 0)]) : _c("div", { staticClass: "px-4 py-2 text-center" }, [_c("div", [_vm._v("No friends have been found.")]), _c("div", [_vm._v("😕")])])])]);
};
var _sfc_staticRenderFns$2 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex items-baseline text-xs font-semibold uppercase text-blue-300" }, [_c("div", { staticClass: "w-2/4 text-base text-blue-400" }, [_vm._v("Summoner")]), _c("div", { staticClass: "w-1/4" }, [_vm._v("Record")]), _c("div", { staticClass: "w-1/4" }, [_vm._v("Winrate")])]);
}];
var __component__$2 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$2,
  _sfc_render$2,
  _sfc_staticRenderFns$2,
  false,
  null,
  null,
  null,
  null
);
const SummonerMates = __component__$2.exports;
const _sfc_main$1 = {
  components: {
    Tooltip
  },
  computed: {
    mostPlayedRole() {
      return Math.max(...this.stats.role.map((r) => r.count), 0);
    },
    globalStatsKeys() {
      const { id, wins, losses, count, time, kp, ...rest } = this.stats.global;
      return rest;
    },
    ...mapState({
      stats: (state) => state.summoner.overview.stats
    })
  },
  methods: {
    calculateWinrate(wins, count) {
      const winrate = count !== 0 ? wins / count * 100 : 0;
      const color = winrate >= 50 ? "text-green-400" : "text-red-400";
      return {
        winrate,
        color
      };
    },
    leagueStatsByType(typeName) {
      return this.stats.league.map((l) => {
        return { ...l, ...gameModes[l.id] };
      }).filter((l) => l.type === typeName);
    },
    roundedRoleLosses(win, count) {
      return win === count ? "rounded-full" : "rounded-b-full";
    },
    roundedRoleWins(win, count) {
      return win === count ? "rounded-full" : "rounded-t-full";
    },
    winLossColor(win, loss) {
      const colors2 = {
        win: "text-gray-200",
        loss: "text-gray-200"
      };
      win >= loss ? colors2.win = "text-green-400" : colors2.loss = "text-red-400";
      return colors2;
    }
  }
};
var _sfc_render$1 = function render14() {
  var _vm = this, _c = _vm._self._c;
  return _vm.stats.global ? _c("div", { staticClass: "mt-4 rounded-lg bg-blue-800" }, [_c("div", { staticClass: "heading relative flex justify-center rounded-t-lg py-4 text-blue-200" }, [_c("svg", { staticClass: "h-6 w-6" }, [_c("use", { attrs: { "xlink:href": "#graph" } })]), _c("span", { staticClass: "mx-4 text-lg font-semibold uppercase" }, [_vm._v("STATS")]), _c("svg", { staticClass: "h-6 w-6", staticStyle: { "transform": "scaleX(-1)" } }, [_c("use", { attrs: { "xlink:href": "#graph" } })]), _c("div", { staticClass: "absolute right-0 top-0 mr-2 mt-3" }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
    return [_c("svg", { staticClass: "h-4 w-4 cursor-pointer" }, [_c("use", { attrs: { "xlink:href": "#info" } })])];
  }, proxy: true }, { key: "default", fn: function() {
    return [_c("div", { staticClass: "select-none px-2 text-center text-sm text-white" }, [_c("div", [_vm._v("Stats based on")]), _c("div", [_c("span", { staticClass: "font-bold text-teal-400" }, [_vm._v(_vm._s(_vm.stats.global.count))]), _vm._v(" matches ")]), _c("div", { staticClass: "mt-2 text-xs font-normal italic leading-tight text-blue-100" }, [_vm._v(" Load more matches "), _c("br"), _vm._v("to have better results. ")])])];
  }, proxy: true }], null, false, 2787527410) })], 1)]), _c("div", { staticClass: "mt-2 flex items-center py-2" }, _vm._l(_vm.stats.role, function(role, index) {
    return _c("div", { key: index, staticClass: "flex w-1/5 flex-col items-center" }, [_c("Tooltip", { scopedSlots: _vm._u([{ key: "trigger", fn: function() {
      return [_c("div", { staticClass: "flex h-12 w-2 cursor-pointer flex-col justify-end rounded-full bg-blue-900" }, [_c("div", { staticClass: "bg-green-400", class: _vm.roundedRoleWins(role.wins, role.count), style: {
        height: role.count * 3 / _vm.mostPlayedRole * role.wins / role.count + "rem"
      } }), _c("div", { staticClass: "bg-red-400", class: _vm.roundedRoleLosses(role.losses, role.count), style: {
        height: role.count * 3 / _vm.mostPlayedRole * role.losses / role.count + "rem"
      } })])];
    }, proxy: true }, { key: "default", fn: function() {
      return [_c("div", { staticClass: "select-none px-2 text-center text-sm text-white" }, [_c("div", [_vm._v(_vm._s(_vm._f("capitalize")(role.role)))]), _c("span", { staticClass: "font-bold", class: _vm.winLossColor(role.wins, role.losses).win }, [_vm._v(_vm._s(role.wins))]), _c("span", { staticClass: "mx-1 font-bold text-gray-400" }, [_vm._v("-")]), _c("span", { staticClass: "font-bold", class: _vm.winLossColor(role.wins, role.losses).loss }, [_vm._v(_vm._s(role.losses))]), _c("div", { staticClass: "mt-1 font-bold", class: _vm.calculateWinrate(role.wins, role.count).color }, [_vm._v(" " + _vm._s(_vm._f("round")(_vm.calculateWinrate(role.wins, role.count).winrate)) + "% ")])])];
    }, proxy: true }], null, true) }), _c("div", { staticClass: "mt-1 h-4 w-4 bg-cover bg-center", style: { backgroundImage: `url(${"/img/roles/" + role.role + ".png"})` } }), _c("div", { staticClass: "text-xs text-blue-200" }, [_vm._v(_vm._s(role.count))])], 1);
  }), 0), _c("div", { staticClass: "py-2 text-center text-sm" }, [_vm._m(0), _c("ul", { staticClass: "mt-1 text-gray-100" }, [_vm._l(_vm.globalStatsKeys, function(stat, name, index) {
    return _c("li", { key: index, staticClass: "flex items-center justify-between px-4 py-1 leading-tight", class: { "bg-blue-760": index % 2 !== 0 } }, [_c("div", { staticClass: "w-1/4 text-left capitalize" }, [_vm._v(_vm._s(name))]), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(_vm._f("kilo")(stat, false)))]), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(_vm._f("round")(stat / (_vm.stats.global.time / 60))))]), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(_vm._f("round")(stat / _vm.stats.global.count)))])]);
  }), _c("li", { staticClass: "flex items-center justify-between bg-blue-760 px-4 py-1 leading-tight" }, [_c("div", { staticClass: "w-1/4 whitespace-nowrap text-left" }, [_vm._v("Time")]), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(_vm._f("secToHours")(_vm.stats.global.time)))]), _c("div", { staticClass: "w-1/4" }), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(_vm._f("secToTime")(_vm.stats.global.time / _vm.stats.global.count, true)))])]), _c("li", { staticClass: "flex items-center justify-between px-4 py-1 leading-tight" }, [_c("div", { staticClass: "w-1/4 whitespace-nowrap text-left" }, [_vm._v("KDA")]), _c("div", { staticClass: "w-1/4" }, [_vm._v(" " + _vm._s(_vm._f("round")((_vm.stats.global.kills + _vm.stats.global.assists) / _vm.stats.global.deaths)) + " ")])]), _c("li", { staticClass: "flex items-center justify-between bg-blue-760 px-4 py-1 leading-tight" }, [_c("div", { staticClass: "w-1/4 whitespace-nowrap text-left" }, [_vm._v("Kill participation")]), _c("div", { staticClass: "w-1/4" }, [_vm._v(_vm._s(_vm._f("percent")(_vm.stats.global.kp)))])])], 2), _vm.leagueStatsByType("Ranked").length ? [_vm._m(1), _c("ul", { staticClass: "mt-1 text-gray-100" }, _vm._l(_vm.leagueStatsByType("Ranked"), function(league, index) {
    return _c("li", { key: index, staticClass: "flex items-center justify-between px-4 py-1 leading-tight", class: { "bg-blue-760": index % 2 !== 0 } }, [_c("div", { staticClass: "w-5/12 text-left capitalize" }, [_vm._v(_vm._s(league.name.toLowerCase()))]), _c("div", { staticClass: "w-3/12", class: _vm.calculateWinrate(league.wins, league.count).color }, [_vm._v(" " + _vm._s(_vm._f("percent")(_vm.calculateWinrate(league.wins, league.count).winrate)) + " ")]), _c("div", { staticClass: "w-4/12" }, [_c("span", { staticClass: "font-semibold", class: _vm.winLossColor(league.wins, league.losses).win }, [_vm._v(_vm._s(league.wins))]), _c("span", { staticClass: "mx-1 font-semibold text-gray-400" }, [_vm._v("-")]), _c("span", { staticClass: "font-semibold", class: _vm.winLossColor(league.wins, league.losses).loss }, [_vm._v(_vm._s(league.losses))])])]);
  }), 0)] : _vm._e(), _vm.leagueStatsByType("Normal").length ? [_vm._m(2), _c("ul", { staticClass: "mt-1 text-gray-100" }, _vm._l(_vm.leagueStatsByType("Normal"), function(league, index) {
    return _c("li", { key: index, staticClass: "flex items-center justify-between px-4 py-1 leading-tight", class: { "bg-blue-760": index % 2 !== 0 } }, [_c("div", { staticClass: "w-5/12 text-left capitalize" }, [_vm._v(_vm._s(league.name.toLowerCase()))]), _c("div", { staticClass: "w-3/12", class: _vm.calculateWinrate(league.wins, league.count).color }, [_vm._v(" " + _vm._s(_vm._f("percent")(_vm.calculateWinrate(league.wins, league.count).winrate)) + " ")]), _c("div", { staticClass: "w-4/12" }, [_c("span", { staticClass: "font-semibold", class: _vm.winLossColor(league.wins, league.losses).win }, [_vm._v(_vm._s(league.wins))]), _c("span", { staticClass: "mx-1 font-semibold text-gray-400" }, [_vm._v("-")]), _c("span", { staticClass: "font-semibold", class: _vm.winLossColor(league.wins, league.losses).loss }, [_vm._v(_vm._s(league.losses))])])]);
  }), 0)] : _vm._e(), _vm._m(3), _c("ul", { staticClass: "mt-1 text-gray-100" }, _vm._l(_vm.stats.class, function(championClass, index) {
    return _c("li", { key: index, staticClass: "flex items-center justify-between px-4 py-1 leading-tight", class: { "bg-blue-760": index % 2 !== 0 } }, [_c("div", { staticClass: "w-5/12 text-left capitalize" }, [_vm._v(_vm._s(championClass.id))]), _c("div", { staticClass: "w-3/12", class: _vm.calculateWinrate(championClass.wins, championClass.count).color }, [_vm._v(" " + _vm._s(_vm._f("percent")(_vm.calculateWinrate(championClass.wins, championClass.count).winrate)) + " ")]), _c("div", { staticClass: "w-4/12" }, [_c("span", { staticClass: "font-semibold", class: _vm.winLossColor(championClass.wins, championClass.losses).win }, [_vm._v(_vm._s(championClass.wins))]), _c("span", { staticClass: "mx-1 font-semibold text-gray-400" }, [_vm._v("-")]), _c("span", { staticClass: "font-semibold", class: _vm.winLossColor(championClass.wins, championClass.losses).loss }, [_vm._v(_vm._s(championClass.losses))])])]);
  }), 0)], 2), _c("div", { staticClass: "flex flex-col items-center pb-2 leading-snug" }, [_c("div", { staticClass: "text-xl text-teal-400" }, [_vm._v(" " + _vm._s(_vm._f("percent")(_vm.calculateWinrate(_vm.stats.global.wins, _vm.stats.global.count).winrate)) + " ")]), _c("div", { staticClass: "flex text-sm" }, [_c("span", { class: _vm.winLossColor(_vm.stats.global.wins, _vm.stats.global.losses).win }, [_vm._v(_vm._s(_vm.stats.global.wins))]), _c("span", { staticClass: "mx-1 font-bold text-gray-400" }, [_vm._v("-")]), _c("span", { class: _vm.winLossColor(_vm.stats.global.wins, _vm.stats.global.losses).loss }, [_vm._v(_vm._s(_vm.stats.global.losses))])]), _c("span", { staticClass: "text-xs" }, [_vm._v("Global winrate")])])]) : _vm._e();
};
var _sfc_staticRenderFns$1 = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex items-baseline px-4 text-xs font-semibold uppercase text-blue-300" }, [_c("div", { staticClass: "w-1/4 text-left text-base text-blue-400" }, [_vm._v("Stat")]), _c("div", { staticClass: "w-1/4" }, [_vm._v("Total")]), _c("div", { staticClass: "w-1/4" }, [_vm._v("Per min")]), _c("div", { staticClass: "w-1/4" }, [_vm._v("Avg")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3 flex items-baseline px-4 text-xs font-semibold uppercase text-blue-300" }, [_c("div", { staticClass: "w-5/12 text-left text-base text-blue-400" }, [_vm._v("Ranked")]), _c("div", { staticClass: "w-3/12" }, [_vm._v("Winrate")]), _c("div", { staticClass: "w-4/12" }, [_vm._v("Record")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3 flex items-baseline px-4 text-xs font-semibold uppercase text-blue-300" }, [_c("div", { staticClass: "w-5/12 text-left text-base text-blue-400" }, [_vm._v("Normal")]), _c("div", { staticClass: "w-3/12" }, [_vm._v("Winrate")]), _c("div", { staticClass: "w-4/12" }, [_vm._v("Record")])]);
}, function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "mt-3 flex items-baseline px-4 text-xs font-semibold uppercase text-blue-300" }, [_c("div", { staticClass: "w-5/12 text-left text-base text-blue-400" }, [_vm._v("Class")]), _c("div", { staticClass: "w-3/12" }, [_vm._v("Winrate")]), _c("div", { staticClass: "w-4/12" }, [_vm._v("Record")])]);
}];
var __component__$1 = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main$1,
  _sfc_render$1,
  _sfc_staticRenderFns$1,
  false,
  null,
  null,
  null,
  null
);
const SummonerStats = __component__$1.exports;
/**
 * Sticky Sidebar v2 JavaScript Plugin.
 * @version 1.0.1
 * @author Øystein Blixhavn <oystein@blixhavn.no>
 * @license The MIT License (MIT)
 */
const StickySidebar = (() => {
  const EVENT_KEY = ".stickySidebar";
  const DEFAULTS = {
    /**
     * Additional top spacing of the element when it becomes sticky.
     * @type {Numeric|Function}
     */
    topSpacing: 0,
    /**
     * Additional bottom spacing of the element when it becomes sticky.
     * @type {Numeric|Function}
     */
    bottomSpacing: 0,
    /**
     * Container sidebar selector to know what the beginning and end of sticky element.
     * @type {String|False}
     */
    containerSelector: false,
    /**
     * Parent element where the scrolling happens.
     */
    scrollContainer: false,
    /**
     * Inner wrapper selector.
     * @type {String}
     */
    innerWrapperSelector: ".inner-wrapper-sticky",
    /**
     * The name of CSS class to apply to elements when they have become stuck.
     * @type {String|False}
     */
    stickyClass: "is-affixed",
    /**
     * The sidebar returns to its normal position if its width below this value.
     * @type {Numeric}
     */
    minWidth: false
  };
  class StickySidebar2 {
    /**
     * Sticky Sidebar Constructor.
     * @constructor
     * @param {HTMLElement|String} sidebar - The sidebar element or sidebar selector.
     * @param {Object} options - The options of sticky sidebar.
     */
    constructor(sidebar, options = {}) {
      this.options = StickySidebar2.extend(DEFAULTS, options);
      this.sidebar = "string" === typeof sidebar ? document.querySelector(sidebar) : sidebar;
      if ("undefined" === typeof this.sidebar)
        throw new Error("There is no specific sidebar element.");
      this.sidebarInner = false;
      this.container = this.sidebar.parentElement;
      this.affixedType = "STATIC";
      this.direction = "down";
      this.support = {
        transform: false,
        transform3d: false
      };
      this._initialized = false;
      this._reStyle = false;
      this._breakpoint = false;
      this.dimensions = {
        translateY: 0,
        maxTranslateY: 0,
        topSpacing: 0,
        lastTopSpacing: 0,
        bottomSpacing: 0,
        lastBottomSpacing: 0,
        sidebarHeight: 0,
        sidebarWidth: 0,
        containerTop: 0,
        containerHeight: 0,
        viewportHeight: 0,
        viewportTop: 0,
        lastViewportTop: 0
      };
      ["handleEvent"].forEach((method) => {
        this[method] = this[method].bind(this);
      });
      this.initialize();
    }
    /**
     * Initializes the sticky sidebar by adding inner wrapper, define its container, 
     * min-width breakpoint, calculating dimensions, adding helper classes and inline style.
     * @private
     */
    initialize() {
      this._setSupportFeatures();
      if (this.options.innerWrapperSelector) {
        this.sidebarInner = this.sidebar.querySelector(this.options.innerWrapperSelector);
        if (null === this.sidebarInner)
          this.sidebarInner = false;
      }
      if (!this.sidebarInner) {
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class", "inner-wrapper-sticky");
        this.sidebar.appendChild(wrapper);
        while (this.sidebar.firstChild != wrapper)
          wrapper.appendChild(this.sidebar.firstChild);
        this.sidebarInner = this.sidebar.querySelector(".inner-wrapper-sticky");
      }
      if (this.options.containerSelector) {
        let containers = document.querySelectorAll(this.options.containerSelector);
        containers = Array.prototype.slice.call(containers);
        containers.forEach((container, item) => {
          if (!container.contains(this.sidebar))
            return;
          this.container = container;
        });
        if (!containers.length)
          throw new Error("The container does not contains on the sidebar.");
      }
      this.scrollContainer = this.options.scrollContainer ? document.querySelector(this.options.scrollContainer) : void 0;
      if ("function" !== typeof this.options.topSpacing)
        this.options.topSpacing = parseInt(this.options.topSpacing) || 0;
      if ("function" !== typeof this.options.bottomSpacing)
        this.options.bottomSpacing = parseInt(this.options.bottomSpacing) || 0;
      this._widthBreakpoint();
      this.calcDimensions();
      this.stickyPosition();
      this.bindEvents();
      this._initialized = true;
    }
    /**
     * Bind all events of sticky sidebar plugin.
     * @protected
     */
    bindEvents() {
      this.eventTarget = this.scrollContainer ? this.scrollContainer : window;
      this.eventTarget.addEventListener("resize", this, { passive: true, capture: false });
      this.eventTarget.addEventListener("scroll", this, { passive: true, capture: false });
      this.sidebar.addEventListener("update" + EVENT_KEY, this);
      if ("undefined" !== typeof ResizeObserver) {
        const resizeObserver = new ResizeObserver(() => this.handleEvent());
        resizeObserver.observe(this.sidebarInner);
        resizeObserver.observe(this.container);
      }
    }
    /**
     * Handles all events of the plugin.
     * @param {Object} event - Event object passed from listener.
     */
    handleEvent(event) {
      this.updateSticky(event);
    }
    /**
     * Calculates dimensions of sidebar, container and screen viewpoint
     * @public
     */
    calcDimensions() {
      if (this._breakpoint)
        return;
      var dims = this.dimensions;
      dims.containerTop = StickySidebar2.offsetRelative(this.container).top;
      dims.containerHeight = this.container.clientHeight;
      dims.containerBottom = dims.containerTop + dims.containerHeight;
      dims.sidebarHeight = this.sidebarInner.offsetHeight;
      dims.sidebarWidth = this.sidebarInner.offsetWidth;
      dims.viewportHeight = window.innerHeight;
      dims.maxTranslateY = dims.containerHeight - dims.sidebarHeight;
      this._calcDimensionsWithScroll();
    }
    /**
     * Some dimensions values need to be up-to-date when scrolling the page.
     * @private
     */
    _calcDimensionsWithScroll() {
      var dims = this.dimensions;
      dims.sidebarLeft = StickySidebar2.offsetRelative(this.sidebar).left;
      if (this.scrollContainer) {
        dims.viewportTop = this.scrollContainer.scrollTop;
        dims.viewportLeft = this.scrollContainer.scrollLeft;
      } else {
        dims.viewportTop = document.documentElement.scrollTop || document.body.scrollTop;
        dims.viewportLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      }
      dims.viewportBottom = dims.viewportTop + dims.viewportHeight;
      dims.topSpacing = this.options.topSpacing;
      dims.bottomSpacing = this.options.bottomSpacing;
      if ("function" === typeof dims.topSpacing)
        dims.topSpacing = parseInt(dims.topSpacing(this.sidebar)) || 0;
      if ("function" === typeof dims.bottomSpacing)
        dims.bottomSpacing = parseInt(dims.bottomSpacing(this.sidebar)) || 0;
      if ("VIEWPORT-TOP" === this.affixedType) {
        if (dims.topSpacing < dims.lastTopSpacing) {
          dims.translateY += dims.lastTopSpacing - dims.topSpacing;
          this._reStyle = true;
        }
      } else if ("VIEWPORT-BOTTOM" === this.affixedType) {
        if (dims.bottomSpacing < dims.lastBottomSpacing) {
          dims.translateY += dims.lastBottomSpacing - dims.bottomSpacing;
          this._reStyle = true;
        }
      }
      dims.lastTopSpacing = dims.topSpacing;
      dims.lastBottomSpacing = dims.bottomSpacing;
    }
    /**
     * Determine whether the sidebar is bigger than viewport.
     * @public
     * @return {Boolean}
     */
    isSidebarFitsViewport() {
      let dims = this.dimensions;
      let offset = this.scrollDirection === "down" ? dims.lastBottomSpacing : dims.lastTopSpacing;
      return this.dimensions.sidebarHeight + offset < this.dimensions.viewportHeight;
    }
    /**
     * Observe browser scrolling direction top and down.
     */
    observeScrollDir() {
      var dims = this.dimensions;
      if (dims.lastViewportTop === dims.viewportTop)
        return;
      var furthest = "down" === this.direction ? Math.min : Math.max;
      if (dims.viewportTop === furthest(dims.viewportTop, dims.lastViewportTop))
        this.direction = "down" === this.direction ? "up" : "down";
    }
    /**
     * Gets affix type of sidebar according to current scroll top and scrolling direction.
     * @public
     * @return {String|False} - Proper affix type.
     */
    getAffixType() {
      this._calcDimensionsWithScroll();
      var dims = this.dimensions;
      var colliderTop = dims.viewportTop + dims.topSpacing;
      var affixType = this.affixedType;
      if (colliderTop <= dims.containerTop || dims.containerHeight <= dims.sidebarHeight) {
        dims.translateY = 0;
        affixType = "STATIC";
      } else {
        affixType = "up" === this.direction ? this._getAffixTypeScrollingUp() : this._getAffixTypeScrollingDown();
      }
      dims.translateY = Math.max(0, dims.translateY);
      dims.translateY = Math.min(dims.containerHeight, dims.translateY);
      dims.translateY = Math.round(dims.translateY);
      dims.lastViewportTop = dims.viewportTop;
      return affixType;
    }
    /**
     * Get affix type while scrolling down.
     * @private
     * @return {String} - Proper affix type of scrolling down direction.
     */
    _getAffixTypeScrollingDown() {
      var dims = this.dimensions;
      var sidebarBottom = dims.sidebarHeight + dims.containerTop;
      var colliderTop = dims.viewportTop + dims.topSpacing;
      var colliderBottom = dims.viewportBottom - dims.bottomSpacing;
      var affixType = this.affixedType;
      if (this.isSidebarFitsViewport()) {
        if (dims.sidebarHeight + colliderTop >= dims.containerBottom) {
          dims.translateY = dims.containerBottom - sidebarBottom;
          affixType = "CONTAINER-BOTTOM";
        } else if (colliderTop >= dims.containerTop) {
          dims.translateY = colliderTop - dims.containerTop;
          affixType = "VIEWPORT-TOP";
        }
      } else {
        if (dims.containerBottom <= colliderBottom) {
          dims.translateY = dims.containerBottom - sidebarBottom;
          affixType = "CONTAINER-BOTTOM";
        } else if (sidebarBottom + dims.translateY <= colliderBottom) {
          dims.translateY = colliderBottom - sidebarBottom;
          affixType = "VIEWPORT-BOTTOM";
        } else if (dims.containerTop + dims.translateY <= colliderTop && (0 !== dims.translateY && dims.maxTranslateY !== dims.translateY)) {
          affixType = "VIEWPORT-UNBOTTOM";
        }
      }
      return affixType;
    }
    /**
     * Get affix type while scrolling up.
     * @private
     * @return {String} - Proper affix type of scrolling up direction.
     */
    _getAffixTypeScrollingUp() {
      var dims = this.dimensions;
      var sidebarBottom = dims.sidebarHeight + dims.containerTop;
      var colliderTop = dims.viewportTop + dims.topSpacing;
      var colliderBottom = dims.viewportBottom - dims.bottomSpacing;
      var affixType = this.affixedType;
      if (colliderTop <= dims.translateY + dims.containerTop) {
        dims.translateY = colliderTop - dims.containerTop;
        affixType = "VIEWPORT-TOP";
      } else if (dims.containerBottom <= colliderBottom) {
        dims.translateY = dims.containerBottom - sidebarBottom;
        affixType = "CONTAINER-BOTTOM";
      } else if (!this.isSidebarFitsViewport()) {
        if (dims.containerTop <= colliderTop && (0 !== dims.translateY && dims.maxTranslateY !== dims.translateY)) {
          affixType = "VIEWPORT-UNBOTTOM";
        }
      }
      return affixType;
    }
    /**
     * Gets inline style of sticky sidebar wrapper and inner wrapper according 
     * to its affix type.
     * @private
     * @param {String} affixType - Affix type of sticky sidebar.
     * @return {Object}
     */
    _getStyle(affixType) {
      if ("undefined" === typeof affixType)
        return;
      var style = { inner: {}, outer: {} };
      var dims = this.dimensions;
      switch (affixType) {
        case "VIEWPORT-TOP":
          style.inner = {
            position: "fixed",
            top: dims.topSpacing,
            left: dims.sidebarLeft - dims.viewportLeft,
            width: dims.sidebarWidth
          };
          break;
        case "VIEWPORT-BOTTOM":
          style.inner = {
            position: "fixed",
            top: "auto",
            left: dims.sidebarLeft,
            bottom: dims.bottomSpacing,
            width: dims.sidebarWidth
          };
          break;
        case "CONTAINER-BOTTOM":
        case "VIEWPORT-UNBOTTOM":
          let translate = this._getTranslate(0, dims.translateY + "px");
          if (translate)
            style.inner = { transform: translate };
          else
            style.inner = { position: "absolute", top: dims.translateY, width: dims.sidebarWidth };
          break;
      }
      switch (affixType) {
        case "VIEWPORT-TOP":
        case "VIEWPORT-BOTTOM":
        case "VIEWPORT-UNBOTTOM":
        case "CONTAINER-BOTTOM":
          style.outer = { height: dims.sidebarHeight, position: "relative" };
          break;
      }
      style.outer = StickySidebar2.extend({ height: "", position: "" }, style.outer);
      style.inner = StickySidebar2.extend({
        position: "relative",
        top: "",
        left: "",
        bottom: "",
        width: "",
        transform: ""
      }, style.inner);
      return style;
    }
    /**
     * Cause the sidebar to be sticky according to affix type by adding inline
     * style, adding helper class and trigger events.
     * @function
     * @protected
     * @param {string} force - Update sticky sidebar position by force.
     */
    stickyPosition(force) {
      if (this._breakpoint)
        return;
      force = this._reStyle || force || false;
      this.options.topSpacing;
      this.options.bottomSpacing;
      var affixType = this.getAffixType();
      var style = this._getStyle(affixType);
      if ((this.affixedType != affixType || force) && affixType) {
        let affixEvent = "affix." + affixType.toLowerCase().replace("viewport-", "") + EVENT_KEY;
        StickySidebar2.eventTrigger(this.sidebar, affixEvent);
        if ("STATIC" === affixType)
          StickySidebar2.removeClass(this.sidebar, this.options.stickyClass);
        else
          StickySidebar2.addClass(this.sidebar, this.options.stickyClass);
        for (let key in style.outer) {
          let unit = "number" === typeof style.outer[key] ? "px" : "";
          this.sidebar.style[key] = style.outer[key] + unit;
        }
        for (let key in style.inner) {
          let unit = "number" === typeof style.inner[key] ? "px" : "";
          this.sidebarInner.style[key] = style.inner[key] + unit;
        }
        let affixedEvent = "affixed." + affixType.toLowerCase().replace("viewport-", "") + EVENT_KEY;
        StickySidebar2.eventTrigger(this.sidebar, affixedEvent);
      } else {
        if (this._initialized)
          this.sidebarInner.style.left = style.inner.left;
      }
      this.affixedType = affixType;
    }
    /**
     * Breakdown sticky sidebar when window width is below `options.minWidth` value.
     * @protected
     */
    _widthBreakpoint() {
      if (window.innerWidth <= this.options.minWidth) {
        this._breakpoint = true;
        this.affixedType = "STATIC";
        this.sidebar.removeAttribute("style");
        StickySidebar2.removeClass(this.sidebar, this.options.stickyClass);
        this.sidebarInner.removeAttribute("style");
      } else {
        this._breakpoint = false;
      }
    }
    /**
     * Switches between functions stack for each event type, if there's no 
     * event, it will re-initialize sticky sidebar.
     * @public
     */
    updateSticky(event = {}) {
      if (this._running)
        return;
      this._running = true;
      ((eventType) => {
        requestAnimationFrame(() => {
          switch (eventType) {
            case "scroll":
              this._calcDimensionsWithScroll();
              this.observeScrollDir();
              this.stickyPosition();
              break;
            case "resize":
            default:
              this._widthBreakpoint();
              this.calcDimensions();
              this.stickyPosition(true);
              break;
          }
          this._running = false;
        });
      })(event.type);
    }
    /**
     * Set browser support features to the public property.
     * @private
     */
    _setSupportFeatures() {
      var support = this.support;
      support.transform = StickySidebar2.supportTransform();
      support.transform3d = StickySidebar2.supportTransform(true);
    }
    /**
     * Get translate value, if the browser supports transfrom3d, it will adopt it.
     * and the same with translate. if browser doesn't support both return false.
     * @param {Number} y - Value of Y-axis.
     * @param {Number} x - Value of X-axis.
     * @param {Number} z - Value of Z-axis.
     * @return {String|False}
     */
    _getTranslate(y = 0, x = 0, z = 0) {
      if (this.support.transform3d)
        return "translate3d(" + y + ", " + x + ", " + z + ")";
      else if (this.support.translate)
        return "translate(" + y + ", " + x + ")";
      else
        return false;
    }
    /**
     * Destroy sticky sidebar plugin.
     * @public
     */
    destroy() {
      window.removeEventListener("resize", this, { capture: false });
      window.removeEventListener("scroll", this, { capture: false });
      this.sidebar.classList.remove(this.options.stickyClass);
      this.sidebar.style.minHeight = "";
      this.sidebar.removeEventListener("update" + EVENT_KEY, this);
      var styleReset = { inner: {}, outer: {} };
      styleReset.inner = { position: "", top: "", left: "", bottom: "", width: "", transform: "" };
      styleReset.outer = { height: "", position: "" };
      for (let key in styleReset.outer)
        this.sidebar.style[key] = styleReset.outer[key];
      for (let key in styleReset.inner)
        this.sidebarInner.style[key] = styleReset.inner[key];
      if (this.options.resizeSensor && "undefined" !== typeof ResizeSensor) {
        ResizeSensor.detach(this.sidebarInner, this.handleEvent);
        ResizeSensor.detach(this.container, this.handleEvent);
      }
    }
    /**
     * Determine if the browser supports CSS transform feature.
     * @function
     * @static
     * @param {Boolean} transform3d - Detect transform with translate3d.
     * @return {String}
     */
    static supportTransform(transform3d) {
      var result = false, property = transform3d ? "perspective" : "transform", upper = property.charAt(0).toUpperCase() + property.slice(1), prefixes = ["Webkit", "Moz", "O", "ms"], support = document.createElement("support"), style = support.style;
      (property + " " + prefixes.join(upper + " ") + upper).split(" ").forEach(function(property2, i) {
        if (style[property2] !== void 0) {
          result = property2;
          return false;
        }
      });
      return result;
    }
    /**
     * Trigger custom event.
     * @static
     * @param {DOMObject} element - Target element on the DOM.
     * @param {String} eventName - Event name.
     * @param {Object} data - 
     */
    static eventTrigger(element, eventName, data) {
      try {
        var event = new CustomEvent(eventName, { detail: data });
      } catch (e) {
        var event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, data);
      }
      element.dispatchEvent(event);
    }
    /**
     * Extend options object with defaults.
     * @function
     * @static
     */
    static extend(defaults, options) {
      var results = {};
      for (let key in defaults) {
        if ("undefined" !== typeof options[key])
          results[key] = options[key];
        else
          results[key] = defaults[key];
      }
      return results;
    }
    /**
     * Get current coordinates left and top of specific element.
     * @static
     */
    static offsetRelative(element) {
      var result = { left: 0, top: 0 };
      do {
        let offsetTop = element.offsetTop;
        let offsetLeft = element.offsetLeft;
        if (!isNaN(offsetTop))
          result.top += offsetTop;
        if (!isNaN(offsetLeft))
          result.left += offsetLeft;
        element = "BODY" === element.tagName ? element.parentElement : element.offsetParent;
      } while (element);
      return result;
    }
    /**
     * Add specific class name to specific element.
     * @static 
     * @param {ObjectDOM} element 
     * @param {String} className 
     */
    static addClass(element, className) {
      if (!StickySidebar2.hasClass(element, className)) {
        if (element.classList)
          element.classList.add(className);
        else
          element.className += " " + className;
      }
    }
    /**
     * Remove specific class name to specific element
     * @static
     * @param {ObjectDOM} element 
     * @param {String} className 
     */
    static removeClass(element, className) {
      if (StickySidebar2.hasClass(element, className)) {
        if (element.classList)
          element.classList.remove(className);
        else
          element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
      }
    }
    /**
     * Determine weather the element has specific class name.
     * @static
     * @param {ObjectDOM} element 
     * @param {String} className 
     */
    static hasClass(element, className) {
      if (element.classList)
        return element.classList.contains(className);
      else
        return new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
    }
    /**
     * Gets default values of configuration options.
     * @static
     * @return {Object} 
     */
    static get defaults() {
      return DEFAULTS;
    }
  }
  return StickySidebar2;
})();
window.StickySidebar = StickySidebar;
var script = {
  name: "vue-sticky-sidebar",
  props: {
    rootClass: {
      type: String,
      default: ""
    },
    topSpacing: {
      type: [Number, Function],
      default: 0
    },
    bottomSpacing: {
      type: [Number, Function],
      default: 0
    },
    containerSelector: {
      type: [String, Boolean],
      default: false
    },
    stickyClass: {
      type: [String, Boolean],
      default: false
    },
    minWidth: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      stickySidebar: null
    };
  },
  mounted() {
    this.stickySidebar = new StickySidebar(this.$refs.stickySidebar, {
      topSpacing: this.topSpacing,
      bottomSpacing: this.bottomSpacing,
      containerSelector: this.containerSelector,
      innerWrapperSelector: ".inner-wrapper-sticky",
      stickyClass: this.stickyClass,
      minWidth: this.minWidth
    });
  }
};
function normalizeComponent(template, style, script2, scopeId, isFunctionalTemplate, moduleIdentifier, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== "boolean") {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  }
  const options = typeof script2 === "function" ? script2.options : script2;
  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true;
    if (isFunctionalTemplate) {
      options.functional = true;
    }
  }
  if (scopeId) {
    options._scopeId = scopeId;
  }
  let hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (style) {
        style.call(this, createInjectorSSR(context));
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function(context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function(context) {
      style.call(this, createInjector(context));
    };
  }
  if (hook) {
    if (options.functional) {
      const originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return script2;
}
const __vue_script__ = script;
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", {
    ref: "stickySidebar"
  }, [_c("div", {
    staticClass: "inner-wrapper-sticky"
  }, [_vm._t("default")], 2)]);
};
var __vue_staticRenderFns__ = [];
const __vue_inject_styles__ = void 0;
const __vue_scope_id__ = void 0;
const __vue_module_identifier__ = void 0;
const __vue_is_functional_template__ = false;
const __vue_component__ = /* @__PURE__ */ normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, void 0, void 0, void 0);
const install = function installVueStickySidebar(Vue) {
  if (install.installed)
    return;
  install.installed = true;
  Vue.component("VueStickySidebar", __vue_component__);
};
__vue_component__.install = install;
const Summoner_vue_vue_type_style_index_0_scoped_2bcfc231_lang = "";
const _sfc_main = {
  components: {
    LiveMatch,
    LoadingButton,
    Match,
    OverviewLoader,
    SummonerChampions,
    SummonerMates,
    SummonerStats,
    VueStickySidebar: __vue_component__
  },
  computed: {
    ...mapState({
      current: (state) => state.summoner.live.match,
      overview: (state) => state.summoner.overview
    }),
    ...mapGetters("summoner", ["matchesLoading", "overviewLoaded", "summonerFound"])
  },
  watch: {
    overviewLoaded() {
      this.fetchData();
    },
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
      if (!this.overviewLoaded && this.summonerFound) {
        this.overviewRequest();
      } else if (this.overviewLoaded && this.summonerFound && this.overview.matches.length > 10) {
        this.sliceOverviewMatches(10);
      }
    },
    ...mapActions("cdragon", ["getRunes"]),
    ...mapActions("summoner", ["moreMatches", "overviewRequest", "sliceOverviewMatches"])
  },
  metaInfo() {
    return {
      title: "Summoner Overview"
    };
  }
};
var _sfc_render = function render15() {
  var _vm = this, _c = _vm._self._c;
  return _vm.overviewLoaded ? _c("div", { key: "overview", staticClass: "vue-sticky-container relative mt-3 flex items-start justify-between text-center" }, [_c("VueStickySidebar", { staticClass: "sidebar z-40", attrs: { "top-spacing": 48, "bottom-spacing": 123, "container-selector": ".vue-sticky-container" } }, [_c("SummonerChampions"), _c("SummonerStats"), _c("SummonerMates")], 1), _c("div", { staticClass: "w-9/12" }, [_vm.current && _vm.current.participants ? _c("div", { staticClass: "mb-4" }, [_c("LiveMatch")], 1) : _vm._e(), _vm.overview.matches.length ? _c("div", [_c("ul", _vm._l(_vm.overview.matches, function(match, index) {
    return _c("Match", { key: index, attrs: { "data": _vm.overview.matches[index], "index-match": index } });
  }), 1), _vm.overview.moreMatchesToFetch ? _c("LoadingButton", { attrs: { "loading": _vm.matchesLoading, "btn-class": "block px-4 py-2 mx-auto mt-4 font-semibold bg-blue-800 rounded-md shadow-lg hover:bg-blue-1000" }, on: { "clicked": _vm.moreMatches } }, [_vm._v("More matches")]) : _vm._e()], 1) : _c("div", [_vm._m(0)])])], 1) : _c("div", [_c("OverviewLoader")], 1);
};
var _sfc_staticRenderFns = [function() {
  var _vm = this, _c = _vm._self._c;
  return _c("div", { staticClass: "flex justify-center" }, [_c("div", { staticClass: "bg-gradient rounded-lg px-4 py-3 text-center text-lg font-bold text-blue-100" }, [_c("div", [_vm._v("No matches found.")]), _c("div", [_vm._v("😕")])])]);
}];
var __component__ = /* @__PURE__ */ normalizeComponent$1(
  _sfc_main,
  _sfc_render,
  _sfc_staticRenderFns,
  false,
  null,
  "2bcfc231",
  null,
  null
);
const Summoner = __component__.exports;
export {
  Summoner as default
};
