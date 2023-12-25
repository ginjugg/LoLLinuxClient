<template>
  <div v-if="isLoading">
    Loading ClientData...
  </div>
  <div v-else>
     <pre>
      {{ data }}
     </pre>
  </div>
</template>

<script>
/** CustomMade by Ginju */

import { openedClient } from '../mixins/Test.ts'
//import { nextTick, ref, getCurrentInstance } from 'vue';

//const renderComponent = ref(true)


async function waitData() {
  const testdata = await openedClient()
  console.log('Testdata:', testdata)
  return testdata;
}

export default { 
  computed: {
    console: () => console,
    window: () => window,
  },
  data () {
    return {
        isLoading: true,
        // other data
    }
  },
  async mounted() {
    const clientData = await waitData();
    this.isLoading = false;
    this.data = JSON.stringify(clientData, null, 2);
    //this.summonerName = data.SummonerData.displayName;
    //this.games = data.MatchesData.games.games;
  }
}



</script>