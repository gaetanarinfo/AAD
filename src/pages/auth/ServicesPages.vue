<template name="ServicesPages">

  <q-page :class="(!connexionState) ? 'disabled q-page q-page-start' : 'q-page q-page-start'" :style-fn="heightAuto">

    <!-- Logo -->
    <transition v-show="logo" appear enter-active-class="animated fadeIn" style="margin-top: 30px;"
      leave-active-class="animated fadeOut">
      <div class="w-100 flex flex-center column form-w">

        <q-img src="~assets/logo.png" spinner-color="light-blue-9" style="max-width: 150px; min-height: 150px"
          alt="AAD - Services à la personne"></q-img>

        <div class="wrapper">
          <div class="line"></div>
          <h1 class="title text-center">
            AAD
          </h1>
          <div class="line"></div>
        </div>
        <p class="title">Services à la personne</p>

      </div>
    </transition>

    <!-- Loader -->
    <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
        <q-spinner-tail size="50px" color="light-blue-9" />
      </div>

    </transition>

    <transition v-show="services_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-bottom: 1rem;margin-top: 1rem;">Mes prestations</h5>

        <p style="margin-bottom: 2rem;text-transform: initial; letter-spacing: normal;font-size: 16px;"
          class="text-grey-7">Les
          services
          seront visibles
          pour tous les clients
          qui décident de faire
          appel à votre entreprise.</p>

        <q-list bordered separator style="margin-bottom: 32px;" class="w-100">

          <q-item v-for="service in services">

            <q-item-section style="width: 50px; height: 30px; max-width: 30px;">
              <q-img style="width: 30px; height: 30px;" :src="folderAPI + '/services/' + service.icone" />
            </q-item-section>

            <q-item-section class="text-left" style="margin-left: 16px;">
              <q-item-label>{{ service.name }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-toggle color="light-blue-9" checked-icon="check" :val="service.id" unchecked-icon="clear" keep-color
                v-model="toggleService" @click="toggleServices()" />
            </q-item-section>

          </q-item>

        </q-list>

      </div>

    </transition>

    <FooterComponent />

  </q-page>

</template>

<script>

import { defineComponent } from 'vue'
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from "vue-router"
import { SessionStorage, useQuasar } from 'quasar'
import { ref } from 'vue'
import axios from 'axios'
import FooterComponent from 'components/Footer.vue'

const connexionState = ref(true),
  services = ref([]),
  folderAPI = ref(process.env.API),
  toggleService = ref([]),
  logo = ref(false),
  services_show = ref(false),
  loader = ref(true)

export default defineComponent({
  name: 'ServicesPages',
  components: {
    FooterComponent
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const router = useRouter()
    const $q = useQuasar()

    if (!isLoggedIn.value) {
      router.push('/')
    } else if (isLoggedIn.value && userStore.stateUser.user.user_type <= 1) {
      router.push('/')
    } else if (!SessionStorage.getItem('card_pro')) {
      router.push('/')
    }

    return {
      loader,
      services_show,
      logo,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      services,
      folderAPI,
      toggleService,
      toggleServices () {

        axios.post(process.env.API + '/api/companie/services/edit', {
          companieId: userStore.stateUser.companie.id,
          toggleService: toggleService.value
        }).then(res => {

          if (res.data.succes === true) {

            $q.notify({
              timeout: 2000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Vos prestations ont été mises à jour.',
              progress: true,
              classes: 'glossy',
            })

          } else {

            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',

              icon: 'warning',
              message: res.data.message,
              progress: true,
              classes: 'glossy',
            })

          }

        }).catch(error => {

          $q.notify({
            timeout: 2000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: res.data.message,
            progress: true,
            classes: 'glossy',
          })

        })

      }
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

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    services_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      services_show.value = true
      logo.value = true
    }, 4000);

    if (this.connexionState && isLoggedIn) {

      // Liste des services
      services.value = []
      axios.get(process.env.API + '/api/services')
        .then(res => {

          if (res.data.succes === true) {
            services.value = res.data.services
          } else {
            services.value = []
          }

        })

      toggleService.value = []
      axios.get(process.env.API + '/api/companie/services/' + userStore.stateUser.companie.id)
        .then(res => {

          if (res.data.succes === true) {
            toggleService.value = res.data.toggleService
          } else {
            toggleService.value = []
          }

        })


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
