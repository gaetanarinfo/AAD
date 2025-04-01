<template name="AddPrestationPage">

  <q-page
    :class="(!connexionState) ? 'disabled q-page q-page-start q-page-no-padding' : 'q-page q-page-start q-page-no-padding'"
    :style-fn="heightAuto">

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

    <transition v-show="prestation_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Demande de prestation</h5>

        <div class="w-100 text-center q-pl-md q-pr-md form-w">

          <q-input bottom-slots @keyup="search()" v-model="searchCompanies" label="Rechercher..." dense counter
            maxlength="30" :dense="dense">

            <template v-slot:append>
              <q-icon v-if="text !== ''" name="close" @click="text = ''" class="cursor-pointer" />
              <q-icon name="search" />
            </template>

          </q-input>

          <div class="flex"
            style="align-content: start;justify-content: flex-start;align-items: start; margin-top:16px">

            <q-btn @click="searchGeolocation" dense class="q-pa-sm glossy" color="light-blue-9" v-ripple size="13px">
              <q-icon class="q-mr-sm" size="15px" name="fa-solid fa-location-dot" />
              <span style="text-transform: none;" class="text-bold">Partager ma position</span>
            </q-btn>

          </div>

          <q-list style="margin-top: 16px;">

            <div v-if="loaderGeolocation" class="column flex-center" style="min-height: 71px;">
              <q-spinner-puff size="50px" color="light-blue-9" />
            </div>

            <q-item v-if="!loaderGeolocation" v-for="companie in companies"
              style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;" clickable v-ripple
              :class="(companieSelected !== companie.id) ? 'bg-grey-3 q-mb-md' : 'q-mb-md'"
              :active="(companieSelected === companie.id) ? true : false"
              @click="!companieActive ? companieActive = true : companieActive = false, companieSelected = companie.id"
              active-class="bg-light-blue-9 glossy text-white">

              <q-item-section avatar>
                <q-icon color="light-blue-9" name="domain" />
              </q-item-section>

              <q-item-section class="text-left">
                <span>{{ companie.name }}</span>
                <span style="font-size: 12px;">{{ companie.adresse }}</span>
              </q-item-section>

              <q-item-section avatar>
                <q-icon color="light-blue-9" name="keyboard_arrow_right" />
              </q-item-section>

            </q-item>

            <div v-if="!loaderGeolocation && companies.length === 0" class="flex"
              style="align-content: center;justify-content: center;align-items: center;min-height: 71px;text-align: center;">
              <q-icon name="fa-solid fa-triangle-exclamation" color="orange-9" class="q-mr-sm" /> <span
                class="text-bold">Aucune
                entreprise n'a
                été
                trouvée.</span>
            </div>

          </q-list>

          <div v-show="companiesNumberShow" class="q-mt-lg flex flex-center">
            <q-pagination @update:model-value="val => showCompanies(val)" v-model="current" color="light-blue-9"
              :max="Math.ceil(companiesNumber / 10)" :max-pages="Math.ceil(companiesNumber / 10)" :ellipses="false"
              :boundary-numbers="false" />
          </div>

          <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
            <q-btn size="xl" :disable="!companieSelected" @click="showService()" color="light-blue-9 glossy"
              style="max-width: 100px;" v-ripple dense rounded icon="arrow_forward"></q-btn>
          </div>

        </div>

      </div>

    </transition>

    <transition v-show="service_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Demande de prestation</h5>

        <div class="w-100 text-center q-pl-md q-pr-md form-w">

          <q-list style="margin-top: 16px;">

            <div v-if="services.length === 0" class="flex"
              style="align-content: center;justify-content: center;align-items: center;text-align: center;">
              <q-icon name="fa-solid fa-triangle-exclamation" color="orange-9" class="q-mr-sm" /> <span
                class="text-bold">Cette entreprise ne propose aucun service !</span>
            </div>

            <q-item v-if="services.length >= 1" v-for="service in services"
              style="padding-bottom: 1rem;padding-top: 1rem;border-radius: 6px;" clickable v-ripple
              :class="(serviceSelected.includes(service.id)) ? 'bg-light-blue-9 q-mb-md' : 'bg-grey-3 q-mb-md'"
              :active="(serviceSelected.includes(service.id)) ? true : false"
              @click="!serviceSelected.includes(service.id) ? addService(service.id) : removeService(service.id)"
              active-class="bg-light-blue-9 glossy text-white">

              <q-item-section style="width: 50px; height: 30px; max-width: 30px;">
                <q-img style="width: 30px; height: 30px;" :src="folderAPI + '/services/' + service.icone" />
              </q-item-section>

              <q-item-section class="text-left" style="margin-left: 16px;">
                <q-item-label>{{ service.name }}</q-item-label>
              </q-item-section>

              <q-item-section style="justify-content: flex-start;" avatar>
                <q-icon :color="(serviceSelected.includes(service.id)) ? 'white' : 'black'"
                  name="keyboard_arrow_right" />
              </q-item-section>

            </q-item>

          </q-list>

          <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
            <q-btn size="xl" :disable="(serviceSelected.length === 0) ? true : false" @click="showCalendar()"
              color="light-blue-9 glossy" style="max-width: 100px;" v-ripple dense rounded icon="arrow_forward"></q-btn>
          </div>

        </div>

      </div>

    </transition>

    <transition v-show="planning_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Demande de prestation</h5>

        <div class="w-100 text-center q-pl-md q-pr-md form-w">

          <q-form @submit="showCoordonnees()">

            <q-input dense filled v-model="event" mask="##/##/####" label="Début de prestation *" :rules="[checkDate]">
              <template v-slot:prepend>

                <q-icon name="event" class="cursor-pointer">

                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date @input="() => $refs.qDateProxy.hide()" mask="DD/MM/YYYY" :options="optionsCalendar"
                      v-model="event">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>

                </q-icon>

              </template>

            </q-input>

            <q-input dense filled v-model="event2" mask="##/##/####" label="Fin de prestation *" :rules="[checkDate]">
              <template v-slot:prepend>

                <q-icon name="event" class="cursor-pointer">

                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date @input="() => $refs.qDateProxy.hide()" :options="optionsCalendar2" mask="DD/MM/YYYY"
                      v-model="event2">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>

                </q-icon>

              </template>

            </q-input>

            <q-input dense filled v-model="event_hour_start" mask="##:##" label="Heure de début de prestation *"
              lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>

                <q-icon name="access_time" class="cursor-pointer">

                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time range v-model="event_hour_start" mask="HH:mm" @input="() => $refs.qDateProxy.hide()">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>

                </q-icon>

              </template>

            </q-input>

            <q-input dense filled v-model="event_hour_end" mask="##:##" label="Heure de fin de prestation *" lazy-rules
              :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

              <template v-slot:prepend>

                <q-icon name="access_time" class="cursor-pointer">

                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time range v-model="event_hour_end" mask="HH:mm" @input="() => $refs.qDateProxy.hide()">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>

                </q-icon>

              </template>

            </q-input>

            <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
              <q-btn size="xl" :disable="(serviceSelected.length === 0) ? true : false" type="submit"
                color="light-blue-9" class="glossy" style="max-width: 100px;" v-ripple dense rounded
                icon="arrow_forward"></q-btn>
            </div>

          </q-form>

        </div>

      </div>

    </transition>

    <transition v-show="coordonnees_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Lieu de la prestation</h5>

        <div class="w-100 text-center q-pl-md q-pr-md form-w">

          <q-form @submit="sendFormCoordonnees()">

            <div class="row row-form">

              <div class="col-12">
                <q-input dense filled v-model="adresse" @keyup="getAdresse" label="Adresse *" lazy-rules
                  :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                  <template v-slot:prepend>
                    <q-icon size="xs" name="location_on" />
                  </template>

                </q-input>
              </div>

              <div class="col-6 ">

              </div>

            </div>

            <q-list bordered separator v-show="showAdresses" style="margin-bottom: 16px;">

              <q-item clickable v-ripple @click="setAdress(adress)" v-for="adress in adresses">

                <q-item-section style="justify-content: flex-start;" avatar>
                  <q-icon color="light-blue-9" name="location_on" />
                </q-item-section>

                <q-item-section class="text-left">
                  <q-item-label style="text-overflow: initial;white-space: initial;overflow: initial;" caption
                    lines="1"><strong>{{ adress.address_line1 + ', ' }}</strong></q-item-label>
                  <q-item-label tyle="text-overflow: initial;white-space: initial;overflow: initial;" caption
                    lines="2"><strong>{{ adress.postcode + ' ' + adress.city + ' ' + adress.country
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

            </div>

            <div class="row-center" style="margin-top: 30px;margin-bottom: 30px;">
              <q-btn size="xl" type="submit" color="light-blue-9" class="glossy" style="max-width: 100px;" v-ripple
                dense rounded icon="arrow_forward"></q-btn>
            </div>

          </q-form>

        </div>

      </div>

    </transition>

    <transition v-show="paiement_show" appear enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Paiement de la prestation</h5>

        <div class="w-100 text-center q-pl-md q-pr-md form-w">

          <q-list bordered separator>

            <q-item v-for="item_price in price_ht_hour">

              <q-item-section style="width: 25px; height: 25px; max-width: 25px;">
                <q-img style="width: 30px; height: 30px;" :src="folderAPI + '/services/' + item_price.icone" />
              </q-item-section>

              <q-item-section class="text-left" style="margin-left: 16px;margin-right: 16px;">
                <q-item-label caption lines="1"><strong>{{ item_price.name }}</strong></q-item-label>
                <q-item-label caption lines="2"
                  style="margin-top: 0.5rem;overflow:initial;text-wrap: initial;text-transform: none;display: block !important;">Prestation
                  de service <span class="text-lowercase">{{
                    item_price.name
                  }} du {{ event }} à {{ replace(':', 'h', event_hour_start) }} au {{ event2 }} à {{ replace(':', 'h',
                      event_hour_end)
                    }}</span></q-item-label>
                <q-item-label caption lines="4"><strong>Prix de l'heure :</strong> {{ item_price.price_ttc_hour }}
                  €</q-item-label>
              </q-item-section>

            </q-item>

          </q-list>

          <q-card class="text-white glossy bg-light-blue-9" bordered style="margin-top: 30px;">

            <q-item>

              <q-item-section class="text-right row content-end">
                <q-item-label><strong>Crédit d'impôt :</strong> {{
                  credit_impot }} %</q-item-label>
                <q-item-label><strong>Total des jours de pretation :</strong> {{ cart_day }} jour(s)</q-item-label>
                <q-item-label><strong>Total des heures de pretation :</strong> {{ cart_hour }} heure(s)</q-item-label>
                <q-item-label><strong>Total :</strong> {{ cart_ttc }} €</q-item-label>
              </q-item-section>

            </q-item>

          </q-card>

          <q-item style="margin-bottom: 30px;margin-top:30px;padding-top: 0;justify-content: center;" class="w-100">
            <q-img src="~assets/paiement-securise-cb.jpeg" style="max-width: 230px;" spinner-color="light-blue-9" />
          </q-item>

          <div class="row-center w-100" style="margin-top: 30px;margin-bottom: 30px;">

            <q-btn @click="setPaiementPrestation" glossy v-ripple padding="10px" class="w-100" dense
              color="light-blue-9">

              <div style="font-weight: 600;">Payer maintentant</div>

            </q-btn>

          </div>

        </div>

      </div>

    </transition>

    <FooterComponent />

  </q-page>

</template>

<script>

import { defineComponent, ref } from 'vue'
import { useRouter } from "vue-router"
import { useUserStore } from 'stores/user'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  prestation_show = ref(false),
  service_show = ref(false),
  planning_show = ref(false),
  coordonnees_show = ref(false),
  paiement_show = ref(false),
  user = ref([]),
  companies = ref([]),
  searchCompanies = ref(null),
  text = ref(''),
  companieActive = ref(false),
  companieSelected = ref(0),
  current = ref(1),
  companiesNumber = ref(0),
  companiesNumberShow = ref(false),
  services = ref([]),
  serviceSelected = ref([]),
  serviceActive = ref(false),
  event = ref(''),
  event2 = ref(''),
  event_hour_start = ref(''),
  event_hour_end = ref(''),
  adresses = ref([]),
  adresse = ref(''),
  ville = ref(''),
  codepostal = ref(''),
  pays = ref([]),
  showAdresses = ref(false),
  loaderAdresse = ref(false),
  options = ref([]),
  loaderGeolocation = ref(false),
  price_ht_hour = ref([]),
  credit_impot_active = ref(false)


// Cart
const cart_ttc = ref(0.00),
  credit_impot = ref(50),
  cart_day = ref(0),
  cart_hour = ref(0)

export default defineComponent({
  name: 'InboxtPage',
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
    } else if (!userStore.stateUser.user.user_type >= 2) {
      router.push('/')
    }

    if (connexionState.value && isLoggedIn.value) {

      axios.get(folderAPI.value + '/api/user/companies/' + current.value + '/' + searchCompanies.value)
        .then(res => {

          if (res.data.succes) {

            companies.value = res.data.companies
            companiesNumber.value = res.data.companiesNumber

            if (companiesNumber.value >= 11) {
              companiesNumberShow.value = true
            } else {
              companiesNumberShow.value = false
            }

          } else {

            companies.value = []
            companiesNumber.value = 1
            companiesNumberShow.value = false

            $q.notify({
              timeout: 2000,
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'Une erreur est survenue !',
              progress: true,
              classes: 'glossy',
            })

          }

        }).catch(error => {

          companies.value = []
          companiesNumber.value = 1
          companiesNumberShow.value = false

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

    }

    return {
      credit_impot_active,
      cart_ttc,
      cart_day,
      cart_hour,
      credit_impot,
      price_ht_hour,
      loaderGeolocation,
      setPaiementPrestation () {

        prestation_show.value = false
        service_show.value = false
        planning_show.value = false
        coordonnees_show.value = false
        paiement_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        axios.post(process.env.API + '/api/paypal/order-insert-services',
          {
            start_prestation: event.value.split('/').reverse().join('-'),
            end_prestation: event2.value.split('/').reverse().join('-'),
            hour_start_prestation: event_hour_start.value.replace('h', ':'),
            hour_end_prestation: event_hour_end.value.replace('h', ':'),
            total_days: cart_day.value,
            total_hours: cart_hour.value,
            total_ttc: cart_ttc.value,
            services_id: serviceSelected.value,
            companie_id: companieSelected.value,
            user: {
              id: userStore.stateUser.user.id,
              adresse_prestation: adresse.value,
              ville_prestation: ville.value,
              code_postal_prestation: codepostal.value,
              pays_prestation: pays.value.value
            }
          }
        ).then(res => {

          if (res.data.succes) {

            location.href = process.env.API + '/api/paypal/create-order-services/' + res.data.order_id

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

        })

        // setTimeout(() => {
        //   loader.value = false
        // }, 3500);

        // setTimeout(() => {
        //   logo.value = true
        // }, 4000);

      },
      searchGeolocation () {

        if (connexionState) {

          // onSuccess Callback
          // This method accepts a Position object, which contains the
          // current GPS coordinates
          //
          var onSuccess = function (position) {

            companies.value = []
            companiesNumber.value = 1
            companiesNumberShow.value = false
            loaderGeolocation.value = true

            axios.get(process.env.API + '/api/user/search-companies-geo/' + searchCompanies.value + '/' + current.value + '/' + position.coords.latitude + '/' + position.coords.longitude)
              .then(res => {

                if (res.data.succes) {

                  companies.value = res.data.companies
                  companiesNumber.value = res.data.companiesNumber

                  if (companiesNumber.value >= 11) {
                    companiesNumberShow.value = true
                  } else {
                    companiesNumberShow.value = false
                  }

                  loaderGeolocation.value = false

                } else {

                  companies.value = []
                  companiesNumber.value = 1
                  companiesNumberShow.value = false
                  loaderGeolocation.value = false

                }

              })

          };

          // onError Callback receives a PositionError object
          //
          function onError (error) {
            // enableMap.value = false
          }

          navigator.geolocation.getCurrentPosition(onSuccess, onError);

        }

      },
      sendFormCoordonnees () {

        prestation_show.value = false
        service_show.value = false
        planning_show.value = false
        coordonnees_show.value = false
        paiement_show.value = false
        logo.value = false

        axios.get(process.env.API + '/api/user/user-choices-tarifs/' + companieSelected.value + '/' + serviceSelected.value)
          .then(res => {

            if (res.data.succes) {

              if (res.data.price.length >= 1) {

                let totalCount = 0;

                price_ht_hour.value = res.data.price

                // Extraction des datas pour le panier
                res.data.price.forEach(element => {
                  let price = parseFloat(element.price_ttc_hour)
                  totalCount += price
                  credit_impot_active.value = (element.credit_impot >= 1) ? true : false
                });

                // Calcul du nombre de jour de prestation et des heures

                let date1 = event.value.split('/').reverse().join('-');
                let date2 = event2.value.split('/').reverse().join('-');
                let heure1 = moment(moment().format('YYYY-MM-DD') + ' ' + event_hour_start.value.replace('h', ':'));
                let heure2 = moment(moment().format('YYYY-MM-DD') + ' ' + event_hour_end.value.replace('h', ':'));

                cart_day.value = (moment(date2).diff(moment(date1), "days") === 0) ? 1 : moment(date2).diff(moment(date1), "days")
                cart_hour.value = heure2.diff(heure1, "hours")

                cart_ttc.value = (credit_impot_active.value) ? totalCount * parseInt(cart_hour.value) * parseInt(cart_day.value) / 2 : totalCount * parseInt(cart_hour.value) * parseInt(cart_day.value)

              } else {
                price_ht_hour.value = []
              }

            }

          })

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          paiement_show.value = true
        }, 4000);

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
      showCoordonnees () {

        prestation_show.value = false
        service_show.value = false
        planning_show.value = false
        coordonnees_show.value = false
        paiement_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          coordonnees_show.value = true
        }, 4000);

      },
      event_hour_start,
      event_hour_end,
      event,
      event2,
      optionsCalendar (date) {
        return date >= moment().format('YYYY/MM/DD')
      },
      optionsCalendar2 (date) {
        return date >= moment().format('YYYY/MM/DD')
      },
      showCalendar () {

        prestation_show.value = false
        service_show.value = false
        planning_show.value = false
        coordonnees_show.value = false
        paiement_show.value = false
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

      },
      addService (id) {
        serviceSelected.value.push(id)
      },
      removeService (id) {
        const index = serviceSelected.value.indexOf(id)
        if (index > -1) {
          serviceSelected.value.splice(index, 1);
        }
      },
      services,
      serviceSelected,
      serviceActive,
      showService () {

        prestation_show.value = false
        service_show.value = false
        planning_show.value = false
        coordonnees_show.value = false
        paiement_show.value = false
        logo.value = false

        axios.get(folderAPI.value + '/api/user/companies-services/' + companieSelected.value)
          .then(res => {

            if (res.data.succes) {
              services.value = res.data.services
            } else {
              services.value = []
            }

          }).catch(error => {

            services.value = []

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

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          service_show.value = true
        }, 4000);

      },
      search () {

        if (searchCompanies.value.length >= 3) {

          axios.get(folderAPI.value + '/api/user/companies/' + current.value + '/' + searchCompanies.value)
            .then(res => {

              if (res.data.succes) {

                companies.value = res.data.companies
                companiesNumber.value = res.data.companiesNumber

                if (companiesNumber.value >= 11) {
                  companiesNumberShow.value = true
                } else {
                  companiesNumberShow.value = false
                }

              } else {

                companies.value = []
                companiesNumber.value = 1
                companiesNumberShow.value = false

                $q.notify({
                  timeout: 2000,
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'warning',
                  message: 'Une erreur est survenue !',
                  progress: true,
                  classes: 'glossy',
                })

              }

            }).catch(error => {

              companies.value = []
              companiesNumber.value = 1
              companiesNumberShow.value = false

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

          axios.get(folderAPI.value + '/api/user/companies/' + current.value + '/' + 'null')
            .then(res => {

              if (res.data.succes) {

                companies.value = res.data.companies
                companiesNumber.value = res.data.companiesNumber

                if (companiesNumber.value >= 11) {
                  companiesNumberShow.value = true
                } else {
                  companiesNumberShow.value = false
                }

              } else {

                companies.value = []
                companiesNumber.value = 1
                companiesNumberShow.value = false

                $q.notify({
                  timeout: 2000,
                  color: 'red-5',
                  textColor: 'white',
                  icon: 'warning',
                  message: 'Une erreur est survenue !',
                  progress: true,
                  classes: 'glossy',
                })

              }

            }).catch(error => {

              companies.value = []
              companiesNumber.value = 1
              companiesNumberShow.value = false

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

        }

      },
      companiesNumber,
      companiesNumberShow,
      showCompanies (val) {

        axios.get(folderAPI.value + '/api/user/companies/' + val + '/' + searchCompanies.value)
          .then(res => {

            if (res.data.succes) {

              companies.value = res.data.companies
              companiesNumber.value = res.data.companiesNumber

              if (companiesNumber.value >= 11) {
                companiesNumberShow.value = true
              } else {
                companiesNumberShow.value = false
              }

            } else {

              companies.value = []
              companiesNumber.value = 1
              companiesNumberShow.value = false

              $q.notify({
                timeout: 2000,
                color: 'red-5',
                textColor: 'white',
                icon: 'warning',
                message: 'Une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })

            }

          }).catch(error => {

            companies.value = []
            companiesNumber.value = 1
            companiesNumberShow.value = false

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

      },
      current,
      companieSelected,
      text,
      companieActive,
      searchCompanies,
      companies,
      prestation_show,
      service_show,
      planning_show,
      coordonnees_show,
      paiement_show,
      moment: moment,
      loader,
      logo,
      user,
      onLine: navigator.onLine,
      connexionState,
      folderAPI,
      adresses,
      adresse,
      ville,
      codepostal,
      pays,
      showAdresses,
      loaderAdresse,
      options,
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
    },
    checkDate (val) {
      if (!val) return 'Date invalide.'
    },
    replace: function (st, rep, repWith) {
      const result = repWith.replace(st, rep)
      return result;
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

    prestation_show.value = false
    service_show.value = false
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
      prestation_show.value = true
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
