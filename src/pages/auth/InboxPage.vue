<template name="InboxPage">

  <q-page
    :class="(!connexionState) ? 'disabled q-page q-page-start q-page-no-padding' : 'q-page q-page-start q-page-no-padding'"
    :style-fn="heightAuto">

    <!-- Back -->
    <transition v-show="back" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="absolute-left" style="z-index: 1;width: 44px; height: 44px;margin-left: 16px;margin-top: 16px;">
        <q-btn glossy @click="showBack()" round icon="arrow_back" v-ripple padding="10px" dense color="light-blue-9">
        </q-btn>
      </div>
    </transition>

    <!-- Filter -->
    <transition v-show="filters" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="absolute-right" style="z-index: 1;width: 44px; height: 44px;margin-right: 16px;margin-top: 16px;">
        <q-btn glossy @click="showFilter()" round icon="filter_alt" v-ripple padding="10px" dense color="light-blue-9">
        </q-btn>
      </div>
    </transition>

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

    <transition v-show="inbox_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Mes courriers reçus</h5>

        <div class="w-100 text-left q-pl-md q-pr-md">

          <div class="row" style="align-items: center;justify-content: space-between;" v-show="show_year">

            <div class="col-6">
              <p style="text-transform: initial;font-weight: 500;letter-spacing: normal;font-size: 16px;">{{
                filter }}
              </p>
            </div>

            <div class="col-6" style="max-width: 150px;">
              <q-select standout @update:model-value="val => changeYear(val)" borderless style="margin-bottom: 16px;"
                dense v-model="filter" map-options :options="options" emit-value transition-show="scale"
                transition-hide="scale">

                <template v-slot:prepend>
                  <q-icon size="xs" name="calendar_month" />
                </template>

                <template v-slot:option="{ itemProps, opt }">

                  <q-item v-bind="itemProps">

                    <q-item-section>
                      <q-item-label v-html="opt.label" />
                    </q-item-section>

                  </q-item>

                </template>

              </q-select>
            </div>

          </div>

          <q-list v-if="mails.length >= 1" separator class="w-100 q-mb-md">
            <q-item @click="showMail(mail.id)" clickable v-ripple v-for="mail in mails"
              style="padding-bottom: 1rem;padding-top: 1rem;">

              <q-item-section style="justify-content: flex-start;" avatar>
                <q-icon v-if="mail.read_mail === 0" color="light-blue-9" name="mail">
                  <q-badge floating color="red" rounded />
                </q-icon>
                <q-icon v-else color="light-blue-9" name="drafts" />
              </q-item-section>

              <q-item-section class="text-left">
                <q-item-label
                  style="text-overflow: initial;white-space: initial;overflow: initial;text-transform: initial;" caption
                  lines="1">{{ mail.sujet }}</q-item-label>
                <q-item-label style="text-overflow: initial;white-space: initial;overflow: initial;" caption
                  lines="3"><strong>{{
                    moment(mail.created_at).format('DD MMMM') }} - {{ mail.name_type }}</strong></q-item-label>
              </q-item-section>

              <q-item-section style="justify-content: flex-start;" avatar>
                <q-icon color="light-blue-9" name="keyboard_arrow_right" />
              </q-item-section>

            </q-item>

          </q-list>

          <div v-else>
            <span class="text-weight-bold">Aucun email reçu pour l'année {{ filter }}</span>
          </div>

        </div>

      </div>

    </transition>

    <transition v-show="mail_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 90px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">{{ mail_detail.sujet }}</h5>

        <div class="w-100 text-center q-pl-md q-pr-md">

          <p class="text-left"
            style="color: rgba(0, 0, 0, 0.54); font-weight: 600;letter-spacing: normal;text-transform: none;font-size: 14px;">
            Reçu le<br />{{ moment(mail_detail.created_at).format('DD MMMM YYYY à HH:mm') }}
          </p>

          <q-separator style="margin: 0 0 16px;"></q-separator>

          <p class="text-left"
            style="color: rgba(0, 0, 0, 0.54); font-weight: 600;letter-spacing: normal;text-transform: none;font-size: 14px;">
            Type de message <br />{{ mail_detail.name_type }}
          </p>

          <q-separator style="margin: 0 0 16px;"></q-separator>

          <p class="text-left"
            style="color: rgba(0, 0, 0, 0.54); font-weight: 600;letter-spacing: normal;text-transform: none;font-size: 14px;">
            Destinataire </p>

          <div class="text-left qavatar" style="height: auto;margin: 0 0 16px;">
            <q-avatar size="40px" class="overlapping" v-for="user in user_list" :key="user.id"
              :style="`margin-right: ${user.id * 3}px`">
              <img :src="user.photo">
              <q-tooltip anchor="top right" self="top right" class="glossy bg-light-blue-9"
                style="min-width: 200px;padding: 0 10px; height: 25px;"><span
                  style="font-size: 8px;font-weight: 600;">{{
                    user.firstname }} {{ user.lastname }}</span></q-tooltip>
            </q-avatar>
          </div>

          <q-separator style="margin: 0 0 16px;"></q-separator>

          <p class="text-left"
            style="color: rgba(0, 0, 0, 0.54); font-weight: 600;letter-spacing: normal;text-transform: none;font-size: 14px;">
            Sujet <br />{{ mail_detail.sujet }}
          </p>

          <q-separator style="margin: 0 0 16px;"></q-separator>

          <div class="text-left" style="margin: 0 0 16px;white-space: pre-wrap;overflow-wrap: break-word;"
            v-html="mail_detail.content"></div>

        </div>

      </div>

    </transition>

    <transition v-show="send_show" appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">

      <div class="w-100 flex flex-center column" style="margin-bottom: 50px;">

        <h5 class="text-center" style="margin-top: 1rem;margin-bottom: 1rem;">Nouveau message</h5>

        <div class="w-100 text-left q-pl-md q-pr-md form-w">

          <q-form @submit="onSubmitMessage()" autocorrect="off" autocapitalize="off" autocomplete="off"
            spellcheck="false">

            <q-select filled map-options v-model="users_to" multiple transition-show="scale" transition-hide="scale"
              style="margin-bottom: 16px" :options="options2" label="Destinataire" />

            <q-chip v-for="user in users_to" class="glossy" color="light-blue-9"
              style="font-weight: 600;font-size: 11px;" text-color="white">

              <q-avatar size="15px">
                <img :src="user.photo">
              </q-avatar>

              <q-item-label style="margin-left: 5px">{{ user.label }}</q-item-label>

            </q-chip>

            <q-separator style="margin: 16px 0;"></q-separator>

            <div class="row row-form">

              <div class="col-6 form-padding">
                <q-input dense filled v-model="sujet" label="Sujet *" lazy-rules
                  :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

                  <template v-slot:prepend>
                    <q-icon size="xs" name="title" />
                  </template>

                </q-input>
              </div>

              <div class="col-6">
                <q-select dense filled map-options v-model="type" transition-show="scale" transition-hide="scale"
                  style="margin-bottom: 16px" :options="options3" label="Type de message" />
              </div>

            </div>

            <div class="row row-form">

              <div class="col-12">

                <q-editor toolbar-bg="light-blue-9" toolbar-text-color="white" toolbar-toggle-color="white"
                  class="glossy" content-class="bg-grey-3" v-model="content" :toolbar="[
                    [
                      {
                        label: $q.lang.editor.align,
                        icon: $q.iconSet.editor.align,
                        fixedLabel: true,
                        list: 'only-icons',
                        options: ['left', 'center', 'right', 'justify']
                      },
                      {
                        label: $q.lang.editor.fontSize,
                        icon: $q.iconSet.editor.fontSize,
                        fixedLabel: true,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'size-1',
                          'size-2',
                          'size-3',
                          'size-4',
                          'size-5',
                          'size-6',
                          'size-7'
                        ]
                      },
                      {
                        label: $q.lang.editor.defaultFont,
                        icon: $q.iconSet.editor.font,
                        fixedIcon: true,
                        list: 'no-icons',
                        options: [
                          'default_font',
                          'arial',
                          'arial_black',
                          'comic_sans',
                          'courier_new',
                          'impact',
                          'lucida_grande',
                          'times_new_roman',
                          'verdana'
                        ]
                      },
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: [
                          'p',
                          'h1',
                          'h2',
                          'h3',
                          'h4',
                          'h5',
                          'h6',
                        ]
                      },
                      'removeFormat'
                    ],
                    ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
                    ['token', 'hr', 'link', 'print', 'fullscreen'],
                    ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

                    ['undo', 'redo'],
                  ]" :fonts="{
                    arial: 'Arial',
                    arial_black: 'Arial Black',
                    comic_sans: 'Comic Sans MS',
                    courier_new: 'Courier New',
                    impact: 'Impact',
                    lucida_grande: 'Lucida Grande',
                    times_new_roman: 'Times New Roman',
                    verdana: 'Verdana'
                  }" />

              </div>

            </div>

            <div class="row-center w-100" style="margin-top: 30px;margin-bottom: 50px;">

              <q-btn type="submit" style="text-transform: none" glossy v-ripple padding="10px" class="w-100" dense
                color="light-blue-9">

                <q-icon left size="2em" name="send" />
                <div style="font-weight: 600;text-transform: none">Envoyer</div>

              </q-btn>

            </div>

          </q-form>

        </div>

      </div>

    </transition>

    <!-- Submit Mail -->
    <q-page-sticky v-show="inbox_show" position="bottom" :offset="[18, 18]">

      <q-btn glossy @click="sendMail()" v-ripple padding="10px" dense color="light-blue-9">

        <q-icon left size="2em" name="outgoing_mail" />
        <div style="font-weight: 600;text-transform: none;">Nouveau message</div>

      </q-btn>

    </q-page-sticky>

    <FooterComponent />

  </q-page>

  <q-dialog v-model="filterDialog" position="right">

    <q-card class="q-pb-md" style="min-width: 290px;padding: 0 1rem">

      <q-toolbar class="q-mt-md">

        <q-icon name="filter_alt" size="md" />

        <q-toolbar-title><span class="text-weight-bold">Filtrer mes courriers</span></q-toolbar-title>

      </q-toolbar>

      <q-form @submit="loadFilter()">

        <q-item-label header class="q-pl-none">Filtrer par état</q-item-label>

        <q-btn-group class="w-100">

          <q-btn class="w-100" @click="btn_etat = 'tous'" v-ripple color="light-blue-9"
            style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;" glossy label="Tous"
            :disable="(btn_etat === 'tous') ? true : false" />
          <q-btn class="w-100" @click="btn_etat = 'non_lus'" v-ripple color="light-blue-9"
            style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;" glossy label="Non lus"
            :disable="(btn_etat === 'non_lus') ? true : false" />
          <q-btn class="w-100" @click="btn_etat = 'lus'" v-ripple color="light-blue-9"
            style="font-weight: 600;font-size: 14px;text-transform: none;letter-spacing: normal;" glossy label="Lus"
            :disable="(btn_etat === 'lus') ? true : false" />

        </q-btn-group>

        <q-item-label header class="q-pl-none">Filrer par type</q-item-label>

        <q-select dense filled map-options v-model="type" transition-show="scale" transition-hide="scale"
          :options="options3" label="Type de courrier" />

        <q-item-label header class="q-pl-none">Filrer par date</q-item-label>

        <q-input dense filled v-model="date_start" mask="##/##/####" label="Date de début *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:append>

            <q-icon name="event" class="cursor-pointer">

              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date_start" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                  </div>
                </q-date>
              </q-popup-proxy>

            </q-icon>

          </template>

        </q-input>

        <q-input dense filled v-model="date_end" mask="##/##/####" label="Date de fin *" lazy-rules
          :rules="[val => val && val.length > 0 || 'S\'il vous plaît tapez quelque chose !']">

          <template v-slot:append>

            <q-icon name="event" class="cursor-pointer">

              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-date v-model="date_end" mask="DD/MM/YYYY" @input="() => $refs.qDateProxy.hide()">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fermer" color="light-blue-9" flat />
                  </div>
                </q-date>
              </q-popup-proxy>

            </q-icon>

          </template>

        </q-input>

        <q-btn type="submit" style="margin-top: 16px" glossy v-ripple padding="5px" class="w-100" dense
          color="light-blue-9">
          <div style="font-weight: 600;text-transform:none;">Filtrer</div>
        </q-btn>

        <q-btn @click="deleteFilter()" v-ripple padding="5px" class="w-100 q-mt-md q-mb-md" dense color="grey-4">
          <div style="font-weight: 600;text-transform:none;color: black;">Supprimer les Filtres</div>
        </q-btn>

      </q-form>

    </q-card>

  </q-dialog>

</template>

<style lang="css">
.overlapping {
  border: 2px solid white;
}

.qavatar .overlapping:first-child {
  left: 0 !important;
}
</style>

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
  inbox_show = ref(false),
  mail_show = ref(false),
  send_show = ref(false),
  mails = ref([]),
  filter = ref(''),
  options = ref([]),
  user = ref([]),
  mail_detail = ref([]),
  back = ref(false),
  filters = ref(false),
  user_to = ref([]),
  users_to = ref([]),
  options2 = ref([]),
  options3 = ref([]),
  user_list = ref([]),
  filterDialog = ref(false),
  date_start = ref(moment().format('DD/MM/YYYY')),
  date_end = ref(moment().format('DD/MM/YYYY')),
  btn_etat = ref('tous'),
  show_year = ref(true),
  mail_id = ref(0)

// Forms
const sujet = ref(''),
  content = ref(''),
  type = ref([])

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
    } else if (isLoggedIn.value && userStore.stateUser.user.user_type <= 1) {
      router.push('/')
    }


    if (connexionState.value && isLoggedIn.value && userStore.stateUser.user.user_type >= 2) {

      mails.value = []
      options.value = []
      options3.value = []
      users_to.value = []
      user.value = userStore.stateUser.user
      filter.value = moment().format('YYYY')

      for (let i = 0; i <= 3; i++) {

        options.value.push({
          label: moment().subtract(i, 'years').format('YYYY'),
          value: moment().subtract(i, 'years').format('YYYY')
        })

      }

      axios.get(process.env.API + '/api/companie/inbox/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id + '/' + moment().format('YYYY'))
        .then(res => {

          if (res.data.succes) {

            mails.value = res.data.mails

          } else {

            mails.value = []
          }

        })

      axios.get(process.env.API + '/api/companie/inbox-users/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id)
        .then(res => {

          if (res.data.succes) {

            if (res.data.users.length >= 1) {

              res.data.users.forEach(element => {

                options2.value.push({
                  label: element.firstname + ' ' + element.lastname,
                  photo: element.photo,
                  value: element.id
                })

              });

            } else {

              options2.value = []

            }

          } else {

            options2.value = []

          }

        })

      axios.get(process.env.API + '/api/companie/inbox-type')
        .then(res => {

          if (res.data.succes) {

            if (res.data.type.length >= 1) {

              res.data.type.forEach(element => {

                options3.value.push({
                  label: element.name,
                  value: element.id
                })

              });

            } else {

              options3.value = []

            }

          } else {

            options3.value = []

          }

        })

    }

    return {
      mail_id,
      loadFilter () {

        filterDialog.value = false
        inbox_show.value = false
        back.value = false
        filters.value = false
        mail_show.value = false
        send_show.value = false
        logo.value = false
        show_year.value = false

        axios.post(process.env.API + '/api/companie/inbox-filter', {
          companieId: userStore.stateUser.companie.id,
          toUser: userStore.stateUser.user.id,
          typeMail: type.value.value,
          date_start: String(date_start.value).replaceAll('/', '-'),
          date_end: String(date_end.value).replaceAll('/', '-'),
          btn_etat: btn_etat.value,
        })
          .then(res => {

            if (res.data.succes) {

              mails.value = res.data.mails

            } else {

              mails.value = []

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

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          inbox_show.value = true
          filters.value = true
        }, 4000);

      },
      deleteFilter () {

        btn_etat.value = 'tous'
        date_start.value = moment().format('DD/MM/YYYY')
        date_end.value = ''
        type.value = ''
        show_year.value = true
        mails.value = []

        axios.get(process.env.API + '/api/companie/inbox/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id + '/' + moment().format('YYYY'))
          .then(res => {

            if (res.data.succes) {

              mails.value = res.data.mails

            } else {

              mails.value = []
            }

          })

      },
      show_year,
      btn_etat,
      date_start,
      date_end,
      filterDialog,
      user_list,
      sujet,
      content,
      type,

      options2,
      options3,
      onSubmitMessage () {

        inbox_show.value = false
        back.value = false
        filters.value = false
        mail_show.value = false
        send_show.value = false
        logo.value = false

        var toUsers = []

        users_to.value.forEach(element => {
          toUsers.push(element.value)
        });

        axios.post(process.env.API + '/api/companie/inbox-send', {
          companieId: userStore.stateUser.companie.id,
          fromUser: userStore.stateUser.user.id,
          usersTo: toUsers,
          typeMail: type.value.value,
          sujet: sujet.value,
          content: content.value
        })
          .then(res => {

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
                loader.value = true
              }, 1200);

              setTimeout(() => {
                loader.value = false
              }, 3500);

              setTimeout(() => {
                logo.value = true
                inbox_show.value = true
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
                loader.value = true
              }, 1200);

              setTimeout(() => {
                loader.value = false
              }, 3500);

              setTimeout(() => {
                logo.value = true
                send_show.value = true
                filters.value = true
              }, 4000);

            }

          })

      },
      sendMail () {

        inbox_show.value = false
        back.value = false
        send_show.value = false
        filters.value = false
        mail_show.value = false
        logo.value = false

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          logo.value = true
          send_show.value = true
          back.value = true
        }, 4000);

      },
      showFilter () {
        (filterDialog.value) ? filterDialog.value = false : filterDialog.value = true
      },
      showBack () {

        inbox_show.value = false
        back.value = false
        filters.value = false
        mail_show.value = false
        send_show.value = false
        logo.value = false

        mails.value = []

        axios.get(process.env.API + '/api/companie/inbox/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id + '/' + moment().format('YYYY'))
          .then(res => {

            if (res.data.succes) {

              mails.value = res.data.mails

            } else {

              mails.value = []
            }

          })

        setTimeout(() => {
          loader.value = true
        }, 1200);

        setTimeout(() => {
          loader.value = false
        }, 3500);

        setTimeout(() => {
          inbox_show.value = true
          logo.value = true
          filters.value = true
        }, 4000);

      },
      showMail (mailId) {

        inbox_show.value = false
        mail_show.value = false
        logo.value = false
        back.value = false
        send_show.value = false
        filters.value = false

        if (connexionState.value && isLoggedIn.value) {

          mail_detail.value = []
          user_list.value = []

          axios.get(process.env.API + '/api/companie/inbox-read/' + userStore.stateUser.companie.id + '/' + mailId + '/' + userStore.stateUser.user.id)
            .then(res => {

              if (res.data.succes) {

                mail_detail.value = res.data.mail

                axios.post(process.env.API + '/api/companie/inbox-user-list', {
                  companieId: userStore.stateUser.companie.id,
                  userTo: res.data.mail.user_to
                })
                  .then(res => {

                    if (res.data.succes) {

                      user_list.value = res.data.list

                    }

                  })

              } else {

                mail_detail.value = []
                user_list.value = []

              }

            })

          setTimeout(() => {
            loader.value = true
          }, 1200);

          setTimeout(() => {
            loader.value = false
          }, 3500);

          setTimeout(() => {
            mail_show.value = true
            logo.value = true
            back.value = true
          }, 4000);

        }

      },
      changeYear (val) {

        if (connexionState.value && isLoggedIn.value) {

          mails.value = []

          axios.get(process.env.API + '/api/companie/inbox/' + userStore.stateUser.companie.id + '/' + userStore.stateUser.user.id + '/' + val)
            .then(res => {

              if (res.data.succes) {

                mails.value = res.data.mails

              } else {

                mails.value = []
              }

            })

        }

      },
      back,
      user_to,
      users_to,
      filters,
      mail_detail,
      mail_show,
      send_show,
      inbox_show,
      moment: moment,
      loader,
      logo,
      user,
      onLine: navigator.onLine,
      connexionState,
      folderAPI,
      mails,
      filter,
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

    btn_etat.value = 'tous'
    inbox_show.value = false
    logo.value = false
    back.value = false
    filters.value = false

    setTimeout(() => {
      loader.value = true
    }, 1200);

    setTimeout(() => {
      loader.value = false
    }, 3500);

    setTimeout(() => {
      logo.value = true
      inbox_show.value = true
      filters.value = true
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
