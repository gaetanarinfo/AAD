<template name="EmployeeEditPage">

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
            <q-img spinner-color="light-blue-9" :src="user_employee.photo" />
          </q-avatar>

        </div>

        <h5>{{ user_employee.firstname + ' ' + user_employee.lastname }}</h5>

        <div class="w-100" style="margin-bottom: 1.67em;">

          <q-btn-group class="w-100">

            <q-btn @click="btn_profil = 'edit', changeProfil()" :disable="(btn_profil === 'edit') ? true : false"
              class="w-100" style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;"
              color="light-blue-9" glossy text-color="white" label="Éditer" />

            <q-btn @click="btn_profil = 'planning', changeProfil()"
              :disable="(btn_profil === 'planning') ? true : false" class="w-100"
              style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;" color="light-blue-9"
              glossy text-color="white" v-ripple label="Planning" />

          </q-btn-group>

        </div>

        <q-form @submit="onSubmitEditUser">

          <div class="flex-start column items-start" style="margin-bottom: 10px;">

            <q-item-label class="text-weight-bold">Statut :</q-item-label>

            <div class="flex-start row items-start">

              <q-radio v-model="status_user" checked-icon="task_alt" color="light-blue-9" unchecked-icon="lock_open"
                val="1" label="Actif" />

              <q-radio v-model="status_user" checked-icon="task_alt" color="light-red-9" unchecked-icon="lock" val="0"
                label="Inactif" />

            </div>

          </div>

          <div class="flex-start column items-start" style="margin-bottom: 10px;">

            <q-item-label class="text-weight-bold">Statut dans l'entreprise :</q-item-label>

            <div class="flex-start row items-start">

              <q-radio v-model="status" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
                val="2" label="Dirigeant" />

              <q-radio v-model="status" checked-icon="task_alt" color="light-blue-9" unchecked-icon="panorama_fish_eye"
                val="3" label="Employé" />

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

    <transition v-show="planing_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"
      style="margin-top: 30px;">

      <div class="column text-center w-100 form-w">

        <div class="w-100">

          <q-avatar style="width: 100px;height: auto;">
            <q-img spinner-color="light-blue-9" :src="user_employee.photo" />
          </q-avatar>

        </div>

        <h5>{{ user_employee.firstname + ' ' + user_employee.lastname }}</h5>

        <div class="w-100" style="margin-bottom: 1.67em;">

          <q-btn-group class="w-100">

            <q-btn @click="btn_profil = 'edit', changeProfil()" :disable="(btn_profil === 'edit') ? true : false"
              class="w-100" style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;"
              color="light-blue-9" glossy text-color="white" label="Éditer" />

            <q-btn @click="btn_profil = 'planning', changeProfil()"
              :disable="(btn_profil === 'planning') ? true : false" class="w-100"
              style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;" color="light-blue-9"
              glossy text-color="white" v-ripple label="Planning" />

          </q-btn-group>

        </div>

        <q-form @submit="sendFormPlanning()">

          <q-list style="text-align: left;" class="w-100">

            <q-expansion-item :disable="tab === day" :default-opened="day === 'Lundi'" group="somegroup"
              v-for="day in days" @click="showTab(day)" hide-expand-icon class="q-mb-md"
              :header-class="(tab === day) ? 'glossy bg-light-blue-9 text-white' : 'bg-grey-3'" expand-separator>

              <template v-slot:header>
                <q-item-section style="padding-left: 16px; padding-right: 16px;font-weight: 600;">
                  {{ day }}
                </q-item-section>

                <q-item-section side style="padding-left: 10px; padding-right: 10px;">
                  <div class="row items-center">
                    <q-icon :name="(tab === day) ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                      :color="(tab === day) ? 'white' : 'black'" size="24px" />
                  </div>
                </q-item-section>
              </template>

              <q-card>

                <q-card-section>

                  <q-list>

                    <q-item tag="label" v-ripple>

                      <q-item-section>
                        <q-item-label>Congé</q-item-label>
                      </q-item-section>

                      <q-item-section avatar>
                        <q-toggle color="light-blue-9" v-model="conge[0][day].active" :val="day" checked-icon="check"
                          unchecked-icon="clear" keep-color />
                      </q-item-section>

                    </q-item>

                  </q-list>

                  <div v-show="!conge[0][day].active">

                    <q-separator style="margin: 0 0 20px 0;" />

                    <q-label>Matin :</q-label>

                    <div class="row">
                      <div class="col-6" style="padding-right: 15px;">
                        <q-input dense v-model="conge[0][day].am" mask="time">
                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="conge[0][day].am">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>

                      <div class="col-6" style="padding-left: 15px;">
                        <q-input dense v-model="conge[0][day].am2" mask="time">
                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="conge[0][day].am2">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>

                    <q-item-label style="margin-top: 20px;">Après-midi :</q-item-label>

                    <div class="row">
                      <div class="col-6" style="padding-right: 15px;">
                        <q-input dense v-model="conge[0][day].pm" mask="time">
                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="conge[0][day].pm">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>

                      <div class="col-6" style="padding-left: 15px;">
                        <q-input dense v-model="conge[0][day].pm2" mask="time">
                          <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="conge[0][day].pm2">
                                  <div class="row items-center justify-end">
                                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                                  </div>
                                </q-time>
                              </q-popup-proxy>
                            </q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>

                  </div>

                </q-card-section>

              </q-card>

            </q-expansion-item>

          </q-list>

          <div class="row-center w-100" style="margin-top: 30px;margin-bottom: 90px;;">

            <q-btn type="submit" glossy v-ripple padding="10px" class="w-100" dense color="light-blue-9">

              <div style="font-weight: 600;">Envoyer</div>

            </q-btn>

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
import { useRouter, useRoute } from "vue-router"
import { SessionStorage, useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import axios from 'axios'
import moment from 'moment/min/moment-with-locales';
import FooterComponent from 'components/Footer.vue'

moment.locale('fr')

const connexionState = ref(true),
  folderAPI = ref(process.env.API),
  loader = ref(true),
  users_show = ref(false),
  planing_show = ref(false),
  user_employee = ref([]),
  user = ref([]),
  btn_profil = ref('edit'),
  days = ref([
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
    'Dimanche',
  ]),
  tab = ref(''),
  conge = ref([{
    'Lundi': {
      day: 'Lundi',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
    'Mardi': {
      day: 'Mardi',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
    'Mercredi': {
      day: 'Mercredi',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
    'Jeudi': {
      day: 'Jeudi',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
    'Vendredi': {
      day: 'Vendredi',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
    'Samedi': {
      day: 'Samedi',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
    'Dimanche': {
      day: 'Dimanche',
      am: '00:00',
      am2: '00:00',
      pm: '00:00',
      pm2: '00:00',
      active: false
    },
  }])

// Forms
const email = ref(''),
  lastname = ref(''),
  userId = ref(0),
  firstname = ref(''),
  naissance = ref(''),
  phone = ref(''),
  civilite = ref(''),
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
  name: 'EmployeeEditPage',
  components: {
    FooterComponent
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const router = useRouter()
    const route = useRoute()
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

        user_employee.value = []

        axios.get(process.env.API + '/api/companie/user/edit/' + userStore.stateUser.companie.id + '/' + route.params.email)
          .then(res => {

            if (res.data.succes) {

              user_employee.value = res.data.user

              // Forms
              userId.value = res.data.user.id
              status.value = String(user_employee.value.user_type)
              status_user.value = String(user_employee.value.active)
              email.value = user_employee.value.email
              lastname.value = user_employee.value.lastname
              firstname.value = user_employee.value.firstname
              phone.value = user_employee.value.phone
              naissance.value = user_employee.value.naissance
              civilite.value = user_employee.value.civilite
              fonction.value = user_employee.value.fonction
              adresse.value = user_employee.value.adresse
              ville.value = user_employee.value.ville
              codepostal.value = String(user_employee.value.codepostal)
              pays.value = user_employee.value.pays

              axios.get(process.env.API + '/api/companie/user-planning/' + userStore.stateUser.companie.id + '/' + userId.value)
                .then(res => {

                  if (res.data.succes) {

                    if (res.data.planning.length >= 1) {

                      conge.value = []

                      conge.value = [{
                        'Lundi': {
                          day: res.data.planning[0].day,
                          am: res.data.planning[0].hour_am,
                          am2: res.data.planning[0].hour_am2,
                          pm: res.data.planning[0].hour_pm,
                          pm2: res.data.planning[0].hour_pm2,
                          active: (res.data.planning[0].active === 1) ? false : true
                        },
                        'Mardi': {
                          day: res.data.planning[1].day,
                          am: res.data.planning[1].hour_am,
                          am2: res.data.planning[1].hour_am2,
                          pm: res.data.planning[1].hour_pm,
                          pm2: res.data.planning[1].hour_pm2,
                          active: (res.data.planning[1].active === 1) ? false : true
                        },
                        'Mercredi': {
                          day: res.data.planning[2].day,
                          am: res.data.planning[2].hour_am,
                          am2: res.data.planning[2].hour_am2,
                          pm: res.data.planning[2].hour_pm,
                          pm2: res.data.planning[2].hour_pm2,
                          active: (res.data.planning[2].active === 1) ? false : true
                        },
                        'Jeudi': {
                          day: res.data.planning[3].day,
                          am: res.data.planning[3].hour_am,
                          am2: res.data.planning[3].hour_am2,
                          pm: res.data.planning[3].hour_pm,
                          pm2: res.data.planning[3].hour_pm2,
                          active: (res.data.planning[3].active === 1) ? false : true
                        },
                        'Vendredi': {
                          day: res.data.planning[4].day,
                          am: res.data.planning[4].hour_am,
                          am2: res.data.planning[4].hour_am2,
                          pm: res.data.planning[4].hour_pm,
                          pm2: res.data.planning[4].hour_pm2,
                          active: (res.data.planning[4].active === 1) ? false : true
                        },
                        'Samedi': {
                          day: res.data.planning[5].day,
                          am: res.data.planning[5].hour_am,
                          am2: res.data.planning[5].hour_am2,
                          pm: res.data.planning[5].hour_pm,
                          pm2: res.data.planning[5].hour_pm2,
                          active: (res.data.planning[5].active === 1) ? false : true
                        },
                        'Dimanche': {
                          day: res.data.planning[6].day,
                          am: res.data.planning[6].hour_am,
                          am2: res.data.planning[6].hour_am2,
                          pm: res.data.planning[6].hour_pm,
                          pm2: res.data.planning[6].hour_pm2,
                          active: (res.data.planning[6].active === 1) ? false : true
                        },
                      }]

                    }

                  }

                })

            } else {
              user_employee.value = []
              router.push('/companie')
            }

          })

      }

    }

    return {
      showTab (day) {
        tab.value = day
      },
      sendFormPlanning () {

        users_show.value = false
        planing_show.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        axios.post(folderAPI.value + '/api/companie/user-planning',
          {
            companieId: userStore.stateUser.companie.id,
            userId: userId.value,
            email: route.params.email,
            conge: conge.value,
            days: days.value
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

        btn_profil.value = 'edit'

      },
      changeProfil () {

        users_show.value = false
        planing_show.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        if (btn_profil.value === 'edit') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            users_show.value = true
          }, 4000);

        } else if (btn_profil.value === 'planning') {

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            planing_show.value = true
          }, 4000);

        }

      },
      onSubmitEditUser () {

        users_show.value = false
        planing_show.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        axios.post(folderAPI.value + '/api/companie/user/edit/',
          {
            companieId: userStore.stateUser.companie.id,
            user_type: status.value,
            fonction: fonction.value,
            email: route.params.email,
            lastname: lastname.value,
            firstname: firstname.value,
            naissance: String(naissance.value).replaceAll('/', '-').replaceAll('\/', '-'),
            phone: String(phone.value).replaceAll('-', ' '),
            civilite: civilite.value,
            adresse: adresse.value,
            ville: ville.value,
            codepostal: codepostal.value,
            pays: pays.value.value,
            status_user: status_user.value
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

            user_employee.value = []

            axios.get(process.env.API + '/api/companie/user/edit/' + userStore.stateUser.companie.id + '/' + route.params.email)
              .then(res => {

                if (res.data.succes) {

                  user_employee.value = res.data.user

                  // Forms
                  status.value = String(user_employee.value.user_type)
                  status_user.value = String(user_employee.value.active)
                  email.value = user_employee.value.email
                  lastname.value = user_employee.value.lastname
                  firstname.value = user_employee.value.firstname
                  phone.value = user_employee.value.phone
                  naissance.value = user_employee.value.naissance
                  civilite.value = user_employee.value.civilite
                  fonction.value = user_employee.value.fonction
                  adresse.value = user_employee.value.adresse
                  ville.value = user_employee.value.ville
                  codepostal.value = String(user_employee.value.codepostal)
                  pays.value = user_employee.value.pays

                } else {
                  user_employee.value = []
                  router.push('/companie')
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

      userId,
      days,
      tab,
      planing_show,
      btn_profil,
      user_employee,
      moment: moment,
      user,
      loader,
      isLoggedIn,
      onLine: navigator.onLine,
      connexionState,
      users_show,
      folderAPI,

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
      conge,
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

    tab.value = 'Lundi'

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

    users_show.value = false
    planing_show.value = false

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
