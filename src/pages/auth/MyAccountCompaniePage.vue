<template name="MyAccountCompaniePage">

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

    <transition v-show="companie_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 2rem;">Gérer mon entreprise
        </h5>

        <p style="margin-bottom: 2rem;text-transform: initial; letter-spacing: normal;font-size: 16px;"
          class="text-grey-7">Gérez votre entreprise en un seul clic et accédez à toutes les informations. <q-icon
            name="help" color="light-blue-9">

            <q-tooltip :hide-delay="3000" class="glossy bg-light-blue-9 text-weight-bold">Pour apporter des
              modifications à un champ, il
              vous suffit de
              cliquer sur son texte !</q-tooltip>

          </q-icon>
        </p>

        <q-expansion-item v-model="expanded" class="w-100">

          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="light-blue-9" name="domain" />
            </q-item-section>

            <q-item-section>
              Informations général
            </q-item-section>
          </template>

          <q-card>

            <q-card-section>
              <p style="margin-bottom:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">{{
                name_editable }}

                <q-popup-edit :validate="val => val.length > 3" v-model="name_editable" v-slot="scope">

                  <q-input style="flex-direction: column;margin-bottom: 0;padding-bottom: 0;" :rules="[
                    val => scope.validate(val) || 'Plus de 3 caractères requis'
                  ]" color="light-blue-9" v-model="scope.value" dense autofocus counter
                    @keyup.enter="scope.set(), validate_change = true">

                    <template v-slot:append>
                      <q-icon name="edit" color="light-blue-9" />
                    </template>

                    <template v-slot:after style="padding-left: 0;">
                      <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel()" />

                      <q-btn flat dense color="positive" icon="check_circle"
                        @click.stop.prevent="scope.set(), validate_change = true"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>

                  </q-input>

                </q-popup-edit>

              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Siret
                :<br />
                {{ siret_editable }}

                <q-popup-edit :validate="val => val.length > 13 && val.length < 15" v-model="siret_editable"
                  v-slot="scope">

                  <q-input mask="##############" style="flex-direction: column;margin-bottom: 0;padding-bottom: 0;"
                    :rules="[
                      val => scope.validate(val) || '14 caractères requis pour ce champ !'
                    ]" color="light-blue-9" v-model="scope.value" dense autofocus counter
                    @keyup.enter="scope.set(), validate_change = true">

                    <template v-slot:append>
                      <q-icon name="edit" color="light-blue-9" />
                    </template>

                    <template v-slot:after style="padding-left: 0;">
                      <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel()" />

                      <q-btn flat dense color="positive" icon="check_circle"
                        @click.stop.prevent="scope.set(), validate_change = true"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>

                  </q-input>

                </q-popup-edit>

              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Siren
                :<br />
                {{ siren_editable }}

                <q-popup-edit :validate="val => val.length > 8 && val.length < 10" v-model="siren_editable"
                  v-slot="scope">

                  <q-input mask="#########" style="flex-direction: column;margin-bottom: 0;padding-bottom: 0;" :rules="[
                    val => scope.validate(val) || '9 caractères requis pour ce champ !'
                  ]" color="light-blue-9" v-model="scope.value" dense autofocus counter
                    @keyup.enter="scope.set(), validate_change = true">

                    <template v-slot:append>
                      <q-icon name="edit" color="light-blue-9" />
                    </template>

                    <template v-slot:after style="padding-left: 0;">
                      <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel()" />

                      <q-btn flat dense color="positive" icon="check_circle"
                        @click.stop.prevent="scope.set(), validate_change = true"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>

                  </q-input>

                </q-popup-edit>

              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Siège social :<br />
                {{ siege_editable }}

                <q-popup-edit :validate="val => val.length > 3" v-model="siege_editable" v-slot="scope">

                  <q-input style="flex-direction: column;margin-bottom: 0;padding-bottom: 0;" :rules="[
                    val => scope.validate(val) || 'Plus de 3 caractères requis'
                  ]" color="light-blue-9" v-model="scope.value" dense autofocus counter
                    @keyup.enter="scope.set(), validate_change = true">

                    <template v-slot:append>
                      <q-icon name="edit" color="light-blue-9" />
                    </template>

                    <template v-slot:after style="padding-left: 0;">
                      <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel()" />

                      <q-btn flat dense color="positive" icon="check_circle"
                        @click.stop.prevent="scope.set(), validate_change = true"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>

                  </q-input>

                </q-popup-edit>

              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Adresse
                :<br />
                {{ adresse_editable }}

                <q-popup-edit :validate="val => val.length > 3" v-model="adresse_editable" v-slot="scope">

                  <q-input style="flex-direction: column;margin-bottom: 0;padding-bottom: 0;" :rules="[
                    val => scope.validate(val) || 'Plus de 3 caractères requis'
                  ]" color="light-blue-9" v-model="scope.value" dense autofocus counter
                    @keyup.enter="scope.set(), validate_change = true">

                    <template v-slot:append>
                      <q-icon name="edit" color="light-blue-9" />
                    </template>

                    <template v-slot:after style="padding-left: 0;">
                      <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel()" />

                      <q-btn flat dense color="positive" icon="check_circle"
                        @click.stop.prevent="scope.set(), validate_change = true"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>

                  </q-input>

                </q-popup-edit>

              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Fondé le
                :<br />
                {{ founding_date_editable }}

                <q-popup-edit :validate="val => val.length > 3" v-model="founding_date_editable" v-slot="scope">

                  <q-input mask="##/##/####" style="flex-direction: column;margin-bottom: 0;padding-bottom: 0;" :rules="[
                    val => scope.validate(val) || 'Plus de 3 caractères requis'
                  ]" color="light-blue-9" v-model="scope.value" dense autofocus counter
                    @keyup.enter="scope.set(), validate_change = true">

                    <template v-slot:append>
                      <q-icon name="edit" color="light-blue-9" />
                    </template>

                    <template v-slot:after style="padding-left: 0;">
                      <q-btn flat dense color="negative" icon="cancel" @click.stop.prevent="scope.cancel()" />

                      <q-btn flat dense color="positive" icon="check_circle"
                        @click.stop.prevent="scope.set(), validate_change = true"
                        :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                    </template>

                  </q-input>

                </q-popup-edit>
              </p>

              <q-separator />

              <p v-show="validate_change" style="margin-bottom:1rem;;margin-top:1rem; text-align: right;">
                <q-btn dense v-ripple size="md" @click="validateChange()" rounded
                  class="glossy text-weight-bold q-pa-sm q-px-md" color="light-blue-9">Valider les
                  changements</q-btn>
              </p>

            </q-card-section>

          </q-card>

        </q-expansion-item>

        <q-expansion-item v-model="expanded2" class="w-100">

          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="light-blue-9" name="key" />
            </q-item-section>

            <q-item-section>
              Mon abonnement
            </q-item-section>
          </template>

          <q-card>

            <q-card-section>
              <p v-if="moment().format('YYYY-MM-DD HH:mm:ss') <= moment(companie.licence_validate_at).format('YYYY-MM-DD HH:mm:ss')"
                style="margin-bottom:1rem;text-transform: initial; letter-spacing: normal;font-size: 16px;"
                class="flex justify-center align-center content-center items-center">
                <q-icon class="q-mr-sm" size="sm" name="verified_user" color="light-green-9" /> <span
                  class="light-green-9">Active</span>
              </p>
              <p v-else style="margin-bottom:1rem;text-transform: initial; letter-spacing: normal;font-size: 16px;"
                class="flex justify-center align-center content-center items-center">
                <q-icon class="q-mr-sm" size="sm" name="remove_moderator" color="red-9" /> <span
                  class="text-red-9">Inactive</span>
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Licence
                :<br />
                {{
                  companie.licence }}
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Date de création
                :<br />
                {{
                  moment(companie.licence_created_at).format('DD MMMM YYYY HH:mm:ss') }}
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Date d'expiration
                :<br />
                {{
                  moment(companie.licence_validate_at).format('DD MMMM YYYY HH:mm:ss') }}
              </p>
              <p v-if="moment().format('YYYY-MM-DD HH:mm:ss') <= moment(companie.licence_validate_at).format('YYYY-MM-DD HH:mm:ss')"
                style="margin-bottom:0.5rem;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Durée
                :<br />

                {{ moment(companie.licence_validate_at).diff(moment()
                  .format('YYYY-MM-DD HH:mm:ss'), 'days') }}
                /
                {{
                  moment(companie.licence_validate_at).diff(moment(companie.licence_created_at)
                    .format('YYYY-MM-DD HH:mm:ss'), 'days')
                }} jours
              </p>
              <p v-else
                style="margin-bottom:0.5rem;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Durée
                :<br />
                expirer
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Renouvellement
                automatique
                :<br />
                {{ (companie.recurring_payment === 1) ? 'Oui' : 'Non' }}
              </p>
            </q-card-section>

          </q-card>

        </q-expansion-item>

        <q-expansion-item v-model="expanded3" class="w-100">

          <template v-slot:header>
            <q-item-section avatar>
              <q-icon color="light-blue-9" name="euro" />
            </q-item-section>

            <q-item-section>
              Paiement
            </q-item-section>
          </template>

          <q-card>

            <q-card-section>

              <p
                style="margin-bottom:0.5rem;word-break: break-all;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Clé API (Mollie)
                :<br />
                {{ bank.api_key }}
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;word-break: break-all;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Access Token API (Mollie)
                :<br />
                {{ bank.bareer_token }}
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;word-break: break-all;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Créer le
                :<br />
                {{ moment(bank.created_at).format('DD MM YYYY à HH:mm:ss') }}
              </p>


              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;word-break: break-all;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Mise à jour le
                :<br />
                {{ (bank.updated_at !== null) ? moment(bank.updated_at).format('DD MMMM YYYY à HH:mm:ss') : '/' }}
              </p>

              <q-separator />

              <p
                style="margin-bottom:0.5rem;margin-top:0.5rem;word-break: break-all;text-transform: initial; letter-spacing: normal;font-size: 16px;">
                Pour plus d"information :<br />
                <a href="https://www.mollie.com/fr/developers">https://www.mollie.com/fr/developers</a>
              </p>

            </q-card-section>

          </q-card>

        </q-expansion-item>

      </div>

    </transition>

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

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  companie_show = ref(false),
  expanded = ref(false),
  expanded2 = ref(false),
  expanded3 = ref(false),
  companie = ref([]),
  user = ref([]),
  validate_change = ref(false)

// Forms
const name_editable = ref(''),
  siret_editable = ref(''),
  siren_editable = ref(''),
  siege_editable = ref(''),
  adresse_editable = ref(''),
  founding_date_editable = ref(''),
  bank = ref([])

export default defineComponent({
  name: 'MyAccountCompaniePage',
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

      if (user.value.user_type === 2) {
        companie.value = userStore.stateUser.companie

        // Forms
        name_editable.value = userStore.stateUser.companie.name
        siret_editable.value = userStore.stateUser.companie.siret
        siren_editable.value = userStore.stateUser.companie.siren
        siege_editable.value = userStore.stateUser.companie.siege
        adresse_editable.value = userStore.stateUser.companie.adresse
        founding_date_editable.value = moment(userStore.stateUser.companie.ounding_date).format('DD/MM/YYYY')

        axios.get(folderAPI.value + '/api/companie/bank/' + userStore.stateUser.companie.companie_id)
          .then(res => {

            if (res.data.succes) {
              bank.value = res.data.bank
            } else {
              bank.value = []
            }

          })
      }

    }

    return {
      bank,
      moment: moment,
      user,
      companie,
      loader,
      logo,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      companie_show,
      folderAPI,
      expanded,
      expanded2,
      expanded3,

      name_editable,
      validate_change,
      siret_editable,
      siren_editable,
      siege_editable,
      adresse_editable,
      founding_date_editable,

      validateChange () {

        validate_change.value = false

        axios.post(process.env.API + '/api/companie/informations/edit', {
          companieId: userStore.stateUser.companie.id,
        }).then(res => {

          if (res.data.succes === true) {

            $q.notify({
              timeout: 2000,
              color: 'green-5',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Votre entreprise a été mise à jour. Veuillez vous déconnecter pour appliquer la mise à jour.',
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

    companie_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      companie_show.value = true
      logo.value = true
    }, 4000);

    if (this.connexionState && isLoggedIn) {

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
