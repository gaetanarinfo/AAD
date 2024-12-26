<template>
  <q-page :class="(!connexionState) ? 'disabled flex flex-center' : 'flex flex-center'" :style-fn="heightAuto"
    style="padding: 0px 1rem;display: grid;grid-template-columns: 1fr;align-items: center;align-content: space-evenly;justify-content: center;min-height: 90vh;position: relative;">

    <Section1Component :connexionState="connexionState" />

    <Section2Component />

    <FooterComponent />

  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import { ref } from 'vue'

import Section1Component from 'components/home/Section1.vue'
import Section2Component from 'components/home/Section2.vue'
import FooterComponent from 'components/Footer.vue'

const connexionState = ref(true)

export default defineComponent({
  name: 'IndexPage',
  components: {
    Section1Component,
    Section2Component,
    FooterComponent
  },
  setup () {
    return {
      onLine: navigator.onLine,
      connexionState
    }
  },
  methods: {
    updateOnlineStatus (e) {
      if (e.type == "offline") connexionState.value = false
      if (e.type == "online") connexionState.value = true
    },
    heightAuto (offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration

      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `auto` : 'auto' }
    }
  },
  watch: {
    onLine (v) {
      if (v) {
        connexionState.value = true
        setTimeout(() => {
          connexionState.value = false
        }, 1000)
      }
    }
  },
  mounted () {

    window.addEventListener('online', this.updateOnlineStatus)
    window.addEventListener('offline', this.updateOnlineStatus)

    document.addEventListener("deviceready", function () {

      const networkState = navigator.connection.type

      const states = {}
      // eslint-disable-next-line no-undef
      states[Connection.UNKNOWN] = false
      // eslint-disable-next-line no-undef
      states[Connection.ETHERNET] = true
      // eslint-disable-next-line no-undef
      states[Connection.WIFI] = true
      // eslint-disable-next-line no-undef
      states[Connection.CELL_2G] = false
      // eslint-disable-next-line no-undef
      states[Connection.CELL_3G] = true
      // eslint-disable-next-line no-undef
      states[Connection.CELL_4G] = true
      // eslint-disable-next-line no-undef
      states[Connection.CELL] = false
      // eslint-disable-next-line no-undef
      states[Connection.NONE] = false

      if (states[networkState] === true) {
        //
      } else {
        setInterval(() => {
          connexionState.value = states[networkState]
        }, 5000)
      }

    })

  },
  beforeDestroy () {
    window.removeEventListener('online', this.updateOnlineStatus)
    window.removeEventListener('offline', this.updateOnlineStatus)
  },

})

</script>
