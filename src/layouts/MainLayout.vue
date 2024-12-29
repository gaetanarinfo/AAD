<template>
  <q-layout view="lHh Lpr lFf">

    <q-header :class="(!connexionState) ? 'disabled' : ''" elevated>

      <q-toolbar class="glossy bg-light-blue-9">

        <transition appear enter-active-class="animated jackInTheBox slower" leave-active-class="animated jackInTheBox">
          <q-btn flat v-ripple dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
        </transition>

        <q-space />

        <transition appear enter-active-class="animated jackInTheBox slower" leave-active-class="animated jackInTheBox">

          <q-btn :disabled="notifications.length === 0 || !isLoggedIn" v-ripple flat dense round class="q-mr-md"
            icon="notifications"
            @click="!notificationsDialog && notifications.length >= 1 ? notificationsDialog = true : notificationsDialog = false"
            aria-label="Notifications">

            <q-badge v-if="isLoggedIn && notifications.length >= 1" color="red" text-color="white" floating>
              {{ notifications.length }}
            </q-badge>

          </q-btn>

        </transition>

        <transition appear enter-active-class="animated jackInTheBox slower" leave-active-class="animated jackInTheBox">

          <q-btn :disabled="!isLoggedIn" flat dense v-ripple class="q-mr-xs" round aria-label="Espace utilisateur">
            <q-avatar size="26px">
              <q-img spinner-color="light-blue-9" spinner-size="15px" v-if="photo_profil === ''"
                src="~assets/utilisateur.png" />
              <q-img spinner-color="light-blue-9" style="min-width: 26px; max-width: 26px;" spinner-size="15px" v-else
                :src="photo_profil" />
            </q-avatar>
          </q-btn>

        </transition>

      </q-toolbar>

    </q-header>

    <q-drawer v-model="leftDrawerOpen" :class="(!connexionState) ? 'disabled' : ''" show-if-above bordered :width="246">

      <q-scroll-area class="fit">

        <q-list>

          <MenuComponent v-for="link in linksList" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <q-item-label header class="text-weight-bold text-uppercase">
            Réseaux Sociaux
          </q-item-label>

          <MenuComponent v-for="link in linksList2" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <q-item clickable v-ripple @click="settings">
            <q-item-section avatar>
              <q-icon class="fa-solid fa-cog" color="grey" />
            </q-item-section>

            <q-item-section>
              <q-item-label class="title-menu">Paramètres</q-item-label>
            </q-item-section>
          </q-item>

          <MenuComponent v-for="link in linksList3" :key="link.title" v-bind="link" />

          <q-separator class="q-my-md" />

          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a v-for="footer in footers" :key="footer.text" class="q-footer-layout"
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

    <q-drawer v-model="leftDrawerOpenSettings" :class="(!connexionState) ? 'disabled' : ''" show-if-above bordered>
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

    <q-page-container>
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
            <span style="font-weight: normal; text-transform: initial;">{{ notification.content }}</span>
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
import moment from 'moment'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import { useQuasar } from 'quasar'

moment.locale('fr')

const leftDrawerOpen = ref(false),
  leftDrawerOpenSettings = ref(false),
  connexionState = ref(true),
  notifications = ref([]),
  user = ref([]),
  notificationsDialog = ref(false),
  photo_profil = ref('')

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

    if (connexionState.value && isLoggedIn.value) {

      axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

        if (res.data.succes) {

          notifications.value = res.data.notifications

        } else {

          $q.notify({
            timeout: 1000,
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
          timeout: 1000,
          color: 'red-5',
          textColor: 'white',

          icon: 'warning',
          message: 'une erreur est survenue !',
          progress: true,
          classes: 'glossy',
        })

      })

      photo_profil.value = userStore.stateUser.user.photo

      setInterval(() => {

        axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

          if (res.data.succes) {

            notifications.value = res.data.notifications

          } else {

            $q.notify({
              timeout: 1000,
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
            timeout: 1000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: 'une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })

        })

        photo_profil.value = userStore.stateUser.user.photo

      }, 5000);

    }

    return {
      checkNotificationAll () {

        axios.get(process.env.API + '/api/user/notifications/check-all/' + userStore.stateUser.user.email).then(res => {

          if (res.data.succes) {

            notifications.value = []

            axios.get(process.env.API + '/api/user/notifications/' + userStore.stateUser.user.email).then(res => {

              if (res.data.succes) {

                notifications.value = res.data.notifications

              } else {

                $q.notify({
                  timeout: 1000,
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
                timeout: 1000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })

            })

          } else {

            $q.notify({
              timeout: 1000,
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
            timeout: 1000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: 'une erreur est survenue !',
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
                  timeout: 1000,
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
                timeout: 1000,
                color: 'red-5',
                textColor: 'white',

                icon: 'warning',
                message: 'une erreur est survenue !',
                progress: true,
                classes: 'glossy',
              })

            })

          } else {

            $q.notify({
              timeout: 1000,
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
            timeout: 1000,
            color: 'red-5',
            textColor: 'white',

            icon: 'warning',
            message: 'une erreur est survenue !',
            progress: true,
            classes: 'glossy',
          })

        })

      },
      notificationsDialog,
      user,
      notifications,
      isLoggedIn: isLoggedIn,
      moment,
      connexionState,
      onLine: navigator.onLine,
      version: process.env.VERSION,
      leftDrawerOpen,
      leftDrawerOpenSettings,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
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
          color: 'grey'
        },
        {
          title: 'Qui somme nous ?',
          icon: 'fa-solid fa-circle-question',
          link: '/',
          enable: false,
          color: 'grey'
        },
        {
          title: 'Contact',
          icon: 'fa-solid fa-at',
          link: '/',
          enable: false,
          color: 'grey'
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
          color: 'grey'
        },
        {
          title: 'Aide',
          icon: 'fa-solid fa-circle-question',
          link: '/',
          enable: false,
          color: 'grey'
        }
      ],
      footers: [
        {
          text: 'Politique de confidentialité',
          link: '/'
        },
        {
          text: 'Condition général d\'utilisation',
          link: '/'
        },
        {
          text: 'Condition général de vente',
          link: '/'
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
