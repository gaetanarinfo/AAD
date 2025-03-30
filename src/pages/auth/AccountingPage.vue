<template name="AccountingPages">

  <q-page :class="(!connexionState) ? 'disabled q-page q-page-start' : 'q-page q-page-start'" :style-fn="heightAuto">

    <!-- Logo -->
    <transition v-show="logo" appear enter-active-class="animated fadeIn" style="margin-top: 30px;"
      leave-active-class="animated fadeOut">
      <div class="w-100 flex flex-center column form-w">

        <q-img src="~assets/12291247.svg" spinner-color="light-blue-9" alt="AAD - Services à la personne"></q-img>

      </div>
    </transition>

    <!-- Loader -->
    <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
        <q-spinner-tail size="50px" color="light-blue-9" />
      </div>

    </transition>

    <transition v-show="accounting_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Comptabilité pour l'année {{
          moment().format('YYYY') }}</h5>

        <q-card class="w-100 q-mb-xl">

          <q-tabs id="tab-accounting" v-model="tab" class="bg-light-blue-9 glossy text-white" align="justify"
            narrow-indicator>

            <q-tab name="total" label="Total" style="font-weight: 600;" />
            <q-tab name="disponible" label="Disponible" class="text-weight-bold" />

          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated class="text-dark text-left">

            <q-tab-panel name="total" class="text-dark">

              <div class="text-h6">Transactions Paypal</div>

              <strong>{{ accounting_availableamount }} €</strong>

            </q-tab-panel>

            <q-tab-panel name="disponible" class="text-dark">

              <div class="text-h6">Transactions Paypal</div>

              <strong>{{ accounting_pendingamount }} €</strong>

            </q-tab-panel>

          </q-tab-panels>

        </q-card>

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
import { SessionStorage, useQuasar, exportFile } from 'quasar'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  companie = ref([]),
  user = ref([]),
  accounting = ref([]),
  accounting_show = ref(false),
  tab = ref('total'),
  accounting_pendingamount = ref(''),
  accounting_availableamount = ref(''),
  loading = ref(false)

export default defineComponent({
  name: 'AccountingPages',
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

    if (connexionState.value && isLoggedIn.value) {

      user.value = userStore.stateUser.user

      if (user.value.user_type === 2) {
        companie.value = userStore.stateUser.companie

        loading.value = true
        accounting.value = []

        axios.get(process.env.API + '/api/companie/accounting/' + userStore.stateUser.companie.id)
          .then(res => {

            if (res.data.succes) {

              accounting.value = res.data.balance_transactions[0]
              accounting_pendingamount.value = accounting.value.total_balance.value
              accounting_availableamount.value = accounting.value.available_balance.value

            } else {

              accounting.value = []
              loading.value = false

            }

          })

      }

    }

    return {
      loading,
      accounting_availableamount,
      accounting_pendingamount,
      tab,
      accounting_show,
      accounting,
      moment: moment,
      user,
      companie,
      loader,
      logo,
      isLoggedIn,
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

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)

    accounting_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      accounting_show.value = true
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
