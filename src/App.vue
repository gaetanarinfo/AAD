<template>
  <router-view v-if="show === true" />

  <transition v-if="show === false" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

    <div class="loadings">

      <div></div>

      <div>
      </div>

      <div class="q-pa-md w-100">
        <q-linear-progress size="5px" dark indeterminate spinner-color="blue-10" color="blue-10" class="q-mt-sm" />
      </div>

    </div>

  </transition>

</template>

<script>

import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { SessionStorage, useQuasar } from 'quasar'
import axios from 'axios'
import { ref } from 'vue'

const showBackOnline = ref(true)

export default defineComponent({
  name: 'App',
  components: {
  },
  setup () {

    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    // Verification user si il existe et bien connecté
    if (showBackOnline.value) {

      if (SessionStorage.getItem('token') !== null) {

        axios.get(process.env.API + '/api/user/authenticate/' + SessionStorage.getItem('token'))
          .then(res => {

            if (res.data.authenticate.user !== undefined) {
              userStore.$state.stateUser.user = res.data.authenticate.user;

              if (res.data.authenticate.user.user_type >= 2) {
                userStore.$state.stateUser.companie = res.data.authenticate.companie;
              }

            }

          })

      }

    }

    return {
      user,
      showBackOnline,
    }

  },
  data () {
    return {
      show: false,
    }
  },
  methods: {
    updateOnlineStatus (e) {
      if (e.type == "offline") connexionState.value = false
      if (e.type == "online") connexionState.value = true
    },
    showLoading () {
      // hiding
      setTimeout(() => {
        document.querySelector('html').classList.remove('animateBackground')
        this.show = true
      }, 5500)
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
  beforeUnmount () {
    // hiding in 1.500s
    setTimeout(() => {
      this.$q.loading.hide()
    }, 5500)
  },
  computed: {
  },
  mounted () {
    this.showLoading()

    SessionStorage.setItem('card_pro', false)

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
