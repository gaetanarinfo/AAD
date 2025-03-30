<template name="PricePage">

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

    <transition v-show="price_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Gestion des tarifs</h5>

        <div class="w-100 q-pl-md q-pr-md form-w">

          <q-form @submit="sendFormPrice()">

            <q-section-label class="text-left text-grey-8">Il est nécessaire d'indiquer les montants sans le crédit
              d'impôt et par heure de prestation !</q-section-label>

            <q-list class="w-100">

              <q-item v-if="services.length >= 1" class="w-100" v-for="(service, index) in services"
                style="align-items: center; padding-left: 0; padding-right: 0;">

                <q-section-label style="margin-top: 16px;" class="q-mr-md w-100">{{ service.name }}</q-section-label>

                <q-input dense filled mask="##,##" v-model="price_ht_hour[index].price_ht"
                  style="margin-top: 16px; max-width: 120px; padding-bottom: 0;" label="Montant HT *" lazy-rules
                  :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">
                  <template v-slot:append>

                    <q-icon size="16px" name="euro" />

                  </template>

                </q-input>

              </q-item>

            </q-list>

            <q-list style="margin-bottom: 16px;margin-top: 16px;">

              <q-item v-ripple class="q-pt-none q-pb-none q-pl-none q-pr-none">

                <q-item-section>
                  <q-item-label>Crédits d'impôt</q-item-label>
                </q-item-section>

                <q-item-section avatar>
                  <q-toggle color="light-blue-9" v-model="credit_impot" :val="0" checked-icon="check"
                    unchecked-icon="clear" keep-color />
                </q-item-section>

              </q-item>

            </q-list>

            <div class="text-center">

              <q-btn tag="a" color="light-blue-9" target="_blank" glossy size="13px"
                href="https://www.impots.gouv.fr/particulier/questions/comment-beneficier-du-credit-dimpot-pour-lemploi-dun-salarie-domicile"><span
                  style="font-weight: 600;text-transform: none;">Pour
                  plus
                  d'information ?</span></q-btn>

            </div>

            <div class="row-center w-100" style="margin-top: 30px;">

              <q-btn type="submit" glossy v-ripple padding="10px" class="w-100" dense color="light-blue-9">

                <div style="font-weight: 600;">Envoyer</div>

              </q-btn>

            </div>

          </q-form>

        </div>

      </div>

    </transition>

    <FooterComponent />

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
  price_show = ref(false),
  user = ref([]),
  price_ht_hour = ref([]),
  credit_impot = ref(false),
  services = ref([])

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

      user.value = userStore.stateUser.user

      var array = []

      if (user.value.user_type === 2) {

        axios.get(folderAPI.value + '/api/user/companies-services/' + userStore.stateUser.companie.id)
          .then(res => {

            if (res.data.succes) {

              services.value = res.data.services
              price_ht_hour.value = []

              services.value.forEach(element => {
                price_ht_hour.value.push({ 'price_ht': 0, service_id: element.id })
              });

            } else {

              services.value = []
              price_ht_hour.value = []

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

        axios.get(process.env.API + '/api/companie/user-tarifs/' + userStore.stateUser.companie.id)
          .then(res => {

            if (res.data.succes) {

              if (res.data.price.length >= 1) {

                credit_impot.value = (res.data.price[0].credit_impot === 0) ? false : true
                price_ht_hour.value = []

                res.data.price.forEach(element => {
                  price_ht_hour.value.push({ 'price_ht': element.price_ht_hour, service_id: element.service_id })
                });

              } else {
                price_ht_hour.value = []
              }

            }

          })

      }

    }

    return {
      sendFormPrice () {

        price_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        axios.post(folderAPI.value + '/api/companie/user-tarifs',
          {
            companieId: userStore.stateUser.companie.id,
            price_ht_hour: price_ht_hour.value,
            credit_impot: credit_impot.value
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

            setTimeout(() => {
              loader.value = false
            }, 3500);

            setTimeout(() => {
              logo.value = true
              price_show.value = true
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
              price_show.value = true
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
            price_show.value = true
          }, 4000);

        })

      },
      services,
      credit_impot,
      price_ht_hour,
      price_show,
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

    price_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      price_show.value = true
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
