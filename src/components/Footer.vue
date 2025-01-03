<template name="FooterComponenet">

  <q-footer v-if="isLoggedIn && user.user_type <= 1" bordered class="bg-light-blue-9 glossy text-white">

    <q-tabs no-caps active-color="white" indicator-color="transparent" v-model="tab">

      <q-tab :disable="(tab === 'home') ? true : false" name="home" v-ripple>
        <q-icon name="home" size="md" />
      </q-tab>

      <q-tab :disable="(tab === 'add_prestation') ? true : false" name="add_prestation" v-ripple>
        <q-icon name="add" size="md" />
      </q-tab>

      <q-tab :disable="(tab === 'list_prestations') ? true : false" name="list_prestations" v-ripple>
        <q-icon name="list_alt" size="md" />
      </q-tab>

    </q-tabs>

  </q-footer>

</template>

<script>
import { defineComponent } from 'vue'
import { SessionStorage, useQuasar } from 'quasar'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'

const tab = ref('')

export default defineComponent({
  name: 'FooterComponent',
  setup () {

    const $q = useQuasar()
    const userStore = useUserStore()
    const { isLoggedIn, user } = storeToRefs(userStore)

    return {
      user,
      isLoggedIn: isLoggedIn,
      tab,
      onLine: navigator.onLine,
      connectionNotif () {

        $q.notify({
          timeout: 2000,
          group: true,
          progress: true,
          icon: 'fa-solid fa-wifi',
          color: 'green-5',
          textColor: 'white',
          classes: 'glossy',
          message: 'La connexion à l\'application est de nouveau opérationnelle !'
        })

      },
      connectionNotif2 () {

        $q.notify({
          timeout: 2000,
          group: true,
          progress: true,
          icon: 'signal_wifi_off',
          color: 'red-5',
          textColor: 'white',
          classes: 'glossy',
          message: 'Pour accéder à l\'application, veuillez vous connecter à internet !'
        })

      },
    }

  },
  methods: {
    updateOnlineStatus (e) {
      if (e.type == "offline") this.connectionNotif2()
      if (e.type == "online") this.connectionNotif()
    }
  },
  watch: {
    onLine (v) {
      if (v) {
        this.showBackOnline = true
        setTimeout(() => {
          this.showBackOnline = false
        }, 1000)
      }
    }
  },
  mounted () {

    // Menu Tab Footer
    if (this.$route.path === '/') {
      tab.value = 'home'
    } else {
      tab.value = 'home'
    }

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
          $q.notify({
            timeout: 2000,
            group: true,
            icon: 'signal_wifi_off',
            progress: true,
            color: 'red-5',
            textColor: 'white',
            message: 'our accéder à l\'application, veuillez vous connecter à internet !'
          })
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
