<template name="FooterComponenet">

</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'FooterComponent',
  setup () {

    const $q = useQuasar()

    return {
      onLine: navigator.onLine,
      connectionNotif () {

        $q.notify({
          timeout: 1000,
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
          timeout: 1000,
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
            timeout: 1000,
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
