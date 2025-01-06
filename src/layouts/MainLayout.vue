<template>
  <q-layout view="lHh Lpr lFf">

    <q-header v-if="isLoggedIn" :class="(!connexionState) ? 'disable' : ''" elevated style="position: relative;">

      <q-toolbar class="glossy bg-light-blue-9">

        <transition appear enter-active-class="animated jackInTheBox slower" leave-active-class="animated jackInTheBox">
          <q-btn flat v-ripple dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        </transition>

        <q-space />

        <transition appear enter-active-class="animated jackInTheBox slower" leave-active-class="animated jackInTheBox">

          <q-btn :disable="notifications.length === 0 || !isLoggedIn" v-ripple flat dense round class="q-mr-md"
            icon="notifications"
            @click="!notificationsDialog && notifications.length >= 1 ? notificationsDialog = true : notificationsDialog = false"
            aria-label="Notifications">

            <q-badge v-if="isLoggedIn && notifications.length >= 1" color="red" text-color="white" floating>
              {{ notifications.length }}
            </q-badge>

          </q-btn>

        </transition>

        <transition appear enter-active-class="animated jackInTheBox slower" leave-active-class="animated jackInTheBox">

          <q-btn :disable="!isLoggedIn" flat dense v-ripple class="q-mr-xs" @click="toggleLeftDrawerUser" round
            aria-label="Espace utilisateur">

            <q-avatar size="26px" v-show="!submittingStatus && !card_pro">

              <q-img spinner-color="light-blue-9" spinner-size="15px" v-if="photo_profil === ''"
                src="~assets/utilisateur.png" />
              <q-img spinner-color="light-blue-9" style="min-width: 26px; max-width: 26px;" spinner-size="15px" v-else
                :src="photo_profil" />

            </q-avatar>

            <q-avatar size="26px" v-show="!submittingStatus && card_pro">

              <q-img spinner-color="light-blue-9" style="min-width: 26px; max-width: 26px;" spinner-size="15px"
                :src="photo_profil_pro" />

            </q-avatar>

          </q-btn>

        </transition>

      </q-toolbar>

    </q-header>

    <q-drawer behavior="mobile" v-model="leftDrawerOpen"
      :class="(!connexionState) ? 'disabled leftDrawerOpen' : 'leftDrawerOpen'" bordered>

      <q-scroll-area class="fit">

        <q-toolbar class="GPL__toolbar">

          <q-toolbar-title class="row items-center text-grey-8">

            <img class="q-pl-md" src="~assets/logo_small.png">

          </q-toolbar-title>

        </q-toolbar>

        <q-list padding>

          <MenuComponent v-for="link in linksList" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Réseaux Sociaux
          </q-item-label>

          <MenuComponent v-for="link in linksList2" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <q-item clickable v-ripple @click="settings">
            <q-item-section avatar>
              <q-icon class="fa-solid fa-cog" style="padding-left: 12px; color:#5f6368;" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="title-menu">Paramètres</q-item-label>
            </q-item-section>
          </q-item>

          <MenuComponent v-for="link in linksList3" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a v-for="footer in footers" :key="footer.text" class="q-footer-layout cursor-pointer"
                @click="this.$router.push(footer.link)">
                {{ footer.text }}
              </a>
            </div>
          </div>

        </q-list>

        <q-item class="flex-center">
          <q-img src="~assets/logo.png" class="d-flex" style="max-width: 100px" spinner-color="light-blue-9"></q-img>
        </q-item>

        <q-item class="flex-center version">
          Version {{ version }}
        </q-item>

        <q-item class="flex-center">
          © Copyright par Gaëtan Seigneur - {{ moment().format('YYYY') }}. Concu par Dev72.
        </q-item>

        <q-item></q-item>

      </q-scroll-area>

    </q-drawer>

    <q-drawer v-model="leftDrawerOpenSettings"
      :class="(!connexionState) ? 'disabled leftDrawerOpenSettings' : 'leftDrawerOpenSettings'" bordered>
      <q-list>
        <SettingsComponent />
      </q-list>

      <q-item class="flex-center">
        <q-img src="~assets/logo.png" class="d-flex" style="max-width: 100px" spinner-color="light-blue-9"></q-img>
      </q-item>

      <q-item class="flex-center version">
        Version {{ version }}
      </q-item>

      <q-item class="flex-center">
        © Copyright par Gaëtan Seigneur - {{ moment().format('YYYY') }}. Concu par Dev72.
      </q-item>

      <q-item></q-item>

    </q-drawer>

    <q-drawer v-if="isLoggedIn" v-model="leftDrawerUser"
      :class="(!connexionState) ? 'disabled leftDrawerUser' : 'leftDrawerUser'" :breakpoint="400">

      <q-scroll-area v-if="user.user_type === 1 || user.user_type >= 2" v-show="!submittingStatus && !card_pro"
        style="height: calc(100% - 160px); margin-top: 160px; border-right: 1px solid #ddd">

        <q-list padding>

          <q-item :active="this.$route.path === '/my-account'" active-class="text-light-blue-9"
            @click="this.$router.push('/my-account')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>

            <q-item-section>
              Gestion du compte
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple v-if="user.user_type === 1">

            <q-item-section avatar>
              <q-icon name="list_alt" />
            </q-item-section>

            <q-item-section>
              Demandes de service
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple v-if="user.user_type === 1">

            <q-item-section avatar>
              <q-icon name="event_note" />
            </q-item-section>

            <q-item-section>
              Mon planning
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple>

            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Messagerie
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple>

            <q-item-section avatar>
              <q-icon name="close" color="red-9" />
            </q-item-section>

            <q-item-section>
              Clôturer le compte
            </q-item-section>

          </q-item>

          <q-item @click="logout()" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              Déconnexion
            </q-item-section>

          </q-item>

        </q-list>

      </q-scroll-area>

      <q-scroll-area v-if="user.user_type >= 2" v-show="!submittingStatus && card_pro"
        style="height: calc(100% - 160px); margin-top: 160px; border-right: 1px solid #ddd">

        <q-list padding>

          <q-item :active="this.$route.path === '/companie'" active-class="text-light-blue-9"
            @click="this.$router.push('/companie')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>

            <q-item-section>
              Gestion du compte
            </q-item-section>

          </q-item>

          <q-item :active="this.$route.path === '/companie/users'" active-class="text-light-blue-9"
            @click="this.$router.push('/companie/users')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section>
              Gestion des employés
            </q-item-section>

          </q-item>

          <q-item>

            <q-item-section avatar>
              <q-icon name="event_note" />
            </q-item-section>

            <q-item-section>
              Gestion du planning
            </q-item-section>

          </q-item>

          <q-item :active="this.$route.path === '/companie/services'" active-class="text-light-blue-9"
            @click="this.$router.push('/companie/services')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="design_services" />
            </q-item-section>

            <q-item-section>
              Mes prestations
            </q-item-section>

          </q-item>

          <q-item :active="this.$route.path === '/companie/accounting'" active-class="text-light-blue-9"
            @click="this.$router.push('/companie/accounting')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>

            <q-item-section>
              Comptabilité
            </q-item-section>

          </q-item>

          <q-item :active="this.$route.path === '/companie/orders'" active-class="text-light-blue-9"
            @click="this.$router.push('/companie/orders')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section>
              Historique des commandes
            </q-item-section>

          </q-item>

          <q-item clickable v-ripple>

            <q-item-section avatar>
              <q-icon name="history" />
            </q-item-section>

            <q-item-section>
              Historique des prestations
            </q-item-section>

          </q-item>

          <q-item :active="this.$route.path === '/companie/documents'" active-class="text-light-blue-9"
            @click="this.$router.push('/companie/documents')" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>

            <q-item-section>
              Documents
            </q-item-section>

          </q-item>

          <q-item @click="logout()" v-ripple clickable>

            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              Déconnexion
            </q-item-section>

          </q-item>

        </q-list>

      </q-scroll-area>

      <q-img class="absolute-top" spinner-color="light-blue-9" spinner-size="15px" src="~/assets/material.jpg"
        style="height: 160px">

        <transition v-show="submittingStatus" appear enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">

          <div class="absolute-center bg-transparent">
            <q-spinner-gears size="xl" />
          </div>

        </transition>

        <transition v-show="!submittingStatus && !card_pro" appear enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">

          <div class="absolute-bottom bg-transparent">

            <q-avatar size="56px" class="q-mb-sm shadow-3">

              <q-img spinner-color="light-blue-9" spinner-size="15px" v-if="photo_profil === ''"
                src="~assets/utilisateur.png" />

              <q-img spinner-color="light-blue-9" spinner-size="15px" v-else :src="photo_profil" />

            </q-avatar>

            <div class="text-weight-bold">{{ user.firstname + ' ' + user.lastname }}</div>

            <div class="text-weight-bold">Compte Personnel
            </div>

            <div class="text-weight-bold">Inscrit depuis le {{
              moment(user.created_at).format('DD/MM/YYYY') }}</div>

            <div v-if="user.user_type === 2" class="absolute-top-right q-ma-md">

              <q-btn @click="switchStatus()" v-ripple dense flat round size="md">

                <q-icon name="change_circle" size="md" color="white" />

                <q-tooltip>
                  Passez à la version pro
                </q-tooltip>

              </q-btn>

            </div>

          </div>

        </transition>

        <transition v-show="!submittingStatus && card_pro" appear enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut">

          <div class="absolute-bottom bg-transparent">

            <q-avatar size="56px" class="q-mb-sm shadow-3">

              <q-img spinner-color="light-blue-9" spinner-size="15px" :src="photo_profil_pro" />

            </q-avatar>

            <div class="text-weight-bold">{{ companie.name }}</div>

            <div class="text-weight-bold">Compte {{ (user.user_type === 1) ? 'Utilisateur' :
              (user.user_type === 2) ?
                'Agence' : '' }}{{ (companie.user_id !== 0) ? ' - Directeur' : '' }}
            </div>

            <div class="text-weight-bold">Fondé le {{
              moment(companie.founding_date).format('DD/MM/YYYY') }}</div>

            <div v-if="user.user_type === 2" class="absolute-top-right q-ma-md">

              <q-btn @click="switchStatus()" v-ripple dense flat round size="md">

                <q-icon name="change_circle" size="md" color="white" />

                <q-tooltip>
                  Passez à la version utilisateur
                </q-tooltip>

              </q-btn>

            </div>

          </div>

        </transition>

      </q-img>

    </q-drawer>

    <q-page-container style="padding-bottom: 0; padding-top: 0;">
      <router-view />
    </q-page-container>

  </q-layout>

  <q-dialog v-if="isLoggedIn" v-model="notificationsDialog" position="bottom">

    <q-card>

      <q-toolbar>

        <q-item-section style="max-width: 32px;">
          <q-icon name="notifications" color="light-blue-9" size="md" />
        </q-item-section>

        <q-toolbar-title style="text-transform: uppercase; font-weight: 600;">Notifications</q-toolbar-title>

        <q-btn flat round v-ripple dense icon="done_all" @click="checkNotificationAll" v-close-popup />

      </q-toolbar>

      <q-list bordered separator>

        <q-item v-for="notification in notifications">

          <q-item-section style="max-width: 35px;margin-right: 16px;">
            <q-img src="~assets/logo.png" color="light-blue-9" style="max-width: 35px;" />
          </q-item-section>

          <q-item-section>
            {{ notification.name }}<br />
            <span style="font-weight: normal; text-transform: initial;">{{ notification.content }} <span
                v-if="notification.type === 'register'"><a type="button"
                  @click="validateAccount(), checkNotification(notification.id)"
                  style="font-weight: normal; text-transform: initial;">cliquant ici</a></span></span>
          </q-item-section>

          <q-item-section avatar>
            <q-btn icon="check" @click="checkNotification(notification.id)" color="green-9" size="sm" flat dense rounded
              v-ripple />
          </q-item-section>

        </q-item>

        <q-separator />

      </q-list>

    </q-card>

  </q-dialog>

</template>

<script>
import { ref } from 'vue'
import MenuComponent from 'src/components/Menu.vue'
import SettingsComponent from 'src/components/Settings.vue'
import { defineComponent, onMounted, computed } from 'vue'
import { useUserStore } from 'stores/user'
import moment from 'moment/min/moment-with-locales';
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { SessionStorage, useQuasar } from 'quasar'
import { useRouter } from "vue-router"

moment.locale('fr')

const leftDrawerOpen = ref(false),
  leftDrawerOpenSettings = ref(false),
  leftDrawerUser = ref(false),
  connexionState = ref(true),
  notifications = ref([]),
  user = ref([]),
  companie = ref([]),
  notificationsDialog = ref(false),
  photo_profil = ref(''),
  photo_profil_pro = ref(''),
  submittingStatus = ref(false),
  card_pro = ref(false),
  user_leader = ref(0)

export default defineComponent({
  name: 'MainLayout',
  components: {
    MenuComponent,
    SettingsComponent
  },
  setup () {

    const userStore = useUserStore()
    const { isLoggedIn } = storeToRefs(userStore)
    const $q = useQuasar()
    const router = useRouter()

    if (connexionState.value && isLoggedIn.value) {

      axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

        if (res.data.succes) {

          notifications.value = res.data.notifications

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
          message: 'Une erreur est survenue !',
          progress: true,
          classes: 'glossy',
        })

      })

      photo_profil.value = userStore.stateUser.user.photo
      user.value = userStore.stateUser.user

      if (user.value.user_type === 2) {
        photo_profil_pro.value = userStore.stateUser.user.logo
        companie.value = userStore.stateUser.companie
      }

      setInterval(() => {

        axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

          if (res.data.succes) {

            notifications.value = res.data.notifications

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
            message: 'Une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })

        })

        photo_profil.value = userStore.stateUser.user.photo
        user.value = userStore.stateUser.user

        if (user.value.user_type === 2) {
          photo_profil_pro.value = userStore.stateUser.companie.logo
          companie.value = userStore.stateUser.companie
        }

      }, 5000);

    }

    return {
      user_leader,
      logout () {
        SessionStorage.clear()
        window.location.reload()
        router.push('/')
      },
      card_pro,
      photo_profil_pro,
      submittingStatus,
      switchStatus () {

        submittingStatus.value = true

        if (card_pro.value === false) {

          SessionStorage.setItem('card_pro', true)

          setTimeout(() => {
            submittingStatus.value = false
            card_pro.value = true
          }, 1500);

        } else {

          SessionStorage.setItem('card_pro', false)

          router.push('/my-account')

          setTimeout(() => {
            submittingStatus.value = false
            card_pro.value = false
          }, 1500);

        }

      },
      validateAccount () {

        notificationsDialog.value = false

        axios.get(process.env.API + '/api/user/activate/' + userStore.stateUser.user.email).then(res => {

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

      },
      checkNotificationAll () {

        axios.get(process.env.API + '/api/user/notifications/check-all/' + userStore.stateUser.user.email).then(res => {

          if (res.data.succes) {

            notifications.value = []

            axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

              if (res.data.succes) {

                notifications.value = res.data.notifications

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
            message: 'Une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })

        })

      },
      checkNotification (id) {

        notificationsDialog.value = false

        axios.get(process.env.API + '/api/user/notifications/check/' + userStore.stateUser.user.email + '/' + id).then(res => {

          if (res.data.succes) {

            notifications.value = []

            axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

              if (res.data.succes) {

                notifications.value = res.data.notifications

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
            message: 'Une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })

        })

      },
      notificationsDialog,
      user,
      companie,
      notifications,
      isLoggedIn: isLoggedIn,
      moment: moment,
      connexionState,
      onLine: navigator.onLine,
      version: process.env.VERSION,
      leftDrawerOpen,
      leftDrawerOpenSettings,
      leftDrawerUser,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      toggleLeftDrawerUser () {
        leftDrawerUser.value = !leftDrawerUser.value
      },
      settings () {
        leftDrawerOpenSettings.value = !leftDrawerOpenSettings.value
      },
      linksList: [
        {
          title: 'Accueil',
          icon: 'fa-solid fa-house',
          link: '/',
          enable: false,
          color: '#5f6368'
        },
        {
          title: 'Qui somme nous ?',
          icon: 'fa-solid fa-circle-question',
          link: '/',
          enable: false,
          color: '#5f6368'
        },
        {
          title: 'Contact',
          icon: 'fa-solid fa-at',
          link: '/',
          enable: false,
          color: '#5f6368'
        }
      ],
      linksList2: [
        {
          title: 'Twitter',
          icon: 'fa-brands fa-x-twitter',
          link: 'https://twitter.quasar.dev',
          enable: true,
          color: 'blue-8'
        },
        {
          title: 'Facebook',
          icon: 'fa-brands fa-facebook-f',
          link: 'https://facebook.quasar.dev',
          enable: true,
          color: 'pink-8'
        },
        {
          title: 'Linkedin',
          icon: 'fa-brands fa-linkedin-in',
          link: 'https://awesome.quasar.dev',
          enable: true,
          color: 'brown-8'
        }
      ],
      linksList3: [
        {
          title: 'Signaler un bug ?',
          icon: 'fa-solid fa-flag',
          link: '/',
          enable: false,
          color: '#5f6368'
        },
        {
          title: 'Aide',
          icon: 'fa-solid fa-circle-question',
          link: '/',
          enable: false,
          color: '#5f6368'
        }
      ],
      footers: [
        {
          text: 'Politique de confidentialité',
          link: '/politique-confidentialite'
        },
        {
          text: 'Condition général d\'utilisation',
          link: '/cgu'
        },
        {
          text: 'Condition général de vente',
          link: '/cgv'
        }
      ],
      photo_profil
    }

  },
  methods: {
    updateOnlineStatus (e) {
      if (e.type == "offline") connexionState.value = false
      if (e.type == "online") connexionState.value = true
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

    leftDrawerOpen.value = false
    leftDrawerOpenSettings.value = false
    leftDrawerUser.value = false

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
