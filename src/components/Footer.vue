<template name="FooterComponenet">

  <q-footer v-if="isLoggedIn && userType <= 1" bordered class="bg-light-blue-9 glossy text-white">

    <q-tabs no-caps active-color="white" indicator-color="transparent" v-model="tab">

      <q-tab :disable="(pageActuel === '') ? true : false" @click="this.$router.push('/')" name="home" v-ripple>
        <q-icon name="home" size="sm" />
        <q-item-label
          :style="(pageActuel === '') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Accueil</q-item-label>
      </q-tab>

      <q-tab :disable="(pageActuel === 'myaccountaddprestation') ? true : false"
        @click="this.$router.push('/my-account/add-prestation')" name="add_prestation" v-ripple>
        <q-icon name="add" size="sm" />
        <q-item-label
          :style="(pageActuel === 'addprestation') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Prestation</q-item-label>
      </q-tab>

      <q-tab :disable="(pageActuel === 'list_prestations') ? true : false" name="list_prestations" v-ripple>
        <q-icon name="list_alt" size="sm" />
        <q-item-label
          :style="(pageActuel === 'add_prestation') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Prestations</q-item-label>
      </q-tab>

      <q-tab v-if="userType >= 2" :disable="(pageActuel === 'myaccountinbox') ? true : false"
        @click="this.$router.push('/my-account/inbox')" name="mail" v-ripple>
        <q-icon v-if="pageActuel !== 'myaccountinbox'" name="mail" size="sm" />
        <q-icon v-else name="drafts" size="sm" />
        <q-item-label
          :style="(pageActuel === 'myaccountinbox') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Courriers</q-item-label>
      </q-tab>

      <q-tab :disable="(pageActuel === 'contact') ? true : false" @click="this.$router.push('/contact')" name="contact"
        v-ripple>
        <q-icon name="chat" size="sm" />
        <q-item-label
          :style="(pageActuel === 'contact') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Contact</q-item-label>
      </q-tab>

    </q-tabs>

  </q-footer>

  <q-footer v-if="isLoggedIn && user.user_type >= 2" bordered class="bg-light-blue-9 glossy text-white">

    <q-tabs no-caps active-color="white" indicator-color="transparent" v-model="tab">

      <q-tab :disable="(pageActuel === '') ? true : false" @click="this.$router.push('/')" name="home" v-ripple>
        <q-icon name="home" size="sm" />
        <q-item-label
          :style="(pageActuel === '') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Accueil</q-item-label>
      </q-tab>

      <q-tab :disable="(pageActuel === 'myaccountinbox') ? true : false" @click="this.$router.push('/my-account/inbox')"
        name="mail" v-ripple>
        <q-icon v-if="pageActuel !== 'myaccountinbox'" name="mail" size="sm" />
        <q-icon v-else name="drafts" size="sm" />
        <q-item-label
          :style="(pageActuel === 'myaccountinbox') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Courriers</q-item-label>
      </q-tab>

      <q-tab :disable="(pageActuel === 'contact') ? true : false" @click="this.$router.push('/contact')" name="contact"
        v-ripple>
        <q-icon name="chat" size="sm" />
        <q-item-label
          :style="(pageActuel === 'contact') ? 'font-weight: bold;margin-top: 3px; font-size: 12px;' : 'margin-top: 3px; font-size: 12px;'">Contact</q-item-label>
      </q-tab>

    </q-tabs>

  </q-footer>

</template>

<script>
import { defineComponent } from 'vue'
import { SessionStorage, useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from 'stores/user'

const tab = ref(''),
  pageActuel = ref(''),
  userType = ref(0)

export default defineComponent({
  name: 'FooterComponent',
  setup () {

    const $q = useQuasar()
    const router = useRouter()
    const userStore = useUserStore()
    const { isLoggedIn, user } = storeToRefs(userStore)

    pageActuel.value = String(router.currentRoute.value.href).replaceAll('/', '').replaceAll('-', '')

    if (isLoggedIn.value) userType.value = userStore.stateUser.user.user_type
    else userType.value = 0

    return {
      userType,
      pageActuel,
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
