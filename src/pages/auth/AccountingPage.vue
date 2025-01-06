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

            <q-tab name="mails" label="Valider" style="font-weight: 600;" />
            <q-tab name="alarms" label="En attente" class="text-weight-bold" />

          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated class="text-dark text-left">

            <q-tab-panel name="mails" class="text-dark">

              <div class="text-h6">Transactions Mollie</div>

              <strong>{{ accounting_availableamount }} €</strong>

            </q-tab-panel>

            <q-tab-panel name="alarms" class="text-dark">

              <div class="text-h6">Transactions Mollie</div>

              <strong>{{ accounting_pendingamount }} €</strong>

            </q-tab-panel>

          </q-tab-panels>

        </q-card>

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Transactions pour l'année {{
          moment().format('YYYY') }}</h5>

        <div class="w-100 text-right">

          <q-btn color="light-blue-9" class="glossy q-mb-sm" v-ripple icon-right="archive" label="Exporter vers csv"
            no-caps @click="exportTable" />

        </div>

        <q-responsive :ratio="16 / 9" class="w-100 q-mb-xl">

          <q-table :display-value="$q.lang.table.columns" :virtual-scroll-sticky-size-start="10" :grid="changeMode"
            :filter="filter" :loading="loading" v-model:pagination="pagination" style="min-height: 648px;" flat bordered
            virtual-scroll :rows="rows" :columns="columns" color="light-blue-9" row-key="type">

            <template v-slot:top>

              <q-btn flat round dense :icon="changeMode ? 'grid_view' : 'view_list'"
                @click="changeMode ? changeMode = false : changeMode = true" />

              <q-space />

              <q-input borderless dense debounce="300" v-model="filter" placeholder="Rechercher...">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

            </template>

            <template v-slot:loading>
              <q-inner-loading showing color="light-blue-9" />
            </template>

            <template v-slot:pagination="scope">

              <q-btn v-if="scope.pagesNumber > 2" icon="first_page" color="grey-8" round dense flat
                :disable="scope.isFirstPage" @click="scope.firstPage" />

              <q-btn icon="chevron_left" color="grey-8" round dense flat :disable="scope.isFirstPage"
                @click="scope.prevPage" />

              <q-btn icon="chevron_right" color="grey-8" round dense flat :disable="scope.isLastPage"
                @click="scope.nextPage" />

              <q-btn v-if="scope.pagesNumber > 2" icon="last_page" color="grey-8" round dense flat
                :disable="scope.isLastPage" @click="scope.lastPage" />

            </template>

          </q-table>

        </q-responsive>

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
  tab = ref('mails'),
  accounting_pendingamount = ref(''),
  accounting_availableamount = ref(''),
  filter = ref(''),
  loading = ref(false),
  changeMode = ref(false)

const columns = [
  { name: 'type', label: 'Type', align: 'left', field: 'type', sortable: true, headerClasses: 'header-table' },
  { name: 'montant_initial', label: 'Montant initial', align: 'left', field: 'montant_initial', sortable: true, headerClasses: 'header-table' },
  { name: 'frais', label: 'Frais', field: 'frais', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'created_at', label: 'Créée le', align: 'left', field: 'created_at', headerClasses: 'header-table' },
]

const rows = ref([])

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 10
  // rowsNumber: xx if getting data from a server
})

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
        rows.value = []

        axios.get(process.env.API + '/api/companie/accounting/' + userStore.stateUser.companie.id)
          .then(res => {

            if (res.data.succes) {

              accounting.value = res.data.accounting
              accounting_pendingamount.value = accounting.value.pendingAmount.value
              accounting_availableamount.value = accounting.value.availableAmount.value

              if (res.data.balance_transactions.count >= 1) {

                accounting.value.forEach(element => {

                  rows.push(
                    {
                      type: element.type,
                      montant_initial: element.initialAmount.value,
                      frais: element.deductions.value,
                      created_at: element.createdAt
                    })

                  loading.value = false

                });

              } else {

                rows.value = []
                accounting.value = []
                loading.value = false

              }

            } else {

              rows.value = []
              accounting.value = []
              loading.value = false

            }

          })

      }

    }

    return {
      loading,
      filter,
      changeMode,
      pagination,
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

      columns,
      rows,

      exportTable () {
        // naive encoding to csv format
        const content = [columns.map(col => wrapCsvValue(col.label))].concat(
          rows.value.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
              ? col.field(row)
              : row[col.field === void 0 ? col.name : col.field],
            col.format,
            row
          )).join(','))
        ).join('\r\n')

        const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
        )

        if (status !== true) {

          $q.notify({
            timeout: 2000,
            color: 'red-5',
            textColor: 'white',
            class: " glossy",
            icon: 'warning',
            message: 'Le navigateur a refusé le téléchargement du fichier...',
            progress: true,
            classes: 'glossy',
          })

        }
      },

      pagesNumber: computed(() => {
        return Math.ceil(rows.length / pagination.value.rowsPerPage)
      })
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
