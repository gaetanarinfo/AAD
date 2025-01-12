<template name="PlaningPage">

  <q-page
    :class="(!connexionState) ? 'disabled q-page q-page-start q-page-no-padding' : 'q-page q-page-start q-page-no-padding'"
    :style-fn="heightAuto">

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

    <transition v-show="planning_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Gestion du planning</h5>

        <div class="w-100 text-left q-pl-md q-pr-md">

          <div>
            <q-btn v-ripple color="light-blue-9" @click="employeeDialog = true" glossy><span
                style="text-transform: none;font-weight: 600;">Ajouter un
                employé</span></q-btn>
          </div>

          <q-splitter v-model="splitterModel" style="flex-direction: column;width: 100%;">

            <template v-slot:before>

              <div>
                <q-date today-btn bordered style="width: 100%; min-width: 100%; max-width: 290px;" v-model="event"
                  :options="optionsFn" :events="events" event-color="orange" />
              </div>

            </template>

            <template v-slot:after>

              <q-tab-panels v-model="event" animated transition-prev="jump-up" transition-next="jump-up">
                <q-tab-panel name="2019/02/01">
                  <div class="text-h4 q-mb-md">2019/02/01</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="2019/02/05">
                  <div class="text-h4 q-mb-md">2019/02/05</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                </q-tab-panel>

                <q-tab-panel name="2019/02/06">
                  <div class="text-h4 q-mb-md">2019/02/06</div>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure
                    quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla
                    ullam. In, libero.</p>
                </q-tab-panel>

              </q-tab-panels>

            </template>

          </q-splitter>

        </div>

      </div>

    </transition>

    <FooterComponent />

    <q-dialog v-model="employeeDialog" position="right">

      <q-card class="q-pb-md" style="min-width: 290px;padding: 0 1rem">

        <q-form @submit="" class="q-mt-md">

          <q-item-label header class="q-pl-none">Employée de l'intervention</q-item-label>

          <q-select dense filled map-options v-model="employees" multiple transition-show="scale"
            transition-hide="scale" style="margin-bottom: 16px" :options="options" />

          <q-chip v-for="user in employees" class="glossy" color="light-blue-9"
            style="font-weight: 600;font-size: 11px;" text-color="white">

            <q-avatar size="15px">
              <img :src="user.photo">
            </q-avatar>

            <q-item-label style="margin-left: 5px">{{ user.label }}</q-item-label>

          </q-chip>

          <q-item-label header class="q-pl-none">Demande du client</q-item-label>

          <q-item-label header class="q-pl-none">Date de l'intervention</q-item-label>

          <q-input dense filled v-model="date_start" mask="##/##/#### ##:##" label="Date de début *" lazy-rules
            :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

            <template v-slot:prepend>

              <q-icon name="event" class="cursor-pointer">

                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_start" mask="DD/MM/YYYY HH:mm" @input="() => $refs.qDateProxy.hide()">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>

              </q-icon>

            </template>

            <template v-slot:append>

              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="date_start" mask="DD/MM/YYYY HH:mm" @input="() => $refs.qDateProxy.hide()" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>

            </template>

          </q-input>

          <q-input dense filled v-model="date_end" mask="##/##/#### ##:##" label="Date de fin *" lazy-rules
            :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">
            <template v-slot:prepend>

              <q-icon name="event" class="cursor-pointer">

                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="date_end" mask="DD/MM/YYYY HH:mm" @input="() => $refs.qDateProxy.hide()">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>

              </q-icon>

            </template>

            <template v-slot:append>

              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="date_end" mask="DD/MM/YYYY HH:mm" @input="() => $refs.qDateProxy.hide()" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>

            </template>

          </q-input>

          <q-btn type="submit" style="margin-top: 16px" glossy v-ripple padding="5px" class="w-100" dense
            color="light-blue-9">
            <div style="font-weight: 600;text-transform:none;">Valider</div>
          </q-btn>

          <q-btn v-close-popup v-ripple padding="5px" class="w-100 q-mt-md q-mb-md" dense color="grey-4">
            <div style="font-weight: 600;text-transform:none;color: black;">Fermer</div>
          </q-btn>

        </q-form>

      </q-card>

    </q-dialog>

  </q-page>

</template>

<script>

import { defineComponent } from 'vue'
import { ref, computed, reactive } from 'vue'
import { useRouter } from "vue-router"
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { SessionStorage, useQuasar } from 'quasar'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  planning_show = ref(false),
  user = ref([]),
  splitterModel = ref(50),
  event = ref(moment().format('YYYY/MM/DD')),
  events = ref(['2019/02/01', '2019/02/05', '2019/02/06']),
  employeeDialog = ref(false),
  options = ref([]),
  employees = ref([]),
  date_start = ref(moment().format('DD/MM/YYYY HH:mm')),
  date_end = ref('')

export default defineComponent({
  name: 'PlaningPage',
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

      options.value = []
      employees.value = []

      axios.get(process.env.API + '/api/companie/inbox-users/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id)
        .then(res => {

          if (res.data.succes) {

            if (res.data.users.length >= 1) {

              res.data.users.forEach(element => {

                options.value.push({
                  label: element.firstname + ' ' + element.lastname,
                  photo: element.photo,
                  value: element.id
                })

              });

            } else {

              options.value = []

            }

          } else {

            options.value = []

          }

        })

    }

    return {
      date_start,
      date_end,
      employees,
      options,
      employeeDialog,
      optionsFn (date) {
        return date >= moment().format('YYYY/MM/DD')
      },
      splitterModel,
      events,
      event,
      planning_show,
      moment: moment,
      loader,
      logo,
      user,
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

    planning_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      planning_show.value = true
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
