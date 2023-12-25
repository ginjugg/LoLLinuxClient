<template>
    <div class="relative flex h-full items-start px-4 py-2">
        <div class="w-1/2">
        <div>
          <h1>
            DefaultRunes from Client:
          </h1>
        </div>
        <RuneStyle :primary="true" :rune-style="primaryStyle" />
        </div>
        <div class="w-1/2">
        <RuneStyle :primary="false" :rune-style="secondaryStyle" />
        </div>
    </div>
  </template>
  
  <script>
/** Custom Made by Ginju 
 * 
 * It's basically RunesContainter but without transition effect for the "Runes Import Page"
 * 
*/

  import { mapActions, mapState } from 'vuex'
  import { createCDragonAssetUrl } from '@/helpers/functions'
  import LazyBackground from '@/components/Common/LazyBackgroundImage.vue'
  import RuneStyle from '@/components/Match/Runes/RuneStyle.vue'
  
  export default {
    components: {
      LazyBackground,
      RuneStyle,
    },
  
    computed: {
      primaryStyle() {
        return this.runes.perkstyles[this.selectedRunes.primaryStyle]
      },
      secondaryStyle() {
        return this.runes.perkstyles[this.selectedRunes.secondaryStyle]
      },
      ...mapState({
        runes: (state) => state.cdragon.runes,
        runesOpen: (state) => state.cdragon.runesOpen,
        selectedRunes: (state) => state.cdragon.selectedRunes,
      }),
    },
  
    created() {
      document.addEventListener('keydown', this.handleEscape)
    },
  
    beforeDestroy() {
      document.removeEventListener('keydown', this.handleEscape)
    },
  
    methods: {
      close() {
        this.hideRunes({})
      },
      handleEscape(e) {
        if (e.key === 'Esc' || e.key === 'Escape') {
          this.hideRunes({})
        }
      },
      createCDragonAssetUrl,
      ...mapActions('cdragon', ['hideRunes']),
    },
  }
  </script>
  