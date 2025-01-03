<template name="OrdersHistoryPage">

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

    <transition v-show="orders_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Historique des
          commandes</h5>

        <div class="w-100 text-right">

          <q-btn color="light-blue-9" class="glossy q-mb-sm" v-ripple icon-right="archive" label="Exporter vers csv"
            no-caps @click="exportTable" />

        </div>

        <q-responsive :ratio="16 / 9" class="w-100 q-mb-xl">

          <q-table :display-value="$q.lang.table.columns" :virtual-scroll-sticky-size-start="10" :grid="changeMode"
            :visible-columns="visibleColumns" :filter="filter" :loading="loading" v-model:pagination="pagination"
            style="min-height: 648px;" flat bordered virtual-scroll :rows="rows" :columns="columns" color="light-blue-9"
            row-key="id">

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

            <template v-slot:body="props">

              <q-tr :props="props">

                <q-td :key="props.row.btn">
                  <q-btn size="sm" glossy color="light-blue-9" round v-ripple dense
                    @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
                </q-td>

                <q-td key="id" :props="props">
                  <strong>{{ props.row.id }}</strong>
                </q-td>

                <q-td key="produit" :props="props">
                  {{ props.row.produit }}
                </q-td>

                <q-td key="price_ht" :props="props">
                  {{ props.row.price_ht }}
                </q-td>

                <q-td key="price_ttc" :props="props">
                  {{ props.row.price_ttc }}
                </q-td>

                <q-td key="qte" :props="props">
                  {{ props.row.qte }}
                </q-td>

                <q-td key="mode_paiement" :props="props">
                  {{ props.row.mode_paiement }}
                </q-td>

                <q-td key="status" :props="props">
                  <q-badge v-if="props.row.status === 'Paiement en attente'" color="orange-9">
                    <strong>{{ props.row.status }}</strong>
                  </q-badge>

                  <q-badge style="padding: 6px;" v-else-if="props.row.status === 'Paiement accepté'" color="green-9">
                    <strong>{{ props.row.status }}</strong>
                  </q-badge>

                  <q-badge v-else-if="props.row.status === 'Paiement refusé'" color="red-9">
                    <strong>{{ props.row.status }}</strong>
                  </q-badge>

                  <q-badge v-else-if="props.row.status === 'Paiement rembourser'" color="red-9">
                    <strong>{{ props.row.status }}</strong>
                  </q-badge>
                </q-td>

                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>

                <q-td key="created" :props="props">
                  {{ props.row.created }}
                </q-td>

                <q-td key="validate_at" :props="props">
                  {{ props.row.validate_at }}
                </q-td>

                <q-td key="refund_at" :props="props">
                  {{ props.row.refund_at }}
                </q-td>

                <q-td key="actions" :props="props" style="text-align: center;">
                  <q-btn v-ripple flat dense round
                    @click="refundOrder('tr_' + props.row.id, moment(props.row.created).format('YYYY-MM-DD'))">
                    <q-icon name="refresh" color="red-9" />
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"
                      class="glossy bg-light-blue-9 text-weight-bold">Rembourser la commande</q-tooltip>
                  </q-btn>
                </q-td>

              </q-tr>

              <q-tr v-show="props.expand" :props="props">

                <q-td colspan="100%">
                  <div class="text-left text-weight-bold">{{ props.row.content }}</div>
                </q-td>

              </q-tr>

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
  orders_show = ref(false),
  orders = ref([]),
  user = ref([]),
  filter = ref(''),
  loading = ref(false),
  changeMode = ref(false),
  visibleColumns = ref(['btn', 'id', 'produit', 'price_ht', 'price_ttc', 'qte', 'mode_paiement', 'status', 'created_at', 'validate_at', 'refund_at', 'actions'])

const columns = [
  { name: 'btn', label: '', align: 'left', field: 'btn', sortable: false },
  { name: 'id', label: 'N° de commande', align: 'left', field: 'id', sortable: false, headerClasses: 'header-table' },
  { name: 'produit', label: 'Produit', field: 'produit', sortable: false, align: 'left', headerClasses: 'header-table' },
  { name: 'price_ht', label: 'Prix HT', field: 'price_ht', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'price_ttc', label: 'Prix TTC', field: 'price_ttc', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'qte', label: 'Quantité', field: 'qte', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'mode_paiement', label: 'Mode de paiement', field: 'mode_paiement', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'status', label: 'Statut', field: 'status', align: 'left', sortable: false, headerClasses: 'header-table' },
  { name: 'created_at', label: 'Créer le', field: 'created_at', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'created', label: 'Created', field: 'created', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'content', label: 'Content', field: 'content', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'validate_at', label: 'Validé le', field: 'validate_at', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'refund_at', label: 'Rembourser le', field: 'refund_at', align: 'left', sortable: true, headerClasses: 'header-table' },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center', sortable: false, headerClasses: 'header-table' },
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
  name: 'OrdersHistoryPage',
  components: {
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
      loading.value = true

      if (user.value.user_type === 2) {

        orders.value = []
        rows.value = []

        axios.get(process.env.API + '/api/companie/orders/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id)
          .then(res => {

            if (res.data.succes) {

              orders.value = res.data.orders

              if (res.data.orders.length >= 1) {

                orders.value.forEach(element => {

                  rows.value.push(
                    {
                      btn: '',
                      id: String(element.mollie_id).replace('tr_', ''),
                      produit: element.name,
                      price_ht: element.price_ht + ' €',
                      price_ttc: element.price_ttc + ' €',
                      qte: element.qte,
                      mode_paiement: element.paiement,
                      status: element.title,
                      created_at: moment(element.created_at).format('DD MMMM YYYY'),
                      created: moment(element.created_at).format('YYYY-MM-DD'),
                      content: element.content,
                      validate_at: (element.validate_at !== '') ? moment(element.validate_at).format('DD MMMM YYYY') : '/',
                      refund_at: (element.refund_at !== '') ? moment(element.refund_at).format('DD MMMM YYYY') : '/',
                    })

                });

                loading.value = false

              } else {

                rows.value = []
                orders.value = []
                loading.value = false

              }

            } else {

              rows.value = []
              orders.value = []
              loading.value = false

            }

          })

      }

    }

    return {
      loading,
      filter,
      orders,
      visibleColumns,
      changeMode,
      pagination,
      moment: moment,
      user,
      loader,
      logo,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      orders_show,
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

      refundOrder (tokenPaiement, date) {

        if (user.value.user_type === 2) {

          orders.value = []
          rows.value = []

          if (this.connexionState && isLoggedIn) {

            if (moment().add(14, 'days').format('YYYY-MM-DD') >= moment(date).format('YYYY-MM-DD')) {

              axios.post(process.env.API + '/api/mollie/order-refund', {
                tokenPaiement: tokenPaiement,
                userId: userStore.stateUser.user.id,
                compagnieId: userStore.stateUser.companie.id
              }).then(res => {

                if (res.data.succes) {

                  orders.value = []
                  rows.value = []

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

                  rows.value = []
                  orders.value = []

                  axios.get(process.env.API + '/api/companie/orders/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id)
                    .then(res => {

                      if (res.data.succes) {

                        orders.value = res.data.orders

                        if (res.data.orders.length >= 1) {

                          orders.value.forEach(element => {

                            rows.value.push(
                              {
                                btn: '',
                                id: String(element.mollie_id).replace('tr_', ''),
                                produit: element.name,
                                price_ht: element.price_ht + ' €',
                                price_ttc: element.price_ttc + ' €',
                                qte: element.qte,
                                mode_paiement: element.paiement,
                                status: element.title,
                                created_at: moment(element.created_at).format('DD MMMM YYYY'),
                                created: moment(element.created_at).format('YYYY-MM-DD'),
                                content: element.content,
                                validate_at: (element.validate_at !== '') ? moment(element.validate_at).format('DD MMMM YYYY') : '/',
                                refund_at: (element.refund_at !== '') ? moment(element.refund_at).format('DD MMMM YYYY') : '/',
                              })

                          });

                          loading.value = false

                        } else {

                          rows.value = []
                          orders.value = []
                          loading.value = false

                        }

                      } else {

                        rows.value = []
                        orders.value = []
                        loading.value = false

                      }

                    })

                  loading.value = false

                }

              }).catch(error => {

                $q.notify({
                  timeout: 2000,
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'warning',
                  message: 'Une erreur est survenue !',
                  progress: true,
                  classes: 'glossy',
                })

              })

            } else {

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Votre demande de remboursement ne peut pas aboutir !',
                progress: true,
                classes: 'glossy',
              })

            }

          }

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

    orders_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      orders_show.value = true
      logo.value = true
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
