<template name="404Page">

  <q-page :class="(!connexionState) ? 'disabled q-page q-page-start' : 'q-page q-page-start'" :style-fn="heightAuto">

    <!-- Loader -->
    <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
        <q-spinner-tail size="50px" color="light-blue-9" />
      </div>

    </transition>

    <transition v-show="bloc_show" appear enter-active-class="animated fadeIn"
      style="margin-top: 30px;margin-bottom: 30px;" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column">

        <h1 class="h1 text-center">404</h1>

        <h2 class="h2">Nous ne trouvons pas cette page</h2>

        <q-img spinner-color="light-blue-9" style="max-width: 350px;margin-bottom: 2rem;" src="~assets/404.avif" />

        <p class="p">Nous sommes presque sûrs que cette page se trouvait ici, mais elle semble avoir disparu. Nous nous
          excusons
          pour cela.</p>

        <q-btn @click="this.$router.push('/')" padding="md" v-ripple color="light-blue-9"
          style="font-weight: 600;min-width: 200px;font-size: 18px;" glossy dense size="md">Accueil</q-btn>

      </div>

    </transition>

  </q-page>

</template>


<script>

import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router"
import { SessionStorage, useQuasar, exportFile } from 'quasar'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  bloc_show = ref(false)

export default defineComponent({
  name: '404Page',
  components: {
  },
  setup () {

    const userStore = useUserStore()
    const router = useRouter()
    const $q = useQuasar()

    return {
      bloc_show,
      moment: moment,
      loader,
      logo,
      onLine: navigator.onLine,
      connexionState,
      folderAPI,
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

    bloc_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      bloc_show.value = true
    }, 4000);

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
