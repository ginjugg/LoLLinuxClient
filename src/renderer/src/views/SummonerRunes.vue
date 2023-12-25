<template>  
  <div v-if="isLoading">
    Loading ClientData...
  </div>
  <div v-else>
    <RunesContainerWithoutTransition />
  </div>
</template>
<script>
/** CustomMade by Ginju */

import { openedClient } from '../mixins/Test.ts'
import store from '@/store'
import RunesContainerWithoutTransition from '@/components/Match/Runes/RunesContainerWithoutTransition.vue'

async function waitData() {
  const testdata = await openedClient()
  console.log('Testdata:', testdata)
  return testdata;
}

export default {
  components: {
    RunesContainerWithoutTransition,
  },
  computed: {
    console: () => console,
    window: () => window,
  },
  data () {
    return {
        isLoading: true,
        player: {
          perks: {
            primaryStyle: 0,
            secondaryStyle: 0,
            selected: []
          },
        },
        // other data
    }
  },
  async mounted() {
    const clientData = await waitData();
    //this.data = JSON.stringify(clientData, null, 2);

    store.state.cdragon.selectedRunes.primaryStyle = clientData.CurrentRunePage.primaryStyleId;
    store.state.cdragon.selectedRunes.secondaryStyle = clientData.CurrentRunePage.subStyleId;
    store.state.cdragon.selectedRunes.selected = clientData.CurrentRunePage.selectedPerkIds;

    //console.log('store.state:', store.state)
    store.state.runesOpen = true;
    this.isLoading = false;

    //this.summonerName = data.SummonerData.displayName;
    //this.games = data.MatchesData.games.games;
  },
}


</script>