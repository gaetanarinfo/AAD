<template name="ContactPage">

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

    <transition v-show="bloc_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="column text-center w-100 form-w">

        <q-form @submit="onSubmitContact()" class="q-mt-md">

          <h5 class="q-mt-md q-mb-md">Contactez-nous</h5>

          <div class="flex-start row items-center" style="margin-bottom: 16px;">

            <q-item-label>Civilité :</q-item-label>

            <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
              val="Mr" label="Mr" />

            <q-radio v-model="civilite" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
              val="Mme" label="Mme" />

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

              <q-input dense filled v-model="email" label="Adresse email *" lazy-rules :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !',
              (val, rules) => rules.email(val) || 'S\'il vous plaît, mettez une adresse email valide !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="email" />
                </template>

              </q-input>

            </div>

            <div class="col-6">

              <q-input dense filled v-model="phone" mask="##-##-##-##-##" label="Téléphone *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="phone" />
                </template>

              </q-input>

            </div>

          </div>

          <div class="row row-form">

            <div class="col-12">

              <q-input dense filled v-model="sujet" label="Sujet *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="title" />
                </template>

              </q-input>

            </div>

          </div>

          <div class="row row-form">

            <div class="col-12">

              <q-input counter type="textarea" dense filled v-model="content" label="Votre message *" lazy-rules
                :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !', val => val && val.length <= 500 || 'Votre message doit comporter moins de 500 caractères !']">

                <template v-slot:prepend>
                  <q-icon size="xs" name="title" />
                </template>

              </q-input>

            </div>

          </div>

          <div class="row-center" style="margin-top: 30px;margin-bottom: 90px;;">
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
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  logo = ref(false),
  loader = ref(true),
  bloc_show = ref(false)

// Forms
const civilite = ref('Mr'),
  lastname = ref(''),
  firstname = ref(''),
  phone = ref(''),
  email = ref(''),
  sujet = ref(''),
  content = ref('')

export default defineComponent({
  name: 'ContactPage',
  components: {
    FooterComponent
  },
  setup () {

    const $q = useQuasar()

    return {
      onSubmitContact () {

        bloc_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(({ ip }) => {

            axios.post(folderAPI.value + '/api/contact',
              {
                lastname: lastname.value,
                firstname: firstname.value,
                email: email.value,
                phone: String(phone.value).replaceAll('-', ' '),
                sujet: sujet.value,
                content: content.value,
                ip
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
                  bloc_show.value = true
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
                  bloc_show.value = false
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
                bloc_show.value = false
              }, 4000);

            })

          })

      },
      bloc_show,
      moment: moment,
      loader,
      logo,
      onLine: navigator.onLine,
      connexionState,
      folderAPI,

      civilite,
      lastname,
      firstname,
      phone,
      email,
      sujet,
      content
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

    bloc_show.value = false
    logo.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      bloc_show.value = true
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
