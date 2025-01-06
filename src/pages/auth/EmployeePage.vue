<template name="EmployeePages">

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

    <transition v-show="users_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Mes employés
        </h5>

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

            <template v-slot:body="props">

              <q-tr :props="props">

                <q-td key="user_id" :props="props">
                  <strong>{{ props.row.user_id }}</strong>
                </q-td>

                <q-td key="type" :props="props">
                  <strong>{{ props.row.type }}</strong>
                </q-td>

                <q-td key="lastname" :props="props">
                  {{ props.row.lastname }}
                </q-td>

                <q-td key="firstname" :props="props">
                  {{ props.row.firstname }}
                </q-td>

                <q-td key="email" :props="props">
                  {{ props.row.email }}
                </q-td>

                <q-td key="created_at" :props="props">
                  {{ props.row.created_at }}
                </q-td>

                <q-td key="actions" :props="props" style="text-align: center;">

                  <q-btn v-ripple flat dense round
                    @click="this.$router.push('/companie/users/edit/' + companie_id + '/' + props.row.id)">
                    <q-icon name="edit" color="green-9" />
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"
                      class="glossy bg-light-blue-9 text-weight-bold">Éditer</q-tooltip>
                  </q-btn>

                  <q-btn v-ripple flat dense round @click="deleteUserCompanie(props.row.user_id)">
                    <q-icon name="person_remove" color="red-9" />
                    <q-tooltip anchor="center left" self="center right" :offset="[10, 10]"
                      class="glossy bg-light-blue-9 text-weight-bold">Supprimer</q-tooltip>
                  </q-btn>
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
  users_show = ref(false),
  users = ref([]),
  user = ref([]),
  filter = ref(''),
  loading = ref(false),
  changeMode = ref(false),
  companie_id = ref(0)

const columns = [
  { name: 'type', label: 'Statut', align: 'left', field: 'type', sortable: true, headerClasses: 'header-table' },
  { name: 'lastname', label: 'Nom', align: 'left', field: 'lastname', sortable: true, headerClasses: 'header-table' },
  { name: 'firstname', label: 'Prénom', align: 'left', field: 'firstname', sortable: true, headerClasses: 'header-table' },
  { name: 'email', label: 'Email', align: 'left', field: 'email', sortable: true, headerClasses: 'header-table' },
  { name: 'created_at', label: 'Inscrit le', align: 'left', field: 'created_at', sortable: true, headerClasses: 'header-table' },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions', sortable: false, headerClasses: 'header-table' },
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
  name: 'MyAccountCompaniePage',
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
      loading.value = true
      companie_id.value = userStore.stateUser.companie.id

      if (user.value.user_type === 2) {

        users.value = []
        rows.value = []

        axios.get(process.env.API + '/api/companie/users/' + userStore.stateUser.companie.id)
          .then(res => {

            if (res.data.succes) {

              users.value = res.data.users

              if (res.data.users.length >= 1) {

                users.value.forEach(element => {

                  rows.value.push(
                    {
                      user_id: element.id,
                      type: element.name,
                      lastname: element.lastname,
                      firstname: element.firstname,
                      email: element.email,
                      created_at: moment(element.created_at).format('DD MMMM YYYY'),
                    })

                });

                loading.value = false

              } else {

                rows.value = []
                users.value = []
                loading.value = false

              }

            } else {

              rows.value = []
              users.value = []
              loading.value = false

            }

          })

      }

    }

    return {
      deleteUserCompanie (userId) {

        users_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        axios.post(folderAPI.value + '/api/companie/user/delete',
          {
            companieId: userStore.stateUser.companie.id,
            userId
          }
        ).then(res => {

          if (res.data.succes) {

            $q.notify({
              timeout: 2000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: res.data.message,
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

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            users_show.value = true
          }, 4000);

        })

      },
      loading,
      companie_id,
      filter,
      users,
      changeMode,
      pagination,
      moment: moment,
      user,
      loader,
      logo,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      users_show,
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

    users_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      users_show.value = true
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
