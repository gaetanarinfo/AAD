<template name="MyAccountPage">

  <q-page :class="(!connexionState) ? 'disabled q-page q-page-start' : 'q-page q-page-start'" :style-fn="heightAuto">

    <!-- Loader -->
    <transition v-show="loader" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column flex-center" style="min-height: calc(100vh - 50px); height: 100%;">
        <q-spinner-tail size="50px" color="light-blue-9" />
      </div>

    </transition>

    <transition v-show="users_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      style="margin-top: 30px;">

      <div class="column text-center w-100 form-w" style="margin-bottom: 50px;">

        <div class="w-100">

          <q-avatar style="width: 100px;height: auto;">
            <q-img spinner-color="light-blue-9" :src="user_edit.photo" />
          </q-avatar>

        </div>

        <h5>{{ user_edit.firstname + ' ' + user_edit.lastname }}</h5>

        <q-form @submit="onSubmitEditUser">

          <div class="flex-start column items-start" style="margin-bottom: 10px;">

            <q-item-label class="text-weight-bold">Statut :</q-item-label>

            <div class="flex-start row items-start">

              <q-radio disable v-model="status_user" checked-icon="task_alt" color="light-blue-9"
                unchecked-icon="lock_open" val="1" label="Actif" />

              <q-radio disable v-model="status_user" checked-icon="task_alt" color="light-red-9" unchecked-icon="lock"
                val="0" label="Inactif" />

            </div>

          </div>

          <div v-if="user.user_type !== 1" class="flex-start column items-start" style="margin-bottom: 10px;">

            <q-item-label class="text-weight-bold">Statut dans l'entreprise :</q-item-label>

            <div class="flex-start row items-start">

              <q-radio disable v-model="status" checked-icon="task_alt" color="light-blue-9"
                unchecked-icon="panorama_fish_eye" val="2" label="Dirigeant" />

              <q-radio disable v-model="status" checked-icon="task_alt" color="light-blue-9"
                unchecked-icon="panorama_fish_eye" val="3" label="Employé" />

            </div>

          </div>

          <div class="flex-start column items-start" style="margin-bottom: 10px;">

            <q-item-label class="text-weight-bold">Civilité :</q-item-label>

            <div class="flex-start row items-start">

              <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9"
                unchecked-icon="panorama_fish_eye" val="Mr" label="Mr" />

              <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9"
                unchecked-icon="panorama_fish_eye" val="Mme" label="Mme" />

            </div>

          </div>

          <div class="row row-form">
            <div class="col-6 form-padding">
              <q-input dense filled v-model="lastname" label="Nom *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="title" />
                </template>

              </q-input>
            </div>

            <div class="col-6">
              <q-input dense filled v-model="firstname" label="Prénom *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="title" />
                </template>

              </q-input>
            </div>
          </div>

          <div class="row row-form">
            <div class="col-6 form-padding">
              <q-input dense filled v-model="fonction" label="Fonction *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="title" />
                </template>

              </q-input>
            </div>

            <div class="col-6">
              <q-input dense filled v-model="adresse" @keyup="getAdresse" label="Adresse *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="location_on" />
                </template>

              </q-input>
            </div>
          </div>

          <q-list bordered separator v-show="showAdresses" style="margin-bottom: 16px;">

            <q-item clickable v-ripple @click="setAdress(adress)" v-for="adress in adresses">

              <q-item-section style="justify-content: flex-start;" avatar>
                <q-icon color="light-blue-9" name="location_on" />
              </q-item-section>

              <q-item-section class="text-left">
                <q-item-label style="text-overflow: initial;white-space: initial;overflow: initial;" caption
                  lines="1"><strong>{{
                    adress.address_line1 + ', ' }}</strong></q-item-label>
                <q-item-label tyle="text-overflow: initial;white-space: initial;overflow: initial;" caption
                  lines="2"><strong>{{
                    adress.postcode + ' ' + adress.city + ' ' + adress.country
                  }}</strong></q-item-label>
              </q-item-section>

            </q-item>

            <q-item v-if="loaderAdresse">

              <q-item-section class="text-center flex-center">
                <q-spinner-oval color="light-blue-9" size="30px" />
              </q-item-section>

            </q-item>

          </q-list>

          <div class="row row-form">
            <div class="col-6 form-padding">
              <q-input dense filled v-model="ville" label="Ville *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="location_on" />
                </template>

              </q-input>
            </div>

            <div class="col-6">
              <q-input dense filled v-model="codepostal" mask="#####" label="Code postal *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="location_on" />
                </template>

              </q-input>
            </div>
          </div>

          <div class="row row-form">
            <div class="col-6 form-padding">
              <q-select style="margin-bottom: 16px;" dense filled v-model="pays" label="Pays *" map-options
                :options="options" emit-value transition-show="scale" transition-hide="scale">

                <template v-slot:prepend>
                  <q-icon size="xs" name="location_on" />
                </template>

                <template v-slot:option="{ itemProps, opt }">

                  <q-item v-bind="itemProps">

                    <q-item-section style="max-width: 30px;margin-right: 5px;">
                      <q-img spinner-color="light-blue-9" spinner-size="15px" style="max-width: 30px;"
                        :src="folderAPI + '/flags/' + opt.flag" />
                    </q-item-section>

                    <q-item-section>
                      <q-item-label v-html="opt.label" />
                    </q-item-section>

                  </q-item>

                </template>

              </q-select>
            </div>

            <div class="col-6">
              <q-input dense filled v-model="naissance" mask="##/##/####" label="Date de naissance *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="naissance" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <div class="row row-form">
            <div class="col-6 form-padding">
              <q-input dense filled mask="##-##-##-##-##" fill-mask v-model="phone" label="Téléphone *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="smartphone" />
                </template>

              </q-input>
            </div>

            <div class="col-6">
              <q-input dense filled v-model="email" disable ready-only label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
              (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="email" />
                </template>

              </q-input>
            </div>

          </div>

          <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
            <q-btn size="xl" type="submit" v-ripple color="light-blue-9 glossy" style="max-width: 100px;" dense rounded
              icon="arrow_forward"></q-btn>
          </div>

        </q-form>

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
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  loader = ref(true),
  users_show = ref(false),
  user = ref([])

// Forms
const email = ref(''),
  lastname = ref(''),
  firstname = ref(''),
  naissance = ref(''),
  phone = ref(''),
  civilite = ref(''),
  user_edit = ref([]),
  showAdresses = ref(false),
  loaderAdresse = ref(false),
  adresses = ref([]),
  fonction = ref(''),
  adresse = ref(''),
  ville = ref(''),
  codepostal = ref(''),
  pays = ref([]),
  options = ref([]),
  status = ref(0),
  status_user = ref(0)

export default defineComponent({
  name: 'MyAccountPage',
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
    }

    if (connexionState.value && isLoggedIn.value) {

      user.value = userStore.stateUser.user

      user.value = userStore.stateUser.user

      user_edit.value = []

      axios.get(process.env.API + '/api/user/edit/' + userStore.stateUser.user.id)
        .then(res => {

          if (res.data.succes) {

            user_edit.value = res.data.user

            // Forms
            status.value = String(user_edit.value.user_type)
            status_user.value = String(user_edit.value.active)
            email.value = user_edit.value.email
            lastname.value = user_edit.value.lastname
            firstname.value = user_edit.value.firstname
            phone.value = user_edit.value.phone
            naissance.value = user_edit.value.naissance
            civilite.value = user_edit.value.civilite
            fonction.value = user_edit.value.fonction
            adresse.value = user_edit.value.adresse
            ville.value = user_edit.value.ville
            codepostal.value = String(user_edit.value.codepostal)
            pays.value = user_edit.value.pays

          } else {
            user_edit.value = []
            router.push('/')
          }

        })

    }

    return {
      moment: moment,
      user,
      loader,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      users_show,
      folderAPI,

      onSubmitEditUser () {

        users_show.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        axios.post(folderAPI.value + '/api/user/edit',
          {
            fonction: fonction.value,
            email: userStore.stateUser.user.email,
            lastname: lastname.value,
            firstname: firstname.value,
            naissance: String(naissance.value).replaceAll('/', '-').replaceAll('\/', '-'),
            phone: String(phone.value).replaceAll('-', ' '),
            civilite: civilite.value,
            adresse: adresse.value,
            ville: ville.value,
            codepostal: codepostal.value,
            pays: pays.value.value,
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

            user_edit.value = []

            axios.get(process.env.API + '/api/user/edit/' + userStore.stateUser.user.id)
              .then(res => {

                if (res.data.succes) {

                  user_edit.value = res.data.user

                  // Forms
                  status.value = String(user_edit.value.user_type)
                  status_user.value = String(user_edit.value.active)
                  email.value = user_edit.value.email
                  lastname.value = user_edit.value.lastname
                  firstname.value = user_edit.value.firstname
                  phone.value = user_edit.value.phone
                  naissance.value = user_edit.value.naissance
                  civilite.value = user_edit.value.civilite
                  fonction.value = user_edit.value.fonction
                  adresse.value = user_edit.value.adresse
                  ville.value = user_edit.value.ville
                  codepostal.value = String(user_edit.value.codepostal)
                  pays.value = user_edit.value.pays

                } else {
                  user_edit.value = []
                  router.push('/')
                }

              })

            setTimeout(() => {
              loader.value = false
            }, 3500);

            setTimeout(() => {
              users_show.value = true
            }, 4000);

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

            setTimeout(() => {
              loader.value = false
            }, 3500);

            setTimeout(() => {
              logo.value = true
              users_show.value = true
            }, 4000);

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


          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            logo.value = true
            users_show.value = true
          }, 4000);

        })

      },
      setAdress (value) {

        showAdresses.value = false
        adresses.value = []

        adresse.value = value.address_line1
        codepostal.value = value.postcode
        ville.value = value.city
        pays.value = {
          label: value.country,
          value: value.country
        }

      },
      getAdresse () {

        if (adresse.value.length >= 2) {

          loaderAdresse.value = true

          adresses.value = []

          showAdresses.value = true

          setTimeout(() => {
            axios.get('https://api.geoapify.com/v1/geocode/autocomplete?text=' + adresse.value +
              '&lang=fr&limit=20&bias=countrycode:fr&format=json&apiKey=' + process.env.API_KEY_GEOAPIFY)
              .then(res => {

                if (res.data.results.length >= 1) {

                  adresses.value = res.data.results

                  loaderAdresse.value = false

                } else {

                  adresses.value = []

                  showAdresses.value = false

                  // $q.notify({
                  // timeout: 2000,
                  // color: 'red-5',
                  // textColor: 'white',
                  //
                  // icon: 'warning',
                  // message: 'Une erreur est survenue value erreur !',
                  // progress: true,
                  // classes: 'glossy',
                  // })

                }

              }).catch(error => {

                adresses.value = []

                showAdresses.value = false

                $q.notify({
                  timeout: 2000,
                  color: 'red-5',
                  textColor: 'white',

                  icon: 'warning',
                  message: 'Une erreur est survenue erreur !',
                  progress: true,
                  classes: 'glossy',
                })

              })

          }, 1500);

        }

      },
      user_edit,
      users_show,

      email,
      lastname,
      firstname,
      phone,
      naissance,
      civilite,
      fonction,
      adresse,
      ville,
      codepostal,
      pays,
      showAdresses,
      loaderAdresse,
      adresses,
      options,
      status,
      status_user,
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

    users_show.value = false

    if (this.connexionState) {

      // Liste des pays
      pays.value = []
      axios.get(process.env.API + '/api/pays')
        .then(res => {

          if (res.data.succes === true) {

            pays.value = {
              value: 'France',
              label: 'France',
            }

            options.value = res.data.pays

          } else {

            options.value = []

          }

        })

    }

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      users_show.value = true
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
